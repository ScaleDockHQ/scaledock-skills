# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the specification text of each line, listed in [Sources](../SKILL.md#sources). Statuses follow the publisher index read on 2026-10-06: the latest Recommendation is current, an earlier Recommendation is legacy unless a later phase names a law that still cites it, and a newer Working Draft or Candidate Recommendation is a preview.

## Version lines

| Id        | Line                                                                                                        | Status  | Revision                                | Posture | Publisher                   |
| --------- | ----------------------------------------------------------------------------------------------------------- | ------- | --------------------------------------- | ------- | --------------------------- |
| `rfc5280` | RFC 5280 Internet X.509 Public Key Infrastructure Certificate and Certificate Revocation List (CRL) Profile | current | RFC 5280 (PROPOSED STANDARD, May 2008)  |         | PROPOSED STANDARD May 2008  |
| `rfc6960` | RFC 6960 X.509 Internet Public Key Infrastructure Online Certificate Status Protocol - OCSP                 | current | RFC 6960 (PROPOSED STANDARD, June 2013) |         | PROPOSED STANDARD June 2013 |
| `rfc9162` | RFC 9162 Certificate Transparency Version 2.0                                                               | current | RFC 9162 (EXPERIMENTAL, December 2)     |         | EXPERIMENTAL December 2     |
| `rfc6962` | RFC 6962 Certificate Transparency                                                                           | legacy  | RFC 6962 (EXPERIMENTAL, June 2013)      |         | EXPERIMENTAL June 2013      |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line of the relevant family.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build and the user opted in.

## What changed

### RFC 5280 Internet X.509 Public Key Infrastructure Certificate and Certificate Revocation List (CRL) Profile

- Publisher status on 2026-10-06: PROPOSED STANDARD (May 2008).
- Pinned text: https://www.rfc-editor.org/rfc/rfc5280.html
- Revision token: RFC 5280 (PROPOSED STANDARD, May 2008)

### RFC 6960 X.509 Internet Public Key Infrastructure Online Certificate Status Protocol - OCSP

- Publisher status on 2026-10-06: PROPOSED STANDARD (June 2013).
- Pinned text: https://www.rfc-editor.org/rfc/rfc6960.html
- Revision token: RFC 6960 (PROPOSED STANDARD, June 2013)

### RFC 9162 Certificate Transparency Version 2.0

- Publisher status on 2026-10-06: EXPERIMENTAL (December 2).
- Pinned text: https://www.rfc-editor.org/rfc/rfc9162.html
- Revision token: RFC 9162 (EXPERIMENTAL, December 2)

### RFC 6962 Certificate Transparency

- Publisher status on 2026-10-06: EXPERIMENTAL (June 2013).
- Pinned text: https://www.rfc-editor.org/rfc/rfc6962.html
- Revision token: RFC 6962 (EXPERIMENTAL, June 2013)

## Upgrading

### rfc6962 to rfc9162

1. Treat documents that cite RFC 6962 Certificate Transparency (RFC 6962 (EXPERIMENTAL, June 2013)) as input.
2. Re-read RFC 9162 Certificate Transparency Version 2.0 at https://www.rfc-editor.org/rfc/rfc9162.html.
3. Keep behavior that RFC 9162 Certificate Transparency Version 2.0 still requires, and replace behavior that only RFC 6962 Certificate Transparency required.
4. Record the target revision on the artifact.

## Preview

No preview line is listed. The pinned current text is the newest line this skill tracks.
