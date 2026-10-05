---
name: owasp-masvs
description: >-
  OWASP MASVS 2.1 mobile app security: review and harden iOS and Android apps against the 24 MASVS controls in eight groups (MASVS-STORAGE, -CRYPTO, -AUTH, -NETWORK, -PLATFORM, -CODE, -RESILIENCE, -PRIVACY), pick MAS testing profiles (MAS-L1, MAS-L2, MAS-R, MAS-P), and trace each control to MASWE 1.0 weaknesses and MASTG 2.0 tests. Use when scoping or running a mobile app security assessment or pentest, writing mobile security requirements, reviewing Swift, Kotlin, Java, Flutter or React Native code for insecure storage, weak crypto, TLS and pinning, IPC, deep links, WebViews, biometrics, root or jailbreak detection, obfuscation or privacy, or mapping findings to MASVS IDs. Also upgrades MASVS 1.5 checklists (V1 to V8, MSTG-* IDs, levels L1, L2 and R) to 2.x, and MASWE beta IDs to the stable 1.0 numbering. Triggers: MASVS, MASTG, MSTG, MASWE, MAS profiles, mobile application security verification standard, mobile security testing guide.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.0"
  kind: standard
---

# OWASP MASVS

The OWASP Mobile Application Security Verification Standard (MASVS) is the OWASP MAS project's standard for mobile app security: high-level, platform-agnostic controls grouped by attack surface. Its companions are the MASWE, which lists the weaknesses behind each control, and the MASTG, which gives per-platform tests. With this skill the agent scopes, reviews and reports on an iOS or Android app against MASVS 2.1, picks MAS testing profiles, and cites MASWE and MASTG IDs correctly.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources), with the section it cites. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: developer (building to the controls), reviewer or tester (assessing an app), or requirements author.
- Target version: MASVS 2.1 (default), with MASWE 1.0 for weakness IDs and MASTG 2.0 for tests. MASVS 1.5, MASTG 1.7 and MASWE beta are legacy: read them and upgrade from them, never author against them. No preview exists. See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill or when a rule looks out of date, re-read every URL in [Sources](#sources) first, check the releases of `OWASP/masvs`, `OWASP/mastg` and `OWASP/maswe` for new tags, and update the pins.
- Platforms and frameworks: Android, iOS or both; native or cross-platform (Flutter, React Native and others).
- Access: black-box (app package only), gray-box or white-box (source, documentation, test accounts). Release and debug builds.
- Threat model and data classification: what counts as sensitive data, sensitive functionality and business assets for this app.

## Invariants

1. **Cite controls by their 2.x IDs.** A control is `MASVS-<GROUP>-<n>`; there are eight groups and 24 controls in 2.1 (MASVS 2.1, Using the MASVS, Mobile Application Security Model; `controls/`). Never cite 1.x `MSTG-*` or `V<n>.<m>` IDs for new work.
2. **Controls have no levels.** MASVS 2.x removed L1, L2 and R from the controls; levels became MAS testing profiles, assigned to tests and weaknesses rather than to controls (MASVS 2.0.0 release, "Why are there no levels"; MASVS 2.1, MAS Testing Profiles).
3. **Profiles are a risk-based choice.** Pick L1, L2, R and P from a threat model; fully or partially applying them is a decision made with business owners, and every deviation is justified and documented (MASVS 2.1, MAS Testing Profiles; MAS Profiles).
4. **MAS-R adds to L1 or L2, never replaces them.** Lacking resilience measures is not in itself a vulnerability (MAS-R; MASVS 2.1, MASVS-RESILIENCE).
5. **MASVS covers the app only.** Remote endpoints are out of scope; verify them against the OWASP ASVS and test them with the WSTG (MASVS 2.1, Assessment and Certification, Guidance for Certifying Mobile Apps). Enforcement of authentication and authorization belongs on the remote endpoint (MASVS-AUTH-1).
6. **Tools alone do not verify MASVS.** Automated scanners are encouraged, but MASVS verification needs an understanding of the architecture and business logic (Assessment and Certification, The Role of Automated Security Testing Tools). Confirm findings by exploit scenario, not scanner output (MASTG, Mobile App Security Testing, Avoiding False Positives).
7. **Reports state scope and evidence.** Include the verification scope (call out out-of-scope components), passed and failed tests, how to fix each failure, and enough evidence that every verified control was really tested (Assessment and Certification).
8. **No one is "OWASP certified".** OWASP does not certify vendors, verifiers or apps; never claim official OWASP MASVS certification (Assessment and Certification).
9. **Weakness IDs are MASWE 1.0 IDs.** MASWE 1.0.0 renumbered every weakness once (`MASWE-0001` to `MASWE-0078`); IDs from the beta, including those in MASTG 2.0.0 test metadata, mean something else and must be translated (MASWE v1.0.0 release).
10. **MASVS-PRIVACY is a baseline, not a DPIA.** It never replaces a GDPR Data Protection Impact Assessment or other legal assessment (MASVS-PRIVACY, Important disclaimer).

## Workflow

1. **Pick the version.** Use MASVS 2.1, MASWE 1.0 and MASTG 2.0. If the client's checklist uses `MSTG-*` IDs, V1 to V8 or levels, plan the upgrade (step 8).
   -> [`references/versions.md`](references/versions.md)
   ✓ The report and requirements name MASVS 2.1 and cite only 2.x control IDs.
2. **Prepare and scope.** Agree the scope, testing goals, sensitive data definition and access with stakeholders; request a release build and a debug build with security controls deactivated; get written authorization (MASTG, Preparation).
   -> [`references/profiles-and-testing.md`](references/profiles-and-testing.md)
   ✓ "Sensitive data" is defined before testing starts, and out-of-scope components are listed.
3. **Choose profiles.** Map the app's data, functionality and business assets to MAS-L1, MAS-L2, MAS-R and MAS-P, or build a custom profile from a threat model.
   -> [`references/profiles-and-testing.md`](references/profiles-and-testing.md)
   ✓ The chosen combination (for example L2+P) and every dropped weakness are written down with a reason.
4. **Walk the controls.** For each of the 24 controls in scope, list its MASWE weaknesses filtered by profile and platform.
   -> [`references/control-groups.md`](references/control-groups.md)
   ✓ Every in-scope control has a list of weaknesses to check, with MASWE 1.0 IDs.
5. **Test each weakness.** Run the MASTG 2.0 tests for the weakness on each platform; where none exists, test from the weakness's Modes of Introduction and related MASTG knowledge and techniques (MASWE, How to proceed when no MASTG TEST exists).
   -> [`references/profiles-and-testing.md`](references/profiles-and-testing.md)
   ✓ Each weakness is pass, fail or not applicable, with evidence; nothing passes on scanner output alone.
6. **Separate app from backend.** Move server-side findings (session expiry, password policy, rate limiting) to an ASVS or WSTG assessment.
   -> [`references/control-groups.md`](references/control-groups.md)
   ✓ No MASVS finding depends on server-side behaviour the app cannot control.
7. **Report.** Group findings by control, cite `MASVS-*`, `MASWE-*` and `MASTG-TEST-*` IDs, prioritise by damage potential, reproducibility, exploitability, affected users and discoverability, and give a fix per finding (MASTG, Exploitation and Reporting).
   -> [`references/control-groups.md`](references/control-groups.md)
   ✓ The report has scope, methods, passed and failed checks, fixes, and no claim of OWASP certification.
8. **Upgrade** (only when asked). Translate a MASVS 1.5 checklist, MASTG 1.x test IDs or MASWE beta IDs to the current lines.
   -> [`references/upgrade-from-1.md`](references/upgrade-from-1.md) and [`references/versions.md`](references/versions.md)
   ✓ Every old requirement is mapped to a 2.x control or recorded as out of scope, and no level labels remain on controls.

## Verify before done

- [ ] Every control ID cited exists in MASVS 2.1 (`MASVS-STORAGE-1` to `MASVS-PRIVACY-4`, 24 in total).
- [ ] No control carries a level; profiles are attached to weaknesses or tests, and the chosen profiles are justified.
- [ ] Every MASWE ID is a 1.0 ID and its title matches the MASWE catalogue; beta IDs were translated.
- [ ] MAS-R is never the only profile applied.
- [ ] Remote endpoint issues are referred to the ASVS or WSTG, not filed under MASVS.
- [ ] The report states scope, evidence for each verified control, and how to fix each failure.
- [ ] Privacy findings do not claim to replace a DPIA.

## Reference index

- **`references/versions.md`**: the MASVS, MASTG and MASWE version lines, what each release changed, and upgrade steps. Load for steps 1 and 8.
- **`references/control-groups.md`**: the eight groups and 24 controls with their statements, and the MASWE 1.0 weaknesses under each with profiles and platforms. Load for steps 4, 6 and 7.
- **`references/profiles-and-testing.md`**: MAS-L1, -L2, -R, -P and the EUDIW profile, choosing and tailoring them, how MASVS, MASWE and MASTG link, MASTG test structure, and the MASTG testing process. Load for steps 2, 3 and 5.
- **`references/upgrade-from-1.md`**: MASVS 1.5 V1 to V8, the levels, and the published mappings from `MSTG-*` requirements to 2.x controls and MASWE weaknesses. Load for step 8.

## Related skills

- `owasp-asvs` for the remote endpoints and backend APIs the app talks to: `npx skills add ScaleDockHQ/scaledock-skills --skill owasp-asvs`.
- `owasp-top-10` for web application risk categories: `npx skills add ScaleDockHQ/scaledock-skills --skill owasp-top-10`.
- `webauthn` for passkeys and platform authenticators in MASVS-AUTH work: `npx skills add ScaleDockHQ/scaledock-skills --skill webauthn`.
- `oauth` for the authorization protocols behind MASVS-AUTH-1: `npx skills add ScaleDockHQ/scaledock-skills --skill oauth`.
- `cyclonedx` for the CycloneDX edition of the MASVS and for SBOMs: `npx skills add ScaleDockHQ/scaledock-skills --skill cyclonedx`.

## Sources

Status uses the publishing body's own maturity term. Checked is the date the source was last read.

- [OWASP MASVS v2.1.0 release](https://github.com/OWASP/masvs/releases/tag/v2.1.0): Released (latest), v2.1.0 (2024-01-18), checked 2026-10-05.
- [OWASP MASVS v2.1.0 document](https://github.com/OWASP/masvs/tree/v2.1.0/Document): Released, v2.1.0, checked 2026-10-05.
- [OWASP MASVS v2.1.0 controls](https://github.com/OWASP/masvs/tree/v2.1.0/controls): Released, v2.1.0, checked 2026-10-05.
- [OWASP MASVS v2.0.0 release](https://github.com/OWASP/masvs/releases/tag/v2.0.0): Released (superseded by v2.1.0), v2.0.0 (2023-04-01), checked 2026-10-05.
- [OWASP MASVS v1.5.0 document](https://github.com/OWASP/masvs/tree/v1.5.0/Document): Released (last 1.x), v1.5.0 (2023-01-31), checked 2026-10-05.
- [OWASP MASVS unreleased changes since v2.1.0](https://github.com/OWASP/masvs/compare/v2.1.0...master): development branch, 19 commits ahead, checked 2026-10-05.
- [OWASP MASVS website](https://mas.owasp.org/MASVS/): website (tracks the development branch), checked 2026-10-05.
- [OWASP MASTG website](https://mas.owasp.org/MASTG/): website (tracks the development branch), checked 2026-10-05.
- [OWASP MASTG v2.0.0 release](https://github.com/OWASP/mastg/releases/tag/v2.0.0): Released (latest), v2.0.0 (2026-06-30), checked 2026-10-05.
- [OWASP MASTG v2.0.0 tests](https://github.com/OWASP/mastg/tree/v2.0.0/tests-beta): Released, v2.0.0, checked 2026-10-05.
- [OWASP MASTG v2.0.0 Mobile App Security Testing](https://github.com/OWASP/mastg/blob/v2.0.0/Document/0x04b-Mobile-App-Security-Testing.md): Released, v2.0.0, checked 2026-10-05.
- [OWASP MASTG v1.7.0 release](https://github.com/OWASP/mastg/releases/tag/v1.7.0): Released (last 1.x), v1.7.0 (2023-10-31), checked 2026-10-05.
- [OWASP MASTG pull request 3979: Remove profiles from MASTG tests](https://github.com/OWASP/mastg/pull/3979): merged 2026-09-17, unreleased, checked 2026-10-05.
- [OWASP MASWE website](https://mas.owasp.org/MASWE/): website, checked 2026-10-05.
- [OWASP MASWE v1.0.0 release](https://github.com/OWASP/maswe/releases/tag/v1.0.0): Released (first stable), v1.0.0 (2026-08-17), checked 2026-10-05.
- [OWASP MASWE v1.0.0 YAML](https://github.com/OWASP/maswe/releases/download/v1.0.0/OWASP_MASWE.yaml): Released, v1.0.0, checked 2026-10-05.
- [MAS Testing Profiles](https://mas.owasp.org/Profiles/): website, with the MAS-L1, MAS-L2, MAS-R, MAS-P and MAS-EUDIW pages, checked 2026-10-05.
- [Using MAS Profiles](https://mas.owasp.org/Profiles/Using-MAS-Profiles/): website, checked 2026-10-05.
