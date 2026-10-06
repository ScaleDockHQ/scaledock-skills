# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the specification text of each line, listed in [Sources](../SKILL.md#sources). Statuses follow the publisher index read on 2026-10-06: the latest Recommendation is current, an earlier Recommendation is legacy unless a later phase names a law that still cites it, and a newer Working Draft or Candidate Recommendation is a preview.

## Version lines

| Id                  | Line        | Status  | Revision                                                                                | Posture | Publisher                                        |
| ------------------- | ----------- | ------- | --------------------------------------------------------------------------------------- | ------- | ------------------------------------------------ |
| `sarif-2.1.0`       | SARIF 2.1.0 | current | SARIF 2.1.0, fetched 2026-10-06 (OASIS Standard, 2026-10-06)                            |         | OASIS Standard 2026-10-06                        |
| `sarif-2.2-preview` | SARIF 2.2   | preview | SARIF 2.2 Committee Specification Draft 01, 2026-03-05 (editor draft at commit adbb670) | track   | OASIS SARIF TC, Committee Specification Draft 01 |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line of the relevant family.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build and the user opted in.

## What changed

### SARIF 2.1.0

- Publisher status on 2026-10-06: OASIS Standard (2026-10-06).
- Pinned text: https://docs.oasis-open.org/sarif/sarif/v2.1.0/sarif-v2.1.0.html
- Revision token: SARIF 2.1.0, fetched 2026-10-06 (OASIS Standard, 2026-10-06)

### SARIF 2.2 (preview)

- Publisher status on 2026-10-06: Committee Specification Draft 01 (2026-03-05), kept in the TC repository `oasis-tcs/sarif-spec`; `docs.oasis-open.org/sarif/sarif/v2.2/` is not published yet.
- Pinned text: https://raw.githubusercontent.com/oasis-tcs/sarif-spec/adbb670c018335b0f384e6dd8819f4ea055d7ee1/sarif-2.2/prose/share/sarif-v2.2-draft.md
- Revision token: SARIF 2.2 Committee Specification Draft 01, 2026-03-05 (editor draft at commit adbb670)

## Upgrading

There is no older line to upgrade from.

## Preview

SARIF 2.2 is a Committee Specification Draft with posture track: watch it, do not emit it. The draft's § 3.13.2 still says the `version` property "**SHALL** have the value `"2.1.0"`", while its examples use `"version": "2.2"` and the `$schema` `https://docs.oasis-open.org/sarif/sarif/v2.2/schema/sarif.json`. Keep writing SARIF 2.1.0 logs until OASIS publishes 2.2 as a Committee Specification or OASIS Standard.
