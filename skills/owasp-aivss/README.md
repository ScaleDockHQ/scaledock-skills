# owasp-aivss

An agent skill for OWASP AIVSS: scoring the severity of vulnerabilities in agentic AI systems with OWASP AIVSS.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill owasp-aivss
```

Then ask your agent to apply OWASP AIVSS.

## What it covers

- The OWASP AI Vulnerability Scoring System (AIVSS) v0.8: it takes a vulnerability's CVSS v4.0 base score, adds an Agentic Uplift (AARS) computed from ten risk amplification factors and a threat multiplier, and scales the sum by a mitigation factor. Read from the project's published PDF, pinned at a commit of its GitHub repository.

## Versions

| Line        | Status  |
| ----------- | ------- |
| OWASP AIVSS | current |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [AIVSS Scoring System For OWASP Agentic AI Core Security Risks v0.8](https://raw.githubusercontent.com/OWASP/www-project-artificial-intelligence-vulnerability-scoring-system/84856b290f62f2327f70eb0027be64351dd2e6de/assets/publications/AIVSS%20Scoring%20System%20For%20OWASP%20Agentic%20AI%20Core%20Security%20Risks%20v0.8.pdf): OWASP Project document (draft), v0.8, commit 84856b290f62 (2026-09-09).

## License

MIT
