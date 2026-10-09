---
name: uuid
description: >-
  Universally Unique IDentifiers (UUIDs): This specification defines UUIDs (Universally Unique IDentifiers) -- also known as GUIDs (Globally Unique IDentifiers) -- and a Uniform Resource Name namespace for UUIDs. Covers RFC 9562 Universally Unique IDentifiers (UUIDs). Use when generating or parsing UUIDs. Triggers: UUID, RFC 9562.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.1.0"
  kind: standard
---

# Universally Unique IDentifiers (UUIDs)

This specification defines UUIDs (Universally Unique IDentifiers) -- also known as GUIDs (Globally Unique IDentifiers) -- and a Uniform Resource Name namespace for UUIDs. A UUID is 128 bits long and is intended to guarantee uniqueness across space and time. UUIDs were originally used in the Apollo Network Computing System (NCS), later in the Open Software Foundation's (OSF's) Distributed Computing Environment (DCE), and then in Microsoft Windows platforms. ¶ This specification is derived from the OSF DCE specification with the kind permission of the OSF (now known as "The Open Group"). Information from earlier versions of the OSF DCE specification have been incorporated into this document. T

The publisher of the pinned text is named in [Sources](#sources). With this skill the agent applies that text: when generating or parsing UUIDs.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources). Quoted requirements are sentences taken from the pinned text. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: producer or consumer of this specification.
- Target version: RFC 9562 Universally Unique IDentifiers (UUIDs) (default); RFC 4122 A Universally Unique IDentifier (UUID) URN Namespace (legacy: read and upgrade, never author). See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill, re-read every URL in [Sources](#sources) and check the publisher index for a newer revision or version line.

## Invariants

1. **RFC 9562 § 4.1.** "Specifically for UUIDs in this document, bits 64 and 65 of the UUID (bits 0 and 1 of octet 8) MUST be set to 1 and 0 as specified in row 2 of Table 1."
2. **RFC 9562 § 5.7.** "Implementations SHOULD utilize UUIDv7 instead of UUIDv1 and UUIDv6 if possible."
3. **RFC 9562 § 5.8.** "UUIDv8's uniqueness will be implementation specific and MUST NOT be assumed."
4. **RFC 9562 § 6.1.** "If a system overruns the generator by requesting too many UUIDs within a single system-time interval, the UUID service can return an error or stall the UUID generator until the system clock catches up and MUST NOT knowingly return duplicate values due to a counter rollover."
5. **RFC 9562 § 6.2.** "Counter rollovers MUST be handled by the application to avoid sorting issues."
6. **RFC 9562 § 6.5.** "UUIDs generated at different times from the same name (using the same canonical format) in the same namespace MUST be equal."
7. **RFC 9562 § 6.9.** "Implementations SHOULD utilize a cryptographically secure pseudorandom number generator (CSPRNG) to provide values that are both difficult to predict ("unguessable") and have a low likelihood of collision ("unique")."
8. **RFC 9562 § 6.10.** "After generating the 48-bit fully randomized node value, implementations MUST set the least significant bit of the first octet of the Node ID to 1."
9. **RFC 9562 § 8.** "Implementations SHOULD NOT assume that UUIDs are hard to guess."
10. **RFC 9562 § 8.** "MAC addresses pose inherent security risks around privacy and SHOULD NOT be used within a UUID."

## Workflow

1. **Pick the version.** Use the current line unless a named consumer needs a supported one. Do not author a legacy line. Emit a preview only when its posture is build and the user asked for that draft.
   -> [`references/versions.md`](references/versions.md)
   ✓ The target version is recorded, and it is not a legacy line.
2. **Apply the pinned requirements.** Walk the quotes in [`references/requirements.md`](references/requirements.md) and implement each one that applies to the role.
   -> [`references/requirements.md`](references/requirements.md)
   ✓ Each applicable quote is either implemented or recorded as out of scope for the role, with the section it came from.
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

- [RFC 9562 Universally Unique IDentifiers (UUIDs)](https://www.rfc-editor.org/rfc/rfc9562.html): PROPOSED STANDARD, RFC 9562 (PROPOSED STANDARD, May 2024), checked 2026-10-06.
- [RFC 4122 A Universally Unique IDentifier (UUID) URN Namespace](https://www.rfc-editor.org/rfc/rfc4122.html): PROPOSED STANDARD, RFC 4122 (PROPOSED STANDARD, July 2005), checked 2026-10-06.
