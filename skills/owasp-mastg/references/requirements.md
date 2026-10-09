# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. MASTG tests have no MUST or SHALL keywords; each test states its pass and fail criterion in its Evaluation section, quoted here as written. Apply the ones that match the platform and the MAS profile (L1, L2, P) in the test's front matter. Each is labelled with its test id and the MASWE weakness it checks.

## MASTG-TEST-0200: Files Written to External Storage (Android, MASWE-0007)

Source: https://raw.githubusercontent.com/OWASP/owasp-mastg/v2.0.0/tests-beta/android/MASVS-STORAGE/MASTG-TEST-0200.md

- **MASTG-TEST-0200.** The test case fails if the files found above are not encrypted and leak sensitive data.

## MASTG-TEST-0207: Runtime Storage of Unencrypted Data in the App Sandbox (Android, MASWE-0006)

Source: https://raw.githubusercontent.com/OWASP/owasp-mastg/v2.0.0/tests-beta/android/MASVS-STORAGE/MASTG-TEST-0207.md

- **MASTG-TEST-0207.** The test case fails if you find any sensitive data (keys, passwords, or any data inputted into the app) in the extracted files.

## MASTG-TEST-0216: Sensitive Data Not Excluded From Backup (Android, MASWE-0004)

Source: https://raw.githubusercontent.com/OWASP/owasp-mastg/v2.0.0/tests-beta/android/MASVS-STORAGE/MASTG-TEST-0216.md

- **MASTG-TEST-0216.** The test case fails if any of the files are considered sensitive.

## MASTG-TEST-0300: References to APIs for Storing Unencrypted Data in Private Storage (iOS, MASWE-0006)

Source: https://raw.githubusercontent.com/OWASP/owasp-mastg/v2.0.0/tests-beta/ios/MASVS-STORAGE/MASTG-TEST-0300.md

- **MASTG-TEST-0300.** The test case fails if the sensitive data is not encrypted before being written to private storage or the Keychain API isn't used to store the sensitive data.

## MASTG-TEST-0297: Sensitive Data Exposure Through Logging APIs (iOS, MASWE-0001)

Source: https://raw.githubusercontent.com/OWASP/owasp-mastg/v2.0.0/tests-beta/ios/MASVS-STORAGE/MASTG-TEST-0297.md

- **MASTG-TEST-0297.** The test case fails if the app contains implemented logging paths that log sensitive data.

## MASTG-TEST-0204: Insecure Random API Usage (Android, MASWE-0027)

Source: https://raw.githubusercontent.com/OWASP/owasp-mastg/v2.0.0/tests-beta/android/MASVS-CRYPTO/MASTG-TEST-0204.md

- **MASTG-TEST-0204.** The test case fails if you can find random numbers generated using those APIs that are used in security-relevant contexts, such as generating passwords or authentication tokens.

## MASTG-TEST-0208: Insufficient Key Sizes (Android, MASWE-0009)

Source: https://raw.githubusercontent.com/OWASP/owasp-mastg/v2.0.0/tests-beta/android/MASVS-CRYPTO/MASTG-TEST-0208.md

- **MASTG-TEST-0208.** The test case fails if you can find the use of insufficient key sizes within the source code.

## MASTG-TEST-0233: Hardcoded HTTP URLs (Android, MASWE-0050)

Source: https://raw.githubusercontent.com/OWASP/owasp-mastg/v2.0.0/tests-beta/android/MASVS-NETWORK/MASTG-TEST-0233.md

- **MASTG-TEST-0233.** The test case fails if any HTTP URLs are confirmed to be used for communication.

## MASTG-TEST-0234: Missing Implementation of Server Hostname Verification with SSLSockets (Android, MASWE-0052)

Source: https://raw.githubusercontent.com/OWASP/owasp-mastg/v2.0.0/tests-beta/android/MASVS-NETWORK/MASTG-TEST-0234.md

- **MASTG-TEST-0234.** The test case fails if the app uses `SSLSocket` without a `HostnameVerifier`.

## MASTG-TEST-0242: Missing Certificate Pinning in Network Security Configuration (Android, MASWE-0047)

