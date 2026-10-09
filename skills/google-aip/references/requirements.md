# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are normative sentences from the published text, quoted as written (only line breaks and hyphenation from PDF layout were joined). Apply the ones that match the role. Each is labelled with the nearest section, clause or article in the published document.

## AIP-121: Resource-oriented design

Source: https://raw.githubusercontent.com/aip-dev/google.aip.dev/23e176e7333ea3bc6b085f9950a5da03d2bbfc72/aip/general/0121.md

- **AIP-121 § Methods.** A resource **must** support at minimum [Get][]: clients must be able to validate the state of resources after performing a mutation such as [Create][], [Update][], or [Delete][].
- **AIP-121 § Cyclic References.** The relationship between resources, such as with [resource references][], **must** be representable via a [directed acyclic graph][].

## AIP-122: Resource names

Source: https://raw.githubusercontent.com/aip-dev/google.aip.dev/23e176e7333ea3bc6b085f9950a5da03d2bbfc72/aip/general/0122.md

- **AIP-122 § Guidance.** All resource names defined by an API **must** be unique within that API.
- **AIP-122 § Collection identifiers.** The collection identifier segments in a resource name **must** be the plural form of the noun used for the resource.
- **AIP-122 § Resource ID aliases.** However, all data returned from the API **must** use the canonical resource name.

## AIP-131: Standard methods: Get

Source: https://raw.githubusercontent.com/aip-dev/google.aip.dev/23e176e7333ea3bc6b085f9950a5da03d2bbfc72/aip/general/0131.md

- **AIP-131 § Guidance.** APIs **must** provide a get method for resources.
- **AIP-131 § Guidance.** The response message **must** be the resource itself.

## AIP-132: Standard methods: List

Source: https://raw.githubusercontent.com/aip-dev/google.aip.dev/23e176e7333ea3bc6b085f9950a5da03d2bbfc72/aip/general/0132.md

- **AIP-132 § Guidance.** APIs **must** provide a `List` method for resources unless the resource is a [singleton][].
- **AIP-132 § Response message.** The `next_page_token` field, which supports pagination, **must** be included on all list response messages. It **must** be set if there are subsequent pages, and **must not** be set if the response represents the final page.

## AIP-133: Standard methods: Create

Source: https://raw.githubusercontent.com/aip-dev/google.aip.dev/23e176e7333ea3bc6b085f9950a5da03d2bbfc72/aip/general/0133.md

- **AIP-133 § User-specified IDs.** An API **must** allow a user to specify the ID component of a resource (the last segment of the resource name) on creation if the API is operating on the [management plane][].
- **AIP-133 § User-specified IDs.** The `{resource}_id` field **must** exist on the request message, not the resource itself.

## AIP-134: Standard methods: Update

Source: https://raw.githubusercontent.com/aip-dev/google.aip.dev/23e176e7333ea3bc6b085f9950a5da03d2bbfc72/aip/general/0134.md

- **AIP-134 § Request message.** If partial resource update is supported, a field mask **must** be included.
- **AIP-134 § Side effects.** In particular, this entails that [state fields][] **must not** be directly writable in update methods.

## AIP-135: Standard methods: Delete

Source: https://raw.githubusercontent.com/aip-dev/google.aip.dev/23e176e7333ea3bc6b085f9950a5da03d2bbfc72/aip/general/0135.md

- **AIP-135 § Cascading delete.** The API **must** fail with a `FAILED_PRECONDITION` error if the `force` field is `false` (or unset) and child resources are present.
- **AIP-135 § Errors.** Permission **must** be checked prior to checking if the resource exists.

## AIP-158: Pagination

Source: https://raw.githubusercontent.com/aip-dev/google.aip.dev/23e176e7333ea3bc6b085f9950a5da03d2bbfc72/aip/general/0158.md

- **AIP-158 § Guidance.** RPCs returning collections of data **must** provide pagination _at the outset_, as it is a [backwards-incompatible change](#backwards-compatibility) to add pagination to an existing method.
- **AIP-158 § Opacity.** Page tokens provided by APIs **must** be opaque (but URL-safe) strings, and **must not** be user-parseable.

## AIP-180: Backwards compatibility

Source: https://raw.githubusercontent.com/aip-dev/google.aip.dev/23e176e7333ea3bc6b085f9950a5da03d2bbfc72/aip/general/0180.md

- **AIP-180 § Guidance.** Old clients **must** be able to work against newer servers (with the same major version number).
- **AIP-180 § Adding components.** New required fields **must not** be added to existing request messages or resources.
- **AIP-180 § Changing the type of fields.** Existing fields and messages **must not** have their type changed, even if the new type is wire-compatible, because type changes alter generated code in a breaking way.

## AIP-193: Errors

Source: https://raw.githubusercontent.com/aip-dev/google.aip.dev/23e176e7333ea3bc6b085f9950a5da03d2bbfc72/aip/general/0193.md

- **AIP-193 § Guidance.** Services **must** return a [`google.rpc.Status`][Status] message when an API error occurs, and **must** use the canonical error codes defined in [`google.rpc.Code`][Code].
- **AIP-193 § Status.details.** All error responses **must** include an `ErrorInfo` within `details`.
- **AIP-193 § ErrorInfo.** Services **must** use the same (reason, domain) pair for the same error, and **must not** use the same (reason, domain) pair for logically different errors.
