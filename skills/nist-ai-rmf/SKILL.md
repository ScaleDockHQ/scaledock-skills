---
name: nist-ai-rmf
description: >-
  NIST AI RMF 1.0 (NIST AI 100-1): build AI risk programs, map controls to the
  GOVERN, MAP, MEASURE and MANAGE subcategories, and write AI RMF profiles. Covers
  the seven trustworthy AI characteristics, all 72 subcategories (GOVERN 1.1 to
  MANAGE 4.3), current and target profiles, the AI RMF
  Playbook's suggested actions as published, and the NIST AI 600-1 Generative AI
  Profile: its 12 GAI risks (CBRN information, confabulation, dangerous or hateful
  content, data privacy, environmental, harmful bias and homogenization, human-AI
  configuration, information integrity, information security, intellectual
  property, obscene or abusive content, value chain) and its suggested actions
  (GV-1.1-001 style IDs). Use when setting up AI governance, an AI system
  inventory, risk tolerance, go/no-go decisions, TEVV and red-teaming plans,
  third-party AI risk, incident handling, or a control crosswalk. Targets AI RMF
  1.0 (January 2023) and NIST AI 600-1 (July 2024); tracks the announced AI RMF
  revision. Not legal advice.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.0"
  kind: standard
---

# NIST AI Risk Management Framework

