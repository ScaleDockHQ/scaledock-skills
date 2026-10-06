# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## RFC 6902 JavaScript Object Notation (JSON) Patch

Source: https://www.rfc-editor.org/rfc/rfc6902.html

- **document.** Conventions The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in RFC 2119 [ RFC2119 ].
- **document.** Operations Operation objects MUST have exactly one "op" member, whose value indicates the operation to perform.
- **document.** Its value MUST be one of "add", "remove", "replace", "move", "copy", or "test"; other values are errors.
- **document.** Additionally, operation objects MUST have exactly one "path" member.
- **document.** Members that are not explicitly defined for the operation in question MUST be ignored (i.e., the operation will complete as if the undefined member did not appear in the object).
- **document.** The operation object MUST contain a "value" member whose content specifies the value to be added.
- **document.** For example: { "op": "add", "path": "/a/b/c", "value": [ "foo", "bar" ] } When the operation is applied, the target location MUST reference one of: o The root of the target document - whereupon the specified value becomes the entire content of the target document.
- **document.** The specified index MUST NOT be greater than the number of elements in the array.

## RFC 7396 JSON Merge Patch

Source: https://www.rfc-editor.org/rfc/rfc7396.html

- **document.** Code Components extracted from this document must include Simplified BSD License text as described in Section 4.e of the Trust Legal Provisions and are provided without warranty as described in the Simplified BSD License.
