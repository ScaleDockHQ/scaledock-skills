# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## Media Fragments URI 1.0 (basic)

Source: https://www.w3.org/TR/media-frags/

This document describes the Media Fragments 1.0 (basic) specification. It specifies the syntax for constructing media fragment URIs and explains how to handle them when used over the HTTP protocol. The syntax is based on the specification of particular name-value pairs that can be used in URI fragment and URI query requests to restrict a media resource to a certain fragment. The Media Fragment WG has no authority to update registries of all targeted media types. We recommend media type owners to harmonize their existing schemes with the ones proposed in this document and update or add the fragment semantics specification to their media type registration.

- **2.1 Terminology.** The keywords MUST , MUST NOT , SHOULD and SHOULD NOT are to be interpreted as defined in RFC 2119 .
- **2.2.1 URI Fragments.** The registration of URI fragment construction rules, as expressed in Section 4.11 of RFC 4288 , is a SHOULD-requirement.
- **6.2 Errors detectable based on the URI syntax.** More specifically, the user agent SHOULD ignore name-value pairs causing errors detectable based on the URI syntax.
- **6.2.1 Errors on the general URI level.** Unknown dimensions SHOULD be ignored by the user agent.
- **6.2.1 Errors on the general URI level.** t=10 in #t=2&t=10) is interpreted and all previous occurrences (valid or invalid) SHOULD be ignored by the user agent.
- **6.2.2 Errors on the temporal dimension.** Invalid temporal fragments SHOULD be ignored by the user agent.
- **6.2.3 Errors on the spatial dimension.** Invalid spatial fragments SHOULD be ignored by the user agent.
- **6.3.1 Errors on the general level.** If the user agent knows the mime type, it is able to detect non-existent dimensions and SHOULD ignore them.
