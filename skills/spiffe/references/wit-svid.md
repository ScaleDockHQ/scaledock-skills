# WIT-SVID (Incubating)

Source: [WIT-SVID](https://raw.githubusercontent.com/spiffe/spiffe/main/standards/WIT-SVID.md), Incubating, `main` at f97c46d. Draft posture: track.

Incubating specifications may still change based on implementation experience, and adopters are encouraged to gate them behind a feature flag ([STABILITY.md](https://raw.githubusercontent.com/spiffe/spiffe/main/standards/STABILITY.md) §2.3). Build on X.509-SVID or JWT-SVID for production paths; prototype WIT-SVID behind a flag.

A WIT-SVID is a SPIFFE profile of the IETF WIMSE Workload Identity Token (WIT), which binds a public key to a workload identity. Every WIT-SVID is a WIT, but not every WIT is a WIT-SVID. It is a JWT in JWS compact serialization (§1). This skill does not pin the WIMSE drafts; read them before implementing.

## Header (§2)

- `kid` MUST be present and unique per issuing key pair, compared as a case-sensitive string. This differs from JWT-SVID, where it is optional (§2.1).
- `typ` MUST be `wit+jwt` (§2.2).
- `alg` MUST be one of RS, ES or PS 256/384/512; validators MUST reject others (§2.3).
- Implementations SHOULD NOT add other header parameters; validators SHOULD ignore unknown ones unless listed in `crit` (§2.4).

## Claims (§3)

| Claim | Rule                                                                                                                                                 |
| ----- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `sub` | MUST be the workload's SPIFFE ID (§3.1)                                                                                                              |
| `cnf` | MUST be present, per RFC 7800 and WIMSE; validators MUST reject tokens without it. `cnf.jwk.alg` MUST be one of the nine permitted algorithms (§3.2) |
| `jti` | MAY be present; unique within the trust domain. MUST NOT be used for replay protection, because two instances on one node may share a token (§3.3)   |
| `exp` | MUST be present; reject missing or past values, with leeway of seconds up to a couple of minutes. Typical lifetimes are minutes to hours (§3.4)      |
| `nbf` | MAY be present; reject if in the future. Validators MAY reject lifetimes longer than local policy (§3.5)                                             |
| `iat` | MAY be present, for audit only; MUST NOT be used as the start of validity (§3.6)                                                                     |
| `iss` | MAY be present; SHOULD NOT be a value compatible with OpenID Connect Discovery, so the token cannot pass as an ID Token (§3.7)                       |
| `aud` | MUST NOT be included; scope to the recipient in the proof of possession instead (§3.8)                                                               |

Other claims are permitted; validators SHOULD ignore unknown claims (§3.8).

## Issuance and validation (§4)

- The issuer MUST use a permitted `alg`, MUST set `alg`, `typ`, `kid`, `sub`, `exp` and `cnf`, and MUST set `cnf.jwk.alg` to a permitted value. It MAY set `jti`, `nbf` and `iat`.
- The issuer MAY give the same WIT-SVID, or the same `cnf` key, to instances of one workload on one host.
- Validation follows RFC 7519, and the validator MUST NOT accept the token without proof of possession of the `cnf` key.

## Presentation (§5)

Any presentation protocol MUST:

- bind the presentation to proof of possession of the `cnf` key;
- not present the WIT-SVID as a bearer token;
- not use the HTTP `Authorization` header.

Implementors SHOULD use a WIMSE protocol: the Workload Proof Token, or workload-to-workload authentication with HTTP Signatures. Other protocols MAY be used if they meet these requirements.

## In the SPIFFE bundle (§6)

- Publishing (§6.1): one JWK per signing key with `use` set to `wit-svid`; `kid` MUST be unique across the whole bundle, including JWT-SVID keys.
- Consuming (§6.2): extract `wit-svid` entries before validating. With none, the trust domain does not support WIT-SVID.

## Workload API (Workload API §7)

`FetchWITSVID` and `FetchWITBundles` are optional. Servers without them MUST return `Unimplemented`. See [workload-api.md](workload-api.md).

## Security considerations (§7)

- Never accept a WIT-SVID as a bearer token. Keep it out of `Authorization` so that JWT-SVID or OIDC validators cannot accept it (§7.1).
- Scope proofs of possession tightly to the request, and make the recipient enforce that scope. A proof scoped only to the recipient allows wide replay (§7.2).
- Proof lifetimes MUST be limited and SHOULD be as short as possible. Recipients MAY allow each proof only once, for example by tracking the WPT `jti` (§7.2).
- Send the token and proof over a secure channel, such as server-authenticated TLS (§7.3).
