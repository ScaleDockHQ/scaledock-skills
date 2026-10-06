# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the specification text of each line, listed in [Sources](../SKILL.md#sources). Statuses follow the publisher index read on 2026-10-06: the latest Recommendation is current, an earlier Recommendation is legacy unless a later phase names a law that still cites it, and a newer Working Draft or Candidate Recommendation is a preview.

## Version lines

| Id       | Line                | Status  | Revision                                          | Posture | Publisher                     |
| -------- | ------------------- | ------- | ------------------------------------------------- | ------- | ----------------------------- |
| `living` | DOM Living Standard | current | Review Draft 2026-06 (Review Draft, 2026-06)      |         | Review Draft 2026-06          |
| `dom4`   | W3C DOM 4           | legacy  | REC-dom-20151119 (W3C Recommendation, 2015-11-19) |         | W3C Recommendation 2015-11-19 |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line of the relevant family.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build and the user opted in.

## What changed

### DOM Living Standard

- Publisher status on 2026-10-06: Review Draft (2026-06).
- Pinned text: https://dom.spec.whatwg.org/review-drafts/2026-06/
- Revision token: Review Draft 2026-06 (Review Draft, 2026-06)

### W3C DOM 4

- Publisher status on 2026-10-06: W3C Recommendation (2015-11-19).
- Pinned text: https://www.w3.org/TR/2015/REC-dom-20151119/
- Revision token: REC-dom-20151119 (W3C Recommendation, 2015-11-19)

## Upgrading

### dom4 to living

1. Treat documents that cite W3C DOM 4 (REC-dom-20151119 (W3C Recommendation, 2015-11-19)) as input.
2. Re-read DOM Living Standard at https://dom.spec.whatwg.org/review-drafts/2026-06/.
3. Keep behavior that DOM Living Standard still requires, and replace behavior that only W3C DOM 4 required.
4. Record the target revision on the artifact.

## Preview

No preview line is listed. The pinned current text is the newest line this skill tracks.
