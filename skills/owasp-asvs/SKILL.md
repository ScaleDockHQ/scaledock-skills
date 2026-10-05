---
name: owasp-asvs
description: >-
  OWASP ASVS 5.0.0: scope and verify security requirements from the OWASP
  Application Security Verification Standard by level, and cite them with
  versioned ids. Use when turning ASVS into
  security requirements for a web app or API, scoping an ASVS L1, L2 or L3
  assessment, writing a verification report or a procurement clause, citing
  requirement ids such as v5.0.0-1.2.5, writing the documented security
  decisions ASVS asks for, or reviewing code against chapters V1 to V17
  (encoding and sanitization, validation and business logic, web frontend, API
  and web service, file handling, authentication, session management,
  authorization, self-contained tokens, OAuth and OIDC, cryptography, secure
  communication, configuration, data protection, secure coding and
  architecture, logging and error handling, WebRTC). Targets ASVS 5.0.0,
  upgrades from ASVS 4.0.3 with the official mapping files, and tracks the ASVS
  bleeding edge master branch.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.0"
  kind: standard
---

# OWASP ASVS

The OWASP Application Security Verification Standard (ASVS) is a list of about 350 pass-or-fail security requirements for web applications and services, grouped into 17 chapters and three levels. OWASP publishes it as a Flagship project. This skill pins ASVS 5.0.0 and produces a scoped requirement list, documented security decisions, a verification plan or report, or a procurement clause, each citing versioned requirement ids.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources), with the chapter and heading it cites. ASVS front-matter chapters have no section numbers, so citations name the chapter and heading; requirements are cited by their versioned id. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: developer or architect (requirements), verifier or tester (assessment), buyer or seller (procurement), or tool author (machine-readable lists).
- Application profile: browser frontend or machine-to-machine only; REST, GraphQL or WebSocket APIs; file upload or download; OAuth or OIDC role (client, resource server, authorization server, OpenID Provider); multi-tenant; WebRTC; languages with unmanaged memory.
- Target level: L1, L2 or L3, decided by the organization from its risk (What is the ASVS?, Which level to achieve). Ask; do not assume.
- Target version: ASVS 5.0.0 (current, the default). ASVS 4.0.3 is legacy: read existing 4.0.3 reports and requirement lists and upgrade them, never start new work on it. ASVS bleeding edge (the `master` branch) is a preview (posture: track): never cite its ids as a release. See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill or when a rule looks out of date, run `gh api repos/OWASP/ASVS/releases` for a new stable tag, diff `5.0/en` between the stable tag and `master`, re-read every URL in [Sources](#sources), and update the pins.

## Invariants

1. **Cite requirements with the version.** Use `v<version>-<chapter>.<section>.<requirement>`, for example `v5.0.0-1.2.5`, with a lowercase `v`. A bare id such as `1.2.5` means the latest release, which changes over time (What is the ASVS?, How to Reference ASVS Requirements). The JSON and CSV exports write ids as `V1.2.5`; drop the capital `V` when you add the version prefix.
2. **Never mix ids across versions.** A major release renumbers everything and compliance must be re-evaluated; a minor release keeps numbering but may add or remove requirements; a patch release only removes or relaxes requirements (What is the ASVS?, Release strategy). `4.0.3` id `2.1.1` and `5.0.0` id `2.1.1` are different requirements.
3. **Levels are cumulative.** The level on a requirement is the level from which it is required; requirements of higher levels are recommendations. Meeting L2 means meeting every L1 and L2 requirement, about 70% of the standard (What is the ASVS?, Application Security Verification Levels, Level 2).
4. **Read the full requirement text for level-dependent conditions.** Some requirements apply at one level but carry stricter conditions at higher levels inside the text (What is the ASVS?, Application Security Verification Levels), for example HSTS on subdomains from L2 in `v5.0.0-3.4.1` and a 1-minute authorization code lifetime at L3 in `v5.0.0-10.4.3`.
5. **Every requirement is pass or fail.** A requirement must have a demonstrable security impact and its verification must end in "pass" or "fail" (What is the ASVS?, Security and Verification). Record not-applicable requirements explicitly; they are not silent passes (Assessment and Certification, Verification reporting).
6. **Documentation requirements come first and are verified separately.** Documentation requirements sit in the first section of a chapter and always pair with an implementation requirement; checking that the decision is documented and checking that the implementation follows it are two separate activities (What is the ASVS?, Documented security decisions).
7. **State the scope by inclusion.** A verification names the target level and the requirements included, gives an opinion on the rationale for excluded ones, and discloses the testing methods (Assessment and Certification, Scope of Verification).
8. **No OWASP certification claims.** OWASP does not certify vendors, verifiers or software; any ASVS trust mark or certification is not endorsed by OWASP (Assessment and Certification, OWASP's Stance on ASVS Certifications and Trust Marks).
9. **Tools alone do not verify.** Running an automated tool without thorough testing is insufficient; each requirement must be verifiably tested, and documentation- or source-led (hybrid) testing is strongly encouraged over black-box testing (Assessment and Certification, Verification Mechanisms and The Role of Penetration Testing).
10. **Forks keep traceability.** An organization fork may omit irrelevant sections and should start from L1, but passing a given requirement id must mean the same thing as in the standard (What is the ASVS?, Forking the ASVS).

## Workflow

1. **Pick the version.** Use ASVS 5.0.0. If the input is a 4.0.3 report, policy or tool, plan an upgrade (step 9).
   -> [`references/versions.md`](references/versions.md)
   ✓ Every id you will write carries the `v5.0.0-` prefix.
2. **Choose the level with the owner.** Explain what L1, L2 and L3 mean in 5.0, and let the organization decide from its risk and its users' expectations.
   -> [`references/levels-and-usage.md`](references/levels-and-usage.md)
   ✓ The target level and the reason for it are recorded.
3. **Filter chapters and sections by application profile.** Drop sections that cannot apply (for example V3 for a machine-to-machine API, V10 without OAuth or OIDC, V17 without WebRTC), each with a one-line reason.
   -> [`references/levels-and-usage.md`](references/levels-and-usage.md), [`references/chapters-v1-v8.md`](references/chapters-v1-v8.md), [`references/chapters-v9-v17.md`](references/chapters-v9-v17.md)
   ✓ Every chapter is marked in scope, partly in scope or out of scope, with the reason.
4. **Build the requirement list.** From the 5.0.0 flat JSON, keep requirements whose `L` is at most the target level in the in-scope sections, and copy the full text with the versioned id.
   -> [`references/levels-and-usage.md`](references/levels-and-usage.md)
   ✓ The list count per chapter matches a filter of the official JSON, and no text is paraphrased in the normative column.
5. **Write the documented security decisions.** For each in-scope documentation requirement (the `x.1` sections), write the decision: input rules, file types and sizes, authorization rules, session timeouts, cryptographic inventory, log inventory, remediation time frames.
   -> [`references/chapters-v1-v8.md`](references/chapters-v1-v8.md), [`references/chapters-v9-v17.md`](references/chapters-v9-v17.md)
   ✓ Each documentation requirement links to the document and to the implementation requirement that enforces it.
6. **Implement or review against the list.** Map each requirement to the control, library or configuration that meets it.
   ✓ Each requirement has an owner and an implementation reference, or a documented exception.
7. **Verify.** Pick a method per requirement (documentation review, code review, configuration check, automated test, hybrid penetration test), and record pass, fail or not applicable with evidence.
   -> [`references/levels-and-usage.md`](references/levels-and-usage.md)
   ✓ No requirement is marked pass on the strength of a scanner run alone.
8. **Report or contract.** For a report, give scope, level, every requirement checked, exceptions and remediation guidance. For procurement, require a stated level of a stated version and evidence that the seller meets it.
   -> [`references/levels-and-usage.md`](references/levels-and-usage.md)
   ✓ The report or clause names `ASVS 5.0.0`, the level, and the included requirement ids.
9. **Upgrade** (only when asked). Translate 4.0.3 ids through the official mapping, re-level, add the new requirements, and re-verify.
   -> [`references/upgrade-from-4.md`](references/upgrade-from-4.md), [`references/versions.md`](references/versions.md)
   ✓ Every 4.0.3 id has a mapping outcome (moved, modified, split, merged, deleted) and no 4.0.3 pass is carried over without re-verification.

## Verify before done

- [ ] Every requirement id is written as `v5.0.0-<chapter>.<section>.<requirement>` and exists in the 5.0.0 JSON.
- [ ] The target level is stated, and the list includes every lower-level requirement in scope.
- [ ] Level-dependent conditions inside requirement texts were applied for the target level.
- [ ] Each excluded chapter or section has a reason, and not-applicable requirements are listed.
- [ ] Each documentation requirement has a written decision and a separate implementation check.
- [ ] Verification evidence is recorded per requirement, and methods are disclosed.
- [ ] Nothing claims OWASP certification, and no bleeding-edge id is presented as a release id.

## Reference index

- **`references/versions.md`**: the version lines, which one to use, what changed, upgrade steps and the bleeding-edge preview. Load for steps 1 and 9.
- **`references/levels-and-usage.md`**: the 5.0 level model, scope rules, documented security decisions, picking requirements for an app profile, verification, reports, procurement and forks. Load for steps 2 to 4, 7 and 8.
- **`references/chapters-v1-v8.md`**: V1 Encoding and Sanitization to V8 Authorization: sections, level counts and key requirements with ids.
- **`references/chapters-v9-v17.md`**: V9 Self-contained Tokens to V17 WebRTC, plus Appendix C (cryptography) and Appendix D (recommendations).
- **`references/upgrade-from-4.md`**: the 4.0.3 chapters, where they went in 5.0, the mapping file format and the upgrade procedure.

## Related skills

- `owasp-top-10`, for the risk awareness list that ASVS turns into verifiable controls: `npx skills add ScaleDockHQ/scaledock-skills --skill owasp-top-10`
- `owasp-api-security`, for the API-specific risks behind V4 and V8: `npx skills add ScaleDockHQ/scaledock-skills --skill owasp-api-security`
- `owasp-masvs`, for mobile apps, which ASVS does not cover: `npx skills add ScaleDockHQ/scaledock-skills --skill owasp-masvs`
- `nist-800-63`, for full digital identity guidelines beyond V6 and V7: `npx skills add ScaleDockHQ/scaledock-skills --skill nist-800-63`
- `webauthn`, for phishing-resistant authenticators that meet the L3 condition in `v5.0.0-6.3.3`: `npx skills add ScaleDockHQ/scaledock-skills --skill webauthn`
- `oauth` and `jwt`, for the protocols behind V9 and V10: `npx skills add ScaleDockHQ/scaledock-skills --skill oauth`, `npx skills add ScaleDockHQ/scaledock-skills --skill jwt`

## Sources

Status uses the publishing body's own maturity term. Checked is the date the source was last read.

- [OWASP ASVS releases](https://github.com/OWASP/ASVS/releases): Released; v5.0.0_release (2025-05-30) is the latest stable, `latest` (bleeding edge) regenerated 2026-09-03, v4.0.3_release (2021-10-28), checked 2026-10-05.
- [OWASP ASVS 5.0.0 (English markdown)](https://github.com/OWASP/ASVS/tree/v5.0.0_release/5.0/en): Released (stable), 5.0.0, checked 2026-10-05.
- [ASVS 5.0.0: What is the ASVS?](https://github.com/OWASP/ASVS/blob/v5.0.0_release/5.0/en/0x03-What-is-the-ASVS.md): Released (stable), 5.0.0, checked 2026-10-05.
- [ASVS 5.0.0: Assessment and Certification](https://github.com/OWASP/ASVS/blob/v5.0.0_release/5.0/en/0x04-Assessment_and_Certification.md): Released (stable), 5.0.0, checked 2026-10-05.
- [ASVS 5.0.0: Changes Compared to v4.x](https://github.com/OWASP/ASVS/blob/v5.0.0_release/5.0/en/0x05-For-Users-Of-4.0.md): Released (stable), 5.0.0, checked 2026-10-05.
- [ASVS 5.0.0 flat JSON requirement list](https://github.com/OWASP/ASVS/blob/v5.0.0_release/5.0/docs_en/OWASP_Application_Security_Verification_Standard_5.0.0_en.flat.json): Released (stable), 5.0.0, 345 requirements, checked 2026-10-05.
- [ASVS mapping files between 4.0.3 and 5.0.0](https://github.com/OWASP/ASVS/tree/master/5.0/mappings): maintained on master, not tied to release versioning; master at 9b5da31, checked 2026-10-05.
- [OWASP ASVS 4.0.3 (English markdown)](https://github.com/OWASP/ASVS/tree/v4.0.3_release/4.0/en): Released (superseded), 4.0.3, checked 2026-10-05.
- [ASVS 4.0.3: Using the ASVS](https://github.com/OWASP/ASVS/blob/v4.0.3_release/4.0/en/0x03-Using-ASVS.md): Released (superseded), 4.0.3, checked 2026-10-05.
- [OWASP ASVS master branch (5.0 bleeding edge)](https://github.com/OWASP/ASVS/tree/master/5.0/en): bleeding edge, for testing and preview only; master at 9b5da31 (2026-10-05); Draft posture: track, checked 2026-10-05.
- [OWASP Application Security Verification Standard project page](https://owasp.org/www-project-application-security-verification-standard/): OWASP Flagship Project, latest stable 5.0.0, checked 2026-10-05.
