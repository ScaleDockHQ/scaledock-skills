# DID syntax, DID URLs and DID parameters

Read this when parsing, generating, comparing or validating a DID or a DID URL, adding DID parameters, or expanding relative DID URLs. Sources: DID 1.0 § 3, DID 1.1 § 3 and § 5.1.3, and DID Resolution § 3, listed in [Sources](../SKILL.md#sources).

## DID syntax

All DIDs MUST conform to this ABNF, which is identical in DID 1.0 § 3.1 and DID 1.1 § 3.1. Rules not defined here come from RFC 3986; `ALPHA`, `DIGIT` and `HEXDIG` from RFC 5234.

```abnf
did                = "did:" method-name ":" method-specific-id
method-name        = 1*method-char
method-char        = %x61-7A / DIGIT
method-specific-id = *( *idchar ":" ) 1*idchar
idchar             = ALPHA / DIGIT / "." / "-" / "_" / pct-encoded
pct-encoded        = "%" HEXDIG HEXDIG
```

What the ABNF means in practice:

- The scheme is the literal `did:`.
- The method name is one or more lowercase ASCII letters (`a` to `z`) and digits. Uppercase, `-`, `_` and `.` are not allowed in it.
- The method-specific identifier may contain colons, even consecutive ones, but it must end with at least one `idchar`, so it cannot be empty or end in a colon.
- `/`, `?` and `#` are not `idchar`s. They start the path, query and fragment of a DID URL, so a bare DID never contains them.
- Non-ASCII characters must be percent-encoded.
- Case sensitivity and normalization of the method-specific identifier are defined by each DID method (DID 1.0 § 8.1, DID 1.1 § 7.1), so do not lowercase or otherwise normalize it generically.
- The meaning of colons in the method-specific identifier is method-specific; do not assume a generic meaning (DID 1.0 § 8.1 note, DID 1.1 § 7.1 note).

```text
did:example:123456789abcdefghi        valid
did:web:example.com%3A3000:user:alice valid (did:web encodes the port colon)
did:Example:123                       invalid: uppercase in method name
did:example:                          invalid: empty method-specific-id
did:example:abc:                      invalid: trailing colon
did:example:abc?x=1                   a DID URL, not a DID
```

## DID URL syntax

All DID URLs MUST conform to (DID 1.0 § 3.2, DID 1.1 § 3.2):

```abnf
did-url = did path-abempty [ "?" query ] [ "#" fragment ]
```

`path-abempty`, `query` and `fragment` are the RFC 3986 rules (§ 3.3, § 3.4, § 3.5). DID methods can restrict these rules further (DID 1.0 § 8.1, DID 1.1 § 7.1).

- **Path.** Identical to a generic URI path. Path semantics can be specified by DID methods (DID 1.1 § 3.2, Path). Example: `did:example:123456/path`.
- **Query.** Identical to a generic URI query (DID 1.1 § 3.2, Query). Example: `did:example:123456?versionId=1`. Avoid comparing DID URLs that carry more than one query parameter without a specification designed for that purpose; no normalization rules are defined for query parameters in DID Core (DID 1.1 § 3.2, Query note).
- **Fragment.** Identical to a generic URI fragment, used as a method-independent reference into a DID document or external resource, for example `did:example:123#public-key-1` or `did:example:123#service-5`. Interpret fragments the same way across representations; JSON Pointer in a fragment will not be interpreted the same way in non-JSON representations (DID 1.0 § 3.2, DID 1.1 § 3.2, Fragment).
- **Semicolon.** `;` is allowed by the syntax but reserved: future versions may use it as a parameter delimiter, so do not use it (DID 1.0 § 3.2, DID 1.1 § 3.2 note).

## Identifier restrictions in DID documents

From DID 1.1 § 5.1.3 (DID 1.0 enforces the first point through the `id` and `controller` value rules in § 5.1.1 and § 5.1.2):

- The `id` of the DID subject and each DID `controller` cannot carry a query or fragment: they follow DID syntax, not DID URL syntax.
- Verification method and service identifiers follow DID URL syntax, so they can carry a query or fragment.
- Query parameters in long-lived canonical identifiers are discouraged: they complicate resolution and enlarge the attack surface.
- Fragments are expected to be unique within a DID document. Do not reuse a fragment for a different resource over time, such as two different verification methods.

## Relative DID URLs

A relative DID URL is any URL value in a DID document that does not start with `did:<method-name>:<method-specific-id>`. It references a resource in the same DID document and MAY contain relative path components, query parameters and fragments (DID 1.0 § 3.2.2, DID 1.1 § 3.2.1).

- To resolve one, the RFC 3986 § 5 reference resolution algorithm MUST be used, with the DID of the DID subject as the base URI: scheme `did`, authority `<method-name>:<method-specific-id>` (DID 1.0 § 3.2.2, DID 1.1 § 3.2.1).
- Example: in the document for `did:example:123456789abcdefghi`, `"authentication": ["#key-1"]` expands to `did:example:123456789abcdefghi#key-1`.
- DID Resolution adds the `expandRelativeUrls` option, which makes the resolver replace relative DID URLs in services, verification methods, verification relationships and extension properties with absolute ones (Resolution § 4.1, § 4.4).
- DID 1.0 requires a verification method `id` to conform to DID URL syntax (DID 1.0 § 5.2); DID 1.1 also allows a relative DID URL there (DID 1.1 § 5.2). Relative references inside `authentication` and other relationships are allowed in both.

## DID parameters

A DID parameter is a query parameter that becomes part of the identifier for a resource. Support for all DID parameters is OPTIONAL; where a parameter is supported it is expected to work the same across DID methods (DID 1.0 § 3.2.1, Resolution § 3).

| Parameter     | Meaning                                                                                                 | DID 1.0 § 3.2.1 | Resolution § 3 |
| ------------- | ------------------------------------------------------------------------------------------------------- | --------------- | -------------- |
| `service`     | Selects a service from the DID document by service ID.                                                  | yes             | yes            |
| `serviceType` | Selects one or more services by service type.                                                           | no              | yes            |
| `relativeRef` | A relative URI reference (RFC 3986 § 4.2) to a resource at the service endpoint selected by `service`.  | yes             | yes            |
| `versionId`   | A specific version of the DID document (sequential, UUID or method-specific).                           | yes             | yes            |
| `versionTime` | The DID document version valid at (DID 1.0) or most recently before (Resolution) a timestamp.           | yes             | yes            |
| `hl`          | A hashlink resource hash of the DID document for integrity protection; marked non-normative in DID 1.0. | yes             | no             |

Value rules:

- DID 1.0: each value MUST be an ASCII string; `relativeRef` MUST percent-encode characters per RFC 3986 § 2.1; `versionTime` MUST be an XML Schema datetime normalized to UTC without sub-second precision, such as `2020-12-20T19:17:47Z` (DID 1.0 § 3.2.1).
- DID Resolution: each value MUST be a scalar string serialized into ASCII per RFC 3987 § 3.1; `versionTime` MUST use the datetime format of Resolution § 3.1 (XML datetime as defined by VC Data Model 2.0, adjusted to UTC without sub-second precision) (Resolution § 3, § 3.1).
- `versionId` and `versionTime` are mutually exclusive (Resolution § 13.4).
- New parameters: it is RECOMMENDED to register them, in the DID Specification Registries (DID 1.0 § 3.2.1) or the DID Document Properties Extensions (Resolution § 3), to avoid collisions.
- Use a DID parameter when the parameter says which resource is identified. Pass a resolution option when it only controls how the resource is resolved or dereferenced; options are not part of the DID URL (DID 1.0 § 3.2.1 note, Resolution § 3).

Examples:

```text
did:example:123?versionTime=2021-05-10T17:00:00Z
did:example:123?service=files&relativeRef=/resume.pdf
did:example:1234?service=files&relativeRef=%2Fmyresume%2Fdoc%3Fversion%3Dlatest
```

## Query normalization (DID Resolution § 3.2)

Clients, caches and resolvers that parse, log, cache, compare or forward DID URLs should normalize them the same way:

- **Percent-encoding** (non-normative, § 3.2.1): decode percent-encoded unreserved characters, use uppercase hex for the rest, and do not decode encoded delimiters such as `%26` and `%3D`. Do not decode the encoded path and query characters inside a `relativeRef` value.
- **Duplicates** (§ 3.2.2): DID parameters are scalar, so a duplicate such as `?service=files&service=agent` is ambiguous. One reasonable approach is to reject the DID URL with `INVALID_DID_URL`. Methods that define their own parameters are encouraged to state whether duplicates are allowed.
- **Method canonicalization** (§ 3.2.3): parameter names defined by DID Resolution are case-sensitive ASCII; treat values as case-sensitive and parameter order as insignificant unless the method says otherwise. Compare DID URLs for equivalence after percent-encoding normalization, ignoring parameter order.

## Common mistakes

- Lowercasing or URL-normalizing the whole DID. Only the scheme and method name have fixed case; the method defines the rest.
- Splitting a DID on `:` and assuming the third segment is the whole identifier. The method-specific identifier can contain colons.
- Treating `did:example:123?versionId=1` as the DID. The DID is `did:example:123`; the rest is a DID URL query.
- Building DID URLs by string concatenation without percent-encoding caller-supplied values; `files&versionId=2` as a `service` value injects a parameter (Resolution § 13.7.3).
- Using JSON Pointer fragments, which other representations will not interpret the same way.
