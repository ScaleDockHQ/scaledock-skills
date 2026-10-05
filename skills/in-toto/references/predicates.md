# Predicates

Read this when choosing a `predicateType`, filling a predicate, or designing a new one. Sources: the Attestation Framework v1.2.0 `spec/predicates/` directory and its `README.md`, `spec/v1/predicate.md`, `docs/new_predicate_guidelines.md` and the v1.2.0 release notes, listed in [Sources](../SKILL.md#sources).

## Choose an existing predicate first

Users are expected to choose an existing predicate type that fits, or develop a new one if none does (`predicate.md`, Fields). The vetted predicates at v1.2.0 (`spec/predicates/README.md` and each predicate file):

| Predicate                  | Type URI (as in `predicateType`)                                        | Version | Use for                                                       |
| -------------------------- | ----------------------------------------------------------------------- | ------- | ------------------------------------------------------------- |
| SLSA Provenance            | `https://slsa.dev/provenance/v1`                                        | 1.0     | How an artifact was built. Defined by SLSA.                   |
| SLSA Verification Summary  | `https://slsa.dev/verification_summary/v1`                              | 1.0     | A SLSA verification decision about an artifact (VSA).         |
| Simple Verification Result | `https://in-toto.io/attestation/svr/v0.1`                               | 0.1     | Properties a trusted verifier checked, at a point in time.    |
| SPDX 2                     | `https://spdx.dev/Document/v2.3` (also `https://spdx.dev/Document`)     | 2.3     | An SPDX 2 SBOM as the predicate.                              |
| SPDX 3                     | `https://spdx.dev/Document/v3`                                          | 3.0     | An SPDX 3 document as the predicate.                          |
| CycloneDX                  | `https://cyclonedx.org/bom/v1.4` (Type URI `https://cyclonedx.org/bom`) | 1.4     | A CycloneDX BOM as the predicate.                             |
| Link                       | `https://in-toto.io/attestation/link/v0.3`                              | 0.3     | One in-toto layout step, for migration from in-toto links.    |
| Test Result                | `https://in-toto.io/attestation/test-result/v0.1`                       | 0.1.0   | One invocation of a test suite.                               |
| Vulnerabilities            | `https://in-toto.io/attestation/vulns/v0.2`                             | 0.2     | Results of a vulnerability scan (v0.1 in `vuln.md` is older). |
| Reference                  | `https://in-toto.io/attestation/reference/v0.1`                         | 0.1.0   | Signed pointers to out-of-band documents such as an SBOM.     |
| Release                    | `https://in-toto.io/attestation/release`                                | 0.2     | Registry statement of which artifacts make up a release.      |
| Runtime Trace              | `https://in-toto.io/attestation/runtime-trace/v0.1`                     | 0.1.0   | Runtime traces of a supply chain operation, such as a build.  |
| SCAI Report                | `https://in-toto.io/attestation/scai/v0.3`                              | 0.3     | Evidence-based assertions about artifact attributes.          |

Notes:

- SLSA Provenance and VSA are only listed here; their schemas live at slsa.dev (`provenance.md`, `vsa.md`). The old `https://in-toto.io/Provenance/v0.1` URI is deprecated; v0.2 renamed it to `https://slsa.dev/provenance` (`provenance.md`, New in v0.2). Use the `slsa` skill for the provenance fields and SLSA levels.
- For SPDX and CycloneDX, the predicate is the JSON-encoded document and the schema, parsing rules and fields come from that standard (`spdx2.md`, `spdx3.md`, `cyclonedx.md`). The examples in those files still show `_type` `https://in-toto.io/Statement/v0.1`; new attestations use `https://in-toto.io/Statement/v1`. Use the `spdx` and `cyclonedx` skills for the documents.
- The Release predicate file says version 0.2 (`releaseId` renamed to `packageId`), but its schema example still shows `release/v0.1` (`release.md`, Schema and Changelog). Under the versioning rules 0.X versions are major, so confirm the URI with the consumer before emitting.
- SVR was added in v1.2.0, the Release predicate moved to v0.2, and the SPDX 3 predicate was added (v1.2.0 release notes).

## Predicate summaries

### Link (`link.md`)

```jsonc
{
  "_type": "https://in-toto.io/Statement/v1",
  "subject": [{ "name": "foo.tar.gz", "digest": { "sha256": "..." } }],
  "predicateType": "https://in-toto.io/attestation/link/v0.3",
  "predicate": {
    "name": "package",
    "command": ["tar", "zcvf", "foo.tar.gz", "foo.py"],
    "materials": [{ "name": "foo.py", "digest": { "sha256": "..." } }],
    "byproducts": {},
    "environment": {},
  },
}
```

- `subject` holds the step's products; `predicate.materials` its inputs (Model).
- `name` (required) is the step name used to match the layout (Fields).
- Each `materials` entry MUST set `name` and `digest`, and `name` MUST be unique among materials; each subject `name` MUST be unique in the attestation (Fields).
- The predicate has no `_type` and no `products` (Fields).
- The deprecated URI is `https://in-toto.io/Link/*`; ITE-6 examples used `https://in-toto.io/Link/v0.2` with a string `command` and a map of `materials`. v0.3 reverted `command` to a list and made `materials` a list of ResourceDescriptors (Version History).
- To convert to an old-style link, set `_type` to `link`, copy `name`, `environment` and `byproducts`, and build `products` and `materials` as maps of name to digest (Converting to old-style links).

### Test Result (`test-result.md`)

`predicate.result` (required) is `PASSED`, `WARNED` or `FAILED`; `configuration` (required) is a list of ResourceDescriptors for the test configuration; optional `url`, `passedTests`, `warnedTests`, `failedTests`. Each attestation corresponds to one invocation of a test suite, and the subject is the source artifacts tested (Use Cases, Model, Fields).

### Simple Verification Result (`svr.md`)

`verifier.id` (required, TypeURI; version it when the verification logic changes), `timeCreated` (required, Timestamp) and `properties` (required, the passing properties, scoped by framework or verifier, such as `SLSA_BUILD_LEVEL_3`). An SVR does not carry what is needed to reproduce the result (Model, Fields).

### Reference (`reference.md`)

`attester.id` (TypeURI) and `references` (list of ResourceDescriptors). Use it to sign a pointer to an SBOM or other document without shipping it in-band (Purpose, Schema).

### Release (`release.md`)

`purl` (required, ResourceURI) and `packageId`. If the registry supports immutable releases there SHOULD be one release attestation per `purl`; the subject SHOULD include every artifact of the release at that time, and a later attestation with fewer artifacts means the release now contains only those (Model).

## Designing a new predicate

Conventions (`new_predicate_guidelines.md`, Predicate conventions):

- Follow and opt in to the parsing rules, especially the monotonic principle, and say what the parsing rules are.
- Use lowerCamelCase field names.
- Use RFC 3339 timestamps in `Z` and name them by meaning (`builtAt`, `scannedAt`), not `timestamp`.
- Limit which subject types are valid if that matters (for example, only git commits for a code review predicate).
- Give the type a versioned TypeURI under a namespace you control (`field_types.md`, TypeURI). Bump the major (and the URI) when the meaning of an existing field changes; add fields in a minor version only if their absence has no meaning (`versioning.md`).

To get a predicate vetted, open a pull request to `in-toto/attestation` using the predicate template and ITE-9 format; maintainers review it at a maintainers meeting (Vetting process). Vetting is optional: TypeURIs are not registered (`field_types.md`, TypeURI).

## Policy questions per predicate

- Provenance and VSA: the checks are defined by SLSA; use the `slsa` skill.
- Test Result: the policy checks the expected configuration, then that `result` is `PASSED` and `failedTests` is empty, or that the tests that matter are in `passedTests` or `warnedTests` (`test-result.md`, Asserting Test Configurations Used and Asserting Test Results).
- Vulnerabilities: write the policy monotonically, requiring a positive "no vulnerabilities" attestation rather than denying when a "has vulnerabilities" one exists (`spec/v1/README.md`, Monotonic principle).
- SVR: the value comes from trusting the verifier, so the verifier must publish its policy logic and identities to consumers (`svr.md`, Purpose and Prerequisites).
