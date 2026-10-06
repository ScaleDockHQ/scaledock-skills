# scaledock-skills

Agent skills for coding agents (Cursor, Claude Code, Codex, and others). Each skill is a folder with a `SKILL.md`. There are two kinds:

- **Spec skills** teach one open specification (OpenAPI, SCIM, A2A, WebMCP, the OpenID Foundation specs, and more). They are named after the spec, stay neutral, and pin the sources they were written from.
- **ScaleDock skills** (`scaledock-*`) are opinionated. They bundle spec skills, add the ScaleDock stack choices, and use [PermDock](https://github.com/ScaleDockHQ/PermDock) for permissions.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills
```

The CLI lists every skill in this repo and asks which ones to install (space to toggle). To skip the picker:

```bash
# See what's available
npx skills add ScaleDockHQ/scaledock-skills --list

# Install one or more skills by name
npx skills add ScaleDockHQ/scaledock-skills --skill scaledock-repo-standard

# Same thing, shorter
npx skills add ScaleDockHQ/scaledock-skills@scaledock-repo-standard
```

Add `-g` to install globally (user level) instead of per project. Run `npx skills update` to pull the latest versions.

ScaleDock skills start with `scaledock-`, so they never collide with a skill from another publisher in your `.agents/skills` folder. Spec skills use the spec's own name; another publisher's skill with the same name covers the same specification ([ADR 0003](docs/decisions/0003-spec-skills-without-prefix.md)).

## Skills

### ScaleDock skills

| Skill                                                                   | Description                                                                                                                                                                                                                                                                 |
| ----------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`scaledock-repo-standard`](skills/scaledock-repo-standard)             | Create a new product, library or tooling repo, or upgrade or align existing ones, to the ScaleDock standard: latest Node on Vercel, pnpm, TypeScript, Next.js or Expo (iOS, Android and web), Supabase with better-supabase, PermDock, oRPC, MCP, CLI, Fumadocs and Vercel. |
| [`scaledock-http-api`](skills/scaledock-http-api)                       | Build or review an HTTP API on Hono and oRPC that follows HTTP Semantics, OpenAPI 3.2, JSON Schema 2020-12, Overlay, Problem Details, RateLimit headers and Standard Schema, with PermDock guarding every procedure and writing the OpenAPI security.                       |
| [`scaledock-mcp-server`](skills/scaledock-mcp-server)                   | Build or harden an MCP server that follows the MCP base protocol and authorization spec, OAuth 2.1, JWT verification and Problem Details, with PermDock deciding every tool call and optional MCP Apps.                                                                     |
| [`scaledock-agent-permissions`](skills/scaledock-agent-permissions)     | Give AI agents least-privilege, auditable access across A2A, MCP, WebMCP, AG-UI, A2UI, AP2, x402, UCP, ACP and Web Bot Auth, with PermDock deciding delegation and approvals, and OpenTelemetry GenAI, OCSF, EU AI Act and NIST AI RMF record-keeping.                      |
| [`scaledock-enterprise-identity`](skills/scaledock-enterprise-identity) | Add OIDC and SAML SSO, passkeys, SCIM provisioning, Shared Signals revocation, NIST 800-63, CIBA, FAPI 2.0 and SPIFFE or WIMSE workload identity, with PermDock turning directory groups and roles into permissions.                                                        |

### Spec skills

Neutral skills, one per specification or family of specifications from one publisher ([ADR 0005](docs/decisions/0005-one-spec-or-family-per-skill.md)). Each pins the sources it was written from in its `metadata.json` and `## Sources` section. Each covers every major version line of its specification: the current default, older lines that are still supported, legacy lines to upgrade from, and a `-preview` line for drafts of the next version. Its `references/versions.md` says which line to use and how to upgrade between them.

#### Agents

| Skill                                                           | Description                                                                                                                                                          |
| --------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`a2a`](skills/a2a)                                             | A2A 1.0: publish Agent Cards and talk agent to agent over JSON-RPC, gRPC and HTTP+JSON, with upgrades from 0.3 and 0.2 and the 1.1 preview.                          |
| [`a2ui`](skills/a2ui)                                           | A2UI v0.9.1: agent-generated UI rendered from a trusted component catalog over A2A, AG-UI or MCP, with v1.0 behind a flag and upgrades from v0.8.                    |
| [`ag-ui`](skills/ag-ui)                                         | AG-UI 1.0: stream agent runs to user-facing apps with typed events, shared state and interrupts, with upgrades from 0.x and the 1.1 preview.                         |
| [`agent-skills`](skills/agent-skills)                           | Agent Skills spec 2026-08-04: write, review and validate SKILL.md skills with skills-ref, and add skill discovery and loading to agents.                             |
| [`agentic-commerce-protocol`](skills/agentic-commerce-protocol) | ACP 2026-04-17: agent checkout sessions, delegated payment tokens and signed order webhooks, with upgrades from 2025-09-29.                                          |
| [`agents-md`](skills/agents-md)                                 | AGENTS.md (agents.md): write, place, migrate and review agent instruction files, with nested precedence and per-tool wiring.                                         |
| [`aipref`](skills/aipref)                                       | IETF aipref vocab-08 and attach-05: publish and read AI usage preferences in Content-Usage headers and robots.txt, with upgrades from older drafts.                  |
| [`ap2`](skills/ap2)                                             | AP2 v0.2: authorize AI agent payments with signed Checkout and Payment Mandates, with upgrades from v0.1.                                                            |
| [`llms-txt`](skills/llms-txt)                                   | llms.txt v2 proposal: write, validate and read /llms.txt files with markdown page versions and discovery links, with upgrades from v1.                               |
| [`mcp`](skills/mcp)                                             | MCP 2026-07-28 (2025-11-25 and 2025-06-18 supported): build MCP servers and clients, with upgrades from 2025-03-26 and 2024-11-05.                                   |
| [`mcp-apps`](skills/mcp-apps)                                   | MCP Apps 2026-01-26: interactive `ui://` HTML views for MCP tools, sandboxed hosts and the postMessage bridge, with upgrades from pre-stable drafts.                 |
| [`mcp-authorization`](skills/mcp-authorization)                 | MCP authorization 2026-07-28 (2025-11-25 and 2025-06-18 supported): secure MCP servers and clients with OAuth and client credentials, with upgrades from 2025-03-26. |
| [`robots-txt`](skills/robots-txt)                               | RFC 9309 robots.txt: write and parse crawler rules, longest match, error handling and AI crawler tokens, with upgrades from the 1994 and 1996 texts.                 |
| [`ucp`](skills/ucp)                                             | UCP 2026-08-25: profiles, negotiation, checkout over REST, MCP, A2A and embedded, payments, identity and orders, with upgrades from 2026-04-08.                      |
| [`web-bot-auth`](skills/web-bot-auth)                           | Web Bot Auth (draft-ietf-webbotauth-00): sign and verify bot and AI agent requests with RFC 9421, with upgrades from the draft-meunier drafts.                       |
| [`webmcp`](skills/webmcp)                                       | WebMCP (Draft CG Report): expose web page tools through `document.modelContext`, with upgrades from the `navigator.modelContext` drafts.                             |
| [`x402`](skills/x402)                                           | x402 v2: build HTTP 402 payment servers, clients and facilitators over HTTP, MCP and A2A, with upgrades from x402 v1.                                                |

