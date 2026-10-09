# RSL documents

Read this when writing or validating an RSL document, or when evaluating its terms. "§" refers to RSL-SPEC-1.0 with errata; the Appendix A Relax NG schema is the structural authority.

## Skeleton

```xml
<rsl xmlns="https://rslstandard.org/rsl" max-age="30">
  <content url="/" server="https://licensing.example.com" lastmod="2026-10-01T00:00:00Z">
    <license>
      <permits type="usage">search ai-input</permits>
      <prohibits type="usage">ai-train</prohibits>
      <payment type="attribution"/>
      <reporting type="telemetry" profile="https://profiles.example/telemetry"/>
      <legal type="warranty">ownership authority</legal>
    </license>
    <alternate type="text/markdown">/index.md</alternate>
    <schema>/metadata/site.jsonld</schema>
    <copyright type="organization" contactUrl="https://example.com/contact">Example Media</copyright>
    <terms>https://example.com/legal/ai-terms</terms>
  </content>
</rsl>
```

## Elements

| Element                 | Parent    | Cardinality     | Rules                                                                                                                                                                                            |
| ----------------------- | --------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `rsl`                   | root      | 1               | Default namespace `https://rslstandard.org/rsl`, no prefix (§ 2.2). Optional `max-age` in days, positive integer (§ 3.2). Holds `content` elements, foreign extension elements, or both (§ 3.1). |
| `content`               | `rsl`     | 1+              | `url` required; `server`, `encrypted` (`true`/`false`, lowercase), `lastmod` (RFC 3339) optional; at least one `license` (§ 3.3).                                                                |
| `license`               | `content` | 1+              | Several licenses express distinct term sets (§ 3.4).                                                                                                                                             |
| `permits` / `prohibits` | `license` | 0..1 per `type` | `type` is `usage`, `user` or `geo`; space-separated tokens (§ 3.5, § 3.6).                                                                                                                       |
| `payment`               | `license` | 0..1            | Optional `type`; absent means free (§ 3.7). Children `standard`, `custom`, `amount`, `accepts`, each at most once.                                                                               |
| `standard`              | `payment` | 0..1            | Absolute URI identifying a shared license framework, compared as an opaque string (§ 3.8).                                                                                                       |
| `custom`                | `payment` | 0..1            | URL or path of the publisher's own licensing process (§ 3.9).                                                                                                                                    |
| `amount`                | `payment` | 0..1            | Decimal with required ISO 4217 `currency` (§ 3.10).                                                                                                                                              |
| `accepts`               | `payment` | 0..1            | Required media `type` naming the payment protocol; `application/x402+json` for x402 (§ 3.11). Wrap inline JSON in CDATA.                                                                         |
| `reporting`             | `license` | 0+              | `type` (`telemetry`, `provenance`, `audit`) and absolute `profile` URI required; optional HTTPS `endpoint` (§ 3.12).                                                                             |
| `legal`                 | `license` | 0..1 per `type` | `warranty`, `disclaimer`, `attestation`, `contact`, `proof` (§ 3.13).                                                                                                                            |
| `alternate`             | `content` | 0+              | URL of an alternative representation that inherits the parent's terms; optional media `type` (§ 3.14).                                                                                           |
| `schema`                | `content` | 0..1            | URL of Schema.org JSON-LD, or inline JSON-LD with `type="application/ld+json"` (§ 3.15).                                                                                                         |
| `copyright`             | `content` | 0..1            | Rights holder; optional `type` (`person`, `organization`), `contactEmail`, `contactUrl` (§ 3.16).                                                                                                |
| `terms`                 | `content` | 0..1            | URL of human-readable terms; `https://rslstandard.org/rsl/default-terms` names the RSL Default Access Terms (§ 3.17, § 3.17.1).                                                                  |

## Vocabularies

Usage (§ 3.4.1.1), for `type="usage"`:

| Token      | Meaning                                                                                                                  |
| ---------- | ------------------------------------------------------------------------------------------------------------------------ |
| `all`      | Any automated processing, including AI training and search.                                                              |
| `ai-all`   | Any use by AI systems; explicitly includes `ai-train`, `ai-input` and `ai-index` and AI uses not yet enumerated.         |
| `ai-train` | Training or fine-tuning AI models.                                                                                       |
| `ai-input` | Input into AI models, including RAG, grounding, generative responses or search summaries.                                |
| `ai-index` | Inclusion in an AI system's internal index or retrieval database.                                                        |
| `search`   | Building a search index and providing search results (links and short excerpts); excludes AI-generated search summaries. |

The usage vocabulary "includes the Cloudflare Content Signals vocabulary" (§ 3.4.1.1): `search`, `ai-input` and `ai-train` carry the same definitions.

User (§ 3.4.1.2), for `type="user"`: `commercial`, `non-commercial`, `education`, `government`, `personal`. It classifies the entity responsible for the automated use, not the audience of the output.

Geo (§ 3.5): ISO 3166-1 alpha-2 codes or `EU`, uppercase (Appendix A `geoToken`).

Payment types (§ 3.7): `purchase` (one-time), `subscription` (recurring), `training` (per training use), `crawl` (per crawl), `use` (each time content contributes to an AI output), `contribution` (good-faith monetary or in-kind support), `attribution` (visible credit and a functional link), `free`.

Legal (§ 3.13): `warranty` tokens `ownership`, `authority`, `no-infringement`, `privacy-consent`, `no-malware`; `disclaimer` tokens `as-is`, `no-warranty`, `no-liability`, `no-indemnity`; `attestation` is lowercase `true` or `false`; `contact` is one URL (including `mailto:`) or email; `proof` is one or more absolute URIs to verifiable evidence.

Extension tokens are QNames from another namespace (`prefix:name`) and MUST NOT be interpreted unless the processor recognizes them (§ 3.4.1, Appendix A).

## Evaluating terms

1. Collect every `content` whose `url` matches the asset, using RFC 9309 path matching with `*` and `$` (§ 3.3).
2. Order is irrelevant; evaluate all applicable terms together (§ 3.1.1).
3. Narrower scope (asset path, usage class or user class) takes precedence over broader scope (§ 3.1.1).
4. If a usage, user class or capability is both permitted and prohibited in the effective scope, it is not licensed (§ 3.1.1, § 3.6).
5. If a `permits` exists for a `type`, only the listed values are allowed for that type (§ 3.5).
6. Apply payment, reporting and legal terms of the license that grants the use; a client unable to satisfy a reporting profile treats the use as unlicensed (§ 3.12).
7. When in doubt, read conservatively: never expand rights (§ 3.1.1).

Example from § 3.1.2: site-wide `<permits type="usage">all</permits>` plus `/articles/` with `<prohibits type="usage">ai-train</prohibits>` means AI training is prohibited under `/articles/` and everything else is permitted.

## Common patterns

From § 1.1 and § 3:

- Search only, no AI use: `<prohibits type="usage">ai-all</prohibits>`.
- AI use under a custom license: `<permits type="usage">ai-all</permits>` with `<payment><custom>https://example.com/ai-license-request</custom></payment>`.
- Pay per crawl through a platform: `<payment type="crawl"><standard>https://example.com/pay-per-crawl</standard></payment>`, optionally with `<amount currency="USD">0.015</amount>`.
- Attribution under CC BY 4.0: `<payment type="attribution"><standard>https://creativecommons.org/licenses/by/4.0/</standard></payment>`.
- x402 payment: `<accepts type="application/x402+json">` with the protocol payload; authoritative pricing comes from the 402 exchange at runtime (§ 3.11).

## Publisher mistakes to catch

- A prefixed root (`<rsl:rsl>`) in a standalone document: § 2.2 says SHOULD NOT; only RSS and embedded file fragments use `rsl:` (§ 4.7, § 4.8).
- An unknown element in the RSL namespace, such as a misspelled `<permit>`: the document becomes non-conformant (§ 3).
- Two `<permits type="usage">` in one license: at most one per type (§ 3.5).
- Comma-separated tokens: a 0.9 habit; RSL 1.0 lists are space-separated.
- Uppercase `TRUE` for `encrypted` or `attestation`: booleans MUST be lowercase (§ 3.3, § 3.13).
