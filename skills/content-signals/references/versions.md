# Versions and upgrades

Read this when choosing a target or refreshing the skill. Sources: the Cloudflare announcement and contentsignals.org, listed in [Sources](../SKILL.md#sources).

## Version lines

| Id            | Line                        | Status  | Revision                                     | Posture | Summary                                    |
| ------------- | --------------------------- | ------- | -------------------------------------------- | ------- | ------------------------------------------ |
| `policy-2025` | Content Signals Policy 2025 | current | policy text of 2025-09-24 (unversioned site) |         | Three signals: search, ai-input, ai-train. |

Statuses: **current** is the default target. There is no legacy line and no preview.

## Which version to use

- Use the 2025 policy text and the syntax shown on contentsignals.org.
- The policy carries no version number. On every refresh, compare the signal definitions and the comment block with the pinned text; a change in definitions is a new line.

## What changed

### Content Signals Policy, 24 September 2025

- Introduces `search`, `ai-input` and `ai-train` with `yes`/`no` values on a `Content-Signal` robots.txt line.
- Released under CC0 so anyone can implement it.
- Cloudflare serves `Content-Signal: search=yes, ai-train=no` for zones using its managed robots.txt, serves no `ai-input` signal for them, and serves only the comment block for free zones without a robots.txt.

## Relationship to other signals

- RSL 1.0's usage vocabulary "includes the Cloudflare Content Signals vocabulary": `search`, `ai-input` and `ai-train` mean the same there (see the `rsl` skill).
- The IETF aipref drafts define a different vocabulary (`train-ai`, `ai-use`, `search`) and a `Content-Usage` rule; the two are not aliases (see the `aipref` skill).
- Cloudflare says it will work in standards bodies on standardized solutions (Policy, "What's next"). If a standard replaces this policy, add it as a new line and write an upgrade section here.

## Upgrading

There is no earlier line to upgrade from.