#### APIs and HTTP

| Skill                                                       | Description                                                                                                                                        |
| ----------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`graphql`](skills/graphql)                                 | GraphQL September 2025: schemas, validation, execution, errors and GraphQL over HTTP, with upgrades from October 2021 and June 2018.               |
| [`http-message-signatures`](skills/http-message-signatures) | RFC 9421 HTTP Message Signatures: sign and verify HTTP messages, with RFC 9530 digests and upgrades from cavage-12 and RFC 3230.                   |
| [`http-semantics`](skills/http-semantics)                   | HTTP Semantics RFC 9110 and Caching RFC 9111: methods, status codes, conditionals, caching and API fields, with upgrades from RFC 7230-7235.       |
| [`json-api`](skills/json-api)                               | JSON:API 1.1: build and review APIs with resources, includes, pagination, errors and Atomic Operations, with upgrades from 1.0.                    |
| [`openapi`](skills/openapi)                                 | OpenAPI 3.0 to 3.2: write, validate and upgrade API descriptions, with Swagger 2.0 upgrades and the 3.3 preview.                                   |
| [`openapi-arazzo`](skills/openapi-arazzo)                   | Arazzo 1.1 and 1.0: describe and run multi-step workflows over OpenAPI and AsyncAPI operations, with the 1.2 preview.                              |
| [`openapi-overlay`](skills/openapi-overlay)                 | OpenAPI Overlay 1.2 and 1.1: apply repeatable JSONPath changes to OpenAPI documents, with upgrades from 1.0.                                       |
| [`problem-details`](skills/problem-details)                 | RFC 9457 Problem Details: return HTTP API errors as `application/problem+json` with the `WWW-Authenticate` challenge, with upgrades from RFC 7807. |
| [`ratelimit-headers`](skills/ratelimit-headers)             | IETF RateLimit and RateLimit-Policy headers (draft-11), `Retry-After` and 429 handling, with upgrades from older drafts and `X-RateLimit-*`.       |
| [`standard-webhooks`](skills/standard-webhooks)             | Standard Webhooks 1.0: sign, send and verify webhooks with v1 HMAC or v1a ed25519, replay protection and retries.                                  |
| [`typespec`](skills/typespec)                               | TypeSpec 1.x: design APIs in TypeSpec and emit OpenAPI 3.0, 3.1 or 3.2, with upgrades from pre-1.0 TypeSpec and Cadl.                              |

