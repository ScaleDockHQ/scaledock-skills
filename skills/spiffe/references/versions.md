# Versions and upgrades

Read this when choosing what to build on, reading an implementation written against an older revision of the standards, moving to the pinned revision, or deciding whether to use an Incubating specification. Sources: the SPIFFE standards and STABILITY.md in the `spiffe/spiffe` repository, its commit history, and the SPIRE release page, all listed in [Sources](../SKILL.md#sources).

## Version lines

| Id                   | Line                        | Status  | Revision                                       | Posture | Summary                                                                                                                            |
| -------------------- | --------------------------- | ------- | ---------------------------------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `stable`             | SPIFFE standards (Stable)   | current | `spiffe/spiffe` `main` at f97c46d (2026-09-26) |         | SPIFFE-ID, X509-SVID, JWT-SVID, Trust Domain and Bundle, Workload API (all but §7), Workload Endpoint and Federation. The default. |
| `incubating-preview` | SPIFFE Incubating standards | preview | `spiffe/spiffe` `main` at f97c46d (2026-09-26) | track   | WIT-SVID, the Workload API WIT-SVID profile (§7), the Broker API and the Broker Endpoint.                                          |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows.

### How SPIFFE versions its standards

- The standards carry no version numbers. They live on the `main` branch of `spiffe/spiffe`, which has no tags or releases (checked through the GitHub API on 2026-10-05). A revision is a commit, so this skill pins `main` at f97c46d.
- Each document declares a stability level in a banner under its title: Experimental, Incubating or Stable. Proposed specifications are open pull requests and are not on `main` (STABILITY.md §2, §2.1, §3).
- A section can carry its own lower level. The Workload API is Stable except §7, the WIT-SVID profile, which is marked Incubating (STABILITY.md §3.1; Workload API §7).
- A Stable specification is never demoted, and breaking changes to it are reserved for critical security issues. It may grow new sections or profiles marked Incubating (STABILITY.md §2, §2.4).
- Implementers of an Incubating specification should record the revision they implemented, as a GitHub permalink or commit hash (STABILITY.md §2.3).
- SPIRE has its own release versions; v1.15.3 (2026-08-21) is the latest release and the one [`spire.md`](spire.md) pins. SPIRE versions are implementation versions, not versions of the standards, and SPIRE's maturity is described by MATURITY.md, not STABILITY.md (STABILITY.md §1).

## Which version to use

- Build on the Stable standards at the pinned commit. They are fit for production use (STABILITY.md §2).
- Treat code written against an older commit as input to the upgrade below.
- Do not ship the Incubating standards in production code paths; see [Preview](#preview-spiffe-incubating-standards).
- Record the `spiffe/spiffe` commit you built against next to the SPIRE version, for example "SPIFFE standards f97c46d, SPIRE v1.15.3".

## What changed

Commits on `main` that touched `standards/`, newest first, from the `spiffe/spiffe` commit history.

### SPIFFE standards (Stable)

- f97c46d (2026-09-26): typo fix in `workloadapi.proto` and the Workload API. No behaviour change.
- dc4e9d9 (2026-08-03): `wit-svid` joins `x509-svid` and `jwt-svid` as a supported bundle `use` value (Trust Domain and Bundle §4.2.2). Clients that do not support WIT-SVID still ignore the element, because unknown `use` values MUST be ignored (Trust Domain and Bundle §4.2.2).
- 21896ac (2026-07-01): the stability process is introduced (STABILITY.md), and every standard gets a stability banner.
- bde2744 (2026-06-12): the Workload API messages say that certificates, keys, bundles and CRLs are ASN.1 DER, not PEM (Workload API §5.1).
- 2dae7db (2026-03-26): leaf validation now says the validator MUST check that the SPIFFE ID has a non-root path, and the `spiffe` scheme check becomes a MUST (X509-SVID §5.2).

### SPIFFE Incubating standards

- 665a28f (2026-07-01): WIT-SVID is added as a new SVID type, with the Workload API WIT-SVID profile (WIT-SVID; Workload API §7).
- 69464c3 (2026-06-16): the Broker API and Broker Endpoint are added. Brokers are trusted infrastructure components that fetch SVIDs and bundles on behalf of the workloads they represent (Broker API §1; Broker Endpoint, Abstract).

## Upgrading

### Earlier commits to f97c46d (Stable)

1. Change the version marker: record `spiffe/spiffe` f97c46d as the revision the implementation follows.
2. Replace removed or renamed fields: nothing was removed or renamed. Accept `wit-svid` bundle entries by ignoring them unless WIT-SVID is supported (Trust Domain and Bundle §4.2.2), and treat every Workload API byte field as DER, never PEM (Workload API §5.1).
3. Validate against the target: X.509-SVID validators reject a leaf whose SPIFFE ID has no path (X509-SVID §5.2), and the checks in [Verify before done](../SKILL.md#verify-before-done) pass.
4. Keep behaviour unchanged: the same peers are trusted with the same bundles. Rejecting root-path leaves is the one intended change; confirm no workload depends on one before rolling out.

### Incubating to Stable (when a specification is promoted)

1. Change the version marker: re-pin to the commit that changes the banner to Stable (STABILITY.md §2.4).
2. Replace removed or renamed fields: read the appendix that describes any breaking changes made during incubation (STABILITY.md §2.3), and apply it.
3. Validate against the target: interoperate with at least one other implementation of the promoted specification.
4. Keep behaviour unchanged: remove the feature flag only after the promoted text matches what the code does.

## Preview: SPIFFE Incubating standards

- **Contents at f97c46d:**
  - WIT-SVID, a SPIFFE profile of the WIMSE Workload Identity Token that binds a key with `cnf` and requires proof of possession. See [`wit-svid.md`](wit-svid.md).
  - The Workload API WIT-SVID profile (Workload API §7). It is optional, and a server without it returns `Unimplemented`.
  - The Broker API and Broker Endpoint, through which trusted infrastructure fetches SVIDs for workloads it represents. This skill does not cover them beyond this entry.
- **Still Incubating:** WIT-SVID was still marked Incubating at f97c46d, the latest commit on `main` on 2026-10-05, so it has not moved to Stable since this skill was first pinned on 2026-10-02.
- **Posture:** track. Breaking changes are avoided but may still happen, and implementations are expected to gate Incubating features behind a feature flag or other opt-in (STABILITY.md §2, §2.3).
- **Must not be emitted:**
  - No WIT-SVID issuance, validation or Workload API WIT-SVID calls in a default or production code path.
  - No Broker API client or server.
  - If the user explicitly asks for a prototype, keep it behind a flag and record the commit it follows.
- **When it ships:** STABILITY.md §2.4 promotes a specification by a pull request that changes its banner to Stable. Then move it into the `stable` line, re-pin the commit, follow "Incubating to Stable" above, and remove it from this preview. Remove the preview when nothing on `main` is Incubating.
