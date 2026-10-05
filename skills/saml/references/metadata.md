# Metadata

Read this when publishing, consuming or validating SAML 2.0 metadata: entityIDs, endpoints, keys, signing flags, signatures, caching and validity. Section numbers are SAML 2.0 Metadata (Meta); En is an item of SAML 2.0 Errata 05. Sources are in [Sources](../SKILL.md#sources).

Metadata uses the namespace `urn:oasis:names:tc:SAML:2.0:metadata`, with prefix `md:` (Meta §2.1).

## Identifiers and endpoints (Meta §2.2)

- **entityID** (`entityIDType`, §2.2.1): an `anyURI` of at most 1024 characters, unique across every entity in a deployment. One URI never names two entities.
- **EndpointType** (§2.2.2): a required `Binding` URI and `Location`, plus an optional `ResponseLocation`.
- **IndexedEndpointType** (§2.2.3) adds a required `index` (unique among siblings) and an optional `isDefault`. The default endpoint is the first with `isDefault="true"`. If there is none, it is the first without `isDefault="false"`. If there is none of those either, it is the first in the sequence.

## Root elements and validity (Meta §2.3, §4.3, with E76 and E94)

- `<md:EntityDescriptor>` describes one entity (§2.3.2). `<md:EntitiesDescriptor>` groups several (§2.3.1).
- The root element of a metadata instance MUST carry `validUntil` or `cacheDuration`. It is RECOMMENDED that only the root carries them (§2.3.1, §2.3.2).
- A nested `validUntil` or `cacheDuration` MAY shorten its parent's value but never lengthen it; the smaller value wins (E76).
- **Caching** follows `cacheDuration`, with the parent taking precedence. Keep the time each instance was fetched. Missing a refresh does not make metadata invalid by itself (Meta §4.3.1 via E94).
- **Validity**: metadata past a `validUntil`, including an earlier `validUntil` on a parent, is invalid and MUST NOT be used. Stale metadata that has passed its cache duration but not `validUntil` MAY still be used (the "Metadata Instance Validity" section that E94 adds to Meta §4.3).

## Roles (Meta §2.4)

- Every role descriptor has `protocolSupportEnumeration`. For SAML 2.0 it MUST include `urn:oasis:names:tc:SAML:2.0:protocol` (§2.4.1).
- `<md:IDPSSODescriptor>` (§2.4.3) has one or more `<md:SingleSignOnService>` endpoints, which MUST omit `ResponseLocation`, plus optional `WantAuthnRequestsSigned`, `NameIDFormat`, `SingleLogoutService` and `ArtifactResolutionService`.
- `<md:SPSSODescriptor>` (§2.4.4) has one or more indexed `<md:AssertionConsumerService>` endpoints, plus optional `AuthnRequestsSigned`, `WantAssertionsSigned` and `<md:AttributeConsumingService>`. The default `AttributeConsumingService` follows the indexed-endpoint rule (E87).

### Signing flags (Meta §2.4.3, §2.4.4, via E7)

| Attribute                 | On               | Meaning                                                                                                                                               |
| ------------------------- | ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `WantAuthnRequestsSigned` | IDPSSODescriptor | Tells SPs whether an unsigned `AuthnRequest` can be expected to be accepted. How to sign depends on the binding: Redirect signs the URL-encoded form. |
| `AuthnRequestsSigned`     | SPSSODescriptor  | The SP signs its requests. When `true`, an IdP that receives an unsigned `AuthnRequest` from it MUST return an error and MUST NOT fulfil the request. |
| `WantAssertionsSigned`    | SPSSODescriptor  | Every `<saml:Assertion>` sent to this SP is signed itself. A signature on the `Response`, or TLS, does not meet this requirement.                     |

All three default to `false` (§2.4.3, §2.4.4).

### Keys (Meta §2.4.1.1, with E62, E68 and E69)

- `<md:KeyDescriptor>` has an optional `use` of `signing` or `encryption`, plus `<ds:KeyInfo>` and optional `<md:EncryptionMethod>` elements.
- `signing` keys apply to signing and to TLS for that role. `encryption` keys wrap encryption keys. A key with no `use` serves both (E62).
- Several `KeyDescriptor`s with the same `use` mean any of them may be used, and relying parties SHOULD accept any of them. This is how key rollover works: publish the new key next to the old one (E68).
- The spec takes no position on what an X.509 certificate in `KeyInfo` implies. Its validity period, extensions and revocation may or may not be enforced, at the relying party's discretion (E69). Decide that policy explicitly and apply it the same way everywhere.
- Signing and encryption use distinct keys (BP 27).

## Signing metadata (Meta §3, with E81, E83 and E91)

- Metadata MUST use enveloped signatures (§3.1.1). Any XML Signature algorithm MAY be used (E81).
- The signed element has an `ID`, and the signature has exactly one `<ds:Reference>` with `URI="#<ID>"`, covering the element and all its children (§3.1.2).
- Exclusive C14N SHOULD be used (§3.1.3). It does not by itself make a signed element safe to move (E83).
- No transforms other than enveloped-signature and Exclusive C14N. Verifiers MAY reject others; if they accept them, they MUST make sure nothing is excluded from the signature (§3.1.4).
- `<ds:Object>` SHOULD NOT be present, and verifiers SHOULD reject signatures that contain it (§3.1.5 via E91).

## Publication and trust (Meta §4)

- **Well-known location** (§4.1.1): an entity MAY publish its metadata at its entityID, which must then be a URL. HTTPS is strongly recommended. The content type is `application/samlmetadata+xml`. The document's root is an `<md:EntityDescriptor>` whose `entityID` matches the location; `<md:EntitiesDescriptor>` MUST NOT be used there.
- **Resolution** (§4.1.2): a consumer MAY fetch metadata by dereferencing a URL entityID. DNS NAPTR publication is also defined (§4.2); signed zones are recommended and MUST be validated when present (§4.2 via E66).
- **Redirects** (§4.3.2, "Handling of HTTPS Redirects"): follow 301, 302 and 307. Redirects SHOULD stay on the same protocol.
- **Trust** (§4.3.3): processing MUST include XML signature processing at the document level, and MAY add DNSSEC or TLS server authentication. Publishers MUST use a document-integrity mechanism.
- Published metadata SHOULD be signed, by the subject or by another trusted party, and consumers MUST validate signatures when present (§4.3.3.2).
- TLS trust (§4.3.3.3) does not carry over to a cached copy, and the TLS certificate's subject need not be the entity itself.

## Checklist

- [ ] Each peer's metadata passes document-level signature processing with a key you trust (§4.3.3, §4.3.3.2), and is fetched over HTTPS when fetched by URL (§4.1.1).
- [ ] Metadata past `validUntil` is rejected, and refresh follows `cacheDuration` (E94).
- [ ] Verification keys come only from `KeyDescriptor`s with `use="signing"` or no `use`, and every listed key is accepted, which allows rollover (E62, E68).
- [ ] ACS URLs and indexes in `AuthnRequest`s are checked against the SP's `AssertionConsumerService` list (Prof §4.1.4.1).
- [ ] `AuthnRequestsSigned` and `WantAssertionsSigned` are enforced as E7 states.
