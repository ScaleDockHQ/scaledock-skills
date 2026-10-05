---
name: eu-cra
description: >-
  EU Cyber Resilience Act (CRA), Regulation (EU) 2024/2847: scope products with
  digital elements and turn the obligations into engineering requirements,
  following the Official Journal text of 20 November 2024 with its corrigenda;
  tracks the Digital Omnibus proposal COM(2025) 837 and the public procurement
  proposal COM(2026) 590 as previews. Covers scope and exclusions, free and
  open-source software and stewards, operator roles, important and critical
  products (Annexes III and IV), essential requirements and vulnerability handling (Annex I: SBOM, coordinated
  vulnerability disclosure, security updates), Article 14 reporting (24 h, 72 h,
  final report), support period, Annex VII documentation, conformity modules,
  CE marking and the Article 71 dates. Use when scoping a product for the EU,
  designing SBOMs, update channels or a PSIRT, or planning deadlines. Not
  legal advice. Triggers: CRA, 2024/2847, actively exploited vulnerability,
  ENISA single reporting platform, CSIRT, open-source steward.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.0"
  kind: standard
---

# EU Cyber Resilience Act

Regulation (EU) 2024/2847, the Cyber Resilience Act (CRA), sets horizontal cybersecurity requirements for hardware and software products with digital elements made available on the EU market, and for the vulnerability handling processes of their manufacturers. With this skill the agent decides whether a product is in scope, finds the obligations for the user's role and product class, and turns them into engineering requirements, reporting runbooks and checks.

