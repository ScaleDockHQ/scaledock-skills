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
| [`scaledock-http-api`](skills/scaledock-http-api)                       | Build or review an HTTP API on Hono and oRPC that follows OpenAPI 3.2, Overlay, Problem Details, RateLimit headers and Standard Schema, with PermDock guarding every procedure and writing the OpenAPI security.                                                            |
| [`scaledock-mcp-server`](skills/scaledock-mcp-server)                   | Build or harden an MCP server that follows the MCP authorization spec, OAuth 2.1, JWT verification and Problem Details, with PermDock deciding every tool call.                                                                                                             |
| [`scaledock-agent-permissions`](skills/scaledock-agent-permissions)     | Give AI agents least-privilege, auditable access across A2A, WebMCP, AG-UI, AP2 and Web Bot Auth, with PermDock deciding delegation and approvals, and OpenTelemetry GenAI, OCSF and EU AI Act record-keeping.                                                              |
| [`scaledock-enterprise-identity`](skills/scaledock-enterprise-identity) | Add SSO, SCIM provisioning, Shared Signals revocation, FAPI 2.0 and SPIFFE workload identity, with PermDock turning directory groups and roles into permissions.                                                                                                            |

### Spec skills

Neutral skills, one per specification or family of specifications from one publisher ([ADR 0005](docs/decisions/0005-one-spec-or-family-per-skill.md)). Each pins the sources it was written from in its `metadata.json` and `## Sources` section. Each covers every major version line of its specification: the current default, older lines that are still supported, legacy lines to upgrade from, and a `-preview` line for drafts of the next version. Its `references/versions.md` says which line to use and how to upgrade between them.

#### Agents

| Skill                                                           | Description                                                                                                                                          |
| --------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`a2a`](skills/a2a)                                             | A2A 1.0: publish Agent Cards and talk agent to agent over JSON-RPC, gRPC and HTTP+JSON, with upgrades from 0.3 and 0.2 and the 1.1 preview.          |
| [`a2ui`](skills/a2ui)                                           | A2UI v0.9.1: agent-generated UI rendered from a trusted component catalog over A2A, AG-UI or MCP, with v1.0 behind a flag and upgrades from v0.8.    |
| [`ag-ui`](skills/ag-ui)                                         | AG-UI 1.0: stream agent runs to user-facing apps with typed events, shared state and interrupts, with upgrades from 0.x and the 1.1 preview.         |
| [`agent-skills`](skills/agent-skills)                           | Agent Skills spec 2026-08-04: write, review and validate SKILL.md skills with skills-ref, and add skill discovery and loading to agents.             |
| [`agentic-commerce-protocol`](skills/agentic-commerce-protocol) | ACP 2026-04-17: agent checkout sessions, delegated payment tokens and signed order webhooks, with upgrades from 2025-09-29.                          |
| [`aipref`](skills/aipref)                                       | IETF aipref vocab-08 and attach-05: publish and read AI usage preferences in Content-Usage headers and robots.txt, with upgrades from older drafts.  |
| [`ap2`](skills/ap2)                                             | AP2 v0.2: authorize AI agent payments with signed Checkout and Payment Mandates, with upgrades from v0.1.                                            |
| [`mcp`](skills/mcp)                                             | MCP 2026-07-28 (2025-11-25 and 2025-06-18 supported): build MCP servers and clients, with upgrades from 2025-03-26 and 2024-11-05.                   |
| [`mcp-apps`](skills/mcp-apps)                                   | MCP Apps 2026-01-26: interactive `ui://` HTML views for MCP tools, sandboxed hosts and the postMessage bridge, with upgrades from pre-stable drafts. |
| [`mcp-authorization`](skills/mcp-authorization)                 | MCP authorization 2026-07-28 (2025-11-25 and 2025-06-18 supported): secure MCP servers and clients with OAuth, with upgrades from 2025-03-26.        |
| [`robots-txt`](skills/robots-txt)                               | RFC 9309 robots.txt: write and parse crawler rules, longest match, error handling and AI crawler tokens, with upgrades from the 1994 and 1996 texts. |
| [`ucp`](skills/ucp)                                             | UCP 2026-08-25: profiles, negotiation, checkout over REST, MCP, A2A and embedded, payments, identity and orders, with upgrades from 2026-04-08.      |
| [`web-bot-auth`](skills/web-bot-auth)                           | Web Bot Auth (draft-ietf-webbotauth-00): sign and verify bot and AI agent requests with RFC 9421, with upgrades from the draft-meunier drafts.       |
| [`webmcp`](skills/webmcp)                                       | WebMCP (Draft CG Report): expose web page tools through `document.modelContext`, with upgrades from the `navigator.modelContext` drafts.             |
| [`x402`](skills/x402)                                           | x402 v2: build HTTP 402 payment servers, clients and facilitators over HTTP, MCP and A2A, with upgrades from x402 v1.                                |

