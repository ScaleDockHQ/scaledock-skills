# Versions and upgrades

Read this when choosing a target version, reading attestations or layouts written for an older line, upgrading, or deciding what to do with the layout ITEs. in-toto has two separately versioned specifications, each its own family: the in-toto specification (layouts and links; the default family, ids `spec-*` and the ITE previews) and the in-toto Attestation Framework (family `attestation`, ids `attestation-*`). Sources: the Attestation Framework releases, `spec/v1/CHANGELOG.md`, `spec/v0.1.0/` and `versioning.md`; the in-toto specification at tags `v0.9` and `v1.0` and on `master`; the ITE index, ITE-5, ITE-6, ITE-10 and ITE-11; and the in-toto.io Specifications page, listed in [Sources](../SKILL.md#sources).

## Version lines

| Id                 | Line                               | Status  | Revision                                 | Posture | Summary                                                                                |
| ------------------ | ---------------------------------- | ------- | ---------------------------------------- | ------- | -------------------------------------------------------------------------------------- |
| `attestation-v1`   | in-toto Attestation Framework v1.2 | current | v1.2.0 (2026-03-18)                      |         | Statement v1, ResourceDescriptor subjects, DSSE envelope, Bundle. The default target.  |
| `attestation-v0.1` | in-toto Attestation Framework v0.1 | legacy  | v0.1.0 (in `spec/v0.1.0/` at v1.2.0)     |         | Statement v0.1, subjects with required `name`, TypeURI extension field names.          |
| `spec-v1.0`        | in-toto specification v1.0         | current | 1.0.0 (2023-06-02), tag `v1.0`           |         | Layouts, links, artifact rules, envelope-agnostic (ITE-5), abstract artifacts (ITE-4). |
| `spec-v0.9`        | in-toto specification v0.9         | legacy  | 0.9 (2017-04-11), tag `v0.9`             |         | Built-in `signed`/`signatures` wrapper and unconsumed artifacts fail by default.       |
| `ite-10-preview`   | ITE-10 layouts for attestations    | preview | Draft, created 2023-01-07 (ITE `master`) | track   | Layout steps with `expected_predicates`, per-predicate functionaries and thresholds.   |
| `ite-11-preview`   | ITE-11 attribute rules             | preview | Draft, created 2023-01-07 (ITE `master`) | track   | `expectedAttributes` CEL rules on steps, predicates and inspections.                   |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows.

"1.2" refers to the Attestation Framework (tagged release v1.2.0, spec version v1.2). The in-toto specification has no 1.2: its latest release is 1.0 (tags `v0.9` and `v1.0` only, no GitHub releases), and the in-toto.io Specifications page lists in-toto Stable (v1.0).

## Which version to use

- Attestations: emit Statement `https://in-toto.io/Statement/v1` per Attestation Framework v1.2. All v1.x minor releases share that `_type`, so v1.0 and v1.1 consumers read v1.2 Statements; the only new producer choice in v1.2 is the predicate-specific `payloadType`, which v1.1 required to be exactly `application/vnd.in-toto+json` (v1.1.2 `envelope.md`, Fields), so older consumers may reject it. Use `application/vnd.in-toto+json` unless the consumer is known to accept `application/vnd.in-toto.<predicate>+json`.
- Layouts and links: target the in-toto specification v1.0. Sign them with DSSE (ITE-5).
- Attestations for steps of a layout: record each step as an Attestation Framework Statement with the Link predicate, which converts to a v1.0 link (`link.md`, Converting to old-style links). Layouts whose steps expect other predicate types are ITE-10, which is only a draft.
- Treat Statement v0.1 attestations and v0.9 layouts as input to an upgrade.
- Emit nothing from ITE-10 or ITE-11: their posture is track.

## What changed

### in-toto Attestation Framework v1.2 (v1.2.0, 2026-03-18)

- The Envelope's `payloadType` may be `application/vnd.in-toto.<predicate>+json` as well as `application/vnd.in-toto+json` (`CHANGELOG.md`, v1.2; `envelope.md`, Fields).
- The Envelope section restates the ITE-5 properties for non-DSSE envelopes and names COSE_Sign as compliant (`envelope.md`, Schema; release notes, PR #431).
- Non-cryptographic digests may use a custom value encoding (`digest_set.md`; release notes, PR #517).
- New predicates: Simple Verification Result v0.1 and SPDX 3; Release predicate v0.2 (release notes).

### in-toto Attestation Framework v1.1 (v1.1.0, 2024-05-28; patches v1.1.1 and v1.1.2)

- Subjects are assumed immutable, and a DigestSet may hold a non-cryptographic immutable identifier, though cryptographic digests are still strongly recommended (`CHANGELOG.md`, v1.1). Patch releases update predicates and language bindings only (spec README, Tagged Releases).

### in-toto Attestation Framework v1 (v1.0, 2023-03-22; patches v1.0.1 and v1.0.2)

Compared with v0.1 (`spec/v0.1.0/README.md` against `spec/v1/`):

- `_type` changed from `https://in-toto.io/Statement/v0.1` to `https://in-toto.io/Statement/v1`.
- Subjects are ResourceDescriptors. In v0.1, `name` was required, non-empty and unique and `digest` was the only other field; in v1 `digest` is required and `name` is optional.
- Extension fields: v0.1 required a TypeURI as the field name; v1 only asks for names unlikely to collide, without `.` or `$`.
- Consumers ignore unrecognized fields "unless otherwise noted in the predicate specification".
- The layers are split into separate files, and ResourceDescriptor, DigestSet, TypeURI, ResourceURI and Timestamp are defined as field types.
- The v0.1 processing model outputs matched subject names; the v1 validation model outputs the matched subjects (`docs/validation.md`).

### in-toto specification v1.0 (1.0.0, 2023-06-02)

Compared with v0.9 (tags `v0.9` and `v1.0`):

- The signature envelope is no longer part of the specification; any envelope meeting ITE-5 may be used and DSSE is recommended (§ 1.6, § 4.1). v0.9 defined `{"signed", "signatures"}` over canonical JSON (v0.9 § 4.2).
- Keys gain a `scheme` field, ECDSA is listed, and the KEYID is the SHA-256 of the canonical public key (§ 4.2.1).
- Steps and inspections carry `"_type": "step"` and `"_type": "inspection"`, and the step name field is `name` (v0.9 used `_name`) (§ 4.3.1, § 4.3.2).
- Artifact rule lists end with an implicit `ALLOW *`, and an explicit `DISALLOW *` is recommended. In v0.9, artifacts left unmatched after all rules failed verification (§ 4.3.3.1; v0.9 § 4.3.3.2).
- `REQUIRE` takes an artifact name, not a pattern (§ 4.3.3, § 4.3.3.3).
- Patterns may apply to ITE-4 abstract artifacts, not just paths (§ 4.3.3, § 4.4).
- The verification workflow is a separate section, and may be preceded by an ITE-2 check that the right layout and keys were received (§ 5.2).
- ITE-6 (accepted) introduced the Attestation Framework, which is versioned separately; the in-toto.io Specifications page says a future specification will incorporate it.

### Unreleased in-toto specification changes

The `master` branch adds § 5.3.5 "Verifying the materials prior to running the step" (in response to advisory GHSA-p86f-xmg6-9q4x) and editorial fixes, and still says Version 1.0.0. It is guidance, not a new line: functionaries may verify the links that produced their materials, or use a sublayout, before running a costly or risky step.

## Upgrading

### attestation-v0.1 to attestation-v1

1. Change `_type` to `https://in-toto.io/Statement/v1`.
2. Keep each subject's `name` and `digest`; leave `name` unset or `"_"` where it carries no meaning. Every subject must still have a `digest`.
3. Rename extension fields that used TypeURI names only if consumers agree; v1 still ignores unknown fields.
4. Keep `payloadType` `application/vnd.in-toto+json`, and re-sign: the payload bytes changed.
5. Check the `predicateType`: replace the deprecated `https://in-toto.io/Provenance/v0.1` with SLSA Provenance and `https://in-toto.io/Link/*` with `https://in-toto.io/attestation/link/v0.3`, converting the predicate (`provenance.md`; `link.md`).
6. Validate with the v1 validation model in [`verification.md`](verification.md). Keep behaviour: the same subjects, predicate and signer.

Consumers may keep reading v0.1 during a transition, by accepting both `_type` values and applying the v0.1 rules to v0.1 Statements.

### attestation-v1 minor releases (v1.0 to v1.1 to v1.2)

No change is required: the `_type` stays `https://in-toto.io/Statement/v1` (spec README, Tagged Releases). Consumers that upgrade to v1.2 accept both `payloadType` forms and still decide on `predicateType`.

### spec-v0.9 to spec-v1.0

1. Move each layout and link from the `{"signed", "signatures"}` wrapper to DSSE with `payloadType` `application/vnd.in-toto+json`, where the payload is the former `signed` object (ITE-5, Specification). Re-sign.
2. Add `"_type": "step"` and `"_type": "inspection"`, and rename `_name` to `name`.
3. Add `scheme` to every key, and recompute KEYIDs from the canonical public key (§ 4.2.1).
4. Append `["DISALLOW", "*"]` to every rule list that relied on v0.9's fail-on-unmatched behaviour, or v1.0 will silently allow extra artifacts.
5. Replace `REQUIRE` patterns with one rule per artifact name.
6. Verify the old final product with a v1.0 verifier: the same links pass, and an extra artifact still fails.

ITE-5 expects verifiers to accept both envelopes during a transition period they announce to users (ITE-5, Backwards Compatibility).

## Preview: ITE-10 layouts for attestations

ITE-10 (Draft, Standards track, created 2023-01-07) lets a layout verify Attestation Framework predicates, not only links. Posture: **track**.

- Steps replace `threshold` and `pubkeys` with `expected_predicates`, a list of `{predicateType, functionaries, threshold}`, so the threshold applies per predicate type.
- Predicates are transformational (links, SLSA Provenance; subjects are products) or informational (test results, code review, SCAI; subjects are materials). `expectedProducts` does not apply to informational predicates.
- Artifact rules match ResourceDescriptor `name` by pattern and compare digests.
- A verifier may emit a link, SLSA Provenance or a VSA as the summary of a verification.
- New layouts cannot be verified by older implementations (Backwards Compatibility).

Do not emit `expected_predicates` layouts for a v1.0 verifier. Watch the ITE index for a status change to Accepted and for an in-toto specification release that adopts it. When that happens: add a line for the new specification version, make it current, make v1.0 supported, and add an upgrade section.

## Preview: ITE-11 attribute rules

ITE-11 (Draft, Standards track, created 2023-01-07) adds `expectedAttributes`, a list of CEL expressions that must all evaluate to true, to steps, ITE-10 expected predicates and inspections, for example `predicate.result == 'PASSED'`. Posture: **track**.

- Legacy clients ignore the field, so a layout using it may pass verification on a client that never checked the attributes (Backwards Compatibility).
- It makes the specification depend on CEL and its engine (Security).

Do not rely on `expectedAttributes` being enforced. Until it ships, check attributes with inspections or in the policy engine that consumes the validation model output. Watch the ITE index together with ITE-10.
