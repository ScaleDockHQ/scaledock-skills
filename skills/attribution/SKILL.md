---
name: attribution
description: >-
  Attribution API: This specifies a browser API for attribution. Covers Attribution Level 1 (track). Use when measuring conversions without cross-site identifiers. Triggers: Attribution API, attribution reporting.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.0"
  kind: standard
---

# Attribution API

This specifies a browser API for attribution. The API produces aggregate statistics that can help sites better understand the real-world performance of their advertising. This API collates information about people from multiple web origins, which could be a significant risk to their privacy. To manage this risk, the information that is gathered is aggregated and differential privacy techniques are applied.

The publisher of the pinned text is named in [Sources](#sources). With this skill the agent applies that text: when measuring conversions without cross-site identifiers.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources). Quoted requirements are sentences taken from the pinned text. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: producer or consumer of this specification.
- Target version: Attribution Level 1 (default, posture track). See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill, re-read every URL in [Sources](#sources) and check the publisher index for a newer revision or version line.

## Invariants

1. **Document conventions.** "The key words “MUST”, “MUST NOT”, “REQUIRED”, “SHALL”, “SHALL NOT”, “SHOULD”, “SHOULD NOT”, “RECOMMENDED”, “MAY”, and “OPTIONAL” in the normative parts of this document are to be interpreted as described in RFC 2119."
2. **Terms defined by reference.** "[] defines the following terms: collective privacy cross-context recognition cross-site recognition fingerprint fingerprinting same-site recognition [CLEAR-SITE-DATA] defines the following terms: Clear-Site-Data [CSS-2025] defines the following terms: user [CSS-VALUES-4] defines the following terms: integer [CSS2] defines the following terms: SHOULD NOT [DOM] defines the following terms: Document…"
3. **3.4. Saving Impressions.** "The user agent should impose an upper limit on the lifetime, and silently reduce the value specified here if it exceeds that limit."
4. **4.1.2. Maintenance.** "The user agent should periodically use the timestamp and lifetime values to identify and delete any impressions in the impression store that have expired."
5. **4.1.2. Maintenance.** "However, the user agent should not retain expired impressions indefinitely."
6. **4.1.4. Site Names.** "These sites must all be in scheme-and-host form, with a scheme of " https "."
7. **4.2.2. Attribution API Activation.** "This should be no less than the transient activation duration , though a larger value might be advisable to ensure that delays from navigation do not cause the Attribution API to become inaccessible."
8. **4.2.2. Attribution API Activation.** "When a user interaction causes firing of an activation triggering input event in a Document document , the user agent must perform the steps below—​in addition to the activation notification steps—​before dispatching the event."

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

- [Attribution Level 1](https://www.w3.org/TR/attribution/): Working Draft, attribution WD-attribution-20260910 (Working Draft, 2026-09-10), checked 2026-10-06.
