# UCP version lines

UCP versions are dates in `YYYY-MM-DD` form. Each dated release is a snapshot of the core protocol published on a `release/YYYY-MM-DD` branch and tagged `vYYYY-MM-DD`; ucp.dev serves each release under its date and lists them in `https://ucp.dev/versions.json` (UCP Versioning; Overview, Component Versioning and Release Snapshots).

## Version lines

| Id              | Line           | Status    | Revision                                                     | Posture | Summary                                                                                                         |
| --------------- | -------------- | --------- | ------------------------------------------------------------ | ------- | --------------------------------------------------------------------------------------------------------------- |
| `2026-08-25`    | UCP 2026-08-25 | current   | Release 2026-08-25, tag v2026-08-25, branch at 3a541e13      |         | The default target and ucp.dev `latest`: authority binding, `keys[]` only, `dev.ucp.common.payment.*`, Actions. |
| `2026-04-08`    | UCP 2026-04-08 | supported | Release 2026-04-08, published 2026-04-09, branch at f021fcb2 |         | Still receiving backports. Adds `supported_versions`, cart, catalog, identity linking scopes, signals.          |
| `2026-01-23`    | UCP 2026-01-23 | legacy    | Release 2026-01-23, tag v2026-01-23                          |         | Registries become maps of arrays; `ucp.payment_handlers`; MCP `meta`. No backports since March 2026.            |
| `2026-01-11`    | UCP 2026-01-11 | legacy    | Release 2026-01-11, tag v2026-01-11                          |         | First release. Object-shaped services, capability arrays, `payment.handlers[]`, MCP `_meta.ucp`.                |
| `draft-preview` | UCP draft      | preview   | ucp.dev/draft, main at b0d92c2d (2026-10-05)                 | track   | The next release in progress, adding the lodging vertical and media variants. Never advertised.                 |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows.

The spec leaves version support to each business (`supported_versions` is a SHOULD), and its release policy says UCP backports approved changes to "a supported release". Status here follows the release branches: `release/2026-04-08` received feature backports through September 2026 (Web Bot Auth interop, permalink, loyalty), while `release/2026-01-23` and `release/2026-01-11` got only documentation commits after March 2026. That split is this skill's judgment from the repository history, not a lifecycle table published by UCP.

## Which version to use

- **New business or platform:** `2026-08-25`. Publish it at `/.well-known/ucp`.
- **A peer still on 2026-04-08:** keep `2026-08-25` current and add a `supported_versions` entry pointing to a separate leaf profile whose `ucp.version` is `2026-04-08`. Never put 2026-04-08 entries inside the 2026-08-25 profile.
- **Reading a 2026-01-23 or 2026-01-11 integration:** treat it as legacy; upgrade it, don't extend it. A business MAY still serve a leaf profile for it, but its shapes predate version negotiation as it works today.
- **The draft:** coordinate out of band only. `"draft"` MUST NOT appear in `version` or `supported_versions` (Overview, Pre-release Versions).

## What changed

### 2026-08-25 (from 2026-04-08)

Breaking changes (release notes for v2026-08-25):

- Fulfillment restructure: config flags drop the `allows_` prefix (`multi_destination`, `method_combinations`), `multi_destination` becomes an array, `fulfillment_option.description` becomes an object, `fulfillment_available_method.type` becomes an open string, and `merchant_fulfillment_config.json` becomes `business_fulfillment_config.json`. Destinations get explicit types.
- Buyer consent becomes a map keyed by reverse-DNS identifiers (`dev.ucp.consent.*`).
- `signing_keys[]` is removed from profiles; top-level `keys[]` is the only signing key field.
- Specs and schemas move into `shopping/`, `payment/` and `common/` verticals; shared primitives move to `common/types/`, changing their `$id`s.
- Payment extensions move from `dev.ucp.shopping.*` to `dev.ucp.common.payment.*` (AP2 mandates, split payments, payment terms); payment constructs move to `common/types/payment.json`.
- Static instrument requirement schemas are replaced by response-carried request constraints; PAN and network token become separate credential types; token binding becomes polymorphic.
- `retail_location.json` becomes `common/types/location.json`.
- `quantity` becomes an integer or a `measure` object, with integer bounds of ±(2^53−1) and `scale` up to 15.
- `cart.id` is omitted in update requests.

