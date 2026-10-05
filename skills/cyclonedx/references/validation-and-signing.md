# Validation, signing and CI

Read this when serializing, validating, signing or verifying a CycloneDX BOM, wiring BOM generation into CI, or ingesting BOMs. Sources: ECMA-424 2nd edition § 2 and § 6 (Table 1), the 1.7 JSON Schema, XSD and Protobuf schema at tag 1.7.2, `jsf-0.82.schema.json`, the JSF specification, and the CycloneDX CLI README, listed in [Sources](../SKILL.md#sources).

## Formats and schemas

"CycloneDX relies exclusively on JSON Schema, XML Schema, and protobuf for validation", and "the CycloneDX JSON Schema is the reference implementation for the Ecma standard" (ECMA-424 § 6, Table 1 and note).

| Format   | Schema                                                                                                                             | Version marker                                             |
| -------- | ---------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| JSON     | `https://cyclonedx.org/schema/bom-1.7.schema.json` (JSON Schema draft-07, `$id` `http://cyclonedx.org/schema/bom-1.7.schema.json`) | `"specVersion": "1.7"`                                     |
| XML      | `https://cyclonedx.org/schema/bom-1.7.xsd` (XML Schema 1.0)                                                                        | namespace `http://cyclonedx.org/schema/bom/1.7` on `<bom>` |
| Protobuf | `https://cyclonedx.org/schema/bom-1.7.proto` (proto3, package `cyclonedx.v1_7`)                                                    | `spec_version` field 1                                     |

The schema URLs are those in ECMA-424 Table 1. The JSON schema references three sibling schemas that a validator must load: `spdx.schema.json` (license IDs), `jsf-0.82.schema.json` (signatures) and `cryptography-defs.schema.json` (algorithm families and elliptic curves). The XSD imports `http://cyclonedx.org/schema/spdx`. Load local copies from the same tag (the repository's `schema/` directory) rather than resolving them over the network at validation time.

## Checks the schema cannot do

JSON Schema validation is necessary but not sufficient. Also check:

1. `bom-ref` uniqueness across the whole document (the XSD enforces it with `xs:unique`; the JSON Schema does not) (schema `refType`).
2. Every `refLinkType` value resolves to a `bom-ref` in the same BOM: `dependencies[].ref`, `dependsOn`, `provides`, `assessor`, `requirement`, `claims`, `target`, `attributedTo`, `process` (schema).
3. BOM-Links are well formed and, where reachable, resolve to the named BOM version.
4. Every component and service appears in `dependencies`, with empty entries for leaves (schema `dependency`).
5. `purl` values parse; `cpe` values are CPE 2.2 or 2.3; license expressions are valid SPDX expressions (schema `component`, `licenseChoice`).
6. `not_affected` analyses carry a justification (schema `impactAnalysisState`).
7. Citation `pointers` resolve against the BOM (schema `citation`).
8. No deprecated fields in new BOMs.

## Signing with JSF

CycloneDX JSON uses enveloped JSF signatures (schema `signature`, which refers to `jsf-0.82.schema.json`). A `signature` property is allowed on the BOM root and on components, services, compositions, annotations, standards and citations, and inside `declarations` on the declarations object, attestations, claims, evidence, the affirmation and each signatory, so parts can be signed separately (schema).

A JSF signature is one of (jsf-0.82 schema `signature`):

- a single signer object: `algorithm` and `value` required; `keyId`, `publicKey` (JWK-style with `kty` `EC`, `OKP` or `RSA`), `certificatePath` (X.509, signing certificate first) and `excludes` optional;
- `{"signers": [...]}` for multiple independent signatures;
- `{"chain": [...]}` for a signature chain.

Algorithms: `RS256`, `RS384`, `RS512`, `PS256`, `PS384`, `PS512`, `ES256`, `ES384`, `ES512`, `Ed25519`, `Ed448`, `HS256`, `HS384`, `HS512`, or a URI for a proprietary algorithm (jsf-0.82 schema). JSF requires explicit `Ed25519`/`Ed448` names, not `EdDSA`.

Creating a signature (JSF § 7):

1. Build the signature object with everything except `value`, and add it to the object to sign.
2. Canonicalize the whole object with JCS (RFC 8785), leaving out any properties named in `excludes`.
3. Sign the UTF-8 bytes with the chosen algorithm and key.
4. Add `value` with the result.

Verifying (JSF § 6): remove `value`, canonicalize the remaining object with JCS (still leaving out `excludes`), and verify `value` with `algorithm` and the key. Path validation of `certificatePath` is outside JSF; do it as RFC 5280 describes. The data must be I-JSON (RFC 7493) compatible (JSF § 1).

Rules that follow:

- Sign last: any change after signing, including reformatting into a different JSON value or adding properties, breaks the signature unless they are excluded. Whitespace and property order do not matter, because JCS canonicalizes them.
- Increment `version` and re-sign after any modification (ECMA-424 § 6.4).
- XML and Protobuf BOMs have no `signature` element in the 1.7 XSD and `.proto`. Sign those files as a whole with a detached signature or an attestation instead.

## Producing BOMs in CI

1. Generate from the resolved build (after dependency resolution, before or after packaging) and record `metadata.lifecycles` as `build` or `post-build` (schema `metadata.lifecycles`).
2. Put the generator in `metadata.tools.components`, the artifact in `metadata.component`, and a fresh `serialNumber` per run (ECMA-424 § 6.3).
3. Write `bom.json` or `<artifact>.cdx.json` (README, Recognized file patterns).
4. Validate and fail the build on errors. With the CycloneDX CLI: `cyclonedx validate --input-file bom.json --input-version v1_7 --fail-on-errors` (CLI README, Validate Command).
5. Run the semantic checks above.
6. Sign. The CLI offers `cyclonedx sign bom <bom-file> --key-file <pem>` for an RSA private key in PEM and `cyclonedx verify all <bom-file> --key-file <pem>` (CLI README). Or wrap the BOM in an in-toto attestation with predicate type `https://cyclonedx.org/bom` (overview page).
7. Publish next to the artifact with media type `application/vnd.cyclonedx+json; version=1.7`, and keep VEX documents separate when they change on a different schedule.

The CLI also converts between CycloneDX XML, JSON, Protobuf, CSV and SPDX JSON 2.3, and diffs and merges BOMs (CLI README).

## Consuming BOMs

A conforming consumer (ECMA-424 § 2):

- interprets what it processes as the standard defines, but need not process every field;
- SHOULD raise a warning or error on a non-conforming BOM, and must not raise an error on a conforming one;
- processes any optional feature it uses as the standard defines.

In practice:

1. Detect the format from the media type or file name, then read `specVersion` (JSON), the namespace (XML) or `spec_version` (Protobuf), and validate against that version's schema at its latest patch.
2. Verify signatures before trusting content.
3. When several BOMs share a `serialNumber`, use the highest `version` (ECMA-424 § 6.4).
4. If `scope` is absent, assume `required` (schema `component.scope`).
5. Treat a component without a `dependencies` entry as having unknown dependencies, and read `compositions` before concluding that an inventory is complete.
6. Resolve BOM-Links to the exact BOM version they name.
7. Ignore `properties` names you do not know; they are extensions.