The NIST AI Risk Management Framework (AI RMF), published by the US National Institute of Standards and Technology as NIST AI 100-1, is a voluntary, outcome-based framework for managing AI risks. NIST AI 600-1 is its Generative AI Profile. This skill produces an AI risk program, a profile, a control mapping or a review whose every outcome cites the published subcategory or action it comes from. It is not legal advice.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources), with the section, table or subcategory it cites. The AI RMF is voluntary and uses "should", not MUST; the invariants below are the rules this skill holds its output to, each traced to the text. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: the organization's AI actor role for the work (AI 100-1 Appendix A): designer or developer, deployer or operator, acquirer of third-party AI (procurement), TEVV or impact assessor, or governance and oversight.
- Scope: organization-wide program (GOVERN first), one AI system (MAP, MEASURE, MANAGE for it), or a sector or use-case profile.
- Generative AI: whether any in-scope system is, embeds or fine-tunes a generative model. If yes, NIST AI 600-1 applies alongside the AI RMF.
- Risk tolerance: the organization's existing risk criteria and any sector or legal requirements that set them. The AI RMF does not supply one.
- Target version: AI RMF 1.0 (current, the default) and, for generative AI, NIST AI 600-1 Generative AI Profile (current, family `genai-profile`). There is no preview: the announced AI RMF revision has no published text. See [`references/versions.md`](references/versions.md).
- Revision: the pinned revisions in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill or when a rule looks out of date, re-read the NIST AI RMF page and the AIRC for a revised AI RMF, a revised Playbook or a new final profile, then every URL in [Sources](#sources). Update the pins and bump the version.

## Invariants

1. **Cite outcomes exactly as published.** Use the function name and number from Tables 1 to 4 (for example GOVERN 1.1, MEASURE 2.11) and AI 600-1 action IDs in the form GV-1.1-001 (AI 600-1 §3). There are 72 subcategories; never invent one or an action ID.
2. **GOVERN comes first and runs throughout.** "Assuming a governance structure is in place, functions may be performed in any order"; after GOVERN, most users start with MAP (AI 100-1 §5). GOVERN is cross-cutting (§5.1).
3. **Not a checklist.** Core actions "do not constitute a checklist, nor are they necessarily an ordered set of steps" (§5), and the Playbook "is neither a checklist nor set of steps to be followed in its entirety" (Playbook). Selecting subcategories is allowed; record what is left out and why.
4. **The organization owns the risk tolerance.** The AI RMF "does not prescribe risk tolerance"; follow existing regulations and guidelines, and where none exist define a reasonable tolerance (§1.2.2). Document it (MAP 1.5) and scale risk management to it (GOVERN 1.3).
5. **Decide go or no-go, and stop when risk is unacceptable.** MAP ends with an initial go/no-go decision (§5.2), MANAGE 1.1 decides whether to proceed, and where risk is unacceptable development and deployment "should cease in a safe manner until risks can be sufficiently managed" (§1.2.3).
6. **Unmeasured is not low risk.** Not being able to measure a risk "does not imply that an AI system necessarily poses either a high or low risk" (§1.2.1). Document risks that will not or cannot be measured (MEASURE 1.1).
7. **Balance the trustworthy characteristics.** Valid and reliable is the base; accountable and transparent relates to all others (§3, Figure 4). Resolve trade-offs in a way that is "transparent and appropriately justifiable" (§3).
8. **Independent assessment.** Assessments involve internal experts who were not front-line developers and/or independent assessors (MEASURE 1.3); for GAI, structured feedback exercisers are not developers of the same model (MS-1.3-003).
9. **Third parties are in scope.** Map, govern and manage third-party data, models and software (GOVERN 6, MAP 4, MANAGE 3); all AI actors manage risk in the systems they develop, deploy or use, including integrated components (§1.2.1).
10. **Document residual risk and a way out.** Document negative residual risk for downstream acquirers and end users (MANAGE 1.4) and keep mechanisms to supersede, disengage or deactivate a system (MANAGE 2.4).
11. **Generative AI adds, never replaces.** AI 600-1 actions apply in addition to the AI RMF and Playbook (AI 600-1 §3), cover only some subcategories, and do not apply to every AI actor (AI 600-1 §3).
12. **Suggestions stay suggestions.** Quote Playbook and AI 600-1 actions as published with their subcategory or ID; do not restate them as NIST requirements or claim NIST certification.
13. **Not legal advice.** The AI RMF is "law- and regulation-agnostic" (Appendix D). Record legal and regulatory requirements under GOVERN 1.1 and route their interpretation to counsel.

## Workflow

1. **Pick the version.** Target AI RMF 1.0; add NIST AI 600-1 when any in-scope system is generative AI. Check the NIST AI RMF page for a published revision.
   -> [`references/versions.md`](references/versions.md)
   ✓ The target lines and the date the sources were read are recorded, and nothing is cited from a concept note or draft.
2. **Set up GOVERN.** Legal requirements, trustworthiness in policy, risk tolerance and tiers, review cadence, AI system inventory, decommissioning, roles and executive accountability, training, diverse teams, human-AI oversight roles, incident and testing practices, external feedback, third-party policies.
   -> [`references/functions-govern-map.md`](references/functions-govern-map.md)
   ✓ Each GOVERN subcategory in scope has an owner, a policy or practice, and evidence, or a recorded reason it is out of scope.
3. **MAP each system.** Context and intended purpose, categorization, knowledge limits and human oversight, benefits and costs, components including third parties, and impacts with likelihood and magnitude.
   -> [`references/functions-govern-map.md`](references/functions-govern-map.md)
   ✓ An initial go/no-go decision is recorded with the MAP evidence it relied on.
4. **MEASURE.** Select metrics starting with the most significant risks, run TEVV on realistic test sets, evaluate each trustworthy characteristic, monitor in production, track emergent risks, and set up feedback and appeal channels.
   -> [`references/functions-measure-manage.md`](references/functions-measure-manage.md)
   ✓ Every mapped risk has a metric or a documented reason it is not measured, and at least one assessor is independent of the developers.
5. **MANAGE.** Prioritize, choose a response (mitigate, transfer, avoid, accept), document residual risk, plan deactivation and fallback, manage third-party and pre-trained model risk, and run post-deployment monitoring and incident communication.
   -> [`references/functions-measure-manage.md`](references/functions-measure-manage.md)
   ✓ High-priority risks have a documented response and owner, and a tested deactivation path exists.
6. **Apply the Generative AI Profile** (generative AI only). Pick the GAI risks in scope, then the AI 600-1 actions that fit your AI actors for the 49 subcategories it covers.
   -> [`references/genai-profile.md`](references/genai-profile.md)
   ✓ Each in-scope GAI risk is linked to at least one action ID and a measurement, and fine-tuned or RAG systems are re-assessed.
7. **Build the profile and map controls.** Write Current and Target Profiles, the gap analysis and action plan, and map existing controls to subcategories with evidence.
   -> [`references/building-a-profile.md`](references/building-a-profile.md)
   ✓ Every selected subcategory has current state, target, gap, owner and evidence; every mapping cites the subcategory text.
8. **Upgrade** (only when asked, or when NIST publishes a revision). Remap identifiers, or add AI 600-1 to an existing AI RMF profile.
   -> [`references/versions.md`](references/versions.md)
   ✓ No identifier is left pointing at a draft or superseded text, and the controls in place are unchanged by the remapping.

## Verify before done

- [ ] Every subcategory ID matches AI 100-1 Tables 1 to 4, and every action ID matches an AI 600-1 table row.
- [ ] The risk tolerance is stated, sourced and attributed to the organization, not to NIST.
- [ ] Out-of-scope subcategories are listed with a reason.
- [ ] A go/no-go decision and the criteria for halting or deactivating the system are recorded.
- [ ] Unmeasured risks are listed with the reason they are not measured.
- [ ] Third-party data, pre-trained models and software appear in MAP, MEASURE and MANAGE outcomes.
- [ ] For generative AI, the in-scope GAI risks are named from the 12 in AI 600-1 §2 and linked to actions.
- [ ] Playbook and AI 600-1 actions are quoted as suggestions, and nothing claims legal compliance or NIST certification.
- [ ] Nothing is taken from the watch items in `references/versions.md` as if it were final.

## Reference index

- **`references/versions.md`**: AI RMF 1.0 and the `genai-profile` family, which to use, what each contains, upgrade paths, and watch items (the AI RMF revision, the critical infrastructure profile, the Cyber AI Profile, COSAiS). Load for steps 1 and 8.
- **`references/functions-govern-map.md`**: risk framing, tolerance and prioritization, AI actors, every GOVERN and MAP subcategory, and Playbook examples. Load for steps 2 and 3.
- **`references/functions-measure-manage.md`**: the seven trustworthy characteristics, every MEASURE and MANAGE subcategory, human-AI configuration, and Playbook examples. Load for steps 4 and 5.
- **`references/genai-profile.md`**: the 12 GAI risks with their characteristics, the action ID scheme, which subcategories have actions, actions by theme, and the primary considerations. Load for step 6.
- **`references/building-a-profile.md`**: profile types, current and target profiles, gap analysis, a working record per subcategory, and control mapping. Load for step 7.

## Related skills

- `eu-ai-act`, for the legal obligations an AI risk program may need to meet: `npx skills add ScaleDockHQ/scaledock-skills --skill eu-ai-act`
- `mitre-atlas`, for adversarial techniques against AI systems when planning MEASURE 2.7 and red-teaming: `npx skills add ScaleDockHQ/scaledock-skills --skill mitre-atlas`
- `owasp-llm`, for LLM application risks such as prompt injection: `npx skills add ScaleDockHQ/scaledock-skills --skill owasp-llm`
- `owasp-agentic`, for risks of AI agent systems: `npx skills add ScaleDockHQ/scaledock-skills --skill owasp-agentic`
- `c2pa`, for content provenance metadata behind the AI 600-1 provenance actions: `npx skills add ScaleDockHQ/scaledock-skills --skill c2pa`

## Sources

Status uses the publishing body's own maturity term. Checked is the date the source was last read.

- [NIST AI 100-1: Artificial Intelligence Risk Management Framework (AI RMF 1.0)](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf): Final, AI RMF 1.0, January 2023, checked 2026-10-05.
- [NIST AI 600-1: Artificial Intelligence Risk Management Framework: Generative Artificial Intelligence Profile](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf): Final, July 2024, checked 2026-10-05.
- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework): Web page, states AI RMF 1.0 is being revised; critical infrastructure profile concept note of 2026-04-07, checked 2026-10-05.
- [NIST AI Resource Center (AIRC)](https://airc.nist.gov/): Web page, notes AI RMF 1.0 is being revised and the Playbook will follow, checked 2026-10-05.
- [NIST AI RMF Playbook](https://airc.nist.gov/airmf-resources/playbook/): Companion resource, online Playbook for AI RMF 1.0 covering 72 subcategories, checked 2026-10-05.
- [NIST AI RMF Playbook (PDF)](https://airc.nist.gov/docs/AI_RMF_Playbook.pdf): Companion resource, 142 pages, PDF dated 2024-08-02, checked 2026-10-05.
- [Concept Note: AI RMF Profile on Trustworthy AI in Critical Infrastructure](https://www.nist.gov/programs-projects/concept-note-ai-rmf-profile-trustworthy-ai-critical-infrastructure): Concept note (watch item), released 2026-04-07, checked 2026-10-05.
- [NIST IR 8596: Cyber AI Profile](https://csrc.nist.gov/pubs/ir/8596/iprd): Initial Preliminary Draft (watch item), 2025-12-16, checked 2026-10-05.
- [SP 800-53 Control Overlays for Securing AI Systems (COSAiS)](https://csrc.nist.gov/projects/cosais): Project page (watch item), concept paper 2025-08-14 and annotated outline 2026-01-08, checked 2026-10-05.
