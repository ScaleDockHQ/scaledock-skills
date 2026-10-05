# Architecture and identifiers

Read this when naming workloads and trust domains, laying out who issues credentials and who enforces policy, deciding where authentication happens in a path with proxies, or explaining how WIMSE relates to SPIFFE and OAuth. Sources: `draft-ietf-wimse-arch-08` (`arch`, posture name), `draft-ietf-wimse-identifier-03` (`id`, posture build), `draft-ietf-wimse-workload-creds-02` (`creds`), the charter, and RFC 8705.

## Terms (arch § 2, id § 3)

- **Workload**: an independently addressable and executable software entity; a logical entity that may run as one or more **workload instances** (a container, VM or serverless invocation, lasting from a fraction of a second to years).
- **Service**: a function or API exposed to others, implemented by one or more workloads; it can have a stable identity distinct from any instance.
- **Trust domain**: a logical grouping of systems that share security controls and policies. Credentials are issued under its authority (arch § 3.1.1).
- **Workload Identifier**: the URI that names a workload within a trust domain (id § 3, § 4).
- **Workload identity credential**: a credential carrying a Workload Identifier, normally bound to a key with proof of possession; the WIT and the Workload Identity Certificate are the WIMSE ones. Bearer tokens may be used to interoperate with legacy systems (arch § 2).
- **Security context**: information about the request, such as the user, software or processing so far, used for authorization and audit (arch § 2).
- **Identity proxy**: an intermediary (security gateway, ingress, CDN) that may inspect, replace or augment identity and context, for example as a transaction token (arch § 2).
- **Issuer** and **consumer**: the entity a trust domain authorizes to assign identifiers, and the entity that verifies or uses one (id § 3).

## Trust domains (arch § 3.1.1, id § 4.3)

- Identify a trust domain by an FQDN the organization owns (SHOULD). IP addresses MUST NOT represent trust domains except for legacy naming compatibility (id § 4.3).
- A trust domain maps to trust anchors for X.509 and a way to obtain a JWK Set for WITs; that mapping MUST come through a secure mechanism (arch § 3.1.1), out of band (creds § 3).
- One organization may run several trust domains. Identifiers that differ only in trust domain are different entities (arch § 3.1.1), and the same identifier value means the same workload only under the same trust configuration (arch § 3.1.2).

## Workload Identifier (id § 4)

Rules:

1. An absolute URI (RFC 3986 § 4.3) with a non-empty authority that names the trust domain (§ 4.1).
2. MUST NOT contain a query, fragment, user information or port (§ 4.1).
3. Implementations MUST handle at least 2048 bytes; identifiers SHOULD NOT exceed 2048 bytes (§ 4.1), and parsers guard against oversized input (§ 7.1).
4. The scheme is open: `spiffe` (SPIFFE-ID), `wimse` (§ 4.4) or another scheme that adds its own syntax without contradicting these rules (§ 4.1). The path is deployment-specific; it can be opaque or structured, and the issuer decides granularity (§ 4.2).
5. Consumers MUST compare and authorize using the complete URI (§ 4.3), with a standards-compliant URI parser (§ 7.1). Wildcard or prefix matching SHOULD NOT be used unless policy says so (§ 7.6).
6. Issuers MUST keep identifiers unique in their trust domain (§ 4.3) and SHOULD NOT reassign one to a different workload (§ 4.5, § 7.4). Several instances MAY share an identifier when they are the same logical workload (§ 4.2, § 4.5).
7. An identifier is authenticated only when it comes from a cryptographically verified credential (§ 7.2), and its trust domain MUST match an expected or trusted one (§ 7.3).

Examples from id § 4.1, § 4.2 and § 4.4:

```text
spiffe://incubation.example.org/ns/experimental/analytics/ingest
spiffe://prod.trust.domain/ns/prod-01/sa/foo-service
wimse://trust.example.com/service/payment
wimse://trust.example.com/service/payment/instance/1234
```

A **Workload Identifier Origin** is the scheme plus trust domain without the path, for example `wimse://trust.corp.example.com`, used as a hint about which identifiers may appear without revealing a specific one (§ 4.6).

**Mapping from the network.** The identifier does not say how to reach a workload. Implementations MUST support a deployment-defined mapping from the external handle (DNS name, service name, ingress path) to the expected identifier, and consumers MUST NOT derive the identifier from IP, DNS name or path without it (id § 5, creds § 1.3). Without this mapping, a client can only check that a peer belongs to the trust domain, not that it is the intended workload (creds § 1.3).

**Disclosure.** Descriptive paths can leak topology; keep sensitive naming out of externally visible identifiers (id § 7.5). At the trust boundary an identity proxy can generalize an instance identifier to its service identifier (arch § 3.4.10.1).

## Components and flow (arch § 3.2, § 3.3, creds § 1.2)

The basic scenario has a trust domain with a gateway, a CA or credential service, and workloads. The per-hop flow:

1. Each workload obtains a credential from the credential service, on a slower cycle than requests (hours).
2. A transport connection is set up, possibly mutual TLS with Workload Identity Certificates.
3. The caller sends the request, possibly with a WIT and proof of possession; the callee authenticates the caller.
4. The callee's Policy Enforcement Point authorizes the request, optionally asking a Policy Decision Point.
5. The callee responds.

