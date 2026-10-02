# jwt

An agent skill for JOSE and JWT: issue and verify signed and encrypted tokens, choose algorithms and keys, and avoid the known validation attacks.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill jwt
```

Then ask your agent to "review our JWT validation" or "issue RFC 9068 access tokens signed with Ed25519".

## What it covers

- A verification checklist: format, `alg` allow-list, `crit`, `typ`, key lookup by `kid`, key confusion, nested tokens, and `iss`, `aud`, `exp`, `nbf` and `sub`.
- Algorithm choice from the IANA registry, RFC 9864 fully specified algorithms, and the deprecation of `none` and `RSA1_5`.
- Key strength, JWE limits, JWK and JWK Set members, OKP keys, RFC 7638 thumbprints and the `cnf` claim.
- RFC 9068 JWT access tokens, including the `roles`, `groups` and `entitlements` claims, and the IANA JWT claims registry.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [RFC 7515](https://www.rfc-editor.org/rfc/rfc7515), [RFC 7516](https://www.rfc-editor.org/rfc/rfc7516), [RFC 7517](https://www.rfc-editor.org/rfc/rfc7517), [RFC 7518](https://www.rfc-editor.org/rfc/rfc7518), [RFC 7519](https://www.rfc-editor.org/rfc/rfc7519), [RFC 7638](https://www.rfc-editor.org/rfc/rfc7638), [RFC 7643](https://www.rfc-editor.org/rfc/rfc7643), [RFC 7800](https://www.rfc-editor.org/rfc/rfc7800), [RFC 8037](https://www.rfc-editor.org/rfc/rfc8037), [RFC 8414](https://www.rfc-editor.org/rfc/rfc8414), [RFC 6750](https://www.rfc-editor.org/rfc/rfc6750), [RFC 8705](https://www.rfc-editor.org/rfc/rfc8705), [RFC 9068](https://www.rfc-editor.org/rfc/rfc9068), [RFC 9449](https://www.rfc-editor.org/rfc/rfc9449) and [RFC 9864](https://www.rfc-editor.org/rfc/rfc9864): RFC, Proposed Standard.
- [RFC 8725](https://www.rfc-editor.org/rfc/rfc8725): RFC, Best Current Practice.
- [rfc8725bis](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-rfc8725bis-10): RFC Editor queue, -10.
- [JOSE: Deprecate 'none' and 'RSA1_5'](https://datatracker.ietf.org/doc/html/draft-ietf-jose-deprecate-none-rsa15-06): WG draft in IETF Last Call, -06.
- [IANA JOSE registries](https://www.iana.org/assignments/jose/jose.xhtml) and [IANA JWT registries](https://www.iana.org/assignments/jwt/jwt.xhtml).

## License

MIT
