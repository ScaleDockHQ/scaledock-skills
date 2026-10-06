---
name: cpe
description: >-
  CPE 2.3: name and match IT platforms, software and hardware with Common Platform Enumeration identifiers. Covers CPE 2.3. Use when naming IT products with CPE. Triggers: CPE.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.1"
  kind: standard
---

# CPE

The Information Technology Laboratory (ITL) at the National Institute of Standards and Technology

The publisher of the pinned text is named in [Sources](#sources). With this skill the agent applies that text: when naming IT products with CPE.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources). Quoted requirements are sentences taken from the pinned text. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: producer or consumer of this specification.
- Target version: CPE 2.3 (default). See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill, re-read every URL in [Sources](#sources) and check the publisher index for a newer revision or version line.

## Invariants

1. **document.** "1.3 Document Conventions The key words “MUST”, “MUST NOT”, “REQUIRED”, “SHALL”, “SHALL NOT”, “SHOULD”, “SHOULD NOT”, “RECOMMENDED”, “MAY”, and “OPTIONAL” in this document are to be interpreted as described in [RFC2119]."
2. **document.** "An implementation MUST make an explicit claim of conformance to this specification in any documentation provided to end users."
3. **document.** "If the implementation produces (i.e., generates as an output) CPE names, it MUST produce syntactically correct formatted string bindings as needed to describe or identify applications, operating systems, and hardware devices (cf."
4. **document.** "If the implementation produces CPE names in URI form, it MUST produce URIs that adhere to the syntax rules specified in Figure 6-1, and it SHOULD produce URIs that adhere to the more constrained rules specified in Figure 6-2."
5. **document.** "If the implementation consumes (i.e., accepts as valid input) CPE names, (a) it MUST consume syntactically correct formatted string bindings as needed to describe or identify applications, operating systems, and hardware devices (cf."
6. **document.** "6.2); (b) it SHOULD be able to consume any CPE name that meets the syntax requirements specified in Figure 6-1 or Figure 6-2; and (c) it SHOULD be able to convert input CPE names in URI form to syntactically correct formatted string bindings (cf."
7. **document.** "An implementation that offers this functionality SHOULD implement the procedure defined in Section 7.2."
8. **document.** "Lexical case SHALL NOT distinguish attributes from one another, e.g., the attributes Foo, foo, FOO, etc., SHALL be considered equivalent."

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

- [CPE 2.3](https://nvlpubs.nist.gov/nistpubs/Legacy/IR/nistir7695.pdf): NIST IR, NIST IR 7695, fetched 2026-10-06 (NIST IR, 2026-10-06), checked 2026-10-06.
