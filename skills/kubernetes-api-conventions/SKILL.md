---
name: kubernetes-api-conventions
description: >-
  Kubernetes API conventions: An introduction to using resources with kubectl can be found in [the object management overview](https://kubernetes.io/docs/concepts/overview/working-with-objects/object-management/).* Covers Kubernetes API conventions. Use when designing a Kubernetes API. Triggers: Kubernetes API conventions.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.0"
  kind: standard
---

# Kubernetes API conventions

An introduction to using resources with kubectl can be found in [the object management overview](https://kubernetes.io/docs/concepts/overview/working-with-objects/object-management/).*

The publisher of the pinned text is named in [Sources](#sources). With this skill the agent applies that text: when designing a Kubernetes API.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources). Quoted requirements are sentences taken from the pinned text. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: producer or consumer of this specification.
- Target version: Kubernetes API conventions (default). See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill, re-read every URL in [Sources](#sources) and check the publisher index for a newer revision or version line.

## Invariants

1. **document.** "The standard REST verbs (defined below) MUST return singular JSON objects."
2. **document.** "### Resources All JSON objects returned by an API MUST have the following fields: * kind: a string that identifies the schema this object should have * apiVersion: a string that identifies the version of the schema the object should have These fields are required for proper decoding of the object."
3. **document.** "### Objects #### Metadata Every object kind MUST have the following metadata in a nested object field called "metadata": * namespace: a namespace is a DNS compatible label that objects are subdivided into."
4. **document.** "* uid: a unique in time and space value (typically an RFC 4122 generated identifier, see [the identifiers docs](https://kubernetes.io/docs/concepts/overview/working-with-objects/names/)) used to distinguish between objects with the same name that have been deleted and recreated Every object SHOULD have the following metadata in a nested object field called"
5. **document.** "This value MUST be treated as opaque by clients and passed unmodified back to the server."
6. **document.** "The PUT and POST verbs on objects MUST ignore the `status` values, to avoid accidentally overwriting the `status` in read-modify-write scenarios."
7. **document.** "A `/status` subresource MUST be provided to enable system components to update statuses of resources they manage."
8. **document.** "All objects that represent a physical resource whose state may vary from the user's desired intent SHOULD have a `spec` and a `status`."

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

- [Kubernetes API conventions](https://raw.githubusercontent.com/kubernetes/community/master/contributors/devel/sig-architecture/api-conventions.md): Convention, Kubernetes API conventions, fetched 2026-10-06 (Convention, 2026-10-06), checked 2026-10-06.
