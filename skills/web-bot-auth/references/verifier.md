# Verifier

Section numbers refer to `draft-ietf-webbotauth-httpsig-protocol-00` unless they name RFC 9421.

## Trust model (§ 4)

- The identifier is the URL the verifier resolved, paired with a key that URL provides. For `directory` that is the well-known URI, not the value the client sent (§ 4.1).
- An unresolved `Signature-Agent` is a claim. Verifiers MUST NOT attach policy to it until it resolves to a key that verifies the request (§ 4.1).
- A verifier MUST NOT attribute a request to a URL unless it made the URL-to-key association itself (at request time or ahead of it) or holds a valid, unexpired directory response signature for redistributed keys (§ 4.4, § 5.5.3).
- When the same pair comes from several sources, the newer one wins, ordered by when it was produced: the `created` of a directory response signature, or the time of your own fetch (§ 4.4).
- With no URL (failed discovery with nothing cached, unproven redistributed keys, or no header), the identifier falls back to the `keyid` thumbprint, with no continuity across rotation (§ 4.3).
- `keyid` selects a key; it cannot carry identity across rotation (§ 4.2).
- A valid signature proves a holder of a key the URL publishes signed the covered message. It says nothing about the operator, whether the agent is benign, or whether the request is authorized; those are origin policy (§ 4.1). The protocol does not authenticate humans or define authorization or delegation (§ 4.6).

## Verification steps (§ 5.4, RFC 9421 § 3.2)

1. Refuse or ignore `Signature` headers received over an unsecured channel (§ 6.1).
2. Parse `Signature`, `Signature-Input` and `Signature-Agent`. On a parse failure in RFC 9421 steps 1 to 3 the origin MAY respond 400 (§ 5.4).
3. At RFC 9421 step 4, discard signatures whose `tag` is not `web-bot-auth` if you choose to (§ 5.4). Check the profile: `@authority` or `@target-uri` covered, the label's `signature-agent` member covered, `created`, `expires` and `keyid` present (§ 5.2). Reject `expires` in the past and freshness windows beyond your risk model (Appendix C.6).
4. At RFC 9421 step 5, look up the key by (resolved URL, `keyid`). If unknown for that URL, you MAY discard the signature, or fetch key material (§ 5.4). Never index by `keyid` alone: a key learned from one URL would then verify requests that assert another URL, and the asserted party could not stop it (§ 5.4).
5. At RFC 9421 step 6, take the algorithm from your allowed set; refuse HMAC (§ 6.4) and known test keys (§ 6.8).
6. Rebuild the signature base and verify. Verify each signature independently when there are several (§ 5.2.2).
7. Classify and apply policy (Appendix C.1).

To request a signature from a client, respond 403 with `Accept-Signature`, optionally asking for a `nonce`; respond 429 when a signature or nonce was used more than policy permits (§ 5.3). Any resulting signature must satisfy this profile.

## Key discovery (§ 5.5)

- `directory`: the member value MUST be an ASCII-serialized origin (an empty path `/` MAY be accepted); ignore anything else. Fetch `/.well-known/http-message-signatures-directory` on that origin.
- `jwks_uri`: fetch the member value as a JWK Set URI.
- `cimd`: fetch the member value as an OAuth Client ID Metadata Document, then use its `jwks` or `jwks_uri`.
- Every fetched resource MUST be a 200. Treat every other status as a discovery failure and MUST NOT follow redirects automatically.
- The identifier is the resolved URL without query and fragment; compare identifiers after URI normalization (RFC 3986 § 6.2.2 and § 6.2.3), octet for octet.
- At the well-known URI, match `keyid` against `kid` (which must be the thumbprint). For `jwks_uri` and `cimd`, `kid` is an operator label; compute thumbprints instead.
- Validate the directory format and reject malformed entries (§ 5.5.1).
- If you use a directory response signature (Appendix B.1) as proof, validate it with the key from the directory and validate `Content-Digest` against the body; reject it if `created` is in the future.

## Fetch limits (§ 6.7, Appendix C.3)

`Signature-Agent` is client-controlled, so every fetch is an SSRF vector. Bound:

- response size after content decoding;
- key count per JWKS;
- wall-clock time per fetch;
- redirect depth (the profile already forbids automatic redirects);
- destination addresses: no private, loopback or link-local ranges.

Coalesce concurrent fetches of the same directory and apply per-directory or per-origin concurrency limits.

## Caching and failure (§ 5.5.2, § 6.10, Appendix C.4, C.5)

