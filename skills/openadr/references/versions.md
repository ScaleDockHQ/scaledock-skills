# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the pinned texts listed in [Sources](../SKILL.md#sources).

## Version lines

| Id              | Line          | Status    | Revision                                                                                        | Posture | Summary                                                                                           |
| --------------- | ------------- | --------- | ----------------------------------------------------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------- |
| `openadr-3-1-0` | OpenADR 3.1.0 | current   | OpenADR 3.1.0 Final Specification (upstream oadr3-org/specification commit ddd2cc5, 2025-08-07) |         | Adds the notifiers endpoint with webhook and MQTT bindings.                                       |
| `openadr-3-0-1` | OpenADR 3.0.1 | supported | OpenADR 3.0.1 (upstream commit a35682b, 2024-11-26)                                             |         | Previous release; webhook subscriptions only.                                                     |
| `openadr-3-0-0` | OpenADR 3.0.0 | legacy    | OpenADR 3.0.0 (upstream commit 4907836, 2024-11-26)                                             |         | First OpenADR 3 release; upgrade to 3.0.1 or 3.1.0.                                               |
| `openadr-2-0b`  | OpenADR 2.0b  | legacy    | OpenADR 2.0b Profile Specification (not pinned)                                                 |         | Earlier protocol that does not share the OpenADR 3 REST API. Read it only to bridge to OpenADR 3. |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build.

The 3.x versions share one OpenAPI shape. The OpenAPI `info.version` stays `1.0.0` in every release, so name the OpenADR version (3.1.0) and not the `info.version` when you record the target.

## Upgrading

3.0.1 to 3.1.0: add the `/notifiers` endpoint; `WEBHOOK` stays required and MQTT is optional. 2.0b to 3: the 3 API is a new REST interface, so map 2.0b events and reports to the OpenADR 3 objects by hand.
