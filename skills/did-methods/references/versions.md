# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the specification text of each line, listed in [Sources](../SKILL.md#sources). Statuses follow the publisher index read on 2026-10-06: the latest Recommendation is current, an earlier Recommendation is legacy unless a later phase names a law that still cites it, and a newer Working Draft or Candidate Recommendation is a preview.

## Version lines

| Id          | Line      | Status  | Revision                                                           | Posture | Publisher                    |
| ----------- | --------- | ------- | ------------------------------------------------------------------ | ------- | ---------------------------- |
| `did-web`   | did:web   | current | did:web method, fetched 2026-10-06 (Unofficial draft, 2026-10-06)  |         | Unofficial draft 2026-10-06  |
| `did-key`   | did:key   | current | did:key method, fetched 2026-10-06 (Community draft, 2026-10-06)   |         | Community draft 2026-10-06   |
| `did-jwk`   | did:jwk   | current | did:jwk method, fetched 2026-10-06 (Community draft, 2026-10-06)   |         | Community draft 2026-10-06   |
| `did-webvh` | did:webvh | current | did:webvh v1.0, fetched 2026-10-06 (DIF specification, 2026-10-06) |         | DIF specification 2026-10-06 |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line of the relevant family.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build and the user opted in.

## What changed

### did:web

- Publisher status on 2026-10-06: Unofficial draft (2026-10-06).
- Pinned text: https://w3c-ccg.github.io/did-method-web/
- Revision token: did:web method, fetched 2026-10-06 (Unofficial draft, 2026-10-06)

### did:key

- Publisher status on 2026-10-06: Community draft (2026-10-06).
- Pinned text: https://raw.githubusercontent.com/w3c-ccg/did-method-key/main/README.md
- Revision token: did:key method, fetched 2026-10-06 (Community draft, 2026-10-06)

### did:jwk

- Publisher status on 2026-10-06: Community draft (2026-10-06).
- Pinned text: https://raw.githubusercontent.com/quartzjer/did-jwk/main/spec.md
- Revision token: did:jwk method, fetched 2026-10-06 (Community draft, 2026-10-06)

### did:webvh

- Publisher status on 2026-10-06: DIF specification (2026-10-06).
- Pinned text: https://identity.foundation/didwebvh/v1.0/
- Revision token: did:webvh v1.0, fetched 2026-10-06 (DIF specification, 2026-10-06)

## Upgrading

There is no older line to upgrade from.

## Preview

No preview line is listed. The pinned current text is the newest line this skill tracks.