Authentication happens at step 2, step 3 or both, depending on the binding (arch § 3.3).

**Context propagation** (arch § 3.2.2): the gateway exchanges the external credential (for example an OAuth access token) for an internal context token, such as a transaction token, and forwards that, not the access token. Workloads pass the context along and deny requests that need context they did not receive.

**Cross-domain** (arch § 3.2.3): to call an external service, a workload authenticates to a token service with its workload credential and context, receives a token usable at the external token service, and trades that for an access token, following OAuth identity and authorization chaining. Direct access with the workload credential is possible where trust is established.

## Layered authentication (arch § 3.4.3)

A workload can authenticate to a proxy or sidecar with mutual TLS and to the destination with a WIT and proof of possession. The two identities can differ (instance or sidecar versus logical service), with different trust anchors and policies.

- A destination workload MUST NOT assume a transport-layer identity authenticated by an intermediary equals the application-layer caller, unless protocol or policy establishes it.
- Audit records SHOULD record both identities when both are available.
- If intermediaries may inspect, replace or augment identity or context, that must be explicit and auditable.

TLS terminated in middleboxes only protects each adjacent pair of TLS endpoints (arch § 4.1); this is why the application-layer bindings exist.

## Bootstrapping (arch § 3.4.1)

Credentials arrive by direct provisioning, by bootstrap credentials used to enrol (possibly with a workload-generated key pair), by attestation (RATS, RFC 9334, or SPIRE-style node and workload attestation), or through a node agent. Local delivery is via filesystem, local API (a UNIX socket as in SPIFFE, or a cloud metadata server) or environment variables; see [`practices.md`](practices.md) for the rules on each.

## Authorization and audit (arch § 3.4.4, § 3.4.5, § 4.5)

- Authentication proves key control and issuer authority; it does not grant access. Make a separate decision from the authenticated identity, the operation, policy and context, and never treat a valid credential as access to the whole trust domain (§ 4.5).
- The callee usually authorizes; the caller MAY authorize when the decision is too application-specific for the callee (§ 3.4.4).
- Each authenticated request MUST leave a verifiable trace, whatever the decision (§ 3.4.5). Records can include time, source and target identifiers, method, outcome, context claims and delegation metadata.
- Audit logs MUST NOT contain bearer tokens, private keys or passwords; redact or hash credential data if needed. Logs SHOULD be tamper-evident (§ 3.4.5).

## Delegation, async work and AI intermediaries (arch § 3.4.7 to § 3.4.11)

- To act on behalf of another principal, a workload authenticates to a token service (OAuth token exchange) and receives an authorization or context token, which may be bound to its workload identity (§ 3.4.7, § 4.3).
- Asynchronous or batch work that outlives the source credentials gets down-scoped credentials naming the acting workload as actor, bound to its WIT or certificate (§ 3.4.9).
- AI agents are delegated workloads. They SHOULD propagate the upstream context unless authorized to reduce it; autonomous actions MUST be distinguishable from delegated ones; each hop in an agent-to-agent chain MUST scope and re-bind the context (§ 3.4.11). See AIMS in [`practices.md`](practices.md).

## How WIMSE relates to SPIFFE and OAuth

The charter names OAuth, JWT and SPIFFE as the technologies WIMSE combines, and lists CNCF SPIFFE/SPIRE and the OAuth working group as liaisons.

SPIFFE:

- A SPIFFE ID is a conforming Workload Identifier (arch § 3.1.2, id § 4.1). When SPIFFE authenticates workloads it mandates the `spiffe` scheme; `wimse` is for deployments without an environment-specific scheme (creds § 5.1).
- The single identifier per credential matches the single URI in an X.509-SVID (creds § 4). The WIMSE implementation status lists the WIC as fully compatible with the X509-SVID, and SPIFFE's WIT support as beta (creds § 8).
- AIMS summarizes: X.509-SVID is compatible with the WIC, WIT-SVID profiles the WIT, and JWT-SVIDs are short-lived bearer credentials (aims § 7).
- SPIFFE trust bundles per trust domain play the role of WIMSE trust anchors (practices § 4.2, creds § 3).

OAuth:

- The WPT is inspired by DPoP (RFC 9449) (httpsig § 1, Appendix B). Unlike DPoP, it authenticates the calling workload, so it occupies `Authorization` and excludes a bearer token in the same request (wpt § 2.2).
- Transaction tokens carry user and authorization context next to the WIT, bound by `tth` (creds § 5.3, wpt § 2).
- Token exchange and identity chaining are how a workload crosses into another trust domain or acts on behalf of someone (arch § 3.2.3, § 3.4.7).
- Platform credentials are often used as OAuth JWT client assertions or authorization grants (RFC 7521, RFC 7523) to get access tokens; see [`practices.md`](practices.md).
- AIMS lists RFC 8705 mutual-TLS client authentication among the ways an agent authenticates to an authorization server with its workload credentials (aims § 10.4.1). RFC 8705's PKI method matches one expected subject value, and `tls_client_auth_san_uri` names an expected URI SAN, which can be the workload identifier (RFC 8705 § 2.1, § 2.1.2).

Use the `spiffe` and `oauth` skills for those specifications themselves.
