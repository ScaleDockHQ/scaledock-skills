# Federation

Source: [SPIFFE Federation](https://raw.githubusercontent.com/spiffe/spiffe/main/standards/SPIFFE_Federation.md), Stable, `main` at f97c46d.

Federation is obtaining another trust domain's bundle so that its SVIDs can be validated, and handing that bundle to the workloads that validate them (§2). Use cases are trust domains within one organization (staging and production, PCI and non-PCI), between organizations, and services that validate customers' SVIDs without running SPIFFE themselves (§3).

## Bundle endpoint (§4)

A bundle endpoint is an HTTPS URL that answers GET with a SPIFFE bundle, similar to an OpenID Connect `jwks_uri` (§4).

- **Adding keys (§4.1).** Publish new keys well before use: 3 to 5 times the bundle's `spiffe_refresh_hint` is recommended. New keys MUST be published before they sign any SVID.
- **Removing keys (§4.1).** Remove a key once no valid SVID issued from it remains (SHOULD). Keys for internal-only SVIDs are exempt.
- **Polling (§4.1, §6.2).** Clients SHOULD poll at the refresh hint, defaulting to about five minutes. After a failed poll, retry at the next interval rather than aggressively.
- **Stored bundles (§4.2).** Clients SHOULD store the latest bundle and compare freshness with `spiffe_sequence`; without one, the most recent fetch is current. Operators MAY override a foreign bundle locally until the next refresh.
- **No merging (§4.2).** Bundles from different trust domains MUST NOT be merged; that would let one trust domain forge another's identities.
- **Stable URL (§4.3).** Migrating every client to a new URL is error-prone, so choose a URL that will last.

## Serving and consuming (§5)

- Clients MUST support both `https_web` and `https_spiffe`; servers MUST support at least one (§5).
- TLS bundle endpoint servers MUST follow the Mozilla intermediate compatibility configuration unless the profile says otherwise (§5).
- Before fetching, a client MUST be configured with the endpoint URL, the profile and the trust domain name. Bundles do not name their trust domain, so the configured name is what binds them (§5.1).
- When a control plane distributes the bundle internally, it MUST carry the trust domain name with it (§5.1).

```text
Bundle Endpoint URL:      "https://example.com/production/bundle.json"
Bundle Endpoint Profile:  "https_web"
Trust Domain:             "prod.example.com"
```

### `https_web` (§5.2.1)

- URL: scheme `https`, no userinfo (§5.2.1.1). No other parameters are allowed to be required (§5.2.1.2).
- Server (§5.2.1.3):
  - The certificate SHOULD come from a public CA and MUST name the endpoint's DNS name or IP address.
  - The server MUST NOT require client authentication, at the TLS or HTTP layer.
  - It MUST return the latest bundle as UTF-8 and SHOULD set `Content-Type: application/json`.
  - It MAY redirect to another valid bundle endpoint URL and SHOULD use temporary redirects.
- Client (§5.2.1.4):
  - Validate the server certificate per RFC 6125: a locally trusted CA, and a SAN (or CN) matching the URL host.
  - Know the trust domain before fetching, ideally from explicit configuration.
  - SHOULD follow redirects to valid URLs with the same TLS checks, use the configured URL for every refresh, and SHOULD NOT store the redirect target.

### `https_spiffe` (§5.2.2)

- URL: scheme `https`, no userinfo (§5.2.2.1).
- Extra client parameters (§5.2.2.2): the endpoint server's SPIFFE ID, and a secure way to get the bundle of that server's trust domain.
  - **Self-serving** endpoints serve the bundle of their own trust domain. Configure one bootstrap bundle; clients MUST accept it in SPIFFE bundle format and MAY accept PEM.
  - **Non-self-serving** endpoints need the server's trust domain configured separately: through its own bundle endpoint (any profile), or through an out-of-scope process.
- Server (§5.2.2.3):
  - The server certificate MUST be a valid X.509-SVID.
  - Client authentication, response encoding and redirects are as for `https_web`. A redirect target MUST present an X.509-SVID with the same SPIFFE ID.
- Client (§5.2.2.4):
  - Validate the server certificate as an X.509-SVID for the configured endpoint SPIFFE ID.
  - Self-serving: use the operator bundle for the first connection only, then MUST use the latest fetched bundle, so the foreign trust domain can rotate keys.
  - Non-self-serving: use the latest bundle of the endpoint's trust domain.
  - Redirect targets MUST present an X.509-SVID for the same SPIFFE ID.

```text
Bundle Endpoint URL:      "https://example.com/global/bundle.json"
Bundle Endpoint Profile:  "https_spiffe"
Trust Domain:             "example.com"
Endpoint SPIFFE ID:       "spiffe://example.com/spiffe-bundle-server"
Endpoint Trust Bundle:    {example.com bundle}
```

## Relationship lifecycle (§6)

- Relationships are one-way. Mutual authentication needs one relationship in each direction (§6).
- Establish: configure the three parameters, fetch, and store the bundle with its trust domain name (§6.1).
- Maintain: poll, update the stored bundle, and redistribute so validators add new keys and drop revoked ones (§6.2).
- Terminate: delete the local bundle, stop polling, and make validators drop it (§6.3).

```ts
interface FederationConfig {
  trustDomain: string; // configured, never derived from the URL
  url: string;
  profile:
    { kind: "https_web" } | { kind: "https_spiffe"; endpointSpiffeId: string };
}

interface StoredBundle {
  trustDomain: string;
  sequence?: number;
  jwks: unknown;
  fetchedAt: number;
}

export function acceptFetched(
  config: FederationConfig,
  current: StoredBundle | undefined,
  body: { spiffe_sequence?: number; keys?: unknown },
) {
  if (!Array.isArray(body.keys)) throw new Error("bundle must have keys");
  if (
    current?.sequence !== undefined &&
    body.spiffe_sequence !== undefined &&
    body.spiffe_sequence < current.sequence
  ) {
    return current; // older than what is stored
  }
  return {
    trustDomain: config.trustDomain,
    sequence: body.spiffe_sequence,
    jwks: body,
    fetchedAt: Date.now(),
  };
}
```

## Security considerations (§7)

- **Parameter integrity (§7.1).** The trust domain name, URL and profile are highly sensitive.
  - A changed trust domain name lets the endpoint owner impersonate any trust domain.
  - A changed URL, especially with `https_web`, lets an attacker issue keys for the whole trust domain.
  - Switching `https_spiffe` to `https_web` is a downgrade.
  - Distribute configuration through a channel that resists tampering and impersonation; plain email does not.
- **No inference (§7.2).** Configure all three parameters explicitly.
  - Deriving the trust domain from the URL host lets anyone who can host a file on that host claim the trust domain. Trust domain names need not be DNS names at all.
  - The profile cannot be inferred either. Trying `https_web` and falling back to `https_spiffe`, or the reverse, is not safe.
- **Binding (§7.3).** Validate each SVID only with its own trust domain's bundle. A pooled root store, as in Web PKI, lets trust domains impersonate each other.
- **Endpoint trust (§7.4).** Whoever runs the endpoint, its platform, or its host (for example an object store) is trusted to serve the right bundle. A non-self-serving endpoint makes the served trust domain trust the serving one.
- **Redirects (§7.5.1).** Servers SHOULD send only temporary redirects, and clients SHOULD treat every redirect as temporary. Permanent redirects can silently move trust to a new domain owner or make a transient compromise permanent. Operators may disable redirects after reviewing the endpoints they rely on.
- **Interception (§7.5.2).** Certificates obtained by challenge-response, such as ACME, depend on the network and DNS. Add compensating controls if the threat model includes network compromise.
- **Chaining (§7.6).** With `https_spiffe`, trust can chain through several trust domains. A compromise anywhere in the chain compromises the next link, so long chains are discouraged. Log bundle fetches for forensics.
