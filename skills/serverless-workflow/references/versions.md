# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the pinned texts listed in [Sources](../SKILL.md#sources).

## Version lines

| Id                    | Line                    | Status  | Revision                                       | Posture | Summary                                                                           |
| --------------------- | ----------------------- | ------- | ---------------------------------------------- | ------- | --------------------------------------------------------------------------------- |
| `serverless-workflow` | Serverless Workflow DSL | current | DSL 1.0.3 (v1.0.3, commit 9b5b1da, 2026-07-31) |         | DSL 1.x; workflow documents declare it with `document.dsl` (for example `1.0.3`). |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build.

A workflow declares the DSL version it targets in `document.dsl`. After v1.0.3 the `main` branch renames the project to the Open Workflow Specification and moves the standard error type URIs from `https://serverlessworkflow.io/spec/1.0.0/errors/` to `https://open-workflow-specification.org/spec/1.0.0/errors/`; that text is unreleased, so this skill quotes the v1.0.3 release.

## Upgrading

From DSL 0.8 or earlier: the 1.0 DSL is a rewrite (a `document` header with `dsl`, `namespace`, `name` and `version`, and a `do` list of tasks replacing states). Re-author the workflow against the DSL reference rather than converting field by field.
