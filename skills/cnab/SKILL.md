---
name: cnab
description: >-
  CNAB: The Cloud Native Application Bundle (CNAB) is a _standard packaging format_ for multi-component distributed applications. Covers CNAB 1.2.0. Use when packaging a cloud native application bundle. Triggers: CNAB.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.0"
  kind: standard
---

# CNAB

The Cloud Native Application Bundle (CNAB) is a _standard packaging format_ for multi-component distributed applications. It allows packages to target different runtimes and architectures. It empowers application distributors to package applications for deployment on a wide variety of cloud platforms, providers, and services. Furthermore, it provides necessary capabilities for delivering multi-container applications in disconnected (airgapped) environments.

The publisher of the pinned text is named in [Sources](#sources). With this skill the agent applies that text: when packaging a cloud native application bundle.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources). Quoted requirements are sentences taken from the pinned text. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: producer or consumer of this specification.
- Target version: CNAB 1.2.0 (default). See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill, re-read every URL in [Sources](#sources) and check the publisher index for a newer revision or version line.

## Invariants

1. **document.** "This indicates which credentials MUST be passed into the invocation image in order for the invocation image to correctly authenticate to the services used by the bundle."
2. **document.** "Credentials are injected into the invocation image, but they MUST NOT be stored."
3. **document.** "The _bundle definition_ is a single file that contains the following information: - Information about the bundle, such as name, bundle version, description, and keywords - Information about locating and running the _invocation image_ (the installer program) - A list of user-overridable parameters that this package recognizes - The list of executable images that this bundle will install - A list…"
4. **document.** "However, as a signed bundle definition represents an immutable bundle, all invocation images and images references must have a content digest."
5. **document.** "Also, when referencing tooling, the following terms are used: - `CNAB runtime` or `runtime`: A program capable of reading a CNAB bundle and executing it - `CNAB builder` or `builder`: A program that can assemble a CNAB bundle - `bundle tooling`: Programs or tooling that generate CNAB bundle contents Individual tools may meet more than one of the definitions above, they have been separated in…"

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

- [CNAB 1.2.0](https://raw.githubusercontent.com/cnabio/cnab-spec/main/100-CNAB.md): Specification, CNAB Core 1.2.0, fetched 2026-10-06 (Specification, 2026-10-06), checked 2026-10-06.
