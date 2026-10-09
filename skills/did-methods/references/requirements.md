# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are normative sentences from the published text, quoted as written (only line breaks and hyphenation from PDF layout were joined). Apply the ones that match the role. Each is labelled with the nearest section, clause or article in the published document.

## did:web

Source: https://raw.githubusercontent.com/w3c-ccg/did-method-web/ea423c114e6f2537498ee6f94e8d794c64f60c18/index.html

- **did:web Read (Resolve).** Replace ":" with "/" in the method specific identifier to obtain the fully qualified domain name and optional path.
- **did:web Method-specific identifier.** The method specific identifier MUST match the common name used in the SSL/TLS certificate, and it MUST NOT include IP addresses.
- **did:web Method-specific identifier.** A port MAY be included and the colon MUST be percent encoded to prevent a conflict with paths.
- **did:web Key Material and Document Handling.** Whenever a DID URL is present within a `did:web` document, it must be an absolute URL.
- **did:web Read (Resolve).** Verify that the ID of the resolved DID document matches the Web DID being resolved.
- **did:web In-transit Security.** TLS configuration MUST use at least SHA256, and SHOULD use SHA384, POLY1305, or stronger, depending on the needs of your operating environment.
- **did:web CORS Policy Considerations.** To support scenarios where DID resolution is performed by client applications running in a web browser, the file served for the DID document should be accessible by any origin.

## did:key

Source: https://raw.githubusercontent.com/w3c-ccg/did-method-key/2cc490c38c5aacf58497a87fc0cf8794668bf716/index.html

- **did:key Document Creation Algorithm.** The scheme MUST be the value `did`. The method MUST be the value `key`. The version MUST be convertible to a positive integer value. The multibaseValue MUST be a string and begin with the letter `z`. If any of these requirements fail, an `invalidDid` error MUST be raised.
- **did:key Signature Method Creation Algorithm.** If verificationMethod.controller is not a valid DID, an `invalidDid` error MUST be raised.
- **did:key Signature Method Creation Algorithm.** If publicKeyFormat is not known to the implementation, an `unsupportedPublicKeyType` error MUST be raised.
- **did:key Update.** This DID Method does not support updating the DID Document.
- **did:key Deactivate.** This DID Method does not support deactivating the DID Document.

## did:jwk

Source: https://raw.githubusercontent.com/quartzjer/did-jwk/44e186cf4cc215fc726afeecad1727cc9f9a66e8/spec.md

- **did:jwk To create the DID Document.** If the JWK contains a `use` property with the value "sig" then the `keyAgreement` property is not included in the DID Document.
- **did:jwk To create the DID URL.** If the JWK contains a `kid` value it is _not_ used as the reference, `#0` is the only valid value.
- **did:jwk Security.** Only JWKs containing public key material may be used, a JWK for a private key must never be used and must be rejected by all implementations when encountered.
- **did:jwk Privacy.** This is a design choice, implementations should always store the fully serialized `did:jwk:` URI and not the underlying JWK.

## did:webvh v1.0

Source: https://raw.githubusercontent.com/decentralized-identity/didwebvh/7e39c700fd565ee47badf95c1eda11067dbcf2b7/spec-v1.0/specification.md

- **did:webvh Method Name.** A DID that uses this method MUST begin with the following prefix: `did:webvh`.
- **did:webvh Method-Specific Identifier.** The `{SCID}` value used temporarily during DID creation is a placeholder and is not a conforming `scid`; it **MUST** be replaced before the DID is published or resolved.
- **did:webvh Read (Resolve).** The version number **MUST** be `1` for the first entry and **MUST** equal the previous entry's version number + 1 for each subsequent entry. Gaps (e.g., entry 3 after entry 1) **MUST** terminate resolution.
- **did:webvh Deactivate (Revoke).** When such a DID is resolved in this way, the DID Resolution Metadata **MUST** include the property name and value `"deactivated": true`.
- **did:webvh DID Method Parameters.** The JSON `null` value **MUST NOT** be used to indicate default or deactivated values, as it removes the typing information required for proper interpretation.
- **did:webvh DID Method Parameters.** Resolvers **MUST** verify the proof's `cryptosuite` property; an absent, mismatched, or non-conformant `cryptosuite` **MUST** cause the entry to be rejected.
- **did:webvh DID Method Parameters.** A subsequent entry that omits `updateKeys` **MUST** be rejected by resolvers, even if the omission would otherwise inherit the previous value.

## did:webvh v1.0 security and privacy

Source: https://raw.githubusercontent.com/decentralized-identity/didwebvh/7e39c700fd565ee47badf95c1eda11067dbcf2b7/spec-v1.0/security_and_privacy.md

- **did:webvh Threats and Attacks.** Plaintext HTTP **MUST NOT** be used except for testing or non-production deployments where confidentiality is not required.
- **did:webvh Unique Assignment of DIDs.** To prevent this, resolvers and clients of resolvers **MUST** ignore any prior domain components when evaluating the history or trustworthiness of a `did:webvh` DID; only the current hosting location and its associated verifiable history are relevant.