#### Events and data

| Skill                                       | Description                                                                                                                                       |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`asyncapi`](skills/asyncapi)               | AsyncAPI 3.1 and 3.0: describe, validate and upgrade event-driven APIs with servers, channels, operations and bindings, with upgrades from 2.x.   |
| [`cloudevents`](skills/cloudevents)         | CloudEvents 1.0 (1.0.2): JSON, Avro and Protobuf formats and HTTP, Kafka, AMQP, MQTT and NATS bindings, with upgrades from 0.3.                   |
| [`json-schema`](skills/json-schema)         | JSON Schema 2020-12: write, compose, bundle and validate schemas with `$ref` and `unevaluatedProperties`, with upgrades from draft-04 to 2019-09. |
| [`standard-schema`](skills/standard-schema) | Standard Schema v1: accept any validator via `~standard`, and generate JSON Schema with Standard JSON Schema.                                     |

#### Identity and authorization

| Skill                                                   | Description                                                                                                                                                                                                                                                                              |
| ------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`authzen`](skills/authzen)                             | AuthZEN Authorization API 1.0: PEP-to-PDP evaluation, batch, search and PDP metadata, with upgrades from the Implementer's Draft.                                                                                                                                                        |
| [`cedar`](skills/cedar)                                 | Cedar 4.x (language 4.5): write, validate and evaluate authorization policies and schemas, with upgrades from Cedar 3.x and 2.x.                                                                                                                                                         |
| [`cel`](skills/cel)                                     | CEL v0.25: write and review Common Expression Language expressions with types, macros, error semantics and cost, with upgrades from v0.24 and v0.6.                                                                                                                                      |
| [`ciba`](skills/ciba)                                   | OpenID CIBA Core 1.0: decoupled sign-in with poll, ping and push delivery, with upgrades from the Implementer's Drafts and MODRNA.                                                                                                                                                       |
| [`did`](skills/did)                                     | W3C DID 1.0 Decentralized Identifiers: parse DIDs and DID URLs, build DID documents, resolve them and vet methods, with upgrades to DID 1.1.                                                                                                                                             |
| [`eudi-wallet`](skills/eudi-wallet)                     | EUDI Wallet ARF 3.0.0: build and review wallets, issuers and relying parties against the HLRs, with upgrades from ARF 2.x and 1.x.                                                                                                                                                       |
| [`fapi`](skills/fapi)                                   | FAPI 2.0 Security Profile and Message Signing: high-security OAuth for financial-grade APIs, with FAPI 1.0 upgrades, JARM and CIBA.                                                                                                                                                      |
| [`gnap`](skills/gnap)                                   | GNAP (RFC 9635 and RFC 9767): request, issue and verify key-bound access tokens, and connect resource servers.                                                                                                                                                                           |
| [`jwt`](skills/jwt)                                     | JWT and JOSE RFCs with RFC 9964 ML-DSA: verify and issue JWS, JWE and JWK safely, with HPKE, RFC 8725bis and deprecation previews.                                                                                                                                                       |
| [`nist-800-63`](skills/nist-800-63)                     | NIST SP 800-63-4: build sign-in, MFA, passkeys, recovery, sessions, proofing and federation to IAL, AAL and FAL, with upgrades from SP 800-63-3.                                                                                                                                         |
| [`oauth`](skills/oauth)                                 | OAuth 2.0 with RFC 9700 and the OAuth 2.1 draft as a build preview: resource servers, clients and authorization servers, with PKCE, DPoP and RAR.                                                                                                                                        |
| [`openid`](skills/openid)                               | Every OpenID Foundation spec, maturity level and errata set under the OIDF Process, routed to the right family reference or dedicated skill.                                                                                                                                             |
| [`openid-connect`](skills/openid-connect)               | OpenID Connect 1.0 (errata set 2): validate ID tokens and run login, logout and discovery, with OpenID 2.0 migration.                                                                                                                                                                    |
| [`openid-federation`](skills/openid-federation)         | OpenID Federation 1.1 and 1.0: build and validate trust chains, entity statements and metadata policy, with upgrades from pre-Final drafts.                                                                                                                                              |
| [`openid4vc`](skills/openid4vc)                         | OpenID4VCI, OpenID4VP and HAIP 1.0: issue and verify credentials, with upgrades from the Implementer's Drafts and the 1.1 previews.                                                                                                                                                      |
| [`openfga`](skills/openfga)                             | OpenFGA schema 1.1: relationship-based authorization models, tuples, tests and API calls, with modular models (1.2) and upgrades from schema 1.0.                                                                                                                                        |
| [`rego`](skills/rego)                                   | Rego v1 (OPA 1.21): write, test and bundle Open Policy Agent policies with deny-by-default authorization, with upgrades from Rego v0.                                                                                                                                                    |
| [`saml`](skills/saml)                                   | SAML 2.0 with Errata 05: build SSO requests, responses and metadata, and validate responses against wrapping and replay, with upgrades from SAML 1.1.                                                                                                                                    |
| [`scim`](skills/scim)                                   | SCIM 2.0: provision users and groups with RFC 7643 and RFC 7644, including cursor pagination and security events, with SCIM 1.1 upgrades.                                                                                                                                                |
| [`sd-jwt`](skills/sd-jwt)                               | RFC 9901 SD-JWT: selective disclosure, Key Binding and verification, plus SD-JWT VC and Token Status List, with upgrades from pre-RFC drafts.                                                                                                                                            |
| [`shared-signals`](skills/shared-signals)               | SSF 1.0, CAEP 1.0 and RISC 1.0: send and receive security events, with upgrades from the Implementer's Drafts.                                                                                                                                                                           |
| [`spiffe`](skills/spiffe)                               | SPIFFE and SPIRE: issue and verify workload identities, SVIDs, trust bundles and federation, bridged to WIMSE and OAuth, with the WIT-SVID and Broker preview.                                                                                                                           |
| [`vc-data-model`](skills/vc-data-model)                 | W3C VC Data Model 2.0: build, secure and verify credentials with JOSE/COSE, Data Integrity and Bitstring Status List, with upgrades from 1.1.                                                                                                                                            |
| [`webauthn`](skills/webauthn)                           | WebAuthn Level 3 (Level 2 supported): register and verify passkeys and security keys per § 7.1 and § 7.2, with upgrades from Level 1.                                                                                                                                                    |
| [`wimse`](skills/wimse)                                 | WIMSE drafts: authenticate service-to-service calls with WIT, WPT, HTTP signatures or mTLS, with upgrades from s2s-protocol.                                                                                                                                                             |
| [`fedcm`](skills/fedcm)                                 | Federated Credential Management (FedCM): A Web Platform API that allows users to login to websites with their federated accounts in a privacy preserving manner. Covers Federated Credential Management API Level 1 (track). Use when a browser, identity provider or relying party impl |
| [`digital-credentials`](skills/digital-credentials)     | Digital Credentials API: This document specifies an API enabling user agents to mediate the presentation and issuance of digital credentials , such as a driver's license, government-issued identification card, or other types of digital credential . Covers Digital Credentials (tra |
| [`credential-management`](skills/credential-management) | Credential Management: This specification describes an imperative API enabling a website to request a user’s credentials from a user agent, and to help the user agent correctly store user credentials for future use. Covers Credential Management Level 1 (track), A Well-Known URL f |
| [`dbsc`](skills/dbsc)                                   | Device Bound Session Credentials (DBSC): Device Bound Sessions Credentials (DBSC) aims to prevent hijacking via cookie theft by building a protocol and infrastructure that allows a user agent to assert possession of a securely-stored private key. Covers Device Bound Session Crede |
| [`linked-web-storage`](skills/linked-web-storage)       | Linked Web Storage: The Linked Web Storage Protocol specification aims to provide applications with secure and permissioned access to externally stored data in an interoperable way. Covers Linked Web Storage Protocol 1.0 (track), LWS 1.0 Authentication Suite: OpenID Connect (trac |

#### Security and supply chain

| Skill                                             | Description                                                                                                                                        |
| ------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`csaf`](skills/csaf)                             | CSAF 2.0: write, validate and distribute security advisories and VEX documents, with upgrades from CVRF 1.2 and the CSAF 2.1 draft tracked.        |
| [`cyclonedx`](skills/cyclonedx)                   | CycloneDX 1.7 (ECMA-424): produce, validate, sign and consume SBOMs, VEX and other BOMs, with 1.6 support and upgrades from 1.0 to 1.5.            |
| [`in-toto`](skills/in-toto)                       | in-toto Attestation v1.2 and spec v1.0: produce and verify DSSE-signed attestations and layouts, with upgrades from v0.1 and 0.9.                  |
| [`mitre-atlas`](skills/mitre-atlas)               | MITRE ATLAS 2026.09: map AI threats to ATLAS tactics, techniques and mitigations, and parse the YAML data, with upgrades from 2026.06 and earlier. |
| [`openssf-baseline`](skills/openssf-baseline)     | OSPS Baseline v2026.08.28 and Scorecard v5: assess repos against Baseline controls by maturity level, with upgrades from earlier releases.         |
| [`openvex`](skills/openvex)                       | OpenVEX v0.2.0: write, validate and consume VEX documents with statuses and justifications, with upgrades from v0.0.2.                             |
| [`osv`](skills/osv)                               | OSV schema 1.9: write, validate, publish and evaluate vulnerability records with affected ranges and ecosystems, with upgrades from 1.0 to 1.8.    |
| [`owasp-agentic`](skills/owasp-agentic)           | OWASP Top 10 for Agentic Applications 2026 (first edition): review AI agent apps against ASI01 to ASI10.                                           |
| [`owasp-api-security`](skills/owasp-api-security) | OWASP API Security Top 10 2023: review HTTP, GraphQL and RPC APIs against API1 to API10, with upgrades from the 2019 edition.                      |
| [`owasp-asvs`](skills/owasp-asvs)                 | OWASP ASVS 5.0.0: scope, cite and verify security requirements by level and chapter, with upgrades from 4.0.3.                                     |
| [`owasp-llm`](skills/owasp-llm)                   | OWASP Top 10 for LLM Applications 2026: review LLM apps, RAG and tool use entry by entry with mitigations, with upgrades from 2025 and v1.1.       |
| [`owasp-masvs`](skills/owasp-masvs)               | OWASP MASVS 2.1: review iOS and Android apps against its controls, MAS profiles, MASWE and MASTG, with upgrades from MASVS 1.5.                    |
| [`owasp-top-10`](skills/owasp-top-10)             | OWASP Top 10:2025: review web apps against A01 to A10, classify findings by CWE and prioritize them, with upgrades from 2021 and 2017.             |
| [`purl`](skills/purl)                             | Package URL ECMA-427 1st Edition: build, parse and normalize pkg: identifiers per type, plus VERS ranges, with upgrades from pre-ECMA purl-spec.   |
| [`scitt`](skills/scitt)                           | SCITT RFC 9943 and SCRAPI draft-11: sign statements, register them and verify COSE Receipts, with upgrades from pre-RFC drafts.                    |
| [`security-txt`](skills/security-txt)             | RFC 9116 security.txt: write, serve, sign and parse the disclosure file, with upgrades from draft-foudil-securitytxt.                              |
| [`slsa`](skills/slsa)                             | SLSA v1.2: levels, provenance v1 and VSA checks for builds and source, with upgrades from SLSA v1.1, v1.0, v0.1 and the v0.2 predicates.           |
| [`spdx`](skills/spdx)                             | SPDX 3.0.1: write and validate SBOMs, license expressions and SPDX-License-Identifier tags, with upgrades from SPDX 2.3 and 2.2.                   |

