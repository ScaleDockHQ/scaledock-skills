# Workload identity practices and AI agents

Read this when delivering credentials to workloads on a platform (Kubernetes, SPIFFE, cloud, CI-CD, service mesh), federating platform credentials to an OAuth identity provider, or giving AI agents a workload identity. Sources: `draft-ietf-wimse-workload-identity-practices-07` (`practices`, Informational, with the IESG, posture build) and `draft-ietf-wimse-aims-00` (`aims`, Informational, posture track).

## The generic pattern (practices § 1)

1. The platform verifies the workload and issues it a credential, pushed or pulled, often a JWT. A workload may get several, each with its own audience and lifetime.
2. A) The credential gives direct access to platform resources, or
3. B1) the workload federates: it presents the credential to an identity provider, which issues a new credential such as an OAuth access token; B2) it uses that credential outside the platform.

The standard federation mechanisms are the OAuth assertion framework (RFC 7521) and JWT client authentication and grants (rfc7523bis); token exchange or custom APIs for this are discouraged as non-interoperable (practices Appendix A.2). A resource server that trusts the platform issuer directly can accept the platform credential (practices Appendix A.1).

## Delivery patterns (practices § 3, § 5.1)

| Pattern               | Rules                                                                                                                                                                                                                                                                                                                                                    |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Filesystem            | Renew before expiry. Writes SHOULD be atomic (write a temp file and rename). Access control MUST limit reads to authorized applications (DAC or MAC). Prefer memory-backed mounts, since durable storage leaks into backups and images (§ 3.1, § 5.1.2).                                                                                                 |
| Local API             | UNIX socket, loopback or link-local metadata address. Often cleartext. MUST mitigate SSRF (for example a header that cannot be set externally; no untrusted input reaching link-local IPs, including via redirects). Identify the caller precisely (process-scoped, not IP). Rate-limit when one API serves several workloads (SHOULD) (§ 3.2, § 5.1.3). |
| Environment variables | Leak through logs, process inspection and error reports, and are static. MUST NOT be used for workload identity credentials in production when the platform offers filesystem or local API delivery (§ 3.3, § 5.1.4).                                                                                                                                    |

Across all patterns, implementations MUST assume application bugs can expose credentials: credential locations are security boundaries, untrusted input MUST NOT influence how credential files are read or local APIs called, and proof-of-possession credentials are preferred over bearer tokens (§ 5.1.5).

## Credential rules (practices § 5)

1. **Scope narrowly** (§ 5.1.1): each credential MUST carry the smallest set of audiences for its purpose. A credential for a platform resource is scoped to that resource; one for federation MUST carry that identity provider as its sole audience. Where the platform cannot do this, compensate with short lifetimes and restricted access, and treat every recipient as able to impersonate the workload elsewhere.
2. **One audience per JWT** (§ 5.7): JWTs MUST have `aud` and MUST NOT carry more than one audience unless the platform prevents it; URIs are recommended. Platform API tokens (for example Kubernetes) MUST NOT be used beyond the platform API, and a token used elsewhere MUST NOT name the platform API server in `aud`.
3. **Explicit typing** (§ 5.2): issuers SHOULD set JOSE `typ`, and identity providers SHOULD validate it. For authorization grants, SHOULD use `authorization-grant+jwt`; generic `JWT` or `JOSE` only when infrastructure cannot do better, with extra claim checks.
4. **Evaluate context claims** (§ 5.3): authorization servers MUST evaluate the claims their decision depends on, such as the Git branch of a CI job; presence is not enough.
5. **Lifetime** (§ 5.4): tokens MUST NOT outlive the workload instance, unless the platform cannot know it; then as short as possible. Short-lived federation credentials are RECOMMENDED.
6. **Invalidation** (§ 5.5): issuers MUST invalidate credentials when an instance stops, pauses or ends, unless lifetimes are short enough; where not immediate, they SHOULD offer a status query. This applies per instance.
7. **Proof of possession** (§ 5.6): credentials SHOULD be bound to the instance and proven when used. X.509 has it inherently; JWTs SHOULD be key-bound (the WIT with a WPT or HTTP signature is the WIMSE way). Without it, deployments MUST compensate with shorter lifetimes, tighter audiences and network controls such as mTLS or IP allowlists.
8. **Multi-tenancy** (§ 5.8): relying parties MUST NOT grant access on untrusted or forgeable attributes; `iss` may be shared across tenants, so attributes MUST be bound to a trust domain the relying party controls or trusts.

