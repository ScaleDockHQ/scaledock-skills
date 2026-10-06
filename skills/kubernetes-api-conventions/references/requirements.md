# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## Kubernetes API conventions

Source: https://raw.githubusercontent.com/kubernetes/community/master/contributors/devel/sig-architecture/api-conventions.md

An introduction to using resources with kubectl can be found in [the object management overview](https://kubernetes.io/docs/concepts/overview/working-with-objects/object-management/).*

- **document.** The standard REST verbs (defined below) MUST return singular JSON objects.
- **document.** ### Resources All JSON objects returned by an API MUST have the following fields: * kind: a string that identifies the schema this object should have * apiVersion: a string that identifies the version of the schema the object should have These fields are required for proper decoding of the object.
- **document.** ### Objects #### Metadata Every object kind MUST have the following metadata in a nested object field called "metadata": * namespace: a namespace is a DNS compatible label that objects are subdivided into.
- **document.** * uid: a unique in time and space value (typically an RFC 4122 generated identifier, see [the identifiers docs](https://kubernetes.io/docs/concepts/overview/working-with-objects/names/)) used to distinguish between objects with the same name that have been deleted and recreated Every object SHOULD have the following metadata in a nested object field called
- **document.** This value MUST be treated as opaque by clients and passed unmodified back to the server.
- **document.** The PUT and POST verbs on objects MUST ignore the `status` values, to avoid accidentally overwriting the `status` in read-modify-write scenarios.
- **document.** A `/status` subresource MUST be provided to enable system components to update statuses of resources they manage.
- **document.** All objects that represent a physical resource whose state may vary from the user's desired intent SHOULD have a `spec` and a `status`.
