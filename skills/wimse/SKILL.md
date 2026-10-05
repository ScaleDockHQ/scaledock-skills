---
name: wimse
description: >-
  WIMSE workload identity drafts: authenticate service-to-service calls with WIT, WPT, HTTP signatures or mTLS. Lines, all IETF working group drafts with no RFC yet: draft-ietf-wimse-arch-08 (name), identifier-03, workload-creds-02, wpt-02, http-signature-07, mutual-tls-02 and workload-identity-practices-07 (build), and aims-00 (track), with upgrades from s2s-protocol-07, wpt-01 and http-signature-06. Use when designing or reviewing workload-to-workload authentication across trust domains: wimse:// or spiffe:// workload identifiers and trust domains, the Workload Identity Token (wit+jwt, Workload-Identity-Token header, cnf.jwk), the Workload Proof Token (Authorization: WPT, wpt+jwt, wth, tth, oth), RFC 9421 signatures with tag wimse-workload-to-workload and wimse-aud, Workload Identity Certificates with one URI SAN over mutual TLS, platform credential delivery (Kubernetes, SPIFFE, cloud metadata, CI-CD) and audience scoping, or identity for AI agents. Relates WIMSE to SPIFFE SVIDs and OAuth.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.0"
  kind: standard
---

# WIMSE: Workload Identity in Multi-System Environments

WIMSE is an IETF working group that defines how software workloads (services, containers, functions, agents) are named, get credentials, and authenticate to each other across platforms and trust domains, building on OAuth, JWT and SPIFFE (charter). Its documents are all Internet-Drafts: an architecture, a Workload Identifier URI, two credentials (the JWT Workload Identity Token and the X.509 Workload Identity Certificate), three ways to prove possession of their keys (Workload Proof Token, HTTP Message Signatures, mutual TLS), platform credential practices, and an AI agent profile. With this skill the agent designs and reviews service-to-service authentication with them.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources), with the section it cites. Section numbers are prefixed with the draft they come from: `arch`, `id` (identifier), `creds` (workload-creds), `wpt`, `httpsig` (http-signature), `mtls` (mutual-tls), `practices` (workload-identity-practices) and `aims`. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

Draft posture: every document is a working group draft and may still change on the wire. The protocol drafts and the practices draft are **build** (implement them, pinned to the revision); the architecture is **name** (use its terms and components); AIMS is **track** (read it, build nothing that depends on it yet).

## Inputs (fill in, or ask before starting)

