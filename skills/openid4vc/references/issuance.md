# Issuance with OpenID4VCI 1.0

Section numbers refer to OpenID for Verifiable Credential Issuance 1.0 (Final). The issuer is an OAuth 2.0 protected resource; its authorization server may be the same service or a separate one.

## Roles and endpoints

| Endpoint                     | Owner                | Purpose                                                            |
| ---------------------------- | -------------------- | ------------------------------------------------------------------ |
| Credential offer             | Issuer               | Starts an issuer-initiated flow (§4).                              |
| Authorization endpoint, PAR  | Authorization server | Authorization code flow (§5). PAR is RECOMMENDED (§5.1.4).         |
| Token endpoint               | Authorization server | Exchanges an authorization code or pre-authorized code (§6).       |
| Nonce endpoint               | Issuer               | Returns a fresh `c_nonce`. REQUIRED if proofs must carry one (§7). |
| Credential endpoint          | Issuer               | Issues credentials (§8). REQUIRED.                                 |
| Deferred credential endpoint | Issuer               | Returns credentials issued later (§9).                             |
| Notification endpoint        | Issuer               | Receives wallet events about issued credentials (§11).             |

## Issuer metadata (§12.2)

- The issuer identifier is an `https` URL without query or fragment (§12.2.1).
- Metadata is at `/.well-known/openid-credential-issuer` inserted between the host and any path. For `https://issuer.example.com/tenant`, fetch `https://issuer.example.com/.well-known/openid-credential-issuer/tenant`. The wallet uses GET over TLS (§12.2.2).
- The issuer MUST support `application/json`. It may also serve signed metadata as `application/jwt` with `typ` `openidvci-issuer-metadata+jwt` (§12.2.3). The wallet may send `Accept-Language`.

| Parameter                                                                 | Requirement                                                                                                                                    |
| ------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `credential_issuer`                                                       | REQUIRED. Equals the issuer identifier.                                                                                                        |
| `authorization_servers`                                                   | OPTIONAL. Absent means the issuer is its own authorization server.                                                                             |
| `credential_endpoint`                                                     | REQUIRED.                                                                                                                                      |
| `nonce_endpoint`, `deferred_credential_endpoint`, `notification_endpoint` | OPTIONAL.                                                                                                                                      |
| `credential_request_encryption`                                           | OPTIONAL. `jwks`, `enc_values_supported` and `encryption_required` are REQUIRED inside it; `zip_values_supported` is optional.                 |
| `credential_response_encryption`                                          | OPTIONAL. `alg_values_supported`, `enc_values_supported` and `encryption_required` are REQUIRED inside it; `zip_values_supported` is optional. |
| `batch_credential_issuance`                                               | OPTIONAL. `batch_size` is REQUIRED inside it.                                                                                                  |
| `display`                                                                 | OPTIONAL. Per-locale name and logo.                                                                                                            |
| `credential_configurations_supported`                                     | REQUIRED. Map from configuration id to configuration.                                                                                          |

Each credential configuration has:

- `format`: REQUIRED.
- `scope`: OPTIONAL. Without it, the credential can only be requested with `authorization_details`.
- `credential_signing_alg_values_supported`: OPTIONAL.
- `cryptographic_binding_methods_supported`: present when holder binding is required. Values include `jwk`, `cose_key` and `did:<method>`.
- `proof_types_supported`: MUST be present if binding methods are present. It maps each proof type to `proof_signing_alg_values_supported` (REQUIRED) and an optional `key_attestations_required` object with `key_storage` and `user_authentication`.
- `credential_metadata`: OPTIONAL. It holds `display` and `claims`. Format-specific display metadata takes precedence.
- Format-specific parameters such as `vct` or `doctype`. See [`formats.md`](formats.md).

```json
{
  "credential_issuer": "https://issuer.example.com",
  "credential_endpoint": "https://issuer.example.com/credential",
  "nonce_endpoint": "https://issuer.example.com/nonce",
  "credential_configurations_supported": {
    "identity_sd_jwt": {
      "format": "dc+sd-jwt",
      "vct": "https://credentials.example.com/identity_credential",
      "scope": "identity_credential",
      "cryptographic_binding_methods_supported": ["jwk"],
      "credential_signing_alg_values_supported": ["ES256"],
      "proof_types_supported": {
        "jwt": { "proof_signing_alg_values_supported": ["ES256"] }
      }
    }
  }
}
```

