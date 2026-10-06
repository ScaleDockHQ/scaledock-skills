---
name: json-ld
description: >-
  JSON-LD 1.1: express linked data in JSON with @context, and expand, compact and frame documents. Covers JSON-LD 1.1, CBOR-LD 1.0 (track), YAML-LD 1.0 (track). Use when expanding, compacting or framing linked data, or reading CBOR-LD or YAML-LD. Triggers: JSON-LD, @context, CBOR-LD, YAML-LD.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.1"
  kind: standard
---

# JSON-LD

JSON is a useful data serialization and messaging format. This specification defines JSON-LD 1.1, a JSON-based format to serialize Linked Data. The syntax is designed to easily integrate into deployed systems that already use JSON, and provides a smooth upgrade path from JSON to JSON-LD. It is primarily intended to be a way to use Linked Data in Web-based programming environments, to build interoperable Web services, and to store Linked Data in JSON-based storage engines. This specification describes a superset of the features defined in JSON-LD 1.0 [ JSON-LD10 ] and, except where noted,

The publisher of the pinned text is named in [Sources](#sources). With this skill the agent applies that text: when expanding, compacting or framing linked data, or reading CBOR-LD or YAML-LD.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources). Quoted requirements are sentences taken from the pinned text. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: producer or consumer of this specification.
- Target version: JSON-LD 1.1 (default); JSON-LD 1.0 (legacy: read and upgrade, never author); CBOR-LD 1.0 (default, posture track); YAML-LD 1.0 (default, posture track). See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill, re-read every URL in [Sources](#sources) and check the publisher index for a newer revision or version line.

## Invariants

1. **2. Conformance.** "The key words MAY , MUST , MUST NOT , RECOMMENDED , SHOULD , and SHOULD NOT in this document are to be interpreted as described in BCP 14 [ RFC2119 ] [ RFC8174 ] when, and only when, they appear in all capitals, as shown here."
2. **6.1 Interpreting JSON as JSON-LD.** "In order to use an external context with an ordinary JSON document, when retrieving an ordinary JSON document via HTTP, processors MUST attempt to retrieve any JSON-LD document referenced by a Link Header with: rel="http://www.w3.org/ns/json-ld#context" , and type="application/ld+json" ."
3. **6.1 Interpreting JSON as JSON-LD.** "The referenced document MUST have a top-level JSON object ."
4. **6.1 Interpreting JSON as JSON-LD.** "All extra information located outside of the @context subtree in the referenced document MUST be discarded."
5. **6.1 Interpreting JSON as JSON-LD.** "A response MUST NOT contain more than one HTTP Link Header using the http://www.w3.org/ns/json-ld#context link relation."
6. **6.1 Interpreting JSON as JSON-LD.** "Content-Type: application/json Link: <https://json-ld.org/contexts/person.jsonld>; rel="http://www.w3.org/ns/json-ld#context"; type="application/ld+json" { "name": "Markus Lanthaler", "homepage": "http://www.markus-lanthaler.com/", "image": "http://twitter.com/account/profile_image/markuslanthaler" } Please note that JSON-LD documents served with the application/ld+json media type MUST have all…"
7. **6.1 Interpreting JSON as JSON-LD.** "Contexts linked via a http://www.w3.org/ns/json-ld#context HTTP Link Header MUST be ignored for such documents."
8. **6.2 Alternate Document Location.** "A response MUST NOT contain more than one HTTP Link Header using the alternate link relation with type="application/ld+json" ."

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

- [JSON-LD 1.1](https://www.w3.org/TR/json-ld11/): Recommendation, json-ld11 REC-json-ld-20140116 (Recommendation, 2020-07-16), checked 2026-10-06.
- [JSON-LD 1.0](https://www.w3.org/TR/json-ld/): Retired, json-ld REC-json-ld-20140116 (Retired, 2020-11-03), checked 2026-10-06.
- [CBOR-LD 1.0](https://www.w3.org/TR/cbor-ld-10/): Working Draft, cbor-ld-10 WD-cbor-ld-10-20260916 (Working Draft, 2026-09-28), checked 2026-10-06.
- [YAML-LD 1.0](https://www.w3.org/TR/yaml-ld-10/): Working Draft, yaml-ld-10 WD-yaml-ld-10-20261001 (Working Draft, 2026-10-05), checked 2026-10-06.
