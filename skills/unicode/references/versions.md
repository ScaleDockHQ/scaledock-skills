# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the specification text of each line, listed in [Sources](../SKILL.md#sources). Statuses follow the publisher index read on 2026-10-06: the latest Recommendation is current, an earlier Recommendation is legacy unless a later phase names a law that still cites it, and a newer Working Draft or Candidate Recommendation is a preview.

## Version lines

| Id     | Line           | Status    | Revision                                  | Posture | Publisher               |
| ------ | -------------- | --------- | ----------------------------------------- | ------- | ----------------------- |
| `18`   | Unicode 18.0.0 | current   | Unicode 18.0.0 (Unicode Standard, 18.0.0) |         | Unicode Standard 18.0.0 |
| `17`   | Unicode 17.0.0 | supported | Unicode 17.0.0 (Unicode Standard, 17.0.0) |         | Unicode Standard 17.0.0 |
| `16`   | Unicode 16.0.0 | supported | Unicode 16.0.0 (Unicode Standard, 16.0.0) |         | Unicode Standard 16.0.0 |
| `15.1` | Unicode 15.1.0 | legacy    | Unicode 15.1.0 (Unicode Standard, 15.1.0) |         | Unicode Standard 15.1.0 |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line of the relevant family.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build and the user opted in.

## What changed

### Unicode 18.0.0

- Publisher status on 2026-10-06: Unicode Standard (18.0.0).
- Pinned text: https://www.unicode.org/versions/Unicode18.0.0/
- Revision token: Unicode 18.0.0 (Unicode Standard, 18.0.0)

### Unicode 17.0.0

- Publisher status on 2026-10-06: Unicode Standard (17.0.0).
- Pinned text: https://www.unicode.org/versions/Unicode17.0.0/
- Revision token: Unicode 17.0.0 (Unicode Standard, 17.0.0)

### Unicode 16.0.0

- Publisher status on 2026-10-06: Unicode Standard (16.0.0).
- Pinned text: https://www.unicode.org/versions/Unicode16.0.0/
- Revision token: Unicode 16.0.0 (Unicode Standard, 16.0.0)

### Unicode 15.1.0

- Publisher status on 2026-10-06: Unicode Standard (15.1.0).
- Pinned text: https://www.unicode.org/versions/Unicode15.1.0/
- Revision token: Unicode 15.1.0 (Unicode Standard, 15.1.0)

## Upgrading

### 17 to 18

1. Treat documents that cite Unicode 17.0.0 (Unicode 17.0.0 (Unicode Standard, 17.0.0)) as input.
2. Re-read Unicode 18.0.0 at https://www.unicode.org/versions/Unicode18.0.0/.
3. Keep behavior that Unicode 18.0.0 still requires, and replace behavior that only Unicode 17.0.0 required.
4. Record the target revision on the artifact.

### 16 to 18

1. Treat documents that cite Unicode 16.0.0 (Unicode 16.0.0 (Unicode Standard, 16.0.0)) as input.
2. Re-read Unicode 18.0.0 at https://www.unicode.org/versions/Unicode18.0.0/.
3. Keep behavior that Unicode 18.0.0 still requires, and replace behavior that only Unicode 16.0.0 required.
4. Record the target revision on the artifact.

### 15.1 to 18

1. Treat documents that cite Unicode 15.1.0 (Unicode 15.1.0 (Unicode Standard, 15.1.0)) as input.
2. Re-read Unicode 18.0.0 at https://www.unicode.org/versions/Unicode18.0.0/.
3. Keep behavior that Unicode 18.0.0 still requires, and replace behavior that only Unicode 15.1.0 required.
4. Record the target revision on the artifact.

## Preview

No preview line is listed. The pinned current text is the newest line this skill tracks.
