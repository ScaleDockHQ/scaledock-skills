# 0006. Version lines follow the publisher

- Status: accepted
- Date: 2026-10-05

## Context

ADR 0004 requires every spec skill to list its version lines, and ADR 0005 keeps each skill to one specification or one family from a single publisher. Publishers do not version specifications the same way. A W3C series has numbered levels, a WHATWG standard has Review Drafts of one living text, an IETF RFC is obsoleted or updated, and ECMAScript, Unicode and FHIR publish editions. The same four statuses (current, supported, legacy, preview) have to mean the same thing for each of those cadences, or agents will treat a Working Draft as the default target or drop a level that a law still cites.

`pnpm versions:check` compares a skill's `versions` with the publisher indexes. The rules below are what that check, and every later spec skill, apply.

## Decision

- **W3C.** The latest Recommendation is current. An earlier level that a law or policy still cites is supported; otherwise it is legacy. The next level's Candidate Recommendation or Working Draft is a preview, with posture `build` when browsers ship it and `track` otherwise. A specification whose only line is a Candidate Recommendation or Working Draft is current and carries a posture. Notes and Registries are sources and references, not version lines.
- **WHATWG living standards.** One `living` current line, pinned to the latest Review Draft and commit. W3C forks (HTML 5.2, DOM 4) are legacy lines.
- **IETF.** The RFC is current. Obsoleted RFCs are legacy. RFCs that update it join that line or become families. Working-group drafts are previews with a posture. Individual drafts are only mentioned in `references/versions.md`.
- **Edition-versioned bodies** (ECMAScript, Unicode, CSS Snapshot, Schema.org, CVSS, ATT&CK, FHIR). The latest edition is current, the previous one or two are supported, older editions are legacy, and the next edition's draft or stage list is a preview.
- **NIST, OWASP and FIRST.** The current revision is current. The previous revision is legacy, and supported when a regulation still cites it. Public drafts are previews.
- **Regulations.** The consolidated text is current. Amending acts are lines or families. Application dates live in `references/versions.md`. The skill keeps the `eu-ai-act` stance that it is not legal advice.
- **Paywalled texts** (ISO/IEC, IEEE, SOC 2). There is no skill unless the full text is public, as with ETSI PDFs, the EN 16931 free download and OpenChain ISO 5230. Otherwise the text is cited only as a dependency.
- **Naming.** A publisher prefix is used only when the title is generic (`nist-`, `owasp-`, `eu-`, `iab-`, `fido-`, `mitre-`). Names that would clash with a product are avoided, as in ADR 0005.

## Consequences

- A new spec skill picks its lines from the rule for its publisher before it picks statuses. `pnpm versions:check` reports a line the publisher index has that `versions` does not.
- Changing which level is current touches `metadata.json`, `references/versions.md`, the description and both READMEs, the same set ADR 0004 already lists.
- A paywalled specification stays a dependency mention on the skill that needs it. It does not grow a version line or a skill of its own.
