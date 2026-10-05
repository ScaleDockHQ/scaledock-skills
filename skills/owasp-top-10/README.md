# owasp-top-10

An agent skill for the OWASP Top 10:2025: review web applications against A01:2025 to A10:2025, classify findings by category and CWE, prioritize them by the application's own risk, and map older 2021 and 2017 findings to the 2025 edition.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill owasp-top-10
```

Then ask your agent to "review this web app against the OWASP Top 10" or "which OWASP Top 10:2025 category and CWE does this finding belong to?".

## What it covers

- Each 2025 category with its data, the description of when an application is vulnerable, prevention steps, attack scenarios and mapped CWEs.
- A review workflow that maps the application, walks the ten categories, classifies findings by root cause and prioritizes them by exposure, threat agents and business impact.
- A checklist by category and a classification table for borderline findings (SSRF, XXE, XSS, mass assignment, verbose errors).
- The on-the-cusp risks outside the ten: application resilience, memory management and AI-generated code.
- How to use the list in a review: a floor, not a standard, and never a full-coverage claim.
- The 2021 to 2025 and 2017 to 2021 mappings and upgrade steps.

## Versions

| Line              | Status                |
| ----------------- | --------------------- |
| OWASP Top 10:2025 | current               |
| OWASP Top 10:2021 | legacy (upgrade from) |
| OWASP Top 10:2017 | legacy (upgrade from) |

No newer edition or release candidate is published, so there is no preview. `references/versions.md` lists what changed and how to move a 2021 or 2017 review to 2025.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [OWASP Top 10:2025](https://owasp.org/Top10/2025/): the introduction, risk method, application security program guidance, the ten category pages and Next Steps (final release, December 2025).
- [OWASP Top 10:2021](https://owasp.org/Top10/2021/): the legacy edition's introduction, notice and "as a standard" guidance.
- [OWASP Top Ten 2017](https://owasp.org/www-project-top-ten/2017/): the legacy 2017 list and release notes.
- [OWASP Top Ten project page](https://owasp.org/www-project-top-ten/) and [its page source](https://github.com/OWASP/www-project-top-ten).
- [OWASP/Top10](https://github.com/OWASP/Top10): the source of all editions.

The OWASP Top 10 is licensed CC BY 3.0 (2021 and 2025) and CC BY-SA 4.0 (2017); the skill paraphrases it.

## License

MIT
