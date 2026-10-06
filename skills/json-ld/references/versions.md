# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the specification text of each line, listed in [Sources](../SKILL.md#sources). Statuses follow the publisher index read on 2026-10-06: the latest Recommendation is current, an earlier Recommendation is legacy unless a later phase names a law that still cites it, and a newer Working Draft or Candidate Recommendation is a preview.

## Version lines

| Id           | Line        | Status  | Revision                                                      | Posture | Publisher                 |
| ------------ | ----------- | ------- | ------------------------------------------------------------- | ------- | ------------------------- |
| `json-ld11`  | JSON-LD 1.1 | current | json-ld11 REC-json-ld-20140116 (Recommendation, 2020-07-16)   |         | Recommendation 2020-07-16 |
| `json-ld`    | JSON-LD 1.0 | legacy  | json-ld REC-json-ld-20140116 (Retired, 2020-11-03)            |         | Retired 2020-11-03        |
| `cbor-ld-10` | CBOR-LD 1.0 | current | cbor-ld-10 WD-cbor-ld-10-20260916 (Working Draft, 2026-09-28) | track   | Working Draft 2026-09-28  |
| `yaml-ld-10` | YAML-LD 1.0 | current | yaml-ld-10 WD-yaml-ld-10-20261001 (Working Draft, 2026-10-05) | track   | Working Draft 2026-10-05  |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line of the relevant family.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build and the user opted in.

## What changed

### JSON-LD 1.1

- Publisher status on 2026-10-06: Recommendation (2020-07-16).
- Pinned text: https://www.w3.org/TR/json-ld11/
- Revision token: json-ld11 REC-json-ld-20140116 (Recommendation, 2020-07-16)

### JSON-LD 1.0

- Publisher status on 2026-10-06: Retired (2020-11-03).
- Pinned text: https://www.w3.org/TR/json-ld/
- Revision token: json-ld REC-json-ld-20140116 (Retired, 2020-11-03)

### CBOR-LD 1.0

- Publisher status on 2026-10-06: Working Draft (2026-09-28).
- Pinned text: https://www.w3.org/TR/cbor-ld-10/
- Revision token: cbor-ld-10 WD-cbor-ld-10-20260916 (Working Draft, 2026-09-28)

### YAML-LD 1.0

- Publisher status on 2026-10-06: Working Draft (2026-10-05).
- Pinned text: https://www.w3.org/TR/yaml-ld-10/
- Revision token: yaml-ld-10 WD-yaml-ld-10-20261001 (Working Draft, 2026-10-05)

## Upgrading

### json-ld to json-ld11

1. Treat documents that cite JSON-LD 1.0 (json-ld REC-json-ld-20140116 (Retired, 2020-11-03)) as input.
2. Re-read JSON-LD 1.1 at https://www.w3.org/TR/json-ld11/.
3. Keep behavior that JSON-LD 1.1 still requires, and replace behavior that only JSON-LD 1.0 required.
4. Record the target revision on the artifact.

## Preview

No preview line is listed. The pinned current text is the newest line this skill tracks.
