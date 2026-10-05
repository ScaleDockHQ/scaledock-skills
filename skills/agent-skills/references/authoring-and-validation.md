# Authoring and validation

Read this when writing a description or body, bundling scripts, or validating and testing a skill. Sources: the best-practices, optimizing-descriptions and using-scripts guides, and the `skills-ref` library, pinned in [Sources](../SKILL.md#sources). These guides give recommendations, not format requirements; the format itself is in [`format.md`](format.md).

## Writing the description (optimizing descriptions, Writing effective descriptions)

- **Imperative phrasing:** "Use this skill when…", because the agent is deciding whether to act.
- **User intent, not implementation:** describe what the user is trying to achieve.
- **Be explicit about scope:** list contexts where the skill applies, including ones where the user does not name the domain ("even if they don't explicitly mention 'CSV'").
- **Concise:** a few sentences to a short paragraph, within the 1024-character limit; descriptions tend to grow during optimization.
- Agents usually consult skills only for tasks beyond what they can do alone; a simple one-step request may not trigger even a well-matched skill (How skill triggering works).

Before and after, from the guide:

```yaml
# Before
description: Process CSV files.

# After
description: >
  Analyze CSV and tabular data files — compute summary statistics,
  add derived columns, generate charts, and clean messy data. Use this
  skill when the user has a CSV, TSV, or Excel file and wants to
  explore, transform, or visualize the data, even if they don't
  explicitly mention "CSV" or "analysis."
```

## Writing the body (best practices)

- **Start from real expertise.** Extract the skill from a real task you completed with an agent (steps that worked, corrections, formats, context you supplied), or synthesize it from project artifacts such as runbooks, schemas, review comments and fixed incidents. Generic LLM knowledge produces vague procedures.
- **Add what the agent lacks, omit what it knows.** For each line ask "Would the agent get this wrong without this instruction?"; if not, cut it.
- **Coherent units.** Scope like a function: not so narrow that several skills load for one task, not so broad that activation is imprecise.
- **Moderate detail.** Concise stepwise guidance with a working example beats exhaustive documentation.
- **Match specificity to fragility.** Give freedom (and the reason) where approaches vary; be prescriptive ("Run exactly this sequence") where operations are fragile.
- **Defaults, not menus.** Name one tool and a brief escape hatch, instead of listing equal options.
- **Procedures over declarations.** Teach how to approach a class of problems, not the answer to one instance.
- **Useful patterns:** a gotchas section of concrete, non-obvious corrections; output templates; checklists for multi-step work; validation loops (do, validate, fix, repeat); plan-validate-execute for batch or destructive operations.
- **Refine with real execution.** Run the skill on real tasks, read the execution traces, and revise; add each correction you had to make to the gotchas.

## Bundling scripts (using scripts)

- For an existing tool, a one-off command is enough (`uvx`, `pipx`, `npx`, `bunx`, `deno run`, `go run`). Pin versions, and state prerequisites in the body or `compatibility`.
- For reusable logic, bundle a self-contained script in `scripts/` that declares its dependencies inline, for example PEP 723 metadata run with `uv run scripts/extract.py`, or Deno `npm:` imports.
- List the scripts in `SKILL.md` and show the exact command, with paths relative to the skill root.
- Design for agents:
  - no interactive prompts; take input from flags, environment variables or stdin ("a hard requirement");
  - a concise `--help` with flags and examples;
  - error messages that say what went wrong, what was expected and what to try;
  - structured output (JSON, CSV, TSV) on stdout, diagnostics on stderr;
  - idempotent operations, closed input sets, `--dry-run` for destructive actions, distinct documented exit codes, safe defaults;
  - predictable output size, because harnesses often truncate tool output (the guide cites 10-30K characters); default to a summary and offer `--offset` or `--output`.

## Validating with `skills-ref`

`skills-ref` is the reference library named by the specification (Validation). Its README says it is "intended for demonstration purposes only" and not for production. Version 0.1.0 requires Python 3.11 or later.

Install from a clone of the repository, inside `skills-ref/`:

```bash
uv sync && source .venv/bin/activate
# or: python -m venv .venv && source .venv/bin/activate && pip install -e .
```

Commands:

```bash
skills-ref validate path/to/skill          # exit 0 "Valid skill: …", exit 1 with a list of problems
skills-ref read-properties path/to/skill   # frontmatter as JSON
skills-ref to-prompt path/to/a path/to/b   # <available_skills> XML for a system prompt
```

Each command also accepts a path to the `SKILL.md` file itself.

What `validate` checks (`validator.py`, `parser.py`):

- the path exists, is a directory and contains `SKILL.md` (or `skill.md`);
- the file starts with `---`, the frontmatter is closed, and it parses with `strictyaml` into a mapping;
- no top-level keys other than `name`, `description`, `license`, `allowed-tools`, `metadata`, `compatibility`;
- `name`: present, non-empty, at most 64 characters, lowercase, no leading or trailing hyphen, no `--`, only letters, digits and hyphens, equal to the directory name (both NFKC-normalized);
- `description`: present, non-empty, at most 1024 characters;
- `compatibility`: a string of at most 500 characters.

What it does not check, so check by hand:

- `name` limited to ASCII `a-z` and `0-9`; the validator accepts any Unicode letter (see [`format.md`](format.md));
- `SKILL.md` length (500 lines) and body size (< 5000 tokens);
- that relative file references resolve and stay one level deep;
- `metadata` and `allowed-tools` value shapes;
- whether the description triggers.

## Testing triggering (optimizing descriptions)

1. Write about 20 realistic eval queries: 8 to 10 that should trigger and 8 to 10 that should not. Vary phrasing, explicitness, detail and complexity; include file paths, personal context and typos.
2. Make negatives near-misses that share keywords but need something else.
3. Run each query about 3 times and compute a trigger rate; a should-trigger query passes above 0.5, a should-not-trigger query below.
4. Split about 60% train and 40% validation; change the description only from train failures, generalizing rather than adding failed keywords.
5. Iterate (about five rounds) and keep the iteration with the best validation pass rate, which may not be the last.
6. Finish with 5 to 10 fresh queries as a final check.

## Common mistakes

- `name` differs from the folder name, or uses uppercase, `_`, a leading/trailing hyphen or `--`.
- A vague description ("Helps with PDFs.") or one that says what but not when.
- An unquoted description containing `: `.
- Extra top-level frontmatter keys instead of entries under `metadata`.
- `allowed-tools` written as a YAML list.
- Unquoted numeric `metadata` values.
- A `SKILL.md` that explains general knowledge the agent already has, or presents a menu of options with no default.
- References with no load condition, or chains of references.
- Scripts that prompt interactively or print unstructured walls of text.