## Credential offer (§4)

- The offer object has these members (§4.1.1):
  - `credential_issuer`: REQUIRED.
  - `credential_configuration_ids`: REQUIRED. A non-empty array of unique ids.
  - `grants`: OPTIONAL. If it is absent, the wallet determines the grants from the metadata.
- The `authorization_code` grant may carry:
  - `issuer_state`: if received, the wallet MUST include it in the authorization request.
  - `authorization_server`: names which of the issuer's authorization servers to use.
- The `urn:ietf:params:oauth:grant-type:pre-authorized_code` grant carries:
  - `pre-authorized_code`: REQUIRED. It is short-lived and single use.
  - Optionally `tx_code`. When it is present, even as `{}`, the wallet must ask the user for a transaction code. It can have `input_mode` (`numeric` by default, or `text`), `length` and `description` (at most 300 characters).
- Delivery (§4.1.2, §4.1.3):
  - By value: the `credential_offer` parameter.
  - By reference: `credential_offer_uri`, which the wallet GETs and which returns `application/json`. The issuer SHOULD use a unique URI per offer.
  - Offers are links or QR codes, for example `openid-credential-offer://?credential_offer_uri=...`.
- Wallets ignore unknown offer parameters.

```json
{
  "credential_issuer": "https://issuer.example.com",
  "credential_configuration_ids": ["identity_sd_jwt"],
  "grants": {
    "urn:ietf:params:oauth:grant-type:pre-authorized_code": {
      "pre-authorized_code": "oaKazRN8I0IbtZ0C7JuMn5",
      "tx_code": { "input_mode": "numeric", "length": 6 }
    }
  }
}
```

The wallet treats every offer as untrusted. It runs the same issuer checks as a wallet-initiated flow (§13.5), preferably talks only to trusted issuers, and may show the user which issuer will receive the transaction code (§13.6.2).

## Authorization (§5)

- **With `authorization_details`** (§5.1.1, RFC 9396): use type `openid_credential` with `credential_configuration_id` (REQUIRED) and optional `claims`. When the metadata lists `authorization_servers`, `locations` MUST carry the issuer identifier.
- **With `scope`** (§5.1.2): use the configuration's `scope` from the metadata.
- **With PAR**: PAR is RECOMMENDED (§5.1.4). Wallets that authenticate with a wallet attestation send the `OAuth-Client-Attestation` and `OAuth-Client-Attestation-PoP` headers.

## Token (§6)

- **Pre-authorized code grant** (§6.1):
  - Send `pre-authorized_code`, plus `tx_code` if the offer had a `tx_code` object.
  - Client authentication is optional when the authorization server allows anonymous access.
  - Errors (§6.3):
    - A missing or unexpected `tx_code` returns `invalid_request`.
    - A wrong `tx_code` or an expired code returns `invalid_grant`.
    - A missing client id where anonymous access is unsupported returns `invalid_client`.
- **Token response** (§6.2): when `authorization_details` was used, the response repeats it with `credential_identifiers`, a non-empty array of dataset ids. The wallet uses those ids in credential requests.
- **Access tokens** (§13.10): tokens that live longer than about 5 minutes MUST NOT be issued unless sender-constrained. §13.2 recommends DPoP for native wallets and wallet attestations instead of `private_key_jwt` or mTLS.

## Nonce (§7)

```http
POST /nonce HTTP/1.1
Host: issuer.example.com

HTTP/1.1 200 OK
Content-Type: application/json
Cache-Control: no-store

{ "c_nonce": "wKI4LT17ac15ES9bw8ac4" }
```

- The nonce endpoint needs no access token. Values are unpredictable, and the response is `Cache-Control: no-store`.
- The response may include a `DPoP-Nonce` header.
- A wallet may reuse a `c_nonce` until the issuer rejects it (§13.8).

## Credential request (§8.2)

- Identify the credential:
  - Use `credential_identifier` if the token response returned `credential_identifiers`.
  - Otherwise use `credential_configuration_id`. Never send both.
