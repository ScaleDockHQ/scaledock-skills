# CLI

CLI kinds, stack, layout, the shared contract (exit codes, result envelope, agent mode, consent, file writes, flags), performance, build, product CLI auth, scaffolding and pitfalls. Pick the kind from the inputs.

Applies when CLI kind is not `none`: `product` in product repos, `library` in library repos, `tooling` in any repo. A `tooling` CLI keeps the exit codes, stdout rule and strict parser, and skips the envelope schemas, agent mode, consent and completion.

| Kind      | Location                                              | Published                                                 | Talks to                             |
| --------- | ----------------------------------------------------- | --------------------------------------------------------- | ------------------------------------ |
| `product` | `apps/cli`, bin `{{app}}`                             | npm with trusted publishing, in the product `fixed` group | The API, through the contract client |
| `library` | `packages/cli`, name `@{{SCOPE}}/cli`, bin `{{lib}}`  | npm, in a Changesets `fixed` group with the library       | Local files and processes            |
| `tooling` | `scripts/*.ts`; a private `apps/cli` only with an ADR | Never                                                     | The repo                             |

## One contract for every ScaleDock CLI

better-supabase and PermDock share the contract below, and agents run both in the same repositories. A change to it lands in this standard and in both CLIs together. Problem codes, effect names, flag words and the envelope schema stay identical across them, so an agent learns one contract.

## Stack (latest of each)

- **Our own resolver over a static manifest.** Not citty: it has no subcommands with their own flags, no strict unknown-flag check and no machine-readable help, so each would be built around it.
- `@clack/prompts`.
- `c12` for config files, with a `defineConfig` export from `@{{SCOPE}}/<pkg>/config`.
- `node:util` `styleText` for colour (it respects `NO_COLOR`).
- `tinyexec`, `tinyglobby`, `smol-toml`, `diff` (the `--check` diff) and `open`.
- `fastest-levenshtein`, or an inline Levenshtein, for did-you-mean. It is the one package the startup path may load.
- Agent detection copies the variable list of `@vercel/detect-agent` instead of calling it. The package is a devDependency pinned in the catalog for a parity test only.
- Valibot for config and API payloads.

## Layout

```
src/bin.ts              #!/usr/bin/env node; calls run(process.argv.slice(2)) and sets process.exitCode
src/cli/core/           the contract: run, command, manifest, help, output, errors, io, agent,
                        consent, completion, files, http, credentials, renames
src/cli/project/        discovery: config file, package manager, framework
src/cli/commands/*.ts   one module per group; each leaf comes from defineLeaf
src/cli/shared/         pure helpers (text, compare)
schemas/                cli-result-v1.json, cli-commands-v1.json
bin/{{bin}}.js          checked-in shim: import "../dist/bin.js"
```

- **The manifest** (`core/manifest.ts`) is static data and the only list of commands. Each leaf entry has:
  - `name`, `summary`, `examples` and `docs` (its page under the docs site);
  - `effects` and `config` (whether the config file loads for it);
  - optional `findings` (reports findings with file and line), `shellOutput` (prints a script for the shell) and `hidden`;
  - `load()`, a dynamic import of the command module.
- **`--help` and `--version` load no command module.** The manifest imports none, and `tests/cli/startup-imports.test.ts` walks the static import graph of `bin.ts`, `core/run.ts` and `core/help.ts` and fails when it reaches one.
- **A leaf** declares its flags and positionals once, each with a `description`. The parser, help, `--help --json`, completion and the docs test all read them.
- **`run(argv, { cwd, io })`** takes env, streams, `readStdin` and `fetch` from `io`. It reads no process globals, so tests run it in-process and a program that calls it is not switched to agent mode by its host.

## Exit codes

| Code  | Meaning                                                       |
| ----- | ------------------------------------------------------------- |
| `0`   | Success; for `--check`, no drift                              |
| `1`   | Failure or drift; a database or service that did not answer   |
| `2`   | The command line is wrong: unknown command or flag, bad value |
| `3`   | Action required: missing input, a login or consent            |
| `130` | SIGINT, or a cancelled prompt                                 |
| `143` | SIGTERM                                                       |

Commands throw a typed `CliError` with a kind (`usage`, `failed`, `unavailable`, `action`, `cancelled`) that maps to the code. Command code never calls `process.exit`. Warnings never change the code unless `--fail-on warning` is passed.

