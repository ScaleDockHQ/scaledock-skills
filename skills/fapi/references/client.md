# Client requirements (FAPI 2.0 Security Profile)

Section numbers refer to the FAPI 2.0 Security Profile (SP, Final, 22 February 2025) unless another document is named.

## General client requirements (§5.3.3.1)

- Support mTLS (RFC 8705), DPoP (RFC 9449) or both for sender-constraining.
- Authenticate with mTLS (RFC 8705 §2) or `private_key_jwt`.
- Send access tokens in the `Authorization` header: the `Bearer` scheme of RFC 6750 §2.1 for mTLS-bound tokens, the `DPoP` scheme of RFC 9449 §7.1 for DPoP-bound tokens.
- In a `private_key_jwt` assertion, set `aud` to the AS issuer identifier, as a string.
- Support refresh tokens and refresh token rotation, because some ASs may rotate in extraordinary circumstances.
- Support `mtls_endpoint_aliases` (RFC 8705 §5) when using mTLS.
- Support DPoP nonces (RFC 9449 §8 and §9) when using DPoP.
- Configure the AS from its metadata only. Take the issuer identifier from an authoritative source, and check that it matches the `issuer` in the metadata.
- Protect the start of the flow against CSRF, so an attacker cannot start a flow in the user's browser.

## Authorization code flow (§5.3.3.2)

- Use PAR for every authorization request.
- Use PKCE with `S256`, with a fresh `code_verifier` per request that is bound to the user agent.
- Check the `iss` parameter of the authorization response (RFC 9207) against the expected issuer before redeeming the code.
- Send only `client_id` and `request_uri` to the authorization endpoint. Every other parameter goes in the PAR request.
- Keep `nonce`, when used, to 64 characters or fewer.

## Example: a `private_key_jwt` client assertion

The header and payload, before signing with PS256 or ES256. The `client_assertion_type` is `urn:ietf:params:oauth:client-assertion-type:jwt-bearer` (RFC 7523).

```json
{ "alg": "PS256", "kid": "client-key-1", "typ": "JWT" }
```

```json
{
  "iss": "s6BhdRkqt3",
  "sub": "s6BhdRkqt3",
  "aud": "https://as.example.com",
  "jti": "1d7d9f5e-7c55-4b8f-a2c4-1b0a38e7c5a1",
  "iat": 1759400000,
  "exp": 1759400060
}
```

`aud` is the issuer string, not the token endpoint URL and not an array (SP §5.3.2.1).

## Example: a DPoP-bound resource request

A DPoP proof has `typ: dpop+jwt`, the public `jwk` in its header, and the claims `htm`, `htu`, `iat` and `jti`. When it accompanies an access token, it also has `ath` (the hash of the token), plus `nonce` if the server issued one (RFC 9449 §4.2).

```http
GET /accounts HTTP/1.1
Host: rs.example.com
Authorization: DPoP Kz~8mXK1EalYznwH-LC-1fBAo.4Ljp~zsPE_NeO.gxU
DPoP: eyJ0eXAiOiJkcG9wK2p3dCIsImFsZyI6IkVTMjU2IiwiandrIjp7Li4ufX0...
```

## Framework-neutral TypeScript: checking the authorization response

```ts
type AuthorizationResponse = { code?: string; iss?: string; error?: string };

export function acceptAuthorizationResponse(
  params: URLSearchParams,
  expectedIssuer: string,
): AuthorizationResponse {
  const iss = params.get("iss");
  if (iss !== expectedIssuer) {
    throw new Error(
      "iss missing or does not match the expected issuer (RFC 9207)",
    );
  }
  const error = params.get("error");
  if (error) return { iss, error };
  const code = params.get("code");
  if (!code) throw new Error("authorization response has no code");
  return { code, iss };
}
```

The PKCE `code_verifier` and the DPoP key for this flow come from the session that started it, never from the response.

## Checklist

- [ ] The issuer comes from configuration, and the metadata `issuer` equals it.
- [ ] Every flow uses PAR, PKCE S256 and a fresh verifier bound to the browser session.
- [ ] The authorization redirect carries only `client_id` and `request_uri`.
- [ ] `iss` is checked before the code is exchanged.
- [ ] Tokens go only in the `Authorization` header, with the matching DPoP proof or client certificate.
- [ ] DPoP nonce challenges and refresh token rotation are handled.
