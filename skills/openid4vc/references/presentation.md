# Presentation with OpenID4VP 1.0

Section numbers refer to OpenID for Verifiable Presentations 1.0 (Final). The verifier acts as an OAuth 2.0 client, and the wallet acts as the authorization server that returns a VP token.

## Authorization request (§5)

- The request may be sent by value, as a JAR request object (RFC 9101), or by reference with `request_uri`.
- Request objects MUST have `typ` `oauth-authz-req+jwt`, and wallets reject others. The wallet ignores `iss` in a request object (§5).
- Wallets ignore unknown parameters, with one exception: a wallet that does not support `transaction_data` MUST reject requests that contain it (§5, §8.4).

| Parameter            | Rule                                                                                                                                                                                                                                       |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `response_type`      | `vp_token` returns the token in the authorization response. `vp_token id_token` adds a SIOPv2 ID token. `code` returns it from the token endpoint (§5.6, §8).                                                                              |
| `response_mode`      | REQUIRED (§5.2). `fragment` and `direct_post` are plaintext. `direct_post.jwt` is encrypted. `dc_api` and `dc_api.jwt` are for the DC API.                                                                                                 |
| `client_id`          | REQUIRED, with its client identifier prefix (§5.9).                                                                                                                                                                                        |
| `nonce`              | REQUIRED. A fresh random value per request, using only ASCII URL-safe characters (§5.2).                                                                                                                                                   |
| `dcql_query`         | The DCQL query (§6). Either it or a `scope` that stands for a DCQL query MUST be present, never both (§5.1, §5.5).                                                                                                                         |
| `client_metadata`    | `jwks` for response encryption (each key has a `kid`; never used to verify request signatures), `encrypted_response_enc_values_supported`, and `vp_formats_supported` (§5.1). Authoritative metadata, for example from a federation, wins. |
| `state`              | REQUIRED when any credential is requested without holder binding, outside the DC API. It is then a fresh value of at least 128 bits, checked on return (§5.3).                                                                             |
| `request_uri_method` | `get` or `post`. Only allowed together with `request_uri` (§5.1, §5.10).                                                                                                                                                                   |
| `transaction_data`   | Base64url JSON objects, each with `type` and `credential_ids` (§5.1, §8.4).                                                                                                                                                                |
| `verifier_info`      | Attestations about the verifier: `format`, `data` and optional `credential_ids` (§5.1, §5.11).                                                                                                                                             |
| `response_uri`       | REQUIRED with `direct_post` and `direct_post.jwt`. `redirect_uri` MUST then be absent (§8.2).                                                                                                                                              |

### `request_uri_method=post` (§5.10)

- The wallet POSTs `wallet_metadata` and `wallet_nonce` as form data, with `Accept: application/oauth-authz-req+jwt`.
- The verifier returns a signed request object that includes the `wallet_nonce`.
- The wallet checks that `wallet_nonce` and the `client_id` match the outer request, and uses only the request object's parameters.

## Client identifier prefixes (§5.9)

The prefix is the text before the first `:`. A `client_id` without a `:` means a pre-registered client. Use the full prefixed value everywhere, including as the presentation audience (§5.9.1, §14.8).

| Prefix                      | Authentication                                                                                                                                | Metadata                                            |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| `redirect_uri:`             | None. Requests cannot be signed.                                                                                                              | All of it from `client_metadata`.                   |
| `openid_federation:`        | Federation trust chain; optional `trust_chain` parameter.                                                                                     | From the trust chain. `client_metadata` is ignored. |
| `decentralized_identifier:` | Signed. The `kid` names a key in the DID document.                                                                                            | `client_metadata`.                                  |
| `verifier_attestation:`     | Signed with the key in the attestation's `cnf`. The attestation goes in the `jwt` header, and its `sub` equals the identifier (§12).          | `client_metadata`.                                  |
| `x509_san_dns:`             | Signed, with an `x5c` leaf whose dNSName SAN equals the identifier. Unless the client is otherwise trusted, the redirect URI host must match. | `client_metadata`.                                  |
| `x509_hash:`                | Signed, with an `x5c` leaf whose base64url SHA-256 of the DER encoding equals the identifier. The wallet validates the chain.                 | `client_metadata`.                                  |
| `origin:`                   | Reserved for the DC API audience. Wallets MUST NOT accept it in requests.                                                                     | Not applicable.                                     |

