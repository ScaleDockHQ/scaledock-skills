# DID methods

Read this when writing or reviewing a DID method specification, choosing a method, using the DID Extensions lists, or implementing `did:web`. Sources: DID 1.0 § 8 (DID 1.1 § 7 has the same requirements), the DID Extensions notes, the DID Method Rubric note, and the `did:web` Method Specification, listed in [Sources](../SKILL.md#sources).

## What a DID method is

A DID method defines how to realize DID Core for one kind of verifiable data registry: the method-specific DID scheme and how to create, resolve, update and deactivate DIDs and DID documents, plus its implementation, security and privacy considerations. DID Core is to a method what the generic URI specification (RFC 3986) is to one URI scheme such as `http` (DID 1.0 § 8).

## Requirements for a method specification

### Method syntax (DID 1.0 § 8.1, DID 1.1 § 7.1)

- MUST define exactly one method-specific DID scheme identified by exactly one method name (the `method-name` rule).
- MUST specify how to generate the `method-specific-id`, and MUST define its sensitivity and normalization.
- The `method-specific-id` MUST be unique within the method, and every DID the method generates MUST be globally unique.
- SHOULD be registered (DID Specification Registries in DID 1.0, DID Extensions in DID 1.1) to reduce name conflicts.
- MAY define several `method-specific-id` formats. Colons MAY appear but MUST follow the `method-specific-id` ABNF; their meaning is method-specific.
- MAY define stricter ABNF for DID paths, queries and fragments.

### Method operations (DID 1.0 § 8.2, DID 1.1 § 7.2)

A method specification MUST:

- define how authorization is performed for all operations, including the cryptographic processes;
- specify how a controller **creates** a DID and its DID document;
- specify how a resolver **resolves** a DID to a DID document, including how it can verify the authenticity of the response;
- specify what an **update** is and how a controller performs one, or state that updates are not possible;
- specify how a controller **deactivates** a DID, or state that deactivation is not possible.

Who may authorize operations is method-specific: the `controller` property, the `authentication` methods, a `capabilityInvocation` method, or an out-of-band mechanism (DID 1.0 § 8.2).

### Security section (DID 1.0 § 8.3, DID 1.1 § 7.3)

A method specification:

- MUST follow RFC 3552 for its operations;
- MUST document eavesdropping, replay, message insertion, deletion, modification, denial of service, amplification and man-in-the-middle attacks, and SHOULD document other known attacks;
- MUST discuss residual risks, such as compromise of a related protocol, incorrect implementation, or a broken cipher;
- MUST provide integrity protection and update authentication for all required operations;
- MUST document the security characteristics of any authentication method, particularly user-host authentication;
- MUST discuss how DIDs are proven to be uniquely assigned;
- MUST discuss method-specific endpoint authentication, and for DLTs with light-node or thin-client topologies, the security assumptions of the topology;
- MUST say which data its cryptographic protection covers and how, and SHOULD say which attacks that protection is susceptible to;
- SHOULD clearly label secret data, explain signatures on DID documents if used, discuss peer-to-peer resource burdens in relation to denial of service, and consider the security of any new authentication service type.

### Privacy section (DID 1.0 § 8.4, DID 1.1 § 7.4)

A method specification MUST discuss every subsection of RFC 6973 § 5 that could apply in a method-specific way: surveillance, stored data compromise, unsolicited traffic, misattribution, correlation, identification, secondary use, disclosure and exclusion.

DID Resolution adds: a method using proofs MUST specify how they verify the result of Resolve; methods SHOULD give guidance on at least one way to implement verifiable resolution; methods on distributed ledgers SHOULD specify how to tell their registry apart from forks (Resolution § 8.1, § 13.5). Method designers are encouraged to produce a threat model (Resolution § 14.2).

## DID Extensions

The DID Extensions Group Note replaced the DID Specification Registries: `https://www.w3.org/TR/did-spec-registries/` redirects to it. It lists the documents holding known parameters, properties and values, and splits into three notes:

| Note                             | Contents                                                                                                       |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| DID Document Property Extensions | Document, verification relationship and verification method properties; verification method and service types. |
| DID Method Extensions            | The table of known DID methods: method name, registry, contact.                                                |
| DID Resolution Extensions        | Resolution and dereferencing options, metadata properties, media types and error values.                       |

How to read them:

- The status says the repository is under active development and implementers are advised against using it unless directly involved with the W3C DID Working Group (DID Extensions, Status).
- The methods table is not an endorsement of any method or technology by the W3C, the DID WG or its members. It exists so developers can find methods. Methods that do not meet the DID 1.0 Methods requirements will not be accepted (DID Method Extensions § 2).
- A listing does not imply quality or review. Entries that cause interoperability problems MAY be marked as such (DID Extensions § 2).

### Registering an extension (DID Extensions § 2)

Submit a pull request to the repository. The submission:

- MUST include a human-readable description;
- MUST use names that reflect the function, not generic terms such as `myProperty` or `foo`; method names SHOULD avoid generic terms such as `mymethod` or `registry`;
- MUST NOT raise copyright, trademark or IPR concerns; if there are known concerns, the rights holder MUST authorize use in writing under an F/RAND licence;
- MUST NOT create unreasonable legal, security, moral or privacy issues that cause direct harm to others;
- MUST link to the defining specification, preferably with content integrity protection;
- for properties and values, MUST include a machine-readable JSON-LD context in full, with a persistent namespace URI; the context MUST be versioned, MUST NOT be date-stamped, MUST use `@protected`, and SHOULD use scoped terms.

Properties are never removed, only deprecated.

## Evaluating a method: the DID Method Rubric

The DID Method Rubric Group Note gives questions for judging a method against a use case. It is not a conformance test.

How to apply it (Rubric § 1.2):

1. Frame the use first, for example IoT, school activities or international travel; the use changes the answers.
2. Pick the criteria that matter for that use. You do not need to answer all of them.
3. Evaluate each variant separately when a method has several networks or registries.
4. Record the evaluator and the date, because many criteria are subjective and change over time.

Report formats (Rubric § 1.3):

- **Comprehensive:** one method against the chosen criteria.
- **Comparative:** several methods in one table.

Either way, record the methods with links to their specifications, the evaluators, the date, the use cases, and the rubric version used.

Criteria categories (Rubric § 1.4, § 3):

- **Rulemaking**, **Operations** and **Enforcement**: the governance categories, covering who makes the rules, how they are carried out and how breaches are handled.
- **Design**: for example permissioned operation, interoperability, offline creation and costs.
- **Adoption and diversity**: for example release status and maturity.
- **Security**: for example robust cryptography, availability and expert review.
- **Privacy**: for example per-DID visibility constraints.

The rubric is a starting point, not a verdict (Rubric § 1.2).

Before adopting a method, also check its specification against the requirements above: it covers all four operations, says how a resolver verifies authenticity, and has security and privacy sections that meet DID 1.0 § 8.3 and § 8.4.

## `did:web`

No W3C Recommendation or Note defines `did:web` or `did:key`: on 2026-10-05 neither has a `/TR/` page. `did:web` is specified in a W3C Credentials Community Group repository: an unofficial draft, not a W3C standard or standards-track document. It states conformance to DID 1.0 (did:web, Preface). The DID Method Extensions note lists `web`, with registry "Web".

What the draft says:

- **Method name:** `web`. DIDs begin `did:web:` (did:web, Method name).
- **Method-specific identifier:** a fully qualified domain name secured by a TLS certificate, with an optional path delimited by colons. It MUST match the certificate's common name and MUST NOT include an IP address. A port MAY be included, and its colon MUST be percent-encoded (did:web, Method-specific identifier).

```text
did:web:w3c-ccg.github.io              → https://w3c-ccg.github.io/.well-known/did.json
did:web:w3c-ccg.github.io:user:alice   → https://w3c-ccg.github.io/user/alice/did.json
did:web:example.com%3A3000:user:alice  → https://example.com:3000/user/alice/did.json
```

**Read.** These steps MUST be executed (did:web, Read):

1. Replace `:` with `/` in the method-specific identifier.
2. Percent-decode the port colon if there is one.
3. Prepend `https://`.
4. If there is no path, append `/.well-known`.
5. Append `/did.json`.
6. Send an HTTP GET with an agent that negotiates a secure HTTPS connection meeting the in-transit security requirements.
7. Verify that the resolved document's `id` matches the DID being resolved.

The client SHOULD use DNS over HTTPS (RFC 8484) to avoid tracking.

**Create, update and deactivate.** No HTTP API is specified for these operations (did:web, DID method operations).

- **Create:** register a domain, host it, and publish `did.json` at the well-known URL or at the path.
- **Update:** change `did.json`. The DID stays the same.
- **Deactivate:** remove `did.json` or make it no longer publicly available.

**Document handling.** `did.json` will likely be served as `application/json` (did:web, Key Material and Document Handling).

- If `@context` is present, process the document as JSON-LD, and reject it if that fails.
- If `@context` is absent, process it with the DID 1.0 § 6.2.2 JSON rules.
- Every DID URL in the document MUST be absolute (the text uses lowercase "must"), to prevent key confusion attacks.

**Security and privacy** (did:web, Security and privacy considerations):

- **Authorization:** the method specifies no authentication or authorization for writes. Protect `did.json` like any other web resource.
- **DNS:**
  - Man-in-the-middle and spoofed DNS records can point a resolver at a different DID document. Use DNSSEC (RFC 4033 to RFC 4035) and secure DNS resolution.
  - DNS providers and the web server can track resolutions. To avoid this, use a trusted resolver, a VPN, Tor or Oblivious DoH.
- **Integrity:** hashlinks MAY be used to check that the document has not been tampered with.
- **Transport:**
  - NIST SP 800-52 Rev. 2 (or its successor) MUST be followed.
  - TLS MUST use at least SHA256, and SHOULD use SHA384, POLY1305 or stronger.
  - TLS 1.2 or higher SHOULD use only strong cipher suites.
- **Internationalized domain names:** DID syntax does not allow Unicode, so be careful with Unicode domains and paths.
- **Paths:** with a path DID such as `did:web:example.com:u:bob`, a proof shows control by whoever controls that file, not by the domain operator.
- **CORS:** for browser-based resolution, serve the document with `Access-Control-Allow-Origin: *`.

The draft defines no version history: an update overwrites `did.json` and deactivation removes it, so it gives `versionId` and `versionTime` nothing to select. Its trust rests on DNS, TLS and the web server, so weigh it with the rubric's Security and Design criteria for your use.
