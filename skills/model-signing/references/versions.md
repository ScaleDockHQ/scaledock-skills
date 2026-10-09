# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the pinned texts listed in [Sources](../SKILL.md#sources).

## Version lines

| Id              | Line          | Status  | Revision                                          | Posture | Summary                                                                                                                                                                                                |
| --------------- | ------------- | ------- | ------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `model-signing` | Model signing | current | OMS Version 1.0, commit 91bf841e8ccf (2026-09-18) |         | OMS 1.0: predicate type `https://model_signing/signature/v1.0`, file and shard serialization, path canonicalization and the verification procedure. The model-transparency library v1.1.1 produces it. |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build.

OMS 1.0 is the only specification version. Bundles from model-transparency releases before 1.0 use the predicate type `https://model_signing/Digests/v0.1`, which OMS § 11.2 lets verifiers accept but forbids producers to emit; it is not a separate line here. Pin the specification commit and the library release in [Sources](../SKILL.md#sources).

## Upgrading

From a pre-1.0 `Digests/v0.1` bundle: re-sign the model so the bundle carries `predicateType` `https://model_signing/signature/v1.0` (OMS § 5.1) and a `serialization` object (OMS § 5.2.2). Verifiers may keep accepting the old predicate (OMS § 11.2).
