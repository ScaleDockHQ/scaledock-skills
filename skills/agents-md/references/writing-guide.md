# Writing and reviewing AGENTS.md

Read this when writing a new AGENTS.md, adding to one, or reviewing one. The format itself only lists popular sections; the guidance on concise, verifiable writing below is attributed to the tool documents that state it. Sources: [Sources](../SKILL.md#sources).

## What to put in it

The site lists "popular choices" (How to use, step 2) and extras (step 3):

- Project overview.
- Build and test commands.
- Code style guidelines.
- Testing instructions.
- Security considerations.
- Commit messages or pull request guidelines, security gotchas, large datasets, deployment steps: "anything you'd tell a new teammate belongs here too".

The GitHub Copilot onboarding prompt for its own instructions file gives a compatible, more detailed list (Copilot docs, onboarding prompt): a summary of what the repository does; its size, languages, frameworks and runtimes; for each of bootstrap, build, test, run and lint, the sequence of steps and the tool versions; the checks run before check-in, including CI workflows; where the main project and configuration files live; and dependencies that are not obvious from the layout.

Leave out what belongs elsewhere: human onboarding stays in README.md (site, Why AGENTS.md?); Copilot's guidance adds that instructions "must not be task specific" (Copilot docs, onboarding prompt "Limitations").

## Command-first structure

Agents run the checks you list and fix failures before finishing (site, FAQ). Put the commands first and make each one exact:

- Write the literal command in backticks, not a description: the site's examples use "Install deps: `pnpm install`", "Run tests: `pnpm test`" (hero example).
- Give the scope: the site's monorepo example uses `pnpm turbo run test --filter <project_name>` for one package, `pnpm test` "from the package root", and `pnpm vitest run -t "<test name>"` "to focus on one step" (Examples).
- Say when to run it: "After moving files or changing imports, run `pnpm lint --filter <project_name>`"; "Always run `pnpm lint` and `pnpm test` before committing" (Examples).
- Point to CI: "Find the CI plan in the .github/workflows folder" (Examples).
- Say what not to run when it matters: the repository's own AGENTS.md tells agents not to run `npm run build` in an agent session because it breaks hot reload (`agentsmd/agents.md` AGENTS.md, § 1).
- Validate every command by running it, record preconditions, and record errors and workarounds you hit (Copilot docs, onboarding prompt "BuildInstructions").
- Use language that says when something always happens, for example "always run npm install before building" (Copilot docs, onboarding prompt).

## Verifiable, concise instructions

- **Concrete enough to verify.** "Use 2-space indentation" instead of "Format code properly"; "Run npm test before committing" instead of "Test your changes"; "API handlers live in src/api/handlers/" instead of "Keep files organized" (Claude Code docs, Write effective instructions). The same examples apply to AGENTS.md, which that tool also loads.
- **Short.** Copilot's onboarding prompt caps instructions at two pages (Copilot docs, "Limitations"). Claude Code targets under 200 lines per file because "longer files consume more context and reduce adherence" (Claude Code docs). Codex stops adding instruction files at 32 KiB combined by default (Codex docs).
- **Structured.** Group related instructions under headings and bullets (Claude Code docs, Write effective instructions); the site's examples use `##` sections with bullet lists.
- **Consistent.** "If two instructions contradict each other, Claude may pick one arbitrarily"; review root and nested files for conflicts (Claude Code docs). Resolve conflicts yourself rather than relying on precedence.
- **Split by directory.** When the file grows, move package-specific rules into nested AGENTS.md files (site, How to use, step 4; Codex docs, "Raise the limit or split instructions across nested directories").
- **Explain the rule.** Codex's guidance for review rules: keep them concise, explain the behaviour to flag and any safe path or exception, and leave formatting and lint checks to CI (Codex docs, Add code review rules).

## Example

Assembled from the site's examples (hero, Examples) and the extra sections it suggests:

```markdown
# AGENTS.md

## Setup commands

- Install deps: `pnpm install`
- Start dev server: `pnpm dev`
- Run tests: `pnpm test`

## Testing instructions

- Find the CI plan in the .github/workflows folder.
- Run `pnpm turbo run test --filter <project_name>` to run every check defined for that package.
- To focus on one step, add the Vitest pattern: `pnpm vitest run -t "<test name>"`.
- Fix any test or type errors until the whole suite is green.
- Add or update tests for the code you change, even if nobody asked.

## Code style

- TypeScript strict mode
- Single quotes, no semicolons

## PR instructions

- Title format: [<project_name>] <Title>
- Always run `pnpm lint` and `pnpm test` before committing.
```

A nested override, adapted from the Codex documentation's payments example:

```markdown
# services/payments/AGENTS.md

## Payments service rules

- Use `make test-payments` instead of `npm test`.
- Never rotate API keys without notifying the security channel.
```

## Security considerations

- The site lists security considerations and "security gotchas" as content (How to use, steps 2 and 3).
- AGENTS.md is guidance. Claude Code treats instruction files "as context, not enforced configuration" and points to hooks to block an action (Claude Code docs); Cursor says "AI guidance should not be your only security control" (Cursor docs). Enforce critical rules in CI, branch protection, hooks or tool permissions as well.
- Code review agents may read instructions from the pull request's head branch, so a pull request can change the instructions used to review it (Copilot docs, Enabling or disabling custom instructions for Copilot code review). Review changes to AGENTS.md like code.

## Common mistakes

| Mistake                                                 | Fix                                                                                           |
| ------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| Commands described in prose ("run the tests").          | Write the literal command and the directory it runs from.                                     |
| A command that no longer works.                         | Run every command; agents will execute them (site, FAQ).                                      |
| Copying README.md into AGENTS.md.                       | Keep human content in README.md; add only agent-specific context (site, Why AGENTS.md?).      |
| One huge root file in a monorepo.                       | Nested files per package (site, How to use, step 4).                                          |
| Vague style rules ("write clean code").                 | Concrete, checkable rules (Claude Code docs).                                                 |
| Task-specific instructions ("fix the login bug first"). | Keep the file general (Copilot docs, "Limitations").                                          |
| Root and nested files that contradict silently.         | Remove the conflict, or state the override explicitly in the nested file.                     |
| Claims such as "every agent concatenates nested files". | State per-tool behaviour only from that tool's documentation (see `format-and-placement.md`). |
| Relying on AGENTS.md to stop dangerous actions.         | Enforce outside the file (Claude Code docs; Cursor docs).                                     |

## Review checklist

- [ ] The file is named `AGENTS.md`, is plain Markdown, and sits at the root (and in packages where needed).
- [ ] Setup, build, test, single-test and lint commands are present, exact, and pass in a clean checkout.
- [ ] Every path, script and workflow it names exists.
- [ ] Every instruction is concrete enough to check; none is task-specific.
- [ ] It does not duplicate README.md.
- [ ] Root and nested files do not contradict each other; overrides are stated.
- [ ] It fits the smallest documented size limit among the agents in use.
- [ ] Commit and pull request conventions match what CI and reviewers enforce.
- [ ] Security notes are present where relevant, and critical rules are also enforced elsewhere.
- [ ] Old tool-specific files are migrated, linked or imported (see `migration.md`).