- Role: Identity Server (credential issuer), calling workload, called workload (verifier and Policy Enforcement Point), gateway or identity proxy, or platform operator delivering credentials.
- Binding: mutual TLS with a Workload Identity Certificate, WIT plus Workload Proof Token, or WIT plus HTTP Message Signatures. Layered combinations are allowed (arch § 3.4.3).
- Identifier scheme: `spiffe` when SPIFFE runs the platform, otherwise `wimse` or another scheme that meets the identifier rules (creds § 5.1, id § 4.1).
- Context tokens on the call: none, a Txn-Token, or another end-user or authorization token in its own header field (wpt § 2, § 2.2).
- Target version: one current line per draft. draft-ietf-wimse-arch-08 (name), draft-ietf-wimse-identifier-03, draft-ietf-wimse-workload-creds-02, draft-ietf-wimse-wpt-02, draft-ietf-wimse-http-signature-07, draft-ietf-wimse-mutual-tls-02 and draft-ietf-wimse-workload-identity-practices-07 (build), draft-ietf-wimse-aims-00 (track). draft-ietf-wimse-s2s-protocol-07, draft-ietf-wimse-wpt-01 and earlier, and draft-ietf-wimse-http-signature-06 and earlier are legacy: read them and upgrade from them, never build on them. See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill or when a rule looks out of date, re-read every URL in [Sources](#sources), list the WG documents on the datatracker for new revisions, new adoptions, replacements or RFC numbers, and update the pins.

## Invariants

1. **A Workload Identifier is an absolute URI whose authority is the trust domain**, with no query, fragment, user information or port; implementations accept at least 2048 bytes (id § 4.1). It is compared and authorized as the complete URI (id § 4.3), never as a path without its trust domain (creds § 7, mtls § 5).
2. **An identifier is authenticated only when it comes out of a validated credential.** A plain string in a request is not authenticated (id § 7.2), and application-layer assertions never override the identity mutual TLS established (mtls § 5).
3. **One identifier per credential.** The WIT carries it in `sub`; the WIC carries it in exactly one URI SubjectAltName (creds § 4, § 6.1).
4. **Trust anchors come from out-of-band configuration per trust domain.** Consumers bind each trust domain to authorized issuers and their keys; they never fetch keys from a location named only in the token's `iss`, and if `iss` drives key distribution they enforce an issuer allowlist (creds § 3, § 9.1). The trust domain in the identifier must be an expected one (id § 7.3, mtls § 3.2).
5. **The WIT is a key-bound JWT, never a bearer token.** JOSE header `typ` `wit+jwt` and an asymmetric `alg` (not `none`); claims `sub`, `exp` and `cnf.jwk` with an `alg` member, which fixes the proof algorithm; ES256 must be supported by general-purpose implementations; it travels in the `Workload-Identity-Token` header field, not in `Authorization` (creds § 5.1, § 5.1.1).
6. **Every presentation of a WIT carries a proof of possession** (WPT or HTTP signature) that is time-limited and rejected outside its validity (creds § 9.2, § 9.2.2), sent over server-authenticated TLS (creds § 9.5). The recipient validates the WIT before the proof (wpt § 2, httpsig § 3).
7. **WPT shape** (wpt § 2): `Authorization: WPT <jwt>`, `typ` `wpt+jwt`, `alg` string-equal to the WIT's `cnf.jwk.alg`, `aud` = target URI without query or fragment, short `exp`, a `jti` with about 128 random bits, `wth` = base64url SHA-256 of the WIT, and `tth` or `oth` whenever a Txn-Token or other context token is in the request. Unknown `oth` entries reject the WPT; tokens not covered by `oth` are not used for authorization.
8. **No bearer token beside a WPT.** A request has one `Authorization` field, and a recipient never uses a bearer token in a WIT+WPT request to authenticate or authorize the caller (wpt § 2.2).
9. **Audience is checked against trusted configuration**, never against `Host` or `X-Forwarded-Host` (wpt § 3.1.7, httpsig § 3.2).
10. **HTTP signature profile** (httpsig § 3): cover `@method`, `@path` and `@query`, plus `Content-Type`, `Content-Digest`, `Authorization`, `Txn-Token` and `Workload-Identity-Token` when present; send `Content-Digest` whenever there is a body; set `created`, short `expires`, `nonce`, `tag="wimse-workload-to-workload"` and, on requests, `wimse-aud`; never `keyid` or `alg`. Recipients find the signature by tag, not label, and reject a message with two such signatures.
11. **Mutual TLS validates chain, trust domain and identifier.** Servers that authorize by client identity require a client certificate; both sides validate the peer chain against the trust anchors of the peer's trust domain and check that trust domain; clients that connect by DNS name also perform RFC 9525 server identity checks (mtls § 3.2, § 3.2.1, § 5).
12. **Authentication is not authorization**, and an intermediary's transport-layer identity is not the caller's application-layer identity unless protocol or policy says so (arch § 4.5, § 3.4.3).
13. **Keys and secrets stay private.** The credential's private key is bound to one identifier and not used after expiry (creds § 9.4); raw WPTs and bearer tokens are not logged (wpt § 3.1.5, arch § 3.4.5).

## Workflow

1. **Pick the versions.** Record the current line of each draft you use. If code sends `Workload-Proof-Token`, signs `@request-target`, or cites `draft-ietf-wimse-s2s-protocol`, plan the upgrade (step 9).
   -> [`references/versions.md`](references/versions.md)
   ✓ Each draft in use is pinned to its current revision, and nothing depends on AIMS (track).
2. **Define trust domains and identifiers.** Name each trust domain (an FQDN you own), choose the scheme, decide what the path means and at what granularity (service, instance), and configure the mapping from the network handle (DNS name, ingress path) to the expected identifier.
   -> [`references/architecture-and-identifiers.md`](references/architecture-and-identifiers.md)
   ✓ Every identifier passes the id § 4.1 checks, and every callee's expected identifier is configured, not derived from the network (id § 5).
3. **Provision credentials.** Deliver WITs, WICs or platform tokens by local API or memory-backed file rather than environment variables, scoped to one audience each, with lifetimes no longer than the workload.
   -> [`references/practices.md`](references/practices.md)
   ✓ No credential is reachable through untrusted input (SSRF, path traversal), and no platform token is reused across audiences (practices § 5.1, § 5.7).
4. **Choose the binding.** Use mutual TLS when the TLS connection runs end to end between the workloads; use WIT with HTTP signatures or WPT when TLS is terminated on the way; combine them when a proxy needs its own authentication.
   -> [`references/http-signature-and-mtls.md`](references/http-signature-and-mtls.md), [`references/tokens.md`](references/tokens.md)
   ✓ The choice is recorded per hop, with who terminates TLS (arch § 3.4.3, § 4.1).
5. **Issue the credential.** Build the WIT (header, claims, `cnf.jwk.alg`) or the WIC (one URI SAN, DNS SANs for host-name clients, EKUs).
   -> [`references/tokens.md`](references/tokens.md), [`references/http-signature-and-mtls.md`](references/http-signature-and-mtls.md)
   ✓ A WIT decodes to `typ` `wit+jwt` with `sub`, `exp` and `cnf.jwk.alg`; a WIC has exactly one URI SAN.
6. **Caller: prove possession.** Attach the WIT and a fresh WPT or HTTP signature per request, binding any Txn-Token.
   -> [`references/tokens.md`](references/tokens.md), [`references/http-signature-and-mtls.md`](references/http-signature-and-mtls.md)
   ✓ The proof uses the WIT's key and algorithm, carries the callee's audience and expires within minutes.
7. **Callee: validate.** Validate the WIT against the trust domain's anchors, then the proof, then extract the identifier; return the error the binding prescribes (WPT: 401 with `WWW-Authenticate: WPT`; HTTP signatures: 400).
   -> [`references/tokens.md`](references/tokens.md), [`references/http-signature-and-mtls.md`](references/http-signature-and-mtls.md)
   ✓ Every check in the binding's validation list runs before the request is processed (httpsig § 3, wpt § 2).
8. **Authorize, audit and propagate context.** Authorize the full identifier together with any Txn-Token context; log both transport and application identities without secrets; for AI agents, follow the AIMS profile as guidance only.
   -> [`references/architecture-and-identifiers.md`](references/architecture-and-identifiers.md), [`references/practices.md`](references/practices.md)
   ✓ A denied request still leaves an audit record (arch § 3.4.5).
9. **Upgrade** (only when asked). Follow the checklist from the legacy line to the current one.
   -> [`references/versions.md`](references/versions.md)
   ✓ The upgraded caller and callee interoperate on the current revisions, and no legacy header field or covered component remains.

## Verify before done

- [ ] Every identifier is an absolute URI with a trust-domain authority and no query, fragment, userinfo or port (id § 4.1).
- [ ] Trust anchors are configured per trust domain out of band; no key is fetched from a URL found only in a token (creds § 3).
- [ ] WITs have `typ` `wit+jwt`, an asymmetric `alg`, `sub`, `exp` and `cnf.jwk.alg`, and are never accepted without a proof (creds § 5.1, § 9.2).
- [ ] WPTs ride in `Authorization: WPT`, match the WIT's `cnf.jwk.alg`, and carry `aud`, `exp`, `jti` and `wth`, plus `tth` or `oth` when context tokens are present (wpt § 2).
- [ ] HTTP signatures cover `@method`, `@path`, `@query`, the WIT and the present headers listed in httpsig § 3, use the `wimse-workload-to-workload` tag and `wimse-aud`, and omit `keyid` and `alg`.
- [ ] Audience checks use configured values, never `Host` or `X-Forwarded-Host` (wpt § 3.1.7, httpsig § 3.2).
- [ ] mTLS servers require client certificates and check chain, trust domain and identifier (mtls § 3.2, § 5).
- [ ] Authorization uses the full authenticated identifier; layered identities are recorded separately (arch § 3.4.3, § 4.5).
- [ ] Nothing depends on AIMS (`aims-00`, posture track) or on a legacy line.

## Reference index

- **`references/versions.md`**: every draft's version line with status, revision and posture, which to use, what changed, upgrades from s2s-protocol-07, wpt-01 and http-signature-06, and the AIMS posture. Load for steps 1 and 9.
- **`references/architecture-and-identifiers.md`**: terms, trust domains, the Workload Identifier and `wimse` URI scheme, scenarios, layered authentication, authorization and audit, and how WIMSE maps to SPIFFE and OAuth. Load for steps 2 and 8.
- **`references/tokens.md`**: the WIT (claims, header field, trust anchors, errors, bearer coexistence) and the WPT (claims, validation list, 401 challenge, context-token binding), with examples. Load for steps 5 to 7.
- **`references/http-signature-and-mtls.md`**: the RFC 9421 profile (components, parameters, response signing, errors) and the mutual TLS binding with the Workload Identity Certificate, plus how to choose between bindings. Load for steps 4 to 7.
- **`references/practices.md`**: platform credential delivery and the practices draft's MUSTs, and the AIMS agent profile. Load for steps 3 and 8.

## Related skills

- `spiffe` for SPIFFE IDs, X.509-SVIDs, JWT-SVIDs, trust bundles and the Workload API: `npx skills add ScaleDockHQ/scaledock-skills --skill spiffe`.
- `oauth` for token exchange, transaction tokens, mTLS-bound tokens and client authentication: `npx skills add ScaleDockHQ/scaledock-skills --skill oauth`.
- `jwt` for JWS validation, `typ`, `cnf` and algorithm choice: `npx skills add ScaleDockHQ/scaledock-skills --skill jwt`.
- `http-message-signatures` for RFC 9421 itself: `npx skills add ScaleDockHQ/scaledock-skills --skill http-message-signatures`.

## Sources

Status uses the publishing body's own maturity term. Checked is the date the source was last read.

- [wimse working group charter](https://datatracker.ietf.org/wg/wimse/about/): active working group, charter with milestones, checked 2026-10-05.
- [wimse working group documents](https://datatracker.ietf.org/wg/wimse/documents/): datatracker index, 7 active WG drafts and 1 with the IESG, no RFCs, checked 2026-10-05.
- [draft-ietf-wimse-arch-08](https://www.ietf.org/archive/id/draft-ietf-wimse-arch-08.txt): WG draft (Informational), -08 (6 July 2026), checked 2026-10-05.
- [draft-ietf-wimse-identifier-03](https://www.ietf.org/archive/id/draft-ietf-wimse-identifier-03.txt): WG draft (Standards Track), -03 (6 July 2026), checked 2026-10-05.
- [draft-ietf-wimse-workload-creds-02](https://www.ietf.org/archive/id/draft-ietf-wimse-workload-creds-02.txt): WG draft (Standards Track), -02 (2 July 2026), checked 2026-10-05.
- [draft-ietf-wimse-wpt-02](https://www.ietf.org/archive/id/draft-ietf-wimse-wpt-02.txt): WG draft (Standards Track), -02 (27 August 2026), checked 2026-10-05.
- [draft-ietf-wimse-http-signature-07](https://www.ietf.org/archive/id/draft-ietf-wimse-http-signature-07.txt): WG draft (Standards Track), -07 (20 September 2026), checked 2026-10-05.
- [draft-ietf-wimse-mutual-tls-02](https://www.ietf.org/archive/id/draft-ietf-wimse-mutual-tls-02.txt): WG draft (Standards Track), -02 (6 July 2026), checked 2026-10-05.
- [draft-ietf-wimse-workload-identity-practices-07](https://www.ietf.org/archive/id/draft-ietf-wimse-workload-identity-practices-07.txt): WG draft (Informational), -07 (22 September 2026), checked 2026-10-05.
- [draft-ietf-wimse-workload-identity-practices datatracker page](https://datatracker.ietf.org/doc/draft-ietf-wimse-workload-identity-practices/): Submitted to IESG for Publication, AD Evaluation::AD Followup, checked 2026-10-05.
- [draft-ietf-wimse-aims-00](https://www.ietf.org/archive/id/draft-ietf-wimse-aims-00.txt): WG draft (Informational), -00 (15 September 2026), checked 2026-10-05.
- [draft-ietf-wimse-aims datatracker page](https://datatracker.ietf.org/doc/draft-ietf-wimse-aims/): WG Document, replaces draft-klrc-aiagent-auth, checked 2026-10-05.
- [draft-ietf-wimse-s2s-protocol datatracker page](https://datatracker.ietf.org/doc/draft-ietf-wimse-s2s-protocol/): Replaced by workload-creds, wpt, http-signature and mutual-tls, checked 2026-10-05.
- [draft-ietf-wimse-s2s-protocol-07](https://www.ietf.org/archive/id/draft-ietf-wimse-s2s-protocol-07.txt): replaced WG draft, -07 (16 October 2025), checked 2026-10-05.
- [draft-ietf-wimse-wpt-01](https://www.ietf.org/archive/id/draft-ietf-wimse-wpt-01.txt): superseded revision, -01 (2 March 2026), checked 2026-10-05.
- [draft-ietf-wimse-http-signature-06](https://www.ietf.org/archive/id/draft-ietf-wimse-http-signature-06.txt): superseded revision, -06 (4 August 2026), checked 2026-10-05.
- [RFC 9421: HTTP Message Signatures](https://www.rfc-editor.org/rfc/rfc9421): RFC (Standards Track), February 2024, checked 2026-10-05.
- [RFC 8705: OAuth 2.0 Mutual-TLS Client Authentication and Certificate-Bound Access Tokens](https://www.rfc-editor.org/rfc/rfc8705): RFC (Standards Track), February 2020, checked 2026-10-05.
