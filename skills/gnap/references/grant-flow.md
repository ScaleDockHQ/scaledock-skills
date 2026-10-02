# Grant flow (RFC 9635)

How a client instance asks a GNAP authorization server (AS) for access, interacts with the resource owner (RO), continues the grant, and uses and manages tokens. Section numbers refer to RFC 9635 unless noted.

## Grant request (§ 2)

The client instance sends an HTTP POST with a JSON object to the AS grant endpoint. The grant endpoint URI identifies the AS. Top-level fields:

| Field          | Meaning                                                                                    | Required                                    |
| -------------- | ------------------------------------------------------------------------------------------ | ------------------------------------------- |
| `access_token` | One token request object, or an array of them for several tokens.                          | When requesting a token (§ 2.1)             |
| `subject`      | Which subject information about the RO to return.                                          | When requesting subject information (§ 2.2) |
| `client`       | The client instance: its key, display information, or an instance identifier by reference. | Always (§ 2.3)                              |
| `user`         | Information identifying the end user.                                                      | Optional (§ 2.4)                            |
| `interact`     | How the client can start and finish interaction.                                           | When interaction is supported (§ 2.5)       |

A token request object has `access` (the rights, REQUIRED; see [access-rights.md](access-rights.md)), `label` (REQUIRED when requesting several tokens), and `flags` (§ 2.1.1). The only flag defined by RFC 9635 is `bearer`. Without it, the token is bound to the client's key and MUST be presented with that key and proofing method. Repeating a flag value is an `invalid_flag` error.

```http
POST /tx HTTP/1.1
Host: server.example.com
Content-Type: application/json
Signature-Input: sig1=("@method" "@target-uri" "content-digest" "content-type");keyid="gnap-rsa";created=1790000000;nonce="NAOEJF12ER2";tag="gnap"
Signature: sig1=:…:
Content-Digest: sha-256=:…:

{
  "access_token": {
    "access": [
      { "type": "photo-api", "actions": ["read"], "locations": ["https://server.example.net/"] },
      "dolphin-metadata"
    ]
  },
  "client": {
    "display": { "name": "My Client Display Name", "uri": "https://example.net/client" },
    "key": { "proof": "httpsig", "jwk": { "kty": "RSA", "e": "AQAB", "kid": "gnap-rsa", "alg": "RS256", "n": "…" } }
  },
  "interact": {
    "start": ["redirect"],
    "finish": { "method": "redirect", "uri": "https://client.example.net/return/123455", "nonce": "LKLTI25DK82FX4T4QFZC" }
  }
}
```

## Client instance and keys

- The client instance MUST identify itself in `client` and sign the request with its key (§ 2.3). `client.key` is REQUIRED when the client is sent by value. `client` is not sent on continuation requests; the continuation token identifies the grant.
- A key sent by value MUST be a public key in exactly one format and names its proofing method in `proof` (§ 7.1). Formats: `jwk` (MUST contain `alg` and `kid`, and `alg` MUST NOT be `none`), `cert` (PEM) and `cert#S256` (the RFC 8705 thumbprint).
- Every key presented to the AS or RS MUST be validated in the request that presents it (§ 7.3).

Proofing methods (§ 7.3):

| `proof`   | Mechanism                                  |
| --------- | ------------------------------------------ |
| `httpsig` | HTTP message signatures (§ 7.3.1)          |
| `mtls`    | Mutual TLS certificate (§ 7.3.2)           |
| `jwsd`    | Detached JWS in a header (§ 7.3.3)         |
| `jws`     | Attached JWS as the request body (§ 7.3.4) |

For `httpsig` (§ 7.3.1), the RFC 9421 signature MUST:

- Cover `@method` and `@target-uri`, plus `content-digest` when the request has content and `authorization` when it carries an access token. The verifier MUST check the `Content-Digest` value.
- Carry `tag="gnap"` and a `created` timestamp, which the verifier checks for presence and freshness. A `nonce` SHOULD be included; if present, the verifier checks it is not reused within a short window.
- Use the JWK's `kid` as `keyid` and the JWK's `alg` as the algorithm, without an explicit `alg` signature parameter.
- In string form (`"proof": "httpsig"`), use `sha-256` for the content digest.

## Interaction (§ 2.5, § 4)

