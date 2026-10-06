# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the specification text of each line, listed in [Sources](../SKILL.md#sources). Statuses follow the publisher index read on 2026-10-06: the latest Recommendation is current, an earlier Recommendation is legacy unless a later phase names a law that still cites it, and a newer Working Draft or Candidate Recommendation is a preview.

## Version lines

| Id                  | Line      | Status  | Revision                                                   | Posture | Publisher                                  |
| ------------------- | --------- | ------- | ---------------------------------------------------------- | ------- | ------------------------------------------ |
| `xliff-2.1`         | XLIFF 2.1 | current | XLIFF 2.1, fetched 2026-10-06 (OASIS Standard, 2026-10-06) |         | OASIS Standard 2026-10-06                  |
| `xliff-2.2-preview` | XLIFF 2.2 | preview | XLIFF 2.2 Committee Specification 01, 2025-03-13           | build   | OASIS XLIFF TC, Committee Specification 01 |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line of the relevant family.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build and the user opted in.

## What changed

### XLIFF 2.1

- Publisher status on 2026-10-06: OASIS Standard (2026-10-06).
- Pinned text: https://docs.oasis-open.org/xliff/xliff-core/v2.1/os/xliff-core-v2.1-os.html
- Revision token: XLIFF 2.1, fetched 2026-10-06 (OASIS Standard, 2026-10-06)

### XLIFF 2.2 (preview)

- Publisher status on 2026-10-06: Committee Specification 01 (2025-03-13); no OASIS Standard yet.
- Pinned text: https://docs.oasis-open.org/xliff/xliff-core/v2.2/cs01/xliff-core-v2.2-cs01-part1.html and https://docs.oasis-open.org/xliff/xliff-core/v2.2/cs01/xliff-extended-v2.2-cs01-part2.html
- Revision token: XLIFF 2.2 Committee Specification 01, 2025-03-13
- Part 1 § 1.1: "XLIFF 2.2 is presented in two separate documents". Part 1 holds the core; Part 2 holds the core and the optional modules, including the new Plural, Gender, and Select Module.
- Part 1 § 1.1: "Note that all changes introduced in version 2.2 were designed to maintain compatibility with versions 2.0 and 2.1."
- Part 1 § 4: conformant documents validate against `https://docs.oasis-open.org/xliff/xliff-core/v2.2/cs/schemas/xliff_core_2.2.xsd`.

## Upgrading

There is no older line to upgrade from. Moving a 2.1 document to the 2.2 preview keeps it valid by design (Part 1 § 1.1); validate it against the 2.2 core schema and use Part 2 for any module.

## Preview

XLIFF 2.2 is an OASIS Committee Specification with posture build: write 2.2 documents only when the user asks for 2.2 or needs the Plural, Gender, and Select Module. Otherwise write XLIFF 2.1.
