# Verification

Read this when consuming attestations or verifying a final product against a layout. Sources: the Attestation Framework v1.2.0 `docs/validation.md`, `spec/v1/README.md`, `envelope.md`, `bundle.md` and `digest_set.md`; DSSE v1.0.2 `protocol.md`; the in-toto specification v1.0 § 5.2 and § 4; ITE-2 and ITE-5 as named by the specification, listed in [Sources](../SKILL.md#sources).

## Verifying one attestation

The validation model (`docs/validation.md`) verifies one artifact against one attestation and hands the result to a policy engine.

Inputs: the artifact bytes, the attestation as a JSON Envelope, the recognized attesters as `(name, publicKey)` pairs, and the acceptable digest algorithms (usually just `sha256`).

1. **Envelope.** Decode the Envelope; reject on failure. For each signature and each recognized attester (optionally skipping keys whose `keyid` does not match), verify `sig` over `PAE(UTF8(payloadType), payload)` (DSSE `protocol.md`) and collect the attester names that verify. Reject if none do.
2. **Payload type.** Reject unless `payloadType` is `application/vnd.in-toto+json` or matches `application/vnd.in-toto.<predicate>+json`. (The v1.2.0 pseudocode joins the two tests with OR, which as written rejects every value; implement the intent stated in `envelope.md`, Fields: accept either form.)
3. **Statement.** Decode the verified payload bytes as a Statement; reject on failure. Reject if `_type` is not `https://in-toto.io/Statement/v1`.
4. **Subjects.** Keep the subjects with at least one `(alg, value)` where `alg` is acceptable and the artifact's hash equals the decoded value. Reject if none match.
5. **Output** to the policy engine: `predicateType`, `predicate`, the matched subjects and the attester names.

Rules around the model:

- Verify before parsing, and pass on the same bytes that were verified; never re-parse the envelope to extract the payload (DSSE `protocol.md`).
- `keyid` only narrows the keys to try (DSSE `protocol.md`, Signature Definition).
- Accept standard and URL-safe base64 (DSSE `protocol.md`).
- For a threshold of `t` signers, count unique trusted keys that verify, and reject below `t` (DSSE `protocol.md`, Multi-signature Verification).
- Decide the predicate from `predicateType`, never from the media type or the bundle file name (`envelope.md`, Fields and Storage convention).
- Ignore digest algorithms you do not accept, and do not accept weak ones such as `md5` (`digest_set.md`, Guidelines).
- Ignore unrecognized fields, and write monotonic policies (`spec/v1/README.md`, Parsing rules).

## Bundles

- Parse and verify each line separately; there is no bundle-level signature (`bundle.md`, Storage convention).
- Ignore unrecognized lines and attestations with unknown keys, types, subjects or predicates; do not depend on line order (`bundle.md`, Data structure).
- Because deletion, replay and injection of lines are possible (`bundle.md`), the policy should require the attestations it needs from the attesters it trusts, so a deleted attestation leads to DENY.

## Policy design

- Name the trusted attester for each predicate type. An attestation's authority comes from who signed it, which the model outputs as attester names (`docs/validation.md`).
- Require positive evidence: "deny unless a 'no vulnerabilities' attestation exists" (`spec/v1/README.md`, Monotonic principle).
- Do not let an extension field change the meaning of another field (`spec/v1/README.md`, Extension fields).
- Treat unknown `predicateType` values as absent, as in the Bundle example where a policy engine ignores the SPDX attestation it does not understand (`bundle.md`, Deployment).

## Verifying a final product against a layout

The in-toto specification v1.0 verification workflow (§ 5.2). Before it, the client may separately check it received the right layout and keys, for example with the TUF-based procedure of ITE-2 (§ 5.2, § 1.6).

1. Find `root.layout` and verify its signatures with the project owner's previously acquired public keys.
2. Check `expires`; if the current time is after it, fail.
3. Load the functionaries' public keys from the layout.
4. For each step, load its link or layout metadata:
   - a link: record its materials and products;
   - a layout (a sublayout): recurse from step 1, with its links in the subdirectory named after the step.
5. Apply each step's artifact rules to its materials and products (§ 4.3.3.1).
6. Run the inspections and record their materials and products.
7. Apply each inspection's artifact rules (§ 4.3.3.1).

Details the steps rely on:

- Only links signed by keys in the step's `pubkeys` count, and the step needs `threshold` of them (§ 4.3.1).
- Links are found by step name and functionary KEYID prefix (§ 4.4).
- An `expected_command` mismatch is a warning, not a failure (§ 4.3.1).
- An inspection that exits non-zero halts validation (§ 4.3.2.1).
- Inspections execute commands on the verifying machine. The layout does not protect the integrity of those scripts, which ITE-11 lists as a motivation for declarative attribute rules (ITE-11, Security).

## Checklist

- [ ] Signatures are checked over PAE, with keys from a trusted source, not from the attestation.
- [ ] The Statement `_type` is `https://in-toto.io/Statement/v1` (or the legacy `https://in-toto.io/Statement/v0.1` only on a read-and-upgrade path).
- [ ] At least one subject digest matches the artifact with an accepted algorithm.
- [ ] The predicate was chosen by `predicateType`.
- [ ] For layouts: signature, expiry, threshold, artifact rules with `DISALLOW *`, and inspections all pass.
