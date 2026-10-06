# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the specification text of each line, listed in [Sources](../SKILL.md#sources). Statuses follow the publisher index read on 2026-10-06: the latest Recommendation is current, an earlier Recommendation is legacy unless a later phase names a law that still cites it, and a newer Working Draft or Candidate Recommendation is a preview.

## Version lines

| Id                          | Line                          | Status  | Revision                                                                                    | Posture | Publisher                                 |
| --------------------------- | ----------------------------- | ------- | ------------------------------------------------------------------------------------------- | ------- | ----------------------------------------- |
| `payment-request`           | Payment Request API           | current | payment-request CRD-payment-request-20260622 (Candidate Recommendation Draft, 2026-06-22)   | build   | Candidate Recommendation Draft 2026-06-22 |
| `payment-method-id`         | Payment Method Identifiers    | current | payment-method-id REC-payment-method-id-20220908 (Recommendation, 2022-09-08)               |         | Recommendation 2022-09-08                 |
| `web-based-payment-handler` | Web-based Payment Handler API | current | web-based-payment-handler WD-web-based-payment-handler-20260930 (Working Draft, 2026-09-30) | track   | Working Draft 2026-09-30                  |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line of the relevant family.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build and the user opted in.

## What changed

### Payment Request API

- Publisher status on 2026-10-06: Candidate Recommendation Draft (2026-06-22).
- Pinned text: https://www.w3.org/TR/payment-request/
- Revision token: payment-request CRD-payment-request-20260622 (Candidate Recommendation Draft, 2026-06-22)

### Payment Method Identifiers

- Publisher status on 2026-10-06: Recommendation (2022-09-08).
- Pinned text: https://www.w3.org/TR/payment-method-id/
- Revision token: payment-method-id REC-payment-method-id-20220908 (Recommendation, 2022-09-08)

### Web-based Payment Handler API

- Publisher status on 2026-10-06: Working Draft (2026-09-30).
- Pinned text: https://www.w3.org/TR/web-based-payment-handler/
- Revision token: web-based-payment-handler WD-web-based-payment-handler-20260930 (Working Draft, 2026-09-30)

## Upgrading

There is no older line to upgrade from.

## Preview

No preview line is listed. The pinned current text is the newest line this skill tracks.
