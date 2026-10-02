# Signer and key directory

Section numbers refer to `draft-ietf-webbotauth-httpsig-protocol-00` unless they name another document.

## Roles (§ 3, § 5)

- **User**: initiates requests through an agent; a person or another system.
- **Agent**: the HTTP client that signs requests.
- **Origin**: the HTTP server that verifies signatures (directly, or through a fronting proxy, § 5.1).
- **Directory**: where the agent publishes its public keys; the origin resolves it from `Signature-Agent`.

## Signing profile (§ 5.2)

Covered components:

- MUST include at least one of `@authority` or `@target-uri`.
- MUST include the agent's own `Signature-Agent` member: `"signature-agent";key="<label>"` (§ 5.2.1).
- SHOULD add `@method`, `@path`, `@target-uri` or `@query-param` to narrow the signature to one request. Without them a signature over `@authority` works for any method, path or body on that authority until it expires.
- A signer that needs to bind the body MUST send and cover `Content-Digest` (RFC 9530); the profile does not require it.
- Additional headers MAY be covered, on the agent's initiative or because the origin asked (§ 5.2.4).

Parameters (all required):

| Parameter | Value                                                                                               |
| --------- | --------------------------------------------------------------------------------------------------- |
| `created` | UNIX seconds.                                                                                       |
| `expires` | UNIX seconds; no more than 24 hours after `created` is recommended.                                 |
| `keyid`   | base64url JWK SHA-256 thumbprint: RFC 7638 § 3.2 for RSA and EC, RFC 8037 Appendix A.3 for Ed25519. |
| `tag`     | `web-bot-auth`.                                                                                     |

Algorithms should be registered in the HTTP Signature Algorithms registry (§ 5.2). HMAC is forbidden (§ 6.4). Use a distinct key and directory per agent you want to tell apart (§ 6.5). Replay protection with `nonce` follows RFC 9421 § 7.2.2; the profile adds no nonce requirement (§ 5.2.3).

Generate the signature for each request with bounded `created` and `expires`; a precomputed signature reused across requests is a bearer token and must not be treated as a long-lived credential (§ 6.9, Appendix C.12).

## Signature-Agent (§ 5.2.1)

- A Structured Fields Dictionary. Each member value is a String holding an `https` URI; each member may carry a `type` parameter (a Token) naming the discovery mechanism. No `type` means `directory`.
- Signers MUST send the dictionary form. Older deployments sent a bare String; verifiers MAY accept it as a single member keyed by the covering signature's label.
- One member per signature label (§ 5.2.2).

Discovery types (§ 5.5):

| `type`                | Member value                                                                             | Resolves to                                                                  |
| --------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `directory` (default) | An origin, for example `https://signer.example.com` (an empty path `/` may be accepted). | The JWKS at `/.well-known/http-message-signatures-directory` on that origin. |
| `jwks_uri`            | A JWK Set URL.                                                                           | That JWKS.                                                                   |
| `cimd`                | An OAuth Client ID Metadata Document URL.                                                | The document's `jwks` or `jwks_uri`.                                         |

```http
Signature-Agent: sig1="https://signer.example.com"
Signature-Agent: sig1="https://signer.example.com/jwks.json";type=jwks_uri
Signature-Agent: sig1="https://signer.example.com/card";type=cimd
```

The identifier a verifier ends up with is the URL it resolved, minus query and fragment: for `directory` the well-known URI, otherwise the member value (§ 5.5). Only `directory` names a domain operator, because the well-known path is reserved (§ 4.5).

## Example request (§ 5.2.5)

```http
GET /articles/42 HTTP/1.1
Host: example.com
Signature-Agent: sig1="https://signer.example.com"
Signature-Input: sig1=("@authority" "@method" "@path" "signature-agent";key="sig1");created=1735689600;expires=1735693200;keyid="<thumbprint>";tag="web-bot-auth"
Signature: sig1=:<base64 signature>:
```

## Multiple signatures (§ 5.2.2)

- Each signature has its own label and its own `Signature-Agent` member.
- A signer that covers another label's `signature` member must also cover that label's `signature-input` member and every component it lists. If it changed one of those values, it must not cover the inner signature.
- Each signature is verified independently. Covering another signature is evidence those bytes were present, not authorization, delegation or consent. Delegation and chaining are out of scope (Appendix D.1).

## Directory format (§ 5.5.1)

