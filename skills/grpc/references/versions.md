# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the pinned texts listed in [Sources](../SKILL.md#sources).

## Version lines

| Id           | Line             | Status  | Revision                                                                    | Posture | Summary                                                                                  |
| ------------ | ---------------- | ------- | --------------------------------------------------------------------------- | ------- | ---------------------------------------------------------------------------------------- |
| `grpc-http2` | gRPC over HTTP/2 | current | grpc/grpc commit cf61c7d (last change to doc/PROTOCOL-HTTP2.md), 2025-04-17 |         | The only wire protocol document; it is maintained in place and has no numbered releases. |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build.

PROTOCOL-HTTP2.md is edited in place on the master branch of grpc/grpc. The pin is the last commit that changed the file; refresh by comparing the file at master with that commit.

## Upgrading

This skill has one published line. There is no older line here to upgrade from.
