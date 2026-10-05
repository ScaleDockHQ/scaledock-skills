# owasp-api-security

An agent skill for the OWASP API Security Top 10 2023: review HTTP, GraphQL and RPC APIs against API1:2023 to API10:2023, and map older 2019 findings to the 2023 edition.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill owasp-api-security
```

Then ask your agent to "review this API against the OWASP API Security Top 10" or "check our GraphQL resolvers for BOLA and mass assignment".

## What it covers

- Each 2023 risk with its rating, threat agents, weakness, impacts, "Is the API Vulnerable?" test, attack scenarios and prevention steps.
- A review workflow that maps the API surface, walks the ten entries and classifies findings by root cause (BOLA versus BFLA, API4 versus API6, API7 versus API10).
- A checklist grouped by authorization, authentication, resource limits, business flows, outbound requests, configuration and inventory.
- How to apply the Top 10's terms (endpoint, object ID, property, method) to HTTP, GraphQL and RPC.
- The full 2019 to 2023 mapping and upgrade steps.

## Versions

| Line                           | Status                |
| ------------------------------ | --------------------- |
| OWASP API Security Top 10 2023 | current               |
| OWASP API Security Top 10 2019 | legacy (upgrade from) |

No newer edition or release candidate is published, so there is no preview. `references/versions.md` lists what changed and how to move a 2019 review to 2023.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [OWASP API Security Top 10 2023](https://owasp.org/API-Security/editions/2023/en/0x00-header/): the list, release notes, risk rating, methodology and the ten risk pages (stable release, June 2023).
- [OWASP API Security Top 10 2019](https://owasp.org/API-Security/editions/2019/en/0x00-header/): the legacy edition and its list.
- [OWASP API Security Project](https://owasp.org/www-project-api-security/) and [its page source](https://github.com/OWASP/www-project-api-security): news and roadmap.
- [OWASP/API-Security](https://github.com/OWASP/API-Security): the source of both editions, including unreleased clarifications on `develop`.

The OWASP documents are licensed CC BY-SA 4.0; the skill paraphrases them.

## License

MIT
