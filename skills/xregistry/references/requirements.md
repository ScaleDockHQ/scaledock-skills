# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are normative sentences from the published text, quoted as written (only line breaks and hyphenation from PDF layout were joined). Apply the ones that match the role. Each is labelled with the nearest section, clause or article in the published document.

## xRegistry core specification 1.0-rc4

Source: https://raw.githubusercontent.com/xregistry/spec/508cd2760a3c5b74adf61acac1e94654f9852f34/core/spec.md

- **Notational Conventions.** Server-unknown extension attributes MUST be silently stored in the backing datastore.
- **Notational Conventions.** Specification-defined attributes and server-known extension attributes MUST generate an error if the corresponding feature is not supported or enabled.
- **Version.** Each Resource MUST have at least one Version associated with it.
- **Design: Data Retrieval Issues.** Note that if an entity is to be sent, then it MUST be serialized in its entirety (all attributes, and requested child entities) or an error MUST be generated.
- **Design: Implicit Creation of Parent Entities.** To reduce the number of interactions needed when creating an entity, if any of its parent entities do not exist, then they MUST be implicitly created.
- **Registry Model.** Unless otherwise stated in a protocol binding specification, if the processing of a request fails (even during the generation of the response) then an error MUST be generated and the entire request MUST be undone.
- **Extensions.** All extension attributes that appear in the serialization of an entity MUST conform to the model definition of the Registry, otherwise an error ([unknown_attribute](#unknown_attribute)) MUST be generated.
- **`<SINGULAR>id` (`id`) Attribute.** This attribute MUST be named `registryid` for the Registry itself, and MUST be named `versionid` for all Version entities.
- **`xid` Attribute.** Unlike `<SINGULAR>id`, which is unique within the scope of its parent, `xid` MUST be unique across the entire Registry, and as such is defined to be a relative URL from the root of the Registry.
- **`epoch` Attribute.** Each time the associated entity is updated, this value MUST be set to a new value that is greater than the current one.
- **`epoch` Attribute.** During a create operation, if this attribute is present in the request, then it MUST be silently ignored by the server.
- **`name` Attribute.** Therefore, this value MUST NOT be used for unique identification purposes, the `<SINGULAR>id` MUST be used instead.
- **Registry Capabilities.** When serializing their supported capabilities, servers MUST include all capabilities (including extensions) since the absence of a capability indicates lack of support for that feature.
- **`available` Capability.** Attempts to access unavailable metadata MUST generate an error ([not_available](#not_available)).
- **Updating Nested Registry Collections.** Any error while processing a nested collection entity MUST result in the entire request being rejected.
- **Updating Nested Registry Collections.** An absent `<COLLECTION>` attribute, or empty map, MUST be interpreted as a request to not modify the collection at all.
- **Meta Entity.** Each Resource MUST have a Meta entity, and when the Resource is deleted then the Meta entity MUST also be deleted.
- **Cross Referencing Resources.** An `xref` that isn't syntactically correct, or references a non-existing Group type or Resource type , MUST generate an error ([malformed_xref](#malformed_xref)).
- **`defaultversionsticky` Attribute.** A value of `true` means that `defaultversionid` has been explicitly set and its value MUST NOT automatically change if other Versions are added or removed.
- **`defaultversionid` Attribute.** Any attempt to set `defaultversionid` to a non-existing Version, after all Version processing for the current operation is completed, MUST generate an error ([unknown_id](#unknown_id)).
- **`ancestorid` Attribute.** The `ancestorid` attribute MUST be set to the case-sensitive `versionid` of this Version's ancestor.
- **`compatibility` Attribute.** When not specified, there is no statement being made as to the compatibility relationship between the Resource's Versions and the server MUST NOT perform any `compatibility` checking.
