# Spec requirements on the ScaleDock stack

Check option and flag names against the installed packages before you use them.

| Requirement                               | Spec skill                 | ScaleDock implementation                                                                                            |
| ----------------------------------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| Schemas any tool can consume              | `standard-schema`          | Valibot in `packages/contract`, converted with `@orpc/valibot` for the document                                     |
| OpenAPI document                          | `openapi`                  | `OpenAPIHandler` plus `OpenAPIReferenceHandlerPlugin` (`/api/openapi.json`, Scalar at `/api/docs`)                  |
| Security schemes and per-operation scopes | `openapi`                  | `permdock openapi emit --doc apps/api/openapi.json` (default target is OpenAPI 3.2; `--target 3.1` for older tools) |
| Leave the generated document untouched    | `openapi-overlay`          | `permdock openapi emit --format overlay --out permdock.overlay.json`                                                |
| Drift check in CI                         | `openapi`                  | `permdock openapi emit --check` next to the snapshot diff                                                           |
| Procedure guard                           | none (PermDock)            | `protect(permission, load)` from `permdock/orpc`; `protect` from `permdock/hono` on plain routes                    |
| 401 and 403                               | `problem-details`, `oauth` | The PermDock adapter returns 401 with `WWW-Authenticate` and 403 `application/problem+json`                         |
| Error bodies                              | `problem-details`          | Hono `onError` builds Problem Details with a stable `type` per error and reports to Sentry                          |
| Quotas and 429                            | `ratelimit-headers`        | `limit: { count, per }` grants, `limits` (a `LimitStore`) on `createPermDock`, 429 with `Retry-After`               |
| Multi-step flows                          | `openapi-arazzo`           | `permdock arazzo check --doc <arazzo> --openapi <doc>` checks each step's permissions                               |
| Importing an existing API                 | `openapi`                  | `permdock openapi import --doc <doc> --out src/permissions.generated.ts --schema valibot`                           |
| Security profile                          | `fapi`                     | `permdock openapi emit --profile fapi2` when the API must meet FAPI 2.0                                             |

## Who writes what

- The contract writes paths, operations, parameters, request and response schemas.
- PermDock writes `components.securitySchemes`, the scopes, each operation's `security`, and its `x-permdock-*` extensions.
- `packages/contract/openapi` writes `info`, `tags` and `servers`.

If two tools write `security` on one operation, `permdock openapi emit` reports it; fix the source, never the output.
