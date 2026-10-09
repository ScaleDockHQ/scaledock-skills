# open-agent-spec

An agent skill for Open Agent Specification: describing agents and agentic workflows in Agent Spec configurations.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill open-agent-spec
```

Then ask your agent to apply Open Agent Specification.

## What it covers

- Open Agent Specification (Agent Spec) from Oracle is a declarative, framework-agnostic language for describing agents and agentic workflows as serialized components (agents, LLM configurations, tools, flows, nodes and edges). This skill quotes the Agent Spec 26.3.1 language specification from the oracle/agent-spec repository, pinned at the release commit.

## Versions

| Line                     | Status  |
| ------------------------ | ------- |
| Open Agent Specification | current |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [Agent Spec specification (version 26.3.1)](https://raw.githubusercontent.com/oracle/agent-spec/592a94a46cf5d90066bf5aea318a18cb112cc84f/docs/pyagentspec/source/agentspec/language_spec_26_3_1.rst): Specification, Release 26.3.1, tag agent-spec-26.3.1, commit 592a94a, 2026-09-10.

## License

MIT
