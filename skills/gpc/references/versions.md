# Versions and upgrades

Read this when choosing a target version, reading code or a `gpc.json` written against the pre-W3C community draft, upgrading, or checking whether the Editor's Draft has moved ahead. Sources: the pinned Working Draft, the Editor's Draft, the W3C history page, and the `w3c/gpc` git history (the repository was first `globalprivacycontrol/gpc-spec`, then `privacycg/gpc-spec`), listed in [Sources](../SKILL.md#sources).

Section numbers are those of the revision named in each subsection. Bare numbers elsewhere in the skill refer to `WD-gpc-20260924`.

## Version lines

| Id                | Line                               | Status  | Revision                                                           | Posture | Summary                                                                                                                                               |
| ----------------- | ---------------------------------- | ------- | ------------------------------------------------------------------ | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `wd-2026-09-24`   | GPC Working Draft 2026-09-24       | current | `WD-gpc-20260924` (2026-09-24)                                     | build   | `Sec-GPC: 1`, `gpcAtNavigation`, `globalPrivacyControl` on Navigator and WorkerNavigator, `gpc.json` with `gpc` and `lastUpdate`, WebDriver commands. |
| `community-draft` | GPC community draft (2020 to 2024) | legacy  | unofficial drafts, 2020-10-07 to 2024-03-21 (last: commit 9027266) |         | The pre-W3C proposal: same header, early revisions with a `version` member and a Navigator-only property.                                             |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows.

The W3C history page, read 2026-10-05, lists Working Drafts from `WD-gpc-20241121` to `WD-gpc-20260924`, with no Candidate Recommendation. These are revisions of one line; the skill pins the latest. The Status of This Document says it is "a draft document and may be updated, replaced, or obsoleted by other documents at any time".

There is no preview line. The Editor's Draft at `https://w3c.github.io/gpc/` (commit 09013ac, 2026-09-24) has the same specification text as `WD-gpc-20260924`: `index.html` last changed on 2026-09-17 (commit 955777d), before the Working Draft was published, and the later commits only add a security self-review questionnaire.

## Which version to use

- Default to GPC Working Draft 2026-09-24 with posture build: send, read and publish exactly what it defines.
- No line is supported. Code written against the community draft is input to an upgrade.
- On the wire, both lines send `Sec-GPC: 1`, so a server that implements the current rules also reads clients built to the community draft.
- A consumer of `gpc.json` may still meet the community draft's `{"gpc": true, "version": 1}`. Under the current text, `version` is an unknown member and is ignored (§ 4.1); `gpc` still reads.

## What changed

### GPC Working Draft 2026-09-24

Compared with the last community draft (commit 9027266, 2024-03-21), from a diff of the two texts:

- Publication moved to the W3C Privacy Working Group on the Recommendation track (Status of This Document).
- The header, server, intermediary, caching and property rules (§ 3.2 to § 3.4) are unchanged from the 2024 community text.
- The support resource is framed per origin and "on pages served from the origin" (§ 4), rather than per site (pull request #145, 2026-06).
- WebDriver extension commands Set and Get Global Privacy Control, at `/session/{session id}/privacy` (§ 8), added in 2025.
- A Security Considerations section (§ 7) and a fingerprinting note that mentions non-configurable settings (§ 6).
- The legal-effects section dropped the per-statute subsections (CCPA, Colorado, Connecticut, Nevada, GDPR) for a general United States section and an other-jurisdictions section that still names GDPR Articles 7 and 21 (§ 5.1, § 5.2), and points to the Legal and Implementation Considerations Guide.
- Definitions and the introduction use "cross-context" targeting and the W3C Privacy Principles terms (§ 1, § 2).

### GPC community draft (2020 to 2024)

From the `w3c/gpc` history of `index.html`:

- 2020-10-07 to 2021-05: the support resource has `gpc` and a `version` member that MUST be the number `1`; the property is `partial interface Navigator`; the value reflects what would be sent to the script's effective script origin, with no navigation cache (2020 revision, "GPC Support Representation" and "JavaScript Property to Detect Preference"). The legal-effects text says the signal is not intended to be legally binding during an initial experimental phase.
- 2021-05-13 (commit 6ff08fe): `version` removed and `lastUpdate` introduced.
- 2021-10-11 (commit dc3ce8d): the property exposed to workers through `WorkerNavigator`.
- 2022-01-27 (commit 6b6c943): the server rule (ignore anything but exactly `1`, and the repeated-field rule), the intermediary rule, and the bans on repeating the field or sending it in a trailer.
- 2023 (first in April, settled 2023-07-20 in commit e0c73ac): the `gpcAtNavigation` per-navigation cache and the rule tying the header and property to it.

## Upgrading

### community-draft to wd-2026-09-24

1. Change the version marker: cite `WD-gpc-20260924` in code comments, tests and documentation, and stop citing `globalprivacycontrol.github.io/gpc-spec` or `privacycg.github.io/gpc-spec`.
2. Replace removed or renamed behaviour:
   - Support resource: replace `"version": 1` with `"lastUpdate"` set to the RFC 3339 date the statement was made, keep `gpc`, and serve it as `application/json` (§ 4.1).
   - Support resource: make the statement about the pages served from this origin, not a whole site (§ 4).
   - Server (code written before 2022): compare the value with exactly `1`, and apply the repeated-field rule (§ 3.3).
   - Client script: read `navigator.globalPrivacyControl` in workers as well as in documents (§ 3.4).
   - User agent or extension: cache the preference in `gpcAtNavigation` at each top-level navigation, derive both the header and the property from it, and never send the header twice or in a trailer (§ 3.2, § 3.3, § 3.4).
   - Tests: drive the preference through the WebDriver commands where the browser supports them (§ 8).
3. Validate against the target: run the Verify list in `SKILL.md` and the checks in [`well-known-resource.md`](well-known-resource.md).
4. Keep behaviour unchanged: a request that carried `Sec-GPC: 1` before the upgrade is still honored the same way, and `gpc` keeps the same boolean.