#### Observability and operations

| Skill                                               | Description                                                                                                                                       |
| --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`ocsf`](skills/ocsf)                               | OCSF 1.9 (1.8 supported): map audit logs to OCSF events, upgrade from any earlier 1.x release, and track the 1.10 preview.                        |
| [`openfeature`](skills/openfeature)                 | OpenFeature 0.9 (0.8 supported): evaluate feature flags with providers, hooks, events and tracking, with upgrades from older 0.x releases.        |
| [`opentelemetry`](skills/opentelemetry)             | OpenTelemetry Specification 1.61.0: traces, metrics and logs with semconv 1.44.0 and OTLP 1.11.1, with upgrades from pre-stable HTTP conventions. |
| [`opentelemetry-genai`](skills/opentelemetry-genai) | OpenTelemetry GenAI conventions (development): instrument models, tools and agents with `gen_ai.*`, and upgrade v1.36.0 instrumentations.         |
| [`trace-context`](skills/trace-context)             | W3C Trace Context Level 1 and Baggage: parse, validate and propagate traceparent, tracestate and baggage, with the Level 2 preview.               |

#### Compliance and governance

| Skill                               | Description                                                                                                                                         |
| ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`c2pa`](skills/c2pa)               | C2PA 2.4 Content Credentials: build, sign and validate manifests, claims and assertions, with upgrades from 2.3, 2.2, 2.1, 2.0 and 1.x.             |
| [`eu-ai-act`](skills/eu-ai-act)     | EU AI Act (consolidated text of 27 July 2026, with the Digital Omnibus): classify AI systems and update plans built on the original dates.          |
| [`eu-cra`](skills/eu-cra)           | EU Cyber Resilience Act, 2024 OJ text: scoping, Annex I, SBOMs, Art. 14 reporting and CE marking, tracking two amending proposals.                  |
| [`nist-ai-rmf`](skills/nist-ai-rmf) | NIST AI RMF 1.0: build AI risk programs, profiles and control maps across GOVERN, MAP, MEASURE and MANAGE, plus the AI 600-1 Generative AI Profile. |

