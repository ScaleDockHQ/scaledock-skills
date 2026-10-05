# Signing, verifying and security

Read this when writing the application profile, attaching or verifying signatures, requesting signatures with `Accept-Signature`, handling several signatures or proxies, or reviewing security. Source: RFC 9421 § 1.4, § 3, § 4, § 5, § 7 and § 8 (sections cited bare).

## The application profile

RFC 9421 is a toolkit. An application or profile MUST specify at least (§ 1.4):

- The component identifiers and signature parameters that are expected and required (for example: `Authorization` must be covered and `created` must be present; `Content-Digest` must be covered; a fixed `tag`).
- The expected Structured Field types of required fields and parameters.
- How the verifier retrieves key material, usually from `keyid`, or from preregistration.
- The allowed signature algorithms.
- How the verifier decides the algorithm fits the key and context: an `alg` parameter, the key material, or preconfiguration.
- How the verifier decides the key and algorithm fit the context (for example, reject RSA when only ECDSA is expected, reject symmetric when asymmetric is expected).
- The context for deriving components, such as an external hostname behind a reverse proxy (§ 7.4.3).
- For response signatures with `req`, every request and response element the binding needs.
- The error responses: for example 401 or 403 when the signature authenticates the sender, or 400 with problem details for an API (§ 1.4).

Extra requirements are encouraged (§ 3.2.1): required fields, maximum age from `created`, rejecting expired signatures, forbidding `alg` when the key fixes the algorithm, successful `keyid` resolution, an algorithm allow-list, minimum key sizes, nonce uniqueness, a required `tag`. Each one MUST be enforced and MUST fail verification when not met (§ 3.2.1).

## Creating a signature

The signer MUST (§ 3.1):

1. Choose an algorithm and key from the set the application allows; the key MUST suit the algorithm (size, format).
2. Set `created` to the current time.
3. Set `expires` if the application uses it.
4. Choose the ordered covered components and attach the parameters. Each component is a field in the context or a registered derived component; `@signature-params` MUST NOT be listed; request signers SHOULD cover control data and SHOULD include `created`.
5. Build the base (§ 2.5).
6. Sign the base with `HTTP_SIGN` for the algorithm (§ 3.3).
7. Put the output bytes in the `Signature` field.

## The fields

```http
Signature-Input: sig1=("@method" "@authority" "@path" "content-digest" "content-length" "content-type");created=1618884473;keyid="test-key-rsa-pss"
Signature: sig1=:HIbjHC5rS0BYaa9v4QfD4193TORw7u9edguPh0AW3dMq9WImrlFrCGUDih47vAxi4L2YRZ3XMJc1uOKk/J0ZmZ+wcta4nKIgBkKq0rM9hs3CQyxXGxHLMCy8uqK488o+9jrptQ+xFPHK7a9sRL1IXNaagCNN3ZxJsYapFj+JXbmaI5rtAdSfSvzPuBCh+ARHBmWuNo1UzVVdHXrl8ePL4cccqlazIJdC4QEjrF+Sn4IxBQzTZsL9y9TP5FsZYzHvDqbInkTNigBcE9cKOYNFCn4D/WM7F6TNuZO9EgtzepLWcjTymlHzK7aXq6Am6sfOrpIC49yXjj3ae6HRalVc/g==:
```

- `Signature-Input` is a Dictionary: label to Inner List of component identifiers with the signature parameters (§ 4.1). `Signature` is a Dictionary: label to Byte Sequence (§ 4.2). Both are permanent registered fields (§ 6.1).
- Every signature uses both fields with the same label; labels are unique across all field lines (§ 4, § 4.1, § 4.2).
- Both fields MAY be trailers, but sending them as headers is RECOMMENDED because intermediaries may drop trailers (§ 4.1, § 4.2).
- Labels carry no meaning and intermediaries may relabel; put meaning in covered parameters such as `tag` (§ 7.2.5).

## Multiple signatures

- A message MAY carry several signatures, each with its own label, from one or several signers (§ 4.3). For example, a reverse proxy verifies the client signature `sig1`, changes `@authority`, adds `Forwarded`, and adds `proxy_sig` covering the new values, with a short `expires` (§ 4.3).
- Covering another signature's `Signature` value is NOT RECOMMENDED: signatures of signatures do not give transitive coverage (§ 4.3, § 7.3.7). To bind to an earlier signature, cover the same components and the earlier `Signature-Input` entry (§ 7.3.7).
- A TLS-terminating proxy can sign a `Client-Cert` field it adds (RFC 9440) so the backend trusts the proxy's mTLS check (Appendix B.3).

## Requesting signatures: `Accept-Signature`

```http
Accept-Signature: sig1=("@method" "@target-uri" "@authority" "content-digest" "cache-control");keyid="test-key-rsa-pss";created;tag="app-123"
```

- A Dictionary of label to requested covered components and parameters (§ 5.1). In a request it asks the server to sign the response; in a response it asks the client to sign its next request (§ 5).
- Requested parameters: `created` and `expires` with no value (generate them); `nonce`, `alg`, `keyid`, `tag` with the value to use (§ 5.1).
- The target message MUST include every requested label covering exactly the requested components, MUST process every requested parameter, and MAY add parameters and extra signatures (§ 5, § 5.2). Requested components MUST fit the target (no `@status` in a request; § 5).
- Processing: parse the Dictionary; for each member take the label, parse the components, check they apply, process the parameters (fail on conflict or impossibility), add any needed parameters, sign, attach (§ 5.2). The receiver MAY ignore requests that do not fit its parameters (§ 5.2).
- Responses from resources that negotiate signatures SHOULD be uncacheable or carry `Vary: Accept-Signature` (§ 5).
- A verifier can force a fresh signature by sending a new `nonce` in `Accept-Signature` (§ 7.2.2).