- `proofs` holds exactly one proof-type key with a non-empty array. It MUST be present when the configuration has `proof_types_supported`. One proof per key; a batch uses several keys.
- Add `credential_response_encryption` (`jwk`, `enc`, optional `zip`) to request an encrypted response. Requests that ask for response encryption MUST themselves be encrypted (§8.2).
- Unencrypted requests are `application/json`. Encrypted requests are `application/jwt` JWEs (§10). The issuer ignores unknown parameters.

```http
POST /credential HTTP/1.1
Host: issuer.example.com
Content-Type: application/json
Authorization: DPoP <access token>
DPoP: <proof JWT>

{
  "credential_configuration_id": "identity_sd_jwt",
  "proofs": { "jwt": ["eyJ0eXAiOiJvcGVuaWQ0dmNpLXByb29mK2p3dCIs..."] }
}
```

### The `jwt` proof (Appendix F.1)

| Part                | Rule                                                                                                    |
| ------------------- | ------------------------------------------------------------------------------------------------------- |
| `typ`               | REQUIRED, `openid4vci-proof+jwt`.                                                                       |
| `alg`               | REQUIRED. Asymmetric, never `none` or a MAC. It must be listed in `proof_signing_alg_values_supported`. |
| `kid`, `jwk`, `x5c` | Exactly one, naming the key to bind. `kid` is a DID URL when binding to a DID.                          |
| `key_attestation`   | OPTIONAL header carrying an Appendix D key attestation.                                                 |
| `trust_chain`       | OPTIONAL OpenID Federation trust chain; `kid` is then required.                                         |
| `iss`               | The wallet's `client_id`. Omitted for anonymous pre-authorized access.                                  |
| `aud`               | REQUIRED, the issuer identifier.                                                                        |
| `iat`               | REQUIRED.                                                                                               |
| `nonce`             | The `c_nonce`. REQUIRED when the issuer has a nonce endpoint.                                           |

Other proof types are `di_vp`, a W3C Verifiable Presentation with `challenge` and `domain` (F.2), and `attestation`, a key attestation alone with its `nonce` (F.3).

### Verifying a proof (Appendix F.4)

```ts
type ProofCheck =
  | { ok: true; key: JsonWebKey }
  | { ok: false; error: "invalid_proof" | "invalid_nonce" };

interface DecodedJws {
  header: {
    typ?: string;
    alg?: string;
    kid?: string;
    jwk?: JsonWebKey & { d?: string };
    x5c?: string[];
  };
  payload: { aud?: unknown; iat?: unknown; nonce?: unknown; iss?: unknown };
}

export function checkJwtProof(
  proof: DecodedJws,
  ctx: {
    issuer: string;
    allowedAlgs: string[];
    nonceIsValid?: (nonce: string) => boolean; // set when the issuer has a nonce endpoint
    resolveKey: (header: DecodedJws["header"]) => JsonWebKey | null;
    verifySignature: (key: JsonWebKey) => boolean;
    now: number;
    maxAgeSeconds: number;
    maxSkewSeconds: number;
  },
): ProofCheck {
  const { header, payload } = proof;
  if (header.typ !== "openid4vci-proof+jwt")
    return { ok: false, error: "invalid_proof" };
  if (!header.alg || header.alg === "none" || header.alg.startsWith("HS"))
    return { ok: false, error: "invalid_proof" };
  if (!ctx.allowedAlgs.includes(header.alg))
    return { ok: false, error: "invalid_proof" };
  const keyRefs = [header.kid, header.jwk, header.x5c].filter(
    (v) => v !== undefined,
  );
  if (keyRefs.length !== 1) return { ok: false, error: "invalid_proof" };
  if (header.jwk?.d !== undefined) return { ok: false, error: "invalid_proof" };
  if (payload.aud !== ctx.issuer || typeof payload.iat !== "number")
    return { ok: false, error: "invalid_proof" };
  if (
    payload.iat > ctx.now + ctx.maxSkewSeconds ||
    payload.iat < ctx.now - ctx.maxAgeSeconds
  ) {
    return { ok: false, error: "invalid_proof" };
  }
  const key = ctx.resolveKey(header);
  if (!key || !ctx.verifySignature(key))
    return { ok: false, error: "invalid_proof" };
  if (
    ctx.nonceIsValid &&
    (typeof payload.nonce !== "string" || !ctx.nonceIsValid(payload.nonce))
  ) {
    return { ok: false, error: "invalid_nonce" };
  }
  return { ok: true, key };
}
```

