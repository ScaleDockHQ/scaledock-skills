# Versions and upgrades

Read this when choosing which AI RMF and profile versions to build to, reading a profile or policy written against an older text, adding the Generative AI Profile, or checking whether NIST has published the announced AI RMF revision. Sources: NIST AI 100-1, NIST AI 600-1, the NIST AI RMF page, the AIRC and Playbook pages, and the watch-item pages, listed in [Sources](../SKILL.md#sources).

## Version lines

| Id      | Line                                | Status  | Revision                                          | Posture | Summary                                                                                               |
| ------- | ----------------------------------- | ------- | ------------------------------------------------- | ------- | ----------------------------------------------------------------------------------------------------- |
| `1.0`   | AI RMF 1.0                          | current | NIST AI 100-1, January 2023                       |         | The framework: trustworthy characteristics, the Core of GOVERN, MAP, MEASURE, MANAGE, and profiles.   |
| `600-1` | NIST AI 600-1 Generative AI Profile | current | NIST AI 600-1, July 2024 (family `genai-profile`) |         | Cross-sectoral profile for generative AI: 12 GAI risks and suggested actions mapped to subcategories. |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows.

The AI RMF uses a two-number versioning system: the first number is the generation of the AI RMF and its companion documents and changes only with major revisions; minor revisions are tracked as `.n` (for example 1.1). Changes are tracked in a Version Control Table (AI 100-1, Update Schedule and Versions). The `genai-profile` family is versioned by its NIST AI publication number.

There is no preview line. As of 2026-10-05 the NIST AI RMF page states "The AI RMF 1.0 is being revised as part of the White House AI Action Plan", and the AIRC says the Playbook "will be updated after the AI RMF is revised", but NIST has published no revision text. Milestones without text are watch items, not version lines.

## Which version to use

- Build to AI RMF 1.0. Cite subcategories as they appear in AI 100-1 Tables 1 to 4.
- When any in-scope system is generative AI, add NIST AI 600-1 alongside AI RMF 1.0, not instead of it (AI 600-1 §3).
- Use the Playbook as published on the AIRC for suggested actions. It is updated separately from the AI RMF; NIST said it would review comments "on a semi-annual basis" (AI 100-1, Update Schedule and Versions). Record the date you read it.
- Do not adopt text from a concept note, preliminary draft or discussion draft as if it were part of a version line. See the watch items below.

## What changed

### AI RMF 1.0

- First released version, January 26, 2023 (NIST AI RMF page). It followed a concept paper (December 13, 2021), an initial draft (March 17, 2022) and a second draft (August 18, 2022), listed as Prior Documents on the NIST AI RMF page.
- Defines AI risk, the seven trustworthy characteristics (§3), the four functions with 19 GOVERN, 18 MAP, 22 MEASURE and 13 MANAGE subcategories (Tables 1 to 4), and use-case, temporal and cross-sectoral profiles (§6).
- AI 100-1 says a review with formal input from the AI community "is expected to take place no later than 2028".

### NIST AI 600-1 Generative AI Profile

- Released July 26, 2024 (NIST AI RMF page), the first cross-sectoral AI RMF profile, developed under Section 4.1(a)(i)(A) of EO 14110 (AI 600-1 §1, note 2).
- Adds 12 GAI risks (§2) and 213 suggested actions across 49 subcategories (§3), with the four primary considerations in Appendix A.
- AI 600-1 says future revisions "will include additional AI RMF subcategories, risks, and suggested actions" (§1).

## Upgrading

### AI RMF drafts (2021 to 2022) to AI RMF 1.0

The concept paper and the two 2022 drafts were pre-release drafts, not version lines. For a document written against one of them:

1. Replace every function, category and subcategory reference with the AI RMF 1.0 identifier from Tables 1 to 4. Do not assume a draft identifier carries over unchanged; look each outcome up in the 1.0 tables.
2. Remove any outcome that has no 1.0 counterpart, and note it as an organizational addition if you keep it.
3. Re-check the trustworthy characteristics against §3 of AI 100-1.
4. Keep behaviour unchanged: the same controls stay in place; only their mapping changes.

### AI RMF 1.0 profile to AI RMF 1.0 plus NIST AI 600-1

When a system starts using generative AI (a new LLM feature, a third-party foundation model, RAG):

1. Add the system to the inventory with the GAI attributes in GV-1.6-003.
2. For each of the 49 subcategories in AI 600-1, decide which actions apply to your AI actors and which of the 12 GAI risks are in scope; record the rest as not applicable with a reason.
3. Extend the Target Profile with those action IDs, and re-run MAP for the system (context, components, impacts).
4. Re-run MEASURE for the GAI risks in scope before the go/no-go decision (GV-1.3-002, MANAGE 1.1).

### AI RMF 1.0 to a future revision

When NIST publishes revision text: add it as a preview with posture `track` while it is a draft; when final, make it current, decide whether 1.0 stays supported, and add an upgrade section here that maps every changed subcategory. Then refresh the Playbook pin, since NIST plans to update the Playbook after the revision.

## Watch items

Not version lines: none of these has final text that this skill teaches.

- **AI RMF revision.** Announced on the NIST AI RMF page and the AIRC ("being revised as part of the White House AI Action Plan"); no draft published as of 2026-10-05.
- **AI RMF Profile on Trustworthy AI in Critical Infrastructure.** Concept note released April 7, 2026; project status ongoing, with discussion drafts shared through a community of interest.
- **Cyber AI Profile (NIST IR 8596).** Initial Preliminary Draft, December 16, 2025, comments closed January 30, 2026. A Cybersecurity Framework 2.0 community profile with three focus areas: Secure, Defend, Thwart. Comments inform an initial public draft.
- **SP 800-53 Control Overlays for Securing AI Systems (COSAiS).** Concept paper, August 14, 2025, and an annotated outline (discussion draft) for "Using and Fine-Tuning Predictive AI", January 8, 2026. Proposed use cases: generative AI assistants and LLMs, predictive AI, single-agent and multi-agent systems, and controls for AI developers.

When one of these becomes final and is an AI RMF profile or overlay, consider adding it as a new `family` with its own current line.
