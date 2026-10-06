---
name: uri
description: >-
  Uniform Resource Identifier (URI): Generic Syntax: Uniform Resource Identifier (URI): Generic Syntax Covers RFC 3986 Uniform Resource Identifier (URI): Generic Syntax, RFC 3987 Internationalized Resource Identifiers (IRIs), RFC 8141 Uniform Resource Names (URNs), RFC 6570 URI Template. Use when parsing URIs, IRIs, URNs or URI templates. Triggers: URI, IRI, URN, URI Template.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.0"
  kind: standard
---

# Uniform Resource Identifier (URI): Generic Syntax

Uniform Resource Identifier (URI): Generic Syntax

The publisher of the pinned text is named in [Sources](#sources). With this skill the agent applies that text: when parsing URIs, IRIs, URNs or URI templates.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources). Quoted requirements are sentences taken from the pinned text. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: producer or consumer of this specification.
- Target version: RFC 3986 Uniform Resource Identifier (URI): Generic Syntax (default); RFC 3987 Internationalized Resource Identifiers (IRIs) (default); RFC 8141 Uniform Resource Names (URNs) (default); RFC 6570 URI Template (default). See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill, re-read every URL in [Sources](#sources) and check the publisher index for a newer revision or version line.

## Invariants

1. **document.** "These terms should not be mistaken as an assumption that an identifier defines or embodies the identity of what is referenced, though that may be the case for some identifiers."
2. **document.** "Nor should it be assumed that a system using URIs will access the resource identified: in many cases, URIs are used to denote resources without any intention that they be accessed."
3. **document.** "However, an action made on the basis of that reference will take place in relation to the end-user's context, which implies that an action intended to refer to a globally unique thing must use a URI that distinguishes that resource from all other things."
4. **document.** "URIs that identify in relation to the end-user's local context should only be used when the context itself is a defining aspect of the resource,"
5. **document.** "Future specifications and related documentation should use the general term "URI" rather than the more restrictive terms"
6. **document.** "o A URI might be transcribed from a non-network source and thus should consist of characters that are most likely able to be entered into a computer, within the constraints imposed by keyboards (and related input devices) across languages and locales."
7. **document.** "Such a definition should specify the character encoding used to map those characters to octets prior to being percent-encoded for the URI."
8. **document.** "As relative references can only be used within the context of a hierarchical URI, designers of new URI schemes should use a syntax consistent with the generic syntax's hierarchical components unless there are compelling reasons to forbid relative referencing within that scheme."

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

- [RFC 3986 Uniform Resource Identifier (URI): Generic Syntax](https://www.rfc-editor.org/rfc/rfc3986.html): INTERNET STANDARD, RFC 3986 (INTERNET STANDARD, January 20), checked 2026-10-06.
- [RFC 3987 Internationalized Resource Identifiers (IRIs)](https://www.rfc-editor.org/rfc/rfc3987.html): PROPOSED STANDARD, RFC 3987 (PROPOSED STANDARD, January 20), checked 2026-10-06.
- [RFC 8141 Uniform Resource Names (URNs)](https://www.rfc-editor.org/rfc/rfc8141.html): PROPOSED STANDARD, RFC 8141 (PROPOSED STANDARD, April 2017), checked 2026-10-06.
- [RFC 6570 URI Template](https://www.rfc-editor.org/rfc/rfc6570.html): PROPOSED STANDARD, RFC 6570 (PROPOSED STANDARD, March 2012), checked 2026-10-06.
