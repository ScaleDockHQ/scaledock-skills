# owasp-mobile-top-10

An agent skill for OWASP Mobile Top 10: reviewing iOS and Android apps against the OWASP Mobile Top 10 risks.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill owasp-mobile-top-10
```

Then ask your agent to apply OWASP Mobile Top 10.

## What it covers

- The OWASP Mobile Top 10 (2023 list, M1 to M10): for each risk, the prevention guidance from the project's Markdown source at a pinned commit.

## Versions

| Line                | Status  |
| ------------------- | ------- |
| OWASP Mobile Top 10 | current |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [M1: Improper Credential Usage](https://raw.githubusercontent.com/OWASP/www-project-mobile-top-10/f2dc2d6607f3da069e8b91c7a44825fd85c74555/2023-risks/m1-improper-credential-usage.md): OWASP Project document, Commit f2dc2d6607f3 (2025-10-08), 2023 list.
- [M2: Inadequate Supply Chain Security](https://raw.githubusercontent.com/OWASP/www-project-mobile-top-10/f2dc2d6607f3da069e8b91c7a44825fd85c74555/2023-risks/m2-inadequate-supply-chain-security.md): OWASP Project document, Commit f2dc2d6607f3 (2025-10-08), 2023 list.
- [M3: Insecure Authentication/Authorization](https://raw.githubusercontent.com/OWASP/www-project-mobile-top-10/f2dc2d6607f3da069e8b91c7a44825fd85c74555/2023-risks/m3-insecure-authentication-authorization.md): OWASP Project document, Commit f2dc2d6607f3 (2025-10-08), 2023 list.
- [M4: Insufficient Input/Output Validation](https://raw.githubusercontent.com/OWASP/www-project-mobile-top-10/f2dc2d6607f3da069e8b91c7a44825fd85c74555/2023-risks/m4-insufficient-input-output-validation.md): OWASP Project document, Commit f2dc2d6607f3 (2025-10-08), 2023 list.
- [M5: Insecure Communication](https://raw.githubusercontent.com/OWASP/www-project-mobile-top-10/f2dc2d6607f3da069e8b91c7a44825fd85c74555/2023-risks/m5-insecure-communication.md): OWASP Project document, Commit f2dc2d6607f3 (2025-10-08), 2023 list.
- [M6: Inadequate Privacy Controls](https://raw.githubusercontent.com/OWASP/www-project-mobile-top-10/f2dc2d6607f3da069e8b91c7a44825fd85c74555/2023-risks/m6-inadequate-privacy-controls.md): OWASP Project document, Commit f2dc2d6607f3 (2025-10-08), 2023 list.
- [M7: Insufficient Binary Protection](https://raw.githubusercontent.com/OWASP/www-project-mobile-top-10/f2dc2d6607f3da069e8b91c7a44825fd85c74555/2023-risks/m7-insufficient-binary-protection.md): OWASP Project document, Commit f2dc2d6607f3 (2025-10-08), 2023 list.
- [M8: Security Misconfiguration](https://raw.githubusercontent.com/OWASP/www-project-mobile-top-10/f2dc2d6607f3da069e8b91c7a44825fd85c74555/2023-risks/m8-security-misconfiguration.md): OWASP Project document, Commit f2dc2d6607f3 (2025-10-08), 2023 list.
- [M9: Insecure Data Storage](https://raw.githubusercontent.com/OWASP/www-project-mobile-top-10/f2dc2d6607f3da069e8b91c7a44825fd85c74555/2023-risks/m9-insecure-data-storage.md): OWASP Project document, Commit f2dc2d6607f3 (2025-10-08), 2023 list.
- [M10: Insufficient Cryptography](https://raw.githubusercontent.com/OWASP/www-project-mobile-top-10/f2dc2d6607f3da069e8b91c7a44825fd85c74555/2023-risks/m10-insufficient-cryptography.md): OWASP Project document, Commit f2dc2d6607f3 (2025-10-08), 2023 list.

## License

MIT
