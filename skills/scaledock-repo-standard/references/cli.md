# CLI

CLI kinds, stack, layout, behavior, performance, build, product CLI auth, and tests. Pick the kind from the inputs.

Applies when CLI kind is not `none`: `product` in product repos, `library` in library repos, `tooling` in any repo.

| Kind      | Location                                              | Published                                                 | Talks to                             |
| --------- | ----------------------------------------------------- | --------------------------------------------------------- | ------------------------------------ |
| `product` | `apps/cli`, bin `{{app}}`                             | npm with trusted publishing, in the product `fixed` group | The API, through the contract client |
| `library` | `packages/cli`, name `@{{SCOPE}}/cli`, bin `{{lib}}`  | npm, in a Changesets `fixed` group with the library       | Local files and processes            |
| `tooling` | `scripts/*.ts`; a private `apps/cli` only with an ADR | Never                                                     | The repo                             |

## Stack (latest of each)

- `citty` with lazy subcommands: `subCommands: { login: () => import("./commands/login.ts").then((m) => m.default) }`.
- `@clack/prompts`.
- `c12` for config files, with a `defineConfig` export from `@{{SCOPE}}/<pkg>/config`.
- `node:util` `styleText` for color (it respects `NO_COLOR`).
- `tinyexec`, `tinyglobby`, `smol-toml`, `diff`, `fastest-levenshtein` (for "did you mean") and `open`.
- Valibot for config and API payloads.

## Layout

```
src/bin.ts          #!/usr/bin/env node; calls run(process.argv.slice(2)) and sets process.exitCode
src/run.ts          run(argv, { cwd, env, io }) => Promise<{ code, stdout, stderr }>; no process globals
src/commands/*.ts   one defineCommand default export per command
src/output.ts       text or --json (one JSON document on stdout); diagnostics on stderr
src/errors.ts       CliError { code, exitCode, problem? }
src/env.ts          t3-env core with Valibot
bin/{{bin}}.js      checked-in shim: import "../dist/bin.js"
```

## Behavior

- **Global flags:** `--json`, `--yes`, `--cwd`, `--help` and `--version`. Flags are kebab-case.
- **Exit codes:** `0` for success, `1` for failure (including drift found by `--check`), `2` for a usage error.
- **Prompts** run only when stdin and stdout are TTYs, `CI` is unset, and neither `--json` nor `--yes` is passed. Otherwise a missing value exits with `2` and names the flag to pass.
- **Secrets** are never arguments. Use a hidden prompt or `--<name>-stdin`.
- **Deterministic output.** Sort with a code-point comparison (`a < b ? -1 : a > b ? 1 : 0`), never `localeCompare`, so output does not change with the machine's locale.

## Performance

- **Startup budget.** `--help` takes close to the time of `--version`.
  - The root `--help` prints a static usage table instead of resolving every subcommand.
  - The prompter, config loaders, typegen and fuzzy matching load inside the command that needs them, through the lazy-import rule in [`architecture.md`](architecture.md).
  - Measure with `time {{bin}} --help` and `time {{bin}} --version`, and put both numbers in the commit.
- **Optional heavy peers** load only when the input needs them. For example, load the Supabase config loader only when `config.toml` contains `env(`, and parse it with `smol-toml` otherwise. The import has the fallback and comment the lazy-import rule requires.
- **Databases.** Independent queries run in parallel through a small pool. Every connection sets `connectionTimeoutMillis` and `statement_timeout`. Ctrl-C aborts in-flight work through an `AbortController` and closes the pool.
- **On-disk caches** live under `node_modules/.cache/{{bin}}`, keyed by a cheap fingerprint such as file sizes and modification times, or a hash of the config.

## Build

- tsdown, ESM, `platform: "node"`, entries `index` and `bin`, `neverBundle` for `node:*` and peer packages.
- `engines.node` matches the root.
- `publint` and `attw` run in `check:publish`. Library CLIs keep a size baseline.

## Product CLI auth

OAuth 2.1 against Supabase. See [`auth.md`](auth.md) for the pre-registered CLI client.

- **`login`** runs the authorization code flow with PKCE (S256) and `state` against `/auth/v1/oauth/authorize`, using the CLI public client:
  - A `node:http` loopback server on `127.0.0.1:<registered port>` handles `/callback`, with a 120-second timeout.
  - The CLI opens the browser and also prints the URL; `--no-browser` only prints it.
  - The CLI exchanges the code at the token endpoint.
- **The session** lives in `$XDG_CONFIG_HOME/{{app}}/session.json` (default `~/.config/{{app}}`, override `{{APP}}_CONFIG_DIR`) with mode `0600`.
  - It is validated with Valibot on every read and refreshed through the `refresh_token` grant before it expires.
  - `logout` deletes it. `whoami` calls the API's `me` procedure.
- **Non-interactive use** reads an access token from `{{APP}}_TOKEN`. Long-lived API keys are not part of the standard.
- **API URL**, in order of precedence: `--api-url`, then `{{APP}}_API_URL`, then the config file, then production.
- The CLI never holds `sb_secret_`, never reads tables directly, and never logs tokens.

## Tests and docs

- Call `run()` in-process with fake IO.
- Snapshot `--help` for each command.
- Keep one smoke test that spawns the built bin.
- A docs drift test compares each command's flags with its docs page.
