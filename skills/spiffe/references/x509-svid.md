# X.509-SVID

Source: [X509-SVID](https://raw.githubusercontent.com/spiffe/spiffe/main/standards/X509-SVID.md), Stable, `main` at f97c46d.

## SPIFFE ID in the certificate (§2)

- The SPIFFE ID is a URI in the Subject Alternative Name extension.
- An X.509-SVID MUST contain exactly one URI SAN. Validators MUST reject an SVID with more than one URI SAN.
- Any number of other SAN types, including DNS SANs, MAY be present.

## Leaf and signing certificates (§3)

| Property       | Leaf certificate (§3.1)                                                | Signing certificate (§3.2)                                    |
| -------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------- |
| Purpose        | The only type that identifies a caller or resource                     | Validation material only; MUST NOT be used for authentication |
| SPIFFE ID path | MUST be non-root                                                       | MUST NOT have a path, if it has a SPIFFE ID                   |
| Is an SVID     | Yes                                                                    | SHOULD be                                                     |
| Subject        | Optional; if omitted, the URI SAN MUST be critical (RFC 5280 §4.1.2.6) | Not constrained                                               |

A signing certificate SHOULD be in the trust domain of the leaves it issues and MAY issue further signing certificates in the same or other trust domains (§3.2).

## Constraints and usage (§4)

- **Basic constraints (§4.1).** Signing certificates MUST set `cA=true` and MAY set `pathLenConstraint`. Leaves MUST set `cA=false`.
- **Name constraints (§4.2).** Signing certificates MAY apply URI name constraints, with caution: many libraries do not support URI name constraints and will fail path validation.
- **Key usage (§4.3).** MUST be present on all SVIDs and MUST be critical.
  - Signing certificates MUST set `keyCertSign` and MAY set `cRLSign`.
  - Leaves MUST set `digitalSignature`, MAY set `keyEncipherment` or `keyAgreement`, and MUST NOT set `keyCertSign` or `cRLSign`.
- **Extended key usage (§4.4).** Leaves SHOULD include it, MAY mark it critical, and when present MUST include both `id-kp-serverAuth` and `id-kp-clientAuth`. Signing certificates MAY include it, but libraries differ in how they apply EKU on intermediates.

## Validation (§5)

1. Run RFC 5280 path validation from the leaf to a CA certificate in the bundle of the leaf's trust domain (§5.1; Trust Domain and Bundle §3).
2. Leaf checks (§5.2). The validator MUST ensure:
   - `cA` is `false`;
   - `keyCertSign` and `cRLSign` are not set;
   - the SPIFFE ID scheme is `spiffe` and the path is non-root;
   - there is not more than one URI SAN.
3. Authorize the peer by its SPIFFE ID, qualified by its trust domain (SPIFFE-ID §4.1.2).

```ts
import { parseSpiffeId } from "./spiffe-id"; // the parser in spiffe-id.md

interface ParsedLeaf {
  uriSans: string[];
  basicConstraintsCA: boolean;
  keyUsage: Set<
    | "digitalSignature"
    | "keyEncipherment"
    | "keyAgreement"
    | "keyCertSign"
    | "cRLSign"
  >;
}

// Call after RFC 5280 path validation against the bundle of the leaf's trust domain.
export function checkLeaf(
  leaf: ParsedLeaf,
  allowed: (id: string) => boolean,
): string {
  if (leaf.uriSans.length !== 1)
    throw new Error("X.509-SVID must have exactly one URI SAN");
  if (leaf.basicConstraintsCA) throw new Error("leaf must have cA=false");
  if (leaf.keyUsage.has("keyCertSign") || leaf.keyUsage.has("cRLSign")) {
    throw new Error("leaf must not set keyCertSign or cRLSign");
  }
  const { trustDomain, path } = parseSpiffeId(leaf.uriSans[0]);
  if (!path) throw new Error("leaf SPIFFE ID needs a non-root path");
  const id = `spiffe://${trustDomain}${path}`;
  if (!allowed(id)) throw new Error("SPIFFE ID not authorized");
  return id;
}
```

The bundle used for step 1 must be chosen from the trust domain in the leaf's URI SAN. In practice, read the URI SAN first, select that trust domain's X.509 roots, then run path validation.

## In the SPIFFE bundle (§6)

Publishing (§6.1):

- One JWK per CA certificate, with `use` set to `x509-svid`.
- `kid` MUST NOT be set.
- `x5c` MUST contain exactly one base64 DER CA certificate, which SHOULD be self-signed.

Consuming (§6.2):

- Ignore any `x509-svid` entry without a non-empty `x5c`.
- Use only the first `x5c` value; ignore the rest.
- The X.509 CA bundle is the union of these certificates. If there are no `x509-svid` entries, the trust domain does not support X.509-SVID.

```json
{
  "keys": [
    {
      "use": "x509-svid",
      "kty": "EC",
      "crv": "P-256",
      "x": "...",
      "y": "...",
      "x5c": ["MIIB..."]
    }
  ]
}
```