§13.8 allows a small amount of future `iat` for clock skew, and suggests nonces that encode server time to avoid relying on `iat`.

## Credential response (§8.3)

- **200**: `credentials` is an array of `{ "credential": ... }`. Its length matches the number of keys proved in `proofs`, unless the issuer issues fewer. Binary formats are base64url strings. The response may add a `notification_id`.
- **202**: `transaction_id` and `interval`, the minimum wait in seconds before the wallet calls the deferred endpoint.
- The response is `application/json` unless encrypted. The wallet ignores unknown fields.
- **Errors** (§8.3.1.2): 400 with one of these codes. Error responses are never encrypted.
  - `invalid_credential_request`
  - `unknown_credential_configuration`
  - `unknown_credential_identifier`
  - `invalid_proof`
  - `invalid_nonce`
  - `invalid_encryption_parameters`
  - `credential_request_denied`

```json
{
  "credentials": [
    { "credential": "eyJhbGciOiJFUzI1NiIsInR5cCI6ImRjK3NkLWp3dCJ9...~" }
  ],
  "notification_id": "3fwe98js"
}
```

## Deferred issuance (§9)

- The request is a POST with `transaction_id`, and optionally a new `credential_response_encryption` that replaces the original.
- The response:
  - 200 with `credentials`, when the credentials are ready.
  - 202 with the same `transaction_id` and an `interval`, when they are not.
- The issuer invalidates a `transaction_id` once its credentials are delivered.
- Errors:
  - `invalid_transaction_id` for a `transaction_id` the issuer did not issue or that was already used.
  - `credential_request_denied` when issuance is no longer possible. The wallet then stops polling.

## Notification (§11)

- The wallet POSTs `{ "notification_id": "...", "event": "...", "event_description": "..." }` with the access token. `event_description` is optional.
- `event` is one of:
  - `credential_accepted`
  - `credential_failure`
  - `credential_deleted`, when the user caused the failure.
  - A partial batch failure counts as a failure.
- Notifications are idempotent and not guaranteed to arrive. The issuer answers with a 2xx status, and 204 is RECOMMENDED (§11.2). On error it answers 400 with `invalid_notification_id` or `invalid_notification_request`.

## Encryption (§10)

- An encrypted payload is a JWT encrypted as a JWE, sent as `application/jwt`.
- The JWE `alg` equals the chosen JWK's `alg`, and its `kid` is echoed.
- Compression happens only when `zip` is set.
- Unencrypted messages are rejected when encryption is required.
- Encryption adds protection only when it terminates in a different component than TLS (§13.11).

## Attestations

- **Key attestation** (Appendix D):
  - A JWT with `typ` `key-attestation+jwt`, signed by the wallet provider or the key storage component.
  - It carries `iat`, `attested_keys` (a non-empty JWK array) and optional `key_storage`, `user_authentication`, `certification`, `nonce` and `status`.
  - `exp` is REQUIRED when the attestation is used with the `jwt` proof type.
  - Attack-potential values are `iso_18045_high`, `iso_18045_moderate`, `iso_18045_enhanced-basic` and `iso_18045_basic`.
  - The issuer SHOULD issue one credential per attested key.
- **Wallet attestation** (Appendix E):
  - Client authentication for native wallets, following the OAuth Attestation-Based Client Authentication draft. The JWT `typ` is `oauth-client-attestation+jwt`, with optional `wallet_name`, `wallet_link` and `status`.
  - The authorization server verifies that the signer is trusted.

## Security checklist (§13)

- [ ] Offers are processed like wallet-initiated flows, and the wallet does not trust an issuer just because it sent an offer.
- [ ] Pre-authorized codes are short-lived and single use, and a transaction code is used where shoulder surfing or link sharing is a risk.
- [ ] Every proof is fresh (`c_nonce`), audience-bound (`aud`) and verified per F.4.
- [ ] Long-lived access tokens are sender-constrained, and wallets store bearer tokens encrypted.
- [ ] TLS follows BCP 195 with certificate checks (§13.9).
- [ ] In split-architecture wallets, codes and proofs are not routed through an untrusted server component (§13.4).
