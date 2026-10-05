---
name: spiffe
description: "SPIFFE: issue and verify workload identities with SPIFFE IDs, X.509-SVIDs, JWT-SVIDs, trust bundles, the Workload API and federation. Use when building or reviewing service-to-service authentication, workload mTLS, workload identity on Kubernetes or VMs, or SPIRE: spiffe:// URI and trust domain name rules, X.509-SVID URI SAN, key usage and leaf validation, JWT-SVID alg, aud and exp checks, SPIFFE bundles as JWK Sets with use x509-svid or jwt-svid, spiffe_sequence and spiffe_refresh_hint, bundle maps, Workload API profiles (FetchX509SVID, FetchJWTSVID, ValidateJWTSVID), SPIFFE_ENDPOINT_SOCKET and the workload.spiffe.io metadata header, federation bundle endpoints with the https_web and https_spiffe profiles, SPIRE servers, agents, attestation, registration entries and federates_with, and mapping SPIFFE to WIMSE and OAuth SPIFFE client auth. Targets the Stable SPIFFE standards at main f97c46d (pinned by commit), tracks the Incubating standards (WIT-SVID, Broker API) as a preview, and maps to SPIRE v1.15.3."
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.2.0"
  kind: standard
---

# SPIFFE

SPIFFE (Secure Production Identity Framework for Everyone) defines how workloads get a cryptographic identity: a SPIFFE ID, carried in a SPIFFE Verifiable Identity Document (SVID), issued by a trust domain whose keys are published as a bundle, and delivered locally through the Workload API. Federation exchanges bundles between trust domains. SPIRE is the reference implementation. This skill pins the SPIFFE standards in the `spiffe/spiffe` repository at commit f97c46d and SPIRE v1.15.3, and produces an issuer, validator, workload integration or review that meets their rules.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources), with the document and section it cites. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: SVID issuer or control plane, workload that fetches SVIDs, validator (server or client authenticating a peer), bundle endpoint operator, or federation consumer.
- Target version: SPIFFE standards (Stable) at `main` f97c46d (current, the default). SPIFFE Incubating standards (WIT-SVID, Workload API §7, Broker API and Broker Endpoint) are a preview with posture track: never emit them in a default or production code path. The standards are versioned by commit and stability level, not by number; SPIRE versions are implementation versions. See [`references/versions.md`](references/versions.md).
- SVID types: X.509-SVID (mTLS), JWT-SVID (bearer tokens across proxies), or the Incubating WIT-SVID (proof of possession).
- Trust domains: the local trust domain name and any federated trust domains.
- Implementation: SPIRE, another SPIFFE implementation, or a library that talks to the Workload API.
- Sources: when refreshing this skill or when a rule looks out of date, check the latest commit on `spiffe/spiffe` `main`, the stability banner of each standard, and the latest SPIRE release, then every URL in [Sources](#sources). Update the pins and bump the version.

## Invariants

1. **SPIFFE IDs are strict URIs.** The scheme MUST be `spiffe`; the trust domain MUST be non-empty, lowercase `[a-z0-9.-_]`, with no port or userinfo; there MUST NOT be a query or fragment; path segments MUST be `[a-zA-Z0-9.-_]` with no empty, `.` or `..` segments and no trailing `/` (SPIFFE-ID §2, §2.1, §2.2).
2. **Validate against the SVID's own trust domain bundle.** Validators MUST choose the bundle for the trust domain the SVID resides in, and treat a peer with no matching bundle as untrusted (Trust Domain and Bundle §3; Workload API §4.6, §6.3; Federation §7.3).
3. **Never merge bundles.** Bundle contents from different trust domains MUST NOT be merged (Federation §4.2).
4. **One URI SAN per X.509-SVID.** Validators MUST reject X.509-SVIDs with more than one URI SAN (X509-SVID §2).
5. **Only leaf certificates authenticate.** The validator MUST check `cA=false`, no `keyCertSign` or `cRLSign`, scheme `spiffe` and a non-root path, after RFC 5280 path validation (X509-SVID §5.1, §5.2). Signing certificates MUST NOT be used for authentication (X509-SVID §3.2).
6. **JWT-SVIDs are restricted JWTs.** `alg` MUST be one of RS, ES or PS 256/384/512; `aud` and `exp` MUST be present; validators MUST reject a token whose `aud` lacks their own value (JWT-SVID §2.1, §3.2, §3.3, §4).
7. **Unknown keys are ignored, and an empty bundle invalidates.** Clients MUST ignore JWKs with unknown `kty` or `use`; a bundle with no usable keys means all SVIDs of that trust domain are invalid (Trust Domain and Bundle §4.1.3, §4.2).
8. **The Workload Endpoint is local and unauthenticated.** It MUST be served over gRPC and MUST NOT require client authentication; every request MUST carry the metadata `workload.spiffe.io: true` or be rejected (Workload Endpoint §3, §5).
9. **Workload API responses are full state.** Every stream message MUST carry the full set of information. Clients MUST NOT keep a value after a message sets it to default or empty, and SHOULD treat missing data as a redaction (Workload API §4.3, §4.4).
10. **Federation parameters are explicit.** Bundle endpoint clients MUST be configured with the endpoint URL, profile and trust domain name; none of them can be inferred from another (Federation §5.1, §7.2).
11. **Bundle endpoints need no client authentication.** Servers MUST NOT require client authentication and MUST serve the latest bundle; clients MUST support both `https_web` and `https_spiffe` (Federation §5, §5.2.1.3, §5.2.2.3).
12. **WIT-SVIDs are never bearer tokens.** A WIT-SVID MUST NOT be accepted without proof of possession of the `cnf` key and MUST NOT be sent in the `Authorization` header (WIT-SVID §4, §5, §7.1).

## Workflow

1. **Pick the version and scope the work.** Build on the Stable standards at the pinned commit. Confirm the role, SVID types, trust domains and implementation from Inputs.
   -> [`references/versions.md`](references/versions.md)
   ✓ The design records the `spiffe/spiffe` commit and SPIRE version, names each trust domain, which SVID type each link uses, and who validates what.
2. **Design SPIFFE IDs.** Pick trust domain names and a path scheme, and validate IDs with the parsing rules.
   -> [`references/spiffe-id.md`](references/spiffe-id.md)
   ✓ Every ID passes the SPIFFE-ID §2 rules, and the trust domain name is unlikely to collide.
3. **Issue or validate X.509-SVIDs.** Apply the URI SAN, basic constraints, key usage and leaf validation rules.
   -> [`references/x509-svid.md`](references/x509-svid.md)
   ✓ A certificate with two URI SANs, `cA=true` or a root path is rejected.
4. **Issue or validate JWT-SVIDs.** Restrict `alg`, require `aud` and `exp`, and transmit as a bearer token.
   -> [`references/jwt-svid.md`](references/jwt-svid.md)
   ✓ A token with `alg` HS256, no `aud`, or another service's audience is rejected.
5. **Publish and consume bundles.** Build JWK Set bundles and bundle maps, and select keys by `use`.
   -> [`references/bundles.md`](references/bundles.md)
   ✓ X.509 roots come only from `x509-svid` entries and JWT keys only from `jwt-svid` entries.
6. **Integrate with the Workload API.** Locate the endpoint, set the metadata header, stream updates and handle error codes.
   -> [`references/workload-api.md`](references/workload-api.md)
   ✓ The workload reconnects immediately on stream loss and rotates SVIDs without restarting.
7. **Federate trust domains.** Serve and consume bundle endpoints with `https_web` or `https_spiffe`, and keep the trust domain binding.
   -> [`references/federation.md`](references/federation.md)
   ✓ Each foreign bundle is stored with its configured trust domain and refreshed at its refresh hint.
8. **Map to SPIRE if it is used.** Configure the server, agents, attestors, registration entries and federation.
   -> [`references/spire.md`](references/spire.md)
   ✓ Registration entries use selectors that only the intended workload matches.
9. **Track WIT-SVID if proof of possession is needed.** It is part of the Incubating preview: prototype it only when asked, behind a feature flag.
   -> [`references/wit-svid.md`](references/wit-svid.md), [`references/versions.md`](references/versions.md)
   ✓ No code path accepts a WIT-SVID without a proof of possession, and no default path emits one.
10. **Bridge to WIMSE or OAuth if needed.** Map SPIFFE IDs, bundles and SVIDs onto WIMSE terms, or authenticate an OAuth client with its SVID per draft-ietf-oauth-spiffe-client-auth-02.
    -> [`references/wimse-and-oauth.md`](references/wimse-and-oauth.md)
    ✓ The authorization server keys bundles by trust domain from a configured bundle endpoint, and never validates an X.509-SVID with the system trust store or a JWT-SVID with keys found only through `iss`.
11. **Upgrade to the pinned commit** (only when code follows an older revision, or a specification is promoted). Follow the upgrade section.
    -> [`references/versions.md`](references/versions.md)
    ✓ The recorded commit is f97c46d, and root-path X.509-SVID leaves are rejected.

## Verify before done

- [ ] SPIFFE ID parsing rejects uppercase trust domains, ports, query strings, empty segments and trailing slashes.
- [ ] mTLS peers are matched against an allowed SPIFFE ID or trust domain after X.509-SVID leaf validation.
- [ ] JWT-SVID validation checks `alg`, `aud`, `exp` and the signature against the subject trust domain's `jwt-svid` keys.
- [ ] Bundles are stored as `<trust domain, bundle>` pairs, and no validator uses a pooled root store.
- [ ] Workload API clients send `workload.spiffe.io: true`, honor `SPIFFE_ENDPOINT_SOCKET`, and do not retry on `InvalidArgument`.
- [ ] Bundle endpoints serve UTF-8 JSON over HTTPS without client authentication, and clients follow redirects only temporarily.
- [ ] Federation configuration is distributed through a channel that resists tampering (Federation §7.1).

## Reference index

- **`references/versions.md`**: how the standards are versioned, the Stable line and the Incubating preview, what changed by commit, and upgrade steps.
- **`references/spiffe-id.md`**: SPIFFE ID syntax, trust domain names, collisions, length, parsing, SVID trust and assertion safety.
- **`references/x509-svid.md`**: X.509-SVID SAN, leaf and signing certificates, constraints, key usage, validation and bundle entries.
- **`references/jwt-svid.md`**: JWT-SVID header and claims, validation, transmission, bundle entries and replay risks.
- **`references/bundles.md`**: trust domains, the bundle JWK Set format, bundle maps, refresh and key reuse.
- **`references/workload-api.md`**: the Workload Endpoint transport, location, authentication and errors, and the Workload API profiles and RPCs.
- **`references/federation.md`**: bundle endpoints, key rollover, `https_web` and `https_spiffe`, relationship lifecycle and security.
- **`references/spire.md`**: SPIRE server and agent, attestation, registration entries, federation configuration and fetching SVIDs.
- **`references/wit-svid.md`**: the Incubating WIT-SVID profile of the WIMSE Workload Identity Token.
- **`references/wimse-and-oauth.md`**: how SPIFFE maps to the IETF WIMSE drafts, and OAuth client authentication with JWT-SVIDs, X.509-SVIDs and WIT-SVIDs.

## Related skills

- `jwt`, for JWT and JWS validation that JWT-SVIDs and WIT-SVIDs build on: `npx skills add ScaleDockHQ/scaledock-skills --skill jwt`
- `wimse`, for the IETF workload identity drafts (WIT, WPT, HTTP signatures, mutual TLS) that WIT-SVID profiles: `npx skills add ScaleDockHQ/scaledock-skills --skill wimse`
- `oauth`, for the OAuth 2.0 framework, client authentication and token endpoint rules that SPIFFE client authentication profiles: `npx skills add ScaleDockHQ/scaledock-skills --skill oauth`

## Sources

Status uses the publishing body's own maturity term. Checked is the date the source was last read.

- [SPIFFE overview](https://raw.githubusercontent.com/spiffe/spiffe/main/standards/SPIFFE.md): Stable, main at f97c46d (2026-09-26), checked 2026-10-05.
- [The SPIFFE Identity and Verifiable Identity Document](https://raw.githubusercontent.com/spiffe/spiffe/main/standards/SPIFFE-ID.md): Stable, main at f97c46d (2026-09-26), checked 2026-10-05.
- [The X.509 SPIFFE Verifiable Identity Document](https://raw.githubusercontent.com/spiffe/spiffe/main/standards/X509-SVID.md): Stable, main at f97c46d (2026-09-26), checked 2026-10-05.
- [The JWT SPIFFE Verifiable Identity Document](https://raw.githubusercontent.com/spiffe/spiffe/main/standards/JWT-SVID.md): Stable, main at f97c46d (2026-09-26), checked 2026-10-05.
- [The SPIFFE Trust Domain and Bundle](https://raw.githubusercontent.com/spiffe/spiffe/main/standards/SPIFFE_Trust_Domain_and_Bundle.md): Stable, main at f97c46d (2026-09-26), checked 2026-10-05.
- [The SPIFFE Workload API](https://raw.githubusercontent.com/spiffe/spiffe/main/standards/SPIFFE_Workload_API.md): Stable (§7 WIT-SVID Profile Incubating), main at f97c46d (2026-09-26), checked 2026-10-05.
- [The SPIFFE Workload Endpoint](https://raw.githubusercontent.com/spiffe/spiffe/main/standards/SPIFFE_Workload_Endpoint.md): Stable, main at f97c46d (2026-09-26), checked 2026-10-05.
- [SPIFFE Federation](https://raw.githubusercontent.com/spiffe/spiffe/main/standards/SPIFFE_Federation.md): Stable, main at f97c46d (2026-09-26), checked 2026-10-05.
- [The WIT SPIFFE Verifiable Identity Document](https://raw.githubusercontent.com/spiffe/spiffe/main/standards/WIT-SVID.md): Incubating, main at f97c46d (2026-09-26); Draft posture: track, checked 2026-10-05.
- [SPIFFE Specification Stability](https://raw.githubusercontent.com/spiffe/spiffe/main/standards/STABILITY.md): Process document, main at f97c46d (2026-09-26), checked 2026-10-05.
- [The SPIFFE Broker API](https://raw.githubusercontent.com/spiffe/spiffe/main/standards/SPIFFE_Broker_API.md): Incubating, main at f97c46d (2026-09-26); Draft posture: track, checked 2026-10-05.
- [The SPIFFE Broker Endpoint](https://raw.githubusercontent.com/spiffe/spiffe/main/standards/SPIFFE_Broker_Endpoint.md): Incubating, main at f97c46d (2026-09-26); Draft posture: track, checked 2026-10-05.
- [spiffe/spiffe commit history](https://github.com/spiffe/spiffe/commits/main/standards): Repository history, main at f97c46d (2026-09-26), no tags or releases, checked 2026-10-05.
- [SPIRE v1.15.3](https://github.com/spiffe/spire/releases/tag/v1.15.3): Released (latest), v1.15.3 (2026-08-21), checked 2026-10-05.
- [SPIRE Concepts](https://spiffe.io/docs/latest/spire-about/spire-concepts/): Documentation, spiffe.io docs latest, checked 2026-10-02.
- [Deploying a Federated SPIRE Architecture](https://spiffe.io/docs/latest/architecture/federation/readme/): Documentation, spiffe.io docs latest (written against SPIRE 1.11.2), checked 2026-10-02.
- [Working with SVIDs](https://spiffe.io/docs/latest/deploying/svids/): Documentation, spiffe.io docs latest, checked 2026-10-02.
- [draft-ietf-wimse-arch-08: Workload Identity in a Multi System Environment (WIMSE) Architecture](https://www.ietf.org/archive/id/draft-ietf-wimse-arch-08.txt): WG draft (Informational), -08 (6 July 2026); Draft posture: name, checked 2026-10-05.
- [draft-ietf-wimse-identifier-03: Workload Identifier](https://www.ietf.org/archive/id/draft-ietf-wimse-identifier-03.txt): WG draft (Standards Track), -03 (6 July 2026); Draft posture: name, checked 2026-10-05.
- [draft-ietf-wimse-workload-creds-02: WIMSE Workload Credentials](https://www.ietf.org/archive/id/draft-ietf-wimse-workload-creds-02.txt): WG draft (Standards Track), -02 (2 July 2026); Draft posture: name, checked 2026-10-05.
- [draft-ietf-oauth-spiffe-client-auth-02: OAuth SPIFFE Client Authentication](https://www.ietf.org/archive/id/draft-ietf-oauth-spiffe-client-auth-02.txt): WG draft (Standards Track), -02 (15 June 2026); Draft posture: build (JWT-SVID and X.509-SVID methods), track (WIT-SVID method), checked 2026-10-05.
