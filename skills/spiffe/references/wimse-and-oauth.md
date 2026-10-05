# SPIFFE, WIMSE and OAuth client authentication

Read this when SPIFFE workloads talk to systems built on the IETF WIMSE drafts, when an SVID must authenticate an OAuth client at an authorization server, or when explaining how SPIFFE relates to either. Sources, all IETF working group drafts listed in [Sources](../SKILL.md#sources): `draft-ietf-wimse-arch-08` (`arch`), `draft-ietf-wimse-identifier-03` (`id`), `draft-ietf-wimse-workload-creds-02` (`creds`) and `draft-ietf-oauth-spiffe-client-auth-02` (`oauth-spiffe`). SPIFFE section numbers carry the SPIFFE document name, as in the rest of this skill.

Draft posture: the WIMSE drafts are **name** here (use their terms to map SPIFFE onto WIMSE; build WIMSE protocols with the `wimse` skill). `oauth-spiffe` is **build** for the JWT-SVID and X.509-SVID methods, pinned to -02. Its WIT-SVID method depends on WIT-SVID, so it follows the Incubating preview: posture track, behind a flag.

## How SPIFFE maps to WIMSE

WIMSE (Workload Identity in Multi-System Environments) is an IETF working group that names workloads, defines their credentials and the ways they authenticate to each other. SPIFFE is one conforming deployment of its concepts.

| SPIFFE                      | WIMSE                               | Relationship                                                                                                                                                                                                     |
| --------------------------- | ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| SPIFFE ID                   | Workload Identifier                 | A SPIFFE ID is a conforming Workload Identifier (arch §3.1.2, id §4.1). When SPIFFE authenticates workloads, the `spiffe` scheme is mandatory; `wimse://` is for deployments without such a scheme (creds §5.1). |
| Trust domain                | Trust domain                        | Both are the URI authority. WIMSE says the trust domain SHOULD be an FQDN the organization owns (arch §3.1.2).                                                                                                   |
| Trust bundle                | Trust anchors                       | Consumers MUST bind each trust domain to its authorized issuers and trust anchors, distributed out of band, and MUST NOT fetch trust anchors from information carried only in a token's `iss` (creds §3).        |
| X.509-SVID                  | Workload Identity Certificate (WIC) | Both carry exactly one URI SAN identifier (creds §4, §6.1; X509-SVID §2). WIMSE lists the WIC as fully compatible with the X.509-SVID (creds §8).                                                                |
| WIT-SVID (Incubating)       | Workload Identity Token (WIT)       | A WIT-SVID is a SPIFFE profile of the WIT; every WIT-SVID is a WIT, not the reverse (WIT-SVID §1). WIMSE lists SPIFFE's WIT support as beta (creds §8). See [`wit-svid.md`](wit-svid.md).                        |
| JWT-SVID                    | none                                | A JWT-SVID is a bearer token sent in `Authorization: Bearer` (JWT-SVID §5, §7.1). It is not a WIT: a WIT has a `cnf` key and travels in the `Workload-Identity-Token` header field (creds §5.1, §5.1.1).         |
| Workload API (local socket) | Local API credential delivery       | WIMSE names a local domain socket such as SPIFFE's as one way to deliver credentials to a workload (arch §3.4.1.1).                                                                                              |

Rules where the two differ:

- SPIFFE IDs are stricter. WIMSE forbids query, fragment, user information and port, and requires support for 2048 bytes (id §4.1); SPIFFE adds the lowercase trust domain character set and the path segment rules (SPIFFE-ID §2.1, §2.2). A valid SPIFFE ID is a valid Workload Identifier; the reverse does not hold.
- The same identifier value means the same workload only when validated under the same trust domain and issuer trust configuration (arch §3.1.2). This is the WIMSE form of "validate against the SVID's own trust domain bundle".
- WIMSE consumers SHOULD NOT use wildcard or prefix matching on identifiers unless policy explicitly says so (id §7.6). The `spiffe_id` wildcard in `oauth-spiffe` below is such an explicit policy.

## OAuth client authentication with SVIDs

`oauth-spiffe` lets a SPIFFE workload authenticate as an OAuth client at the token endpoint with its SVID, instead of a client secret. It profiles RFC 7521, RFC 7523 and OAuth 2.0 Attestation-Based Client Authentication (Abstract, §1, §3).

| SVID       | How the client presents it                                                                                                                                                                                               | AS metadata value |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------- |
| JWT-SVID   | `client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-spiffe` and `client_assertion` set to a single JWT-SVID (§3.1)                                                                                    | `spiffe_jwt`      |
| X.509-SVID | Mutual TLS as in RFC 8705, with the X.509-SVID as client certificate; `client_id` MUST be the SPIFFE ID and MUST match the URI SAN (§3.2)                                                                                | `spiffe_x509`     |
| WIT-SVID   | The WIT-SVID in the `OAuth-Client-Attestation` header and a Client Attestation PoP JWT signed with the `cnf` key in `OAuth-Client-Attestation-PoP` (§3.3). This keeps the WIT-SVID out of `Authorization` (WIT-SVID §5). | `spiffe_wit`      |

### Authorization server validation

- **JWT-SVID** (§3.1): `sub`, `aud` and `exp` present; not expired; `aud` contains only the authorization server's issuer identifier, as its sole value; signature verified with the keys of the subject's trust domain (§6); the SPIFFE ID in `sub` matches or is associated with a registered client, or the `spiffe_id` of the client's Client ID Metadata Document when `client_id` is a URL.
- **X.509-SVID** (§3.2): RFC 5280 path validation against the trust domain's anchors (§6); exactly one URI SAN with a valid SPIFFE ID; `CA=FALSE`; `digitalSignature` set; the SPIFFE ID matches a registered client. The client validates the authorization server's certificate with its system trust store, not the SPIFFE bundle.
- **WIT-SVID** (§3.3.1): accept `typ` `wit+jwt` in `OAuth-Client-Attestation` next to `oauth-client-attestation+jwt`; validate the WIT-SVID as a WIT and its signature with the trust domain's keys (§6); validate the PoP JWT per Attestation-Based Client Authentication §5.2.

### Interoperability and registration

- The authorization server MUST support at least one method and MUST list the ones it supports in `token_endpoint_auth_methods_supported` (RFC 8414), and lists them in the revocation and introspection equivalents when applicable. Clients MUST support at least one and SHOULD support all three (§4).
- Trust between the authorization server and the trust domain is established out of band. Clients are registered by Client ID Metadata Document, Dynamic Client Registration or out of band (§5).
- Client metadata (§5.1): `spiffe_id` (REQUIRED in a Client ID Metadata Document) and `spiffe_bundle_endpoint` (OPTIONAL). A `spiffe_id` ending in `/*` allows a prefix match on whole path segments: `spiffe://example.org/client/*` matches `spiffe://example.org/client/123` but not `spiffe://example.org/client123`. Otherwise `sub` MUST match exactly.

### Key distribution

- Bundles MUST be keyed by trust domain (§6), as SPIFFE requires (Federation §4.2).
- Use the SPIFFE bundle endpoint with the `https_web` profile, which is a MUST for interoperability; poll it following the bundle's refresh hint. The endpoint cannot be derived from an SVID and MUST be configured out of band, keyed by trust domain (§6.1).
- Avoid (§6.2): the Workload API (NOT RECOMMENDED, because the authorization server would have to be a workload in the trust domain) and manual configuration (NOT RECOMMENDED; MAY in small static setups).
- X.509-SVIDs MUST NOT be validated with the system trust store: any CA in it could then issue any SPIFFE ID (§6.2.3).
- `iss`-based discovery (OpenID Connect Discovery or RFC 8414 metadata) SHOULD be avoided and MAY be used only as a compatibility fallback (§6.2.4). Then the server MUST NOT discover keys from an `iss` unless that `iss` is already trusted and bound to the trust domain, and MUST NOT accept a token as an SVID just because its signature validates under keys found through `iss` and its `sub` looks like a SPIFFE ID (§8.1).

### Open issues at -02

- The draft still has TODOs: what to do with the `attest_jwt_client_auth` metadata value (§3.3.1), and a bundle example that does not match its X.509-SVID (§6.1.1).
- Its WIT-SVID validation cites WIMSE workload-creds-01 §3.1; in `draft-ietf-wimse-workload-creds-02` the WIT is §5.1.
- Known implementation at -02: Keycloak, preview, JWT-SVID client authentication with the bundle endpoint (§7).
