# Versions and upgrades

Read this when choosing a target version, reading a document or server written for an older line, upgrading, or deciding whether to use the draft. Sources: the v1.1, v1.0 and v1.2 specification pages, the home page milestones and the GitHub repository, listed in [Sources](../SKILL.md#sources). Citations name the heading of the specification page.

## Version lines

JSON:API evolves under a "never remove, only add" strategy: later versions stay compatible with earlier ones (v1.1 Status; v1.0 Status). The `jsonapi.version` member states the highest version a server supports; without it, clients assume at least 1.0 (JSON:API Object).

| Id            | Line               | Status    | Revision                                  | Posture | Summary                                                                                     |
| ------------- | ------------------ | --------- | ----------------------------------------- | ------- | ------------------------------------------------------------------------------------------- |
| `1.2-preview` | JSON:API 1.2 draft | preview   | `/format/1.2/`, working draft, 2026-10-05 | track   | Still in development; today it differs from 1.1 only by two non-normative passages.         |
| `1.1`         | JSON:API 1.1       | current   | v1.1, finalized 2022-09-30 (tag `v1.1`)   |         | Adds `ext` and `profile` negotiation, extensions, profiles, `lid`, richer links and errors. |
| `1.0`         | JSON:API 1.0       | supported | v1.0, final 2015-05-29                    |         | The base format; no media type parameters at all.                                           |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows.

The Atomic Operations extension (`https://jsonapi.org/ext/atomic`) has no version number of its own: its page and URI are unversioned, and it builds on 1.1 media type parameters and `lid`. It is covered as part of the 1.1 line, not as a separate family. `/format/upcoming/` redirects to `/format/1.1/` and is not a separate draft.

## Which version to use

- Default to JSON:API 1.1. Its page is the "Latest Specification" at `/format/`, and the home page lists "2022-09-30: 1.1 final released."
- Drop to JSON:API 1.0 only for a named peer that cannot handle media type parameters. A 1.0 server answers `415` to a `Content-Type` with any parameter and `406` when every JSON:API `Accept` instance has parameters (v1.0 Server Responsibilities), and v1.1 notes that servers without 1.1 support reject `ext` and `profile` with `415` (v1.1 Server Responsibilities).
- A 1.1 server can serve 1.0 clients unchanged as long as it applies no extension or profile to their responses, because 1.1 only adds.
- Follow the JSON:API 1.2 draft only to see what is coming. Its posture is **track**: do not set `jsonapi.version` to `"1.2"` and do not rely on draft text.

## What changed

### JSON:API 1.2 draft

The draft page says "Version 1.2 is a working draft. As such, the content on this page is subject to change" (v1.2 Status). Compared with v1.1, as of 2026-10-05 it adds only:

- an introduction note that JSON:API can be combined with standards such as OAuth 2.0 and OpenAPI, and that a server may also support other API standards such as OData or GraphQL on the same or other endpoints (v1.2 Introduction);
- an example `Content-Type` with two extensions and one profile applied (v1.2 Rules for Media Type Parameters).

No normative rule differs from v1.1.

### JSON:API 1.1

Compared with v1.0:

- **Media type parameters.** `ext` and `profile` are allowed, each a space-separated list of URIs; every other parameter is still forbidden (Rules for Media Type Parameters). Clients and servers MUST list applied extensions and profiles in `Content-Type` (Universal Responsibilities). Servers return `415` for an unsupported `ext` URI and `406` when every `Accept` instance asks for an unsupported extension, ignore unknown profiles, and SHOULD send `Vary: Accept` (Server Responsibilities). In 1.0, clients MUST send the media type without parameters and MUST list it at least once without parameters in `Accept` (v1.0 Client Responsibilities).
- **Extensions and profiles.** New sections define extensions (new specification semantics, namespaced members and query parameters) and profiles (implementation semantics only, per RFC 6906) (Extensions; Profiles; Rules for Extensions; Rules for Profiles). A top-level member defined by an applied extension can stand in for `data`, `errors` or `meta` (Top Level).
- **`lid`.** A new client-side resource may carry a local identifier `lid`, identical for every representation in the document; a resource identifier object for a new resource MUST include `lid` (Identification; Resource Identifier Objects). In 1.0 resource identifier objects always have `type` and `id`.
- **Semantics vocabulary.** "Specification semantics" and "implementation semantics" are defined, and all other semantics are reserved (Semantics).
- **Links.** A link is a URI-reference string, a link object or `null`. Link objects gain `rel`, `describedby`, `title`, `type` and `hreflang`, and `href` is REQUIRED (Links; Link objects). The top-level links object gains `describedby`, and `self` SHOULD be a link object with `type` when extensions or profiles apply (Top Level). In 1.0 a link object only had `href` and `meta`.
- **`jsonapi` object.** Gains `ext` and `profile` arrays, which MUST NOT be used for content negotiation (JSON:API Object).
- **Full linkage** is restated as a chain of relationships from the primary data (Compound Documents). In 1.0 each included resource needed at least one resource identifier object in the document.
- **`include`.** When a client supplies `include`, the response MUST be a compound document with an `included` key, even an empty array; an empty `include` value means no related resources (Inclusion of Related Resources).
- **Query parameters.** Query parameter families (`page`, `filter`, `fields`) are defined; extension query parameters are `namespace:name`; implementation-specific base names need a non `a-z` character, with camelCase now the recommendation; parsing follows `application/x-www-form-urlencoded`, and servers SHOULD accept unencoded square brackets (Query Parameters; Appendix). 1.0 recommended `-`, `_` or a capital letter.
- **Member names.** The rules apply to implementation and profile defined names; `@` is allowed as the first character of @-Members, which are ignored when interpreting the spec (Member Names; @-Members).
- **Creating.** A `204` response after create is allowed whenever the server does not change the resource, not only with a client-generated ID; `201` may carry no primary data in that case (201 Created; 204 No Content).
- **Errors.** At least one member is REQUIRED, `status` SHOULD be provided, `links.type` identifies the error type, `source.header` names a request header, and `source.pointer` MUST point to a value that exists (Error Objects).

## Upgrading

### 1.0 to 1.1

1. Change the version marker: set `jsonapi.version` to `"1.1"` if you send a `jsonapi` object (JSON:API Object).
2. Replace removed or renamed behaviour:
   - Server: stop rejecting `ext` and `profile`. Keep `415` for other `Content-Type` parameters and for unsupported `ext` URIs, and `406` for `Accept` headers whose JSON:API instances all carry other parameters or all carry an unsupported extension (Server Responsibilities).
   - Server: add `Vary: Accept` once you support `ext` or `profile` (Server Responsibilities).
   - Server: when a client sends `include`, always return `included`, even as `[]` (Inclusion of Related Resources).
   - Server: accept `lid` on new resources in requests, and treat it as the identity for linkage within the document (Identification; Compound Documents).
   - Server: make every error object carry at least one member and preferably `status`; check that each `source.pointer` exists (Error Objects).
   - Both: rename custom member names that start with `@`, since 1.1 reads those as @-Members (@-Members).
   - Both: check custom query parameter names still contain a non `a-z` character; new ones should use camelCase (Implementation-Specific Query Parameters).
3. Validate against the target: run the Verify list in `SKILL.md`. The JSON Schemas in the repository's `_schemas/1.0/` folder describe 1.0 documents only; they do not cover 1.1 members such as `lid` or link object `rel`.
4. Keep behaviour unchanged: a 1.0 client that sends no media type parameters gets the same responses as before, because nothing in 1.0 was removed.

## Preview: JSON:API 1.2 draft

The draft lives at `https://jsonapi.org/format/1.2/` and in `_format/1.2/index.md` (front matter `status: draft`) of the GitHub repository. Posture: **track**. As of 2026-10-05 it has no normative change from 1.1, so there is nothing to build. Do not emit `"version": "1.2"` and do not cite draft text as a rule. Watch the repository's `_format/1.2/` folder and the home page milestones. When 1.2 is finalized: make it current, make 1.1 supported, keep 1.0 supported or move it to legacy, and add a 1.1 to 1.2 upgrade section.
