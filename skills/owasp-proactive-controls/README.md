# owasp-proactive-controls

An agent skill for OWASP Proactive Controls: building software with the OWASP Top 10 Proactive Controls for developers.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill owasp-proactive-controls
```

Then ask your agent to apply OWASP Proactive Controls.

## What it covers

- The OWASP Top 10 Proactive Controls 2024 (C1 to C10): the implementation practices of each control, read from the project's Markdown source at the v4.0.0 release tag.

## Versions

| Line                     | Status  |
| ------------------------ | ------- |
| OWASP Proactive Controls | current |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [C1: Implement Access Control](https://raw.githubusercontent.com/OWASP/www-project-proactive-controls/v4.0.0/docs/the-top-10/c1-accesscontrol.md): OWASP Project document, Tag v4.0.0 (2024-10-20), 2024 list.
- [C2: Use Cryptography to Protect Data](https://raw.githubusercontent.com/OWASP/www-project-proactive-controls/v4.0.0/docs/the-top-10/c2-crypto.md): OWASP Project document, Tag v4.0.0 (2024-10-20), 2024 list.
- [C3: Validate all Input & Handle Exceptions](https://raw.githubusercontent.com/OWASP/www-project-proactive-controls/v4.0.0/docs/the-top-10/c3-validate-input-and-handle-exceptions.md): OWASP Project document, Tag v4.0.0 (2024-10-20), 2024 list.
- [C4: Address Security from the Start](https://raw.githubusercontent.com/OWASP/www-project-proactive-controls/v4.0.0/docs/the-top-10/c4-secure-architecture.md): OWASP Project document, Tag v4.0.0 (2024-10-20), 2024 list.
- [C5: Secure By Default Configurations](https://raw.githubusercontent.com/OWASP/www-project-proactive-controls/v4.0.0/docs/the-top-10/c5-secure-by-default.md): OWASP Project document, Tag v4.0.0 (2024-10-20), 2024 list.
- [C6: Keep your Components Secure](https://raw.githubusercontent.com/OWASP/www-project-proactive-controls/v4.0.0/docs/the-top-10/c6-use-secure-dependencies.md): OWASP Project document, Tag v4.0.0 (2024-10-20), 2024 list.
- [C7: Secure Digital Identities](https://raw.githubusercontent.com/OWASP/www-project-proactive-controls/v4.0.0/docs/the-top-10/c7-secure-digital-identities.md): OWASP Project document, Tag v4.0.0 (2024-10-20), 2024 list.
- [C8: Leverage Browser Security Features](https://raw.githubusercontent.com/OWASP/www-project-proactive-controls/v4.0.0/docs/the-top-10/c8-leverage-browser-security-features.md): OWASP Project document, Tag v4.0.0 (2024-10-20), 2024 list.
- [C9: Implement Security Logging and Monitoring](https://raw.githubusercontent.com/OWASP/www-project-proactive-controls/v4.0.0/docs/the-top-10/c9-security-logging-and-monitoring.md): OWASP Project document, Tag v4.0.0 (2024-10-20), 2024 list.
- [C10: Stop Server Side Request Forgery](https://raw.githubusercontent.com/OWASP/www-project-proactive-controls/v4.0.0/docs/the-top-10/c10-stop-server-side-request-forgery.md): OWASP Project document, Tag v4.0.0 (2024-10-20), 2024 list.

## License

MIT
