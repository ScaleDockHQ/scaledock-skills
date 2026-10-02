# JWT-SVID

Source: [JWT-SVID](https://raw.githubusercontent.com/spiffe/spiffe/main/standards/JWT-SVID.md), Stable, `main` at f97c46d.

A JWT-SVID is a standard JWT with restrictions, aimed at asserting identity across Layer 7 boundaries. It always uses JWS Compact Serialization; JWS JSON Serialization MUST NOT be used (§1). It is a bearer token, so it can be replayed (§7.1).

## JOSE header (§2)

- Only JWS is supported. Any header not listed here, registered or private, MUST NOT be included (§2).
- `alg` MUST be one of RS256, RS384, RS512, ES256, ES384, ES512, PS256, PS384 or PS512. Validators MUST reject any other value (§2.1). This excludes `none` and the HMAC algorithms.
- `kid` is optional (§2.2).
- `typ` is optional; if set, it MUST be `JWT` or `JOSE` (§2.3).

## Claims (§3)

- `sub` MUST be the SPIFFE ID of the workload (§3.1).
- `aud` MUST be present with one or more values. Validators MUST reject tokens without `aud`, or whose `aud` does not contain the value the validator identifies with. One value is strongly recommended (§3.2).
- Scope `aud` to the receiving service, such as `reports` or `spiffe://example.org/reports`. Wide values such as `production` or `spiffe://example.org/` are discouraged, because one compromised service could then impersonate the caller everywhere (§3.2).
- `exp` MUST be set, and validators MUST reject tokens without it. Keep the lifetime as short as is reasonable (§3.3).
- Other registered or private claims MAY be used, but both producer and consumer must agree on them, which hurts interoperability (§3).

## Validation (§4)

1. Check that `alg` is a supported value before any other processing.
2. Pick the key set: parse `sub` as a SPIFFE ID and take the `jwt-svid` keys from the bundle of that trust domain (§6.2; Workload API §6.3).
3. Verify the signature per RFC 7519 §7.
4. Require `aud` and `exp`, and process them per RFC 7519 §4.1.3 and §4.1.4.

Workloads that use the Workload API SHOULD call `ValidateJWTSVID` instead of validating locally (Workload API §6.3); see [workload-api.md](workload-api.md).

```ts
import { parseSpiffeId } from "./spiffe-id"; // the parser in spiffe-id.md

const ALGS = new Set([
  "RS256",
  "RS384",
  "RS512",
  "ES256",
  "ES384",
  "ES512",
  "PS256",
  "PS384",
  "PS512",
]);

interface JwtSvidDeps {
  decodeUnverified(token: string): {
    header: Record<string, unknown>;
    payload: Record<string, unknown>;
  };
  jwtKeysFor(trustDomain: string): JsonWebKey[] | undefined; // jwt-svid entries only
  verifySignature(token: string, keys: JsonWebKey[], alg: string): boolean;
}

export function validateJwtSvid(
  token: string,
  myAudience: string,
  deps: JwtSvidDeps,
  now = Date.now() / 1000,
) {
  if (token.split(".").length !== 3) throw new Error("compact JWS required");
  const { header, payload } = deps.decodeUnverified(token);
  if (typeof header.alg !== "string" || !ALGS.has(header.alg))
    throw new Error("unsupported alg");
  if (header.typ !== undefined && header.typ !== "JWT" && header.typ !== "JOSE")
    throw new Error("bad typ");
  if (typeof payload.sub !== "string") throw new Error("sub required");
  const { trustDomain } = parseSpiffeId(payload.sub);
  const keys = deps.jwtKeysFor(trustDomain);
  if (!keys || keys.length === 0)
    throw new Error("no JWT-SVID keys for trust domain");
  if (!deps.verifySignature(token, keys, header.alg))
    throw new Error("bad signature");
  const aud = Array.isArray(payload.aud) ? payload.aud : [payload.aud];
  if (!aud.includes(myAudience)) throw new Error("audience mismatch");
  if (typeof payload.exp !== "number" || payload.exp <= now)
    throw new Error("expired or missing exp");
  return payload.sub;
}
```

For general JWT validation pitfalls, see the `jwt` skill.

## Transmission (§5)

- Use JWS Compact Serialization; this rules out an unprotected header (§5.1).
- Over HTTP, send it in `Authorization: Bearer <token>` (SHOULD, §5.2).
- Over gRPC, set metadata `authorization: Bearer <token>` (SHOULD, §5.3).

## In the SPIFFE bundle (§6)

- Publishing (§6.1): one JWK per signing key, `use` set to `jwt-svid`, and `kid` MUST be set.
- Consuming (§6.2): extract the `jwt-svid` entries before validating. With no `jwt-svid` entries, the trust domain does not support JWT-SVID.

## Security considerations (§7)

- **Replay (§7.1).** `aud` and `exp` limit replay but cannot prevent it. Use an aggressive `exp`. `jti` is permitted, but validators are not required to track its uniqueness.
- **Multiple audiences (§7.2).** A token for Bob and Chuck sent to Chuck lets Chuck replay it to Bob. Mint single-audience tokens.
- **Transport (§7.3).** Interception grants the token's full privileges. Every hop should provide confidentiality, for example from workload to load balancer and from load balancer to workload. A Unix domain socket on the same host is an acceptable exception.
