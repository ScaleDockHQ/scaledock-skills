# langchain-agent-protocol

An agent skill for Agent Protocol: implementing or calling an Agent Protocol server.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill langchain-agent-protocol
```

Then ask your agent to apply Agent Protocol.

## What it covers

- Agent Protocol from LangChain is a framework-agnostic HTTP API for serving LLM agents: stateless and background runs, threads with state history, agent introspection, a long-term memory store and thread streaming. This skill quotes the repository README and its OpenAPI document (`openapi.json`, API version 0.1.6) at a pinned commit.

## Versions

| Line           | Status  |
| -------------- | ------- |
| Agent Protocol | current |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [Agent Protocol README](https://raw.githubusercontent.com/langchain-ai/agent-protocol/fb81f3e27ee507557926ecf923d0f933a1c76d44/README.md): Specification, commit fb81f3e, 2026-09-22.
- [Agent Protocol OpenAPI document](https://raw.githubusercontent.com/langchain-ai/agent-protocol/fb81f3e27ee507557926ecf923d0f933a1c76d44/openapi.json): Specification, commit fb81f3e, 2026-09-22, info.version 0.1.6.

## License

MIT
