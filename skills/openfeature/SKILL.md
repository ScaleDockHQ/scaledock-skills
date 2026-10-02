---
name: openfeature
description: "OpenFeature specification 0.9.0: evaluate feature flags through a vendor-neutral API with providers, clients, evaluation context, hooks, events and tracking. Use when adding feature flags to an application without coupling to one vendor, writing or reviewing an OpenFeature provider or hook, choosing between the dynamic-context (server) and static-context (client) paradigms, setting the targeting key and merging evaluation context, handling provider status and events, emitting flag evaluation telemetry, or exposing flags over the OpenFeature Remote Evaluation Protocol. Triggers: OpenFeature, feature flag, feature toggle, flag evaluation, getBooleanValue, evaluation details, resolution details, reason, variant, error code, FLAG_NOT_FOUND, TYPE_MISMATCH, provider, domain, client, evaluation context, targeting key, transaction context propagator, hook, before after error finally, PROVIDER_READY, provider status, track, OFREP, CNCF."
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.0"
  kind: standard
---

# OpenFeature

OpenFeature is a CNCF project that specifies a vendor-neutral API for feature flag evaluation. Application code evaluates flags through a client; a provider adapts one flag management system; hooks, events and tracking extend the flow. With this skill the agent writes application code, providers and hooks that follow the specification, and, where flags are served remotely, the OFREP HTTP API.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources), with the section it cites. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: application author, provider author, hook author, or flag management system exposing OFREP.
- Paradigm: dynamic context (server-side, context per evaluation) or static context (client-side, one user, flags evaluated in bulk) (glossary).
- Revision: specification v0.9.0 (Released, 2026-07-29). OFREP is pinned to OpenAPI 0.4.0 at a commit, with no release.
- Sources: when refreshing, re-read every URL in [Sources](#sources), check the spec releases page for a newer version and the protocol repository for a release, and update the pins.

## Invariants

1. **Section status governs stability.** Stable sections allow no breaking change without a major version; Hardening sections may change by TSC consensus in a minor version; Experimental sections, and anything without a status, may break in a minor version without notice. In v0.9.0, flag evaluation and providers are Stable, context, hooks and events are Hardening, and tracking and isolated API instances are Experimental (README, Document Statuses; section badges).
2. **Flag evaluation never throws.** Client methods must not abnormally terminate and return the default value on abnormal execution; the details then carry an error code (1.4.8, 1.4.10).
3. **Typed evaluation takes a flag key and a default value**, plus evaluation context only in the dynamic-context paradigm, and evaluation options; a value of the wrong type is abnormal and yields the default (1.3.1.1, 1.3.2.1, 1.3.4).
4. **The targeting key is an optional string in the evaluation context** identifying the subject; custom fields have string keys (3.1.1, 3.1.2).
5. **Context merges API, then transaction, then client, then invocation, then before hooks**, later values overwriting earlier ones (3.2.3).
6. **Hooks run stack-wise**: `before` from API to client to invocation to provider; `after`, `error` and `finally` in reverse (4.4.2).
7. **Providers own their status through events**: `PROVIDER_READY` before `initialize` returns normally, `PROVIDER_ERROR` before it fails, and the SDK updates status before running handlers (2.8.1 to 2.8.3, 5.3.5).
8. **Client operations should not write logs** (1.4.11); report errors through evaluation details, error hooks and events.

## Workflow

1. **Choose the paradigm and wire the API.** Set the default provider, bind providers to domains where several are needed, and create clients.
   -> [`references/evaluation-api.md`](references/evaluation-api.md)
   ✓ Clients are created without throwing and use the provider of their domain or the default.
2. **Evaluate flags.** Use typed methods with a safe default; use detailed methods where reason, variant or error code matter.
   -> [`references/evaluation-api.md`](references/evaluation-api.md)
   ✓ Every call site works with the default value when the provider fails.
3. **Supply evaluation context.** Set the targeting key and attributes at the right level, and a transaction context propagator for per-request context on servers.
   -> [`references/context-hooks.md`](references/context-hooks.md)
   ✓ The merged context for a request matches the precedence order.
4. **Write or review the provider.** Implement metadata, typed resolution returning resolution details, initialization, shutdown and status events.
   -> [`references/providers-events.md`](references/providers-events.md)
   ✓ Normal resolutions carry no error code; failures use the spec error codes.
5. **Add hooks, events and tracking.** Hooks for telemetry and validation, handlers for provider events, and `track` for experimentation outcomes.
   -> [`references/context-hooks.md`](references/context-hooks.md), [`references/providers-events.md`](references/providers-events.md)
   ✓ Hook failures in `error` and `finally` do not stop evaluation.
6. **Use OFREP for remote evaluation** when a flag system exposes, or a provider calls, the HTTP API.
   -> [`references/ofrep.md`](references/ofrep.md)
   ✓ Requests and responses match the pinned OpenAPI document.

## Verify before done

- [ ] No flag evaluation path can throw; failures return the default with an error code.
- [ ] The targeting key is set for any flag that targets or splits by subject.
- [ ] Error codes and reasons use the spec enumerations or documented custom strings.
- [ ] Shutdown is called on exit, and provider status is checked before relying on values.
- [ ] Features from Experimental sections are marked as such in the code or docs.

## Reference index

- **`references/evaluation-api.md`**: API, provider mutator, domains, clients, typed and detailed evaluation, evaluation details, error codes, reasons, shutdown, isolated instances. Load for steps 1 and 2.
- **`references/context-hooks.md`**: evaluation context, merging, transaction propagation, hook stages, ordering, hints and data, tracking, and telemetry mapping. Load for steps 3 and 5.
- **`references/providers-events.md`**: provider interface, resolution details, initialization, shutdown, context reconciliation, status, events and handlers. Load for steps 4 and 5.
- **`references/ofrep.md`**: OFREP endpoints, request and response shapes, errors, caching and event streams. Load for step 6.

## Related skills

- `cedar` when flag targeting and authorization share attributes: `npx skills add ScaleDockHQ/scaledock-skills --skill cedar`.

## Sources

Status uses the publishing body's own maturity term. Checked is the date the source was last read.

- [OpenFeature specification v0.9.0 release](https://github.com/open-feature/spec/releases/tag/v0.9.0): Released, v0.9.0 (2026-07-29), checked 2026-10-02.
- [OpenFeature specification introduction](https://github.com/open-feature/spec/blob/v0.9.0/specification/README.md): Released, v0.9.0 (conformance and document statuses), checked 2026-10-02.
- [Flag Evaluation API](https://github.com/open-feature/spec/blob/v0.9.0/specification/sections/01-flag-evaluation.md): Stable, v0.9.0 (1.3, 1.4, 1.6 and 1.7.2 Hardening; 1.8 Experimental), checked 2026-10-02.
- [Providers](https://github.com/open-feature/spec/blob/v0.9.0/specification/sections/02-providers.md): Stable, v0.9.0 (2.4, 2.5, 2.6 and 2.8 Hardening; 2.7 Experimental), checked 2026-10-02.
- [Evaluation Context](https://github.com/open-feature/spec/blob/v0.9.0/specification/sections/03-evaluation-context.md): Hardening, v0.9.0 (3.3 Experimental), checked 2026-10-02.
- [Hooks](https://github.com/open-feature/spec/blob/v0.9.0/specification/sections/04-hooks.md): Hardening, v0.9.0, checked 2026-10-02.
- [Events](https://github.com/open-feature/spec/blob/v0.9.0/specification/sections/05-events.md): Hardening, v0.9.0, checked 2026-10-02.
- [Tracking](https://github.com/open-feature/spec/blob/v0.9.0/specification/sections/06-tracking.md): Experimental, v0.9.0, checked 2026-10-02.
- [Types and Data Structures](https://github.com/open-feature/spec/blob/v0.9.0/specification/types.md): Released, v0.9.0, checked 2026-10-02.
- [Glossary](https://github.com/open-feature/spec/blob/v0.9.0/specification/glossary.md): Released, v0.9.0, checked 2026-10-02.
- [Appendix D: Observability](https://raw.githubusercontent.com/open-feature/spec/v0.9.0/specification/appendix-d-observability.md): Experimental (no status badge), v0.9.0, checked 2026-10-02.
- [OpenFeature Remote Evaluation Protocol repository](https://github.com/open-feature/protocol): No release, commit 98c4e0d (2026-09-30), Draft posture: track, checked 2026-10-02.
- [OFREP OpenAPI document](https://github.com/open-feature/protocol/blob/98c4e0d/service/openapi.yaml): No release, OpenAPI info.version 0.4.0 at commit 98c4e0d, Draft posture: track, checked 2026-10-02.
- [OpenFeature at CNCF](https://www.cncf.io/projects/openfeature/): Incubating, accepted June 17 2022 and Incubating since November 21 2023, checked 2026-10-02.
