# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the SAML 2.0 standard, SAML 2.0 Errata 05, the core errata composite, the SAML 1.1 core and the OASIS SAML TC page, listed in [Sources](../SKILL.md#sources).

## Version lines

| Id    | Line     | Status  | Revision                                                             | Posture | Summary                                                             |
| ----- | -------- | ------- | -------------------------------------------------------------------- | ------- | ------------------------------------------------------------------- |
| `2.0` | SAML 2.0 | current | OASIS Standard, 15 March 2005, with Approved Errata 05 (01 May 2012) |         | The default target. Read the 2005 documents with Errata 05 applied. |
| `1.1` | SAML 1.1 | legacy  | OASIS Standard, 2 September 2003 (oasis-sstc-saml-core-1.1)          |         | Superseded by 2.0. Read and upgrade from it; never author it.       |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows.

There is no preview line. The OASIS Security Services (SAML) TC "was closed by Project Administration on 08 July 2023 and is no longer active", and no SAML 2.x successor draft was found on the TC page. Do not invent a "SAML 2.1".

XML Signature Syntax and Processing and Exclusive XML Canonicalization are not SAML version lines. They are the `xml-signature` skill. SAML signatures depend on them; follow that skill when signing or verifying XML.

## Which version to use

- Default to `2.0`, and always apply Errata 05. Errata 05 is OASIS Approved Errata: it changes normative text, such as when `Issuer` is required (E17), how multiple assertions are evaluated (E26), clock skew (E92), `ds:Object` rejection (E91) and CBC decryption (E93).
- The core errata composite (Working Draft 07, 8 September 2015) shows Core with the errata merged in. It is non-normative; when it and Errata 05 differ, Errata 05 wins.
- Treat a `1.1` peer or document as input to an upgrade. SAML 2.0 messages do not interoperate with 1.1 messages: the namespaces and core attributes differ, and 1.1 artifacts have no role in 2.0 (E4).

## What changed

### SAML 2.0 (from SAML 1.1)

- **Namespaces.** SAML 1.1 uses `urn:oasis:names:tc:SAML:1.0:assertion` and `urn:oasis:names:tc:SAML:1.0:protocol` (1.1 core §1.2). SAML 2.0 uses `urn:oasis:names:tc:SAML:2.0:assertion` and `urn:oasis:names:tc:SAML:2.0:protocol` (Core §1.2), and metadata uses `urn:oasis:names:tc:SAML:2.0:metadata` (Meta §2.1).
- **Version marker.** 1.1 assertions and messages carry `MajorVersion="1"` and `MinorVersion="1"` (1.1 core §2.3.2, §3.4.1). 2.0 carries a single `Version="2.0"` (Core §2.3.3, §3.2.1).
- **Identifiers.** 1.1 uses `AssertionID`, `RequestID` and `ResponseID` (1.1 core §5.4). 2.0 uses `ID` on every assertion, request and response (Core §5.4).
- **Issuer.** In 1.1, `Issuer` is a required string attribute of `Assertion` (1.1 core §2.3.2). In 2.0 it is an `<Issuer>` element of NameIDType on assertions and on requests and responses (Core §2.2.5, §2.3.3, §3.2.1).
- **Conditions.** 1.1 has `AudienceRestrictionCondition` and `DoNotCacheCondition` (1.1 core §2.3.2.1). 2.0 has `AudienceRestriction`, `OneTimeUse` and `ProxyRestriction` (Core §2.5.1.4 to §2.5.1.6).
- **Subject confirmation.** 1.1 puts one or more `ConfirmationMethod` URIs in `SubjectConfirmation`, for example `urn:oasis:names:tc:SAML:1.0:cm:bearer` (1.1 core §2.4.2.3). 2.0 has one `Method` attribute per `SubjectConfirmation`, for example `urn:oasis:names:tc:SAML:2.0:cm:bearer`, plus `SubjectConfirmationData` with `NotOnOrAfter`, `Recipient`, `InResponseTo` and `Address` (Core §2.4.1.1, §2.4.1.2; Prof §3.3).
- **Recipient checks.** 1.1 has an optional `Recipient` attribute on the `Response` (1.1 core §3.4.1). 2.0 has `Destination` on every request and response (Core §3.2.1, §3.2.2) and `Recipient` on the bearer `SubjectConfirmationData` (Prof §4.1.4.2).
- **Protocols.** 1.1 has only a generic `samlp:Request` with queries and assertion lookup (1.1 core §3.2, §3.3). 2.0 adds `AuthnRequest`, Artifact Resolution, Single Logout, Name Identifier Management and Name Identifier Mapping (Core §3.4 to §3.8).
- **Bindings and profiles.** 1.1 bindings and profiles live in a separate 1.1 document (1.1 core §1.3.1). 2.0 defines HTTP-Redirect, HTTP-POST, HTTP-Artifact, SOAP, PAOS and URI bindings (Bind §3), the Web Browser SSO, ECP and Single Logout profiles (Prof §4), and metadata (Meta).
- **Encryption.** 2.0 adds `EncryptedAssertion`, `EncryptedID` and `EncryptedAttribute` via XML Encryption (Core §2.2.4, §2.3.4, §2.7.3.2, §6). SAML 1.1 core defines no encrypted elements.
- **Signatures.** Both lines use enveloped signatures with one reference to the root's identifier and recommend Exclusive C14N (1.1 core §5.4; Core §5.4). 1.1 signatures are incompatible with SAML 1.0 signatures (1.1 core §5.4.7).