> **Not legal advice.** This skill summarises the regulation for engineering work. It does not decide whether or how the CRA applies to a specific product or organisation. Involve qualified legal counsel for scope and classification decisions, conformity assessment, declarations of conformity and anything with regulatory consequences. Only the Official Journal text is authentic; Commission guidance and FAQs are non-binding.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources), with the article it cites. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: manufacturer, authorised representative, importer, distributor (Art. 3(13), (15) to (17)), open-source software steward (Art. 3(14)), or a free and open-source contributor (out of scope, recital 18). An importer, distributor or other person that rebrands or substantially modifies a product becomes its manufacturer (Arts. 21 and 22).
- Product: what it is (software, hardware, component, remote data processing), its intended purpose and reasonably foreseeable use, its data connections, whether it is supplied in the course of a commercial activity, and whether other Union law excludes it (Art. 2(2) to (7)).
- Core functionality: whether it matches a category in Annex III (class I or II) or Annex IV, using the technical descriptions in Implementing Regulation (EU) 2025/2392.
- Enterprise size: microenterprise, small, medium or larger, for the simplified technical documentation (Art. 33(5)) and the fine derogation (Art. 64(10)).
- Market dates: whether the product, or the version, is placed on the market before or after 11 December 2027 (Art. 69(2)).
- Target version: the Official Journal text of 20 November 2024 (default), read with its corrigenda and the delegated and implementing acts listed in [Sources](#sources). The Digital Omnibus proposal COM(2025) 837 and the public procurement proposal COM(2026) 590 are previews (posture: track): never plan against them. There is no supported or legacy line. See [`references/versions.md`](references/versions.md).
- Revision: Regulation (EU) 2024/2847 as published in OJ L 2024/2847 of 20.11.2024, with corrigenda 32024R2847R(01) to R(07); the only consolidated version, 02024R2847-20241120, is the original text.
- Sources: when refreshing, re-read every URL in [Sources](#sources), check the Publications Office for a new consolidated version, amending acts, corrigenda and acts based on the Regulation, and update the pins.

## Invariants

1. **Scope follows Art. 2(1)**: products with digital elements made available on the market whose intended purpose or reasonably foreseeable use includes a direct or indirect logical or physical data connection to a device or network. Making available means supply in the course of a commercial activity (Art. 3(22); recitals 15 and 18). Exclusions are only those in Art. 2(2) to (7) and in delegated acts under Art. 2(5), such as Delegated Regulation (EU) 2025/1535.
2. **Products meet Annex I Part I, processes meet Annex I Part II** (Art. 6), based on a documented cybersecurity risk assessment that is kept up to date during the support period and goes into the technical documentation (Art. 13(2) to (4)).
3. **No known exploitable vulnerabilities and secure by default** at placing on the market, where applicable on the basis of the risk assessment (Annex I Part I(2)(a), (b)).
4. **Vulnerabilities are handled for the support period**: at least five years unless the product is expected to be in use for less (Art. 13(8)), with the end date (at least month and year) shown at purchase (Art. 13(19)), and each security update kept available for at least 10 years or the rest of the support period, whichever is longer (Art. 13(9)).
5. **The manufacturer keeps an SBOM, a coordinated vulnerability disclosure policy and a reporting contact**, and ships security updates without delay, free of charge and, where technically feasible, separately from functionality updates (Annex I Part II(1), (2), (5), (6), (8); Art. 13(17)).
6. **Actively exploited vulnerabilities and severe incidents are reported** through ENISA's single reporting platform to the CSIRT designated as coordinator and to ENISA: early warning within 24 hours, notification within 72 hours, final report within 14 days after a fix is available (vulnerabilities) or one month after the notification (incidents), and impacted users are informed (Art. 14(1) to (4), (7), (8)). This applies from 11 September 2026 to every in-scope product, including those placed on the market earlier (Arts. 69(3), 71(2)).
7. **Conformity assessment follows the product class** (Art. 32): module A for the default category; class I needs harmonised standards, common specifications or a certificate at assurance level at least "substantial" to use module A, otherwise B+C or H; class II needs B+C, H or such a certificate; critical products need a European cybersecurity certificate where a delegated act requires it, otherwise the class II procedures.
8. **No CE marking without the file**: technical documentation per Annex VII, the EU declaration of conformity (Art. 28, Annex V) and the CE marking (Art. 30) come before placing on the market, and the documentation is kept for 10 years or the support period, whichever is longer (Art. 13(12), (13)).
9. **Dates come from Arts. 71 and 69**: entry into force on 10 December 2024, Chapter IV (notified bodies) from 11 June 2026, Art. 14 reporting from 11 September 2026, everything else from 11 December 2027.

## Workflow

1. **Pick the version.** Work from the Official Journal text of 20 November 2024 with its corrigenda, and check the Publications Office for a new consolidated version or amending act.
   -> [`references/versions.md`](references/versions.md)
   ✓ The deliverable names the text and the acts it relies on, and nothing comes from a preview.
2. **Establish scope and role.** Apply Art. 2 and the commercial-activity test, settle free and open-source software and steward status, and record the role.
   -> [`references/scope-and-roles.md`](references/scope-and-roles.md)
   ✓ Scope, role and any exclusion are written down with the article or recital used, and reviewed by counsel.
3. **Classify the product.** Compare the core functionality with Annexes III and IV and the technical descriptions of Implementing Regulation (EU) 2025/2392.
   -> [`references/scope-and-roles.md`](references/scope-and-roles.md)
   ✓ The class (default, important class I or II, or critical) is recorded with the matching category or the reason none matches.
4. **Run the risk assessment and map Annex I Part I.** Turn each point (2)(a) to (m) into a design control, a test, or a written justification for not applying it.
   -> [`references/essential-requirements.md`](references/essential-requirements.md)
   ✓ Every Annex I Part I point has a control and evidence, or a justification in the technical documentation (Art. 13(4)).
5. **Build vulnerability handling.** Set the support period, SBOM generation, coordinated vulnerability disclosure policy, contact point, upstream reporting, security update channel and advisories.
   -> [`references/vulnerability-handling-and-reporting.md`](references/vulnerability-handling-and-reporting.md)
   ✓ Each Annex I Part II point (1) to (8) has an owner, a process and an artefact.
6. **Set up Article 14 reporting.** Write the runbook for awareness, the 24-hour, 72-hour and final reports, the CSIRT to notify and user information.
   -> [`references/vulnerability-handling-and-reporting.md`](references/vulnerability-handling-and-reporting.md)
   ✓ The runbook is live for every in-scope product on the market, and an account on the single reporting platform exists.
7. **Prepare user information and technical documentation.** Fill Annex II and Annex VII, including the support period rationale and test reports.
   -> [`references/essential-requirements.md`](references/essential-requirements.md), [`references/conformity-and-timeline.md`](references/conformity-and-timeline.md)
   ✓ Every Annex II and Annex VII point maps to an artefact.
8. **Assess conformity and mark.** Choose the module for the class, draw up the EU declaration of conformity and affix the CE marking.
   -> [`references/conformity-and-timeline.md`](references/conformity-and-timeline.md)
   ✓ The module is allowed for the class, and the declaration and marking follow Arts. 28 and 30.
9. **Plan against the dates.** Place each obligation on the Art. 71 and Art. 69 timeline.
   -> [`references/conformity-and-timeline.md`](references/conformity-and-timeline.md)
   ✓ The plan cites Art. 71 and treats products placed before 11 December 2027 per Art. 69.
10. **Upgrade** (only when asked). Bring a plan or summary up to the pinned text, apply a newly applicable amendment, or move to an adopted preview.
    -> [`references/versions.md`](references/versions.md)
    ✓ Every citation and date points at the text in force, and no built control was dropped because a proposal changed.

## Verify before done

- [ ] The not-legal-advice notice and the counsel review are recorded in the deliverable.
- [ ] Scope, role and product class each cite the article, annex point or Implementing Regulation (EU) 2025/2392 entry used.
- [ ] Every Annex I Part I point (2)(a) to (m) has evidence or a justification, and Part II points (1) to (8) each have a process.
- [ ] The support period is at least five years or the documented expected use time, and its end date is shown at purchase.
- [ ] The SBOM is machine-readable, in a commonly used format, and covers at least the top-level dependencies.
- [ ] The reporting runbook covers 24 hours, 72 hours, 14 days after a fix and one month after notification, and names the CSIRT per Art. 14(7).
- [ ] The conformity module is allowed for the class under Art. 32, and Annex VII points 1 to 8 are in the technical documentation.
- [ ] Dates match Arts. 71 and 69, and nothing is planned against a preview.

## Reference index

- **`references/versions.md`**: the Official Journal text and its corrigenda, the delegated and implementing acts, the EHDS amendment from 26 March 2027, the two previews, and the upgrade steps. Load for steps 1 and 10.
- **`references/scope-and-roles.md`**: Art. 2 scope and exclusions, remote data processing, free and open-source software, stewards, operator roles, substantial modification, and Annexes III and IV with core functionality. Load for steps 2 and 3.
- **`references/essential-requirements.md`**: the risk assessment, Annex I Part I mapped to engineering work, component due diligence, and Annex II user information. Load for steps 4 and 7.
- **`references/vulnerability-handling-and-reporting.md`**: Annex I Part II, SBOM, coordinated vulnerability disclosure, security updates, support period, and Art. 14 to 16 reporting. Load for steps 5 and 6.
- **`references/conformity-and-timeline.md`**: Art. 32 and Annex VIII modules, Annex VII, the declaration of conformity, CE marking, the dates, transitional rules and fines. Load for steps 7 to 9.

## Related skills

- `eu-ai-act` for products that are also high-risk AI systems, which Art. 12 links to the AI Act: `npx skills add ScaleDockHQ/scaledock-skills --skill eu-ai-act`.
- `cyclonedx` and `spdx` for producing the machine-readable SBOM of Annex I Part II(1): `npx skills add ScaleDockHQ/scaledock-skills --skill cyclonedx`, `npx skills add ScaleDockHQ/scaledock-skills --skill spdx`.
- `csaf` for machine-readable security advisories when informing users (Art. 14(8); Annex I Part II(4), (8)): `npx skills add ScaleDockHQ/scaledock-skills --skill csaf`.
- `security-txt` for publishing the vulnerability reporting contact (Art. 13(17); Annex I Part II(6)): `npx skills add ScaleDockHQ/scaledock-skills --skill security-txt`.
- `openssf-baseline` for security controls in open-source projects, including a steward's cybersecurity policy (Art. 24(1)): `npx skills add ScaleDockHQ/scaledock-skills --skill openssf-baseline`.

## Sources

Status uses the publishing body's own maturity term. Checked is the date the source was last read.

- [Regulation (EU) 2024/2847 (Cyber Resilience Act), Official Journal text](https://publications.europa.eu/resource/celex/32024R2847): Regulation in force, OJ L 2024/2847 of 20.11.2024, checked 2026-10-05.
- [Corrigendum 32024R2847R(01)](https://publications.europa.eu/resource/celex/32024R2847R%2801%29): corrigendum, OJ L 2024/90780 of 5.12.2024 (title), checked 2026-10-05.
- [Corrigendum 32024R2847R(02)](https://publications.europa.eu/resource/celex/32024R2847R%2802%29): corrigendum, OJ L 2025/90555 of 2.7.2025 (Art. 64(10) reads "paragraphs 2 to 9"), checked 2026-10-05.
- [Corrigendum 32024R2847R(04)](https://publications.europa.eu/resource/celex/32024R2847R%2804%29): corrigendum, OJ L 2025/90828 of 17.10.2025 (Art. 67 point number), checked 2026-10-05.
- [Publications Office SPARQL endpoint (Cellar metadata for 32024R2847)](https://publications.europa.eu/webapi/rdf/sparql): metadata service, lists consolidated version 02024R2847-20241120, amending act 32025R0327, acts based on the Regulation 32025R1535, 32025R2392 and 32026R0881, corrigenda R(01) to R(07), and proposal 52026PC0590, checked 2026-10-05.
- [Regulation (EU) 2025/327 (European Health Data Space)](https://publications.europa.eu/resource/celex/32025R0327): Regulation in force, OJ L 2025/327 of 5.3.2025; Art. 104 amends Arts. 13(4), 31(3) and 32 of the CRA, applying from 26 March 2027, checked 2026-10-05.
- [Commission Delegated Regulation (EU) 2025/1535](https://publications.europa.eu/resource/celex/32025R1535): delegated regulation in force, OJ L 2025/1535 of 29.10.2025 (exclusion for L-category vehicles), checked 2026-10-05.
- [Commission Implementing Regulation (EU) 2025/2392](https://publications.europa.eu/resource/celex/32025R2392): implementing regulation in force, OJ L 2025/2392 of 1.12.2025 (technical descriptions of important and critical products), checked 2026-10-05.
- [Commission Delegated Regulation (EU) 2026/881](https://publications.europa.eu/resource/celex/32026R0881): delegated regulation in force, OJ L 2026/881 of 20.4.2026 (grounds for delaying dissemination of notifications), checked 2026-10-05.
- [Commission guidance on the application of the CRA, C(2026) 5252 Annex](https://ec.europa.eu/newsroom/dae/redirection/document/131456): Commission guidance (non-binding), 27.7.2026, checked 2026-10-05.
- [FAQs on the Cyber Resilience Act implementation](https://ec.europa.eu/newsroom/dae/redirection/document/122331): Commission services FAQ (non-authoritative), version 1.4 of 04/09/2026, checked 2026-10-05.
- [Cyber Resilience Act](https://digital-strategy.ec.europa.eu/en/policies/cyber-resilience-act): European Commission policy page, last update 7 September 2026, checked 2026-10-05.
- [Cyber Resilience Act: reporting obligations](https://digital-strategy.ec.europa.eu/en/policies/cra-reporting): European Commission policy page, last update 11 September 2026, checked 2026-10-05.
- [Cyber Resilience Act: standardisation](https://digital-strategy.ec.europa.eu/en/policies/cra-standardisation): European Commission policy page, last update 31 July 2026, checked 2026-10-05.
- [Single Reporting Platform (SRP)](https://www.enisa.europa.eu/topics/product-security/single-reporting-platform-srp): ENISA topic page, platform operational from 11 September 2026, checked 2026-10-05.
- [Digital Omnibus proposal, COM(2025) 837](https://publications.europa.eu/resource/celex/52025PC0837): Commission proposal, 19.11.2025 (2025/0360(COD)), checked 2026-10-05.
- [Proposal on public contracts and concessions, COM(2026) 590](https://publications.europa.eu/resource/celex/52026PC0590): Commission proposal, 9.9.2026 (2026/0265(COD)), checked 2026-10-05.