## Verifying a signature

The verifier MUST (§ 3.2):

1. Parse `Signature` and `Signature-Input`. If there are several signatures, choose the ones to process by policy; none applicable is an error. A `Signature` label without a matching `Signature-Input` label is an error.
2. Parse the chosen `Signature-Input` entry as a parameterized Inner List.
3. Parse the `Signature` entry as bytes.
4. Check the parameters and the application's required components (§ 3.2.1).
5. Resolve the key, from configuration or by dereferencing `keyid`, and decide whether it is trusted for this request. An unknown, untrusted or non-matching key MUST fail.
6. Determine the algorithm: start from the allowed set (anything else fails); use external configuration, the key's own algorithm, or `alg` from the registry. If more than one source states it, they MUST agree.
7. Rebuild the base from the received message (§ 2.5). The `@signature-params` value is the `Signature-Input` entry without its label.
8. If the key suits the algorithm, run `HTTP_VERIFY`.
9. The result is the verification result. Any failed or erroring step fails validation.

Then, for the message to count as covered (§ 7): the signature was expected, exists, verifies with the identified key and algorithm, the key and algorithm suit the context, the time bounds hold, the expected components are covered, and the component list suits the message.

After cryptographic verification:

- Validate `Content-Digest` or `Repr-Digest` against the received content (§ 7.2.8).
- Validate covered field values with the normal field parser, and reject the message if they do not validate (§ 7.5.6, § 7.5.7).
- Draw application values from the same context the base used (for example, read query parameters from the URI query, not merged form data; § 7.5.8).

## Security checklist

- **Verification actually runs.** Test with invalid signatures too; a skipped check passes every positive test (§ 7.1.1).
- **TLS still required.** Signatures give integrity of covered parts, not confidentiality; TLS also hides signatures from replaying attackers (§ 7.1.2, § 8.2).
- **Coverage.** Uncovered parts can be changed freely; trust only covered components, or strip sensitive uncovered parts (§ 7.2.1).
- **Replay.** Cover enough to tell messages apart, use `nonce` and reject repeats where needed, and bound validity with `created` and `expires` (§ 7.2.2).
- **`date` and `created`.** Time windows use `created`; an application may bound the skew between `Date` and `created` (§ 7.2.4).
- **Multiple signature confusion.** An attacker can add its own valid signature. Accept only signatures from expected signers. Decide whether one invalid signature rejects the message (denial of service by injection) or invalid ones are dropped (§ 7.2.6).
- **`tag` collisions.** `tag` only narrows which signatures to check; each still needs a full coverage check (§ 7.2.7).
- **Key specification mix-up.** A valid signature from the wrong key proves nothing; the verifier checks that key and algorithm are right for the message (§ 7.3.4).
- **Downgrades.** Reject RSA v1.5 signatures for a key meant for RSA-PSS, and never feed a public key into HMAC. Prefer static configuration over runtime `alg` (§ 7.3.6).
- **Signing signatures.** Do not rely on covering another signature's bytes (§ 7.3.7).
- **Denial by modification.** When signatures keep failing, compare signer and verifier bases to find the changed part; do not drop a requirement suspected of being attacked (§ 7.4.1).
- **Trusted base generation.** Do not cache or pass raw bases to downstream verifiers; the component that builds the base must be trusted by both sides (§ 7.4.2).
- **Context and proxies.** Take component values only from trusted sources. Behind a reverse proxy, either configure the external target URI (risky if misconfigured) or have the proxy verify and re-sign (§ 7.4.3). A verifier checking signatures from both client and proxy uses a separate context for each and confirms the differences are expected, for example against `Forwarded` (§ 7.4.4).
- **Field names starting with `@`.** Always derive `@` names; never read them from fields (§ 7.5.1).
- **Parsers.** Use fully compliant Structured Fields parsers on both sides; a lax parser of the `@signature-params` value can let an attacker inject base content (§ 7.5.3, erratum 8103).
- **Canonicalization.** Implement the full field algorithm: obs-fold removal and multi-line combination (§ 7.5.5). Use `bs` or single-line rules for fields like `Set-Cookie` (§ 7.5.6). Validate field contents to block padding attacks (§ 7.5.7).
- **Content.** Cover a digest and validate it; an intermediary that changes the content coding must re-sign (§ 7.2.8).

## Privacy

- Reusing one key across verifiers or over time lets them track the signer; use per-verifier keys or rotate when that matters (§ 8.1).
- Error messages should not reveal, for example, which key identifier a resource needs (§ 8.3).
- Required coverage can stop an intermediary removing sensitive data; it can verify, remove the data and re-sign (§ 8.4).

## Request and response checks

- [ ] Signature labels match across the two fields and are unique.
- [ ] `created` is present and within the profile's maximum age; `expires` is in the future when present.
- [ ] Every required component is in the list, with the required parameters.
- [ ] The key is known and trusted for this sender; the algorithm is allowed and matches the key.
- [ ] The base is rebuilt from the received message, never taken from the sender.
- [ ] The digest matches the content, and covered fields parse.