Also new: authority binding on `schema` URLs (replacing 2026-04-08's Spec URL Binding, which bound both `spec` and `schema`), the reserved `ucp` namespace and `map_order`, the Actions primitive, payment authentication (3DS), split payments, payment terms, location search and lookup, policies, loyalty, delegated identity providers (Accelerated IdP Flow), and the release snapshot rule that every `dev.ucp.*` entry declares version `D`.

### 2026-04-08 (from 2026-01-23)

From the 2026-04-08 overview and release notes:

- `supported_versions` with leaf profiles, request-time version validation, and the pre-release rule.
- The intersection algorithm gains a version-selection step (highest version both sides list, otherwise drop the capability); `capabilities_incompatible` and a full error code table.
- An Identity & Authentication section: hosting and fetching rules, identity binding, Web Bot Auth interop.
- `signing_keys[]` stays canonical, with an optional mirrored `keys[]` that must match.
- Spec URL Binding: `spec` and `schema` are both required and must match the namespace origin.
- MCP requests become `tools/call` with `params.arguments.meta`.
- New capabilities and features: cart, catalog search and lookup, signals, attribution, Get Order, and identity linking with capability-driven OAuth scopes.

### 2026-01-23 (from 2026-01-11)

From the 2026-01-23 overview:

- `services` becomes a map of arrays, one entry per transport with `transport`, `endpoint` and `schema`.
- `capabilities` becomes a map keyed by name instead of an array of objects with `name`.
- Payment handlers move to `ucp.payment_handlers`, a map keyed by handler name, with `schema`.
- MCP metadata moves from `params._meta.ucp.profile` to `params.meta["ucp-agent"].profile`, adds `meta["idempotency-key"]`, and nests the payload under `checkout`.
- Version rule unchanged: a business processes a platform version at or below its own, and otherwise returns `version_unsupported`.

### 2026-01-11

The first dated release: `services` keyed by name with `rest`, `mcp`, `a2a` and `embedded` sub-objects; `capabilities` as an array with `name`; `payment.handlers[]` with `name`, `config_schema` and `instrument_schemas`; `signing_keys`; MCP calls with `method` set to the operation name and `_meta.ucp.profile`; and capability intersection by name only.

## Upgrading

### From 2026-04-08 to 2026-08-25

1. Change `ucp.version` and every `dev.ucp.*` service, capability and extension `version` to `2026-08-25`; point `spec` and `schema` URLs at `/2026-08-25/` paths.
2. Move all signing keys to top-level `keys[]` and delete `signing_keys[]`.
3. Check every `schema` URL against authority binding (host reversed equals the name or is a label-aligned prefix). `spec` may now live on any HTTPS host.
4. Rename `dev.ucp.shopping.ap2_mandate` to `dev.ucp.common.payment.ap2_mandate`; the new payment extensions (split payments, payment terms, payment authentication) exist only under `dev.ucp.common.payment.*`. Update `$ref`s to the new `common/types/` and `payment/` schema `$id`s.
5. Rework fulfillment payloads: drop `allows_`, make `multi_destination` an array, use the `description` object, send explicit destination types, and select pickup locations with `selected_destination_id`.
6. Replace boolean buyer consent fields with the `dev.ucp.consent.*` map.
7. Replace static instrument requirement checks with `ucp.request_constraints` from responses; accept `pan_credential` and `network_token_credential` as separate types.
8. Accept `quantity` as an integer or `measure` object, and stop requiring `cart.id` in cart updates.
9. Validate the profile against `https://ucp.dev/2026-08-25/schemas/profile.json`, and keep the old profile as a `supported_versions` leaf for 2026-04-08 peers.

### From 2026-01-23 to 2026-04-08 (then follow the step above)

1. Select the highest version both sides list for each capability during intersection, and drop capabilities with no shared version.
2. Add `spec` and `schema` to every capability and bind them to the namespace origin.
3. Change MCP calls to `tools/call` with `params.name` and `params.arguments.meta`.
4. Add request-time version validation, `capabilities_incompatible`, and the 424/422/400 discovery error codes.
5. Apply the hosting rules (HTTPS, no redirects, `Cache-Control: public, max-age` of at least 60) and the SSRF-safe fetching rules.
6. Publish older profiles through `supported_versions` instead of accepting any lower version.

### From 2026-01-11 to 2026-01-23 (then follow the steps above)

1. Rewrite `services` from per-transport sub-objects to arrays of entries with `transport`.
2. Rewrite `capabilities` from an array with `name` into a map keyed by name.
3. Move `payment.handlers[]` into `ucp.payment_handlers` keyed by handler name, replacing `config_schema` and `instrument_schemas` with `schema`.
4. Change MCP metadata from `_meta.ucp.profile` to `meta["ucp-agent"].profile`, add `meta["idempotency-key"]`, and nest the payload under `checkout`.

## Preview: UCP draft

The draft (`draft-preview`) is the `main` branch of the UCP repository, served at `https://ucp.dev/draft/`. Posture is **track**: read it to plan, never advertise it in a profile, and never implement it against a peer without out-of-band agreement (Overview, Pre-release Versions).

Changes on `main` since v2026-08-25, as of 2026-10-05:

- A lodging vertical: the `dev.ucp.lodging.booking` capability (a booking session with progressive enrichment and completion; the business stays merchant of record; the user finalizes in a trusted UI unless AP2 mandates are active) and the `dev.ucp.lodging.policy.cancellation` extension. The capability page marks itself "Draft - Work in Progress" with possible breaking changes.
- Media modeling for image, video, external video and 3D variants.
- Documentation fixes to schema tables.

When a new dated release ships, re-read `https://ucp.dev/versions.json` and the release notes, add the new line here, and move the current line to supported.
