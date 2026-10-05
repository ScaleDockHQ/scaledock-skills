# 0005. One specification, or one family, per spec skill

- Status: accepted
- Date: 2026-10-05

## Context

The backlog of missing standards grouped some specifications under one proposed skill: SBOM formats, VEX formats, policy languages, web security headers, email authentication. ADR 0003 names spec skills after the specification, and ADR 0004 lets one skill hold several families. Neither said when a group of specifications belongs in one skill and when it needs several.

A skill that mixes specifications from different publishers, or specifications people adopt on their own, is hard to name after a spec, hard to find, and hard to refresh, because each part moves on its own schedule.

## Decision

- A spec skill teaches one specification, or one family of specifications from the same publisher that is versioned and used together. Existing examples are `jwt` (the JOSE RFCs), `shared-signals` (SSF, CAEP and RISC) and `openid4vc` (OpenID4VCI, OpenID4VP and HAIP).
- A specification from another publisher, or one that people adopt on its own, gets its own skill. CycloneDX and SPDX are two skills; so are OPA Rego, OpenFGA and CEL, and DMARC, DKIM and SPF.
- A skill may still pin a specification it depends on as a source and cite the parts it uses, as `oauth` does with RFC 9068 and RFC 8414. The dependency does not get a version line in the skill unless the skill teaches it.
- A name must not clash with a well-known product. Use `ecmascript-temporal`, not `temporal` (Temporal.io), and `http-cookies`, not `cookies`.

## Consequences

- There are more, smaller spec skills. Bundle skills and Related skills sections list the ones that belong together.
- Each skill refreshes on its own publisher's schedule, and its `versions` stay meaningful.
- Some skills cite another skill's specification as a dependency source. When that specification changes, check both skills.
