# SPIFFE IDs and SVIDs

Source: [SPIFFE-ID](https://raw.githubusercontent.com/spiffe/spiffe/main/standards/SPIFFE-ID.md), Stable, `main` at f97c46d.

## Syntax (§2)

A SPIFFE ID is an RFC 3986 URI of the form `spiffe://<trust domain>/<path>`.

- The scheme is `spiffe`. The trust domain MUST NOT be empty. The URI MUST NOT include a query or fragment (§2).
- The trust domain sits in the URI host (§2.1):
  - it MUST NOT include userinfo or a port;
  - it is lowercase letters, digits, `.`, `-` and `_` only; percent-encoding is not allowed;
  - IPv6 literals cannot be expressed, and implementations MUST NOT treat IP addresses and DNS names differently.
- The path (§2.2):
  - MUST NOT contain percent-encoding, empty segments, `.` or `..` segments, or a trailing `/`;
  - each segment contains only `[a-zA-Z0-9.-_]`.
- Length (§2.3): implementations MUST support SPIFFE IDs up to 2048 bytes and SHOULD NOT generate longer ones. All components count, including `spiffe://`. The trust domain name is at most 255 bytes.
- Parsing (§2.4): the scheme and trust domain are case-insensitive, the path is case-sensitive.

### Trust domain names (§2.1.1)

There is no registry of trust domain names, so nothing prevents two trust domains from choosing the same name. Choose names that are highly likely to be globally unique: use a registered domain you own as a suffix (`prod.example.com`), and generate a random unique name such as a UUID when names are created without operator input. Colliding trust domains keep working on their own but cannot federate.

### Paths (§2.2)

The path identifies a workload. Its meaning is defined by the trust domain administrator, not by the specification. The standard gives three conventions:

- services directly: `spiffe://staging.example.com/payments/mysql`;
- service owners, mapped from platform identities: `spiffe://k8s-west.example.com/ns/staging/sa/default`;
- opaque IDs, with metadata held in a separate registry: `spiffe://example.com/9eebccd2-12bf-40a6-b262-65fe0487d453`.

These are conventions, "not assertions guaranteed by this specification" (§2.2). Do not derive authorization from another trust domain's path layout unless its meaning has been agreed (§4.1.3).

### Parser

```ts
const TRUST_DOMAIN = /^[a-z0-9._-]+$/;
const SEGMENT = /^[a-zA-Z0-9._-]+$/;

export function parseSpiffeId(id: string): {
  trustDomain: string;
  path: string;
} {
  if (new TextEncoder().encode(id).length > 2048)
    throw new Error("SPIFFE ID too long");
  const prefix = "spiffe://";
  if (id.slice(0, prefix.length).toLowerCase() !== prefix)
    throw new Error("scheme must be spiffe");
  if (/[?#%]/.test(id)) throw new Error("query, fragment or percent-encoding");
  const rest = id.slice(prefix.length);
  const slash = rest.indexOf("/");
  const trustDomain = slash === -1 ? rest : rest.slice(0, slash);
  const path = slash === -1 ? "" : rest.slice(slash);
  if (
    !trustDomain ||
    trustDomain.length > 255 ||
    !TRUST_DOMAIN.test(trustDomain)
  ) {
    throw new Error("invalid trust domain");
  }
  for (const segment of path ? path.slice(1).split("/") : []) {
    if (segment === "." || segment === ".." || !SEGMENT.test(segment)) {
      throw new Error("invalid path segment");
    }
  }
  return { trustDomain, path };
}
```

The trust domain pattern rejects uppercase, `:` (a port), `@` (userinfo) and brackets (IPv6). An empty segment, which also covers a trailing `/`, fails the segment pattern.

## SVIDs (§3)

- An SVID is how a workload communicates its identity. It is valid only if signed by an authority within its SPIFFE ID's trust domain (§3).
- Each trust domain MUST have a signing authority that carries its own SVID. That SVID SHOULD be in the same trust domain and SHOULD NOT have a path. Trust can be chained by having a foreign trust domain's authority sign it; otherwise it is self-signed (§3.1).
- An SVID has a SPIFFE ID, a valid signature and an optional public key. The SPIFFE ID and public key MUST be in the signed part. The holder keeps the private key to prove ownership (§3.2).
- An SVID MUST use a document type with its own SPIFFE specification: X.509-SVID, JWT-SVID or WIT-SVID (§3.3).
- Extra information beyond the SPIFFE ID needs caution as input to a security decision, especially from another trust domain (§3.2).

## Security considerations for assertions (§4.1)

Only include assertions with a very high degree of confidence in their safety (§4.1).

- **Temporal accuracy (§4.1.1).** Assertions hold for the whole SVID lifetime and cannot be revoked until the SVID expires. Roles, group membership and access policies change; the SPIFFE ID and region do not. When volatility is unclear, leave the assertion out.
- **Scope and influence (§4.1.2).** Consumers should treat every assertion as qualified by the SVID's trust domain. A "role" of "admin" in trust domain A says nothing about trust domain B.
- **Interpretation (§4.1.3).** Only act on custom SVID data from trust domains whose operators have agreed on its meaning; agreement with one trust domain does not extend to others.
- **Veracity (§4.1.4).** Consumers in the same trust domain can generally trust assertions. A foreign trust domain can claim anything, so decide case by case whether its authority is trusted for a given assertion.
