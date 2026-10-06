---
name: webdav
description: >-
  HTTP Extensions for Web Distributed Authoring and Versioning (WebDAV): HTTP Extensions for Web Distributed Authoring and Versioning (WebDAV) Covers RFC 4918 HTTP Extensions for Web Distributed Authoring and Versioning (WebDAV), RFC 4791 Calendaring Extensions to WebDAV (CalDAV), RFC 6352 CardDAV: vCard Extensions to Web Distributed Authoring and Versioning (WebDAV). Use when implementing WebDAV, CalDAV or CardDAV. Triggers: WebDAV, CalDAV, CardDAV.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.0"
  kind: standard
---

# HTTP Extensions for Web Distributed Authoring and Versioning (WebDAV)

HTTP Extensions for Web Distributed Authoring and Versioning (WebDAV)

The publisher of the pinned text is named in [Sources](#sources). With this skill the agent applies that text: when implementing WebDAV, CalDAV or CardDAV.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources). Quoted requirements are sentences taken from the pinned text. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: producer or consumer of this specification.
- Target version: RFC 4918 HTTP Extensions for Web Distributed Authoring and Versioning (WebDAV) (default); RFC 4791 Calendaring Extensions to WebDAV (CalDAV) (default); RFC 6352 CardDAV: vCard Extensions to Web Distributed Authoring and Versioning (WebDAV) (default). See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill, re-read every URL in [Sources](#sources) and check the publisher index for a newer revision or version line.

## Invariants

1. **document.** "The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in [ RFC2119 ]."
2. **document.** "All instances of a given live property MUST comply with the definition associated with that property name."
3. **document.** "extensions because they will still have the data specified in the original schema and MUST ignore elements they do not understand."
4. **document.** "Servers MUST preserve the following XML Information Items (using the terminology from [ REC-XML-INFOSET ]) in storage and transmission of dead properties: For the property name Element Information Item itself: [namespace name] [local name] [ attributes ] named "xml:lang" or any such attribute in scope [ children ] of type element or character On all Element Information Items in the property…"
5. **document.** "Servers MUST ignore the XML attribute xml:space if present and never use it to change whitespace handling."
6. **document.** "Dusseault Standards Track [Page 14] RFC 4918 WebDAV June 2007 All DAV-compliant resources MUST support the HTTP URL namespace model specified herein."
7. **document.** "A collection MUST contain at most one mapping for a given path segment, i.e., it is illegal to have the same path segment mapped to more than one resource."
8. **document.** "For all WebDAV-compliant resources A and B, identified by URLs "U" and "V", respectively, such that "V" is equal to "U/SEGMENT", A MUST be a collection that contains a mapping from "SEGMENT" to B."

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

- [RFC 4918 HTTP Extensions for Web Distributed Authoring and Versioning (WebDAV)](https://www.rfc-editor.org/rfc/rfc4918.html): PROPOSED STANDARD, RFC 4918 (PROPOSED STANDARD, June 2007), checked 2026-10-06.
- [RFC 4791 Calendaring Extensions to WebDAV (CalDAV)](https://www.rfc-editor.org/rfc/rfc4791.html): PROPOSED STANDARD, RFC 4791 (PROPOSED STANDARD, March 2007), checked 2026-10-06.
- [RFC 6352 CardDAV: vCard Extensions to Web Distributed Authoring and Versioning (WebDAV)](https://www.rfc-editor.org/rfc/rfc6352.html): PROPOSED STANDARD, RFC 6352 (PROPOSED STANDARD, August 201), checked 2026-10-06.