The signing prefixes require the verifier to store private keys securely, so they do not suit public native apps (§5.9.3).

```json
{
  "client_id": "x509_hash:Uvo3HtuIxuhC92rShpgqcT3YXwrqRxWEviRiA0OZszk",
  "response_type": "vp_token",
  "response_mode": "direct_post.jwt",
  "response_uri": "https://verifier.example.com/post",
  "nonce": "n-0S6_WzA2Mj",
  "state": "eyJhb...6-sVA",
  "dcql_query": {
    "credentials": [
      {
        "id": "pid",
        "format": "dc+sd-jwt",
        "meta": {
          "vct_values": ["https://credentials.example.com/identity_credential"]
        }
      }
    ]
  },
  "client_metadata": {
    "jwks": {
      "keys": [
        {
          "kty": "EC",
          "crv": "P-256",
          "use": "enc",
          "alg": "ECDH-ES",
          "kid": "ac",
          "x": "...",
          "y": "..."
        }
      ]
    },
    "encrypted_response_enc_values_supported": ["A128GCM", "A256GCM"],
    "vp_formats_supported": {
      "dc+sd-jwt": {
        "sd-jwt_alg_values": ["ES256"],
        "kb-jwt_alg_values": ["ES256"]
      }
    }
  }
}
```

## Wallet invocation (§9)

- Wallets are invoked through an `authorization_endpoint` that is either:
  - A custom URL scheme such as `openid4vp://` (§13.1.2).
  - A URL, including universal links and app links.
- For cross-device flows, either form can be shown as a QR code.
- The wallet can also be invoked through the Digital Credentials API, which avoids the session-fixation problems of redirects (§14.2). See [`dc-api.md`](dc-api.md).
- The §8.2 example passes only `client_id` and `request_uri` in the link, and the wallet fetches the request object from `request_uri`.

## Response (§8)

`vp_token` is a JSON object. Each key is a DCQL credential query `id`, and each value is an array of presentations (§8.1):

- With `multiple` absent or `false`, the array holds exactly one presentation.
- Optional queries with no match have no entry at all.

```json
{ "pid": ["eyJhbGci...QMA"] }
```

### `direct_post` and `direct_post.jwt` (§8.2, §8.3.1)

- **Wallet**:
  - With `direct_post`, it POSTs `vp_token` and `state` as form data to `response_uri`.
  - With `direct_post.jwt`, it POSTs a single `response` parameter holding the encrypted JWT.
  - If the wallet cannot encrypt, it may send an unencrypted error.
- **Response URI**:
  - Answers 200 JSON.
  - May include a `redirect_uri`, which MUST carry a fresh random value of 128 bits or more, such as `response_code`. The wallet follows the redirect.
  - The verifier's frontend must present that code to fetch the result. This is the session-fixation defence (§14.2).
  - It does not help cross-device flows or flows that open a different browser.
- Protect the response URI:
  - Accept only a `state` that matches a recent request (§14.3.2).
  - Authenticate any internal interface that hands out response data (§14.3.3).

```http
HTTP/1.1 200 OK
Content-Type: application/json
Cache-Control: no-store

{ "redirect_uri": "https://verifier.example.com/cb#response_code=091535f699ea575c7937fa5f0f454aee" }
```

### Encryption (§8.3)

- The response is an unsigned JWT encrypted as a JWE. Its payload holds the §8.1 response parameters as top-level members.
- The wallet encrypts to a key from `client_metadata.jwks`, or one obtained through the client identifier prefix. The JWE `alg` equals the JWK's `alg`, and the `kid` is echoed.
- `enc` comes from `encrypted_response_enc_values_supported`, with `A128GCM` as the default.
- Encryption alone gives no integrity. The verifier still relies on the signed presentations (§14.5).

### Errors (§8.5)