### SAML 2.0 Errata 05

Errata 05 is cumulative. The items an implementer is most likely to hit:

- E1: RelayState is covered by the HTTP-Redirect query-string signature.
- E7: an IdP MUST return an error to an unsigned `AuthnRequest` from an SP whose metadata says `AuthnRequestsSigned="true"`. `WantAssertionsSigned` is not satisfied by a `Response` signature or by TLS.
- E17, E26: when `Issuer` is required; all assertions come from one IdP and name one principal; each assertion is evaluated independently; under POST each assertion is protected by an `Assertion` or `Response` signature.
- E46, E52: audience OR and AND logic; `NotOnOrAfter` bounds when an assertion can be confirmed.
- E62, E68, E69: `KeyDescriptor` `use` semantics, multiple keys, and what `ds:KeyInfo` does not imply.
- E78, E86: persistent identifiers are at most 256 characters, are never reassigned, and have no guessable relationship to the user's identity.
- E81, E83: any XML Signature algorithm may be used; Exclusive C14N alone does not make a signed object safe to move.
- E90: sanitize RelayState; unsolicited responses enable CSRF, and SPs SHOULD be able to disable them.
- E91, E92, E93: reject `ds:Object`; allow 3 to 5 minutes of configurable clock skew; require integrity before CBC decryption and prefer RSA-OAEP.
- E94: separate cache freshness (`cacheDuration`) from validity (`validUntil`).

## Upgrading

### 1.1 to 2.0

1. Change the version marker: replace `MajorVersion="1" MinorVersion="1"` with `Version="2.0"`, and the `urn:oasis:names:tc:SAML:1.0:*` namespaces with `urn:oasis:names:tc:SAML:2.0:*`.
2. Replace removed or renamed fields: `AssertionID`, `RequestID` and `ResponseID` become `ID`; the `Issuer` attribute becomes an `<Issuer>` element; `AudienceRestrictionCondition` becomes `AudienceRestriction`; `DoNotCacheCondition` becomes `OneTimeUse`; `ConfirmationMethod` becomes `SubjectConfirmation` `Method`; `NameIdentifier` becomes `NameID`; `AuthenticationStatement` becomes `AuthnStatement`.
3. Move to the 2.0 flows: SP-initiated SSO uses `AuthnRequest` over HTTP-Redirect or HTTP-POST, and the IdP answers with a `Response` per Prof §4.1. Drop SAML 1.1 artifacts, because 2.0 accepts only its own type `0x0004` (Bind §3.6.4, E4). Exchange SAML 2.0 metadata (Meta).
4. Add the 2.0 checks: `Destination`, bearer `SubjectConfirmationData` (`Recipient`, `NotOnOrAfter`, `InResponseTo`), `AudienceRestriction` and the replay cache, in the order of [`response-validation.md`](response-validation.md).
5. Validate against the 2.0 schemas and the Web Browser SSO profile rules (Prof §4.1.4).
6. Keep behaviour unchanged: the same principal, attributes and audience must come out of the 2.0 exchange as from the 1.1 one. An upgrade that validates but maps a different user is a regression.
