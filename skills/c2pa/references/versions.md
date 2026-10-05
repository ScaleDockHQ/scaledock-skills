# Versions and upgrades

Read this when choosing which C2PA specification version to produce, reading a manifest written under an older version, upgrading a claim generator or validator, or checking for a draft. Sources: the C2PA Technical Specification of each version, its Versioning chapter (§ 5, with the version history in § 5.3) and Appendix C (status of constructs), the C2PA Conformance Program v0.2 documents, and the `c2pa-org/specifications` repository, listed in [Sources](../SKILL.md#sources). Section numbers are from C2PA 2.4 unless another version is named.

## Version lines

C2PA publishes numbered versions of the Content Credentials specification on spec.c2pa.org; each version is a complete document, not a patch. The specifications index defaults to 2.4, and its version history dates 2.4 to April 2026 (§ 5.3.1). The `c2pa-org/specifications` repository has a GitHub release only for 2.3 (January 2026); 2.4 is published through the site build. No 2.5 or other draft is published on the site or in the repository as of 2026-10-05.

| Id    | Line     | Status    | Revision                        | Posture | Summary                                                                                                                       |
| ----- | -------- | --------- | ------------------------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `2.4` | C2PA 2.4 | current   | 2.4 (April 2026)                |         | Default target. `specVersion` moves into `claim_generator_info`, AI Disclosure assertion, HTML and structured-text embedding. |
| `2.3` | C2PA 2.3 | supported | 2.3 (December 2025)             |         | Live video, External Reference assertion, fine-grained watermark actions. Not accepted by Conformance Program v0.2.           |
| `2.2` | C2PA 2.2 | supported | 2.2 (May 2025)                  |         | `c2pa-kp-claimSigning` EKU and the C2PA Trust List, time-stamp assertion, embedded data. Minimum for the Conformance Program. |
| `2.1` | C2PA 2.1 | legacy    | 2.1 (September 2024)            |         | Well-formed, valid and trusted states, `urn:c2pa` labels, `c2pa.ingredient.v3`, `c2pa.hash.bmff.v3`, `sigTst2`.               |
| `2.0` | C2PA 2.0 | legacy    | 2.0 (January 2024)              |         | Claim v2 (`c2pa.claim.v2`), X.509 only, VC store and actors removed.                                                          |
| `1.4` | C2PA 1.4 | legacy    | 1.4 (November 2023); 1.0 to 1.4 |         | Claim v1 (`c2pa.claim`), the 1.x line. Signers chosen through `id-kp-emailProtection` or `id-kp-documentSigning`.             |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows.

The `1.4` line stands for all of 1.0 (December 2021), 1.1, 1.2, 1.3 and 1.4: they share claim v1 and the pre-2.0 trust model (§ 5.3.6 to § 5.3.10).

## Which version to use

- Produce C2PA 2.4. Declare it with `specVersion` `"2.4.0"` in `claim_generator_info` (§ 10.2.3.2). A generator that declares a version promises it writes no construct that version deprecates (§ 5.1).
- Produce C2PA 2.2 or C2PA 2.3 only for a named consumer that cannot read 2.4. For a product going through the C2PA Conformance Program, the program at v0.2 accepts conformance claims against 2.2 and 2.4 only (Conformance Program, Program Versioning and Grace Period); pick 2.4 or 2.2, not 2.3.
- Validate everything back to 1.0. A validator supports at least one version and every non-deprecated construct of it; for unknown or deprecated constructs it may ignore the construct and process the rest (§ 5.1). Deprecated constructs "shall not" be written by generators and "should" be read by validators (Appendix C).
- Treat C2PA 2.1, C2PA 2.0 and C2PA 1.4 manifests as input: validate them, use them as ingredients, never author them.
- Since January 1, 2026 the Interim Trust List is frozen; ITL certificates (typically tied to 1.4) stay valid for content signed during their validity, but new certificates come from CAs on the C2PA Trust List (C2PA Conformance page, Plan and Timeline).

## What changed

Each list follows the version history in § 5.3 of the 2.4 document, checked against the text of that version.

### C2PA 2.4

- The claim-level `specVersion` is deprecated; `specVersion` goes in `claim_generator_info`, and the recommendation to send it rises from may to should (§ 5.3.1, § 10.2.2, § 10.2.3.2).
- The mandatory actions assertion must be in `created_assertions`, not `gathered_assertions` (§ 5.3.1, § 18.15.2).
- `c2pa.opened` must reference its `c2pa.ingredient.v3` assertion by hashed URI (§ 18.15.2), and `allActionsIncluded` must be `true` when an asset is opened and re-saved without other changes (§ 18.15.3).
- New `relatedAssertions` action parameter; `c2pa.watermarked.bound` should reference its soft binding assertions through it (§ 18.15.4.8, § 18.15.5).
- Ingredient assertions gain `digitalSourceType` for ingredients without their own manifest; an ingredient with both `activeManifest` and `digitalSourceType` is malformed (§ 15.11.3.2).
- New assertions: `c2pa.ai-disclosure` (§ 18.28), `c2pa.environmental-sustainability` (§ 18.26), `c2pa.repository-receipt` (§ 18.27).
- New embeddings: HTML (§ A.7) and structured text such as source code, YAML and Markdown (§ A.9).
- crJSON, a JSON-LD view of a Manifest Store for validation reports and testing; it is derived and not independently verifiable (§ 5.3.1).
- `c2pa.metadata` validators no longer reject unlisted fields (§ 15.10.3.2.4); `dc:created` and `dc:modified` join the allowed list.
- Soft binding `alg` matching the algorithm list relaxes from shall to should (§ 9.3.2); deterministic signatures are recommended for live video (§ 13.2.1).

### C2PA 2.3

- Live video streaming (§ 19), unstructured text embedding (§ A.8), OGG Vorbis, AVIX and EXIF original preservation images.
- New External Reference assertion for non-hashed external URIs; Cloud Data assertion reworked (§ 5.3.2).
- `specVersion` in the claim and in validation results, plus the trust list used for ingredient validation.
- Fine-grained watermark actions (`c2pa.watermarked.bound`, `c2pa.watermarked.unbound`), proportional resizing and audio actions; actions may be gathered; `allActionsIncluded` recommended.
- The v1 actions assertion `c2pa.actions` deprecated in favour of `c2pa.actions.v2` (Appendix C); box hash deprecated for TIFF assets.
- Exclusion ranges in box hashing; validation of soft bindings and update manifests clarified.

### C2PA 2.2

- New `c2pa-kp-claimSigning` EKU, and the C2PA Trust List restricted to certificates with it (§ 5.3.3).
- Time-stamps and revocation information added in an update manifest through the time-stamp and certificate status assertions, replacing time-stamp manifests.
- Claimed signature creation time (`iat`), multi-part assets, soft binding manifest recovery fields in ingredients.
- `http://c2pa.org/digitalsourcetype/trainedAlgorithmicData` replaces `c2pa.trainedAlgorithmicData`; `http://c2pa.org/digitalsourcetype/empty` added.
- Data boxes replaced by embedded data assertions; not every manifest in a store must be referenced.

### C2PA 2.1

- Defined Well-Formed, Valid and Trusted manifest states and Valid assets (§ 5.3.4).
- `urn:c2pa` URN namespace for manifest labels, replacing `urn:uuid` (Appendix C).
- `c2pa.ingredient.v3` (with `activeManifest`, `claimSignature`, `validationResults`), deprecating `c2pa.ingredient.v2`, and `c2pa.hash.bmff.v3`.
- `sigTst2` (v2 time-stamps over the signature, the CTT model) and the C2PA TSA Trust List; `sigTst` deprecated.
- Ingredient validation mandatory; either `c2pa.created` or `c2pa.opened` mandatory in a standard manifest; multiple actions assertions allowed.

### C2PA 2.0

- Claim v2 (`c2pa.claim.v2`): `created_assertions` and `gathered_assertions` replace `assertions`, `claim_generator` and `dc:format` are gone, and a single `claim_generator_info` must be the signer.
- Only X.509 certificates for signing; the C2PA Trust List introduced as a default trust list.
- Removed: W3C Verifiable Credentials and the VC store, `actors` in actions, the Training and Data Mining and Endorsements assertions, the Exif, IPTC and Schema.org metadata assertions (replaced by `c2pa.metadata`), and `c2pa.hash.bmff`.

### C2PA 1.4 (and 1.0 to 1.3)

- Claim v1 (`c2pa.claim`) with `claim_generator`, `claim_generator_info`, `assertions`, `dc:format` and `instanceID` (1.4 § 11.2).
- Signer EKUs: with no configured list, `id-kp-emailProtection` or `id-kp-documentSigning` (1.4 § 15.4).
- 1.4 added ZIP embedding, compressed `brob` manifests, collection hashing and `c2pa.metadata`; 1.3 added `c2pa.actions.v2`, `c2pa.ingredient.v2`, data boxes, general box hash and `digitalSourceType` (§ 5.3.6, § 5.3.7).

## Upgrading

### C2PA 2.3 to C2PA 2.4

1. Change the version marker: write `specVersion` `"2.4.0"` in `claim_generator_info` and stop writing `specVersion` at claim level (§ 10.2.2).
2. Replace removed or renamed behaviour:
   - Move the actions assertion that carries `c2pa.created` or `c2pa.opened` into `created_assertions` (§ 18.15.2).
   - Add the `ingredients` hashed URI to every `c2pa.opened` action, and drop `digitalSourceType` from `c2pa.opened` (Additional Conformance Requirements v0.2).
   - Set `allActionsIncluded` on every `c2pa.actions.v2` assertion; it must be `true` for open-and-resave (§ 18.15.3).
   - Reference soft binding assertions from `c2pa.watermarked.bound` through `relatedAssertions` (§ 18.15.5).
3. Validate against the target: run the 2.4 validation algorithm (§ 15) and the Verify list in `SKILL.md`; a conformance applicant also produces crJSON validation output.
4. Keep behaviour unchanged: the same hard binding, the same signer and the same actions; an upgrade that validates but records different provenance is a regression.

### C2PA 2.2 to C2PA 2.3

1. Change the version marker: produce manifests per 2.3; 2.3 lets the claim carry `specVersion` (moved again in 2.4).
2. Replace removed or renamed behaviour: write `c2pa.watermarked.bound` or `c2pa.watermarked.unbound` instead of `c2pa.watermarked`; write `c2pa.actions.v2`, never `c2pa.actions` (v1); use the External Reference assertion for non-hashed external data; do not use box hash for TIFF (Appendix C).
3. Validate against the target: soft binding and update manifest validation follow the clarified § 15 text.
4. Keep behaviour unchanged.

### C2PA 2.1 to C2PA 2.2

1. Get a signing certificate with the `c2pa-kp-claimSigning` EKU from a CA on the C2PA Trust List; optionally keep `id-kp-emailProtection` or `id-kp-documentSigning` as well for older validators (§ 14.4.1).
2. Stop writing time-stamp manifests (`c2tm`); add late time-stamps and OCSP responses with an update manifest carrying `c2pa.time-stamp` or `c2pa.certificate-status` (§ 11.2.3, § 18.18, § 18.19).
3. Replace data boxes (`c2pa.databoxes`, `c2pa.data`) with `c2pa.embedded-data` assertions, and `c2pa.trainedAlgorithmicData` with `http://c2pa.org/digitalsourcetype/trainedAlgorithmicData` (Appendix C).
4. Validate against the target and keep behaviour unchanged.

### C2PA 2.0 to C2PA 2.1

1. Label manifests `urn:c2pa:<uuid>` instead of `urn:uuid:` (§ 8.1).
2. Write `c2pa.ingredient.v3` with `activeManifest`, `claimSignature` and `validationResults` instead of `c2pa.ingredient.v2`, which 2.1 deprecates, and validate every ingredient before adding it (§ 15.2.1, § 18.16, Appendix C).
3. Write `c2pa.hash.bmff.v3` instead of `c2pa.hash.bmff.v2` and `sigTst2` instead of `sigTst` (§ 10.3.2.5).
4. Put `c2pa.created` or `c2pa.opened` first in the first actions assertion (§ 18.15.2).

### C2PA 1.4 to C2PA 2.x

1. Replace claim v1 with claim v2: label `c2pa.claim.v2`; split `assertions` into `created_assertions` (signer-attributed) and `gathered_assertions`; drop `claim_generator` and `dc:format`; keep one `claim_generator_info` map that names the signer's software (§ 10.1, § 10.2).
2. Sign only with X.509 certificates in `x5chain` (integer label 33) in the protected header (§ 14.5); remove W3C VC credentials, the VC store, `actors`, endorsements and Training and Data Mining assertions (§ 5.3.5).
3. Move metadata into `c2pa.metadata` (or an entity `*.metadata` assertion) instead of `stds.exif`, `stds.iptc` or `stds.schema-org` (§ 18.17, Appendix C).
4. Then apply the 2.0 to 2.1, 2.1 to 2.2, 2.2 to 2.3 and 2.3 to 2.4 steps above, and validate against the 2.4 Verify list. A 1.x asset is not rewritten: open it as a `parentOf` ingredient and sign a new 2.4 manifest over it, so its 1.x manifest stays in the store as provenance.

## Preview

There is no preview line. The specifications site lists 2.4 as its newest version, `c2pa-org/specifications` has no branch or release for a later version, and the `public-draft` repository was last updated in 2022 (checked 2026-10-05). When a 2.5 or later draft appears on spec.c2pa.org: add it as `<version>-preview` with posture **track**; when it ships, make it current, make 2.4 supported, review whether 2.2 and 2.3 stay supported (watch the Conformance Program's accepted versions), and add an upgrade section.