## Output

- **stdout carries data only.** Progress, warnings, logs and prompts go to stderr.
- **`--json`** prints one `cli-result-v1` envelope, on success and on failure:

  ```json
  {
    "$schema": "https://{{app}}.com/schemas/cli-result-v1.json",
    "status": "success",
    "data": {},
    "next": [{ "command": "{{bin}} doctor", "when": "to check the wiring" }]
  }
  ```

  - `status` is `success`, `error` or `action_required` (exit `3`).
  - `error` is RFC 9457 Problem Details with `type`, `title`, `detail`, `command`, a snake_case `code` and `exitCode`.
  - `next` lists complete command lines, each with the condition under which to run it.
  - Commands return `data` themselves; a command that returns only text does not get `{ "message": … }` as its data.

- **`--help --json`** prints `cli-commands-v1`: every command, flag, positional, example, effect and docs page.
- **`--format text|json|github|sarif`.** `github` prints workflow annotations and `sarif` a SARIF 2.1.0 log. Both work only on commands that declare `findings`; anything else exits `2` with `invalid_value`. `--json` with another `--format` is a usage error.
- **Schemas.** Both JSON Schemas ship in `schemas/` in the package. `tests/cli/cli-schemas.test.ts` validates real output against them, and a change to either shape changes the schema in the same commit. Fields are only added within `v1`.
- **Deterministic output.** Sort with one shared code-point comparator (`byCodeUnit`, or `byKey` for objects), never `localeCompare`, so output does not change with the machine's locale.

## Problem codes

Codes are snake_case and stable. These are shared across ScaleDock CLIs, with the same meaning in each:

| Code               | When                                                               |
| ------------------ | ------------------------------------------------------------------ |
| `usage_error`      | Any other usage or configuration error                             |
| `unknown_command`  | No such command; carries the nearest match                         |
| `unknown_flag`     | No such flag on this command; carries the nearest match            |
| `invalid_value`    | A value outside the flag's set, or a bad path or id                |
| `command_moved`    | A released command that moved; carries `replacement`               |
| `flag_renamed`     | A released flag that was renamed; carries `flag` and `replacement` |
| `missing_input`    | A value the run needs and cannot prompt for (exit `3`)             |
| `consent_required` | Agent mode needs the person's go-ahead (exit `3`)                  |
| `auth_required`    | A `401` or `403`, or no stored login (exit `3`, `login` in `next`) |
| `network_error`    | A request that did not complete                                    |

A CLI adds its own codes beside these (`missing_config`, `dirty_worktree`, `check_failed`), and never reuses one of the shared codes for another meaning.

## Missing input

Prompts run only when stdin and stdout are TTYs, `CI` is unset, agent mode is off, and neither `--json` nor `--yes` is passed. Every prompt has a flag that answers it.

When the run cannot prompt and lacks a value, it returns `action_required` with `missing` (the flags), `choices` (the values they take, the suggested one first) and `next` (the command line to run again), and exits `3`. Exit `2` stays for a command line that is wrong. A bare group prints its subcommands on stderr and exits `2`, or under `--json` returns `missing_input` with the subcommands as `choices`.

## Agent mode

- **On** with `--agent yes`, `{{APP}}_AGENT=1`, or `--agent auto` (the default) when `detectAgent` finds an agent's variable in the env `run()` was given. `CURSOR_TRACE_ID` counts only when stdout is not a TTY, because a person's Cursor terminal sets it too.
- **What changes.** JSON is the default output, prompts are off, spinners are off, and missing input returns `action_required`.
- **Help stays text** unless `--json` or `--format json` is given. A leaf with `shellOutput` (completion scripts) also stays text.
- **Opt out** with `--no-json`, `--format text` or `--agent no`.
- **`--agent` is a reserved global.** No command may take `--agent` as its own flag. PermDock had to rename `init --agent` to `--integration` and `skills install --agent` to `--client`.

## Effects and consent

Each leaf lists every effect it may have:

