# Assertions

Read this when writing or reading assertions: labels, actions and `digitalSourceType` (including AI-generated content), ingredients, hard bindings, soft bindings and watermarks, thumbnails, embedded data, metadata, time-stamp and certificate status assertions, and AI disclosure. Section numbers are from the C2PA 2.4 Technical Specification; the AI/ML notes come from the C2PA Guidance for AI and ML, both listed in [Sources](../SKILL.md#sources).

## Labels and versions

- Standard labels start with `c2pa.`; entity labels start with a reversed domain, such as `com.litware.someAssertion` (§ 6.2.1). Components match `[a-zA-Z][a-zA-Z0-9_-]*`, and `__` is reserved for instances (§ 6.2.2).
- A new schema version increments the label suffix (`c2pa.actions.v2`); no suffix means v1. Fields are never removed, only deprecated; a breaking change takes a new label (§ 6.3).
- Several assertions of one type get `__1`, `__2`, …: `c2pa.metadata`, `c2pa.metadata__1`; versions stay in the label, as in `c2pa.ingredient.v3__2` (§ 6.4).
- Never write deprecated fields (§ 6.3). Generators should check output against the published schemas; validators should not schema-validate input (§ 6.5).
- Dates are CBOR tag 0 (RFC 3339 with a time zone or `Z`) (§ 6.9).

Standard assertions (Table 7, § 18.4): `c2pa.actions.v2`, `c2pa.ai-disclosure`, `c2pa.alternative-content-representation`, `c2pa.asset-ref`, `c2pa.asset-type.v2`, `c2pa.hash.bmff.v3`, `c2pa.certificate-status`, `c2pa.cloud-data`, `c2pa.hash.collection.data`, `c2pa.hash.data`, `c2pa.depthmap.GDepth`, `c2pa.embedded-data`, `c2pa.environmental-sustainability`, `c2pa.external-reference`, `font.info`, `c2pa.hash.boxes`, `c2pa.ingredient.v3`, `c2pa.metadata`, `c2pa.hash.multi-asset`, `c2pa.repository-receipt`, `c2pa.session-keys`, `c2pa.soft-binding`, `c2pa.thumbnail.claim`, `c2pa.thumbnail.ingredient`, `c2pa.time-stamp`.

## Actions (`c2pa.actions.v2`)

- A standard manifest has at least one actions assertion in `created_assertions` (§ 18.15.2). The first action of the first actions assertion is:
  - `c2pa.created` for an asset made new (File → New, a capture, or generative AI output), with a `digitalSourceType`; an asset with no content uses `http://c2pa.org/digitalsourcetype/empty`;
  - `c2pa.opened` for an asset made by opening an existing one as its `parentOf` ingredient, with a hashed URI to that `c2pa.ingredient.v3` in `parameters.ingredients`.
- All actions assertions together hold at most one `c2pa.created` or `c2pa.opened` (§ 18.15.2). Actions order is otherwise unspecified (§ 18.15.1).
- `allActionsIncluded` should be set; `true` claims every action is recorded, and a missing value means unrecorded actions may exist. Opening and re-saving without changes requires `true` (§ 18.15.3).
- Each action's `action` is a pre-defined name (Table 8, for example `c2pa.edited`, `c2pa.cropped`, `c2pa.resized`, `c2pa.transcoded`, `c2pa.repackaged`, `c2pa.placed`, `c2pa.removed`, `c2pa.published`, `c2pa.redacted`, `c2pa.translated`, `c2pa.watermarked.bound`) or an entity name such as `com.fabrikam.gaussianBlur`. Font assets use the `font.` actions (Table 9).
- Do not write the deprecated `c2pa.copied`, `c2pa.formatted`, `c2pa.version_updated`, `c2pa.printed`, `c2pa.managed`, `c2pa.produced`, `c2pa.saved`, `c2pa.color_adjustments` or `c2pa.watermarked` (§ 18.15.1, § 18.15.11).
- Fields (§ 18.15.4): `description`; `reason` (for `c2pa.redacted` it is required: `c2pa.PII.present`, `c2pa.invalid.data`, `c2pa.trade-secret.present`, `c2pa.government.confidential` or an entity value); `when` (untrusted time); `softwareAgent` (a generator-info-map) or `softwareAgentIndex` into `softwareAgents`, never both; `digitalSourceType`; `changes` (region-maps); `parameters`.
- Parameters (§ 18.15.4.7, § 18.15.4.8): `c2pa.opened` and `c2pa.placed` carry `ingredients` hashed URIs; `c2pa.removed` points to a `componentOf` ingredient in another manifest; `c2pa.redacted` carries `redacted` with the redacted assertion's URI; `c2pa.translated` carries BCP 47 `sourceLanguage` and `targetLanguage`; `relatedAssertions` lists hashed URIs to assertions in the same manifest, never to actions or ingredient assertions.
- Watermarks (§ 18.15.5): `c2pa.watermarked.bound` requires a `c2pa.soft-binding` assertion in the manifest and should reference it through `relatedAssertions`; `c2pa.watermarked.unbound` marks a watermark that creates no soft binding.
- Templates merge into actions of the same name (`*` applies to all); the action's own values win (§ 18.15.6). Template icons are only for entity actions.
- Only `c2pa.published`, `c2pa.transcoded` and `c2pa.repackaged`, with one `parentOf` ingredient, signal a rendition with no editorial change (§ 18.15.9).

### `digitalSourceType` and AI-generated content

- Values are IPTC Digital Source Type terms (`http://cv.iptc.org/newscodes/digitalsourcetype/…`) or the C2PA values `http://c2pa.org/digitalsourcetype/empty` and `http://c2pa.org/digitalsourcetype/trainedAlgorithmicData` (non-media output such as CSV) (§ 18.15.4.5). The short form `c2pa.trainedAlgorithmicData` is deprecated (Appendix C).
- Generative AI output: `c2pa.created` with `http://cv.iptc.org/newscodes/digitalsourcetype/trainedAlgorithmicMedia`; inputs such as prompts and models can be `inputTo` ingredients referenced from the action (§ 18.15.2, § 18.15.4.5, Example 8). AI edits to existing content are shown in § 18.28.3 as `compositeWithTrainedAlgorithmicMedia`.
- Conformance Program v0.2 (for 2.2 and 2.4 applicants) requires `digitalSourceType` on every pre-defined action in `created_assertions` except `c2pa.converted`, `c2pa.edited.metadata`, `c2pa.enhanced`, `c2pa.opened`, `c2pa.placed`, `c2pa.published`, `c2pa.redacted`, `c2pa.repackaged`, `c2pa.resized.proportional`, `c2pa.transcoded` and the three watermark actions, and forbids it on `c2pa.opened` for 2.4 (Additional Conformance Requirements v0.2).
- The C2PA Guidance for AI and ML recommends Content Credentials on datasets, software and models against poisoning, models as ingredients of their output, collection data hashes or asset references for multi-file models and data sets, and base model plus fine-tuning dataset as ingredients of a fine-tuned model or LoRA adapter (AI/ML Guidance §§ 2 to 11). It still writes `c2pa.trainedAlgorithmicData`; use the URI form from the specification.

### AI Disclosure (`c2pa.ai-disclosure`, new in 2.4)

`modelType` is required; optional `modelName`, `modelIdentifier` (URI or PURL), `contentProfile.humanOversightLevel` (`fully_autonomous`, `prompt_guided`, `human_validated`) and `scientificDomain` (arXiv taxonomy, such as `cs.AI`) (§ 18.28.2, § 18.28.4). It complements `digitalSourceType`; it is not attached when no trained model was used (§ 18.28.3).

## Ingredients (`c2pa.ingredient.v3`)

- `relationship` is required: `parentOf` (this asset derives from it; also used by update manifests), `componentOf` (a part of a composition) or `inputTo` (input to a computation such as an AI model) (§ 18.16.3).
- Adding an ingredient to a standard manifest adds an action: `c2pa.opened` for `parentOf`, `c2pa.placed` for `componentOf` (§ 18.16.3). At most one `parentOf` per standard manifest (§ 15.10.1.2).
- An ingredient with its own manifest uses `activeManifest` and `claimSignature` hashed URIs and `validationResults` from the generator's validation of it; `instanceID` is optional (§ 18.16.2, § 18.16.6, § 15.2.1). Without a manifest, use XMP `xmpMM:DocumentID` or `xmpMM:InstanceID` when present (§ 8.3), and since 2.4 a `digitalSourceType`, which must not be combined with `activeManifest` (§ 15.11.3.2).
- `dc:format` should be present and valid; multi-file ingredients use `multipart/mixed` (§ 18.16.5). Prefer the ingredient manifest's own title over `dc:title` (§ 18.16.4).
- `data` points to an embedded data assertion (hashed URI) or external data (hashed ext URI); `dataTypes` describe it, for example `c2pa.types.generator.prompt` or `c2pa.types.model.tensorflow`; `informationalURI` is an unauthenticated link for humans (§ 18.16.8, § 18.16.9).
- A thumbnail of the ingredient is a thumbnail assertion referenced by hashed URI (§ 18.16.10). A partial use is described by `regionOfInterest` in the assertion's `metadata` (§ 18.16.13).
- A manifest found by soft binding lookup sets `softBindingsMatched: true` and `softBindingAlgorithmsMatched` with names from the soft binding algorithm list; validation failures of its hard binding are expected (§ 18.15.10, § 18.16.14).

## Hard bindings

Exactly one per standard manifest; none in update manifests (§ 9.1, § 11.2). None of them may sit in a cloud data assertion or an external reference assertion (§ 18.5.1, § 18.6.1, § 18.7.1, § 18.8.1).

| Assertion                   | Use                                                           | Key rules                                                                                                                                                                 |
| --------------------------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `c2pa.hash.data`            | Byte ranges, any format; unstructured text                    | `hash`, `pad` (zeros), optional `pad2`, `exclusions` sorted and non-overlapping, inside one logical unit, holding only the store or metadata; no `url` (§ 18.5).          |
| `c2pa.hash.boxes`           | Non-BMFF box formats such as JPEG, PNG, GIF (should, § 9.2.2) | Every box listed in file order; the store box named `C2PA` with hash `00`; `excluded` and per-box `exclusions` with `boxIndex`; `c2pa.after` for trailing parts (§ 18.7). |
| `c2pa.hash.bmff.v3`         | ISO BMFF (MP4, fMP4)                                          | Box exclusion list (required), optional Merkle trees with fixed or variable block sizes, balanced trees (§ 18.6, § A.5).                                                  |
| `c2pa.hash.collection.data` | A collection of files, ZIP formats, AI training sets          | `uris` of relative URIs with `hash`, required `alg`; ZIP adds `zip_central_directory_hash` (§ 18.8, § 15.12.5.2).                                                         |

- Use box hashing in preference to a data hash wherever the format supports it (§ 9.2.1). `c2pa.hash.multi-asset` binds the parts of a multi-part asset, such as a motion photo (§ 18.9).
- Include asset metadata such as EXIF or XMP in the hard binding where possible. Only `created_assertions` are attributed to the signer: to assert a value like GPS, copy it into `c2pa.metadata` (§ 9.2.6).

## Soft bindings (`c2pa.soft-binding`)

- A fingerprint or invisible watermark computed from content, for matching renditions or recovering a stripped manifest. Never a hard binding (§ 9.3.1).
- `alg` (or the claim's `alg_soft`) should name an entry in the C2PA soft binding algorithm list; `blocks` hold `scope` (`timespan` in ms or `region`) and `value`; `alg-params` and `bindingMetadata` are optional; the old `extent` and `url` fields are not written (§ 18.10).

## Thumbnails, embedded and external data

- `c2pa.thumbnail.claim` (at most one per manifest) and `c2pa.thumbnail.ingredient` (with `__n` instances) are embedded data assertions; media types are no longer in the label (§ 18.13).
- `c2pa.embedded-data` uses a JUMBF Embedded File content box with an IANA media type and no External toggle (§ 18.12).
- `c2pa.cloud-data` points to a remotely stored JUMBF assertion (`label`, `size`, `location`); `c2pa.external-reference` points to remote data, hashed or not. Neither may carry hard bindings, actions or ingredients; external data is fetched only after the claim validates (§ 6.7, § 15.10.3.2.1, § 15.10.3.2.2, § 15.10.4).

## Metadata

- Metadata assertion labels end in `.metadata` (`c2pa.metadata` or an entity label); content is one JSON-LD box with `@context`, preferably built from the XMP data model (§ 18.17.2).
- `c2pa.metadata` holds only the fields listed in Appendix B; entity metadata assertions may hold anything (§ 18.17.3). `stds.exif`, `stds.iptc` and `stds.schema-org` are deprecated (Appendix C).
- To remove part of a metadata assertion, redact it and add a reduced copy in an update manifest; the copy is attributed to the update's signer (§ 18.17.4).

## Time-stamp and certificate status assertions

- `c2pa.time-stamp`: at most one per manifest; a map from manifest labels (`urn:c2pa:…`) to RFC 3161 `TimeStampToken` bytes over the target manifest's signature (the v2 payload) (§ 18.18).
- `c2pa.certificate-status`: at most one per manifest; `ocspVals` with at least one OCSP response, in the same format as the `rVals` header (§ 18.19).
- Both are how an update manifest adds a time-stamp or revocation data after the fact (§ 11.2.3).
