# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are normative sentences from the published RFC text, quoted as written (only line breaks and page breaks from the plain-text layout were joined). Apply the ones that match the role. Each is labelled with the RFC and section it comes from. RFC 7396 has no BCP 14 sentences, so its group quotes the defining processing rules instead.

## RFC 6902 JavaScript Object Notation (JSON) Patch

Source: https://www.rfc-editor.org/rfc/rfc6902.html

- **RFC 6902 § 4.** Operation objects MUST have exactly one "op" member, whose value indicates the operation to perform.
- **RFC 6902 § 4.** Its value MUST be one of "add", "remove", "replace", "move", "copy", or "test"; other values are errors.
- **RFC 6902 § 4.** Additionally, operation objects MUST have exactly one "path" member.
- **RFC 6902 § 4.** Members that are not explicitly defined for the operation in question MUST be ignored (i.e., the operation will complete as if the undefined member did not appear in the object).
- **RFC 6902 § 4.1.** The operation object MUST contain a "value" member whose content specifies the value to be added.
- **RFC 6902 § 4.1.** The specified index MUST NOT be greater than the number of elements in the array.
- **RFC 6902 § 4.2.** The target location MUST exist for the operation to be successful.
- **RFC 6902 § 4.3.** The operation object MUST contain a "value" member whose content specifies the replacement value.
- **RFC 6902 § 4.4.** The operation object MUST contain a "from" member, which is a string containing a JSON Pointer value that references the location in the target document to move the value from.
- **RFC 6902 § 4.4.** The "from" location MUST NOT be a proper prefix of the "path" location; i.e., a location cannot be moved into one of its children.
- **RFC 6902 § 4.5.** The operation object MUST contain a "from" member, which is a string containing a JSON Pointer value that references the location in the target document to copy the value from.
- **RFC 6902 § 4.6.** The operation object MUST contain a "value" member that conveys the value to be compared to the target location's value.
- **RFC 6902 § 4.6.** The target location MUST be equal to the "value" value for the operation to be considered successful.
- **RFC 6902 § 5.** If a normative requirement is violated by a JSON Patch document, or if an operation is not successful, evaluation of the JSON Patch document SHOULD terminate and application of the entire patch document SHALL NOT be deemed successful.

## RFC 7396 JSON Merge Patch

Source: https://www.rfc-editor.org/rfc/rfc7396.html

- **RFC 7396 § 1.** Null values in the merge patch are given special meaning to indicate the removal of existing values in the target.
- **RFC 7396 § 2.** If the patch is anything other than an object, the result will always be to replace the entire target with the entire patch.
- **RFC 7396 § 2.** Also, it is not possible to patch part of a target that is not an object, such as to replace just some of the values in an array.
- **RFC 7396 § 2.** In addition, even if the target implementation allows multiple name/value pairs with the same name, the result of the MergePatch operation on such objects is not defined.
