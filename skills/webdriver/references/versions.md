# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the specification text of each line, listed in [Sources](../SKILL.md#sources). Statuses follow the publisher index read on 2026-10-06: the latest Recommendation is current, an earlier Recommendation is legacy unless a later phase names a law that still cites it, and a newer Working Draft or Candidate Recommendation is a preview.

## Version lines

| Id                   | Line              | Status  | Revision                                                              | Posture | Publisher                 |
| -------------------- | ----------------- | ------- | --------------------------------------------------------------------- | ------- | ------------------------- |
| `webdriver1`         | WebDriver Level 1 | current | webdriver1 REC-webdriver1-20180605 (Recommendation, 2018-06-05)       |         | Recommendation 2018-06-05 |
| `webdriver2-preview` | WebDriver Level 2 | preview | webdriver2 WD-webdriver2-20260702 (Working Draft, 2026-07-02)         | track   | Working Draft 2026-07-02  |
| `webdriver-bidi`     | WebDriver BiDi    | current | webdriver-bidi WD-webdriver-bidi-20260930 (Working Draft, 2026-09-30) | track   | Working Draft 2026-09-30  |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line of the relevant family.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build and the user opted in.

## What changed

### WebDriver Level 1

- Publisher status on 2026-10-06: Recommendation (2018-06-05).
- Pinned text: https://www.w3.org/TR/webdriver1/
- Revision token: webdriver1 REC-webdriver1-20180605 (Recommendation, 2018-06-05)

### WebDriver Level 2

- Publisher status on 2026-10-06: Working Draft (2026-07-02).
- Pinned text: https://www.w3.org/TR/webdriver2/
- Revision token: webdriver2 WD-webdriver2-20260702 (Working Draft, 2026-07-02)

### WebDriver BiDi

- Publisher status on 2026-10-06: Working Draft (2026-09-30).
- Pinned text: https://www.w3.org/TR/webdriver-bidi/
- Revision token: webdriver-bidi WD-webdriver-bidi-20260930 (Working Draft, 2026-09-30)

## Upgrading

There is no older line to upgrade from.

## Preview: WebDriver Level 2

`webdriver2-preview` is a Working Draft dated 2026-07-02, pinned at https://www.w3.org/TR/webdriver2/. Posture: track. Do not emit it. Read it to see what the publisher is changing. When it becomes a Recommendation, make it current and move the previous current line to supported or legacy.
