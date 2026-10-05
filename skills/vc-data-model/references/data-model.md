# Data model, syntax and JSON-LD processing

Read this when writing or parsing a credential or presentation, defining a credential type or context, or deciding whether an implementation needs a JSON-LD library. Source: Verifiable Credentials Data Model v2.0 (VCDM 2.0), with Data Integrity sections where named. Section numbers are VCDM 2.0 unless another specification is named.

## Roles and terms

- **Issuer** asserts claims, creates a verifiable credential and sends it to a holder. **Holder** possesses credentials and generates presentations; the holder is often, but not always, the subject. **Verifier** receives credentials, optionally in a presentation. **Verifiable data registry** mediates identifiers, keys, schemas and status lists (§ 1.2, § 2).
- A **credential** or **presentation** becomes **verifiable** only when it is secured cryptographically (§ 3, note).
- **Verification** checks that a credential or presentation conforms, its securing mechanism is satisfied and, if present, its status check succeeds. **Validation** is the verifier applying its own business rules to the claims; it is outside the specification's conformance (§ 2).

## A minimal credential

```json
{
  "@context": [
    "https://www.w3.org/ns/credentials/v2",
    "https://www.w3.org/ns/credentials/examples/v2"
  ],
  "id": "http://university.example/credentials/3732",
  "type": ["VerifiableCredential", "ExampleDegreeCredential"],
  "issuer": "https://university.example/issuers/565049",
  "validFrom": "2010-01-01T00:00:00Z",
  "credentialSubject": {
    "id": "did:example:ebfeb1f712ebc6f1c276e12ec21",
    "degree": {
      "type": "ExampleBachelorDegree",
      "name": "Bachelor of Science and Arts"
    }
  }
}
```

This is the unsecured form from § 4.4 Example 3. The examples context is for examples only, never pilots or production (§ 4.3); replace it with a published, use-case-specific context (§ 4.1).

## Credential properties

| Property              | Required | Rule                                                                                                                                                | Section |
| --------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `@context`            | yes      | Ordered set; first item exactly `https://www.w3.org/ns/credentials/v2`; later items URLs or objects processable as JSON-LD contexts.                | § 4.3   |
| `id`                  | no       | A single URL, which MAY be dereferenceable. Omit it where pseudonymity matters.                                                                     | § 4.4   |
| `type`                | yes      | One or more terms or absolute URLs, order irrelevant; includes `VerifiableCredential`. SHOULD add a narrower type.                                  | § 4.5   |
| `name`, `description` | no       | A string or a language value object.                                                                                                                | § 4.6   |
| `issuer`              | yes      | A URL, or an object with an `id` URL (plus other issuer properties such as `name`). RECOMMENDED to dereference to a controlled identifier document. | § 4.7   |
| `credentialSubject`   | yes      | One or more objects, each the subject of one or more claims, with an optional `id`.                                                                 | § 4.8   |
| `validFrom`           | no       | `dateTimeStamp`; the earliest time the subject information is valid; not later than `validUntil`.                                                   | § 4.9   |
| `validUntil`          | no       | `dateTimeStamp`; the latest time the subject information is valid; not earlier than `validFrom`.                                                    | § 4.9   |
| `credentialStatus`    | no       | One or more objects with a REQUIRED `type` and optional `id`.                                                                                       | § 4.10  |
| `credentialSchema`    | no       | One or more schemas, each with a `type` (for example `JsonSchema`) and an `id` URL.                                                                 | § 4.11  |
| `relatedResource`     | no       | Objects with a unique `id` and `digestSRI` or `digestMultibase`, optional `mediaType`.                                                              | § 5.3   |
| `refreshService`      | no       | One or more objects, each with a `type`.                                                                                                            | § 5.4   |
| `termsOfUse`          | no       | One or more policies, each with a `type` and optional `id`.                                                                                         | § 5.5   |
| `evidence`            | no       | One or more objects with a REQUIRED `type` and optional `id`.                                                                                       | § 5.6   |

Arity: `id`, `issuer`, `validFrom` and `validUntil` are single values; every other property is a single value or an array (§ 6).

Notes on individual properties:

- Without `validFrom` and `validUntil` the credential is valid indefinitely from the time it was created (§ 4.9, note).
- Several status entries can conflict; reconciling them is verifier business logic (§ 4.10).
- `refreshService` is meant for expired credentials or issuers that publish no status. Do not put it in a non-public credential unless the service is protected; a refresh service visible to verifiers lets them bypass the holder (§ 5.4).
- `evidence` is supporting information for the verifier's confidence; it is not a securing mechanism (§ 5.6, note).
- A bearer credential has no `credentialSubject.id` (§ 8.10).

## Types on nested objects

Each of these objects MUST carry a `type` (§ 4.5 table): the credential (`VerifiableCredential` plus optional narrower types), the presentation (`VerifiablePresentation`), `credentialStatus` (for example `BitstringStatusListEntry`), `termsOfUse` (for example `TrustFrameworkPolicy`), `evidence` (for example `Evidence`), `refreshService`, and `credentialSchema` (for example `JsonSchema`). Software SHOULD use the type of the encapsulating object to understand nested objects (§ 4.5).

## Presentations

| Property               | Rule                                                                                                                                                 | Section |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `@context`             | Required, same rule as credentials.                                                                                                                  | § 4.3   |
| `id`                   | Optional single URL.                                                                                                                                 | § 4.13  |
| `type`                 | Required; one value MUST be `VerifiablePresentation`.                                                                                                | § 4.13  |
| `verifiableCredential` | Optional; one or more verifiable credentials or `EnvelopedVerifiableCredential` objects; MUST NOT be numbers, strings or URLs; each MUST be secured. | § 4.13  |
| `holder`               | Optional; a URL or an object with `id`.                                                                                                              | § 4.13  |

