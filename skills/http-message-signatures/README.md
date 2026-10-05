# http-message-signatures

An agent skill for RFC 9421 HTTP Message Signatures and RFC 9530 Digest Fields: signing and verifying HTTP requests and responses, covering their content with digests, and upgrading from the cavage drafts and RFC 3230.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill http-message-signatures
```

Then ask your agent to "sign our outgoing API requests with RFC 9421", "review our HTTP signature verifier" or "migrate our hs2019 signatures to RFC 9421".

## What it covers

- Covered components: HTTP fields with `sf`, `key`, `bs`, `req` and `tr`, and the derived components `@method`, `@target-uri`, `@authority`, `@scheme`, `@request-target`, `@path`, `@query`, `@query-param` and `@status`.
- The signature base, `@signature-params`, and the `created`, `expires`, `nonce`, `alg`, `keyid` and `tag` parameters.
- The `Signature-Input`, `Signature` and `Accept-Signature` fields, multiple signatures, and signed responses that cover the request.
- The algorithms `rsa-pss-sha512`, `rsa-v1_5-sha256`, `hmac-sha256`, `ecdsa-p256-sha256`, `ecdsa-p384-sha384`, `ed25519` and JWS algorithms, and how the verifier picks key and algorithm.
- Verification steps and the security and privacy considerations: coverage, replay, key and algorithm confusion, multiple signatures, proxies.
- `Content-Digest`, `Repr-Digest`, `Want-Content-Digest`, `Want-Repr-Digest` and the hash algorithm registry.

## Versions

| Line                            | Family     | Status                |
| ------------------------------- | ---------- | --------------------- |
| RFC 9421                        | signatures | current               |
| draft-cavage-http-signatures-12 | signatures | legacy (upgrade from) |
| RFC 9530                        | digest     | current               |
| RFC 3230                        | digest     | legacy (upgrade from) |

`references/versions.md` says which line to use, what changed, and how to upgrade from the cavage draft and from RFC 3230.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [RFC 9421](https://www.rfc-editor.org/rfc/rfc9421.html): RFC (Proposed Standard), RFC 9421, with its [errata](https://www.rfc-editor.org/errata/rfc9421).
- [RFC 9530](https://www.rfc-editor.org/rfc/rfc9530.html): RFC (Proposed Standard), RFC 9530, with its [errata](https://www.rfc-editor.org/errata/rfc9530).
- [RFC 3230](https://www.rfc-editor.org/rfc/rfc3230.html): RFC, obsoleted by RFC 9530.
- [draft-cavage-http-signatures-12](https://datatracker.ietf.org/doc/html/draft-cavage-http-signatures-12): expired individual Internet-Draft, last revision.
- [RFC 9651](https://www.rfc-editor.org/rfc/rfc9651.html): RFC (Proposed Standard), Structured Field Values for HTTP.
- [IANA HTTP Message Signature registries](https://www.iana.org/assignments/http-message-signature/): last updated 2026-07-20.
- [IANA Hash Algorithms for HTTP Digest Fields](https://www.iana.org/assignments/http-digest-hash-alg/): last updated 2024-05-22.
- [IANA HTTP Digest Algorithm Values](https://www.iana.org/assignments/http-dig-alg/): deprecated, last updated 2024-02-16.

## License

MIT
