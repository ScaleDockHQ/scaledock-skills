---
name: xregistry
description: >-
  xRegistry: - [Implicit Creation of Parent Entities](#design-implicit-creation-of-parent-entities) Covers xRegistry 1.0-rc4 (build). Use when managing metadata with xRegistry. Triggers: xRegistry.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.0"
  kind: standard
---

# xRegistry

- [Implicit Creation of Parent Entities](#design-implicit-creation-of-parent-entities)

The publisher of the pinned text is named in [Sources](#sources). With this skill the agent applies that text: when managing metadata with xRegistry.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources). Quoted requirements are sentences taken from the pinned text. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: producer or consumer of this specification.
- Target version: xRegistry 1.0-rc4 (default, posture build). See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill, re-read every URL in [Sources](#sources) and check the publisher index for a newer revision or version line.

## Invariants

1. **document.** "## Notations and Terminology ### Notational Conventions The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in [RFC 2119](https://tools.ietf.org/html/rfc2119)."
2. **document.** "Server-unknown extension attributes MUST be silently stored in the backing datastore."
3. **document.** "Specification-defined attributes and server-known extension attributes MUST generate an error if the corresponding feature is not supported or enabled."
4. **document.** "In the pseudo JSON format snippets `?` means the preceding item is OPTIONAL, `*` means the preceding item MAY appear zero or more times, and `+` means the preceding item MUST appear at least once."
5. **document.** "The following are used to denote an instance of one of the associated data types (see [Attributes and Extensions](#attributes-and-extensions) for more information about each data type): - ` ` - ` ` - ` ` - ` ` - ` ` - ` ` - ` ` - ` ` - ` ` - ` ` - ` ` - ` ` - ` ` - ` ` - ` ` - ` ` - ` ` - ` ` - ` ` - one of the allowable data type names (MUST be in lower case) listed in [Attributes and…"
6. **document.** "Each Resource MUST exist under a single Group and, similar to Groups, have a set of Registry metadata."
7. **document.** "Each Resource MUST have at least one Version associated with it."
8. **document.** "`http`(./http.md) MUST define at least one REQUIRED mechanism by which the model can be retrieved."

## Workflow

1. **Pick the version.** Use the current line unless a named consumer needs a supported one. Do not author a legacy line. Emit a preview only when its posture is build and the user asked for that draft.
   -> [`references/versions.md`](references/versions.md)
   ✓ The target version is recorded, and it is not a legacy line.
2. **Apply the pinned requirements.** Walk the quotes in [`references/requirements.md`](references/requirements.md) and implement each one that applies to the role.
   -> [`references/requirements.md`](references/requirements.md)
   ✓ Each applicable quote is either implemented or recorded as out of scope for the role, with the heading it came from.
3. **Upgrade** (only when asked). Follow the upgrade section from the source line to the target.
   -> [`references/versions.md`](references/versions.md)
   ✓ The result cites the target line and no longer depends on a requirement that only the old line stated.

## Verify before done

- [ ] The artifact cites the target line's revision from [Sources](#sources).
- [ ] Every applicable quoted requirement in [`references/requirements.md`](references/requirements.md) holds.
- [ ] Nothing from a preview line is emitted unless its posture is build and the user opted in.

## Reference index

- **`references/versions.md`**: every version line, which one to use, and how to upgrade. Load for steps 1 and 3.
- **`references/requirements.md`**: quotes taken from the pinned specification. Load for step 2.

## Related skills

Install related spec skills by name with `npx skills add ScaleDockHQ/scaledock-skills --skill <name>`.

## Sources

Status uses the publishing body's own maturity term. Checked is the date the source was last read.

- [xRegistry 1.0-rc4](https://raw.githubusercontent.com/xregistry/spec/main/core/spec.md): Release candidate, xRegistry 1.0-rc4, fetched 2026-10-06 (Release candidate, 2026-10-06), checked 2026-10-06.
