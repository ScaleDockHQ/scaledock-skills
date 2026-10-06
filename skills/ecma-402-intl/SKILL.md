---
name: ecma-402-intl
description: >-
  ECMA-402 Internationalization API: + 6 Identification of Locales, Currencies, Time Zones, Measurement Units, Numbering Systems, Collations, and Calendars 6.1 Case Sensitivity and Case Mapping Covers ECMA-402 2026, ECMA-402 2025 (supported), ECMA-402 2024 (supported), ECMA-402 draft (track preview). Use when formatting numbers, dates or collation with Intl. Triggers: ECMA-402, Intl.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.0"
  kind: standard
---

# ECMA-402 Internationalization API

- 6 Identification of Locales, Currencies, Time Zones, Measurement Units, Numbering Systems, Collations, and Calendars 6.1 Case Sensitivity and Case Mapping

The publisher of the pinned text is named in [Sources](#sources). With this skill the agent applies that text: when formatting numbers, dates or collation with Intl.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources). Quoted requirements are sentences taken from the pinned text. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: producer or consumer of this specification.
- Target version: ECMA-402 2026 (default); ECMA-402 2025 (supported); ECMA-402 2024 (supported); ECMA-402 draft (preview, posture track: emit only when the user opts in and the posture is build). See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill, re-read every URL in [Sources](#sources) and check the publisher index for a newer revision or version line.

## Invariants

1. **Software License.** "SEE THE ECMA CODE OF CONDUCT IN PATENT MATTERS AVAILABLE AT https://ecma-international.org/memento/codeofconduct.htm FOR INFORMATION REGARDING THE LICENSING OF PATENT CLAIMS THAT ARE REQUIRED TO IMPLEMENT ECMA INTERNATIONAL STANDARDS."
2. **Software License.** "IN NO EVENT SHALL ECMA INTERNATIONAL BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)…"
3. **2 Conformance.** "A conforming implementation of this specification must conform to ECMA-262 , and must provide and support all the objects, properties, functions, and program semantics described in this specification."
4. **2 Conformance.** "Nothing in this specification is intended to allow behaviour that is otherwise prohibited by ECMA-262 , and any such conflict should be considered an editorial error rather than an override of constraints from ECMA-262 ."
5. **4.3 API Conventions.** "Every Intl constructor should behave as if defined by a class, throwing a TypeError exception when called as a function (without NewTarget)."
6. **4.4 Implementation Dependencies.** "In browser implementations the initial set of locales, currencies, calendars, numbering systems, and other enumerable items visible to a particular origin must be the same for all users sharing the same user agent string (engine and platform version)."
7. **4.4 Implementation Dependencies.** "Furthermore, dynamic changes to these sets must not result in users becoming distinguishable from each other."
8. **4.4 Implementation Dependencies.** "As a result of this constraint, the first time a browser implementation that allows on-demand locale installation receives a request from a particular origin that could require installing a new locale, it must not reveal whether or not that locale is already installed."

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

- [ECMA-402 2026](https://tc39.es/ecma402/2026/): ECMA-402 edition, ECMA-402 2026 (ECMA-402 edition, 2026), checked 2026-10-06.
- [ECMA-402 2025](https://tc39.es/ecma402/2025/): ECMA-402 edition, ECMA-402 2025 (ECMA-402 edition, 2025), checked 2026-10-06.
- [ECMA-402 2024](https://tc39.es/ecma402/2024/): ECMA-402 edition, ECMA-402 2024 (ECMA-402 edition, 2024), checked 2026-10-06.
- [ECMA-402 draft](https://tc39.es/ecma402/): Editor's draft, tc39.es/ecma402 (Editor's draft, 2026-10-06), checked 2026-10-06.
