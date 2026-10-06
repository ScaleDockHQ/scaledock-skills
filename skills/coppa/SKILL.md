---
name: coppa
description: >-
  COPPA: From the Federal Register Online via the Government Publishing Office [ www.gpo.gov ] Covers COPPA Rule 2025. Use when applying the Children's Online Privacy Protection Rule. Triggers: COPPA.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.0"
  kind: standard
---

# COPPA

From the Federal Register Online via the Government Publishing Office [ www.gpo.gov ]

The publisher of the pinned text is named in [Sources](#sources). With this skill the agent applies that text: when applying the Children's Online Privacy Protection Rule.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources). Quoted requirements are sentences taken from the pinned text. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: producer or consumer of this specification.
- Target version: COPPA Rule 2025 (default). See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill, re-read every URL in [Sources](#sources) and check the publisher index for a newer revision or version line.

## Invariants

1. **document.** "The Commission also asked a question about what types of services should be considered to have an educational purpose."
2. **document.** "The Commission's Proposal Regarding `Mixed Audience Website or Online Service'' The Commission proposed a new stand-alone definition for `mixed audience website or online service'' as ``a website or online service that is directed to children under the criteria set forth in paragraph (1) of the definition of website or online service directed to children, but that does not target children as…"
3. **document.** "--------------------------------------------------------------------------- A number of commenters asked for additional guidance about when websites and online services will be considered general audience, primarily child-directed, or mixed audience.\32\ The Commission directs these commenters to earlier staff guidance, which explains that operators should analyze who their intended audience is,…"
4. **document.** "--------------------------------------------------------------------------- One commenter urged the Commission to state that general audience and mixed audience websites and online services containing ``kid- friendly portions'' of content or services are not primarily child- directed.\35\ This request for clarification is somewhat unclear, as it is not apparent to the Commission what the…"
5. **document.** "Another industry commenter contended that a general audience website or online service ``should not become a mixed audience property just because the property does not include mature content and is presented as appropriate for children.'' \37\ In response, the Commission notes that it agrees that a general audience website or online service, or portion thereof, is not necessarily child-directed…"
6. **document.** "of information, which the commenter indicated should not be necessary to achieve the goal of determining users' ages; the commenter favored alternative age verification strategies that avoid retention of age information.\40\ In response, the Commission notes that it disagrees that collection of age information necessarily requires retention of the exact age of a visitor or user,\41\ or that…"
7. **document.** "Another commenter argued the Commission should require the use of ``privacy-protected age estimation methods to determine the likely age of users'' rather than including an age verification requirement that would require additional personal data collection and management.\42\ Other commenters suggested the Rule should require additional methods of verification when operators of mixed audience…"
8. **document.** "\43\ See, e.g., Motley Rice, at 13 (suggesting Commission should require COPPA-compliant measures to corroborate self-declarations of age because of falsification risks)."

## Workflow

1. **Pick the version.** Use the current line unless a named consumer needs a supported one. Do not author a legacy line. Emit a preview only when its posture is build and the user asked for that draft.
   -> [`references/versions.md`](references/versions.md)
   ✓ The target version is recorded, and it is not a legacy line.
2. **Apply the pinned requirements.** Walk the quotes in [`references/requirements.md`](references/requirements.md) and implement each one that applies to the role.
   -> [`references/requirements.md`](references/requirements.md)
   ✓ Each applicable quote is either implemented or recorded as out of scope for the role, with the heading it came from.
3. **Upgrade** (only when asked). Follow the upgrade section from the source line to the target.
   -> [`references/versions.md`](references/versions.md)
   ✓ The result cites the target line and no longer depends on a requirement that only the old line stated.

## Verify before done

- [ ] The artifact cites the target line's revision from [Sources](#sources).
- [ ] Every applicable quoted requirement in [`references/requirements.md`](references/requirements.md) holds.
- [ ] Nothing from a preview line is emitted unless its posture is build and the user opted in.

## Reference index

- **`references/versions.md`**: every version line, which one to use, and how to upgrade. Load for steps 1 and 3.
- **`references/requirements.md`**: quotes taken from the pinned specification. Load for step 2.

## Related skills

Install related spec skills by name with `npx skills add ScaleDockHQ/scaledock-skills --skill <name>`.

## Sources

Status uses the publishing body's own maturity term. Checked is the date the source was last read.

- [COPPA Rule 2025](https://www.govinfo.gov/content/pkg/FR-2025-04-22/html/2025-05904.htm): Federal Register, Children's Online Privacy Protection Rule, 90 FR 16918, fetched 2026-10-06 (Federal Register, 2026-10-06), checked 2026-10-06.