| Code                         | When                                                                                                                                                           |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `invalid_scope`              | Unknown or malformed scope.                                                                                                                                    |
| `invalid_request`            | Any of these: both `dcql_query` and a DCQL scope, or neither; an unsupported or violated client identifier prefix; `redirect_uri` together with `direct_post`. |
| `invalid_client`             | `client_metadata` was sent for a client whose metadata the wallet already knows.                                                                               |
| `access_denied`              | No matching credentials, no user consent, or user authentication failed.                                                                                       |
| `vp_formats_not_supported`   | None of the requested formats are supported.                                                                                                                   |
| `invalid_request_uri_method` | `request_uri_method` is neither `get` nor `post`.                                                                                                              |
| `invalid_transaction_data`   | Unknown type, wrong or missing fields, or unmatched `credential_ids`.                                                                                          |
| `wallet_unavailable`         | The wallet could not be invoked, and another component answers on its behalf.                                                                                  |

## Validating the VP token (§8.6, §14.1.2)

1. Check the shape: an object keyed by query ids, with array values that respect `multiple`.
2. For each presentation:
   - Verify the integrity and authenticity of the presentation and credential.
   - Check that the credential meets its query.
   - Require holder binding unless the query set `require_cryptographic_holder_binding: false`.
   - Check that the holder-binding proof carries this request's `nonce` and the full `client_id` (or `origin:<origin>` over the DC API).
   - Apply the verifier's own policy, such as trust framework and revocation checks.
3. Discard any presentation that fails a check. Reject the whole VP token if the set no longer satisfies §6.4, or if any presentation has the wrong nonce.

```ts
type Presentation = string | Record<string, unknown>;

interface QueryRule {
  id: string;
  multiple: boolean;
  requireHolderBinding: boolean;
}

interface Verified {
  holderBound: boolean;
  nonce?: string;
  audience?: string;
  satisfiesQuery: boolean;
}

export function validateVpToken(
  vpToken: Record<string, Presentation[]>,
  ctx: {
    queries: QueryRule[];
    nonce: string;
    audience: string; // full client_id, or "origin:<origin>" over the DC API
    verifyPresentation: (queryId: string, p: Presentation) => Verified | null; // format-specific signature and status checks
    satisfiesCredentialSets: (accepted: Set<string>) => boolean; // DCQL §6.4.2
  },
):
  | { ok: true; accepted: Map<string, Verified[]> }
  | { ok: false; reason: string } {
  const known = new Map(ctx.queries.map((q) => [q.id, q]));
  const accepted = new Map<string, Verified[]>();
  for (const [id, presentations] of Object.entries(vpToken)) {
    const rule = known.get(id);
    if (!rule || !Array.isArray(presentations) || presentations.length === 0) {
      return { ok: false, reason: `unexpected entry ${id}` };
    }
    if (!rule.multiple && presentations.length !== 1)
      return { ok: false, reason: `too many for ${id}` };
    const good: Verified[] = [];
    for (const p of presentations) {
      const v = ctx.verifyPresentation(id, p);
      if (!v || !v.satisfiesQuery) continue;
      if (rule.requireHolderBinding && !v.holderBound) continue;
      if (v.holderBound) {
        if (v.nonce !== ctx.nonce) return { ok: false, reason: "wrong nonce" };
        if (v.audience !== ctx.audience) continue;
      }
      good.push(v);
    }
    if (good.length > 0) accepted.set(id, good);
  }
  if (!ctx.satisfiesCredentialSets(new Set(accepted.keys())))
    return { ok: false, reason: "credential sets not met" };
  return { ok: true, accepted };
}
```

## Security checklist (§14)

- [ ] Every request has a fresh `nonce`, and every holder-bound presentation is checked against it and the audience (§14.1.2).
- [ ] Presentations without holder binding are accepted only where replay is an acceptable risk, and `state` binds the response (§5.3, §14.1.1).
- [ ] `direct_post` flows return a response code in `redirect_uri` and require it to fetch results (§14.2).
- [ ] Wallets validate response URIs like redirect URIs, or trust them through a signed request (§14.3.1).
- [ ] Verifiers that log users in by a credential claim use a stable, never-reassigned claim together with the issuer identifier (§14.4).
- [ ] The verifier enforces the DCQL constraints on what it receives rather than trusting the wallet to have applied them (§14.9).
- [ ] TLS follows BCP 195, with server certificate checks (§14.6).
