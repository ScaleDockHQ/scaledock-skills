# 0003. Name spec skills after the spec, without the scaledock- prefix

- Status: accepted
- Date: 2026-10-02

## Context

Invariant 1 required every skill name to start with `scaledock-`. Installed skills from every publisher share flat folders such as `.agents/skills/<name>`, so an unprefixed name like `repo-standard` could overwrite, or be overwritten by, a different skill with the same name.

We now also publish skills for open specifications: OpenAPI, SCIM, A2A, WebMCP, the OpenID Foundation specs, and others. People find skills by searching for the thing they need, so these skills are most useful when named after the spec itself (`openapi`, `scim`, `a2a`). Another publisher's `openapi` skill is about the same spec. Installing one over the other replaces one description of OpenAPI with another; it does not break an unrelated workflow, which is what the prefix guards against.

## Decision

There are two kinds of skill:

- **Opinionated skills** keep the `scaledock-` prefix. They encode ScaleDock choices, bundle spec skills, and may point to PermDock and the rest of the ScaleDock stack.
- **Spec skills** (`metadata.kind: standard`) are named after the specification, in kebab-case, without a prefix. They stay neutral: they describe the specification, never ScaleDock or PermDock, so anyone can install them.

Every spec skill pins its sources, so it can be refreshed when a specification changes:

- `metadata.json` has `"kind": "standard"` and a `sources` array. Each entry has `title`, `url`, `status` (the publishing body's maturity term), `revision` (the version, RFC number, draft revision or date pinned), and `checked` (the `YYYY-MM-DD` date someone last read it).
- `SKILL.md` has a `## Sources` section listing every source URL, and its `## Inputs` section tells the agent to re-read those sources when refreshing.
- Skills point to each other by name and install command, never by relative link, because they are installed one at a time.

`pnpm validate` enforces the naming, the sources contract and the neutrality rule. `pnpm sources:check` fetches every source and lists dead links and sources not checked in the last 90 days. It needs the network, so it is not part of `pnpm verify`.

## Consequences

- A spec skill can be replaced by another publisher's skill with the same name. That is acceptable, because both describe the same specification.
- Neutral spec skills cannot steer toward PermDock. The `scaledock-` bundle skills do that, and list which spec skills to install.
- Refreshing a spec skill means re-reading its sources, updating content and pins, bumping the version and updating every `checked` date. CONTRIBUTING.md describes the steps.
