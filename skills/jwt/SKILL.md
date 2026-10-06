---
name: jwt
description: "JWT and JOSE: verify and issue JWS, JWE and JWK safely. Covers RFC 7515 JWS, RFC 7516 JWE, RFC 7517 JWK, RFC 7518 JWA, RFC 7519 JWT, RFC 8037 OKP keys, the RFC 8725 JWT Best Current Practices and its rfc8725bis update, RFC 9864 fully specified algorithms (Ed25519 instead of EdDSA), RFC 9964 ML-DSA signatures with AKP keys, the deprecation of none and RSA1_5, HPKE for JWE, RFC 9068 JWT access tokens with roles, groups and entitlements, RFC 7638 thumbprints, the RFC 7800 cnf claim, and the IANA JOSE and JWT registries. Use when validating or signing JWTs, choosing alg values, publishing a JWKS, checking typ, kid, iss, aud, exp or nbf, preventing algorithm confusion or alg none attacks, issuing at+jwt access tokens, adopting post-quantum ML-DSA or HPKE, naming a new claim, reviewing a JWT library, or upgrading a verifier to rfc8725bis. Lines: the JOSE RFCs (current); rfc8725bis, Deprecate none and RSA1_5, and HPKE for JWE are build previews; PQ/T composite signatures and JSON Web Proof are tracked."
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.2.1"
  kind: standard
---

# JWT and JOSE

