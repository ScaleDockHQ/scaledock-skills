---
name: odata
description: >-
  OData: https://docs.oasis-open.org/odata/odata/v4.01/os/part1-protocol/odata-v4.01-os-part1-protocol.docx Covers OData 4.01, OData 4.0 (supported). Use when serving or querying an OData service. Triggers: OData, $filter.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.0"
  kind: standard
---

# OData

https://docs.oasis-open.org/odata/odata/v4.01/os/part1-protocol/odata-v4.01-os-part1-protocol.docx

The publisher of the pinned text is named in [Sources](#sources). With this skill the agent applies that text: when serving or querying an OData service.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources). Quoted requirements are sentences taken from the pinned text. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: producer or consumer of this specification.
- Target version: OData 4.01 (default); OData 4.0 (supported). See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill, re-read every URL in [Sources](#sources) and check the publisher index for a newer revision or version line.

## Invariants

1. **1.1 Terminology.** "The key words �MUST�, �MUST NOT�, �REQUIRED�, �SHALL�, �SHALL NOT�, �SHOULD�, �SHOULD NOT�, �RECOMMENDED�, �MAY�, and �OPTIONAL� in this document are to be interpreted as described in [RFC2119] ."
2. **4.1 Entity-Ids and Entity References.** "The entity-id MUST be an IRI as defined in [RFC3987] and MAY be expressed in payloads, headers, and URLs as a relative reference as appropriate."
3. **4.1 Entity-Ids and Entity References.** "While the client MUST be prepared to accept any IRI, services MUST use valid URIs in this version of the specification since there is currently no lossless representation of an IRI in the EntityId header."
4. **5.1 Protocol Versioning.** "Services SHOULD advertise supported versions of OData through the Core.ODataVersions term, defined in [OData-VocCore] ."
5. **5.2 Model.** "Services that version their metadata MUST support version-specific requests according to the $schemaversion system query option."
6. **5.2 Model.** "In particular, clients SHOULD be prepared to receive properties and derived types not previously defined by the service."
7. **5.2 Model.** "Services SHOULD NOT change their data model depending on the authenticated user."
8. **5.2 Model.** "If the data model is user or user-group dependent, all changes MUST be safe changes as defined in this section when comparing the full model to the model visible to users with restricted authorizations."

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

- [OData 4.01](https://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html): OASIS Standard, OData 4.01 protocol, fetched 2026-10-06 (OASIS Standard, 2026-10-06), checked 2026-10-06.
- [OData 4.0](https://docs.oasis-open.org/odata/odata/v4.0/os/part1-protocol/odata-v4.0-os-part1-protocol.html): OASIS Standard, OData 4.0 protocol, fetched 2026-10-06 (OASIS Standard, 2026-10-06), checked 2026-10-06.
