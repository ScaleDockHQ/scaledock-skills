# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are normative sentences from the published text, quoted as written (only line breaks and hyphenation from PDF layout were joined). Apply the ones that match the role. Each is labelled with the nearest section, clause or article in the published document.

## Microsoft Azure REST API Guidelines

Source: https://raw.githubusercontent.com/microsoft/api-guidelines/a7022a299442a8352431874e63ec4dff548a1b81/azure/Guidelines.md

- **Uniform Resource Locators (URLs).** **DO** treat service-defined URL path segments as case-sensitive. If the passed-in case doesn't match what the service expects, the request **MUST** fail with a `404-Not found` HTTP return code.
- **Exactly Once Behavior = Client Retries & Service Idempotency.** **DO** ensure that _all_ HTTP methods are idempotent.
- **HTTP Return Codes.** **DO** return a `204-No Content` without a resource/body for a DELETE operation (even if the URL identifies a resource that does not exist; do not return `404-Not Found`)
- **HTTP Query Parameters and Header Values.** **DO NOT** fail a request that contains an unrecognized header. Headers may be added by API gateways or middleware and this must be tolerated
- **Resource Schema & Field Mutability.** **DO** create and update resources using PATCH [RFC 5789] with JSON Merge Patch [(RFC 7396)](https://datatracker.ietf.org/doc/html/rfc7396) request body.
- **Resource Schema & Field Mutability.** **DO NOT** return secret fields via GET. For example, do not return `administratorPassword` in JSON.
- **Handling Errors.** **DO** ensure that the top-level error's `code` value is identical to the `x-ms-error-code` header's value.
- **JSON.** **DO** use camel case for all JSON field names. Do not upper-case acronyms; use camel case.
- **JSON.** **DO** use [RFC 3339](https://datatracker.ietf.org/doc/html/rfc3339) for date/time.
- **Enums & SDKs (Client libraries).** **DO NOT** remove values from your enumeration list as this breaks customer code.
- **Collections.** **DO** return a `nextLink` field with an absolute URL that the client can GET in order to retrieve the next page of the collection.
- **API Versioning.** **DO** use a required query parameter named `api-version` on every operation for the client to specify the API version.
- **API Versioning.** **DO** use `YYYY-MM-DD` date values, with a `-preview` suffix for preview versions, as the valid values for `api-version`.
- **API Versioning.** **DO NOT** introduce any breaking changes into the service.
- **Long-Running Operations & Jobs.** **DO NOT** implement PATCH as an LRO.
- **Patterns to Initiate a Long-Running Operation.** **DO** include an `operation-location` response header with the absolute URL of the status monitor for the operation.

## Microsoft Graph REST API Guidelines

Source: https://raw.githubusercontent.com/microsoft/api-guidelines/a7022a299442a8352431874e63ec4dff548a1b81/graph/GuidelinesGraph.md

- **Naming.** **MUST** use lower camel case for _all_ names and namespaces.
- **Naming.** **MUST** suffix date and time properties with Date, Time, or DateTime
- **Resource modeling patterns.** **MUST** use String type for ID.
- **Resource modeling patterns.** **MUST** use a root object with a value property to return a collection.
- **Behavior modeling.** **MUST** use PATCH to edit updatable resources.
- **Behavior modeling.** **SHOULD NOT** use PUT for updating resources.
- **Error handling.** The top-level error code MUST match the HTTP response status code description, converted to camelCase, as listed in the [Status Code Registry (iana.org)]