The IETF JOSE specifications define signed (JWS), encrypted (JWE) and key (JWK) formats, and JWT (RFC 7519) puts claims inside them. RFC 8725 and its pending update list the ways JWT validation goes wrong. With this skill the agent issues and verifies JWTs, chooses algorithms and keys, and reviews library settings against those rules.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources), with the section it cites. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: issuer, verifier, or both. For a verifier, which issuers and which kinds of token (access token, ID token, logout token, custom).
- Protection: signed only, or also encrypted.
- Target version: JOSE RFCs (current, the default: RFC 7515 to RFC 7519, RFC 8725, RFC 9864 and RFC 9964). Two previews, both posture build, are applied on top because they only add stricter checks: rfc8725bis (`draft-ietf-oauth-rfc8725bis-10`) and Deprecate none and RSA1_5 (`draft-ietf-jose-deprecate-none-rsa15-06`). HPKE for JWE (`draft-ietf-jose-hpke-encrypt-22`, posture build) is used only when the deployment opts in. PQ/T composite signatures (`draft-ietf-jose-pq-composite-sigs-04`) and JSON Web Proof (`draft-ietf-jose-json-web-proof-14`) are posture track: recognise them, never issue them in production. Cite drafts by draft name, never as RFCs. See [`references/versions.md`](references/versions.md).
- Revision: the pinned revisions in [Sources](#sources), unless the user names another. Drafts apply only at the posture recorded there.
- Sources: when refreshing this skill or when a rule looks out of date, re-read every URL in [Sources](#sources) first, check the IETF datatracker for a published RFC 8725 successor, a published deprecation of `none` and `RSA1_5`, and new revisions or RFCs of the HPKE, composite signature and JSON Web Proof drafts, re-read both IANA registries, and update the pins.

## Invariants

1. **Algorithms come from an allow-list, never from the token.** Allow only algorithms chosen for this issuer and this kind of token, compared case-sensitively (RFC 8725 § 3.1; draft-ietf-oauth-rfc8725bis-10 § 3.1).
2. **`none` is never accepted by default** (RFC 7518 § 3.6). `none` and `RSA1_5` are disabled by default and enabled, if ever, only per object (draft-ietf-jose-deprecate-none-rsa15-06 § 5).
3. **One key, one algorithm.** The header `alg` MUST be consistent with the key found by `kid` (RFC 8725 § 3.1; rfc8725bis § 3.1). This blocks the RS256-to-HS256 key confusion attack.
4. **The verification key belongs to the issuer** named in `iss`, or the token is rejected (RFC 8725 § 3.8).
5. **`aud` names the recipient** whenever the issuer serves more than one audience; otherwise reject (RFC 7519 § 4.1.3; RFC 8725 § 3.9).
6. **`exp` and `nbf` are enforced**, with only a small leeway for clock skew (RFC 7519 § 4.1.4, § 4.1.5).
7. **Each kind of JWT has its own explicit `typ`** and validation rules that reject the other kinds (RFC 8725 § 3.11, § 3.12). Access tokens use `at+jwt` (RFC 9068 § 2.1).
8. **An unknown `crit` extension makes the token invalid** (RFC 7515 § 4.1.11).
9. **`kid`, `jku` and `x5u` are attacker input.** Sanitize `kid`; never fetch `jku` or `x5u` outside an allow-list (rfc8725bis § 3.10).
10. **Every layer of a nested JWT is validated** (RFC 8725 § 3.3).
11. **Keys are strong enough.** HMAC keys are at least the hash size (RFC 7518 § 3.2) and never passwords (RFC 8725 § 3.5); RSA keys are at least 2048 bits (RFC 7518 § 3.3).
12. **New deployments use fully specified algorithms**, such as `Ed25519` rather than the deprecated `EdDSA` (RFC 9864 § 2.2, § 4.1.2; rfc8725bis § 3.2).
13. **An `AKP` key is bound to its `alg`.** `alg` is required on every AKP key, `priv` never appears in a public key, and an ML-DSA `priv` is the 32-byte seed (RFC 9964 § 3, § 4).

## Workflow

1. **Pick the version, then list issuers and token kinds.** Target the JOSE RFCs with the rfc8725bis and deprecation previews; add HPKE for JWE only where both sides opt in. For each issuer, write down the issuer identifier, the key source, the expected `typ`, the audience and the allowed algorithms.
   -> [references/versions.md](references/versions.md)
   ✓ The rules in use name their RFC or draft revision, and no verifier accepts "any algorithm the key supports" or "any issuer".
2. **Choose algorithms and keys.** Prefer `ES256` or `Ed25519`; use HMAC only with a shared secret of at least the hash size. Choose `ML-DSA-44`, `ML-DSA-65` or `ML-DSA-87` (RFC 9964) when signatures must resist a quantum attacker and every verifier supports them.
   -> [references/algorithms-and-keys.md](references/algorithms-and-keys.md)
   ✓ Every key has exactly one `alg`, and `none`, `RSA1_5`, `EdDSA` and draft composite identifiers are not on any new allow-list.
3. **Publish keys as a JWK Set** with `kid`, `alg` and `use` on each key. Distinct `kid` values let verifiers pick the right key during rollover (RFC 7517 § 4.5).
   -> [references/algorithms-and-keys.md](references/algorithms-and-keys.md)
   ✓ The JWK Set has no private members (`d`, `p`, `q`) and no duplicate `kid`.
4. **Issue tokens** with an explicit `typ`, the claims the profile requires, a short `exp` and a distinct `aud` per recipient.
   -> [references/access-tokens.md](references/access-tokens.md)
   ✓ An access token carries `typ: at+jwt` and `iss`, `exp`, `aud`, `sub`, `client_id`, `iat` and `jti`.
5. **Verify tokens** by running the checklist: format, header, key lookup, cryptography, claims.
   -> [references/verification.md](references/verification.md)
   ✓ Tokens with `alg: none`, an HS256 signature made with the RSA public key, a wrong `typ`, a wrong `aud` or a past `exp` are each rejected.
6. **Add encryption only when needed**, with OAEP or ECDH-ES (or HPKE when both sides opt in), no compression unless required, and limits on PBES2 iterations and decompressed size.
   -> [references/algorithms-and-keys.md](references/algorithms-and-keys.md)
   ✓ A JWE with `RSA1_5`, or with a `p2c` above the limit, is rejected, and JWS and JWE are not told apart by the presence of `enc`.
7. **Name claims from the registry.** Reuse registered claims; give new ones a collision-resistant name.
   -> [references/access-tokens.md](references/access-tokens.md)
   ✓ Every custom claim is either registered with IANA or a name you control.
8. **Upgrade** (only when asked). Bring an RFC 8725 verifier up to rfc8725bis, apply the `none` and `RSA1_5` defaults, or move `EdDSA` keys to `Ed25519`.
   -> [references/versions.md](references/versions.md)
   ✓ The new rejection tests pass, and every token a conforming issuer sent before is still accepted.

## Verify before done

- [ ] The verifier passes a fixed `algorithms` list, and that list excludes `none`.
- [ ] `iss`, `aud`, `exp`, `nbf` and `typ` are checked for every token kind.
- [ ] Keys come from configuration or the issuer's metadata, never from `jku`, `x5u` or `jwk` in the token.
- [ ] A test token signed with HS256 using the RSA public key as secret is rejected.
- [ ] HMAC secrets are at least as long as the hash output and RSA keys at least 2048 bits.
- [ ] `AKP` keys carry `alg`, published ones have no `priv`, and no composite or JWP identifier is issued in production.
- [ ] Access tokens use `at+jwt` and the RFC 9068 § 2.2 claims; roles, groups and entitlements follow RFC 9068 § 2.2.3.1.
- [ ] Every draft in use carries its pinned revision and posture.

## Reference index

- **`references/versions.md`**: the JOSE RFCs line, the three build-posture previews and the two tracked ones (composite signatures, JSON Web Proof), what each changes, the RFC 8725 to rfc8725bis verifier upgrade, the `none` and `RSA1_5` move, and `EdDSA` to `Ed25519`. Load for steps 1 and 8.
- **`references/verification.md`**: the step-by-step verification checklist, key confusion, claim checks and a TypeScript example with `jose`.
- **`references/algorithms-and-keys.md`**: the IANA algorithm statuses, RFC 9864, RFC 9964 ML-DSA and `AKP` keys, PQ/T composite signatures, HPKE for JWE, the `none` and `RSA1_5` deprecation, key strength, JWE limits, JWK members, thumbprints and `cnf`.
- **`references/access-tokens.md`**: the RFC 9068 access token profile, roles, groups and entitlements, its validation steps, and the IANA claims registry.

## Related skills

- `oauth` for how access tokens are obtained, presented, bound with DPoP or mTLS, and challenged: `npx skills add ScaleDockHQ/scaledock-skills --skill oauth`
- `openid-connect` for ID tokens and their validation: `npx skills add ScaleDockHQ/scaledock-skills --skill openid-connect`
- `sd-jwt` for selective disclosure on top of JWS: `npx skills add ScaleDockHQ/scaledock-skills --skill sd-jwt`
- `http-message-signatures` for signing HTTP requests and responses instead of tokens: `npx skills add ScaleDockHQ/scaledock-skills --skill http-message-signatures`
- `wimse` for workload identity tokens between services: `npx skills add ScaleDockHQ/scaledock-skills --skill wimse`
- `cose`, when the work also follows that specification: `npx skills add ScaleDockHQ/scaledock-skills --skill cose`
- `cbor`, when the work also follows that specification: `npx skills add ScaleDockHQ/scaledock-skills --skill cbor`
- `web-cryptography`, when the work also follows that specification: `npx skills add ScaleDockHQ/scaledock-skills --skill web-cryptography`

## Sources

Status uses the publishing body's own maturity term. Checked is the date the source was last read.

- [RFC 7515: JSON Web Signature (JWS)](https://www.rfc-editor.org/rfc/rfc7515): RFC (Proposed Standard), RFC 7515, checked 2026-10-02.
- [RFC 7516: JSON Web Encryption (JWE)](https://www.rfc-editor.org/rfc/rfc7516): RFC (Proposed Standard), RFC 7516, checked 2026-10-02.
- [RFC 7517: JSON Web Key (JWK)](https://www.rfc-editor.org/rfc/rfc7517): RFC (Proposed Standard), RFC 7517, checked 2026-10-02.
- [RFC 7518: JSON Web Algorithms (JWA)](https://www.rfc-editor.org/rfc/rfc7518): RFC (Proposed Standard, updated by RFC 9864), RFC 7518, checked 2026-10-02.
- [RFC 7519: JSON Web Token (JWT)](https://www.rfc-editor.org/rfc/rfc7519): RFC (Proposed Standard, updated by RFC 7797 and RFC 8725), RFC 7519, checked 2026-10-02.
- [RFC 8037: CFRG Elliptic Curve Diffie-Hellman (ECDH) and Signatures in JOSE](https://www.rfc-editor.org/rfc/rfc8037): RFC (Proposed Standard, updated by RFC 9864), RFC 8037, checked 2026-10-02.
- [RFC 8725: JSON Web Token Best Current Practices](https://www.rfc-editor.org/rfc/rfc8725): RFC (Best Current Practice), RFC 8725, checked 2026-10-02.
- [JSON Web Token Best Current Practices (rfc8725bis)](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-rfc8725bis-10): RFC Editor queue, draft-ietf-oauth-rfc8725bis-10 (2026-08-31; intended Best Current Practice, obsoletes RFC 8725; RFC Editor state Blocked, reference not received), checked 2026-10-05. Draft posture: build, pinned to -10.
- [RFC 9864: Fully-Specified Algorithms for JOSE and COSE](https://www.rfc-editor.org/rfc/rfc9864): RFC (Proposed Standard), RFC 9864, checked 2026-10-02.
- [JOSE: Deprecate 'none' and 'RSA1_5'](https://datatracker.ietf.org/doc/html/draft-ietf-jose-deprecate-none-rsa15-06): WG draft, draft-ietf-jose-deprecate-none-rsa15-06 (2026-09-25; in IETF Last Call, intended Proposed Standard), checked 2026-10-05. Draft posture: build, pinned to -06.
- [RFC 9964: ML-DSA for JSON Object Signing and Encryption (JOSE) and CBOR Object Signing and Encryption (COSE)](https://www.rfc-editor.org/rfc/rfc9964): RFC (Proposed Standard), RFC 9964 (May 2026), checked 2026-10-05.
- [Use of Hybrid Public Key Encryption (HPKE) with JSON Web Encryption (JWE)](https://datatracker.ietf.org/doc/html/draft-ietf-jose-hpke-encrypt-22): RFC Editor queue, draft-ietf-jose-hpke-encrypt-22 (2026-07-06; intended Proposed Standard, updates RFC 7516; RFC Editor state Blocked; alg values registered by IANA 2026-09-29), checked 2026-10-05. Draft posture: build, pinned to -22.
- [PQ/T Hybrid Composite Signatures for JOSE and COSE](https://datatracker.ietf.org/doc/html/draft-ietf-jose-pq-composite-sigs-04): WG draft, draft-ietf-jose-pq-composite-sigs-04 (2026-09-10; intended Proposed Standard), checked 2026-10-05. Draft posture: track, pinned to -04.
- [JSON Web Proof](https://datatracker.ietf.org/doc/html/draft-ietf-jose-json-web-proof-14): WG draft, draft-ietf-jose-json-web-proof-14 (2026-07-20; intended Proposed Standard), checked 2026-10-05. Draft posture: track, pinned to -14.
- [RFC 9068: JWT Profile for OAuth 2.0 Access Tokens](https://www.rfc-editor.org/rfc/rfc9068): RFC (Proposed Standard), RFC 9068, checked 2026-10-02.
- [RFC 7643: SCIM Core Schema](https://www.rfc-editor.org/rfc/rfc7643): RFC (Proposed Standard, updated by RFC 9865 and RFC 9967), RFC 7643, checked 2026-10-02.
- [RFC 7638: JSON Web Key (JWK) Thumbprint](https://www.rfc-editor.org/rfc/rfc7638): RFC (Proposed Standard), RFC 7638, checked 2026-10-02.
- [RFC 7800: Proof-of-Possession Key Semantics for JWTs](https://www.rfc-editor.org/rfc/rfc7800): RFC (Proposed Standard), RFC 7800, checked 2026-10-02.
- [RFC 9449: OAuth 2.0 Demonstrating Proof of Possession (DPoP)](https://www.rfc-editor.org/rfc/rfc9449): RFC (Proposed Standard), RFC 9449, checked 2026-10-02.
- [RFC 8705: OAuth 2.0 Mutual-TLS Client Authentication and Certificate-Bound Access Tokens](https://www.rfc-editor.org/rfc/rfc8705): RFC (Proposed Standard), RFC 8705, checked 2026-10-02.
- [RFC 8414: OAuth 2.0 Authorization Server Metadata](https://www.rfc-editor.org/rfc/rfc8414): RFC (Proposed Standard), RFC 8414, checked 2026-10-02.
- [RFC 6750: OAuth 2.0 Bearer Token Usage](https://www.rfc-editor.org/rfc/rfc6750): RFC (Proposed Standard, updated by RFC 8996 and RFC 9700), RFC 6750, checked 2026-10-02.
- [IANA JSON Object Signing and Encryption (JOSE) registries](https://www.iana.org/assignments/jose/jose.xhtml): IANA registry, last updated 2026-09-29, checked 2026-10-05.
- [IANA JSON Web Token (JWT) registries](https://www.iana.org/assignments/jwt/jwt.xhtml): IANA registry, last updated 2026-07-20, checked 2026-10-02.
