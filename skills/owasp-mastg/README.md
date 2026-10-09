# owasp-mastg

An agent skill for OWASP MASTG: testing iOS and Android app security with the OWASP Mobile Application Security Testing Guide.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill owasp-mastg
```

Then ask your agent to apply OWASP MASTG.

## What it covers

- The OWASP Mobile Application Security Testing Guide (MASTG) v2.0.0: the pass and fail criteria of its atomic tests (MASTG-TEST ids), each mapped to a MASVS category and a MASWE weakness, read from the project's Markdown source at the v2.0.0 release tag.

## Versions

| Line        | Status  |
| ----------- | ------- |
| OWASP MASTG | current |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [MASTG-TEST-0200: Files Written to External Storage (Android, MASWE-0007)](https://raw.githubusercontent.com/OWASP/owasp-mastg/v2.0.0/tests-beta/android/MASVS-STORAGE/MASTG-TEST-0200.md): OWASP Flagship Project guide, Tag v2.0.0 (2026-06-30).
- [MASTG-TEST-0207: Runtime Storage of Unencrypted Data in the App Sandbox (Android, MASWE-0006)](https://raw.githubusercontent.com/OWASP/owasp-mastg/v2.0.0/tests-beta/android/MASVS-STORAGE/MASTG-TEST-0207.md): OWASP Flagship Project guide, Tag v2.0.0 (2026-06-30).
- [MASTG-TEST-0216: Sensitive Data Not Excluded From Backup (Android, MASWE-0004)](https://raw.githubusercontent.com/OWASP/owasp-mastg/v2.0.0/tests-beta/android/MASVS-STORAGE/MASTG-TEST-0216.md): OWASP Flagship Project guide, Tag v2.0.0 (2026-06-30).
- [MASTG-TEST-0300: References to APIs for Storing Unencrypted Data in Private Storage (iOS, MASWE-0006)](https://raw.githubusercontent.com/OWASP/owasp-mastg/v2.0.0/tests-beta/ios/MASVS-STORAGE/MASTG-TEST-0300.md): OWASP Flagship Project guide, Tag v2.0.0 (2026-06-30).
- [MASTG-TEST-0297: Sensitive Data Exposure Through Logging APIs (iOS, MASWE-0001)](https://raw.githubusercontent.com/OWASP/owasp-mastg/v2.0.0/tests-beta/ios/MASVS-STORAGE/MASTG-TEST-0297.md): OWASP Flagship Project guide, Tag v2.0.0 (2026-06-30).
- [MASTG-TEST-0204: Insecure Random API Usage (Android, MASWE-0027)](https://raw.githubusercontent.com/OWASP/owasp-mastg/v2.0.0/tests-beta/android/MASVS-CRYPTO/MASTG-TEST-0204.md): OWASP Flagship Project guide, Tag v2.0.0 (2026-06-30).
- [MASTG-TEST-0208: Insufficient Key Sizes (Android, MASWE-0009)](https://raw.githubusercontent.com/OWASP/owasp-mastg/v2.0.0/tests-beta/android/MASVS-CRYPTO/MASTG-TEST-0208.md): OWASP Flagship Project guide, Tag v2.0.0 (2026-06-30).
- [MASTG-TEST-0233: Hardcoded HTTP URLs (Android, MASWE-0050)](https://raw.githubusercontent.com/OWASP/owasp-mastg/v2.0.0/tests-beta/android/MASVS-NETWORK/MASTG-TEST-0233.md): OWASP Flagship Project guide, Tag v2.0.0 (2026-06-30).
- [MASTG-TEST-0234: Missing Implementation of Server Hostname Verification with SSLSockets (Android, MASWE-0052)](https://raw.githubusercontent.com/OWASP/owasp-mastg/v2.0.0/tests-beta/android/MASVS-NETWORK/MASTG-TEST-0234.md): OWASP Flagship Project guide, Tag v2.0.0 (2026-06-30).
- [MASTG-TEST-0242: Missing Certificate Pinning in Network Security Configuration (Android, MASWE-0047)](https://raw.githubusercontent.com/OWASP/owasp-mastg/v2.0.0/tests-beta/android/MASVS-NETWORK/MASTG-TEST-0242.md): OWASP Flagship Project guide, Tag v2.0.0 (2026-06-30).
- [MASTG-TEST-0396: References to URLSessionDelegate Bypassing Certificate Validation (iOS, MASWE-0052)](https://raw.githubusercontent.com/OWASP/owasp-mastg/v2.0.0/tests-beta/ios/MASVS-NETWORK/MASTG-TEST-0396.md): OWASP Flagship Project guide, Tag v2.0.0 (2026-06-30).
- [MASTG-TEST-0326: References to APIs Allowing Fallback to Non-Biometric Authentication (Android, MASWE-0045)](https://raw.githubusercontent.com/OWASP/owasp-mastg/v2.0.0/tests-beta/android/MASVS-AUTH/MASTG-TEST-0326.md): OWASP Flagship Project guide, Tag v2.0.0 (2026-06-30).
- [MASTG-TEST-0270: References to APIs Detecting Biometric Enrollment Changes (iOS, MASWE-0046)](https://raw.githubusercontent.com/OWASP/owasp-mastg/v2.0.0/tests-beta/ios/MASVS-AUTH/MASTG-TEST-0270.md): OWASP Flagship Project guide, Tag v2.0.0 (2026-06-30).
- [MASTG-TEST-0226: Debuggable Flag Enabled in the AndroidManifest (Android, MASWE-0067)](https://raw.githubusercontent.com/OWASP/owasp-mastg/v2.0.0/tests-beta/android/MASVS-RESILIENCE/MASTG-TEST-0226.md): OWASP Flagship Project guide, Tag v2.0.0 (2026-06-30).
- [MASTG-TEST-0225: Usage of Insecure APK Signature Key Size (Android, MASWE-0104)](https://raw.githubusercontent.com/OWASP/owasp-mastg/v2.0.0/tests-beta/android/MASVS-RESILIENCE/MASTG-TEST-0225.md): OWASP Flagship Project guide, Tag v2.0.0 (2026-06-30).
- [MASTG-TEST-0324: References to Root Detection Mechanisms (Android, MASWE-0097)](https://raw.githubusercontent.com/OWASP/owasp-mastg/v2.0.0/tests-beta/android/MASVS-RESILIENCE/MASTG-TEST-0324.md): OWASP Flagship Project guide, Tag v2.0.0 (2026-06-30).
- [MASTG-TEST-0338: References to Storage Integrity Check APIs (Android, MASWE-0105)](https://raw.githubusercontent.com/OWASP/owasp-mastg/v2.0.0/tests-beta/android/MASVS-RESILIENCE/MASTG-TEST-0338.md): OWASP Flagship Project guide, Tag v2.0.0 (2026-06-30).
- [MASTG-TEST-0206: Undeclared PII in Network Traffic Capture (Android, MASWE-0108)](https://raw.githubusercontent.com/OWASP/owasp-mastg/v2.0.0/tests-beta/android/MASVS-PRIVACY/MASTG-TEST-0206.md): OWASP Flagship Project guide, Tag v2.0.0 (2026-06-30).

## License

MIT