| Effect           | Meaning                                                 |
| ---------------- | ------------------------------------------------------- |
| `files`          | Writes files the CLI generates, through the `FilePlan`  |
| `rewrite`        | Edits files the project owns, such as source or scripts |
| `database:read`  | Connects to Postgres to read                            |
| `database:write` | Writes to Postgres                                      |
| `network`        | Calls a URL other than a database                       |
| `cloud:write`    | Publishes to the product's hosted service               |
| `install`        | Runs a package manager                                  |

- `--help` prints a leaf's effects on a `Side effects` line, and every command's docs page has a `## Side effects` table with the same list (`None` when empty).
- **Consent.** In agent mode, a run with `rewrite`, with `cloud:write`, or with `--force` on a `files` command exits `3` with `consent_required`, the reasons and a token. After the person agrees, the agent runs the command in `next`, which adds `--confirm <token>`. `--yes` never stands in, because an agent adds it to everything. `--dry-run` and `--check` write nothing and need no consent.
- **The token** is the first 12 lowercase hex characters of a SHA-256 over the cwd plus the replay argv (`--confirm` dropped, secret flags in their stdin form, `--cwd` and `--config` kept). Hex matters: a base64url token that starts with `-` parses as a flag, which happened in about 1 run in 64.
- **The `next` command shell-quotes** each argument that is not plain (`'it'\''s'`), so an agent can paste it.

## File writes

Every writing command goes through the one `FilePlan` in `core/files.ts`:

- The command lists the files it would create or update; the core does the rest.
- **`--dry-run`** prints the plan (`Would create`, `Would update`) and writes nothing.
- **`--check`** writes nothing and exits `1` (`check_failed`) when a file would change. It prints each stale file's name and a unified diff from disk to the generated text, cut to the first 40 lines, so the CI log shows the change.
- **`--force`** only overwrites files the CLI would otherwise keep. It never skips a safety check.
- **All or nothing.** Each file is staged beside its target, a failed stage removes the others before anything is replaced, and the run reports one `Created`, `Updated` or `Skipped` line per file.
- **A `rewrite`** refuses files with uncommitted changes in a git work tree (`dirty_worktree`, with a `--dry-run` and a `--force` command in `next`), so `git diff` shows only the rewrite.

## Flag vocabulary

One meaning per word. A new flag reuses one of these before it adds a word.

- `--out <file>` writes one file (`-` for stdout); `--out-dir <dir>` writes a directory.
- `--format` picks the renderer; `--kind` picks the document (`catalog`, `json-schema`, `markdown`).
- `--only` and `--ignore` narrow what runs.
- `--force` only overwrites.
- `--fail-on <severity>` sets the threshold that fails a run.
- `--check` and `--dry-run` come from the `FilePlan`.
- `--db-url` names the database.
- **Global flags**, accepted anywhere before `--`: `--cwd`, `--config`, `--json`, `--format`, `--yes` (`-y`), `--confirm`, `--agent`, `--debug`, `--color` and `--no-color`, `--help` (`-h`), `--version` (`-v`).

Flags are kebab-case. A boolean flag with a default of `true` documents its `--no-<name>` form.

## Parser

- **Strict.** An unknown command, an unknown flag or an undeclared positional exits `2` with the nearest match within a small edit distance. A flag with a fixed set rejects any other value with the list it accepts.
- **`--`** ends option parsing; the rest passes through to the leaf untouched.
- **Renames.** One table, `core/renames.ts`, lists every renamed flag and moved command. It feeds:
  - the `flag_renamed` and `command_moved` hints;
  - the codemod that rewrites CLI calls in `package.json` scripts and workflow files;
  - the CLI table on the docs naming page, which `docs:drift` checks against it.
- **Only released names** get rename rows and codemod entries. Renaming a flag that never shipped is free; drop its changeset row too.

## Secrets

- Secrets are never plain arguments in docs or `next`. Every secret flag has a `--<name>-stdin` form and an env fallback (`--db-url-stdin`, `DATABASE_URL`). An empty env value counts as unset.
- `next` and the consent token always use the stdin form, so neither depends on or prints the secret.
- Every secret the run reads is registered, and stdout, stderr and errors redact it when it is 4 or more characters long. Passwords in URLs are masked too.

## `--debug`

Prints the stack and cause of an error, and traces on stderr: agent mode on or off, the output format, the cwd, the config file found (or none) and the exit code. HTTP requests from `core/http.ts` log a redacted line each.

## Completion

