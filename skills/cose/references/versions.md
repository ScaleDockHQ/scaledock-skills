# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the specification text of each line, listed in [Sources](../SKILL.md#sources). Statuses follow the publisher index read on 2026-10-06: the latest Recommendation is current, an earlier Recommendation is legacy unless a later phase names a law that still cites it, and a newer Working Draft or Candidate Recommendation is a preview.

## Version lines

| Id        | Line                                                                                                                  | Status  | Revision                                 | Posture | Publisher                    |
| --------- | --------------------------------------------------------------------------------------------------------------------- | ------- | ---------------------------------------- | ------- | ---------------------------- |
| `rfc9052` | RFC 9052 CBOR Object Signing and Encryption (COSE): Structures and Process                                            | current | RFC 9052 (INTERNET STANDARD, August 202) |         | INTERNET STANDARD August 202 |
| `rfc9053` | RFC 9053 CBOR Object Signing and Encryption (COSE): Initial Algorithms                                                | current | RFC 9053 (INFORMATIONAL, August 202)     |         | INFORMATIONAL August 202     |
| `rfc9360` | RFC 9360 CBOR Object Signing and Encryption (COSE): Header Parameters for Carrying and Referencing X.509 Certificates | current | RFC 9360 (PROPOSED STANDARD, February 2) |         | PROPOSED STANDARD February 2 |
| `rfc9964` | RFC 9964 ML-DSA for JSON Object Signing and Encryption (JOSE) and CBOR Object Signing and Encryption (COSE)           | current | RFC 9964 (PROPOSED STANDARD, May 2026)   |         | PROPOSED STANDARD May 2026   |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line of the relevant family.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build and the user opted in.

## What changed

### RFC 9052 CBOR Object Signing and Encryption (COSE): Structures and Process

- Publisher status on 2026-10-06: INTERNET STANDARD (August 202).
- Pinned text: https://www.rfc-editor.org/rfc/rfc9052.html
- Revision token: RFC 9052 (INTERNET STANDARD, August 202)

### RFC 9053 CBOR Object Signing and Encryption (COSE): Initial Algorithms

- Publisher status on 2026-10-06: INFORMATIONAL (August 202).
- Pinned text: https://www.rfc-editor.org/rfc/rfc9053.html
- Revision token: RFC 9053 (INFORMATIONAL, August 202)

### RFC 9360 CBOR Object Signing and Encryption (COSE): Header Parameters for Carrying and Referencing X.509 Certificates

- Publisher status on 2026-10-06: PROPOSED STANDARD (February 2).
- Pinned text: https://www.rfc-editor.org/rfc/rfc9360.html
- Revision token: RFC 9360 (PROPOSED STANDARD, February 2)

### RFC 9964 ML-DSA for JSON Object Signing and Encryption (JOSE) and CBOR Object Signing and Encryption (COSE)

- Publisher status on 2026-10-06: PROPOSED STANDARD (May 2026).
- Pinned text: https://www.rfc-editor.org/rfc/rfc9964.html
- Revision token: RFC 9964 (PROPOSED STANDARD, May 2026)

## Upgrading

There is no older line to upgrade from.

## Preview

No preview line is listed. The pinned current text is the newest line this skill tracks.
