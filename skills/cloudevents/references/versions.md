# Versions and upgrades

Read this when choosing a target version, reading an event written for an older line, upgrading, or deciding whether to use a draft. Sources: the CloudEvents 1.0.2 and 0.3 specification texts, the JSON event format of both lines, and the release notes for v1.0-rc1, ce@v1.0, ce@v1.0.1 and ce@v1.0.2, listed in [Sources](../SKILL.md#sources).

## Version lines

| Id    | Line            | Status  | Revision                         | Posture | Summary                                                                     |
| ----- | --------------- | ------- | -------------------------------- | ------- | --------------------------------------------------------------------------- |
| `1.0` | CloudEvents 1.0 | current | 1.0.2 (2022-02-06)               |         | The default target. `specversion` is `"1.0"` for every 1.0.x patch release. |
| `0.3` | CloudEvents 0.3 | legacy  | v0.3 (2019-06-14), working draft |         | Superseded by 1.0. `specversion` is `"0.3"`.                                |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows.

The `specversion` attribute carries only the major and minor version, so patch releases (1.0.1, 1.0.2) do not change its value (spec, `specversion`). Earlier drafts (0.1, 0.2) are not covered; treat them like 0.3 and upgrade them to 1.0.

## Which version to use

- Default to CloudEvents 1.0, at its latest patch (1.0.2): `specversion` is `"1.0"`.
- No other line is supported. A 0.3 event is input to an upgrade, never output.
- Every event in an HTTP batch has the same `specversion` (HTTP binding § 3.3), so do not mix 0.3 and 1.0 events in one batch.
- Subscriptions, xRegistry and Pagination are separate documents with their own status; see [`drafts.md`](drafts.md).

## What changed

### CloudEvents 1.0

From the v1.0-rc1 release notes, which ce@v1.0 (2019-10-24) finalized, compared with the 0.3 text:

- `schemaurl` is renamed `dataschema`, and its type changes from `URI-reference` to `URI`, which must be absolute and non-empty (spec, `dataschema`; release note #475).
- `datacontentencoding` is removed. The JSON format carries binary data in `data_base64` instead, and `data` and `data_base64` are mutually exclusive (JSON format § 3.1; release note #492).
- The type system drops `Map` and `Any` as attribute types and adds `Boolean` and `URI`. All context attribute values must be of a listed type (spec, Type System). Extensions can therefore no longer be nested objects; 0.3 allowed nested properties under a top-level extension (0.3 JSON format § 2).
- `String` no longer means "printable"; control characters, noncharacters and unpaired surrogates are disallowed (spec, Type System).
- Attribute names no longer have to begin with a letter: lower-case ASCII letters and digits only, 20 characters or fewer recommended (spec, Attribute Naming Convention; release note #522).
- Extension attributes must follow the same naming convention and type system as standard attributes, and are serialized by the same binding rules (spec, Extension Context Attributes).
- `source` should be an absolute URI and must be non-empty (spec, `source`).
- `time` is the time of the occurrence; if unknown, all producers for one `source` set it the same way (spec, `time`).
- A JSON-format event without `datacontenttype` is equivalent to one with `application/json`, and translations to another format set it explicitly (spec, `datacontenttype`).
- `data` is no longer an attribute; it is described under Event Data (spec, Event Data).

Patch releases within the line:

- ce@v1.0.1 (2020-12-12): JSON values may be `null`, meaning unset (#713); the Protobuf format returns (#626, #721); the Distributed Tracing extension is reworked (#607); Kafka header and key encoding is specified (#572).
- ce@v1.0.2 (2022-02-06): HTTP header value encoding and decoding is clarified (#793, #816); the Protobuf batch format is added (#801); JSON `data` handling with a JSON `datacontenttype` is clarified (#861), and `application/json` defaulting is stated explicitly (#881); the repository is reorganized into the `cloudevents/` directory (#904, #905).

None of the patch releases change `specversion` or remove an attribute, so an event valid under 1.0 stays valid under 1.0.2.

### Work in progress: 1.0.3-wip

The main branch of the specification repository is titled "Version 1.0.3-wip". It is a patch in progress on the 1.0 line, not a new line, and `specversion` stays `"1.0"`. It is not listed as a preview: build against 1.0.2 and re-read the main branch only when refreshing this skill.

## Upgrading

### 0.3 to 1.0

1. Change `specversion` from `"0.3"` to `"1.0"`, in JSON events, `ce-specversion` HTTP headers, `ce_specversion` Kafka headers and every other binding.
2. Rename `schemaurl` to `dataschema`, and make its value an absolute URI; a relative reference is not valid in 1.0 (spec, `dataschema`).
3. Remove `datacontentencoding`. In the JSON format, move a base64 string from `data` to `data_base64` and keep `datacontenttype` naming the decoded media type (JSON format § 3.1). In binary-mode bindings, send the raw bytes as the message body.
4. Flatten nested extensions: every extension value must be a single `Boolean`, `Integer`, `String`, `Binary`, `URI`, `URI-reference` or `Timestamp` (spec, Type System). Split a nested object into several top-level attributes, or move it into `data`.
5. Check every attribute and extension name against `^[a-z0-9]+$` and the 20-character guideline (spec, Attribute Naming Convention).
6. Validate the result against the 1.0.2 JSON Schema ([`formats.md`](formats.md)), and check names separately, because the schema does not check them.
7. Keep behaviour unchanged: the same `id`, `source`, `type`, `subject` and `time` values, and the same decoded `data` bytes. An upgrade that validates but routes or deduplicates differently is a regression.

## Preview

No preview line is listed. The CloudEvents project has released no draft of a 2.0 or 1.1 core specification; the only open work on the core is the 1.0.3-wip patch described above. The Subscriptions API and xRegistry Pagination drafts are separate specifications with their own track posture, described in [`drafts.md`](drafts.md).
