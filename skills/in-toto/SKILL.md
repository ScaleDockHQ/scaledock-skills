---
name: in-toto
description: >-
  in-toto Attestation Framework v1.2 and in-toto specification v1.0: produce
  and verify signed software supply chain attestations, layouts and links.
  Builds Statements (_type https://in-toto.io/Statement/v1, subject
  ResourceDescriptors with DigestSets, predicateType, predicate), signs them in
  DSSE envelopes (payloadType application/vnd.in-toto+json, PAE), groups them
  in .intoto.jsonl Bundles, picks predicates (SLSA Provenance, VSA, SPDX,
  CycloneDX, test result, link, SVR, vulns), and writes and verifies supply
  chain layouts with steps, inspections, artifact rules (MATCH, CREATE,
  DISALLOW), thresholds, sublayouts and link metadata. Use when generating,
  signing, storing or verifying in-toto attestations, writing a policy over
  them, or securing a build pipeline with layouts. Upgrades from Statement v0.1
  and in-toto 0.9; tracks the draft ITE-10 and ITE-11 layout extensions.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.0"
  kind: standard
---

# in-toto

in-toto, a CNCF graduated project, publishes two specifications: the in-toto Attestation Framework, which defines signed Statements about software artifacts, and the in-toto specification, which defines supply chain layouts and the link metadata functionaries sign for each step. With this skill the agent produces and verifies attestations, chooses predicates, and writes and verifies layouts.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources), with the file and heading or section it cites. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: producer (a builder, scanner or functionary that emits attestations or links), consumer (a verifier or policy engine), or project owner (writes a layout).
- Scope: attestations only, or a layout with steps and inspections. Layouts need the in-toto specification as well.
- Predicate: which claim is made (provenance, SBOM, test result, vulnerability scan, verification result, a layout step), and who signs it with which keys.
- Target version: in-toto Attestation Framework v1.2 (current, family `attestation`) for attestations, and in-toto specification v1.0 (current) for layouts and links. in-toto Attestation Framework v0.1 and in-toto specification v0.9 are legacy: read and upgrade from them, never author them. ITE-10 layouts for attestations and ITE-11 attribute rules are previews (posture: track): never emit them. See [`references/versions.md`](references/versions.md).
- Revision: the pinned revisions in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill or when a rule looks out of date, check the `in-toto/attestation` releases and `spec/v1/CHANGELOG.md`, the `in-toto/specification` tags, the ITE index for status changes, and DSSE releases; re-read every URL in [Sources](#sources) and update the pins.

## Invariants

1. **Statement type.** `_type` is `https://in-toto.io/Statement/v1`, and `subject` and `predicateType` are required (`statement.md`, Fields).
2. **Subjects carry digests.** Every subject MUST have `digest`; subjects are matched by digest, not by name or content type (`statement.md`, Fields). Every ResourceDescriptor sets at least one of `uri`, `digest` or `content` (`resource_descriptor.md`, Fields).
3. **Secure digests only.** Use at least `sha256` (or `gitCommit` for git). Consumers MUST accept only algorithms they consider secure and ignore the rest; two DigestSets match if any acceptable entry matches (`digest_set.md`, Guidelines).
4. **TypeURIs carry the major version only** and are case normalized. A minor version adds fields whose absence has no meaning; 0.X versions are major (`field_types.md`, TypeURI; `versioning.md`; `spec/v1/README.md`, Parsing rules).
5. **DSSE payload type.** `payloadType` is `application/vnd.in-toto+json` or `application/vnd.in-toto.<predicate>+json`, it is signed with the payload, and `payload` is the base64 Statement. Consumers decide the predicate from `predicateType`, never from the media type (`envelope.md`, Fields).
6. **Verify the bytes you use.** Signatures cover `PAE(UTF8(payloadType), payload)`. Use exactly the verified payload bytes and never re-parse the envelope afterwards; `keyid` is an unauthenticated hint that MUST NOT drive security decisions (DSSE `protocol.md`).
7. **Ignore what you do not understand, and stay monotonic.** Consumers ignore unrecognized fields, bundle lines and attestations; an extension field MUST NOT change another field's meaning; policies SHOULD require positive evidence so that ignoring an attestation never turns DENY into ALLOW (`spec/v1/README.md`, Parsing rules; `bundle.md`).
8. **Bundles are not authenticated as a whole.** Verify each line, and do not depend on line order (`bundle.md`).
9. **Layouts expire and are signed by the project owner.** Clients MUST NOT trust an expired layout, and check its signatures with previously acquired owner keys (in-toto spec § 4.3, § 5.2).
10. **Step and inspection names are unique,** and a link's `name` equals its step's name (§ 4.3.1, § 4.3.2, § 4.4).
11. **End every artifact rule list with `DISALLOW *`.** Each list ends in an implicit `ALLOW *`, so unexpected artifacts otherwise pass (§ 4.3.3.1).
12. **Thresholds count authorized links.** A step needs `threshold` links signed by keys in its `pubkeys`; `expected_command` mismatches only warn (§ 4.3.1).

## Workflow

1. **Pick the version.** Attestations use Attestation Framework v1.2; layouts and links use the in-toto specification v1.0. Plan an upgrade for v0.1 Statements or v0.9 layouts.
   -> [`references/versions.md`](references/versions.md)
   ✓ Each artifact you will emit names a current line, and nothing comes from ITE-10 or ITE-11.
2. **Choose the predicate.** Pick a vetted predicate whose purpose fits, and use its Type URI exactly. Design a new one only if none fits, following the predicate conventions.
   -> [`references/predicates.md`](references/predicates.md)
   ✓ The `predicateType` is a versioned TypeURI, and the predicate's required fields are known.
3. **Build the Statement.** List every artifact the claim covers as a subject with a `sha256` (or other secure) digest and a stable `name` where it matters; fill the predicate.
   -> [`references/statement-and-envelope.md`](references/statement-and-envelope.md)
   ✓ `_type` is the v1 URI, every subject has a digest, and extension fields do not alter other fields.
4. **Sign it.** Serialize the Statement, compute PAE with the `payloadType`, sign with each signer's key, and emit the DSSE JSON envelope with base64 `payload` and a `keyid` per signature.
   -> [`references/statement-and-envelope.md`](references/statement-and-envelope.md)
   ✓ The envelope verifies with each signer's public key, and `payloadType` is one of the two in-toto values.
5. **Store and distribute.** Name single envelopes `<step-name>.json` (or `<name>.<keyid[0:8]>.json`), group attestations for a file in `<filename>.intoto.jsonl`, and use `application/vnd.in-toto.<predicate>+dsse` or `application/vnd.in-toto.bundle` in storage systems.
   -> [`references/statement-and-envelope.md`](references/statement-and-envelope.md)
   ✓ Each bundle line is one envelope, and nothing depends on line order.
6. **Verify attestations.** Run the validation model: verify signatures against recognized attesters, check `payloadType` and `_type`, match subject digests to the artifact, then pass `predicateType`, `predicate`, matched subjects and attester names to a monotonic policy.
   -> [`references/verification.md`](references/verification.md)
   ✓ An unsigned, wrongly signed, wrong-digest or unknown-type attestation leads to DENY, and so does a missing required one.
7. **Write the layout** (only with layouts). Declare keys, `expires`, steps with `pubkeys`, `threshold` and artifact rules chaining materials to earlier products with MATCH, and inspections; sign it with the project owner key in DSSE.
   -> [`references/layouts-and-links.md`](references/layouts-and-links.md)
   ✓ Names are unique, every rule list ends with `DISALLOW *`, and `expires` is set.
8. **Record links** (only with layouts). For each step, the functionary records materials, products, byproducts and environment, signs, and saves `<name>.<KEYID-PREFIX>.link`, or emits a Statement with the Link predicate.
   -> [`references/layouts-and-links.md`](references/layouts-and-links.md)
   ✓ Each link's `name` matches its step and is signed by a key the step authorizes.
9. **Verify the final product** (only with layouts). Check the layout signature and expiry, load links per step (recursing into sublayouts), apply artifact rules, run inspections and apply their rules.
   -> [`references/verification.md`](references/verification.md)
   ✓ Tampering with a product between steps, a missing link, or too few signers makes verification fail.
10. **Upgrade** (only when asked). Follow the upgrade section for each step from the source line to the target.
    -> [`references/versions.md`](references/versions.md)
    ✓ The upgraded Statements or layouts verify under the target line and authorize the same artifacts and signers.

## Verify before done

- [ ] Every Statement has `_type` `https://in-toto.io/Statement/v1`, a `predicateType` TypeURI, and subjects that each carry a secure digest.
- [ ] Every envelope is DSSE (or another ITE-5 compliant format) with an in-toto `payloadType`, and verifies over PAE.
- [ ] Verifiers use the verified bytes, take keys from a trusted source rather than the `keyid`, and accept both base64 alphabets.
- [ ] Policies are monotonic and choose the predicate by `predicateType`.
- [ ] Bundles use `.intoto.jsonl`, and each line is verified on its own.
- [ ] Layouts have `expires`, unique names, a signature by the project owner, and `DISALLOW *` at the end of every rule list.
- [ ] Links are named `<name>.<KEYID-PREFIX>.link` and signed by a key in the step's `pubkeys`, at least `threshold` times.
- [ ] Nothing from ITE-10 or ITE-11 is emitted.

## Reference index

- **`references/versions.md`**: the two families and their lines, which to use, what changed in Attestation v1.2, v1.1 and v1 and in-toto 1.0, upgrade steps, and the ITE-10 and ITE-11 previews. Load for steps 1 and 10.
- **`references/statement-and-envelope.md`**: the Statement, ResourceDescriptor, DigestSet, field types, parsing rules, DSSE envelope, naming, media types and Bundle. Load for steps 3 to 5.
- **`references/predicates.md`**: the vetted predicate catalog with Type URIs, the Link, Test Result, SVR, Reference and Release predicates, and conventions for new predicates. Load for step 2.
- **`references/layouts-and-links.md`**: keys, layout, steps, inspections, artifact rules and their processing, link metadata and sublayouts. Load for steps 7 and 8.
- **`references/verification.md`**: the attestation validation model, DSSE verification, bundles, policy design, and the layout verification workflow. Load for steps 6 and 9.

## Related skills

- `slsa` for SLSA Provenance fields, VSAs and build levels: `npx skills add ScaleDockHQ/scaledock-skills --skill slsa`.
- `spdx` for SPDX documents used as predicates: `npx skills add ScaleDockHQ/scaledock-skills --skill spdx`.
- `cyclonedx` for CycloneDX BOMs used as predicates: `npx skills add ScaleDockHQ/scaledock-skills --skill cyclonedx`.
- `scitt` for registering signed statements in a transparency service: `npx skills add ScaleDockHQ/scaledock-skills --skill scitt`.

## Sources

Status uses the publishing body's own maturity term. Checked is the date the source was last read.

- [in-toto Attestation Framework specification v1.2.0](https://github.com/in-toto/attestation/tree/v1.2.0/spec): tagged release, v1.2.0 (2026-03-18), spec version v1.2, checked 2026-10-05.
- [in-toto Attestation Framework releases](https://github.com/in-toto/attestation/releases): release list, latest v1.2.0 (v1.1.2, v1.1.1, v1.1.0, v1.0.2, v1.0.1, v1.0 before it), checked 2026-10-05.
- [in-toto Attestation v1 changelog](https://github.com/in-toto/attestation/blob/v1.2.0/spec/v1/CHANGELOG.md): changelog, v1.2, checked 2026-10-05.
- [in-toto Attestation v1.1.2 Envelope](https://github.com/in-toto/attestation/blob/v1.1.2/spec/v1/envelope.md): tagged release, v1.1.2 (2025-06-14), checked 2026-10-05.
- [in-toto Attestation predicates](https://github.com/in-toto/attestation/tree/v1.2.0/spec/predicates): vetted predicate catalog, v1.2.0, checked 2026-10-05.
- [in-toto Attestation validation model](https://github.com/in-toto/attestation/blob/v1.2.0/docs/validation.md): documentation, v1.2.0, checked 2026-10-05.
- [in-toto Attestation new predicate guidelines](https://github.com/in-toto/attestation/blob/v1.2.0/docs/new_predicate_guidelines.md): documentation, v1.2.0, checked 2026-10-05.
- [in-toto Attestation v0.1.0](https://github.com/in-toto/attestation/tree/v1.2.0/spec/v0.1.0): legacy specification, v0.1.0 (kept in the v1.2.0 tree), checked 2026-10-05.
- [in-toto specification v1.0](https://github.com/in-toto/specification/blob/v1.0/in-toto-spec.md): stable, version 1.0.0 (2023-06-02), tag `v1.0`, checked 2026-10-05.
- [in-toto specification, master](https://github.com/in-toto/specification/blob/master/in-toto-spec.md): living document, still Version 1.0.0, last commit 2026-07-24, checked 2026-10-05.
- [in-toto specification v0.9](https://github.com/in-toto/specification/blob/v0.9/in-toto-spec.md): legacy, version 0.9 (2017-04-11), tag `v0.9`, checked 2026-10-05.
- [in-toto Enhancements (ITE) index](https://github.com/in-toto/ITE): index, `master` (last commit 2025-02-17), checked 2026-10-05.
- [ITE-5: Disassociate signature envelope specification from in-toto](https://github.com/in-toto/ITE/blob/master/ITE/5/README.adoc): Accepted, created 2020-09-28, checked 2026-10-05.
- [ITE-6: Enabling contextual in-toto attestations](https://github.com/in-toto/ITE/blob/master/ITE/6/README.adoc): Accepted, created 2020-10-30, checked 2026-10-05.
- [ITE-10: Supporting Contextual in-toto Attestations in Layouts](https://github.com/in-toto/ITE/blob/master/ITE/10/README.adoc): Draft, created 2023-01-07, checked 2026-10-05.
- [ITE-11: Verifying Attributes in in-toto Attestations](https://github.com/in-toto/ITE/blob/master/ITE/11/README.adoc): Draft, created 2023-01-07, checked 2026-10-05.
- [DSSE protocol v1.0.2](https://github.com/secure-systems-lab/dsse/blob/v1.0.2/protocol.md): released, version 1.0.2 (2024-05-10), checked 2026-10-05.
- [DSSE envelope v1.0.2](https://github.com/secure-systems-lab/dsse/blob/v1.0.2/envelope.md): released, version 1.0.2 (2024-05-10), checked 2026-10-05.
- [in-toto website](https://in-toto.io/): project site, CNCF graduated, checked 2026-10-05.
- [in-toto Specifications page](https://in-toto.io/docs/specs/): project site, lists in-toto Stable (v1.0) and Attestation Framework, checked 2026-10-05.
