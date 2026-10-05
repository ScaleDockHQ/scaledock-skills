# Progressive disclosure

Read this when deciding what goes in `SKILL.md` and what moves to bundled files, or when a skill is too long. Sources: the specification (Progressive disclosure), the overview (How do Agent Skills work?), the client guide (The core principle) and the best-practices guide, pinned in [Sources](../SKILL.md#sources).

## The three tiers

| Tier            | What loads                                    | When                                 | Budget                                               |
| --------------- | --------------------------------------------- | ------------------------------------ | ---------------------------------------------------- |
| 1. Metadata     | `name` and `description`                      | At startup, for every skill          | ~100 tokens (spec); ~50-100 per skill (client guide) |
| 2. Instructions | The full `SKILL.md` body                      | When the skill is activated          | < 5000 tokens recommended                            |
| 3. Resources    | Files in `scripts/`, `references/`, `assets/` | Only when the instructions need them | Varies                                               |

The overview names the same stages from the agent's side: **discovery** (load name and description), **activation** (a task matches the description, so the agent reads `SKILL.md`), **execution** (follow the instructions, running bundled code or loading referenced files as needed). An agent with many skills installed pays only for the catalog plus the skills it activates.

## What this means for authors

- **The description carries all of tier 1.** It is the only text the agent sees before deciding to activate, so it must say what the skill does and when to use it (optimizing descriptions, How skill triggering works).
- **Keep `SKILL.md` under 500 lines and the body under about 5000 tokens** (spec, Progressive disclosure; best practices, Structure large skills with progressive disclosure). Put "just the core instructions the agent needs on every run" there.
- **Everything in tier 2 competes for attention.** Once activated, the body sits in the context window next to the conversation, the system context and other active skills (best practices, Spending context wisely). Cut what the agent already knows.
- **Say when to load each file.** "Read `references/api-errors.md` if the API returns a non-200 status code" beats "see references/ for details" (best practices).
- **Keep gotchas in `SKILL.md`.** The agent reads them before it meets the situation; in a separate file it may not recognize the trigger to load them (best practices, Gotchas sections).
- **Keep references one level deep.** `SKILL.md` links to each file directly; avoid chains where one reference points to the next (spec, File references).
- **Keep each reference file focused.** Agents load them on demand, so smaller files use less context (spec, `references/`).
- **Templates:** short ones inline in `SKILL.md`; long ones, or ones needed only in some cases, in `assets/` and referenced (best practices, Templates for output format).

## Splitting a long skill

1. Measure: line count of `SKILL.md`, and a rough token count of the body.
2. Keep in `SKILL.md`: inputs, the core workflow, gotchas, the validation step, and an index of bundled files with a load condition each.
3. Move to `references/`: detailed field references, long examples, domain material used only on some paths.
4. Move to `scripts/`: logic the agent would otherwise rewrite on every run (best practices, Bundling reusable scripts).
5. Move to `assets/`: templates, schemas, lookup tables.
6. Re-check: every moved file is linked from `SKILL.md` by a relative path, and nothing links only from another reference file.

## What clients do with the tiers

Clients put tier 1 in a catalog at session start, deliver tier 2 on activation, and may list tier 3 files without reading them; the model reads them on demand (client guide, Step 3 and Step 4, Listing bundled resources). See [`client-integration.md`](client-integration.md).
