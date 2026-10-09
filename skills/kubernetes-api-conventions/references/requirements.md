# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are normative sentences from the published text, quoted as written (only line breaks and hyphenation from PDF layout were joined). Apply the ones that match the role. Each is labelled with the nearest section, clause or article in the published document.

## API Conventions

Source: https://raw.githubusercontent.com/kubernetes/community/3bc2da62f72a7a05b8838014be60566668edc3e3/contributors/devel/sig-architecture/api-conventions.md

- **API Conventions (introduction).** Group names must be lower case and be valid DNS subdomains.
- **Types (Kinds).** The name of a list kind must end with "List".
- **Types (Kinds).** The standard REST verbs (defined below) MUST return singular JSON objects.
- **Metadata.** Every object kind MUST have the following metadata in a nested object field called "metadata":
- **Metadata.** This value MUST be treated as opaque by clients and passed unmodified back to the server.
- **Spec and Status.** The PUT and POST verbs on objects MUST ignore the `status` values, to avoid accidentally overwriting the `status` in read-modify-write scenarios.
- **Spec and Status.** A `/status` subresource MUST be provided to enable system components to update statuses of resources they manage.
- **Typical status properties.** Condition types should be named in PascalCase.
- **Typical status properties.** The absence of a condition should be interpreted the same as `Unknown`.
- **Primitive types.** All public integer fields MUST use the Go `int32` or Go `int64` types, not `int` (which is ambiguously sized, depending on target platform).
- **Idempotency.** All compatible Kubernetes APIs MUST support "name idempotency" and respond with an HTTP status code 409 when a request is made to POST an object that has the same name as an existing object in the system.
- **Optional vs. Required.** Fields must be either optional or required.
- **Static Defaults.** Static defaulting must not consider any state except the object being operated upon (and the complexity of Service API stands as an example of why).
- **Admission Controlled Defaults.** As such, fields which are initialized this way must be strictly optional.
- **Serialization Format.** APIs may return alternative representations of any resource in response to an Accept header or under alternative endpoints, but the default serialization for input and output of API responses MUST be JSON.
- **Units.** Units must either be explicit in the field name (e.g., `timeoutSeconds`), or must be specified as part of the value (e.g., `resource.Quantity`).
- **Units.** Duration fields must be represented as integer fields with units being part of the field name (e.g. `leaseDurationSeconds`).
- **Naming conventions.** Go field names must be PascalCase. JSON field names must be camelCase.
- **Label, selector, and annotation conventions.** Third-party components must use prefixed keys.
- **Label, selector, and annotation conventions.** Key prefixes under the "kubernetes.io" and "k8s.io" domains are reserved for use by the kubernetes project and must not be used by third-parties.
- **Representing Allocated Values.** The common theme among all of these is that the system should not trust users with such fields, and must verify or otherwise confirm such requests before using them.
- **Sequencing operations.** Controllers must take care to consider how a `status` field will be handled in the case of interrupted control loops (e.g. controller crash and restart), and must act idempotently and consistently.
