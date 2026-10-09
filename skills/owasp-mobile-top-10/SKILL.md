---
name: owasp-mobile-top-10
description: >-
  OWASP Mobile Top 10: review mobile apps against the top mobile security risks. Covers OWASP Mobile Top 10. Use when reviewing mobile security risks. Triggers: Mobile Top 10.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.1.0"
  kind: standard
---

# OWASP Mobile Top 10

The OWASP Mobile Top 10 (2023 list, M1 to M10): for each risk, the prevention guidance from the project's Markdown source at a pinned commit.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources). Quoted requirements are sentences taken from the pinned text, labelled with the section they come from. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: Developer, reviewer or tester of an iOS or Android app and its backend.
- Target version: OWASP Mobile Top 10 (current). See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill, re-read every URL in [Sources](#sources) and check the publisher for a newer revision or version line.

## Invariants

1. **M1.** "Always avoid using hardcoded credentials in your mobile app's code or configuration files."
2. **M3.** "Backend systems should independently verify the roles and permissions of the authenticated user. Do not rely on any roles or permission information that comes from the mobile device."
3. **M5.** "Never allow bad certificates (self-signed, expired, untrusted root, revoked, wrong host..)."
4. **M9.** "Use platform-specific secure storage mechanisms provided by the mobile operating system, such as Keychain (iOS) or Keystore (Android)."

## Workflow

1. **Pick the version.** Use the current line unless a named consumer needs a supported one. Do not author a legacy line. Emit a preview only when its posture is build and the user asked for that draft.
   -> [`references/versions.md`](references/versions.md)
   ✓ The target version is recorded, and it is not a legacy line.
2. **Apply the pinned requirements.** Walk the quotes in [`references/requirements.md`](references/requirements.md) and implement each one that applies to the role.
   -> [`references/requirements.md`](references/requirements.md)
   ✓ Each applicable quote is either implemented or recorded as out of scope for the role, with the section it came from.
3. **Upgrade** (only when asked). Follow the upgrade section from the source line to the target.
   -> [`references/versions.md`](references/versions.md)
   ✓ The result cites the target line and no longer depends on a requirement that only the old line stated.

## Verify before done

- [ ] The artifact cites the target line's revision from [Sources](#sources).
- [ ] Every applicable quoted requirement in [`references/requirements.md`](references/requirements.md) holds.
- [ ] Each of M1 to M10 is assessed, and every finding names its risk id.
- [ ] Nothing from a preview line is emitted unless its posture is build and the user opted in.

## Reference index

- **`references/versions.md`**: every version line, which one to use, and how to upgrade. Load for steps 1 and 3.
- **`references/requirements.md`**: quotes taken from the pinned specification, grouped by source. Load for step 2.

## Related skills

Install related spec skills by name with `npx skills add ScaleDockHQ/scaledock-skills --skill <name>`: `owasp-masvs`, `owasp-mastg`, `owasp-top-10`.

## Sources

Status uses the publishing body's own maturity term. Checked is the date the source was last read.

- [M1: Improper Credential Usage](https://raw.githubusercontent.com/OWASP/www-project-mobile-top-10/f2dc2d6607f3da069e8b91c7a44825fd85c74555/2023-risks/m1-improper-credential-usage.md): OWASP Project document, Commit f2dc2d6607f3 (2025-10-08), 2023 list, checked 2026-10-06.
- [M2: Inadequate Supply Chain Security](https://raw.githubusercontent.com/OWASP/www-project-mobile-top-10/f2dc2d6607f3da069e8b91c7a44825fd85c74555/2023-risks/m2-inadequate-supply-chain-security.md): OWASP Project document, Commit f2dc2d6607f3 (2025-10-08), 2023 list, checked 2026-10-06.
- [M3: Insecure Authentication/Authorization](https://raw.githubusercontent.com/OWASP/www-project-mobile-top-10/f2dc2d6607f3da069e8b91c7a44825fd85c74555/2023-risks/m3-insecure-authentication-authorization.md): OWASP Project document, Commit f2dc2d6607f3 (2025-10-08), 2023 list, checked 2026-10-06.
- [M4: Insufficient Input/Output Validation](https://raw.githubusercontent.com/OWASP/www-project-mobile-top-10/f2dc2d6607f3da069e8b91c7a44825fd85c74555/2023-risks/m4-insufficient-input-output-validation.md): OWASP Project document, Commit f2dc2d6607f3 (2025-10-08), 2023 list, checked 2026-10-06.
- [M5: Insecure Communication](https://raw.githubusercontent.com/OWASP/www-project-mobile-top-10/f2dc2d6607f3da069e8b91c7a44825fd85c74555/2023-risks/m5-insecure-communication.md): OWASP Project document, Commit f2dc2d6607f3 (2025-10-08), 2023 list, checked 2026-10-06.
- [M6: Inadequate Privacy Controls](https://raw.githubusercontent.com/OWASP/www-project-mobile-top-10/f2dc2d6607f3da069e8b91c7a44825fd85c74555/2023-risks/m6-inadequate-privacy-controls.md): OWASP Project document, Commit f2dc2d6607f3 (2025-10-08), 2023 list, checked 2026-10-06.
- [M7: Insufficient Binary Protection](https://raw.githubusercontent.com/OWASP/www-project-mobile-top-10/f2dc2d6607f3da069e8b91c7a44825fd85c74555/2023-risks/m7-insufficient-binary-protection.md): OWASP Project document, Commit f2dc2d6607f3 (2025-10-08), 2023 list, checked 2026-10-06.
- [M8: Security Misconfiguration](https://raw.githubusercontent.com/OWASP/www-project-mobile-top-10/f2dc2d6607f3da069e8b91c7a44825fd85c74555/2023-risks/m8-security-misconfiguration.md): OWASP Project document, Commit f2dc2d6607f3 (2025-10-08), 2023 list, checked 2026-10-06.
- [M9: Insecure Data Storage](https://raw.githubusercontent.com/OWASP/www-project-mobile-top-10/f2dc2d6607f3da069e8b91c7a44825fd85c74555/2023-risks/m9-insecure-data-storage.md): OWASP Project document, Commit f2dc2d6607f3 (2025-10-08), 2023 list, checked 2026-10-06.
- [M10: Insufficient Cryptography](https://raw.githubusercontent.com/OWASP/www-project-mobile-top-10/f2dc2d6607f3da069e8b91c7a44825fd85c74555/2023-risks/m10-insufficient-cryptography.md): OWASP Project document, Commit f2dc2d6607f3 (2025-10-08), 2023 list, checked 2026-10-06.
