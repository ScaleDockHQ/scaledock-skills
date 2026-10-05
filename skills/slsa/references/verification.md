# Verification and VSAs

Read this when building or reviewing a verifier, configuring roots of trust, forming expectations for a package, issuing or consuming a Verification Summary Attestation (VSA), or verifying source revisions. Sources: SLSA v1.2 Verifying Artifacts, Verification Summary Attestation, Verifying Source, Source Requirements and Verified Properties, and the in-toto validation model, listed in [Sources](../SKILL.md#sources).

## Verifying an artifact and its provenance (Verifying Artifacts)

Verification SHOULD:

1. check the builder identity against the map of trusted builder IDs to SLSA levels;
2. verify the signature on the provenance envelope;
3. check that `buildType` and `externalParameters` match expected values. The ecosystem MAY allow an approved list of `externalParameters` to be ignored, and any unrecognized `externalParameters` SHOULD fail verification (How to verify).

If the provenance is not SLSA Provenance, perform equivalent checks on the corresponding fields.

### Step 1: Check the SLSA Build level

Once, when bootstrapping the verifier, configure the roots of trust: a map from (builder public key identity, `builder.id`) to the maximum Build level each builder is trusted up to. A verifier may trust a builder at a lower level than it claims.

```jsonc
"slsaRootsOfTrust": [
  { "publicKey": "HKJEwI...", "builderId": "https://somebuilder.example.com/slsa/l3", "slsaBuildLevel": 3 },
  { "publicKey": "tLykq9...", "builderId": "https://differentbuilder.example.com/slsa/l3", "slsaBuildLevel": 2 }
]
```

Then, for each artifact and its provenance:

1. Verify the envelope signature against the roots of trust, which gives the recognized keys.
2. Verify that a `subject` digest matches the artifact.
3. Verify that `predicateType` is `https://slsa.dev/provenance/v1`.
4. Look up the Build level from the recognized key and `builder.id`, defaulting to Build L1.

Consumers MUST accept only specific signer–builder pairs: a signer for one builder cannot sign for another (Build: Provenance, Builder).

The in-toto validation model does the envelope and statement layers:

- Decode the DSSE envelope and collect the names of attesters whose signature verifies; reject if there are none.
- Require payload type `application/vnd.in-toto+json` and `_type` `https://in-toto.io/Statement/v1`.
- Keep the subjects whose digest, under an acceptable algorithm, equals the artifact's hash; reject if none match.
- Hand `predicateType`, `predicate`, the matched subjects and the attester names to policy (in-toto Validation model).

What Step 1 mitigates:

- Build L3 makes provenance accurate assuming you trust the platform. It does **not** cover a compromised platform or malicious insider; verifiers SHOULD carefully choose which platforms enter the roots of trust (threat E).
- Build L2 covers tampering with the artifact or provenance after the build (threat F).
- Verifying outside the registry covers a compromised registry (threat G).
- Verifying as the consumer covers tampering in transit (threat I).

### Step 2: Check expectations

Compare the provenance against expected values for at least these fields (Step 2: Check expectations):

| Field                       | Why                                                     |
| --------------------------- | ------------------------------------------------------- |
| Builder identity (Step 1)   | Stops the right code being built on the wrong platform. |
| Canonical source repository | Stops builds from an unofficial fork.                   |
| `buildType`                 | Makes `externalParameters` read as intended.            |
| `externalParameters`        | Stops injected unofficial behaviour.                    |

Verification tools SHOULD reject unrecognized fields in `externalParameters`. A parameter may accept a range of values only if every value in the range is known to be safe. JSON comparison is enough. If expectations are hard to form, the `buildType` is probably too low-level, for example when it lists commands rather than pointing at a config file in source.

### Step 3 (optional): Check dependencies recursively

SLSA has no requirements on the completeness or verification of `resolvedDependencies`; checking them is best effort. A VSA can record earlier results, and a trimming heuristic or exception mechanism is almost always needed because some transitive dependencies are Build L0 (Step 3).

## Forming expectations (Forming Expectations)

- **Trust on first use:** accept the first version, then alert on provenance differences at each update. Rules can mark benign changes.
- **Defined by producer:** the verifier SHOULD offer an authenticated channel for the producer to set expectations, and SHOULD protect against one party changing them alone, for example with two-party control.
- **Defined in source:** the package name is immutably bound to a source repository, which defines all other external parameters.

Expectations belong to a package name; provenance belongs to an artifact. Changes to recorded expectations need authorization such as two-party review (Threats, Verification threats).

## Where to verify (Architecture options)

At least one of these SHOULD be used, and more than one can be:

- **Package ecosystem at upload.** RECOMMENDED whenever possible, because it protects all clients. The ecosystem also publishes expectations, redistributes artifacts and provenance, and ships tools to check them.
- **Consumer at download or deploy.** Uses the producer's or ecosystem's expectations, or its own, through client-side tooling.
- **Monitor.** Verifies a set of packages and SHOULD publish its expectations. A failed verification only helps if someone acts on it.

## Verification Summary Attestation (Verification Summary)

A VSA states that a `verifier` checked artifacts (`subject`) against a `policy` using a bundle of attestations. Consumers who trust the verifier can rely on the result without seeing those attestations. This lets producers keep their pipeline confidential, and VSAs are suggested for closed-source software shared with third parties (Purpose; Software Attestations, Closed source, third party).

```jsonc
"predicateType": "https://slsa.dev/verification_summary/v1",
"predicate": {
  "verifier": { "id": "<URI>", "version": { "<component>": "<version>" } },
  "timeVerified": "<Timestamp>",
  "resourceUri": "<URI>",
  "policy": { "uri": "<URI>", "digest": { } },
  "inputAttestations": [ { "uri": "<URI>", "digest": { } } ],
  "verificationResult": "PASSED",
  "verifiedLevels": ["SLSA_BUILD_LEVEL_3"],
  "dependencyLevels": { "SLSA_BUILD_LEVEL_3": 5, "SLSA_BUILD_LEVEL_2": 7 },
  "slsaVersion": "1.2"
}
```

Field rules (Fields):

- **`verifier`, required:** MUST reflect the trust base consumers care about, and consumers MUST accept only specific (signer, verifier) pairs. `verifier.id` is required; `verifier.version` is optional.
- **`timeVerified`, optional** (required before VSA 1.1).
- **`resourceUri`, required:** SHOULD be the URI the producer expects consumers to fetch the artifact from. Any other value MUST be communicated out of band.
- **`policy`, required:** MUST contain `uri` and SHOULD contain `digest`.
- **`inputAttestations`, optional:** if non-empty, MUST list _all_ attestations used, each with a `digest`, and SHOULD have a `uri`.
- **`verificationResult`, required:** `PASSED` or `FAILED`.
- **`verifiedLevels`, required:**
  - The highest level per track for the artifact itself, not its dependencies, plus any verified properties, or `FAILED`.
  - MUST NOT hold more than one level per track.
- **`dependencyLevels`, optional:**
  - Counts of transitive dependencies per level. Count each dependency once per track, at its highest level.
  - An absent level means 0. An empty object means no dependencies; unset means no claim.
- **`slsaVersion`, optional:** `<MAJOR>.<MINOR>`; unset means an unspecified 1.x.
- **Parsing:** consumers MUST ignore unrecognized fields, and producers MAY add extension fields whose names are URIs (Parsing rules).

`SlsaResult` values SHOULD be `SLSA_<TRACK>_LEVEL_<N>` or `SLSA_<TRACK>_LEVEL_UNEVALUATED`, for example `SLSA_BUILD_LEVEL_3` or `SLSA_SOURCE_LEVEL_2`, or `FAILED`. Custom values MAY be used but MUST NOT start with `SLSA_` (SlsaResult). The verified properties `SLSA_SOURCE_TWO_PARTY_REVIEWED` and `SLSA_BUILD_REPRODUCED` are defined in Verified Properties.

### Verifying a VSA (How to verify)

Verification MUST:

1. verify the envelope signature against preconfigured roots of trust;
2. verify that `subject` matches the artifact's digest;
3. verify that `predicateType` is `https://slsa.dev/verification_summary/v1`;
4. verify that `verifier` matches the key used in step 1;
5. verify that `resourceUri` matches the expected value;
6. verify that `verificationResult` is `PASSED`;
7. verify that `verifiedLevels` contains the expected value.

It MAY also check more fields. A VSA does not protect against a compromised verifier; consumers SHOULD carefully choose which verifiers to trust.

## Verifying source revisions

### Source VSA rules (Source Requirements, Source verification summary attestation)

- `subject.uri` SHOULD point a human at the revision. Do not use it for policy decisions.
- `subject.digest` MUST include the revision identifier, for example `gitCommit`. SCSs without cryptographic digests MUST define a canonical type that includes the repository.
- `subject.annotations.sourceRefs` SHOULD list the references pointing at the revision. Git references MUST be fully qualified, such as `refs/heads/main`.
- `resourceUri` MUST be the repository URI, preferably as an SPDX download location such as `git+https://github.com/foo/hello-world`.
- `verifiedLevels` MUST include the asserted Source level, and only the highest one met. Organization properties MUST start with `ORG_SOURCE_`, or `ORG_SOURCE_INTERNAL_` for internal use.
- `dependencyLevels` MAY be empty.

The format of source provenance attestations is left to each SCS, which MUST document it (Source provenance attestations).

### Consumer checks (Verifying Source)

1. Check that you trust the SCS. Roots of trust map (SCS key identity, `verifier.id`) to a maximum Source level. Then run the VSA steps above, matching the subject on the revision ID.
2. Check expectations. Compare `verifier.id`, `subject.digest`, `verificationResult`, `resourceUri`, `subject.annotations.sourceRefs` and `verifiedLevels` against expected values. Expectations belong to a branch or tag; VSAs belong to a revision.
3. Optionally, at Source L3+, compare the source provenance with the VSA's claims.

Source VSAs can be checked by the build system at fetch time, the ecosystem at upload, consumers, or a monitor, and at least one SHOULD be used.
