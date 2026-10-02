# Cryptography and keys

Section numbers refer to the FAPI 2.0 Security Profile (SP, Final, 22 February 2025) unless another document is named.

## General requirements (§5.4.1)

When creating or processing JWTs, authorization servers, clients and resource servers:

- Adhere to RFC 8725 (JWT Best Current Practices).
- Use PS256, ES256 or EdDSA with the Ed25519 variant.
- Never use or accept the `none` algorithm.

Key and secret sizes:

- RSA keys are at least 2048 bits.
- Elliptic curve keys are at least 224 bits.
- Credentials not meant for people (access tokens, refresh tokens, authorization codes) have at least 128 bits of entropy (cf. RFC 6749 §10.10).

## The Ed25519 identifier

The SP §5.4.1 note says that, when it was written, no registered fully specified algorithm described "EdDSA using the Ed25519 variant". It allows such an algorithm once one is registered.

RFC 9864 (October 2025) registered the fully specified JOSE algorithm `Ed25519` (§2.2, §4.1.1). It set the polymorphic `EdDSA` identifier to Deprecated (§4.1.2). RFC 9864 §4.4 defines Deprecated as: a replacement exists and SHOULD be used in new deployments, unless documented operational or regulatory requirements prevent it.

For new FAPI 2.0 deployments that use Ed25519, the result is:

- Publish and send `Ed25519` as the JWS `alg`.
- Accept `EdDSA` with an `Ed25519` key only where an ecosystem still requires it.
- Never accept `EdDSA` with any other curve, because FAPI allows only the Ed25519 variant.

PS256 and ES256 remain the widely deployed choices. The FAPI conformance suite says the client JWKS `alg` is usually PS256, with ES256 in some cases (Conformance Testing for FAPI OPs).

## JSON Web Key Sets (§5.4.2)

- The SP strongly recommends that the AS distribute its public keys through a `jwks_uri` endpoint (RFC 8414).
- For client keys, it recommends either a `jwks_uri` or the `jwks` parameter with RFC 7591 and RFC 7592.
- Any server that provides a `jwks_uri`:
  - Serves it only over TLS.
  - Should not use the `x5u` and `jku` JOSE headers.
  - Should not serve a JWK set with several keys that share a `kid`.

## Key selection with duplicate `kid` (§5.4.3)

JWK sets should not reuse a `kid`. For interoperability, when several keys do share one, the verifier considers other JWK attributes such as `kty`, `use` and `alg` when it selects the verification key. The SP gives this example algorithm:

1. Find the keys whose `kid` matches the `kid` in the JOSE header.
2. If exactly one key is found, use it.
3. If several are found, iterate through them until one has an `alg`, `use`, `kty` or `crv` that corresponds to the message being verified.

## Algorithm traps in related specifications

- **JARM.** `authorization_signed_response_alg` defaults to RS256 (JARM §3). A FAPI client that uses JARM registers PS256, ES256 or Ed25519 explicitly, or the AS would fall back to an algorithm FAPI 2.0 forbids.
- **FAPI 1.0 Advanced.** It allows PS256 and ES256, says RS256 should not be used and forbids `none` (FAPI 1.0 Part 2 §8.6). It also forbids `RSA1_5` for JWE key management (§8.6.1).
- **FAPI 1.0 Baseline.** It required RSA keys of at least 2048 bits and EC keys of at least 160 bits (FAPI 1.0 Part 1 §5.2.2). FAPI 2.0 raised the EC minimum to 224 bits.

## Checklist

- [ ] Signing keys are RSA 2048 or larger (PS256), P-256 (ES256) or Ed25519.
- [ ] The verifier allowlist is exactly the algorithms the deployment uses; `none`, HMAC and RS256 are refused.
- [ ] JWKS endpoints are TLS-only, with unique `kid` values and no `x5u` or `jku`.
- [ ] JARM clients register a FAPI algorithm instead of relying on the RS256 default.
