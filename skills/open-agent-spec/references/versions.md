# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the pinned texts listed in [Sources](../SKILL.md#sources).

## Version lines

| Id           | Line                     | Status  | Revision                                                                                     | Posture | Summary                                                                        |
| ------------ | ------------------------ | ------- | -------------------------------------------------------------------------------------------- | ------- | ------------------------------------------------------------------------------ |
| `agent-spec` | Open Agent Specification | current | Agent Spec 26.3.1 language specification (tag agent-spec-26.3.1, commit 592a94a, 2026-09-10) |         | Language specification 26.3.1; configurations declare it in agentspec_version. |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build.

Agent Spec versions follow YEAR.QUARTER.PATCH (25.4.1 was the first release). Each release has its own language specification page (`language_spec_<version>.rst`) and generated JSON spec; `language_spec_nightly.rst` on main is unreleased work and is not pinned. Set `agentspec_version` in each configuration to the release it targets.

## Upgrading

Between Agent Spec releases, read the deprecation notices in the target release's language specification: breaking changes go through a one-year deprecation cycle and removed features are announced in the release notes. Then update `agentspec_version` and re-validate the configuration's inputs and outputs.
