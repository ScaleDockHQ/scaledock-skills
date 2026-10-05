# Members, problem types and the registry

All section numbers refer to RFC 9457 unless another document is named.

## The problem details object

The canonical model is a JSON object, served as `application/problem+json` (§ 3). Every member is optional. If a member's value has the wrong JSON type, consumers ignore it and continue as if it were absent (§ 3.1).

| Member     | JSON type              | Meaning                                                                         | Rules                                                                                                                                                                                                                                                                                                                                                         |
| ---------- | ---------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `type`     | string (URI reference) | Identifies the problem type (§ 3.1.1).                                          | Consumers MUST use it, after resolution, as the primary identifier. Absent means `about:blank`. Absolute URIs are RECOMMENDED; relative ones should carry the full path, such as `/types/123`. A locator URI SHOULD dereference to human-readable documentation; consumers SHOULD NOT dereference it automatically, except to show information to developers. |
| `status`   | number                 | The HTTP status code the origin server generated for this occurrence (§ 3.1.2). | Advisory only. Generators MUST use the same code in the actual response.                                                                                                                                                                                                                                                                                      |
| `title`    | string                 | A short, human-readable summary of the problem type (§ 3.1.3).                  | SHOULD NOT change between occurrences, except for localization through content negotiation.                                                                                                                                                                                                                                                                   |
| `detail`   | string                 | A human-readable explanation of this occurrence (§ 3.1.4).                      | Ought to help the client correct the problem, not give debugging information. Consumers SHOULD NOT parse it.                                                                                                                                                                                                                                                  |
| `instance` | string (URI reference) | Identifies this occurrence (§ 3.1.5).                                           | If dereferenceable, it can return the problem details object; otherwise it is an opaque identifier. Absolute URIs are RECOMMENDED.                                                                                                                                                                                                                            |

The language of `title` and `detail` can be negotiated with `Accept-Language` (§ 1, citing RFC 9110 § 12.5.4).

Problem details can be used with any status code but fit 4xx and 5xx responses best (§ 1). When a response is still a representation of a resource, describing the problem in that resource's format is often preferable (§ 1).

## Type URIs

- A type URI may be non-resolvable, for example a `tag:` URI (§ 3.1.1). Resolvable URIs are encouraged, because switching from a non-resolvable URI later creates a new identity for the type and is a breaking change (§ 3.1.1).
- A relative `type` resolves against the document's base URI, so the same relative value can identify different types on different resources. Prefer absolute URIs (§ 3.1.1).
- A type URI you mint ought to be under your control and stable over time (§ 4.1).
- A problem type URI SHOULD resolve to HTML documentation that explains how to resolve the problem (§ 4).

## about:blank

`about:blank` is registered by RFC 9457 itself (§ 4.2.1). It means the problem has no semantics beyond the HTTP status code. It is the default when `type` is absent. With `about:blank`, `title` SHOULD be the recommended status phrase for the code ("Not Found" for 404), and MAY be localized (§ 4.2.1).

Truly generic conditions are usually better expressed as a plain status code than as a new type (§ 4). A 403 on a `PUT` already says "write access disallowed".

## Defining a new problem type

A new problem type definition MUST document (§ 4):

1. a type URI, typically `http` or `https`;
2. a short title;
3. the HTTP status code it is used with.

It MAY also:

- specify the use of `Retry-After` (RFC 9110 § 10.2.3) where appropriate (§ 4);
- define additional members, for example typed links (RFC 8288) a machine can follow to resolve the problem (§ 4).

Before defining a type, check whether the application already has a format that can carry the error; problem details are meant to avoid new error formats, not replace domain-specific ones (§ 4, § 4.1).

## Extension members

Problem type definitions MAY add members specific to that type (§ 3.2). Clients MUST ignore extensions they do not recognize, so types can evolve (§ 3.2).

Naming (§ 4): extension names SHOULD start with a letter (ALPHA), SHOULD contain only ALPHA, DIGIT and `_`, and SHOULD be three characters or longer, so they serialize in formats other than JSON. To be usable in the XML format, they need to match the XML `Name` rule (§ 3.2).

