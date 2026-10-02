# Status, pinning and the opt-in transition

Sources: the GenAI README and `model/manifest.yaml` at commit `b31e9e8`, the GenAI page on opentelemetry.io, the GenAI README in semantic conventions v1.41.1, and the semantic conventions v1.44.0 release.

## Where the conventions live

The GenAI conventions moved out of the core semantic conventions repository. The GenAI page on opentelemetry.io is now a "Moved" page that says the conventions have moved to `open-telemetry/semantic-conventions-genai` and are no longer maintained there. Read the GenAI repository, not older copies.

## Status and pin

| Item                  | Value at the pin                                                           |
| --------------------- | -------------------------------------------------------------------------- |
| Repository            | `open-telemetry/semantic-conventions-genai`                                |
| Commit                | `b31e9e8ea26ac1c086d3313d474e31d7c3f391ae` (2026-09-30)                    |
| Releases or tags      | None                                                                       |
| Document status       | Development                                                                |
| Manifest `stability`  | `development`                                                              |
| Manifest `schema_url` | `https://opentelemetry.io/schemas/gen-ai-dev/1.42.0-dev`                   |
| Dependency            | semantic conventions `https://opentelemetry.io/schemas/1.44.0` (`v1.44.0`) |

Draft posture: **build**. It is reasonable to build instrumentation on these conventions, because they are what OpenTelemetry publishes for GenAI, but:

- Record the schema URL and commit you implemented, in code and in user documentation.
- Expect renames between commits, and re-read the registry before each upgrade.
- Do not tell users the conventions are stable.

## `OTEL_SEMCONV_STABILITY_OPT_IN`

The transition plan in the GenAI README (semantic conventions v1.41.1) says that existing GenAI instrumentations using v1.36.0 of the conventions or earlier:

- should not change the version of the GenAI conventions they emit by default (attributes, metric, span and event names, span kind and unit);
- should introduce the environment variable `OTEL_SEMCONV_STABILITY_OPT_IN`, a comma-separated list of category-specific values;
- with the value `gen_ai_latest_experimental`, emit the latest experimental GenAI conventions they support and stop emitting the old ones;
- without it, keep emitting whatever version they emitted before.

The plan says it will be updated with a stable version before the GenAI conventions are marked stable. The pinned GenAI README does not repeat the plan, so cite v1.41.1 for it and check the GenAI repository for a newer plan when refreshing.

```ts
export function emitLatestGenAi(
  env: Record<string, string | undefined>,
): boolean {
  return (env.OTEL_SEMCONV_STABILITY_OPT_IN ?? "")
    .split(",")
    .map((value) => value.trim())
    .includes("gen_ai_latest_experimental");
}
```

New instrumentations with no users on the old conventions can emit the pinned conventions directly.

## Refreshing the pin

1. Read `model/manifest.yaml` on the default branch for a new `schema_url` or `stability`.
2. Check the repository for a first tag or release, and prefer it over a commit pin.
3. Re-read the spans, agent spans, metrics, token metrics, events and registry docs, and update the references.
