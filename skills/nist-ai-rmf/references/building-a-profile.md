# Building an AI RMF profile and mapping controls

Read this when writing an AI RMF profile for an organization, sector or AI system, running a current-versus-target gap analysis, or mapping existing controls and policies to AI RMF subcategories. Sources: NIST AI 100-1 §4, §5 and §6 and Appendix D, NIST AI 600-1 §1 and §3, the AI RMF Playbook and the AIRC, listed in [Sources](../SKILL.md#sources).

## Profile types (AI 100-1 §6)

| Type                              | What it is                                                                                                                                                                                                                       |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Use-case profile                  | The AI RMF functions, categories and subcategories implemented for a specific setting or application, based on the user's requirements, risk tolerance and resources (examples given: a hiring profile, a fair housing profile). |
| Temporal profile: Current Profile | "how AI is currently being managed and the related risks in terms of current outcomes".                                                                                                                                          |
| Temporal profile: Target Profile  | "the outcomes needed to achieve the desired or target AI risk management goals".                                                                                                                                                 |
| Cross-sectoral profile            | Risks of models or applications usable across use cases or sectors, or of common activities such as "the use of large language models, cloud-based services or acquisition". NIST AI 600-1 is one (AI 600-1 §1).                 |

"This Framework does not prescribe profile templates, allowing for flexibility in implementation" (§6). The record shape below is a working format, not a NIST template.

## Steps

1. **Set the scope and owner.** Name the organization, sector or system the profile covers, its profile type, and the executive who owns risk decisions (GOVERN 2.3).
2. **Record the inputs that drive selection.** Applicable legal and regulatory requirements (GOVERN 1.1), risk tolerance and its source (§1.2.2, MAP 1.5), the AI actors involved (Appendix A of AI 100-1), and whether any system is generative AI.
3. **Select subcategories.** Start from all 72. Users "may choose to select from among the categories and subcategories" (§5); record each one you leave out and why, so the gap is visible rather than silent.
4. **Add the companion profile.** For generative AI, attach the AI 600-1 actions for the 49 subcategories it covers, filtered by which actors and GAI risks apply (AI 600-1 §3). See [`genai-profile.md`](genai-profile.md).
5. **Write the Current Profile.** For each selected subcategory, state the outcome achieved today and the evidence: policy, procedure, test report, log, contract clause or record.
6. **Write the Target Profile.** For each selected subcategory, state the outcome needed. Draw candidate practices from the Playbook suggested actions and, for GAI, the AI 600-1 actions, citing their IDs.
7. **Analyze gaps and plan.** "Comparing Current and Target Profiles likely reveals gaps to be addressed"; action plans address the gaps, prioritized by "the user's needs and risk management processes" (§6). Estimate the resources each gap needs (§6 mentions staffing and funding).
8. **Review on a schedule.** Set the review frequency (GOVERN 1.5) and re-run MAP when context, capabilities or risks change (§5.2). Periodically evaluate whether the AI RMF has improved the ability to manage AI risk (§4).

## A working record per subcategory

| Field      | Content                                                               |
| ---------- | --------------------------------------------------------------------- |
| `id`       | The subcategory exactly as published, for example `MEASURE 2.11`.     |
| `in_scope` | Yes, or no with the reason.                                           |
| `current`  | Outcome achieved today, with evidence links.                          |
| `target`   | Outcome needed, with the Playbook or AI 600-1 action IDs it draws on. |
| `gap`      | What is missing.                                                      |
| `controls` | The organization's controls or policies mapped to this subcategory.   |
| `owner`    | Role accountable for the outcome (GOVERN 2.1).                        |
| `priority` | From impact, likelihood and resources (MANAGE 1.2).                   |
| `due`      | Planned date for closing the gap.                                     |

## Mapping controls

- Map in the direction of outcomes: the Core is "outcome-focused and non-prescriptive" and offers "a catalog of outcomes and approaches rather than prescribe one-size-fits-all requirements" (Appendix D, attribute 7). A control satisfies a subcategory when its evidence shows the outcome, not because the names match.
- One control can serve several subcategories, and one subcategory usually needs several controls (for example an inventory policy, an owner and a review cadence for GOVERN 1.6).
- Use NIST's published crosswalks where they exist: the AIRC lists AI RMF crosswalks "Linking the AI RMF to other governance frameworks". Cite the crosswalk you use; do not invent a mapping and attribute it to NIST.
- For security and privacy subcategories, AI 100-1 Appendix B says frameworks such as the NIST Cybersecurity Framework, the Privacy Framework, the Risk Management Framework and the SSDF "may inform security and privacy considerations in the MAP, MEASURE, and MANAGE functions".
- The AI RMF is "law- and regulation-agnostic" (Appendix D, attribute 9). A mapping to the AI RMF is not evidence of legal compliance; record legal requirements under GOVERN 1.1 and get legal advice for them.

## Common mistakes

- Presenting the profile as certification or compliance with NIST. The AI RMF is voluntary (Executive Summary) and NIST does not certify against it in these sources.
- A Target Profile with every Playbook action marked required.
- Inventing subcategory or action IDs, or paraphrasing a subcategory so loosely that the mapping no longer matches the published outcome.
- No evidence column: a profile without evidence cannot show a current state.
- Leaving out the go/no-go and deactivation outcomes (MANAGE 1.1, MANAGE 2.4) because they are uncomfortable to commit to.