- A JSON Web Key Set (RFC 7517 § 5). `alg` values are limited to the HTTP Signature Algorithms registry.
- Served over HTTPS with status 200. At the well-known URI, served as `application/http-message-signatures-directory+json` (§ 8.1, § 8.2).
- If a JWK at the well-known URI carries `kid`, it must equal the thumbprint, so verifiers can match `keyid` against `kid` (§ 5.5).
- Contain only keys actively used for signing (§ 7.4).
- Make it reachable without Web Bot Auth and without bot-protection rules that block verifiers; support GET, and ideally HEAD, ETag, Last-Modified and Cache-Control (Appendix C.2). A permissive CORS policy without credentials is fine for browser-based verifiers (Appendix C.11).

```http
GET /.well-known/http-message-signatures-directory HTTP/1.1
Host: signer.example.com
Accept: application/http-message-signatures-directory+json

HTTP/1.1 200 OK
Content-Type: application/http-message-signatures-directory+json
Cache-Control: max-age=86400

{
  "keys": [
    {
      "kty": "OKP",
      "crv": "Ed25519",
      "kid": "<thumbprint>",
      "x": "<base64url public key>",
      "use": "sig",
      "nbf": 1735689600,
      "exp": 1738368000
    }
  ]
}
```

## Rotation and compromise (§ 4.2, § 5.5.2, § 6.3)

1. Add the new key before its first use.
2. Keep the old key until its expiration.
3. Remove expired keys.

The URL stays the same, so identity continues across rotation. Removing a key deactivates it once verifiers' caches expire; the cache lifetime bounds that. The protocol has no revocation: on compromise, remove the key and publish a replacement immediately; short signature lifetimes are the only faster lever.

## Directory response signatures (Appendix B)

Recommended for `directory`: one RFC 9421 signature per key on the directory response, proving possession and binding the key set to the authority. Each must cover `@authority` with the `req` flag and `content-digest`, and set `created`, `expires`, `keyid` (thumbprint) and `tag="http-message-signatures-directory"`. Verifiers reject such a signature if `created` is in the future. Set `expires` well beyond the republication interval of any list that redistributes your keys (Appendix C.8).

## Privacy (§ 7)

- Signing makes the agent publicly identifiable; an agent that does not want that should not use this protocol (§ 7.1).
- Do not tie a key to an individual person; use role, company or product identities (§ 7.2).
- Avoid long-lived globally unique identifiers where possible, support rotation, and do not sign data that correlates activity across contexts (§ 7.3).

## Thumbprint and signing sketch

Framework-neutral TypeScript with Web Crypto (Ed25519 support depends on the runtime):

```ts
const b64url = (bytes: ArrayBuffer | Uint8Array) =>
  btoa(String.fromCharCode(...new Uint8Array(bytes)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

// RFC 7638 § 3.2 with RFC 8037 Appendix A.3: required members, lexicographic order.
async function ed25519Thumbprint(jwk: {
  crv: string;
  kty: string;
  x: string;
}): Promise<string> {
  const canonical = JSON.stringify({ crv: jwk.crv, kty: jwk.kty, x: jwk.x });
  return b64url(
    await crypto.subtle.digest("SHA-256", new TextEncoder().encode(canonical)),
  );
}

async function signRequest(
  url: URL,
  method: string,
  privateKey: CryptoKey,
  keyid: string,
  signatureAgent: string,
): Promise<Record<string, string>> {
  const created = Math.floor(Date.now() / 1000);
  const expires = created + 300;
  const agentHeader = `sig1="${signatureAgent}"`;
  const params =
    `("@authority" "@method" "@path" "signature-agent";key="sig1")` +
    `;created=${created};expires=${expires};keyid="${keyid}";tag="web-bot-auth"`;
  const base = [
    `"@authority": ${url.host}`,
    `"@method": ${method.toUpperCase()}`,
    `"@path": ${url.pathname}`,
    `"signature-agent";key="sig1": "${signatureAgent}"`,
    `"@signature-params": ${params}`,
  ].join("\n");
  const signature = await crypto.subtle.sign(
    "Ed25519",
    privateKey,
    new TextEncoder().encode(base),
  );
  return {
    "signature-agent": agentHeader,
    "signature-input": `sig1=${params}`,
    signature: `sig1=:${btoa(String.fromCharCode(...new Uint8Array(signature)))}:`,
  };
}
```

This sketch skips Structured Fields escaping and `@authority` normalization (RFC 9421 § 2.2.3); use an RFC 9421 library in production and check it against the test vectors in Appendix E of the draft.
