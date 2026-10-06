# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## RFC 8785 JSON Canonicalization Scheme (JCS)

Source: https://www.rfc-editor.org/rfc/rfc8785.html

Cryptographic operations like hashing and signing need the data to be expressed in an invariant format so that the operations are reliably repeatable. One way to address this is to create a canonical representation of the data. Canonicalization also permits data to be exchanged in its original form on the "wire" while cryptographic operations performed on the canonicalized counterpart of the data in the producer and consumer endpoints generate consistent results. ¶ This document describes the JSON Canonicalization Scheme (JCS). This specification defines how to create a canonical representation of JSON data by building on the strict serialization methods for

- **abstract.** Cryptographic operations like hashing and signing need the data to be expressed in an invariant format so that the operations are reliably repeatable. One way to address this is to create a canonical representation of the data. Canonicalization also permits data to be exchanged in its original form on the "wire" while cryptographic operations performed on the canonicalized counterpart of the data in the producer and consumer endpoints generate consistent results. ¶ This document describes the JSON Canonicalization Scheme (JCS). This specification defines how to create a canonical representation of JSON data by building on the strict serialization methods for
