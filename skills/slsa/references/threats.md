# Threats and mitigations

Read this when explaining what a SLSA level does and does not protect against, threat-modelling a pipeline, or reviewing whether a verifier closes a gap. Source: SLSA v1.2 Threats & Mitigations and Supply chain threats, listed in [Sources](../SKILL.md#sources). Labels A–I are the spec's.

SLSA's primary focus is supply chain integrity, split into source integrity and build integrity, with availability as a secondary focus (Supply chain threats, Summary). SLSA does not currently address all threats. Dependencies are recursive: each one has its own A–I.

## Map

| Label | Where                     | SLSA coverage                                                     |
| ----- | ------------------------- | ----------------------------------------------------------------- |
| A     | Producer                  | Not addressed for a malicious producer.                           |
| B     | Modifying the source      | Source track (L2–L4) plus source verification.                    |
| C     | Source code management    | Source track; platform admin abuse needs verification of the SCS. |
| D     | External build parameters | Build L1 provenance plus expectations.                            |
| E     | Build process             | Build L2 and L3 directly.                                         |
| F     | Artifact publication      | Build L1 and L2 plus verification.                                |
| G     | Distribution channel      | Same as F, with verification by the consumer.                     |
| H     | Package selection         | Typosquatting not addressed; dependency confusion partly.         |
| I     | Usage                     | Not addressed.                                                    |

## Source threats (B, C)

The tag after each threat is the level or control that mitigates it.

- **B1, submit change without review:**
  - Directly submitting without review (Source L4).
  - Also listed: one actor controlling several accounts, robot accounts submitting changes, and abuse of rule exceptions.
  - A highly permissioned actor bypassing or disabling controls (verification).
- **B2, evade change management:**
  - Altering change history or replacing tagged content (Source L2+).
  - Skipping required checks (Source L3+).
  - Modifying code after review, unreviewable changes, or copying a reviewed change to another context (Source L4).
  - Commit graph attacks are also listed.
- **B3, render code review ineffective:** collusion with another trusted person, tricking a reviewer, and blind approval.
- **B4, render change metadata ineffective:** forging change metadata (Source L2+).
- **C, source code management:** platform admin abuse (verification) and exploiting a vulnerability in the SCM.

## Build threats (D–G)

### (D) External build parameters

Mitigated by comparing Build L1+ provenance against expectations:

- **Unofficial fork:** require the expected source location.
- **Unofficial branch or tag:** require the expected ref, or that the revision is reachable from the expected branch.
- **Unofficial build steps:** require the expected build configuration source.
- **Unofficial parameters:** require every external parameter to match. Examples are a `debug.yml` workflow instead of `release.yml`, or injected compiler flags in workflow inputs.
- **Code modified after checkout:** the platform pulls from the repository itself and records the real source.

### (E) Build process

- **Forge provenance values other than the output digest (Build L2+):** the control plane generates all provenance. At L3 this is hardened against workers escaping to the signing material.
- **Forge the output digest (n/a):** not a problem. A build could copy any artifact to its output. The verifier rejects on source mismatch, and provenance only claims an artifact was _built_, not _published_.
- **Compromise the project owner (Build L2+):** owners must not be able to influence the build or provenance. At L3, actions such as an SSH debug session appear in `externalParameters` and fail expectations.
- **Compromise another build (Build L3):** isolate builds, for example a VM per build and a clean image each time.
- **Steal cryptographic secrets (Build L3):** only the control plane can reach signing keys.
- **Poison the build cache (Build L3):**
  - The cache SHOULD be keyed by the transitive closure of all inputs.
  - It must be writable only by the control plane, or each entry must have its own Build L3 provenance.
- **Compromise the build platform admin (verification):** consumers accept only platforms with controls against admin abuse, such as two-person approval and audit logs.

### (F) Artifact publication

- **Untrusted CI/CD:** require the expected builder.
- **Package uploaded without provenance (Build L1):** require provenance.
- **Artifact tampered with after CI/CD (Build L1):** check that `subject` matches the artifact hash.
- **Provenance tampered with (Build L2):** require a valid signature from an acceptable builder.

### (G) Distribution channel

Like F, but mitigated only when the _consumer_ verifies, because the registry itself may be compromised.

## Usage threats (H, I)

- **Dependency confusion:** build internal packages on a Build L2+ platform, define provenance expectations, and verify them at install. A public package with an internal name then fails verification.
- **Typosquatting:** not currently addressed by SLSA, though available source can deter it and aid investigation.
- **Improper usage, such as default credentials:** not addressed by SLSA.

## Dependency threats

Dependency threats are A–H applied recursively (Dependency threats):

- **Including a vulnerable dependency:** left to a future Dependency track, now drafted (see the preview in [`versions.md`](versions.md)).
- **Using a compromised build tool:** partly mitigated by verifying build tooling, OS images included, like any other artifact before use. A future Build Environment track is also drafted.
- **Using a compromised runtime dependency during the build:** apply the build tool mitigations, and run tests in a separate environment without write access to the output.
- **Runtime dependencies at run time:** modelled separately.

## Availability threats

Deleting code, unavailable dependencies, and de-listing artifacts or provenance are not currently addressed by SLSA (Availability threats).

## Verification threats

- **Tampering with recorded expectations:** changes require authorization such as two-party review.
- **Hash collisions:** only accept digests with strong collision resistance, such as SHA-256.

(Verification threats)