#### APIs and HTTP

| Skill                                           | Description                                                                                                                                        |
| ----------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`http-semantics`](skills/http-semantics)       | HTTP Semantics RFC 9110 and Caching RFC 9111: methods, status codes, conditionals, caching and API fields, with upgrades from RFC 7230-7235.       |
| [`openapi`](skills/openapi)                     | OpenAPI 3.0 to 3.2: write, validate and upgrade API descriptions, with Swagger 2.0 upgrades and the 3.3 preview.                                   |
| [`openapi-arazzo`](skills/openapi-arazzo)       | Arazzo 1.1 and 1.0: describe and run multi-step workflows over OpenAPI and AsyncAPI operations, with the 1.2 preview.                              |
| [`openapi-overlay`](skills/openapi-overlay)     | OpenAPI Overlay 1.2 and 1.1: apply repeatable JSONPath changes to OpenAPI documents, with upgrades from 1.0.                                       |
| [`problem-details`](skills/problem-details)     | RFC 9457 Problem Details: return HTTP API errors as `application/problem+json` with the `WWW-Authenticate` challenge, with upgrades from RFC 7807. |
| [`ratelimit-headers`](skills/ratelimit-headers) | IETF RateLimit and RateLimit-Policy headers (draft-11), `Retry-After` and 429 handling, with upgrades from older drafts and `X-RateLimit-*`.       |
| [`typespec`](skills/typespec)                   | TypeSpec 1.x: design APIs in TypeSpec and emit OpenAPI 3.0, 3.1 or 3.2, with upgrades from pre-1.0 TypeSpec and Cadl.                              |

#### Events and data

| Skill                                       | Description                                                                                                                                       |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`asyncapi`](skills/asyncapi)               | AsyncAPI 3.1 and 3.0: describe, validate and upgrade event-driven APIs with servers, channels, operations and bindings, with upgrades from 2.x.   |
| [`cloudevents`](skills/cloudevents)         | CloudEvents 1.0 (1.0.2): JSON, Avro and Protobuf formats and HTTP, Kafka, AMQP, MQTT and NATS bindings, with upgrades from 0.3.                   |
| [`json-schema`](skills/json-schema)         | JSON Schema 2020-12: write, compose, bundle and validate schemas with `$ref` and `unevaluatedProperties`, with upgrades from draft-04 to 2019-09. |
| [`standard-schema`](skills/standard-schema) | Standard Schema v1: accept any validator via `~standard`, and generate JSON Schema with Standard JSON Schema.                                     |

#### Identity and authorization

