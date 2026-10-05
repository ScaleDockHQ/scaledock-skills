---
name: eu-ai-act
description: "EU AI Act, Regulation (EU) 2024/1689: classify AI systems and turn the engineering obligations into requirements, following the consolidated text of 27 July 2026 with the Digital Omnibus (Regulation (EU) 2026/1744); upgrades plans built on the original text. Covers prohibited practices (Art. 5), high-risk classification (Art. 6, Annex III), high-risk requirements (Arts. 9 to 15, Annex IV), logging and log retention, transparency and AI-content marking (Art. 50), general-purpose AI model obligations (Arts. 53 to 55) and the application dates (Art. 113). Use when scoping an AI feature for the EU, deciding whether a system is high-risk, designing logs, human oversight or technical documentation, adding chatbot disclosure or deepfake labelling, or planning against deadlines. Not legal advice. Triggers: AI Act, Artificial Intelligence Act, 2024/1689, Digital Omnibus, high-risk AI system, Annex III, Annex IV, GPAI, systemic risk, code of practice, Article 50, deep fake, AI literacy, provider, deployer."
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.1.1"
  kind: standard
---

# EU AI Act

Regulation (EU) 2024/1689, the Artificial Intelligence Act, lays down harmonised rules for AI systems and general-purpose AI models in the EU. Regulation (EU) 2026/1744, the Digital Omnibus on AI, amended it with effect from 27 July 2026. With this skill the agent classifies a system, finds the obligations that apply to the user's role, and turns them into engineering requirements and checks.

