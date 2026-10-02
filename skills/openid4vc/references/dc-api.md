# OpenID4VP over the Digital Credentials API

OpenID4VP 1.0 Appendix A defines how a verifier website (or a native app using a platform equivalent) sends an OpenID4VP request through the browser's Digital Credentials API (DC API). The browser call itself is defined in the W3C Digital Credentials Working Draft (4 September 2026), which is still a draft. HAIP §5.2 profiles this flow.

## Browser side (W3C Digital Credentials)

- Call `navigator.credentials.get({ digital: { requests: [{ protocol, data }] } })` to request a presentation. `requests` is a sequence of `DigitalCredentialGetRequest` objects, each with a `protocol` and `data`.
- Feature-detect with `DigitalCredential.userAgentAllowsProtocol(protocol)` before calling.
- The call requires transient activation, such as a click, and user mediation is always required.
- Cross-origin iframes need the `digital-credentials-get` permissions policy, for example `<iframe allow="digital-credentials-get">`.
- The result is a `DigitalCredential` with `protocol` and `data`.
- Registered presentation protocols are `openid4vp-v1-unsigned`, `openid4vp-v1-signed`, `openid4vp-v1-multisigned` and `org-iso-mdoc`.
- `openid4vci-v1` is registered for `navigator.credentials.create`, but the W3C draft marks its OpenID4VCI integration as "Coming Soon".

## Protocol identifiers (Appendix A.1)

| Value                      | Request                                                                        |
| -------------------------- | ------------------------------------------------------------------------------ |
| `openid4vp-v1-unsigned`    | Unsigned. Request parameters are members of `data` (A.3.1).                    |
| `openid4vp-v1-signed`      | Signed, JWS Compact Serialization in `data.request` (A.3.2.1).                 |
| `openid4vp-v1-multisigned` | Signed, JWS JSON Serialization, one signature per client identifier (A.3.2.2). |

## Request parameters (Appendix A.2)

- **Supported parameters**:
  - `client_id`, `response_type`, `response_mode`, `nonce`.
  - `client_metadata`, `request`, `transaction_data`, `dcql_query`, `verifier_info`.
  - Prefix-specific parameters such as `trust_chain`.
- **`client_id`**:
  - MUST be omitted in unsigned requests, and the wallet ignores it there.
  - MUST be present in signed requests. With multi-signed requests, it goes in each signature's protected header.
- **`response_mode`**: `dc_api` when the response is not encrypted, and `dc_api.jwt` when it is (§8.3).
- **`expected_origins`**:
  - REQUIRED in signed requests.
  - The wallet compares it with the actual origin. On a mismatch it returns an error, which SHOULD be `invalid_request`.
  - Wallets ignore it in unsigned requests.
- **`state`**: not defined for the DC API, so verifiers cannot expect it back.
- **Signature validation**: whether the wallet checks a signed request under its client identifier prefix is the wallet's decision (§5.9.3).

## Response (Appendix A.4)

- `data` holds the response parameters:
  - `vp_token`, for `dc_api`.
  - `response`, the encrypted JWT, for `dc_api.jwt`.
- Protocol errors come back as `{ "error": "<code>" }` in `data`, and the promise still fulfils.
- The response is bound to the origin. The presentation audience, for example the KB-JWT `aud`, MUST be `origin:<origin>`, such as `origin:https://verifier.example.com/`. This holds even for signed requests; the client identifier is not the audience here.
- mdoc presentations use the `OpenID4VPDCAPIHandover` session transcript (Appendix B.2.6.2). It hashes the origin (without the `origin:` prefix), the `nonce`, and the JWK thumbprint of the encryption key, which is `null` for `dc_api`.

## Example

```ts
const protocol = "openid4vp-v1-unsigned";

async function requestPresentation(): Promise<void> {
  if (
    typeof DigitalCredential === "undefined" ||
    !DigitalCredential.userAgentAllowsProtocol(protocol)
  ) {
    // fall back to a redirect or QR flow (OpenID4VP §9)
    return;
  }
  const request = await (
    await fetch("/presentation-request", { method: "POST" })
  ).json();
  // request: { response_type: "vp_token", response_mode: "dc_api.jwt", nonce, client_metadata, dcql_query }
  const credential = await navigator.credentials.get({
    digital: { requests: [{ protocol, data: request }] },
  } as CredentialRequestOptions);
  // send it to the server, which decrypts and validates with audience "origin:" + location.origin
  await fetch("/presentation-response", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credential),
  });
}

document
  .querySelector("#verify")
  ?.addEventListener("click", requestPresentation);
```

On the server, run the VP token checks from [`presentation.md`](presentation.md) with the stored `nonce` and the audience `origin:<origin>`. Handle `{ error }` as a normal outcome.

A signed request sends `{ request: "<JWS>" }` as `data`. The request object payload carries `client_id`, `expected_origins`, `response_type`, `response_mode`, `nonce`, `dcql_query` and `client_metadata` (A.3.2.1).

## Security and privacy (Appendix A.5, A.6)

- Replay protection works as in §14.1, but the origin replaces the client identifier.
- For signed requests, wallets use the full client identifier (§14.8).
- Unsigned encrypted responses have no integrity beyond the presentations (§14.5).
- Verifiers check the returned credentials themselves (§14.9).
- Value matching is best effort (§15.4.1).
- Selective disclosure (§15.4) and the privacy of issuer trust mechanisms (§15.10) still apply.

## Checklist

- [ ] The protocol identifier matches the request type, and feature detection runs first.
- [ ] Unsigned requests omit `client_id`; signed requests include `client_id` and `expected_origins`.
- [ ] The verifier checks that every presentation's audience is `origin:<its own origin>` and its nonce is the stored nonce.
- [ ] Error objects in `data` are handled.
- [ ] Under HAIP, `dc_api.jwt` is used, and wallets accept unsigned, signed and multi-signed requests (HAIP §5.2).