The § 3 examples define:

- `balance` and `accounts` on an out-of-credit type;
- `errors`, an array of objects with `detail` and `pointer` (a JSON Pointer, RFC 6901, into the request content), for reporting several validation errors of the same type in one response.

## Multiple problems

Extensions can carry several occurrences of the same type, as `errors` does (§ 3). When problems of different types occur together, it is RECOMMENDED to return the most relevant or urgent one; generic "batch" types do not map well onto HTTP semantics (§ 3).

## The HTTP Problem Types registry

RFC 9457 creates the IANA "HTTP Problem Types" registry for common, widely used type URIs (§ 4.2).

- Policy: Specification Required (§ 4.2). The specification need not be a standard, but should be stable and freely available.
- Vendor-specific, application-specific and deployment-specific values cannot be registered (§ 4.2).
- Registrations MAY use the prefix `https://iana.org/assignments/http-problem-types#`; such URIs may not resolve (§ 4.2).
- Template: Type URI, Title, Recommended HTTP status code, Reference (§ 4.2).
- The registry page says requests go through the registration request interface at `https://github.com/protocol-registries/http-problem-types` or the HTTPAPI mailing list.

Entries as of the registry's last update (2026-06-26), read 2026-10-02:

| Type URI                                                                        | Title                                           | Status | Reference                                                |
| ------------------------------------------------------------------------------- | ----------------------------------------------- | ------ | -------------------------------------------------------- |
| `about:blank`                                                                   | See HTTP Status Code                            | N/A    | RFC 9457                                                 |
| `https://iana.org/assignments/http-problem-types#date`                          | Date Not Acceptable                             | 400    | RFC 9458, § 6.5.2                                        |
| `https://iana.org/assignments/http-problem-types#ohttp-key`                     | Oblivious HTTP key configuration not acceptable | 400    | RFC 9458, § 5.3                                          |
| `https://iana.org/assignments/http-problem-types#digest-unsupported-algorithms` | Unsupported Hashing Algorithms                  | 400    | draft-ietf-httpapi-digest-fields-problem-types-06, § 3.1 |
| `https://iana.org/assignments/http-problem-types#digest-invalid-values`         | Invalid Digest Values                           | 400    | draft-ietf-httpapi-digest-fields-problem-types-06, § 3.2 |
| `https://iana.org/assignments/http-problem-types#digest-mismatched-values`      | Mismatched Digest Values                        | 400    | draft-ietf-httpapi-digest-fields-problem-types-06, § 3.3 |

Re-read the registry before relying on this table; it grows.

## JSON Schema (Appendix A)

Appendix A gives a non-normative JSON Schema (draft 2020-12). If it disagrees with the text, the text wins. Its constraints:

- `type` and `instance`: string, `format: uri-reference`;
- `title` and `detail`: string;
- `status`: integer, minimum 100, maximum 599;
- no `required` list and no `additionalProperties: false`, so extensions are allowed.

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "An RFC 7807 problem object",
  "type": "object",
  "properties": {
    "type": { "type": "string", "format": "uri-reference" },
    "title": { "type": "string" },
    "status": { "type": "integer", "minimum": 100, "maximum": 599 },
    "detail": { "type": "string" },
    "instance": { "type": "string", "format": "uri-reference" }
  }
}
```

The `description` strings of the original are omitted here; the title is copied verbatim from Appendix A.

## XML and other formats

- The XML format uses namespace `urn:ietf:rfc:7807` and media type `application/problem+xml` (Appendix B). Extension arrays and objects MUST be serialized using only that namespace; arrays are elements whose children are all named `i` (Appendix B).
- Problem details can be embedded in other formats, for example JSON inside `<script type="application/problem+json">` in HTML (Appendix C). RFC 9457 makes no specific recommendation for embedding.

## Changes from RFC 7807

What RFC 9457 changed from RFC 7807, and the upgrade checklist, are in [`versions.md`](versions.md).
