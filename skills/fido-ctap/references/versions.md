# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the specification text of each line, listed in [Sources](../SKILL.md#sources). Statuses follow the publisher index read on 2026-10-06: the latest Recommendation is current, an earlier Recommendation is legacy unless a later phase names a law that still cites it, and a newer Working Draft or Candidate Recommendation is a preview.

## Version lines

| Id                   | Line       | Status    | Revision                                                              | Posture | Publisher                    |
| -------------------- | ---------- | --------- | --------------------------------------------------------------------- | ------- | ---------------------------- |
| `ctap-2.3`           | CTAP 2.3   | current   | CTAP 2.3 Proposed Standard 2026-02-26 (Proposed Standard, 2026-02-26) |         | Proposed Standard 2026-02-26 |
| `ctap-2.2`           | CTAP 2.2   | supported | CTAP 2.2 Proposed Standard 2025-07-14 (Proposed Standard, 2025-07-14) |         | Proposed Standard 2025-07-14 |
| `ctap-2.1`           | CTAP 2.1   | supported | CTAP 2.1 Proposed Standard 2021-06-15 (Proposed Standard, 2021-06-15) |         | Proposed Standard 2021-06-15 |
| `u2f-1.2`            | U2F 1.2    | legacy    | U2F 1.2 raw message formats (Proposed Standard, 2017-04-11)           |         | Proposed Standard 2017-04-11 |
| `ctap-2.3.1-preview` | CTAP 2.3.1 | preview   | CTAP 2.3.1 Working Draft 2026-05-29 (Working Draft, 2026-05-29)       | track   | Working Draft 2026-05-29     |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line of the relevant family.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build and the user opted in.

## What changed

### CTAP 2.3

- Publisher status on 2026-10-06: Proposed Standard (2026-02-26).
- Pinned text: https://fidoalliance.org/specs/fido-v2.3-ps-20260226/fido-client-to-authenticator-protocol-v2.3-ps-20260226.html
- Revision token: CTAP 2.3 Proposed Standard 2026-02-26 (Proposed Standard, 2026-02-26)

### CTAP 2.2

- Publisher status on 2026-10-06: Proposed Standard (2025-07-14).
- Pinned text: https://fidoalliance.org/specs/fido-v2.2-ps-20250714/fido-client-to-authenticator-protocol-v2.2-ps-20250714.html
- Revision token: CTAP 2.2 Proposed Standard 2025-07-14 (Proposed Standard, 2025-07-14)

### CTAP 2.1

- Publisher status on 2026-10-06: Proposed Standard (2021-06-15).
- Pinned text: https://fidoalliance.org/specs/fido-v2.1-ps-20210615/fido-client-to-authenticator-protocol-v2.1-ps-20210615.html
- Revision token: CTAP 2.1 Proposed Standard 2021-06-15 (Proposed Standard, 2021-06-15)

### U2F 1.2

- Publisher status on 2026-10-06: Proposed Standard (2017-04-11).
- Pinned text: https://fidoalliance.org/specs/fido-u2f-v1.2-ps-20170411/fido-u2f-raw-message-formats-v1.2-ps-20170411.html
- Revision token: U2F 1.2 raw message formats (Proposed Standard, 2017-04-11)

### CTAP 2.3.1

- Publisher status on 2026-10-06: Working Draft (2026-05-29).
- Pinned text: https://fidoalliance.org/specs/fido-v2.3.1-wd-20260529/fido-client-to-authenticator-protocol-v2.3.1-wd-20260529.html
- Revision token: CTAP 2.3.1 Working Draft 2026-05-29 (Working Draft, 2026-05-29)

## Upgrading

### ctap-2.2 to ctap-2.3

1. Treat documents that cite CTAP 2.2 (CTAP 2.2 Proposed Standard 2025-07-14 (Proposed Standard, 2025-07-14)) as input.
2. Re-read CTAP 2.3 at https://fidoalliance.org/specs/fido-v2.3-ps-20260226/fido-client-to-authenticator-protocol-v2.3-ps-20260226.html.
3. Keep behavior that CTAP 2.3 still requires, and replace behavior that only CTAP 2.2 required.
4. Record the target revision on the artifact.

### ctap-2.1 to ctap-2.3

1. Treat documents that cite CTAP 2.1 (CTAP 2.1 Proposed Standard 2021-06-15 (Proposed Standard, 2021-06-15)) as input.
2. Re-read CTAP 2.3 at https://fidoalliance.org/specs/fido-v2.3-ps-20260226/fido-client-to-authenticator-protocol-v2.3-ps-20260226.html.
3. Keep behavior that CTAP 2.3 still requires, and replace behavior that only CTAP 2.1 required.
4. Record the target revision on the artifact.

### u2f-1.2 to ctap-2.3

1. Treat documents that cite U2F 1.2 (U2F 1.2 raw message formats (Proposed Standard, 2017-04-11)) as input.
2. Re-read CTAP 2.3 at https://fidoalliance.org/specs/fido-v2.3-ps-20260226/fido-client-to-authenticator-protocol-v2.3-ps-20260226.html.
3. Keep behavior that CTAP 2.3 still requires, and replace behavior that only U2F 1.2 required.
4. Record the target revision on the artifact.

## Preview: CTAP 2.3.1

`ctap-2.3.1-preview` is a Working Draft dated 2026-05-29, pinned at https://fidoalliance.org/specs/fido-v2.3.1-wd-20260529/fido-client-to-authenticator-protocol-v2.3.1-wd-20260529.html. Posture: track. Do not emit it. Read it to see what the publisher is changing. When it becomes a Recommendation, make it current and move the previous current line to supported or legacy.