| Skill                                           | Description                                                                                                                                           |
| ----------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`authzen`](skills/authzen)                     | AuthZEN Authorization API 1.0: PEP-to-PDP evaluation, batch, search and PDP metadata, with upgrades from the Implementer's Draft.                     |
| [`cedar`](skills/cedar)                         | Cedar 4.x (language 4.5): write, validate and evaluate authorization policies and schemas, with upgrades from Cedar 3.x and 2.x.                      |
| [`fapi`](skills/fapi)                           | FAPI 2.0 Security Profile and Message Signing: high-security OAuth for financial-grade APIs, with FAPI 1.0 upgrades, JARM and CIBA.                   |
| [`gnap`](skills/gnap)                           | GNAP (RFC 9635 and RFC 9767): request, issue and verify key-bound access tokens, and connect resource servers.                                        |
| [`jwt`](skills/jwt)                             | JWT and JOSE RFCs: verify and issue JWS, JWE and JWK safely, with the RFC 8725bis and `none`/`RSA1_5` deprecation previews.                           |
| [`oauth`](skills/oauth)                         | OAuth 2.0 with RFC 9700 and the OAuth 2.1 draft as a build preview: resource servers, clients and authorization servers, with PKCE, DPoP and RAR.     |
| [`openid`](skills/openid)                       | Every OpenID Foundation spec, maturity level and errata set under the OIDF Process, routed to the right family reference or dedicated skill.          |
| [`openid-connect`](skills/openid-connect)       | OpenID Connect 1.0 (errata set 2): validate ID tokens and run login, logout and discovery, with OpenID 2.0 migration.                                 |
| [`openid-federation`](skills/openid-federation) | OpenID Federation 1.1 and 1.0: build and validate trust chains, entity statements and metadata policy, with upgrades from pre-Final drafts.           |
| [`openid4vc`](skills/openid4vc)                 | OpenID4VCI, OpenID4VP and HAIP 1.0: issue and verify credentials, with upgrades from the Implementer's Drafts and the 1.1 previews.                   |
| [`saml`](skills/saml)                           | SAML 2.0 with Errata 05: build SSO requests, responses and metadata, and validate responses against wrapping and replay, with upgrades from SAML 1.1. |
| [`scim`](skills/scim)                           | SCIM 2.0: provision users and groups with RFC 7643 and RFC 7644, including cursor pagination and security events, with SCIM 1.1 upgrades.             |
| [`shared-signals`](skills/shared-signals)       | SSF 1.0, CAEP 1.0 and RISC 1.0: send and receive security events, with upgrades from the Implementer's Drafts.                                        |
| [`spiffe`](skills/spiffe)                       | SPIFFE and SPIRE: issue and verify workload identities, SVIDs, trust bundles and federation, with the Incubating WIT-SVID and Broker preview.         |
| [`webauthn`](skills/webauthn)                   | WebAuthn Level 3 (Level 2 supported): register and verify passkeys and security keys per § 7.1 and § 7.2, with upgrades from Level 1.                 |

#### Security and supply chain

| Skill                                   | Description                                                                                              |
| --------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| [`owasp-agentic`](skills/owasp-agentic) | OWASP Top 10 for Agentic Applications 2026 (first edition): review AI agent apps against ASI01 to ASI10. |

#### Observability and operations

| Skill                                               | Description                                                                                                                                       |
| --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`ocsf`](skills/ocsf)                               | OCSF 1.9 (1.8 supported): map audit logs to OCSF events, upgrade from any earlier 1.x release, and track the 1.10 preview.                        |
| [`openfeature`](skills/openfeature)                 | OpenFeature 0.9 (0.8 supported): evaluate feature flags with providers, hooks, events and tracking, with upgrades from older 0.x releases.        |
| [`opentelemetry`](skills/opentelemetry)             | OpenTelemetry Specification 1.61.0: traces, metrics and logs with semconv 1.44.0 and OTLP 1.11.1, with upgrades from pre-stable HTTP conventions. |
| [`opentelemetry-genai`](skills/opentelemetry-genai) | OpenTelemetry GenAI conventions (development): instrument models, tools and agents with `gen_ai.*`, and upgrade v1.36.0 instrumentations.         |
| [`trace-context`](skills/trace-context)             | W3C Trace Context Level 1 and Baggage: parse, validate and propagate traceparent, tracestate and baggage, with the Level 2 preview.               |

#### Compliance and governance

| Skill                           | Description                                                                                                                                |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| [`eu-ai-act`](skills/eu-ai-act) | EU AI Act (consolidated text of 27 July 2026, with the Digital Omnibus): classify AI systems and update plans built on the original dates. |
| [`eu-cra`](skills/eu-cra)       | EU Cyber Resilience Act, 2024 OJ text: scoping, Annex I, SBOMs, Art. 14 reporting and CE marking, tracking two amending proposals.         |

#### Web platform

| Skill                         | Description                                                                                                                              |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| [`wai-aria`](skills/wai-aria) | WAI-ARIA 1.2: roles, states, accessible names, ARIA in HTML and APG patterns, with upgrades from 1.1 and 1.0.                            |
| [`wcag`](skills/wcag)         | WCAG 2.2: build, review and test UIs against the A/AA/AAA success criteria and write conformance claims, with upgrades from 2.0 and 2.1. |

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
