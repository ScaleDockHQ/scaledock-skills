# Versions and upgrades

Read this when choosing which JOSE and JWT rules to apply, reviewing a verifier built to RFC 8725, upgrading it to the RFC 8725 successor, deciding how far to follow the `none` and `RSA1_5` deprecation, or meeting HPKE, composite signature or JSON Web Proof objects. Sources: the JOSE and JWT RFCs, `draft-ietf-oauth-rfc8725bis-10`, `draft-ietf-jose-deprecate-none-rsa15-06`, `draft-ietf-jose-hpke-encrypt-22`, `draft-ietf-jose-pq-composite-sigs-04`, `draft-ietf-jose-json-web-proof-14` and the IANA JOSE registry, listed in [Sources](../SKILL.md#sources).

## Version lines

JOSE and JWT have no single version number. The published RFCs form one line; each draft that changes them is a preview.

| Id                          | Line                      | Status  | Revision                                                                             | Posture | Summary                                                                                                          |
| --------------------------- | ------------------------- | ------- | ------------------------------------------------------------------------------------ | ------- | ---------------------------------------------------------------------------------------------------------------- |
| `rfc8725bis-preview`        | rfc8725bis                | preview | `draft-ietf-oauth-rfc8725bis-10` (2026-08-21), RFC Editor queue                      | build   | The JWT Best Current Practices that will obsolete RFC 8725.                                                      |
| `deprecate-none-preview`    | Deprecate none and RSA1_5 | preview | `draft-ietf-jose-deprecate-none-rsa15-06` (2026-09-25), WG draft                     | build   | Updates RFC 7518 to deprecate `none` for JWS and `RSA1_5` for JWE.                                               |
| `jose-hpke-preview`         | HPKE for JWE              | preview | `draft-ietf-jose-hpke-encrypt-22` (2026-07-06), RFC Editor queue                     | build   | HPKE key management for JWE, with `alg` values already in the IANA registry.                                     |
| `pq-composite-sigs-preview` | PQ/T composite signatures | preview | `draft-ietf-jose-pq-composite-sigs-04` (2026-09-10), WG draft                        | track   | ML-DSA combined with ECDSA or EdDSA in one JWS signature.                                                        |
| `jwp-preview`               | JSON Web Proof            | preview | `draft-ietf-jose-json-web-proof-14` (2026-07-20), WG draft                           | track   | A JWS-like container with multiple payloads and selective disclosure.                                            |
| `jose-rfc`                  | JOSE RFCs                 | current | RFC 7515 to RFC 7519, RFC 8037, RFC 8725, RFC 9864, RFC 9964, RFC 9068 and IANA JOSE |         | The published JWS, JWE, JWK, JWA and JWT specifications and RFC 8725, as RFC 9864 updates, plus RFC 9964 ML-DSA. |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows.

rfc8725bis and the deprecation draft have the **build** posture, and the skill already applies them. Neither loosens anything in the JOSE RFCs: every rule they add is a stricter check that a verifier built to the RFCs can adopt today without breaking a conforming issuer. That is why they are built against, not just tracked.

HPKE for JWE also has the **build** posture, because it is approved and its identifiers are registered, but it adds algorithms rather than checks, so it applies only where a deployment opts in. Composite signatures and JSON Web Proof have the **track** posture: follow them, but nothing in production depends on them.

## Which version to use

- Issue and verify to the JOSE RFCs, with RFC 8725 as the floor and RFC 9864 identifiers for new deployments.
- Apply the rfc8725bis checks as well. It is approved and in the RFC Editor queue, and its RFC Editor state is blocked only on a normative reference (the deprecation draft). Cite it by draft name and revision until it has an RFC number.
- Apply the deprecation draft's defaults: `none` and `RSA1_5` disabled by default, enabled only per object (§ 5). The IANA registry has not changed yet, so do not tell consumers that the registry marks them Deprecated.
- Do not cite either draft as an RFC, and do not remove interoperability with a conforming issuer on the strength of a draft. Every rule in these two previews is a check a conforming issuer already passes.
- Use ML-DSA (RFC 9964) when a deployment needs post-quantum signatures; it is part of the current line.
- Use HPKE for JWE only when both sides opt in, and pin `draft-ietf-jose-hpke-encrypt-22` until it has an RFC number.
- Do not issue composite signatures or JSON Web Proofs in production. Their identifiers and formats can still change.

## What changed

### rfc8725bis

`draft-ietf-oauth-rfc8725bis-10` obsoletes RFC 8725 and updates RFC 7519 (Appendix A):

- Algorithm names are compared case-sensitively and checked against an allow-list, not a block-list, so `noNE` cannot pass a check for `none` (§ 2.11, § 3.1).
- Libraries MUST let the recipient tell unsecured, signed, encrypted and nested JWTs apart, so a successful decryption is never taken as a valid signature (§ 2.3, § 3.3).
- Recipients limit the PBES2 `p2c` count; rejecting values above 1,200,000 is RECOMMENDED (§ 2.10, § 3.13).
- Implementations MUST reject anything that is not a dot-separated base64url string, which blocks JSON-serialization format confusion (§ 2.13, § 3.14).
- Recipients limit the decompressed size of a JWE that uses `zip` (§ 2.12, § 3.15).
- Explicit typing gets `typ` and media type conventions, recipient rules and deployment guidance; `typ: JWT` is not effective explicit typing (§ 3.11, § 3.12).
- `kid`, `jku` and `x5u` are treated as attacker-controlled, with SSRF and DNS resolution checks for untrusted URLs (§ 3.10).
- Libraries MUST NOT generate or consume `none` unless the caller explicitly asks, and RSA-PKCS1 v1.5 encryption is deprecated in favour of RSAES-OAEP (§ 3.2).
- New deployments SHOULD prefer fully specified identifiers such as `Ed25519` (§ 3.2, citing RFC 9864).

### Deprecate none and RSA1_5

`draft-ietf-jose-deprecate-none-rsa15-06` updates RFC 7518:

- Deprecates the JWS `none` algorithm (§ 3) and the JWE `RSA1_5` key management algorithm (§ 4). RSA PKCS#1 v1.5 signatures (`RS256`, `RS384`, `RS512`) are unchanged (§ 1).
- JOSE libraries SHOULD deprecate both; applications MUST disable both by default and MAY enable one only for the objects that need it; new specifications MUST NOT allow either (§ 5).
- Asks IANA to mark both Deprecated, not Prohibited (§ 5, § 7.1).
- Sets baseline security goals for future registrations: EUF-CMA for signatures and MACs, IND-CCA2 for JWE key management, AEAD for content encryption (§ 7.2).

### HPKE for JWE

`draft-ietf-jose-hpke-encrypt-22` updates RFC 7516:

- Adds the Integrated Encryption key management mode, in which HPKE encrypts the plaintext directly and `enc` is absent (§ 3, § 4, § 5).
- Registers Integrated Encryption identifiers `HPKE-0` to `HPKE-7` and Key Encryption identifiers ending in `-KE` (§ 5.1, § 6.2, § 11.1), and the `ek` and `psk_id` header parameters (§ 11.2).
- Replaces the RFC 7516 message encryption and decryption procedures (§ 7) and removes the "has `enc`, so it is a JWE" test (§ 8).

### PQ/T composite signatures

`draft-ietf-jose-pq-composite-sigs-04` proposes six composite `alg` values that pair ML-DSA with ECDSA or EdDSA and use the `AKP` key type (§ 3, § 5.1). Details are in [`algorithms-and-keys.md`](algorithms-and-keys.md).

### JSON Web Proof

`draft-ietf-jose-json-web-proof-14` defines a new container, not a change to JWS:

- An issued JWP has an Issuer Header, one or more ordered payload slots and a proof; a presented JWP adds a Presentation Header and may omit payloads slot by slot (§ 6).
- The Presentation Header MUST be integrity protected and binds a presentation to its verifier to prevent replay (§ 6.2.1).
- The Compact Serialization separates payload slots and proof values with `~` and has no JSON Serialization (§ 7, § 7.1); a CBOR Serialization parallels `COSE_Sign1` (§ 7.2).
- An encrypted JWP is a JWE whose plaintext is a compact JWP, with `cty: jwp` when the JWP has no `typ` (§ 8).
- Registers the `application/jwp` and `application/cwp` media types and the `+jwp` and `+cwp` suffixes (§ 11.2, § 11.3).

### JOSE RFCs

- RFC 7515 to RFC 7519 define JWS, JWE, JWK, JWA and JWT; RFC 8037 adds OKP keys and `EdDSA`.
- RFC 8725 is the current Best Current Practice for JWT and updates RFC 7519.
- RFC 9864 adds fully specified algorithm identifiers (`Ed25519`, `Ed448`) and deprecates the polymorphic `EdDSA` (RFC 9864 § 2.2, § 4.1.2). Key formats are unchanged; only `alg` changes (RFC 9864 § 5).
- RFC 9068 profiles JWT access tokens with `typ: at+jwt` (RFC 9068 § 2.1).
- RFC 9964 (May 2026) adds the `ML-DSA-44`, `ML-DSA-65` and `ML-DSA-87` signature algorithms and the `AKP` key type with `pub` and `priv` (RFC 9964 § 3, § 5, § 8.1). It is additive: existing tokens and keys are unaffected.

## Upgrading

### RFC 8725 to rfc8725bis (verifier)

A verifier that meets RFC 8725 already uses an algorithm allow-list, checks `iss`, `aud` and `typ`, and validates every layer of a nested JWT. Upgrading it to rfc8725bis means adding the checks that RFC 8725 did not have:

1. Change the version marker: cite `draft-ietf-oauth-rfc8725bis-10` next to RFC 8725 in the verifier's documentation and security review, until the RFC number is known.
2. Replace removed or renamed checks:
   - Make the `alg` and `enc` comparison exact and case-sensitive against an allow-list, and remove any block-list (§ 3.1).
   - Reject input that contains characters other than base64url letters, digits, `-`, `_` and `.` before parsing, so a JSON-serialized JWS is never accepted where a JWT is expected (§ 3.14).
   - Make the library report whether the input was unsecured, signed, encrypted or nested, and accept only the kinds this context allows (§ 3.3).
   - Cap PBES2 `p2c` (§ 3.13) and the decompressed JWE size (§ 3.15).
   - Treat `kid`, `jku` and `x5u` as attacker input: sanitize `kid`, and fetch URLs only from an allow-list with SSRF and DNS checks (§ 3.10).
   - Require the caller to opt in explicitly to `none`, and stop accepting `RSA1_5` (§ 3.2).
   - Check that a present `typ` equals the expected explicit type. Requiring `typ` on a kind of JWT that never carried one is a breaking change; rejecting a wrong `typ` when one is present is not (§ 3.11).
3. Validate against the target: run the test tokens in [`verification.md`](verification.md), and add a `noNE` token, a JSON-serialized JWS, a JWE with a huge `p2c` and a `zip` bomb; each must be rejected.
4. Keep behaviour unchanged: every token a conforming issuer sends today is still accepted. If an issuer breaks, it was relying on something the RFCs already forbade; fix the issuer rather than relaxing the verifier.

### JOSE RFCs to the none and RSA1_5 deprecation

1. Change the version marker: cite `draft-ietf-jose-deprecate-none-rsa15-06` for the defaults below.
2. Replace removed or renamed algorithms: drop `none` and `RSA1_5` from every default allow-list. Move JWE key management from `RSA1_5` to `RSA-OAEP` or an ECDH-ES algorithm (§ 4). Leave `RS256` signatures alone (§ 1).
3. Validate against the target: an `alg: none` JWS and an `RSA1_5` JWE are rejected under default configuration, and any remaining exception is scoped to the specific objects that need it (§ 5).
4. Keep behaviour unchanged: issuers that send signed tokens and OAEP or ECDH-ES JWEs see no difference.

### Within the JOSE RFCs: EdDSA to Ed25519

1. Change the version marker: issue `alg: Ed25519` (or `Ed448`) instead of `EdDSA` (RFC 9864 § 2.2).
2. Replace renamed fields: set `alg` on each published OKP key to `Ed25519` or `Ed448`; `kty`, `crv` and `x` stay the same (RFC 9864 § 5).
3. Validate against the target: verifiers accept `Ed25519` for the new keys, and keep `EdDSA` on the allow-list only for issuers that still send it.
4. Keep behaviour unchanged: the signature bytes and keys are the same; only the identifier changes.

## Preview: rfc8725bis

`draft-ietf-oauth-rfc8725bis-10` (21 August 2026) is approved by the IESG and in the RFC Editor queue, blocked because a normative reference (the deprecation draft) is not yet published. Posture: **build**. Everything it adds is listed under What changed and applied by this skill. Do not cite it as an RFC or by a guessed RFC number. When it is published: fold it into `jose-rfc` as the Best Current Practice in place of RFC 8725, update the citations in [`verification.md`](verification.md) and [`algorithms-and-keys.md`](algorithms-and-keys.md), and remove this preview.

## Preview: Deprecate none and RSA1_5

`draft-ietf-jose-deprecate-none-rsa15-06` (25 September 2026) is an active working group draft intended for Proposed Standard. Posture: **build**: its defaults are applied now, because RFC 7518 § 3.6 already forbids accepting unsecured JWSs by default. Do not emit `none` or `RSA1_5`, and do not claim the IANA registry already lists them as Deprecated. When it is published as an RFC: fold it into `jose-rfc`, update the registry statuses in [`algorithms-and-keys.md`](algorithms-and-keys.md) once IANA changes them, and remove this preview.

## Preview: HPKE for JWE

`draft-ietf-jose-hpke-encrypt-22` (6 July 2026) is approved and in the RFC Editor queue, blocked on its normative reference `draft-ietf-hpke-hpke`. IANA registered its `alg` values on 2026-09-29. Posture: **build**, opt-in only: a deployment may enable the HPKE identifiers it needs; nobody else changes. Do not cite it as an RFC. When it is published: fold it into `jose-rfc`, replace the draft citations in [`algorithms-and-keys.md`](algorithms-and-keys.md), and remove this preview.

## Preview: PQ/T composite signatures

`draft-ietf-jose-pq-composite-sigs-04` (10 September 2026) is a working group draft intended for Proposed Standard. Posture: **track**: its identifiers are requested, not registered, so do not issue them or put them on a production allow-list. Re-read the draft before relying on a detail. When it is published, or IANA registers its identifiers, revisit the posture.

## Preview: JSON Web Proof

`draft-ietf-jose-json-web-proof-14` (20 July 2026) is a working group draft whose own editor's note says it is early and incomplete, that the algorithms will change significantly, and that its definitions are for experimentation only (§ 1). Posture: **track**. Do not build production formats on it; for selective disclosure on JWS, see the `sd-jwt` skill. Revisit the posture when the editor's note is removed.