Source: https://raw.githubusercontent.com/OWASP/owasp-mastg/v2.0.0/tests-beta/android/MASVS-NETWORK/MASTG-TEST-0242.md

- **MASTG-TEST-0242.** The test case fails if no `networkSecurityConfig` is set, or any relevant domain does not enable certificate pinning.

## MASTG-TEST-0396: References to URLSessionDelegate Bypassing Certificate Validation (iOS, MASWE-0052)

Source: https://raw.githubusercontent.com/OWASP/owasp-mastg/v2.0.0/tests-beta/ios/MASVS-NETWORK/MASTG-TEST-0396.md

- **MASTG-TEST-0396.** The test case fails if an implementation of `urlSession(_:didReceive:completionHandler:)` or `urlSession(_:task:didReceive:completionHandler:)` is found that has no corresponding cross-reference to `SecTrustEvaluateWithError`.

## MASTG-TEST-0326: References to APIs Allowing Fallback to Non-Biometric Authentication (Android, MASWE-0045)

Source: https://raw.githubusercontent.com/OWASP/owasp-mastg/v2.0.0/tests-beta/android/MASVS-AUTH/MASTG-TEST-0326.md

- **MASTG-TEST-0326.** The test case fails if the app uses `BiometricPrompt` with authenticators that include `DEVICE_CREDENTIAL` for any sensitive data resource that needs protection.

## MASTG-TEST-0270: References to APIs Detecting Biometric Enrollment Changes (iOS, MASWE-0046)

Source: https://raw.githubusercontent.com/OWASP/owasp-mastg/v2.0.0/tests-beta/ios/MASVS-AUTH/MASTG-TEST-0270.md

- **MASTG-TEST-0270.** The test case fails if the app uses `SecAccessControlCreateWithFlags` with any flag except the `kSecAccessControlBiometryCurrentSet` flag for any sensitive data resource worth protecting.

## MASTG-TEST-0226: Debuggable Flag Enabled in the AndroidManifest (Android, MASWE-0067)

Source: https://raw.githubusercontent.com/OWASP/owasp-mastg/v2.0.0/tests-beta/android/MASVS-RESILIENCE/MASTG-TEST-0226.md

- **MASTG-TEST-0226.** The test case fails if the `debuggable` flag is explicitly set to `true`.

## MASTG-TEST-0225: Usage of Insecure APK Signature Key Size (Android, MASWE-0104)

Source: https://raw.githubusercontent.com/OWASP/owasp-mastg/v2.0.0/tests-beta/android/MASVS-RESILIENCE/MASTG-TEST-0225.md

- **MASTG-TEST-0225.** The test case fails if any of the key sizes (in bits) is less than 2048 (RSA).

## MASTG-TEST-0324: References to Root Detection Mechanisms (Android, MASWE-0097)

Source: https://raw.githubusercontent.com/OWASP/owasp-mastg/v2.0.0/tests-beta/android/MASVS-RESILIENCE/MASTG-TEST-0324.md

- **MASTG-TEST-0324.** The test case fails if the app does not implement any root detection checks.

## MASTG-TEST-0338: References to Storage Integrity Check APIs (Android, MASWE-0105)

Source: https://raw.githubusercontent.com/OWASP/owasp-mastg/v2.0.0/tests-beta/android/MASVS-RESILIENCE/MASTG-TEST-0338.md

- **MASTG-TEST-0338.** The test case fails if the app uses data loaded from local storage (`SharedPreferences`, files, or databases) in a security-relevant decision without verifying its integrity and authenticity beforehand.

## MASTG-TEST-0206: Undeclared PII in Network Traffic Capture (Android, MASWE-0108)

Source: https://raw.githubusercontent.com/OWASP/owasp-mastg/v2.0.0/tests-beta/android/MASVS-PRIVACY/MASTG-TEST-0206.md

- **MASTG-TEST-0206.** The test case fails if you can find the PII you entered in the app that is not declared in the app's marketplace privacy declarations (e.g., Data Safety section in Google Play) and/or in its privacy policy.