#### Email

| Skill                                         | Description                                                                                                                                       |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`dkim`](skills/dkim)                         | DKIM RFC 6376: sign and verify email with DKIM-Signature headers and _domainkey key records, with upgrades from RFC 4871.                         |
| [`dmarc`](skills/dmarc)                       | DMARC RFC 9989: publish, evaluate and report on `_dmarc` records with tree-walk alignment and RFC 9990/9991 reports, with upgrades from RFC 7489. |
| [`list-unsubscribe`](skills/list-unsubscribe) | RFC 2369 with RFC 8058: write List-Unsubscribe headers, one-click POST endpoints and receiver handling, with upgrades from RFC 2369-only lists.   |
| [`spf`](skills/spf)                           | RFC 7208 SPF: write, check and debug v=spf1 sender records within the 10 DNS lookup limit, and record results, with upgrades from RFC 4408.       |

#### Web platform

| Skill                                                                     | Description                                                                                                                                                                                                                                                                              |
| ------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`content-security-policy`](skills/content-security-policy)               | CSP Level 3: strict CSP, Trusted Types, Permissions Policy and Fetch Metadata, with upgrades from CSP Level 2 and Feature-Policy.                                                                                                                                                        |
| [`ecmascript-temporal`](skills/ecmascript-temporal)                       | Temporal (ES2027, stage 4): types, time zones, DST, calendars, arithmetic and RFC 9557 strings, with upgrades from Date and pre-2024 polyfills.                                                                                                                                          |
| [`gpc`](skills/gpc)                                                       | Global Privacy Control WD 2026-09-24: send and honor Sec-GPC and navigator.globalPrivacyControl, publish gpc.json, with upgrades from the 2020 draft.                                                                                                                                    |
| [`hsts`](skills/hsts)                                                     | RFC 6797 HSTS: send and enforce Strict-Transport-Security safely, with staged max-age rollout, preload rules and max-age=0 removal.                                                                                                                                                      |
| [`http-cookies`](skills/http-cookies)                                     | HTTP cookies RFC 6265: secure Set-Cookie and Cookie handling, with the RFC 6265bis preview and upgrades from RFC 2965 and RFC 2109.                                                                                                                                                      |
| [`messageformat`](skills/messageformat)                                   | Unicode MessageFormat LDML 48: write, select and format MF2 messages, with upgrades from LDML 47, the tech preview and ICU MessageFormat 1.                                                                                                                                              |
| [`wai-aria`](skills/wai-aria)                                             | WAI-ARIA 1.2: roles, states, accessible names, ARIA in HTML and APG patterns, with upgrades from 1.1 and 1.0.                                                                                                                                                                            |
| [`wcag`](skills/wcag)                                                     | WCAG 2.2, 2.1 and 2.0: build, test and claim conformance at A, AA or AAA, and build to the WCAG 3.0 draft on opt-in.                                                                                                                                                                     |
| [`subresource-integrity`](skills/subresource-integrity)                   | Subresource Integrity (SRI): This specification defines a mechanism by which user agents may verify that a fetched resource has been delivered without unexpected manipulation. Covers Subresource Integrity Level 1, Subresource Integrity Level 2 (track preview). Use when setting or |
| [`referrer-policy`](skills/referrer-policy)                               | Referrer Policy: This document describes how an author can set a referrer policy for documents they create, and the impact of such a policy on the Referer HTTP header for outgoing requests and navigations. Covers Referrer Policy (build). Use when choosing or applying a referrer p |
| [`secure-contexts`](skills/secure-contexts)                               | Secure Contexts: This specification defines "secure contexts", thereby allowing user agent implementers and specification authors to enable certain features only when certain minimum standards of authentication and confidentiality are met. Covers Secure Contexts (build), Mixed Co |
| [`permissions`](skills/permissions)                                       | Permissions: This specification defines common infrastructure that other specifications can use to interact with browser permissions. Covers Permissions (track), Permissions Policy Level 1 (track). Use when querying, requesting or specifying a powerful feature permission          |
| [`reporting-api`](skills/reporting-api)                                   | Reporting API: This document defines a generic reporting framework which allows web developers to associate a set of named reporting endpoints with an origin. Covers Reporting API Level 1 (track), Network Error Logging (track). Use when generating, delivering or collecting browse |
| [`web-cryptography`](skills/web-cryptography)                             | Web Cryptography API: This specification describes a JavaScript API for performing basic cryptographic operations in web applications, such as hashing, signature generation and verification, and encryption and decryption. Covers Web Cryptography API Level 1, Web Cryptography Leve |
| [`privacy-principles`](skills/privacy-principles)                         | Privacy Principles: Privacy is an essential part of the web. Covers Privacy Principles (track), Ethical Web Principles (track). Use when reviewing a web feature against the W3C privacy and ethical principles                                                                          |
| [`web-platform-design-principles`](skills/web-platform-design-principles) | Web Platform Design Principles: This document contains a set of design principles to be used when designing web platform technologies. Covers Web Platform Design Principles (track). Use when designing or reviewing a web platform feature                                             |
| [`attribution`](skills/attribution)                                       | Attribution API: This specifies a browser API for attribution. Covers Attribution Level 1 (track). Use when measuring conversions without cross-site identifiers                                                                                                                         |
| [`web-sustainability-guidelines`](skills/web-sustainability-guidelines)   | Web Sustainability Guidelines (WSG): Web Sustainability Guidelines ( WSG ) provide actionable recommendations to help digital teams make informed, sustainable decisions. Covers Web Sustainability Guidelines (WSG) (track). Use when reviewing a site or product against the Web Susta |
| [`atag`](skills/atag)                                                     | Authoring Tool Accessibility Guidelines (ATAG): The Authoring Tool Accessibility Guidelines (ATAG) 2.0 provides guidelines for designing web content authoring tools that are both more accessible to authors with disabilities (Part A) and designed to enable, support, and promote th |
| [`act-rules-format`](skills/act-rules-format)                             | Accessibility Conformance Testing (ACT) Rules Format: Accessibility Conformance Testing (ACT) Rules Format 1.1 defines a format for writing accessibility test rules. Covers Accessibility Conformance Testing (ACT) Rules Format 1.1. Use when writing or running an ACT rule           |
| [`wai-adapt`](skills/wai-adapt)                                           | WAI-Adapt: This specification provides web content authors a standard approach to support web users with various cognitive and learning disabilities who: Customarily communicate using symbolic languages generally known as Augmentative and Alternative Communications ( AAC ); Need  |

