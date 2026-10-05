# Versions and upgrades

Read this when choosing which specification release an SDK, provider or hook targets, reading code written against an older release, upgrading, or checking for unreleased changes. Sources: the OpenFeature specification GitHub releases and their release notes, and the specification sections at tags `v0.8.0` and `v0.9.0`, listed in [Sources](../SKILL.md#sources). The repository has no CHANGELOG file; the release notes are the change record.

## Version lines

The specification is pre-1.0: no 1.0 release exists. Each minor is a line. Stability is set per section, not per release (see the Section status invariant in `SKILL.md`).

| Id    | Line            | Status    | Revision                                    | Posture | Summary                                                                                                   |
| ----- | --------------- | --------- | ------------------------------------------- | ------- | --------------------------------------------------------------------------------------------------------- |
| `0.9` | OpenFeature 0.9 | current   | v0.9.0 (2026-07-29)                         |         | Evaluation and providers Stable; tracking, hook data, isolated instances, Appendix D telemetry.           |
| `0.8` | OpenFeature 0.8 | supported | v0.8.0 (2024-03-11)                         |         | Domains, static-context provider state and events, context propagation, first OFREP draft in an appendix. |
| `0.7` | OpenFeature 0.7 | legacy    | v0.7.0 (2023-09-08)                         |         | Static and dynamic context paradigms, STALE state, blocking `setProvider`, Gherkin suite.                 |
| `0.6` | OpenFeature 0.6 | legacy    | v0.6.0 (2023-05-16)                         |         | Flag metadata, named clients, provider initialization, shutdown and events.                               |
| `0.5` | OpenFeature 0.5 | legacy    | v0.5.0 (2022-09-27) to v0.5.2 (2023-01-12)  |         | Error codes as a constrained set; optional error message; STATIC and CACHED reasons in 0.5.2.             |
| `0.4` | OpenFeature 0.4 | legacy    | v0.4.0 (2022-08-25)                         |         | Evaluation options removed from provider method signatures.                                               |
| `0.3` | OpenFeature 0.3 | legacy    | v0.3.0 (2022-08-11) and v0.3.1 (2022-08-15) |         | Provider and hook changes; evaluation context clarification in 0.3.1.                                     |
| `0.2` | OpenFeature 0.2 | legacy    | v0.2.0 (2022-08-05)                         |         | Changes across the evaluation API, providers, context and hooks.                                          |
| `0.1` | OpenFeature 0.1 | legacy    | v0.1.0 (2022-07-18)                         |         | Initial specification, including the initial provider specification.                                      |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows.

The OpenFeature Remote Evaluation Protocol (OFREP) is a separate protocol in its own repository with no release. It is tracked at a commit in [`ofrep.md`](ofrep.md) (posture: track) and is not a line of this specification, although v0.8.0 introduced it in an appendix and v0.9.0 updated that documentation.

## Which version to use

- Target OpenFeature 0.9 for new SDKs, providers and hooks.
- Keep OpenFeature 0.8 only when the SDK a provider or hook must run in still implements 0.8. The differences that matter are the `finally` stage signature and provider status ownership, below.
- Treat code written against OpenFeature 0.7 or earlier (0.1 to 0.6) as input to an upgrade.
- Mark anything built on an Experimental section as such, whatever the release.

## What changed

### OpenFeature 0.9

The release notes flag three breaking changes: #280, #306 and #360.

- The `finally` stage receives `evaluation details` as a required argument (4.3.8; release notes #280, breaking).
- The immutable flag metadata requirement is renumbered from Conditional Requirement 1.4.14.1 to 1.4.15.1 under Condition 1.4.15 (release notes #360, breaking).
- Appendix D (observability) is added and then updated to the current OpenTelemetry semantic conventions (release notes #287, #306, breaking).
- Flag evaluation and providers become Stable; hooks, events and context become Hardening (release notes #314; section badges).
- Providers own their status through events: `PROVIDER_READY` before `initialize` returns normally and `PROVIDER_ERROR` before it fails, and the SDK updates status before running handlers (2.8; release notes #385, #367, #408). In v0.8.0 the Providers section had no provider status subsection.
- Provider `initialize` receives the bound domain, and providers may declare themselves domain-scoped (2.4.1, 2.4.3; release notes #393).
- New: tracking (section 6 and 2.7, Experimental; #268), hook data (4.6; #273), isolated API instances (1.8, Experimental; #368), and the multi-provider appendix (#264).
- Client operations should not write log messages (1.4.11; #269).
- The API's `shutdown` resets all state, including evaluation context and transaction context propagators (1.6.2; #323, #375), and a provider's `shutdown` should be idempotent (2.5.3; #323).

### OpenFeature 0.8

Release notes: minor enhancements for dynamic-context SDKs, significant changes for static-context SDKs, and the first OFREP draft.

- Domain as an OpenFeature concept for binding providers to clients (#229).
- Internal provider state and new client events (#241); events on context change, client-only (#200); `NOT_READY` after provider shutdown (#216).
- Transaction context propagation (#227).
- OFREP introduced in the appendix section (#246).
- Hook hints included in the evaluation options type (#250); the provider event details gain an error code (#249).

### OpenFeature 0.7

- Static and dynamic context paradigms (#171, breaking).
- The STALE state, running handlers for the current state immediately, and provider name (#196); blocking `setProvider` (#201).
- The appendix section and Appendix B, the Gherkin test suite (#199, #203).

### OpenFeature 0.6 and earlier

- 0.6: flag metadata (#169), named client to provider mappings (#183), initialization and shutdown (#179), provider events (#182).
- 0.5: error codes must be a constrained set of values (#142, breaking), an optional error message in resolution details (#142), `reason` is a string (#140); 0.5.2 adds STATIC and CACHED provider reasons (#166).
- 0.4: evaluation options removed from provider method signatures (#134, breaking).
- 0.1 to 0.3: the initial specification of the evaluation API, providers, evaluation context and hooks.

## Upgrading

The Gherkin suite in the specification repository (Appendix B) is the conformance check for each tag.

### 0.8 to 0.9

1. Change the version marker: document v0.9.0 as the specification release your SDK, provider or hook implements, and update compliance tables that cite requirement numbers (1.4.14.1 is now 1.4.15.1).
2. Replace removed or renamed behaviour: pass evaluation details to `finally` hooks and update hooks to accept them (4.3.8); make providers emit `PROVIDER_READY` or `PROVIDER_ERROR` from `initialize` and let the SDK derive status from events (2.8); accept the domain in `initialize` (2.4.1); reset all API state on `shutdown` (1.6.2); remove logging from client operations (1.4.11); align telemetry hooks with Appendix D.
3. Validate against the target: run the v0.9.0 Gherkin suite and check each Stable and Hardening requirement your component implements.
4. Keep behaviour unchanged: flag values, defaults on error, reasons and error codes stay the same for the same inputs.

### 0.7 to 0.8

1. Change the version marker to v0.8.0.
2. Replace named-client wording and APIs with domains (#229); handle the client events on context change and the `NOT_READY` state after shutdown in static-context SDKs (#200, #216, #241); add a transaction context propagator where servers need per-request context (#227).
3. Validate against the v0.8.0 Gherkin suite.
4. Keep behaviour unchanged for dynamic-context evaluation, which the release describes as minor enhancements.

### 0.7 or earlier to 0.9

Apply 0.7 to 0.8 and then 0.8 to 0.9. For code older than 0.7, start from the 0.7 changes: pick the paradigm (#171) and adopt the 0.6 lifecycle and events before the later steps.

## Preview

None is listed. As of 2026-10-05 the specification repository has no pre-release and no 1.0 draft. The `main` branch has one unreleased requirement change since v0.9.0, "an error in an after hook returns the default value" (commit `42fc47d`, 2026-09-25, touching the Hooks section). It is work in progress, not a preview: re-read the Hooks section when the next release is tagged. When a new release ships, make it current, make OpenFeature 0.9 supported and OpenFeature 0.8 legacy, and add an upgrade section.
