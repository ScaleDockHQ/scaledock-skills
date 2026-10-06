---
name: infra
description: >-
  Infra: The Infra Standard aims to define the fundamental concepts upon which standards are built. Covers Infra Living Standard. Use when using the Infra primitives in a spec or implementation. Triggers: Infra Standard.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.0"
  kind: standard
---

# Infra

The Infra Standard aims to define the fundamental concepts upon which standards are built.

The publisher of the pinned text is named in [Sources](#sources). With this skill the agent applies that text: when using the Infra primitives in a spec or implementation.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources). Quoted requirements are sentences taken from the pinned text. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: producer or consumer of this specification.
- Target version: Infra Living Standard (default). See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill, re-read every URL in [Sources](#sources) and check the publisher index for a newer revision or version line.

## Invariants

1. **2.1. Conformance.** "The keywords "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "NOT RECOMMENDED", "MAY", and "OPTIONAL" are to be interpreted as described in RFC 2119."
2. **Infra.** "Developers should refer to the Living Standard for the most current error corrections and other developments."
3. **2.1. Conformance.** "Documents using this standard are encouraged to limit themselves to "must", "must not", "should", and "may", and to use these in their lowercase form as that is generally considered to be more readable."
4. **2.2. Compliance with other specifications.** "When this occurs, a document using the Infra Standard should denote such transgressions as a willful violation , and note the reason for that violation."
5. **2.4. Privacy concerns.** "Grouping requests in this manner, especially across multiple sites, can be used for malevolent purposes, e.g., governments combining information such as the person’s home address (determined from the addresses they use when getting driving directions on one site) with their apparent political affiliations (determined by examining the forum sites that they participate in) to determine whether the…"
6. **3.1. Conformance.** "Algorithms, and requirements phrased in the imperative as part of algorithms (such as "strip any leading spaces" or "return false") are to be interpreted with the meaning of the keyword (e.g., "must") used in introducing the algorithm or step."
7. **3.1. Conformance.** "If no such keyword is used, must is implied."
8. **3.1. Conformance.** "For example, were the spec to say: To eat an orange , the user must: Peel the orange."

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

- [Infra Living Standard](https://infra.spec.whatwg.org/review-drafts/2026-07/): Review Draft, Review Draft 2026-07 (Review Draft, 2026-07), checked 2026-10-06.
