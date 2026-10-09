# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the pinned texts listed in [Sources](../SKILL.md#sources).

## Version lines

| Id                     | Line                        | Status  | Revision                                              | Posture | Summary                                                                                                                                                                                      |
| ---------------------- | --------------------------- | ------- | ----------------------------------------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `wasi-0.2.12`          | WASI 0.2.12                 | current | v0.2.12 (released 2026-06-02), main at commit 90105ff |         | Latest 0.2.x point release (WASI Preview 2): wasi:io, random, clocks, sockets, filesystem, cli and http at @0.2.12, with streams and pollables from wasi:io.                                 |
| `wasi-0.3.1-preview`   | WASI 0.3.1                  | preview | v0.3.1 (released 2026-08-11), main at commit 90105ff  | track   | WASI Preview 3, which the WASI README calls the current preview: drops wasi:io for native Component Model async, future and stream, and requires the map and implements features from 0.3.1. |
| `wasi-component-model` | WebAssembly Component Model | current | main at commit a25fc0b, 2026-09-28                    |         | The Component Model explainer and WIT format; a living design with emoji-gated features instead of numbered releases.                                                                        |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build.

WASI ships point releases on a schedule: 0.2.x and 0.3.x are each pinned at their latest release in the WASI repository. Package versions in WIT follow the spec version (for example `wasi:http@0.2.12`). The Component Model has no release numbers; its features are gated by emoji in the explainer, and WASI 0.3.x lists which gates it requires.

## Upgrading

From WASI 0.2 to 0.3: replace wasi:io streams and pollables with Component Model `async` functions and `stream`/`future` types, and make sure the runtime and toolchain support every gate that the 0.3.1 Overview lists (🔀 async, 🗺️ map, 🏷️ implements). WASI 0.1 (Preview 1, witx) is not a target of this skill; move such modules to a 0.2 world.