All of RFC 7521 § 8 security considerations apply (§ 5).

## Platforms (practices § 4)

- **Kubernetes** (§ 4.1): service account JWTs, projected into the filesystem or from the TokenRequest API, each with its own audience and lifetime, optionally bound to an object's lifecycle (detected only through TokenReview). Validate with TokenReview, mounted signing keys, or a published JWK Set. Tokens for the API server, in-cluster resources and federation MUST be different tokens with different audiences, because they are bearer tokens.
- **SPIFFE** (§ 4.2): the Workload API identifies callers from the environment without a pre-existing secret and returns X509-SVIDs (SPIFFE ID in the URI SAN) or JWT-SVIDs (SPIFFE ID in `sub`). Trust bundles per trust domain are JWK sets with `use` `x509-svid` or `jwt-svid`. A JWT-SVID used to federate MUST differ from, and have a different audience than, one used inside the trust domain.
- **Cloud providers** (§ 4.3): instance metadata endpoints (for example 169.254.169.254) issue credentials, often bearer. Separate credentials MUST be obtained for platform access and for federation to an external STS, each scoped to its audience; the same bearer credential MUST NOT cross trust domains without controls.
- **CI-CD** (§ 4.4): pipelines receive a platform token with claims such as branch and trigger, federate to identity providers, and may get several tokens with distinct audiences.
- **Service meshes** (§ 4.5): the mesh issues X.509 credentials to sidecars, which authenticate to each other with mTLS on behalf of the workloads; sidecars may be per workload or shared per node. This is the layered case of arch § 3.4.3: the mTLS identity may be the proxy's.

## AIMS: AI agent identity (posture track)

`draft-ietf-wimse-aims-00` was adopted in September 2026 and replaces `draft-klrc-aiagent-auth`. It defines no protocol; it composes WIMSE, SPIFFE, OAuth and OpenID Shared Signals for agents (aims § 1, § 2, § 4). Use it for design direction; implement against the protocol drafts and OAuth specifications it cites, not against AIMS.

What it says today:

- **Agents are workloads** that loop between an LLM and tools, services and resources, acting for a user, a system or themselves (aims § 4).
- **AIMS** is a conceptual stack: identifier, credentials, provisioning, authentication, authorization, monitoring and remediation, plus policy and compliance (aims § 5).
- **Identifier**: an agent MUST be assigned exactly one WIMSE identifier, which MAY be a SPIFFE ID (aims § 6).
- **Credentials**: MUST be cryptographically bound to the identifier, MUST expire, SHOULD be short-lived; WIT, WIC, X.509-SVID, WIT-SVID or JWT-SVID. Static API keys are an antipattern. Secondary credentials for legacy systems come from exchanging the primary one (aims § 7).
- **Provisioning** is where posture is assessed; the LLM MUST NOT have access to the agent's credentials or tool credentials, to resist prompt injection (aims § 8).
- **Authentication**: mTLS, WPT or WIMSE HTTP signatures; application-layer authentication MUST consider relay and replay (aims § 9). Its descriptions of the WPT header and of `@request-target` predate wpt-02 and http-signature-07; follow those drafts.
- **Authorization**: OAuth. The agent is the OAuth client, authenticating with its workload credentials (RFC 7523, RFC 8705 mTLS, or SPIFFE client authentication) rather than static secrets; authorization code for user delegation, client credentials or JWT grant for its own access; transaction tokens inside a resource server; identity chaining across domains; step-up via CIBA for human approval, where the agent MUST NOT treat local UI confirmation alone as authorization; tools forwarding the agent's access tokens to services is an anti-pattern, use transaction tokens instead (aims § 10).
- **Monitoring**: participants MAY subscribe to OpenID Shared Signals (CAEP, RISC); revoked or downgraded authorization MUST be enforced without undue delay, and invalidated cached decisions and tokens MUST NOT be used. Deployments MUST produce durable, tamper-evident audit logs of authorization decisions and remediations, recording at least the authenticated agent identifier, delegated subject, resource or tool, action and decision, timestamp and correlation id, posture or risk state, and remediation events with their cause (aims § 11).
