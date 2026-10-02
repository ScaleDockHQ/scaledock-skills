# Overlay objects and merge rules

Read this when writing or reviewing actions. Section numbers are from Overlay 1.2.0; fields marked 1.2 do not exist in 1.1.0.

## Overlay Object (§ 4.5.1)

| Field        | Rule                                                                                                            |
| ------------ | --------------------------------------------------------------------------------------------------------------- |
| `overlay`    | REQUIRED. The Overlay Specification version the document uses; tooling SHOULD use it to interpret the document. |
| `$self`      | 1.2. A URI reference for this overlay, also its base URI. MUST NOT contain a fragment.                          |
| `info`       | REQUIRED. Info Object.                                                                                          |
| `extends`    | URI reference of the target document. Without it, tooling decides which description(s) to apply the overlay to. |
| `actions`    | REQUIRED. Ordered list of Action Objects or (1.2) Reusable Action Reference Objects; at least one entry.        |
| `components` | 1.2. Components Object.                                                                                         |

The Overlay Object MAY be extended with specification extensions. Actions MUST be applied in sequential order, each to the result of the previous one, so an object can be deleted by one action and re-created by a later one (§ 4.5.1.1).

Relative `extends` values resolve against `$self` when present, otherwise against the next base URI source, usually the retrieval URI (§ 4.4.1). Implementations MUST check every target document they were given before treating `extends` as unresolvable (§ 4.3).

## Info Object (§ 4.5.2)

`title` (REQUIRED, the purpose of the overlay), `version` (REQUIRED, the overlay's own version), `description` (CommonMark).

## Action Object (§ 4.5.4)

| Field         | Rule                                                                                                                                                        |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `target`      | REQUIRED. An RFC 9535 JSONPath query selecting nodes in the target document.                                                                                |
| `description` | CommonMark.                                                                                                                                                 |
| `update`      | The value to merge, concatenate, append or replace with; see below. Ignored when `remove` is `true` or `copy` is set.                                       |
| `copy`        | A JSONPath expression selecting a single node in the target document whose value is used like `update`. Ignored when `remove` is `true` or `update` is set. |
| `remove`      | When `true`, each target node MUST be removed from its containing map or array. Default `false`.                                                            |

Selection rules:

- Zero matches: the action succeeds and changes nothing.
- Two or more matches for `update` or `copy`: the nodes MUST be all objects, all arrays or all primitives.

What `update` (or the copied value) must be:

| Target selects | Value                  | Effect                     |
| -------------- | ---------------------- | -------------------------- |
| objects        | an object              | merged into each object    |
| arrays         | an array               | concatenated to each array |
| arrays         | an object or primitive | appended to each array     |
| primitives     | a primitive            | replaces each node         |

Recursive merge of an object into a target object:

1. A property only in the target is left unchanged.
2. A property only in the update is inserted.
3. A property in both: primitive replaces primitive, array concatenates to array, object merges recursively into object. Any other combination is an error.

Merging never deletes. To replace an array or object wholesale, `remove` it in one action and `update` its parent in the next.

## Components Object (§ 4.5.3, 1.2)

`actions`: a map of name to Reusable Action Object. When a key is used in a `$ref`, it is a JSON Pointer token and MUST be escaped per RFC 6901 § 3 (`~` as `~0`, `/` as `~1`).

## Reusable Action Object (§ 4.5.5, 1.2)

| Field         | Rule                                                                               |
| ------------- | ---------------------------------------------------------------------------------- |
| `description` | Documents the reusable action itself, independent of the action's own description. |
| `fields`      | An Action Object with no required fields; `target` MUST NOT be present.            |

A reusable action has no effect until a Reusable Action Reference Object uses it.

## Reusable Action Reference Object (§ 4.5.6, 1.2)

| Field         | Rule                                                                                                       |
| ------------- | ---------------------------------------------------------------------------------------------------------- |
| `$ref`        | REQUIRED. A same-document reference whose fragment is a JSON Pointer starting with `/components/actions/`. |
| `target`      | REQUIRED. RFC 9535 JSONPath query.                                                                         |
| `description` | When both the reference and the referenced `fields` have a description, the reference's MUST be used.      |

The reference MAY also carry action fields that override the reusable action's values for that use (§ 4.5.6).

## Extensions, naming and comments

- Extension fields start with `x-`; `x-oai-` and `x-oas-` are reserved for the OAI (§ 4.7).
- Files MAY be named `purpose.overlay.yaml` (§ 4.8).
- Applying actions MAY drop YAML or JSONC comments from the result (§ 4.10).
- Field names are case-sensitive (§ 4.2). Implementations MUST accept JSON or YAML overlays and targets in either format (§ 4.2).

## JSONPath notes (RFC 9535)

Overlay tools MUST implement RFC 9535 fully, and interoperable overlays MUST NOT rely on tool-specific JSONPath (§ 4.9). Libraries that predate the RFC may use incompatible syntax (§ 4.9).

| Construct      | Example                                                 | RFC 9535    |
| -------------- | ------------------------------------------------------- | ----------- |
| Root           | `$`                                                     | § 2.2       |
| Name selector  | `$.paths['/orders/{orderId}']`                          | § 2.3.1     |
| Wildcard       | `$.paths.*.get`                                         | § 2.3.2     |
| Index          | `$.tags[0]`                                             | § 2.3.3     |
| Filter         | `$.paths.*[?@.operationId == 'getOrder']`               | § 2.3.5     |
| Existence test | `$.paths.*[?@.deprecated]`                              | § 2.3.5.2.1 |
| Descendants    | `$..parameters`                                         | § 2.5.2     |
| Functions      | `length()`, `count()`, `match()`, `search()`, `value()` | § 2.4       |

Quote path keys with bracket notation, because they contain `/` and `{}`. A filter iterates over the members of the node it is applied to and selects the members that pass (§ 2.3.5), so `$.paths.*[?@.operationId == 'getOrder']` selects the operation object inside each path item, not the path item.
