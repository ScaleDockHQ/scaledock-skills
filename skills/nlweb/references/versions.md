# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the pinned texts listed in [Sources](../SKILL.md#sources).

## Version lines

| Id      | Line  | Status  | Revision                                                                                                                                | Posture | Summary                                                                                        |
| ------- | ----- | ------- | --------------------------------------------------------------------------------------------------------------------------------------- | ------- | ---------------------------------------------------------------------------------------------- |
| `nlweb` | NLWeb | current | NLWeb Specification v0.55 (nlweb-ai/website commit 9cd2fd6, 2026-08-11); reference REST API (nlweb-ai/NLWeb commit b423f15, 2026-06-10) |         | Specification v0.55 with ask and await; the reference implementation's /ask and /mcp REST API. |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build.

NLWeb is one line. The specification numbers its drafts (v0.55 at the pin, with a change log from v0.54); `meta.version` and `_meta.version` carry that number on the wire. The reference implementation's REST API document predates the v0.55 request structure: it takes a flat `query` string and `prev`, where the specification uses `query.text` and `context.prev`. Follow the specification for new work and the REST API document only when talking to the reference implementation.

## Upgrading

From the reference implementation's flat parameters to Specification v0.55: move `query` to `query.text`, `prev` to `context.prev`, `streaming` to `prefer.streaming` and `mode` to `prefer.mode`, and read `_meta.response_type` on every response. The v0.55 change log in Appendix D lists the changes from v0.54.