> **Not legal advice.** This skill summarises the regulation for engineering work. It does not decide whether or how the AI Act applies to a specific system or organisation. Involve qualified legal counsel for classification decisions, conformity assessment, contracts and anything with regulatory consequences. Only the Official Journal text is authentic; the consolidated text has no legal effect.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources), with the article it cites. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: provider, deployer, importer, distributor or authorised representative (Art. 3), and whether the subject is an AI system or a general-purpose AI model.
- System: intended purpose, users, affected persons, and whether it is a safety component of a product under Annex I.
- Target version: the consolidated text of 27 July 2026 (default), which incorporates Regulation (EU) 2026/1744. The original text of 12 July 2024 is legacy: read it only to understand and correct older material, never plan against its dates. There is no supported text and no preview. See [`references/versions.md`](references/versions.md).
- Revision: Regulation (EU) 2024/1689 as published in OJ L 2024/1689 of 12.7.2024, read with the consolidated text of 27.07.2026, which incorporates Regulation (EU) 2026/1744.
- Sources: when refreshing, re-read every URL in [Sources](#sources), check the Publications Office for a newer consolidated version or new amending acts and corrigenda, and update the pins.

## Invariants

1. **Prohibited practices are not built** (Art. 5(1)), including the Omnibus additions on non-consensual intimate deepfakes and child sexual abuse material, which apply from 2 December 2026 (Art. 5(1)(ba), (bb); Art. 113(a)).
2. **High-risk follows Art. 6**: a safety component or product under Annex I, or a use listed in Annex III. An Annex III system can fall outside high-risk only under an Art. 6(3) condition, never when it profiles natural persons, and the provider documents that assessment and registers (Art. 6(3), (4)).
3. **High-risk systems meet Arts. 9 to 15**: risk management, data governance, technical documentation per Annex IV, automatic logging, instructions for use, human oversight, and accuracy, robustness and cybersecurity.
4. **Logs are automatic and kept**: high-risk systems technically allow automatic recording of events over their lifetime (Art. 12(1)); providers and deployers keep the logs under their control for at least six months unless other law provides otherwise (Art. 19(1), Art. 26(6)).
5. **People know when AI is involved**: disclose AI interaction, mark synthetic content in a machine-readable and detectable way, and disclose deep fakes, no later than the first interaction or exposure (Art. 50(1), (2), (4), (5)).
6. **GPAI model providers document and publish**: technical documentation, downstream information, a copyright policy and a public training-content summary (Art. 53(1)); systemic-risk models add evaluation, risk mitigation, incident reporting and cybersecurity (Art. 55(1)).
7. **Dates come from Art. 113 of the consolidated text**, not from older summaries: the Omnibus moved the high-risk dates to 2 December 2027 (Annex III) and 2 August 2028 (Annex I).

## Workflow

1. **Pick the version.** Work from the consolidated text of 27 July 2026, and check the Publications Office for a newer consolidated version or amending act.
   -> [`references/versions.md`](references/versions.md)
   ✓ The deliverable names the text it relies on, and no date comes from the original text.
2. **Establish role and scope.** Identify the operator role and whether the subject is an AI system, a GPAI model, or both.
   -> [`references/classification.md`](references/classification.md)
   ✓ The role, intended purpose and subject type are written down and reviewed by counsel.
3. **Screen for prohibited practices.** Check the intended purpose and foreseeable use against Art. 5.
   -> [`references/classification.md`](references/classification.md)
   ✓ Each Art. 5 point is marked not applicable, with a reason.
4. **Classify the risk.** Apply Art. 6 with Annex I and Annex III, and record any Art. 6(3) assessment.
   -> [`references/classification.md`](references/classification.md)
   ✓ The classification and its reasoning are documented.
5. **For high-risk systems, turn Arts. 9 to 15 into requirements.** Map each article to design, test and documentation tasks, and build the Annex IV file.
   -> [`references/high-risk.md`](references/high-risk.md)
   ✓ Every Annex IV point has an owner and an artefact.
6. **Design logging.** Define the events, fields, retention and access for Art. 12, Art. 19 and Art. 26(6).
   -> [`references/logging.md`](references/logging.md)
   ✓ A log schema exists and retention is at least six months unless other law says otherwise.
7. **Apply transparency.** Add AI-interaction notices, machine-readable marking, and deep-fake and public-interest text disclosure where Art. 50 applies.
   -> [`references/transparency.md`](references/transparency.md)
   ✓ The notice appears at the first interaction or exposure, and outputs carry a detectable mark.
8. **For GPAI models, meet Arts. 53 to 55.** Prepare Annex XI and Annex XII documentation, the copyright policy and the training-content summary, and consider the code of practice.
   -> [`references/gpai.md`](references/gpai.md)
   ✓ Each Art. 53(1) item has an artefact.
9. **Plan against the dates.** Place each obligation on the Art. 113 and Art. 111 timeline.
   -> [`references/timeline.md`](references/timeline.md)
   ✓ The plan cites the consolidated Art. 113 dates.
10. **Upgrade** (only when asked). Bring a plan, classification or summary written against the original text up to the consolidated text.
    -> [`references/versions.md`](references/versions.md), [`references/timeline.md`](references/timeline.md)
    ✓ Every date and citation points at the consolidated text, and no built control was dropped because a deadline moved.

## Verify before done

- [ ] The not-legal-advice notice and the counsel review are recorded in the deliverable.
- [ ] Every Art. 5 practice is ruled out with a reason.
- [ ] The Art. 6 classification cites Annex I or Annex III, or the Art. 6(3) condition used.
- [ ] High-risk: Arts. 9 to 15 each map to requirements, and Annex IV points 1 to 9 each map to an artefact.
- [ ] Logs cover Art. 12(2)(a) to (c), and retention is at least six months.
- [ ] Art. 50 notices and marking are in place where they apply.
- [ ] Dates match the consolidated Art. 113.

## Reference index

- **`references/versions.md`**: the consolidated and original texts with their status, which one to use, what the Omnibus changed, the corrigenda, and the upgrade checklist. Load for steps 1 and 10.
- **`references/classification.md`**: roles, Art. 5 prohibitions, Art. 6 and Annex III, and the risk levels. Load for steps 2 to 4.
- **`references/high-risk.md`**: Arts. 9 to 17, 26, 27, 72 and 73, and Annex IV. Load for step 5.
- **`references/logging.md`**: Art. 12, Art. 19 and Art. 26(6), and a log event design. Load for step 6.
- **`references/transparency.md`**: Art. 50, Art. 111(4) and the marking code of practice. Load for step 7.
- **`references/gpai.md`**: Arts. 51 to 56, Art. 111(3) and the GPAI code of practice. Load for step 8.
- **`references/timeline.md`**: Art. 113, Art. 111, the Omnibus and Art. 99 fines. Load for steps 9 and 10.

## Related skills

- `opentelemetry-genai` for tracing model and agent calls that feed Art. 12 logs: `npx skills add ScaleDockHQ/scaledock-skills --skill opentelemetry-genai`.
- `ocsf` for storing AI-system audit events in a security schema: `npx skills add ScaleDockHQ/scaledock-skills --skill ocsf`.
- `eu-cra` for the Cyber Resilience Act obligations on products with digital elements: `npx skills add ScaleDockHQ/scaledock-skills --skill eu-cra`.
- `c2pa` for Content Credentials that mark AI-generated content: `npx skills add ScaleDockHQ/scaledock-skills --skill c2pa`.
- `nist-ai-rmf` for structuring an AI risk management program with the NIST AI RMF: `npx skills add ScaleDockHQ/scaledock-skills --skill nist-ai-rmf`.

## Sources

Status uses the publishing body's own maturity term. Checked is the date the source was last read.

- [Regulation (EU) 2024/1689 (Artificial Intelligence Act), Official Journal text](https://publications.europa.eu/resource/celex/32024R1689): Regulation in force, OJ L 2024/1689 of 12.7.2024, checked 2026-10-05.
- [Regulation (EU) 2024/1689, consolidated text](https://publications.europa.eu/resource/celex/02024R1689-20260727): consolidated version (no legal effect), 27.07.2026 incorporating Regulation (EU) 2026/1744, checked 2026-10-05.
- [Publications Office SPARQL endpoint (Cellar metadata for 32024R1689)](https://publications.europa.eu/webapi/rdf/sparql): metadata service, lists consolidated versions 02024R1689-20240712 and 02024R1689-20260727, amending act 32026R1744 and corrigenda 32024R1689R(01) to R(04), checked 2026-10-05.
- [Regulation (EU) 2026/1744 (Digital Omnibus on AI)](https://publications.europa.eu/resource/celex/32026R1744): Regulation in force, OJ L 2026/1744 of 24.7.2026 (in force 27 July 2026), checked 2026-10-02.
- [AI Act: regulatory framework for AI](https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai): European Commission policy page, page updated 1 October 2026, checked 2026-10-02.
- [Contents of the General-Purpose AI Code of Practice](https://digital-strategy.ec.europa.eu/en/policies/contents-code-gpai): European Commission policy page, code published 10 July 2025 (page updated 31 July 2026), checked 2026-10-02.
- [Timeline for the implementation of the EU AI Act](https://ai-act-service-desk.ec.europa.eu/en/ai-act/timeline/timeline-implementation-eu-ai-act): AI Act Service Desk page, includes the Digital Omnibus amendments, checked 2026-10-02.