- `{{bin}} completion bash|zsh|fish` prints a script that calls a hidden `__complete` command.
- Candidates come from the manifest: commands, flags and `enum` values.
- A flag or positional with a fixed set that is not an `enum` (ids from a catalogue, block or codemod names) gets a `complete` hook, lazy when it needs a heavy module. Hooks return ids, never file names.
- `completion` and `__complete` print text even in agent mode.

## Performance

- **Startup budget.** `scripts/cli-startup.ts` spawns the built bin 9 times per command and takes the median for `--version`, `--help` and the `--help` of the heaviest leaves. `scripts/cli-startup.json` records the medians and the limits:
  - `--help` takes at most 1.5 times `--version` plus 15 ms (`maxHelpRatio`, `helpSlackMs`);
  - per-command ceilings in milliseconds (PermDock: 150 for `--version`, 200 for each `--help`), enforced locally and only reported in CI, where runners share cores.
  - Put the before and after medians in the commit that moves them.
- **Root `--help`** prints the manifest's static table instead of loading every command.
- **The prompter, config loaders, typegen and parsers** load inside the command that needs them, through the lazy-import rule in [`architecture.md`](architecture.md).
- **Optional heavy peers** load only when the input needs them. For example, load the Supabase config loader only when `config.toml` contains `env(`, and parse it with `smol-toml` otherwise. The import has the fallback and comment the lazy-import rule requires, and a missing peer fails with the install line for the package manager in use.
- **Databases.** Independent queries run in parallel through a small pool. Every connection sets `connectionTimeoutMillis` and `statement_timeout`. Ctrl-C aborts in-flight work through an `AbortController` and closes the pool.
- **On-disk caches** live under `node_modules/.cache/{{bin}}`, keyed by a cheap fingerprint such as file sizes and modification times, or a hash of the config.

## Build

- tsdown, ESM, `platform: "node"`, entries `index` and `bin`, `neverBundle` for `node:*` and peer packages.
- `engines.node` matches the root.
- `publint` and `attw` run in `check:publish`. Library CLIs keep a size baseline.
- A library that ships its CLI in the main package keeps every CLI dependency out of the runtime entries, and its bundle test fails when a runtime entry reaches one.

## Product CLI auth

OAuth 2.1 against Supabase. See [`auth.md`](auth.md) for the pre-registered CLI client.

- **`login`** runs the authorization code flow with PKCE (S256) and `state` against `/auth/v1/oauth/authorize`, using the CLI public client:
  - A `node:http` loopback server on `127.0.0.1:<registered port>` handles `/callback`, with a 120-second timeout.
  - The CLI opens the browser and also prints the URL; `--no-browser` only prints it.
  - The CLI exchanges the code at the token endpoint.
- **The session** lives in `$XDG_CONFIG_HOME/{{app}}/session.json` (default `~/.config/{{app}}`, override `{{APP}}_CONFIG_DIR`) with mode `0600`.
  - It is validated with Valibot on every read and refreshed through the `refresh_token` grant before it expires.
  - `logout` deletes it. `whoami` calls the API's `me` procedure.
- **Non-interactive use** reads an access token from `{{APP}}_TOKEN` or `login --token-stdin`. Long-lived API keys are not part of the standard.
- **Agents** get `auth_required` (exit `3`, `{{bin}} login` in `next`) instead of a browser flow.
- **API URL**, in order of precedence: `--api-url`, then `{{APP}}_API_URL`, then the config file, then production.
- The CLI never holds `sb_secret_`, never reads tables directly, and never logs tokens.

## Scaffolding and presets (`init` plus a web builder)

