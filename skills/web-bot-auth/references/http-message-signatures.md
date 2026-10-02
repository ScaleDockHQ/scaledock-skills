# RFC 9421 essentials

RFC 9421 (HTTP Message Signatures, Standards Track, February 2024) defines how to sign selected components of an HTTP message and carry the result in the `Signature-Input` and `Signature` fields. Web Bot Auth is a profile of it.

## Components (RFC 9421 § 2)

- **HTTP fields** are named in lowercase, for example `"content-digest"`. A Dictionary field member is selected with the `key` parameter, for example `"signature-agent";key="sig1"` (§ 2.1, § 2.1.2).
- **Derived components** start with `@` (§ 2.2):

| Component         | Value                                            |
| ----------------- | ------------------------------------------------ |
| `@method`         | Request method (§ 2.2.1).                        |
| `@target-uri`     | Full target URI (§ 2.2.2).                       |
| `@authority`      | Host and port, normalized (§ 2.2.3).             |
| `@scheme`         | `http` or `https` (§ 2.2.4).                     |
| `@request-target` | Request target as on the request line (§ 2.2.5). |
| `@path`           | Absolute path (§ 2.2.6).                         |
| `@query`          | Query string with leading `?` (§ 2.2.7).         |
| `@query-param`    | One named query parameter (§ 2.2.8).             |
| `@status`         | Response status code (§ 2.2.9).                  |

## Signature parameters (RFC 9421 § 2.3)

| Parameter | Type    | Meaning                                                     |
| --------- | ------- | ----------------------------------------------------------- |
| `created` | Integer | Creation time, UNIX seconds. Recommended.                   |
| `expires` | Integer | Expiration time, UNIX seconds.                              |
| `nonce`   | String  | Random unique value for this signature.                     |
| `alg`     | String  | Algorithm name from the HTTP Signature Algorithms registry. |
| `keyid`   | String  | Identifier of the key material.                             |
| `tag`     | String  | Application-specific tag, such as `web-bot-auth`.           |

The ordered covered components plus these parameters, serialized as a Structured Fields Inner List, form the `@signature-params` value. Once chosen, the order of components and parameters cannot change.

## Signature base (RFC 9421 § 2.5)

One line per covered component, `"<component identifier>": <value>`, joined with LF, followed by the `"@signature-params": <inner list>` line. Duplicate component identifiers are an error. Example for a Web Bot Auth request:

```text
"@authority": example.com
"signature-agent";key="sig1": "https://signer.example.com"
"@signature-params": ("@authority" "signature-agent";key="sig1");created=1735689600;expires=1735693200;keyid="poqkLGiymh_W0uP6PZFw-dvez3QJT5SolqXBCW38r0U";tag="web-bot-auth"
```

The `signature-agent` line carries the serialized member value, which is a Structured Fields String, so it keeps its quotes. The `keyid` above is a placeholder thumbprint.

## Fields (RFC 9421 § 4)

- `Signature-Input` is a Dictionary; each member key is a signature label and its value the Inner List with parameters, exactly as used for `@signature-params` (§ 4.1).
- `Signature` is a Dictionary; each member key is the same label and its value a Byte Sequence with the signature (§ 4.2).
- Labels must be unique across all field values. Several signatures can coexist (§ 4.1, § 4.3).

## Verifying (RFC 9421 § 3.2)

1. Parse `Signature` and `Signature-Input`; choose the signature(s) to process by policy; a `Signature` member without a matching `Signature-Input` member is an error.
2. Parse the covered components and parameters, and the signature bytes.
3. Check the parameters against this document's and the application's requirements (§ 3.2.1), for example required components, maximum age from `created`, rejecting past `expires`, nonce uniqueness, a required `tag`.
4. Determine the key; if it is unknown or untrusted for this request, verification must fail.
5. Determine the algorithm from the allowed set; if it is given in more than one place (configuration, key, `alg`), all must agree or verification fails.
6. Recreate the signature base from the received message and verify.

Applications must enforce their additional requirements during verification and must not accept non-conforming signatures (§ 3.2.1).

## Algorithms (RFC 9421 § 3.3, § 6.2.2)

Initial registry entries: `rsa-pss-sha512`, `rsa-v1_5-sha256`, `hmac-sha256`, `ecdsa-p256-sha256`, `ecdsa-p384-sha384`, `ed25519`. JWS algorithms can also be used (§ 3.3.7). Web Bot Auth forbids `hmac-sha256` (draft § 6.4) and restricts directory keys to algorithms in this registry (draft § 5.5.1).

## Requesting a signature (RFC 9421 § 5)

A server can send `Accept-Signature` to ask for a signature with given components and parameters, including a fresh `nonce`. Web Bot Auth uses this with status 403, or 429 when a signature or nonce was reused beyond policy (draft § 5.3).

## Replay (RFC 9421 § 7.2.2)

A signature over few components can be attached to other messages. Cover enough of the message, bound it with `created` and `expires`, and use `nonce` when the verifier can track it. A verifier can force a fresh signature by sending `Accept-Signature` with a new nonce.

## Other security notes (RFC 9421 § 7)

- Use TLS; signatures do not provide confidentiality (§ 7.1.2).
- Do not sign signature values on their own (§ 7.3.7); Web Bot Auth's multiple-signature rules build on this (draft § 5.2.2).
- The test keys in RFC 9421 Appendix B are public and must never be used in production (draft § 6.8).
