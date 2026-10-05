# Versions and upgrades

Read this when choosing which revision of an OpenID Foundation specification to implement, meeting an implementation built on an Implementer's Draft, or moving it to the Final. This skill is an index, so its one version line is the OpenID Foundation Process that governs how every specification is versioned; the version lines of each specification live in the dedicated skills and in the family references. Sources: the OpenID Process Document v1.98 (Process), Developing an OpenID Standard, Explore All Specifications, and the specification documents cited below, listed in [Sources](../SKILL.md#sources).

## Version lines

| Id        | Line                      | Status  | Revision                                 | Posture | Summary                                                                                     |
| --------- | ------------------------- | ------- | ---------------------------------------- | ------- | ------------------------------------------------------------------------------------------- |
| `process` | OpenID Foundation Process | current | Process Document v1.98 (19 October 2024) |         | The life cycle every OpenID specification follows, from Work Group Draft to errata edition. |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows.

## How OpenID specifications are versioned

An OpenID specification goes through up to five stages: Contribution, Work Group Draft, Implementers Draft, Final Specification, and Final Specification Incorporating Errata Corrections (Process § 5.1).

- **Work Group Draft.** Adopted Contributions become a Work Group Draft, and every later iteration keeps that status until it is approved as an Implementer's Draft or a Final (Process § 5.1). Drafts are numbered in the document title and URL, for example "draft 49" at `openid-federation-1_0-49.html`, and a draft carries a Document History appendix that is removed from the Final. Editor's copies built from the working group repository, often on `openid.github.io`, are Work Group Drafts too.
- **Implementer's Draft.** A Work Group Draft approved by the working group and the membership (Process § 5.1, § 5.3, § 5.5). Implementer's Drafts are numbered in sequence and published at a `-ID<n>` URL, for example `openid-4-verifiable-presentations-1_0-ID2.html`, whose document still reads as a numbered draft (ID2 of OpenID4VP is draft 18). Any change after an Implementer's Draft is a new Work Group Draft (Process § 5.1, § 5.6). Work Group Drafts and Implementer's Drafts are marked "draft" on the first page (Process § 5.1).
- **Final Specification.** No Substantive Change may be made to a Final; a substantive change needs a successor version that goes through the process again (Process § 5.6). That is why new functionality arrives as a new minor or major version, such as OpenID Federation 1.1 or the OpenID4VCI 1.1 drafts, and never as an edit to 1.0.
- **Final Specification Incorporating Errata Corrections.** An errata set corrects errors or unclear text without adding or removing features (Process § 5.1). A working group may propose errata at most once every six months (Process § 5.6). Errata sets are numbered ("incorporating errata set 2"), and the unversioned URL serves the latest errata edition while the `-final` or `-errata<n>` URL keeps earlier text (invariant 5). Newer documents say so in an "Errata revisions" section and recommend citing the unversioned URL (OpenID4VP § 1.2, OpenID4VCI § 1.1).
- **Reviews and votes.** An Implementer's Draft or errata edition has a review period of at least 45 days, and a Final at least 60 days (Process § 5.2), followed by a membership vote with a 14-day notice period, a 14-day voting period and a quorum of the greater of 20% of members or 20 members, decided by simple majority (Process § 3.4, § 5.5). Developing an OpenID Standard summarises the same periods.

The Process itself is versioned (v1.98, 19 October 2024). A change to it needs a 21-day notice, a vote and Board concurrence, and applies only prospectively (Process § 3.4).

## Which version to use

For any OpenID specification:

1. Find it in the family reference ([Reference index](../SKILL.md#reference-index)) or its dedicated skill, and read its maturity.
2. If a Final exists, target the Final at its latest errata set, and cite the unversioned URL plus the errata set number.
3. If the newest text is an Implementer's Draft, target that `-ID<n>` URL and expect breaking changes before Final (invariant 4).
4. Track Work Group Drafts and editor's copies of a next version; do not ship interoperability promises on them.
5. Read an older Implementer's Draft or Final only to upgrade from it, unless a named ecosystem or certification profile still requires it. Check the conformance page: OpenID certification often accepts only the Final.

The version lines of each family, with their statuses, are in the dedicated skills. Install the one for the family:

| Family            | Skill               | Install                                                                 |
| ----------------- | ------------------- | ----------------------------------------------------------------------- |
| OpenID Connect    | `openid-connect`    | `npx skills add ScaleDockHQ/scaledock-skills --skill openid-connect`    |
| OpenID Federation | `openid-federation` | `npx skills add ScaleDockHQ/scaledock-skills --skill openid-federation` |
| FAPI              | `fapi`              | `npx skills add ScaleDockHQ/scaledock-skills --skill fapi`              |
| Shared Signals    | `shared-signals`    | `npx skills add ScaleDockHQ/scaledock-skills --skill shared-signals`    |
| OpenID4VC         | `openid4vc`         | `npx skills add ScaleDockHQ/scaledock-skills --skill openid4vc`         |
| AuthZEN           | `authzen`           | `npx skills add ScaleDockHQ/scaledock-skills --skill authzen`           |

For families without a dedicated skill, the family reference lists every revision with its maturity and date.

## What changed

### OpenID Foundation Process

This skill pins Process Document v1.98 of 19 October 2024, the version the Process page presents (Process, page header). It defines the five stages (§ 5.1), the review periods (§ 5.2), the ban on substantive changes to a Final and the six-month errata cadence (§ 5.6), and the voting rules (§ 3.4). The Process page does not list the changes from earlier versions; compare the archived text if a rule here looks different from an older deployment's records.

## Upgrading

### Implementer's Draft to Final, for any OpenID specification

1. Change the cited URL from `-ID<n>` to the unversioned Final URL, and record the errata set.
2. Replace removed or renamed fields. Read the Document History appendix of the last numbered draft before the Final (the Final drops it), and list every rename and removal since the draft you implemented. The dedicated skills do this for their families, for example OpenID Federation ID4 to 1.0 and OpenID4VP ID2 to 1.0.
3. Validate against the Final: run the OpenID conformance suite where one exists (invariant 8).
4. Keep behaviour unchanged: the same flows succeed and fail for the same reasons, now under the Final's checks.

### Final to a later errata set

1. Change the cited errata set number; the unversioned URL already serves it.
2. Errata do not add or remove features (Process § 5.1), so no fields are removed. Re-read the sections you cite for corrected wording.
3. Re-run conformance tests.
4. Keep behaviour unchanged unless a correction shows the earlier behaviour was wrong.

### Final to a successor version

Follow the upgrade section in the dedicated skill or family reference for that pair, for example OpenID Federation 1.0 to 1.1 in `openid-federation`.

## Preview

No preview is listed for this skill, because the index has no draft of its own. Drafts of next versions are tracked per family: each family reference lists the Work Group Drafts and Implementer's Drafts of its working group, and each dedicated skill lists its previews with a posture in its own `references/versions.md`.
