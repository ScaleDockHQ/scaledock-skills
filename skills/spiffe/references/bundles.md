# Trust domains and bundles

Source: [SPIFFE Trust Domain and Bundle](https://raw.githubusercontent.com/spiffe/spiffe/main/standards/SPIFFE_Trust_Domain_and_Bundle.md), Stable, `main` at f97c46d.

## Trust domains (§2)

- A trust domain is an identity namespace backed by an issuing authority and its keys.
- One trust domain can have many keys and key types: several keys during root rotation, and different key types to avoid multi-protocol attacks when more than one SVID type is in use.
- Use each authoritative key in a single trust domain. Sharing keys across trust domains weakens isolation, for example between staging and production (§2, §6.2).

## Bundles (§3)

- A bundle holds a trust domain's keys, which are authoritative for SVIDs in that trust domain.
- Bundles are designed for control planes, but workloads may consume them.
- A bundle does not name its trust domain. Store the name alongside it, as a bundle map or a `<trust_domain_name, bundle>` pair, and validate each SVID with the bundle of its own trust domain.
- Keys are rotated by publishing a new bundle that adds new keys and omits revoked ones. The SPIFFE implementation distributes the updates, for example through the Workload API.

## Bundle format (§4)

A bundle is an RFC 7517 JWK Set.

| Parameter             | Rule                                                                                                                                   |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| Extra set parameters  | MAY be included; implementations MUST NOT require them (§4.1)                                                                          |
| `spiffe_sequence`     | SHOULD be set. A monotonically increasing integer that MUST change on every update. Parse it into at least 64 bits (§4.1.1)            |
| `spiffe_refresh_hint` | SHOULD be set. An integer number of seconds suggesting how often consumers check for updates (§4.1.2)                                  |
| `keys`                | MUST be present. Clients MUST ignore JWKs with unknown key types or uses (§4.1.3)                                                      |
| JWK `kty`             | MUST be set; an unknown key type means the whole JWK is ignored (§4.2.1)                                                               |
| JWK `use`             | MUST be set: `x509-svid`, `jwt-svid` or `wit-svid`, case-sensitive. A missing or unknown value means the whole JWK is ignored (§4.2.2) |

- Implementers SHOULD NOT add JWK parameters defined neither here nor in the SVID specification (§4.2).
- An empty `keys` array means the trust domain revoked all its keys. A bundle that yields no usable keys may mean it moved to a key type or use the client does not understand. In both cases, workloads MUST treat all SVIDs from that trust domain as invalid (§4.1.3).
- Per-type entry rules: X.509 CA entries in [x509-svid.md](x509-svid.md), JWT keys in [jwt-svid.md](jwt-svid.md), WIT keys in [wit-svid.md](wit-svid.md).

```json
{
  "spiffe_sequence": 2,
  "spiffe_refresh_hint": 2419200,
  "keys": [
    {
      "kty": "RSA",
      "use": "x509-svid",
      "x5c": ["<base64 DER of CA #1>"],
      "n": "...",
      "e": "AQAB"
    },
    {
      "kty": "RSA",
      "use": "x509-svid",
      "x5c": ["<base64 DER of CA #2>"],
      "n": "...",
      "e": "AQAB"
    },
    {
      "kty": "EC",
      "kid": "jwt-key-1",
      "use": "jwt-svid",
      "crv": "P-256",
      "x": "...",
      "y": "..."
    }
  ]
}
```

Appendix A shows rotation: bundle 2 increments `spiffe_sequence` and adds the replacement root ahead of the original root's expiry, so validators accept SVIDs from either root during the overlap.

```ts
type Use = "x509-svid" | "jwt-svid" | "wit-svid";

interface SpiffeBundle {
  spiffe_sequence?: number;
  spiffe_refresh_hint?: number;
  keys: Array<Record<string, unknown>>;
}

export function keysFor(
  bundle: SpiffeBundle,
  use: Use,
  knownKty = new Set(["RSA", "EC", "OKP"]),
) {
  return bundle.keys.filter(
    (k) => typeof k.kty === "string" && knownKty.has(k.kty) && k.use === use,
  );
}
```

An empty result for `x509-svid` or `jwt-svid` means that trust domain does not support that SVID type (X509-SVID §6.2, JWT-SVID §6.2). An empty result for every type means all SVIDs from the trust domain are invalid (§4.1.3).

## Bundle maps (§5)

A bundle map is JSON with a `trust_domains` object keyed by trust domain name.

- `trust_domains` MUST be set and MAY be empty (§5.1.1).
- Producers MUST keep trust domain names unique. Consumers MUST reject maps with duplicate trust domain keys when their parser can detect them (§5.1.1, §6.3). Use a JSON parser that detects duplicate keys.
- Producers SHOULD omit the refresh hint from bundles inside a map. Consumers MUST NOT change the map's refresh behavior based on an individual bundle's refresh hint (§5.1.1).
- Load a map atomically as the full state of the world. Use each bundle's `spiffe_sequence` to measure propagation (Appendix B.1).

```json
{
  "trust_domains": {
    "example.com": {
      "spiffe_sequence": 12035488,
      "keys": [
        {
          "kty": "RSA",
          "use": "x509-svid",
          "x5c": ["..."],
          "n": "...",
          "e": "AQAB"
        }
      ]
    }
  }
}
```

## Security considerations (§6)

- **Refresh hint (§6.1).** The hint controls how fast keys can be rotated and redacted. Without one, clients may pick an interval from SVID validity periods and should default to a low interval such as five minutes.
- **Shared keys (§6.2).** If a root key is shared and a validator trusts any SVID that chains to it, every trust domain under that key is authenticated. Keep one root key per trust domain, and make authorization policies check the trust domain name.
- **Duplicate JSON keys (§6.3).** RFC 8259 leaves duplicate names unpredictable; a duplicate trust domain can select the wrong bundle.
