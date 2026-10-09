# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are normative sentences from the published text, quoted as written (only line breaks and hyphenation from PDF layout were joined). Apply the ones that match the role. Each is labelled with the nearest section, clause or article in the published document.

## OMS Specification 1.0

Source: https://raw.githubusercontent.com/ossf/model-signing-spec/91bf841e8ccf97a3ed97309387e9298d1ac18ba2/spec/v1.0.md

- **§ 4.1.** `tlogEntries` MUST contain at least one Rekor transparency log entry.
- **§ 5.1.** Implementations MUST set `predicateType` to exactly this URI.
- **§ 5.2.1.** The `resources` array MUST be sorted lexicographically by the `name` field using Unicode code point ordering.
- **§ 5.2.1.** Implementations MUST NOT include directory entries — only regular files.
- **§ 5.2.2.** Verifiers MUST use `serialization.hash_type` to determine which hash algorithm to use when recomputing file digests for verification.
- **§ 6.1.** The model MUST contain at least one regular file after exclusions are applied; an empty model MUST be rejected.
- **§ 6.1.1.** Symbolic links MUST NOT appear as entries in `resources`.
- **§ 6.1.2.** A path MUST NOT start with `/` (absolute path) or contain `../` components (parent traversal).
- **§ 6.1.2.** Verifiers MUST canonicalize paths from the local filesystem before comparing them against the manifest.
- **§ 6.2.** Implementations MUST also exclude the signature output file (e.g., the path passed via `--signature`) from the file enumeration during both signing and verification.
- **§ 6.3.** Implementations MUST support file serialization and SHOULD support shard serialization.
- **§ 6.3.2.** A verifier that does not implement shard serialization MUST reject the bundle with an informative error when encountering a `method` value of `"shards"`.
- **§ 6.5.** Verifiers MUST NOT rely on the specific value of `subject[0].name` for correctness, it is informational only and does not affect verification.
- **§ 8.2.** The leaf certificate MUST be within its validity period.
- **§ 8.5.** By default, files present in the model directory but absent from `resources` (after applying exclusions) MUST cause verification to fail.
- **§ 11.2.** The verifier MAY support `https://model_signing/Digests/v0.1` for backward compatibility but MUST NOT produce bundles with this predicate type.
- **§ 11.2.** Producers MUST always generate bundles conforming to the current version.

## model-transparency v1.1.1

Source: https://raw.githubusercontent.com/sigstore/model-transparency/v1.1.1/README.md

- **Model Signing.** The identity used during signing and the provider must be reused during verification.
- **Model Signing.** Model signers should monitor for occurences of their signing identity in the log.
