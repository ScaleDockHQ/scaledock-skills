# Client integration

Read this when adding Agent Skills support to an agent or development tool. Source: [How to add skills support to your agent](https://agentskills.io/client-implementation/adding-skills-support), pinned in [Sources](../SKILL.md#sources); step names below are its headings. The guide is implementation guidance: the specification defines what goes inside a skill directory, not where skills live or how clients load them.

Two questions shape the implementation: where skills live (local filesystem, or a sandbox that needs an API, registry or bundled assets) and how the model reads skill content (its own file-read tool, or a dedicated tool or prompt injection).

## Step 1: Discover skills

At session start, find every available skill and load its metadata.

| Scope   | Path                               | Purpose                       |
| ------- | ---------------------------------- | ----------------------------- |
| Project | `<project>/.<your-client>/skills/` | The client's native location  |
| Project | `<project>/.agents/skills/`        | Cross-client interoperability |
| User    | `~/.<your-client>/skills/`         | The client's native location  |
| User    | `~/.agents/skills/`                | Cross-client interoperability |

- `.agents/skills/` is "a widely-adopted convention for cross-client skill sharing"; the specification does not mandate locations. Some clients also scan `.claude/skills/`, ancestor directories up to the git root, XDG config directories and user-configured paths. Other scopes include organization-wide and bundled skills.
- A skill is a subdirectory containing a file named exactly `SKILL.md`; other files at the top of a skills directory (such as a `README.md`) are ignored.
- Skip `.git/` and `node_modules/`, optionally respect `.gitignore`, and bound the scan (for example depth 4 to 6, at most 2000 directories).
- **Name collisions:** project-level skills override user-level skills. Within one scope, pick first-found or last-found consistently, and log a warning that a skill was shadowed.
- **Trust:** project-level skills may come from an untrusted repository. Consider loading them only when the user has marked the project trusted.
- **Sandboxed or cloud agents:** project skills travel with the cloned repository; user and organization skills must be provisioned (a configuration repository, skill URLs or packages in settings, uploads); built-in skills can ship as static assets.

## Step 2: Parse `SKILL.md` files

1. Find the opening `---` at the start of the file and the closing `---`.
2. Parse the YAML between them; extract `name` and `description` plus any optional fields.
3. The trimmed rest of the file is the body.

Malformed YAML: skills written for other clients may contain invalid YAML that their parser accepted, most often an unquoted value containing a colon. Consider retrying with the value quoted or converted to a block scalar.

Lenient validation (warn, but load when possible):

| Problem                           | Action                    |
| --------------------------------- | ------------------------- |
| `name` differs from the directory | Warn, load anyway         |
| `name` longer than 64 characters  | Warn, load anyway         |
| `description` missing or empty    | Skip the skill, log error |
| YAML completely unparseable       | Skip the skill, log error |

This deliberately relaxes the specification's `name` constraints for compatibility. Surface diagnostics to the user (debug command, log file or UI).

Store at least `name`, `description` and `location` (absolute path to `SKILL.md`), keyed by `name`. Either cache the body now or read it from `location` on activation (less memory, picks up edits). The skill's base directory is the parent of `location`; use it to resolve relative paths.

## Step 3: Disclose available skills to the model

Build a catalog of `name`, `description` and, unless the activation tool returns the directory, `location`, in any structured format:

```xml
<available_skills>
  <skill>
    <name>pdf-processing</name>
    <description>Extract PDF text, fill forms, merge files. Use when handling PDFs.</description>
    <location>/home/user/.agents/skills/pdf-processing/SKILL.md</location>
  </skill>
</available_skills>
```

`skills-ref to-prompt` emits this block, HTML-escaping name and description; its README calls the XML form recommended for Anthropic's models and lets clients format it differently.

- Place the catalog in a labeled system-prompt section, or in the description of a dedicated activation tool.
- Add a short behavioral instruction. For file-read activation: when a task matches a description, read the `SKILL.md` at the listed location first, and resolve relative paths against the skill directory using absolute paths in tool calls. For a tool: call the activation tool with the skill's name.
- Hide filtered skills entirely (disabled by the user, denied by permissions, or opted out of model-driven activation, for example via a `disable-model-invocation` flag) instead of listing them and blocking later.
- With no skills, omit the catalog, the instructions and the tool.

## Step 4: Activate skills

- **Model-driven activation** is the norm: the model decides from the catalog, not harness-side keyword matching.
  - _File-read activation:_ the model reads `SKILL.md` with its normal file tool. No extra infrastructure.
  - _Dedicated tool_ (for example `activate_skill`): required when the model cannot read files. It can strip or keep frontmatter, wrap content in tags, list bundled resources, enforce permissions or consent, and track activations. Constrain its `name` parameter to the valid skill names (for example an enum); register no tool when there are no skills.
- **User-explicit activation:** a slash command or mention such as `/skill-name` or `$skill-name`, intercepted by the harness, optionally with autocomplete.
- **What the model receives:** the full file including frontmatter (natural with file reads; `compatibility` may help at run time), or the body only, which most dedicated-tool implementations return.
- **Structured wrapping:** for example `<skill_content name="…">` with the body, the skill directory, a note that relative paths resolve against it, and a `<skill_resources>` list. This separates skill text from conversation and lets compaction find it.
- **Resources:** list them, but do not read them eagerly; cap long listings and say so.
- **Permissions:** allowlist skill directories so reading bundled files does not prompt the user each time.

## Step 5: Manage skill context over time

- Exempt activated skill content from context pruning or summarization; losing it silently degrades behaviour. Flag skill tool outputs as protected or find them by their wrapping tags.
- Track activations per session and skip re-injecting a skill already in context.
- Optionally run a skill in a subagent session that returns a summary, for complex workflows (supported by some clients only).

## Client checklist

- [ ] Scans project and user scopes, including `.agents/skills/`, with bounded depth.
- [ ] Project skills win collisions; shadowing is logged; untrusted project skills are gated.
- [ ] Skips skills with no description or unparseable YAML; warns on other problems.
- [ ] Catalog has name, description and location (or the tool returns the directory); absent when there are no skills.
- [ ] Activation by model and by user; tool `name` restricted to known skills.
- [ ] Resources listed, not preloaded; skill directories allowlisted.
- [ ] Activated skill content survives compaction and is not duplicated.
