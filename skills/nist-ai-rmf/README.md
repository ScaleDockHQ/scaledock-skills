# nist-ai-rmf

An agent skill for the NIST AI Risk Management Framework, AI RMF 1.0 (NIST AI 100-1), and its Generative AI Profile (NIST AI 600-1): build an AI risk program, write AI RMF profiles and map controls to the GOVERN, MAP, MEASURE and MANAGE subcategories. Not legal advice.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill nist-ai-rmf
```

Then ask your agent to "set up an AI risk program based on the NIST AI RMF", "map our AI policies to AI RMF subcategories" or "apply the NIST Generative AI Profile to our LLM feature".

## What it covers

- Framing AI risk, risk tolerance and prioritization, and the AI actors across the lifecycle.
- The seven trustworthy AI characteristics and how MEASURE evaluates each.
- All 72 GOVERN, MAP, MEASURE and MANAGE categories and subcategories, with AI RMF Playbook suggested actions quoted as published.
- The NIST AI 600-1 Generative AI Profile: the 12 GAI risks, the GV/MP/MS/MG action IDs and which subcategories they cover, and its primary considerations (governance, pre-deployment testing and red-teaming, content provenance, incident disclosure).
- Use-case, temporal and cross-sectoral profiles, current and target profiles, gap analysis, and control mapping with evidence.
- Watch items: the announced AI RMF revision, the critical infrastructure profile, the Cyber AI Profile and the SP 800-53 AI control overlays.

## Versions

| Line                                | Status                           |
| ----------------------------------- | -------------------------------- |
| AI RMF 1.0                          | current                          |
| NIST AI 600-1 Generative AI Profile | current (family `genai-profile`) |

NIST has announced a revision of AI RMF 1.0 but has published no draft text, so there is no preview line. `references/versions.md` says which line to use, how to add the Generative AI Profile to an existing profile, and what to watch.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [NIST AI 100-1 (AI RMF 1.0)](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf): Final, January 2023.
- [NIST AI 600-1 (Generative AI Profile)](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf): Final, July 2024.
- [NIST AI RMF Playbook](https://airc.nist.gov/airmf-resources/playbook/) and its [PDF](https://airc.nist.gov/docs/AI_RMF_Playbook.pdf): companion resource, PDF dated 2024-08-02.
- The [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework) page and the [NIST AI Resource Center](https://airc.nist.gov/), checked 2026-10-05.
- Watch items: the [critical infrastructure profile concept note](https://www.nist.gov/programs-projects/concept-note-ai-rmf-profile-trustworthy-ai-critical-infrastructure), the [Cyber AI Profile (NIST IR 8596)](https://csrc.nist.gov/pubs/ir/8596/iprd) and [COSAiS](https://csrc.nist.gov/projects/cosais).

## License

MIT
