# owasp-ai-exchange

An agent skill for OWASP AI Exchange: identifying AI security threats and selecting the matching OWASP AI Exchange controls.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill owasp-ai-exchange
```

Then ask your agent to apply OWASP AI Exchange.

## What it covers

- The OWASP AI Exchange: a threat and control framework for AI systems. It groups threats into threats through use, development-time threats and runtime application security threats, and names each control with a tag such as #MODEL ACCESS CONTROL. Read from the project's Markdown source at a pinned commit.

## Versions

| Line              | Status  |
| ----------------- | ------- |
| OWASP AI Exchange | current |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [OWASP AI Exchange: 1. General controls](https://raw.githubusercontent.com/OWASP/www-project-ai-security-and-privacy-guide/e894338312f9a9f448bfd7ece3e412cfbce890ce/content/ai_exchange/content/docs/1_general_controls.md): OWASP Project document, Commit e894338312f9 (2026-10-04).
- [OWASP AI Exchange: 2. Threats through use](https://raw.githubusercontent.com/OWASP/www-project-ai-security-and-privacy-guide/e894338312f9a9f448bfd7ece3e412cfbce890ce/content/ai_exchange/content/docs/2_threats_through_use.md): OWASP Project document, Commit e894338312f9 (2026-10-04).
- [OWASP AI Exchange: 3. Development-time threats](https://raw.githubusercontent.com/OWASP/www-project-ai-security-and-privacy-guide/e894338312f9a9f448bfd7ece3e412cfbce890ce/content/ai_exchange/content/docs/3_development_time_threats.md): OWASP Project document, Commit e894338312f9 (2026-10-04).
- [OWASP AI Exchange: 4. Runtime application security threats](https://raw.githubusercontent.com/OWASP/www-project-ai-security-and-privacy-guide/e894338312f9a9f448bfd7ece3e412cfbce890ce/content/ai_exchange/content/docs/4_runtime_application_security_threats.md): OWASP Project document, Commit e894338312f9 (2026-10-04).

## License

MIT
