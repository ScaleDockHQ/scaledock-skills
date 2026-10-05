# Extensions and the registry

Read this when negotiating an extension, returning or polling tasks, serving or loading skills over MCP, or writing a `server.json` for the MCP Registry. Sources: the Extensions Overview page, the Tasks extension at ext-tasks `specification/2026-07-28/tasks.md`, the Skills extension at ext-skills `specification/stable/skills.mdx`, and the registry `server.json` reference at release v1.8.1. MCP Apps (`io.modelcontextprotocol/ui`) is out of scope here: use the `mcp-apps` skill. Authorization extensions (ext-auth) are covered by the `mcp-authorization` skill.

## Extension negotiation

From the Extensions Overview page and the 2026-07-28 Versioning and Compatibility page, Extension Negotiation:

- An extension identifier is `{vendor-prefix}/{extension-name}` and MUST follow the `_meta` key rules with a mandatory prefix. Official extensions use `io.modelcontextprotocol/`; third parties use a reverse domain they own (`com.example/my-extension`).
- Clients advertise in `_meta["io.modelcontextprotocol/clientCapabilities"].extensions` on each request; servers advertise in `capabilities.extensions` of `server/discover`. The value is a settings object defined by the extension; `{}` means supported with no settings.
- If only one side supports an extension, the supporting side MUST fall back to core behaviour or reject the request with an appropriate error. Extensions SHOULD document their fallback.
- Extensions are disabled by default and need explicit opt-in. Breaking changes use a new identifier (for example `-v2`); prefer capability flags or versioned settings otherwise (Extensions Overview, Evolution).
- Extensions MAY add `resultType` values, which are valid only when advertised (Base Protocol, Result Responses).

## Tasks extension (`io.modelcontextprotocol/tasks`)

From the Tasks specification (2026-07-28, Stable):

- **Who decides.** A server that negotiated the extension MAY return `CreateTaskResult` (`resultType: "task"`) instead of the normal result, per request; clients do not ask for it. The only supported method is `tools/call`.
- **Capability check.** A server MUST NOT return `CreateTaskResult` unless the request itself declared the extension. If it cannot serve the request without a task, it MUST return `-32021` with `data.requiredCapabilities.extensions["io.modelcontextprotocol/tasks"]`. A client that negotiated it MUST handle either result; `CreateTaskResult` on an unsupported method is invalid.
- **Creation.** The server MUST NOT return `CreateTaskResult` until the task is durable (a `tasks/get` would resolve). MRTR exchanges before task creation SHOULD be resolved synchronously first.
- **Task.** `taskId`, `status` (`working`, `input_required`, `completed`, `failed`, `cancelled`; the last three are terminal), optional `statusMessage`, `ttlMs`, `pollIntervalMs`, and `inputRequests`, `result` or `error` as the status requires.
- **Polling.** Clients SHOULD honour `pollIntervalMs`, poll until terminal or cancelled, and persist task IDs. `tasks/get` returns the task with `resultType: "complete"`.
- **Input.** On `input_required`, `inputRequests` MUST hold all outstanding requests. Clients answer with `tasks/update` `inputResponses` and SHOULD de-duplicate keys across polls. Keys MUST be unique for the task's lifetime. The server acknowledges with an empty result and SHOULD ignore responses for keys not outstanding.
- **Cancellation.** `tasks/cancel`, acknowledged with an empty result; it is cooperative and eventually consistent. `notifications/cancelled` MUST NOT be used for tasks.
- **Errors.** `failed` is only for JSON-RPC errors and MUST carry `error`. A tool result with `isError: true` is `completed` with that `result`.
- **Notifications.** `notifications/tasks` through `subscriptions/listen`; a client that did not declare the extension gets an error. Progress and log notifications MUST NOT be sent on a task's listen stream.
- **HTTP routing.** `tasks/get`, `tasks/update` and `tasks/cancel` MUST set `Mcp-Name` to `params.taskId`.
- **Security.** Task IDs MUST have enough entropy not to be guessed; every task request MUST be authenticated and authorized against the task; hosts MUST apply the normal elicitation and sampling trust model to task `inputRequests`.
- **Reserved.** The `tasks/` and `notifications/tasks/` prefixes, `resultType` `"task"` and the identifier.

## Skills extension (`io.modelcontextprotocol/skills`)

