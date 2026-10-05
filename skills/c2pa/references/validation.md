# Validation

Read this when building or checking a validator: the Well-Formed, Valid and Trusted states, locating the active manifest, the validation phases and their status codes, ingredient recursion, content binding checks, and what may be shown to users. Section numbers are from the C2PA 2.4 Technical Specification listed in [Sources](../SKILL.md#sources).

## States (§ 14.3)

| State           | Holds when                                                                                                                                                                                                                   |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Well-Formed** | The manifest meets the normative requirements checked by validation, has only the assertions allowed for its type (§ 15.10.1), and its assertions and ingredients meet their requirements (§ 15.10.3, § 15.11).              |
| **Valid**       | Well-Formed; unmodified since signing; `claimSignature.validated`; `claimSignature.insideValidity`; not `signingCredential.ocsp.revoked`. The claim can then be attributed to the generator named in `claim_generator_info`. |
| **Trusted**     | Valid, and `signingCredential.trusted`.                                                                                                                                                                                      |
| Valid asset     | The active manifest is Valid or Trusted, and the content covered by its bindings is unchanged (§ 15.12).                                                                                                                     |

Every Trusted manifest is Valid and every Valid manifest is Well-Formed. An untrusted signer gives a manifest that is Valid but not Trusted.

## Results (§ 15.2)

- Return one consolidated result set for the active manifest and every manifest referenced through ingredients, using the standard success, informational and failure codes. Custom codes use an entity namespace such as `com.litware.…`.
- Results may carry a SemVer `specVersion` of the validation logic and a `trustListURI` naming the trust list used.
- A claim generator adding an ingredient acts as a validator and writes these results to the ingredient's `validationResults`.

## Steps

The phases may run in any order (§ 15.1.2); the results must match this algorithm.

### 1. Locate the active manifest (§ 15.5)

- Look for an embedded store at the format's standard location first. If there is none, try in order: an HTTP `Link` header with `rel=c2pa-manifest`, `dcterms:provenance` in the asset's XMP, a font's C2PA table URI, then the same path or URI with a `.c2pa` extension; stop at the first store found. A documented remote store that cannot be reached gives `manifest.inaccessible`.
- An embedded store wins over a `Link` header. Several embedded stores are all invalid; treat the asset as having no manifest, and do not carry those manifests into an ingredient.
- The last manifest in the store is active. Decompress `c2cm` manifests first (§ 15.5.4).

### 2. Claim (§ 15.6)

- The claim is the `c2pa.claim.v2` (or older `c2pa.claim`) box of type `c2cl`. More than one gives `claim.multiple`; none gives `claim.missing`.
- Not well-formed CBOR gives `claim.cbor.invalid`. Missing `instanceID`, `signature`, `created_assertions` or `claim_generator_info`, or `claim_generator_info` without `name`, gives `claim.malformed`.

### 3. Hash algorithm (§ 15.4)

- Take the algorithm from the binding assertion, the hashed URI, or the claim's `alg`. Not on the allowed or deprecated list: `algorithm.unsupported` and the claim is rejected. On the deprecated list: `algorithm.deprecated` (informational).

### 4. Signature and credential (§ 15.7)

1. Resolve `signature` to a box in the same manifest, otherwise `claimSignature.missing`.
2. Check the credential against the certificate profile (§ 14.5), otherwise `signingCredential.invalid`. An algorithm off the lists gives `algorithm.unsupported`.
3. Process the time-stamp first (step 5), then build a chain to a trust anchor configuration for one of the certificate's EKUs, honouring `notBefore` and `notAfter` against the time-stamp or current time. No chain: `signingCredential.untrusted`; otherwise `signingCredential.trusted`.
4. Verify the COSE signature: `claimSignature.mismatch` or `claimSignature.validated`.

### 5. Time-stamp (§ 15.8)

- Use `sigTst2` (v2) or `sigTst` (v1), or a `c2pa.time-stamp` assertion in a later manifest naming this manifest; try each candidate until one passes.
- Problems with the time-stamp are informational only and the time-stamp is then ignored: `timeStamp.untrusted`, `timeStamp.mismatch`, `timeStamp.malformed`, `timeStamp.outsideValidity`, optionally `timeStamp.credentialInvalid`. The TSA chain is built against the TSA trust anchors.
- A good one gives `timeStamp.trusted` and `timeStamp.validated`, and its `genTime` must fall inside the validity of the signer certificate and its CA chain, otherwise `claimSignature.outsideValidity` (a failure). The attested time, not the current time, then governs certificate validity.
- With no usable time-stamp, the current time must be inside that validity: `claimSignature.insideValidity` or `claimSignature.outsideValidity`.
- An `iat` header may be checked and reported only as `timeOfSigning.insideValidity` or `timeOfSigning.outsideValidity` (§ 15.8.3).

### 6. Revocation (§ 15.9)

- A certificate without revocation support is treated as not revoked. A revoked CA certificate gives `signingCredential.untrusted`.
- Use OCSP responses stapled in `rVals` or carried in later `c2pa.certificate-status` assertions. A response proves "not revoked at signing" only with a valid time-stamp, an authorized responder, `certStatus` `good`, and the attested time within the `thisUpdate`/`nextUpdate` window (or `producedAt` + 24 hours). That yields `signingCredential.ocsp.notRevoked`; the same conditions with `revoked` yield `signingCredential.ocsp.revoked`.
- With no usable stapled response, an online validator should query the responder (§ 15.9.2). Inability to check is informational (`signingCredential.ocsp.inaccessible`, `.skipped`, `.unknown`).

### 7. Assertions (§ 15.10)

- Allowed set (§ 15.10.1):
  - A standard manifest needs exactly one hard binding (`claim.hardBindings.missing`, `assertion.multipleHardBindings`), at most one `parentOf` ingredient (`manifest.multipleParents`), and exactly one actions assertion holding `c2pa.created` or `c2pa.opened`.
  - An update manifest needs exactly one `parentOf` ingredient (`manifest.update.wrongParents`) and no hard binding, thumbnail, multi-asset hash or disallowed action (`manifest.update.invalid`).
- For each entry in `created_assertions` and `gathered_assertions` (§ 15.10.3.1):
  - A redacted actions assertion gives `assertion.action.redacted`; other redacted assertions count as valid.
  - Otherwise the URI must be in this manifest (`assertion.outsideManifest`), resolvable (`assertion.missing`) and hash-equal (`assertion.hashedURI.mismatch` or `.match`).
  - Bad content gives `assertion.cbor.invalid` or `assertion.json.invalid`.
- An assertion in the store that the claim does not list gives `assertion.undeclared`. A claim redacting its own assertion gives `assertion.selfRedacted`. Assertion `metadata` contents are never validated.
- Type-specific checks cover cloud data, external references, actions (for example `assertion.action.ingredientMismatch`, `assertion.action.malformed`, `assertion.action.softBindingMissing`), ingredients, and more (§ 15.10.3.2).
- External data is fetched only after the claim validates, never from a rejected claim, and failing to fetch it never rejects the claim (§ 15.10.4).

### 8. Ingredients (§ 15.11)

- An ingredient must have `relationship` `parentOf`, `componentOf` or `inputTo`, and must not have both `activeManifest` and `digitalSourceType` (`assertion.ingredient.malformed`).
- Recursively collect every ingredient manifest and every redacted assertion in the lineage. An ingredient without `activeManifest` gets `ingredient.unknownProvenance`, except `inputTo`.
- An ingredient manifest touched by redaction uses the **claim signature hash method**: match the `claimSignature` hash (`ingredient.claimSignature.missing`, `.mismatch` or `.validated`), validate its signature, time-stamp and revocation, check redacted boxes hold only zeros (`assertion.notRedacted`), and validate the other assertions except hard bindings. Others may instead use the faster **manifest hash method** (§ 15.11.3.3.2).
- Merge the computed results with the ingredient's recorded `validationResults`, reporting differences both ways.

### 9. Content (§ 15.12)

- **Data hash:** exclusions sorted, non-overlapping and non-negative, otherwise `assertion.dataHash.malformed`. When update manifests grew the store, shift later exclusions by the size difference. Hash everything outside the exclusions to get `assertion.dataHash.match` or `.mismatch`.
- **BMFF hash:** apply the box exclusions, then the hash or Merkle tree for the rendered parts, giving `assertion.bmffHash.match`, `.mismatch` or `.malformed`.
- **Box hash:** every box in order, with special handling for JPEG, JPEG XL and fonts, giving `assertion.boxesHash.match`, `.mismatch`, `.malformed` or `.unknownBox`.
- **Collection data hash:** for ZIP, also the central directory hash, giving `assertion.collectionHash.match` and the related failure codes.
- **Multi-asset hash:** gives `assertion.multiAssetHash.match` and the related failure codes.

## Displaying results (§ 15.3)

- Do not show data from manifests or assets that are not Valid. If you do, show a warning that it is not valid and that the data must not be attributed to the signer (for ingredient manifests, nor to the active manifest's signer).
- Authoring tools should warn more prominently, so a creator can decide whether to use an asset with a flawed history.