- Presentations SHOULD be extremely short-lived and bound to a verifier challenge (§ 4.13).
- A presentation that contains a self-asserted credential (its `issuer` equals the presentation's `holder`) secured only by the presentation's own mechanism MUST include `holder` (§ 4.13, Presentations Including Holder Claims).
- Each value of `verifiableCredential` is a separate named graph, so data from two credentials is never merged by accident; do not merge objects without a global `id` (§ 5.12).
- `termsOfUse` MAY appear on a presentation to state the holder's terms (§ 5.5).

### Enveloped forms

```json
{
  "@context": "https://www.w3.org/ns/credentials/v2",
  "id": "data:application/vc+sd-jwt,QzVjV...RMjU",
  "type": "EnvelopedVerifiableCredential"
}
```

- `EnvelopedVerifiableCredential`: `@context` MUST be present and define `id`, `type` and `EnvelopedVerifiableCredential` (the base context does); `id` MUST be a `data:` URL holding a credential secured with an enveloping mechanism; `type` MUST be `EnvelopedVerifiableCredential` (§ 4.13, Enveloped Verifiable Credentials).
- `EnvelopedVerifiablePresentation`: the same rules, for a presentation secured with an enveloping mechanism (§ 4.13, Enveloped Verifiable Presentations).
- COSE-secured credentials inside a presentation are base64-encoded in the `data:` URL (VC JOSE COSE § 3.3.1).

## Integrity of related resources

- A verifier that uses a resource listed in `relatedResource` with a digest MUST compute the digest and MUST produce an error on mismatch (§ 5.3).
- `digestSRI` follows the Subresource Integrity `integrity` grammar; `digestMultibase` follows VC Data Integrity § 2.3. At least one is required per object (§ 5.3).
- With `mediaType`, HTTP retrieval SHOULD send it in `Accept` and reject a different `Content-Type` (§ 5.3).
- `sha384` SHOULD be the minimum hash strength (§ 5.3). Objects meant for selective or unlinkable disclosure SHOULD NOT be in `relatedResource` (§ 5.3).
- Use it for JSON-LD contexts, schemas and images whose change would affect security (§ 9.3).

## Extensibility and contexts

- New terms: publish human-readable documentation (MUST), a machine-readable JSON-LD context at the URL used in `@context` that maps every term (MUST), and preferably an RDF Schema vocabulary (§ 5.2).
- The base context protects its terms; redefining them is a processing error (§ 5.2, note).
- Conforming documents SHOULD NOT use `@vocab` in production; a document whose contexts do not define every term MUST add `https://www.w3.org/ns/credentials/undefined-terms/v2` as the last context (§ 5.2).
- Avoid features that type-specific processors cannot see: inline `@base` or `@vocab`, contexts that override earlier ones, inline context objects, and full URLs where a short term is defined (§ 6.1).
- JSON-LD arrays are unordered unless they use `@list`; mark JSON values whose structure matters as `@json` in your context (§ 6.1, Lists and Arrays).
- Reserved, experimental properties: `confidenceMethod` and `renderMethod`. Use them only with a public specification, and always give the value a `type` (§ 5.10).

## When JSON-LD processing is required

The data model is serialized as JSON-LD 1.1 in compacted document form, which MUST be used for `application/vc` and `application/vp` (§ 6.1). Implementations then choose a processing mode (§ 6.3):

| Mode                                | What it is                                                                | Use when                                                                                                                                                                          |
| ----------------------------------- | ------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| General JSON-LD processing          | A JSON-LD library expands, compacts or converts to RDF.                   | The cryptosuite canonicalizes RDF (`eddsa-rdfc-2022`, `ecdsa-rdfc-2019`, `ecdsa-sd-2023`, `bbs-2023`), the verifier accepts arbitrary contexts, or the application merges graphs. |
| Type-specific credential processing | Plain JSON handling of known credential types, without a JSON-LD library. | The verifier accepts a fixed set of credential types and contexts, for example with VC JOSE COSE or a JCS-based cryptosuite.                                                      |

Rules for each:

- Type-specific processing is allowed only for conforming documents. Ensure every `@context` value is in the expected order, each context file matches a known good hash, and domain experts have approved the contents; static contexts plus JSON Schema are one way to do this (§ 6.3).
- Treat `https://www.w3.org/ns/credentials/v2` as already retrieved, with SHA-256 `59955ced6697d61e03f2b2556febe5308ab16842846f5b586d7f1f7adec92734`; throw if a hash does not match (§ B.1).
- If JSON-LD expansion or RDF conversion errors, the credential or presentation MUST fail verification (§ B.1).
- RDF processors MUST resolve `https://www.w3.org/2018/credentials#` and `https://w3id.org/security#` to the hashed vocabulary files (§ B.2).
- With Data Integrity, run context validation after verification (VC Data Integrity § 2.4.1, § 4.6), treat `https://w3id.org/security/data-integrity/v2`, `https://w3id.org/security/multikey/v1` and `https://w3id.org/security/jwk/v1` as already resolved (§ 2.4), error with `DATA_LOSS_DETECTION_ERROR` when a term is dropped (§ 2.4.3), and set the base URL to null when converting to RDF (§ 2.4.3).
- Contexts linked through an HTTP `Link` header are ignored for `application/vc` and `application/vp`; all context information is in the body (Appendix C).
- In production, permanently cache context files rather than loading them from the network (VC Data Integrity § 2.4).

## Media types

- `application/vc` identifies a verifiable credential, `application/vp` a verifiable presentation. Both conform to `application/ld+json` and imply no securing mechanism; content is not secure because of its media type (§ 6.2, Appendix C).
- A receiver given `application/json` or `application/ld+json` can infer the precise type: parse as JSON, check that `@context[0]` is the v2 URL, then look for `VerifiablePresentation` or `VerifiableCredential` in the top-level `type`, and still run all checks (§ 6.2, Media Type Precision).
- Secured forms use the VC JOSE COSE media types (`application/vc+jwt`, `application/vp+jwt`, `application/vc+sd-jwt`, `application/vp+sd-jwt`, `application/vc+cose`, `application/vp+cose`); see [securing.md](securing.md).

## Time values

- Time values SHOULD be `dateTimeStamp` in UTC (`Z`) or with an offset; values serialized without an offset MUST be read as UTC (§ 5.8).
- Prefer `Z` over zones with daylight saving time, and watch for gaps when time zone rules change between reissued credentials (§ 5.8).

## Language and direction

- A language value object MUST contain `@value` (a string), SHOULD contain `@language` (a BCP 47 tag), MAY contain `@direction`, and MUST NOT contain other keys (§ 11.1). Several language value objects can be given as an array (§ 11.1).
- Provide language and base direction for each natural language string, preferably per value; strings without a language SHOULD be treated as language tag `und` (§ 11.2).