- `interact.start` lists how the client can start interaction: `redirect`, `app`, `user_code` and `user_code_uri` (§ 2.5.1). A client MUST NOT declare a mode it does not support.
- `interact.finish` says how the client learns that interaction is done: `redirect` (front channel through the browser) or `push` (a direct HTTP POST to the client), with the client's `nonce` and an optional `hash_method` (§ 2.5.2).
- The AS replies with the modes it accepts, for example a `redirect` URI and its own `finish` nonce (§ 3.3).

### The interaction hash (§ 4.2.3)

When interaction finishes, the AS sends `interact_ref` and `hash` to the client. The AS MUST always send the hash, and the client MUST validate it. This blocks session fixation and injection attacks (§ 11.25).

The hash base string joins these four values with a single newline, with no trailing newline:

1. The client's `nonce` from the request.
2. The AS's `finish` nonce from the response.
3. The `interact_ref`.
4. The grant endpoint URI the client used.

Hash its ASCII bytes with `hash_method` (default `sha-256`) and base64url-encode without padding.

```ts
export async function interactionHash(
  clientNonce: string,
  serverNonce: string,
  interactRef: string,
  grantEndpoint: string,
): Promise<string> {
  const base = [clientNonce, serverNonce, interactRef, grantEndpoint].join(
    "\n",
  );
  const digest = new Uint8Array(
    await crypto.subtle.digest("SHA-256", new TextEncoder().encode(base)),
  );
  return btoa(String.fromCharCode(...digest))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}
```

Compare the result with the received `hash` before continuing the grant.

## Grant response (§ 3)

| Field          | Meaning                                                                                                                                                                          |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `continue`     | How to continue: `uri`, `wait` and a continuation `access_token` (§ 3.1).                                                                                                        |
| `access_token` | One token or an array (§ 3.2).                                                                                                                                                   |
| `interact`     | The interaction modes the AS accepted (§ 3.3).                                                                                                                                   |
| `subject`      | Subject information about the RO (§ 3.4).                                                                                                                                        |
| `instance_id`  | An identifier the client can use instead of its key in later requests (§ 3.5).                                                                                                   |
| `error`        | An error code, such as `invalid_request`, `invalid_client`, `invalid_interaction`, `invalid_flag`, `user_denied`, `request_denied`, `unknown_interaction` or `too_fast` (§ 3.6). |

An issued token (§ 3.2.1) has `value` (token68 characters only), `access` (the rights actually granted, which MAY differ from the request and MUST reflect the token), and optionally `label`, `manage`, `expires_in`, `key` and `flags`. The client MUST NOT use the token after `expires_in`.

## Continuation (§ 5)

- The continuation access token is bound to the client's key. Every continuation call presents it and signs the request with that key (§ 5).
- Continuation tokens MUST NOT work at resource servers, and other access tokens MUST NOT work for continuation (§ 5).
- Wait at least `wait` seconds before calling the continuation URI; a missing `wait` means 5 seconds (§ 3.1). Calling too early gives `too_fast`.
- Use the continuation URI to finish after interaction (with `interact_ref`, § 5.1), to poll (§ 5.2), to modify the request (§ 5.3), or to revoke the grant with DELETE (§ 5.4).

## Using and managing tokens

- A key-bound token is sent with the `GNAP` scheme plus a proof of the bound key: `Authorization: GNAP <value>` (§ 7.2).
- A token with the `bearer` flag is sent with `Authorization: Bearer <value>` as in RFC 6750. The form body and query methods MUST NOT be used (§ 7.2).
- Key-bound tokens are the default in GNAP. Limit bearer tokens to cases where their simplicity outweighs the risk (§ 11.9).
- With a `manage` field, the client can rotate the token by POSTing to the management URI (§ 6.1) or revoke it with DELETE (§ 6.2). Each call presents the management token and a proof of the client's key (§ 6).

## Discovery (§ 9)

- The client only needs the grant endpoint and its own key to start (§ 9).
- It MAY send OPTIONS to the grant endpoint to learn `grant_request_endpoint` (REQUIRED, MUST match the URL used), `interaction_start_modes_supported`, `interaction_finish_methods_supported`, `key_proofs_supported` and related fields (§ 9).
- A resource server SHOULD answer an unauthenticated or invalid request with a `GNAP` challenge, and MAY add `as_uri`, `referrer` and an opaque `access` reference (§ 9.1). The client MUST check that `referrer` equals the resource server's URI before using it.

```http
HTTP/1.1 401 Unauthorized
WWW-Authenticate: GNAP as_uri=https://as.example/tx;access=FWWIKYBQ6U56NL1;referrer=https://rs.example
```
