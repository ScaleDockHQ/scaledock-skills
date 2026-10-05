# Format: folder layout and `SKILL.md`

Read this when creating a skill folder, writing or reviewing frontmatter, or checking file references. Section names in parentheses are headings of the [Agent Skills Specification](https://agentskills.io/specification), pinned in [Sources](../SKILL.md#sources).

## Folder layout (Directory structure, Optional directories)

```
skill-name/
├── SKILL.md          # Required: metadata + instructions
├── scripts/          # Optional: executable code
├── references/       # Optional: documentation
├── assets/           # Optional: templates, resources
└── ...               # Any additional files or directories
```

- `SKILL.md` is the only required file. "A skill directory may contain any files and directories beyond the required `SKILL.md`"; the three directories are recommendations for common content.
- `scripts/`: executable code agents can run. Scripts should be self-contained or clearly document dependencies, include helpful error messages, and handle edge cases gracefully. Supported languages depend on the agent; Python, Bash and JavaScript are common.
- `references/`: documentation loaded on demand, for example `REFERENCE.md`, `FORMS.md` or domain files such as `finance.md`. Keep each file focused; smaller files use less context.
- `assets/`: static resources: templates, images, data files such as lookup tables and schemas.
- Write the file name as `SKILL.md`. `skills-ref` also accepts `skill.md` (`parser.py`, `find_skill_md`), but the specification and the client guide name `SKILL.md`, and clients scan for "a file named exactly `SKILL.md`" (client guide, What to scan for).

## `SKILL.md` structure (`SKILL.md` format)

YAML frontmatter followed by Markdown content. The file starts with `---`, the YAML block follows, a closing `---` ends it, and everything after it is the body (client guide, Frontmatter extraction).

```markdown
---
name: pdf-processing
description: Extract PDF text, fill forms, merge files. Use when handling PDFs.
license: Apache-2.0
metadata:
  author: example-org
  version: "1.0"
---

Instructions for the agent go here.
```

## Frontmatter fields (Frontmatter)

| Field           | Required | Constraints                                                                                                 |
| --------------- | -------- | ----------------------------------------------------------------------------------------------------------- |
| `name`          | Yes      | Max 64 characters. Lowercase letters, numbers, and hyphens only. Must not start or end with a hyphen.       |
| `description`   | Yes      | Max 1024 characters. Non-empty. Describes what the skill does and when to use it.                           |
| `license`       | No       | License name or reference to a bundled license file.                                                        |
| `compatibility` | No       | Max 500 characters. Indicates environment requirements (intended product, system packages, network access). |
| `metadata`      | No       | Arbitrary key-value mapping for additional metadata (a map from string keys to string values).              |
| `allowed-tools` | No       | Space-separated string of pre-approved tools the skill may use. (Experimental)                              |

No other top-level field is defined. `skills-ref validate` fails with "Unexpected fields in frontmatter" for any key outside these six (`validator.py`, `ALLOWED_FIELDS`). Put client-specific properties in `metadata`, which exists so "clients can use this to store additional properties not defined by the Agent Skills spec".

### `name` (`name` field)

- 1 to 64 characters.
- Only lowercase alphanumerics `a-z`, `0-9` and hyphens `-`.
- Must not start or end with `-`, and must not contain `--`.
- Must match the parent directory name.

Valid: `pdf-processing`, `data-analysis`, `code-review`. Invalid: `PDF-Processing` (uppercase), `-pdf` (leading hyphen), `pdf--processing` (consecutive hyphens).

Gotcha: `skills-ref` is more permissive than the text. It NFKC-normalizes the name and accepts any Unicode letter or digit (`str.isalnum()`), so a name such as `café` passes the validator but breaks the spec's `a-z`, `0-9` rule. Hold names to the spec.

### `description` (`description` field)

- 1 to 1024 characters, non-empty.
- Should describe both what the skill does and when to use it.
- Should include specific keywords that help agents identify relevant tasks.

Good: `Extracts text and tables from PDF files, fills PDF forms, and merges multiple PDFs. Use when working with PDF documents or when the user mentions PDFs, forms, or document extraction.` Poor: `Helps with PDFs.`

### `license` (`license` field)

Optional. Keep it short: a license name, or the name of a bundled license file, for example `license: Proprietary. LICENSE.txt has complete terms`.

### `compatibility` (`compatibility` field)

Optional, 1 to 500 characters when present. Include it only for specific environment requirements: intended product, system packages, network access. Examples: `Requires git, docker, jq, and access to the internet`; `Requires Python 3.14+ and uv`. Most skills do not need it.

### `metadata` (`metadata` field)

Optional map from string keys to string values. Make key names reasonably unique to avoid conflicts. The spec's example quotes the version (`version: "1.0"`), which keeps it a string; `skills-ref` converts every metadata key and value with `str()` when parsing (`parser.py`).

### `allowed-tools` (`allowed-tools` field)

Optional, experimental: a space-separated string of pre-approved tools, for example `allowed-tools: Bash(git:*) Bash(jq:*) Read`. "Support for this field may vary between agent implementations", so check how each target client treats it.

## YAML pitfalls

- An unquoted value containing `: ` is invalid YAML, for example `description: Use this skill when: the user asks about PDFs`. Some clients accept it, others do not (client guide, Handling malformed YAML). Quote the value or use a block scalar (`>-`).
- `skills-ref` parses frontmatter with `strictyaml` (`parser.py`), so write plain block-style YAML.

## Body (Body content)

No format restrictions: write whatever helps agents perform the task. Recommended sections are step-by-step instructions, examples of inputs and outputs, and common edge cases. The agent loads the whole file on activation, so split long content into referenced files (see [`progressive-disclosure.md`](progressive-disclosure.md)).

## File references (File references)

Reference other files by relative path from the skill root:

```markdown
See [the reference guide](references/REFERENCE.md) for details.

Run the extraction script:
scripts/extract.py
```

Keep references one level deep from `SKILL.md` and avoid deeply nested chains. Script paths in code blocks are relative to the skill root, including inside `references/*.md`, because the agent runs commands from there (using scripts, Referencing scripts from `SKILL.md`).