Applies when a product or library has an `init` command and a generated config, and usually a web builder (PermDock's `/create`). All three surfaces offer the same choices and stay in parity. PermDock's review found every kind of drift below.

- **One catalogue.** `src/preset/catalog.ts` owns every choice: id, title, description, `kind` and the defaults (`PRESET_DEFAULTS`).
  - The builder, the `init` flags, the codec, completion and the help text all read it.
  - Help never hard-codes a list such as `"b2b, agent, …"`. Flag descriptions and `complete` hooks are built from the catalogue ids.
- **One default.** The builder's start state, `resolvePreset` and the CLI all start from `PRESET_DEFAULTS`. PermDock's `/create` started with shadcn while the CLI started with no UI.
- **Every preset key has a CLI flag.** PermDock's `init` had no `--auth`, `--backend` or `--service`, so those choices were reachable only through `--preset <code>`.
  - A parity test checks that every key of the `Preset` type maps to an `init` flag.
  - A round-trip test runs `init` with `presetFlags(decodePreset(code))` for every catalogue case and checks it writes the same code.
  - `preset decode` prints the equivalent `init` flags line.
- **The same names on every surface.**
  - The preset JSON keys, the builder's step titles, the CLI flags and the docs table use one word per concept. PermDock had `agents` and `ui` in JSON and the builder but `--integration` in the CLI, so it merged them into one `integrations` list tagged by `kind`.
  - A choice's id matches its title and the library's own term: `audit` became `decision-log`, and `agents` became `operations`, after `defineOperations`.
  - Check every description against the real exports. One said `createPermDock` where core exports `getPermDockSync`, and one misspelt a package name.
- **Shareable codes store positions, not ids,** so renaming an id keeps old links working. Each catalogue list is append-only, and a removed choice keeps its slot as `retired`.
  - A layout change bumps the code version, for example from `p1` to `p2`.
  - Splitting a merged list back by `kind`, in catalogue order, keeps `p1` codes stable.
- **No option that generates nothing.** Every card describes only what the generator writes, and every choice changes files or dependencies.
  - PermDock's `drizzle` and `prisma` backends changed nothing, auth providers changed only a comment, and `cloud-snapshots` wrote only `cloud()`.
  - Wire the choice (`subjectFrom*`, `postgrestSources()`, `checkRow` and `toWhere`, provider dependencies, links to the adapter docs), or remove it.
- **The config is always written.**
  - `init` always generates `{{bin}}.config.ts` with every key the CLI's own config schema reads for the picked choices (PermDock: `permissions`, `policy`, `operations`, `rls`).
  - PermDock wrote it only with `rls`, so the `doctor` that `init` suggested next silently skipped the checks that need `policy` and `operations`.
  - A test runs the next command `init` prints on the generated project and expects it to pass.
- **`init` and `preset` follow the contract like every other command.**
  - An unknown id or code throws `CliError` with `invalid_value`, not text with exit `2`.
  - The JSON report goes in `data`: `{ preset, written, kept, dryRun, install, shadcn, docs }`.
  - The install, UI and `doctor` commands go in the envelope's `next`, not in prose.
  - Writes go through the `FilePlan`.
  - Commands written before a contract change are the ones that drift. When the contract changes, audit every command, not only the ones being edited.
- **Generated code is type-checked.**
  - Every auth, backend and framework case is generated into a gitignored `.preset-check/` folder and type-checked.
  - Generator files stay under the 1,000-line limit by splitting per concern (`generate-auth.ts`, `generate-backend.ts`).
  - Watch for a generated file that collides with a folder of the same name (`permdock.ts` beside `permdock/`).
- **The builder UI** shows filtered views of the catalogue by `kind`, never hand-written lists. See [`ui.md`](ui.md).

## Pitfalls

- **Documents versus the envelope.** Moving `--json` to the envelope breaks anyone who redirected `--json` into a file. PermDock's own integration tests hit it with `permdock supabase inspect --json > manifest.json`.
  - A command whose output consumers store as a document writes it with `--out`.
  - Docs say "With `--json`, `data` is …", never "`--json` prints …".
  - Before changing a shape, grep integration tests, examples and docs for `--json` consumers.
- **Follow-up parity review.** After a CLI overhaul, review every surface that exposes the same choices: web builder, CLI, config, docs and skills. In PermDock that review found more drift than the overhaul itself.
- **Coverage.** Unreachable defensive branches make high CLI coverage expensive. The patterns that avoid them are in [`tests.md`](tests.md).

## Tests and docs

- The CLI tests (in-process `run()`, help snapshots, schema validation, the bin smoke test, startup imports, the docs drift test, coverage) are in [`tests.md`](tests.md).
- The CLI pages (index, agent mode, a page per command with its `## Side effects` table, naming) are in [`docs-site.md`](docs-site.md).
- The `cli` topic rule and the "CLI command or flag" row are in [`agent-files.md`](agent-files.md).
