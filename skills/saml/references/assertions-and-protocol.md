# Assertions and protocol

Read this when building or parsing a SAML 2.0 assertion, `AuthnRequest`, `Response`, `LogoutRequest` or `LogoutResponse`, or when signing and encrypting them. Section numbers are SAML 2.0 Core (Core) unless marked otherwise; En is an item of SAML 2.0 Errata 05. Sources are in [Sources](../SKILL.md#sources).

## Common data types (Core §1.3)

- **Strings** are compared after XML normalization: line endings become LF, and string attribute values are normalized as XML §3.3.3 says. SAML defines no collation or sort order, so never depend on one (§1.3.1).
- **URIs** are absolute and at least one non-whitespace character unless a section says otherwise (§1.3.2).
- **Times** are `xs:dateTime` in UTC with no time zone component. Do not rely on resolution finer than milliseconds, and never generate leap seconds (§1.3.3). Relying parties SHOULD allow 3 to 5 minutes of configurable clock skew (§1.3.3 via E92).
- **IDs** are `xs:ID`. Whoever assigns one ensures a negligible chance of collision. Random IDs carry 128 to 160 bits, so the chance of two being equal is at most 2^-128 and SHOULD be at most 2^-160. The encoding conforms to the `xs:ID` datatype, and a data object declares a given ID exactly once (§1.3.4).

## Namespaces and version (Core §1.2, §4)

- Assertions use `urn:oasis:names:tc:SAML:2.0:assertion` (prefix `saml:`) and protocol messages use `urn:oasis:names:tc:SAML:2.0:protocol` (prefix `samlp:`) (§1.2).
- Every assertion, request and response carries `Version="2.0"` (§2.3.3, §3.2.1, §3.2.2).
- A responder MUST reject a request with an unsupported major version (§4.1.3.1). A version error uses the top-level status `urn:oasis:names:tc:SAML:2.0:status:VersionMismatch` (§4.1.3.2).

## Assertions (Core §2)

An `<saml:Assertion>` has required `Version`, `ID` and `IssueInstant`, a required `<Issuer>`, and optional `<ds:Signature>`, `<Subject>`, `<Conditions>` and `<Advice>`, followed by statements (§2.3.3).

- **Issuer** (§2.2.5) is a NameIDType element. In the Web Browser SSO profile it holds the IdP's entityID, and `Format` is omitted or `urn:oasis:names:tc:SAML:2.0:nameid-format:entity` (Prof §4.1.4.2).
- **EncryptedAssertion** (§2.3.4) and **EncryptedID** (§2.2.4) replace their plaintext forms in the same place (§6.1).

### Subject and confirmation (§2.4)

- `<Subject>` holds a `NameID`, `BaseID` or `EncryptedID` and zero or more `<SubjectConfirmation>` elements (§2.4.1).
- `<SubjectConfirmation>` has a required `Method` URI (§2.4.1.1). The bearer method is `urn:oasis:names:tc:SAML:2.0:cm:bearer` (Prof §3.3). If it contains an identifier, the issuer authorizes that attesting entity to use the assertion for the subject (§2.4.1.1 via E47).
- `<SubjectConfirmationData>` has optional `NotBefore`, `NotOnOrAfter`, `Recipient`, `InResponseTo` and `Address` (§2.4.1.2). Its time window SHOULD fall within the assertion's `Conditions` validity period (§2.4.1.2).

### Conditions (§2.5)

- Evaluation (§2.5.1.1): no conditions means Valid; any invalid condition means Invalid; any condition that cannot be evaluated or is not understood means Indeterminate; otherwise Valid. The first matching rule wins. An Invalid or Indeterminate assertion MUST be rejected.
- `NotBefore` and `NotOnOrAfter` (§2.5.1.2) bound validity. When both are present, `NotBefore` is earlier.
- `<AudienceRestriction>` (§2.5.1.4) is Valid only if the relying party is one of its `<Audience>` URIs. Several restrictions are each evaluated: OR within one restriction, AND across restrictions (E46).
- `<OneTimeUse>` (§2.5.1.5): use the assertion immediately and never retain it. An RP that caches assertions MUST honour it, typically with a cache of processed assertions. It always evaluates as Valid; it constrains use, not validity.
- `<ProxyRestriction>` (§2.5.1.6) limits the assertions an RP may issue on the basis of this one.

### Statements (§2.7)

- `<AuthnStatement>` (§2.7.2) has `AuthnInstant`, optional `SessionIndex`, optional `SessionNotOnOrAfter` and `<AuthnContext>`. `SessionNotOnOrAfter` is an upper bound on sessions derived from the assertion, and profiles define how RPs use it (E79).
- `<AttributeStatement>` (§2.7.3): an attribute is identified by `NameFormat` plus `Name` together. If any `AttributeValue` has an `xsi:type`, all values of that attribute have the same type (§2.7.3.1 via E49).
- `<AuthzDecisionStatement>` (§2.7.4) carries an authorization decision.

### Name identifier formats (§8.3)

- Persistent identifiers (§8.3.7): at most 256 characters, never reassigned to another principal (E78), with no guessable relationship to the user's identity, and unique per IdP and SP pair (E86).
- Transient identifiers: `AllowCreate` MUST NOT be used and SHOULD be ignored with `urn:oasis:names:tc:SAML:2.0:nameid-format:transient` (§3.4.1.1 via E14). Name Identifier Management MUST NOT be used with them (§3.6 via E14).
- Every format in §8.2 and §8.3 must be producible and consumable by a conforming implementation (Conf §3.3).

## Requests and responses (Core §3.2)

- **RequestAbstractType** (§3.2.1): required `ID`, `Version` and `IssueInstant`; optional `Destination`, `Consent`, `<Issuer>`, `<ds:Signature>` and `<Extensions>`. If `Destination` is present, the recipient MUST check that it is the location where the message arrived, and otherwise discard the message.
- **StatusResponseType** (§3.2.2): required `ID`, `Version`, `IssueInstant` and `<Status>`; optional `InResponseTo`, `Destination`, `Consent`, `<Issuer>` and `<ds:Signature>`. `InResponseTo` MUST be absent when the response answers no request, and otherwise MUST equal the request's `ID`. `Destination` follows the same rule as for requests.
- **Status codes** (§3.2.2.2): top-level values are `Success`, `Requester`, `Responder` and `VersionMismatch` under `urn:oasis:names:tc:SAML:2.0:status:`. Second-level codes such as `AuthnFailed`, `NoPassive`, `InvalidNameIDPolicy`, `NoAuthnContext` and `RequestDenied` refine them. Responders MAY omit second-level codes to avoid helping attackers probe.

## AuthnRequest (Core §3.4)

- The `AuthnRequest` SHOULD be signed or otherwise authenticated and integrity-protected by its binding (§3.4.1).
- `ForceAuthn="true"`: the IdP authenticates the presenter freshly. With `IsPassive="true"` as well, it authenticates freshly only if it can do so passively. `IsPassive="true"`: the IdP and the user agent do not visibly take over the UI (§3.4.1).
- `AssertionConsumerServiceIndex` is mutually exclusive with `AssertionConsumerServiceURL` and `ProtocolBinding`. The IdP MUST map an index through a trusted means such as metadata, and MUST ensure a URL is associated with the requester (§3.4.1; Prof §4.1.4.1).
- `<NameIDPolicy>` constrains the identifier. Requesters that do not use `AllowCreate` SHOULD generally set it to `"true"` (§3.4.1.1 via E14).
- A `<Subject>` in the request MUST NOT contain `<SubjectConfirmation>` (Prof §4.1.4.1). The resulting assertions name the same principal, possibly in a different format; if the IdP cannot do that, it returns an error status (§3.4.1.4 via E75).
- The IdP replies either with assertions meeting the request or with an error `<Status>`, such as `AuthnFailed` or `UnknownPrincipal` (§3.4.1.4). Every assertion it returns has an `AudienceRestriction` naming the requester (§3.4.1.4).
- An IdP that receives an unsigned `AuthnRequest` from an SP whose metadata sets `AuthnRequestsSigned="true"` MUST return an error and MUST NOT fulfil it (Meta §2.4.4 via E7).

## Single Logout (Core §3.7)

- `<LogoutRequest>` (§3.7.1) SHOULD be signed or otherwise authenticated. It carries optional `NotOnOrAfter` (expiry of the request) and `Reason`, the principal's `BaseID`, `NameID` or `EncryptedID`, and zero or more `<SessionIndex>`.
- A session participant MUST authenticate the request. If it comes from the authority that issued the session's authentication statement, the participant MUST invalidate the matching sessions. It MUST also apply the logout to matching assertions that arrive later, until the request's `NotOnOrAfter` passes (§3.7.3.1).
- A session authority MUST authenticate the sender, then SHOULD propagate the logout to other participants and terminate the session (§3.7.3.2).

## Signatures (Core §5)

- Unless a profile specifies otherwise, XML signatures in SAML are enveloped (§5, §5.4.1).
- An assertion obtained from anyone other than its issuer SHOULD be signed by the issuer. A message arriving from anyone other than its originator SHOULD be signed by the originator (§5).
- **Inheritance** (§5.3): an unsigned assertion inside a signed element that covers it inherits that signature. Profiles may define other inheritance, but none should be inferred otherwise.
- **The profile** (§5.4) applies to `<ds:Signature>` elements directly inside assertions, requests and responses:
  - The signed root has an `ID`, and the signature has exactly one `<ds:Reference>` with `URI="#<ID>"` (§5.4.2).
  - Use Exclusive C14N as `CanonicalizationMethod` and as a transform (§5.4.3). This helps verification in a new XML context, but it does not make a signed object safe to move (E83).
  - Allow no transforms other than enveloped-signature and Exclusive C14N, with or without comments. Verifiers MAY reject others; if they accept them, they MUST make sure no content is excluded from the signature (§5.4.4).
  - `<ds:KeyInfo>` is optional (§5.4.5).
  - `<ds:Object>` SHOULD NOT be present, and verifiers SHOULD reject signatures that contain it (§5.4.5 via E91).
  - Any XML Signature algorithm MAY be used (§5.4.1 via E81). XMLDSig 1.1 §6.1 marks SHA-1 digests and RSA-SHA1 signature generation as discouraged; RSA-SHA256 and SHA-256 are required to implement. SAML 2.0 conformance still lists RSA-SHA1 for interoperability (Conf §4.1).
- **Exclusive C14N `InclusiveNamespaces`.** Exclusive C14N renders only the namespaces an element visibly uses (Exc-C14N §1.1). A prefix used only inside attribute content, such as `xsi:type="xs:string"`, is not visibly used and must be listed in `PrefixList` (Exc-C14N §1.3, §5). Core's own example signs an assertion with `PrefixList="#default saml ds xs xsi"` (§5.4.6).

## Encryption (Core §6)

- Encrypted data replaces the plaintext in place. `EncryptedData` `Type` SHOULD be `http://www.w3.org/2001/04/xmlenc#Element`. Any XML Encryption algorithm MAY be used (§6.1).
- When both are applied, the RP validates and decrypts in the reverse order of signing and encrypting (§6.2). A signed `Assertion` is signed first, then encrypted, so the RP decrypts and then verifies the assertion's signature. An encrypted `NameID` or `Attribute` is encrypted first, and the enclosing assertion or message is signed over the ciphertext (§6.2).
- With CBC-mode data encryption, the RP SHOULD require integrity protection, for example a signed `Response` or authenticated TLS, before processing encrypted assertions. Some deployments sign both the `Response` and the `Assertion` (§6.2 via E93; Prof §4.1.4.3 via E93).
- PKCS#1 v1.5 key transport is subject to attacks; RSA-OAEP is the recommended replacement. Authenticated modes such as GCM avoid the CBC problem (Sec §4.6 via E93).
- Conformance requires `EncryptedID`, `EncryptedAssertion` and `EncryptedAttribute` wherever the plaintext elements are supported (Conf §3.4).