From the Skills specification (stable, written against base revision 2026-07-28):

- **Declaration.** Servers declare it in `server/discover` with optional `directoryRead`. A declaring server MUST implement `skills/list` and `skills/get`, MUST declare `resources`, and with `directoryRead: true` MUST implement `resources/directory/read`. Clients MUST NOT call `resources/directory/read` otherwise.
- **Format.** A skill MUST follow the Agent Skills specification: a `SKILL.md` with YAML frontmatter containing at least `name` and `description`.
- **Mapping.** Each file is a resource, read with `resources/read`. Servers SHOULD use `skill://<skill-path>/<file>`; the last segment of `<skill-path>` MUST equal the frontmatter `name`. Clients MUST NOT resolve the authority by DNS, and a scheme alone does not make a resource a skill. `mimeType` SHOULD be `text/markdown`.
- **Entries.** A `Skill` entry has `uri` (its `SKILL.md`), `frontmatter` (identical to the file's), and `resources`: either a complete array of `{ uri, digest: "sha256:<64 hex>", size }` including `SKILL.md`, or the string `"dynamic"`. Anything else is invalid and MUST NOT be loaded.
- **Lookup.** `skills/list` is paginated; `skills/get` takes the `SKILL.md` URI and MUST answer for every served skill; unknown URIs get `-32602`. An empty or partial listing is not proof of absence.
- **Verification.** Hosts MUST check each read against `digest` and `size`, MUST compare fetched frontmatter field by field with the entry, while acting on a skill MUST resolve reads only to URIs in the held entry, and MUST NOT retrieve files ahead of need (on connection, listing or approval). Digests are not a trust anchor.
- **Host security.** Skill content is untrusted model input and a higher-risk surface than tool calls. Hosts MUST tag it with its origin and never present it as a local skill; MUST NOT let it execute host code without explicit per-skill approval; MUST bind its resource reads to the originating server (identified by a host-assigned label, not `serverInfo.name`); MUST namespace names per origin and not let a served skill shadow another; MUST ignore `allowed-tools` unless the user approved it; MUST bind persisted approvals to the entry's digests and re-prompt when they change; and MUST cache served skills outside filesystem-skill discovery paths.

## MCP Registry `server.json` (schema 2025-12-11)

From the registry `server.json` reference, the 2025-12-11 schema and the official registry requirements, at registry release v1.8.1:

- Set `$schema` to `https://static.modelcontextprotocol.io/schemas/2025-12-11/server.schema.json` (JSON Schema draft-07).
- Required: `name`, `description`, `version`. `name` is reverse-DNS with exactly one slash, matching `^[a-zA-Z0-9.-]+/[a-zA-Z0-9._-]+$`, at most 200 characters. `description` is at most 100 characters. `version` SHOULD be semver and MUST NOT be a range (`^1.2.3`, `~1.2.3`, `>=1.2.3`, `1.x`); it is the equivalent of `Implementation.version`.
- Optional: `title`, `websiteUrl`, `icons`, `repository` (`url` and `source` required, optional `id` and `subfolder`), `packages`, `remotes`, `_meta`.
- `packages[]`: `registryType` (`npm`, `pypi`, `oci`, `nuget`, `mcpb`), `identifier`, and `transport` are required; optional `registryBaseUrl`, `version` (exact), `runtimeHint`, `runtimeArguments`, `packageArguments`, `environmentVariables`, `fileSha256`. `fileSha256` is required for MCPB, and clients must check the download against it before running.
- `transport` and `remotes[]`: `stdio`, `streamable-http` or `sse` (the last two need `url`, `http://` or `https://`, with optional `headers`). Remote URLs may contain `{variables}` defined in `variables`.
- Inputs (arguments, environment variables, headers) may set `isRequired`, `isSecret`, `default`, `choices`, `format`. Argument values can carry command injection: clients should prefer non-shell execution or get consent for the resolved command.
- Official registry only: namespace ownership is verified (`com.example/…` needs `example.com`); packages must prove ownership; package registries are limited to npmjs.org, pypi.org, nuget.org, crates.io, listed OCI registries, and GitHub or GitLab releases for MCPB; only `_meta["io.modelcontextprotocol.registry/publisher-provided"]` is kept, up to 4096 bytes. Registry status and timestamps appear in the API response's own `_meta`, never in `server.json`.