#### Web application APIs

Specifications in this group are tracked in [docs/standards-inventory.md](docs/standards-inventory.md).

#### CSS, graphics and media

Specifications in this group are tracked in [docs/standards-inventory.md](docs/standards-inventory.md).

#### Data and semantics

| Skill                                                                 | Description                                                                                                                                                                                                                                                                              |
| --------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`json-ld`](skills/json-ld)                                           | JSON-LD: JSON is a useful data serialization and messaging format. Covers JSON-LD 1.1, CBOR-LD 1.0 (track), YAML-LD 1.0 (track). Use when expanding, compacting or framing linked data, or reading CBOR-LD or YAML-LD                                                                    |
| [`rdf-dataset-canonicalization`](skills/rdf-dataset-canonicalization) | RDF Dataset Canonicalization (RDFC-1.0): RDF [ RDF11-CONCEPTS ] describes a graph-based data model for making claims about the world and provides the foundation for reasoning upon that graph of information. Covers RDF Dataset Canonicalization. Use when canonicalizing an RDF datas |

#### Documents and publishing

Specifications in this group are tracked in [docs/standards-inventory.md](docs/standards-inventory.md).

#### Payments and commerce

Specifications in this group are tracked in [docs/standards-inventory.md](docs/standards-inventory.md).

#### Regulations

Specifications in this group are tracked in [docs/standards-inventory.md](docs/standards-inventory.md).

#### Developer conventions

Specifications in this group are tracked in [docs/standards-inventory.md](docs/standards-inventory.md).

#### Domain verticals

Specifications in this group are tracked in [docs/standards-inventory.md](docs/standards-inventory.md).

## Development

You need the Node major in `.node-version` and the pnpm version pinned in `package.json`.

```bash
pnpm install
pnpm verify
```

| Script                      | What it does                                                        |
| --------------------------- | ------------------------------------------------------------------- |
| `pnpm validate`             | Checks every skill's frontmatter, versions, links and README entry. |
| `pnpm format`               | Formats the repo with oxfmt.                                        |
| `pnpm format:check`         | Fails when a file isn't formatted.                                  |
| `pnpm check`, `pnpm verify` | Runs `format:check` and `validate`. CI runs `pnpm verify`.          |
| `pnpm sources:check`        | Fetches every spec skill source; lists dead links and stale dates.  |

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for how to add or update a skill.

## License

[MIT](LICENSE)
