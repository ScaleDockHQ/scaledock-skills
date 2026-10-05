# Document structure

Read this when modelling resources or producing and parsing JSON:API documents. Source: the JSON:API v1.1 specification, Document Structure, listed in [Sources](../SKILL.md#sources). Citations name the heading. Differences from 1.0 are in [`versions.md`](versions.md).

JSON:API documents are JSON (RFC 8259). The same media type is used for requests and responses; where a rule applies to only one, the spec says so (Document Structure).

## Top level

A JSON object is at the root of every request and response document that contains data (Top Level).

| Member     | Rule                                                                                  |
| ---------- | ------------------------------------------------------------------------------------- |
| `data`     | Primary data. One of `data`, `errors`, `meta` or an extension member MUST be present. |
| `errors`   | Array of error objects. MUST NOT coexist with `data`.                                 |
| `meta`     | Meta object with non-standard information.                                            |
| `jsonapi`  | Optional object describing the implementation.                                        |
| `links`    | Optional links object for the document as a whole.                                    |
| `included` | Optional array of related resource objects. MUST NOT be present without `data`.       |

Top-level `links` MAY contain `self` (the link that generated the document), `related` (when the primary data is a relationship), `describedby` (a description document such as OpenAPI or JSON Schema) and pagination links. With extensions or profiles applied, `self` SHOULD be a link object whose `type` gives the media type with all its parameters. The `self` link should carry every query parameter the client used, so it can be followed as is (Top Level).

Primary data is (Top Level):

- for a single resource: a resource object, a resource identifier object, or `null`;
- for a collection: an array of resource objects, an array of resource identifier objects, or `[]`. A collection is always an array, even with one or zero items.

## Resource objects

A resource object MUST contain `type` and `id`, and MAY contain `attributes`, `relationships`, `links` and `meta` (Resource Objects).

- `id` may be omitted only when the object originates at the client and represents a new resource; it MAY then carry `lid`, which MUST be identical for every representation of that resource in the document, including resource identifier objects (Identification).
- `id`, `type` and `lid` values MUST be strings (Identification).
- Within an API, a `type` and `id` pair MUST identify one unique resource (Identification).
- `type` values follow the member name rules. The spec is agnostic about plural or singular, but use one form consistently (Identification).
- Attributes and relationships are "fields". Fields share a namespace with each other and with `type` and `id` (Fields).

### Attributes

`attributes` MUST be an object. Attribute values may be any JSON, including nested objects and arrays. Keys that reference related resources, such as `author_id`, SHOULD NOT be attributes; use relationships (Attributes).

### Relationships

`relationships` MUST be an object; each member is a relationship whose value MUST be a relationship object. A relationship object MUST contain at least one of (Relationships):

- `links`, with at least one of `self` (the relationship link, used to read and change linkage), `related` (the related resource link) or an extension member;
- `data`: resource linkage;
- `meta`;
- an extension member.

A to-many relationship MAY carry pagination links in its `links`; they paginate the relationship data, not the related resources (Relationships).

A related resource link, if present, MUST be a valid URL even when the relationship is empty, and MUST NOT change when the relationship's content changes (Related Resource Links).

### Resource linkage

Resource linkage MUST be one of (Resource Linkage):

- `null` for an empty to-one relationship;
- `[]` for an empty to-many relationship;
- a resource identifier object for a non-empty to-one relationship;
- an array of resource identifier objects for a non-empty to-many relationship.

The spec gives no meaning to the order of linkage arrays; implementations may (Resource Linkage).

### Resource links

A resource's `links` MAY contain `self`. A server MUST answer a `GET` on that URL with the resource as primary data (Resource Links).

## Resource identifier objects

A resource identifier object MUST contain `type`, and `id` unless it represents a new resource, in which case `lid` MUST be included. Values are strings. It MAY contain `meta` (Resource Identifier Objects). It has no `attributes`, `relationships` or `links`.

## Compound documents

- Included resources go in a top-level `included` array of resource objects (Compound Documents).
- Every included resource MUST be reachable through a chain of relationships from the primary data ("full linkage"). The only exception is linkage removed by sparse fieldsets (Compound Documents).
- A compound document MUST NOT include more than one resource object per `type` and `id` pair. For resources with only a `lid`, the `lid` establishes identity (Compound Documents).

```json
{
  "data": {
    "type": "articles",
    "id": "1",
    "attributes": { "title": "JSON:API paints my bikeshed!" },
    "relationships": {
      "author": {
        "links": {
          "self": "/articles/1/relationships/author",
          "related": "/articles/1/author"
        },
        "data": { "type": "people", "id": "9" }
      }
    }
  },
  "included": [
    { "type": "people", "id": "9", "attributes": { "firstName": "Dan" } }
  ]
}
```

## Meta

Every `meta` value MUST be an object; any members are allowed inside it (Meta Information).

## Links

A `links` value MUST be an object. Each link is a URI-reference string (RFC 3986 § 4.1), a link object, or `null` when the link does not exist. The relation type SHOULD be inferred from the link name unless a link object has `rel`. A link's context is the object it appears in (Links).

A link object MUST contain `href` and MAY contain (Link objects):

- `rel`: a valid link relation type;
- `describedby`: a link to a description document for the target;
- `title`: a human-readable label;
- `type`: the target's media type (a hint);
- `hreflang`: a language tag or array of tags (RFC 5646), a hint;
- `meta`.

## The `jsonapi` object

If present, `jsonapi` MUST be an object and MAY contain `version` (the highest version supported), `ext` (URIs of applied extensions), `profile` (URIs of applied profiles) and `meta`. `ext` and `profile` here MUST NOT be used for content negotiation; negotiation happens only through the `Content-Type` media type parameters. Without `version`, clients should assume at least 1.0 (JSON:API Object).

## Member names

Implementation and profile defined member names MUST be case sensitive and (Member Names):

- contain at least one character;
- use only allowed characters;
- start and end with a globally allowed character: `a-z`, `A-Z`, `0-9`, or U+0080 and above (not recommended, not URL safe).

`-`, `_` and space (space not recommended) are allowed except as first or last character (Allowed Characters). Using only non-reserved, URL-safe characters from RFC 3986 is RECOMMENDED (Member Names).

These MUST NOT appear (Reserved Characters): `+ , . [ ] ! " # $ % & ' ( ) * / : ; < = > ? @ \ ^ { | } ~`, the grave accent (U+0060), DELETE (U+007F) and the C0 controls (U+0000 to U+001F). `@` is the exception as the first character of an @-Member.

- **@-Members** start with `@`, MAY appear anywhere, are implementation semantics, and MUST be ignored when interpreting the spec. An `@context` inside `attributes` is not an attribute (@-Members).
- **Extension members** are the extension's namespace, a colon, and a name that follows the implementation member name rules, for example `version:id` (Extension Members).

## No additional members

Unless noted, objects defined by the spec or an applied extension MUST NOT contain additional members, and clients and servers MUST ignore non-compliant members (Document Structure). Put custom data in `attributes` or `meta`, not as new keys on a resource object.

## Common mistakes

- Returning a single object instead of a one-item array for a collection (Top Level).
- Sending `{"data": ..., "errors": [...]}` for partial success; writes are all or nothing (Top Level; Creating, Updating and Deleting Resources).
- Numeric `id` values: `id` MUST be a string (Identification).
- `author_id` as an attribute next to an `author` relationship (Attributes).
- Including a resource no relationship points to, or the same resource twice (Compound Documents).
- Custom keys such as `version` directly on a resource object; use `meta`, an attribute, or an extension namespace (Document Structure; Extension Members).