- Cache directories with normal HTTP caching: respect `Cache-Control`, `Expires`, `Date`, `ETag` and `Last-Modified`. Do not fetch per request; refresh when stale, in the background with jitter.
- A successful fetch that lacks the key is evidence: it replaces the cached entry, which is how removed keys stop verifying.
- A failed fetch (DNS, TLS, non-directory response, refused by your limits) is not evidence: it MUST NOT evict a cached entry. The request cannot be attributed to the URL; verify by thumbprint if you hold the key, otherwise the outcome is unverified.
- Negative-cache failures for no more than five minutes. Treat network, TLS and 5xx failures as transient, retry with bounded exponential backoff and jitter, and respect `Retry-After`.
- Expect correlated failures: one operator's outage affects every request naming it.

## Outcomes (Appendix C.1, § 6.11, Appendix C.9)

| Outcome    | Meaning                                                                        |
| ---------- | ------------------------------------------------------------------------------ |
| verified   | Signature and key material validate.                                           |
| invalid    | Signature, covered components, key or freshness checks fail.                   |
| unverified | Not enough information to decide, for example failed discovery or unknown key. |

Treat unverified as one bot-management signal, not as verified or invalid. An unsigned request tells you nothing about the sender (§ 6.11). Keep existing signals (IP checks, forward-confirmed reverse DNS, allowlists, reputation) during rollout, and never let a fallback turn an unverifiable signature into a trusted identity.

## Replay (§ 5.2.3, Appendix C.6)

Nonce enforcement is deployment policy. Rejecting duplicate nonces needs an atomic check-and-record across the enforcement scope, with bounded retention. If nonce state is unavailable, do not treat a valid signature as evidence that replay was prevented.

## Sessions (§ 5.6)

An origin can verify once and issue a session credential. The credential must not outlive the signature's `expires` or be wider in scope than its covered components, or it extends the replay window. Session establishment is out of scope.

## Proxies (§ 6.6, Appendix C.10)

- Proxies SHOULD NOT strip `Signature` or `Signature-Agent`, and SHOULD NOT replay signatures against the origin's other reverse proxies.
- An intermediary MAY relabel a `Signature` member but MUST NOT alter the key of a covered `Signature-Agent` member it cannot re-sign (§ 6.6.1).
- A proxy that rewrites authority, path or signed fields breaks verification at the origin. Either preserve them or verify at the proxy and pass the result over a deployment-local trusted channel; that assertion does not replace the signature.

## Sketch

Framework-neutral TypeScript showing the order of checks. `parseSignatureFields`, `resolveKeys` and `verifyBase` stand for an RFC 9421 library and your discovery cache.

```ts
type Outcome =
  | { kind: "verified"; identifier: string }
  | { kind: "invalid"; reason: string }
  | { kind: "unverified"; reason: string };

async function verifyWebBotAuth(
  req: Request,
  now = Math.floor(Date.now() / 1000),
): Promise<Outcome> {
  if (new URL(req.url).protocol !== "https:")
    return { kind: "unverified", reason: "insecure channel" };
  const sigs = parseSignatureFields(req.headers).filter(
    (s) => s.params.tag === "web-bot-auth",
  );
  if (sigs.length === 0)
    return { kind: "unverified", reason: "no web-bot-auth signature" };

  for (const sig of sigs) {
    const coversTarget = sig.components.some(
      (c) => c.name === "@authority" || c.name === "@target-uri",
    );
    const agentMember = sig.components.find(
      (c) => c.name === "signature-agent" && c.key === sig.label,
    );
    const { created, expires, keyid } = sig.params;
    if (!coversTarget || !agentMember || !created || !expires || !keyid) {
      return { kind: "invalid", reason: "profile requirements not met" };
    }
    if (expires <= now || created > now + 60)
      return { kind: "invalid", reason: "not fresh" };

    const member = sig.signatureAgent; // the Signature-Agent member for this label
    const resolved = await resolveKeys(member); // bounded, cached, no redirects, 200 only
    if (!resolved.ok) return { kind: "unverified", reason: resolved.reason };

    const key = resolved.keys.get(keyid); // keyed by (resolved URL, keyid)
    if (!key)
      return {
        kind: "unverified",
        reason: "key not published at resolved URL",
      };
    if (!(await verifyBase(req, sig, key)))
      return { kind: "invalid", reason: "bad signature" };
    return { kind: "verified", identifier: resolved.url };
  }
  return { kind: "unverified", reason: "no usable signature" };
}
```

The 60-second allowance for clock skew is an example value, not from the draft.
