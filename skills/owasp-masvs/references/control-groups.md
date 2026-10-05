# Control groups, controls and weaknesses

Read this when walking the controls in a review, writing requirements, or filing a finding. Sources: the MASVS v2.1.0 `Document/` and `controls/` files, and the MASWE catalogue (website and the v1.0.0 `OWASP_MASWE.yaml`), listed in [Sources](../SKILL.md#sources). Control statements are quoted from MASVS v2.1.0. Weakness titles and profiles are from MASWE 1.0; "Platform" is both Android and iOS unless marked.

## How to read this file

- A **control** (`MASVS-<GROUP>-<n>`) is a high-level, platform-agnostic requirement (MASTG v2.0.0 release, MASTG v2).
- A **weakness** (`MASWE-<nnnn>`) is a security or privacy issue that can be introduced into an app, categorised under a control. It is not a vulnerability, but it can lead to one (MASWE, About the MASWE). Each weakness has Overview, Modes of Introduction, Impact and Mitigations (MASWE v1.0.0 release, Standardized page structure).
- Profiles live on the weakness: L1, L2, R or P. Most weaknesses are also in the specialized EUDIW profile on the website; that column is left out here.
- Use the weakness's Modes of Introduction as the review checklist and its Mitigations as the fix.

## MASVS-STORAGE: Storage

Secure storage of sensitive data on a device (data-at-rest) (Using the MASVS, Mobile Application Security Model).

- **MASVS-STORAGE-1**: "The app securely stores sensitive data." Covers data stored intentionally, in private or public locations.
- **MASVS-STORAGE-2**: "The app prevents leakage of sensitive data." Covers unintentional leaks through APIs, backups and logs.

| Weakness   | Title                                                        | Control   | Profiles |
| ---------- | ------------------------------------------------------------ | --------- | -------- |
| MASWE-0001 | Sensitive Data Stored Unencrypted in Private Storage         | STORAGE-1 | L2       |
| MASWE-0002 | Sensitive Data Stored Unencrypted Outside of Private Storage | STORAGE-1 | L1, L2   |
| MASWE-0003 | Cryptographic Keys Stored Outside of Platform Keystore       | STORAGE-1 | L1, L2   |
| MASWE-0004 | Sensitive Data Hardcoded in the App Package                  | STORAGE-1 | L1, L2   |
| MASWE-0005 | Insertion of Sensitive Data into Logs                        | STORAGE-2 | L1, L2   |
| MASWE-0006 | Sensitive Data Not Excluded From Backup                      | STORAGE-2 | L1, L2   |

The profile split on MASWE-0001 and MASWE-0002 is the example the MASVS 2.0.0 release gives for moving levels to tests: unencrypted data in internal storage is acceptable for L1, L2 requires encryption.

## MASVS-CRYPTO: Cryptography

Cryptographic functionality used to protect sensitive data. Best practice is "typically defined in external standards such as NIST.SP.800-175B and NIST.SP.800-57" (MASVS-CRYPTO).

- **MASVS-CRYPTO-1**: "The app employs current strong cryptography and uses it according to industry best practices."
- **MASVS-CRYPTO-2**: "The app performs key management according to industry best practices." Covers generation, storage and protection of keys across their lifecycle.

| Weakness   | Title                                             | Control  | Profiles |
| ---------- | ------------------------------------------------- | -------- | -------- |
| MASWE-0007 | Improper Encryption                               | CRYPTO-1 | L1, L2   |
| MASWE-0008 | Improper Hashing                                  | CRYPTO-1 | L1, L2   |
| MASWE-0009 | Improper Use of Message Authentication Code (MAC) | CRYPTO-1 | L1, L2   |
| MASWE-0010 | Improper Generation of Cryptographic Signatures   | CRYPTO-1 | L1, L2   |
| MASWE-0011 | Improper Verification of Cryptographic Signature  | CRYPTO-1 | L1, L2   |
| MASWE-0012 | Improper Random Number Generation                 | CRYPTO-1 | L1, L2   |
| MASWE-0013 | Improper Cryptographic Key Generation             | CRYPTO-2 | L1, L2   |
| MASWE-0014 | Improper Cryptographic Key Derivation             | CRYPTO-2 | L1, L2   |
| MASWE-0015 | Cryptographic Key Rotation Not Implemented        | CRYPTO-2 | L2       |
| MASWE-0016 | Cryptographic Key Access Not Restricted           | CRYPTO-2 | L2       |
| MASWE-0017 | Device Secure Lock Not Enforced                   | CRYPTO-2 | L2       |

Context matters: a weak random number generator for shuffling a game list, or hashing a non-sensitive value, is not a finding; Base64 is encoding, not encryption (MASTG, Identifying Security-Relevant Contexts in Code).

## MASVS-AUTH: Authentication and authorization

Authentication and authorization mechanisms used by the app. Enforcement must be on the remote endpoint, and the endpoint itself is validated with the OWASP ASVS (MASVS-AUTH).

- **MASVS-AUTH-1**: "The app uses secure authentication and authorization protocols and follows the relevant best practices."
- **MASVS-AUTH-2**: "The app performs local authentication securely according to the platform best practices." Covers biometrics and local PIN, including apps with no remote endpoint.
- **MASVS-AUTH-3**: "The app secures sensitive operations with additional authentication."

| Weakness   | Title                                                                    | Control | Profiles |
| ---------- | ------------------------------------------------------------------------ | ------- | -------- |
| MASWE-0018 | Lack of Authentication or Authorization on App Components                | AUTH-1  | L1, L2   |
| MASWE-0019 | Lack of Auto-fill Support for Credential Providers                       | AUTH-1  | L1, L2   |
| MASWE-0020 | Local Authentication Can Be Bypassed                                     | AUTH-2  | L2       |
| MASWE-0021 | Fallback to Non-biometric Credentials Allowed for Sensitive Transactions | AUTH-2  | L2       |
| MASWE-0022 | Crypto Keys Not Invalidated on New Biometric Enrollment                  | AUTH-2  | L2       |
| MASWE-0023 | Step-Up Authentication Not Implemented for Sensitive Actions             | AUTH-3  | L2       |
| MASWE-0024 | Sensitive Data Accessible After Session Termination                      | AUTH-3  | L2       |
| MASWE-0025 | Lack of Non-Repudiation for Critical Actions                             | AUTH-3  | L2       |

## MASVS-NETWORK: Network communication

Secure network communication between the app and remote endpoints (data-in-transit). The risk is a developer disabling platform secure defaults or bypassing them with low-level APIs or third-party libraries (MASVS-NETWORK).

- **MASVS-NETWORK-1**: "The app secures all network traffic according to the current best practices."
- **MASVS-NETWORK-2**: "The app performs identity pinning for all remote endpoints under the developer's control." That is, trust only specific CAs: certificate or public key pinning.

| Weakness   | Title                           | Control   | Profiles |
| ---------- | ------------------------------- | --------- | -------- |
| MASWE-0026 | Network Traffic Not Encrypted   | NETWORK-1 | L1, L2   |
| MASWE-0027 | Insecure Certificate Validation | NETWORK-1 | L1, L2   |
| MASWE-0028 | Insecure Identity Pinning       | NETWORK-2 | L2       |

## MASVS-PLATFORM: Platform interaction

Secure interaction with the platform and other installed apps: IPC, WebViews and the user interface (MASVS-PLATFORM).

- **MASVS-PLATFORM-1**: "The app uses IPC mechanisms securely."
- **MASVS-PLATFORM-2**: "The app uses WebViews securely." Includes JavaScript bridges to native code.
- **MASVS-PLATFORM-3**: "The app uses the user interface securely." Covers screenshots, notifications, shoulder surfing and shared devices.

| Weakness   | Title                                                                           | Control    | Profiles | Platform |
| ---------- | ------------------------------------------------------------------------------- | ---------- | -------- | -------- |
| MASWE-0029 | Insecure Deep Links                                                             | PLATFORM-1 | L1, L2   |          |
| MASWE-0030 | Improper Use of the Clipboard                                                   | PLATFORM-1 | L1, L2   |          |
| MASWE-0031 | Allowing Untrusted App Extensions                                               | PLATFORM-1 | L1, L2   | iOS      |
| MASWE-0032 | Insecure Intents                                                                | PLATFORM-1 | L1, L2   | Android  |
| MASWE-0033 | Sensitive Native Functionality Exposed in WebViews                              | PLATFORM-2 | L1, L2   |          |
| MASWE-0034 | WebViews Allow Access to Local Resources with Untrusted Content                 | PLATFORM-2 | L1, L2   |          |
| MASWE-0035 | WebViews Loading Untrusted Content                                              | PLATFORM-2 | L1, L2   |          |
| MASWE-0036 | Unnecessary Exposure of Sensitive Data via the User Interface                   | PLATFORM-3 | L2       |          |
| MASWE-0037 | Unnecessary Exposure of Sensitive Data via Notifications                        | PLATFORM-3 | L2       |          |
| MASWE-0038 | Insufficient Protection of Sensitive Data from Screenshots or Screen Recordings | PLATFORM-3 | L2       |          |
| MASWE-0039 | App Vulnerable to Overlay Attacks                                               | PLATFORM-3 | L2       |          |
| MASWE-0040 | Sensitive Data Leaked via Accessibility Services                                | PLATFORM-3 | L2       |          |

WebView XSS is in scope; CSRF and reflected XSS reported by backend web scanners are usually false positives for a mobile app, because links open in the default browser with its own cookie store (MASTG, Avoiding False Positives).

## MASVS-CODE: Code quality

Security best practices for data processing and keeping the app up to date (MASVS-CODE).

- **MASVS-CODE-1**: "The app requires an up-to-date platform version."
- **MASVS-CODE-2**: "The app has a mechanism for enforcing app updates."
- **MASVS-CODE-3**: "The app only uses software components without known vulnerabilities."
- **MASVS-CODE-4**: "The app validates and sanitizes all untrusted inputs." Entry points include the UI, IPC, the network and the file system.

| Weakness   | Title                                                       | Control | Profiles |
| ---------- | ----------------------------------------------------------- | ------- | -------- |
| MASWE-0041 | Running on a Recent Platform Version Not Ensured            | CODE-1  | L2       |
| MASWE-0042 | Latest Platform Version Not Targeted                        | CODE-1  | L1, L2   |
| MASWE-0043 | Enforced Updating Not Implemented                           | CODE-2  | L2       |
| MASWE-0044 | Dependencies with Known Vulnerabilities                     | CODE-3  | L1, L2   |
| MASWE-0045 | Compiler-Provided Security Features Not Used                | CODE-3  | L2       |
| MASWE-0046 | Use of Deprecated APIs or Functionality                     | CODE-3  | L2       |
| MASWE-0047 | Using Non-Standard APIs for Security-Critical Functionality | CODE-3  | L1, L2   |
| MASWE-0048 | Malicious Code Included in the App                          | CODE-3  | L1, L2   |
| MASWE-0049 | Unsafe Dynamic Code Loading                                 | CODE-4  | L2       |
| MASWE-0050 | Unsafe Handling of Untrusted Data                           | CODE-4  | L1, L2   |

## MASVS-RESILIENCE: Resilience against reverse engineering and tampering

Defense-in-depth measures such as obfuscation, anti-debugging and anti-tampering. "The lack of any of these measures does not necessarily cause vulnerabilities"; they add threat-specific protection to apps that also meet the rest of the MASVS (MASVS-RESILIENCE).

- **MASVS-RESILIENCE-1**: "The app validates the integrity of the platform."
- **MASVS-RESILIENCE-2**: "The app implements anti-tampering mechanisms."
- **MASVS-RESILIENCE-3**: "The app implements anti-static analysis mechanisms."
- **MASVS-RESILIENCE-4**: "The app implements anti-dynamic analysis techniques."

| Weakness   | Title                                                    | Control      | Profiles |
| ---------- | -------------------------------------------------------- | ------------ | -------- |
| MASWE-0051 | Root/Jailbreak Detection Not Implemented                 | RESILIENCE-1 | R        |
| MASWE-0052 | App Virtualization Environment Detection Not Implemented | RESILIENCE-1 | R        |
| MASWE-0053 | Emulated or Virtual Device Detection Not Implemented     | RESILIENCE-1 | R        |
| MASWE-0054 | Device Attestation Not Implemented                       | RESILIENCE-1 | R        |
| MASWE-0055 | Malware Detection Not Implemented                        | RESILIENCE-2 | R        |
| MASWE-0056 | App Attestation Not Implemented                          | RESILIENCE-2 | R        |
| MASWE-0057 | App Resources Integrity Not Verified                     | RESILIENCE-2 | R        |
| MASWE-0058 | Runtime Code Integrity Not Verified                      | RESILIENCE-2 | R        |
| MASWE-0059 | Code Obfuscation Not Implemented                         | RESILIENCE-3 | R        |
| MASWE-0060 | Resource Obfuscation Not Implemented                     | RESILIENCE-3 | R        |
| MASWE-0061 | Debug Artifacts Not Removed                              | RESILIENCE-3 | R        |
| MASWE-0062 | No Application-Level Payload Encryption                  | RESILIENCE-3 | R        |
| MASWE-0063 | Debug Mechanisms Not Disabled                            | RESILIENCE-4 | R        |
| MASWE-0064 | Debugger Detection Not Implemented                       | RESILIENCE-4 | R        |
| MASWE-0065 | Dynamic Analysis Tools Detection Not Implemented         | RESILIENCE-4 | R        |

Only file these under the R profile. A missing resilience measure in an app scoped to L1 or L2 alone is not a failure.

## MASVS-PRIVACY: Privacy

Added in MASVS 2.1.0. A baseline for user privacy, focused on what can be tested in the app itself; what happens to data on remote endpoints is out of scope, and "collect" and "share" are treated alike as data leaving the user's control (MASVS-PRIVACY).

- **MASVS-PRIVACY-1**: "The app minimizes access to sensitive data and resources." Includes making third-party SDKs honour consent and not collect before consent.
- **MASVS-PRIVACY-2**: "The app prevents identification of the user." Unlinkability, and keeping fingerprint-like signals to their purpose.
- **MASVS-PRIVACY-3**: "The app is transparent about data collection and usage." Including platform data declarations.
- **MASVS-PRIVACY-4**: "The app offers user control over their data." Manage, delete and modify data, revoke consent, re-prompt when more data is needed.

| Weakness   | Title                                              | Control   | Profiles |
| ---------- | -------------------------------------------------- | --------- | -------- |
| MASWE-0066 | Inadequate Permission Management                   | PRIVACY-1 | P        |
| MASWE-0067 | Lack of Anonymization or Pseudonymisation Measures | PRIVACY-2 | P        |
| MASWE-0068 | Incorrect Use of Identifiers for User Tracking     | PRIVACY-2 | P        |
| MASWE-0069 | Usage of Non-Privacy-Preserving Functionality      | PRIVACY-2 | P        |
| MASWE-0070 | Inadequate Awareness for Privacy Relevant Actions  | PRIVACY-2 | P        |
| MASWE-0071 | Inadequate Defaults for Privacy Relevant Actions   | PRIVACY-2 | P        |
| MASWE-0072 | Inadequate Privacy Policy                          | PRIVACY-3 | P        |
| MASWE-0073 | Inadequate Data Collection Declarations            | PRIVACY-3 | P        |
| MASWE-0074 | Inadequate Tracking Domains Declarations           | PRIVACY-3 | P        |
| MASWE-0075 | Non-Reproducible Builds                            | PRIVACY-3 | P        |
| MASWE-0076 | Lack of Proper Data Management Controls            | PRIVACY-4 | P        |
| MASWE-0077 | Inadequate Data Visibility Controls                | PRIVACY-4 | P        |
| MASWE-0078 | Inadequate or Ambiguous User Consent Mechanisms    | PRIVACY-4 | P        |

## Out of scope for MASVS

- Remote endpoints and web services: verify with the OWASP ASVS, test with the OWASP WSTG; IoT companions with the OWASP ISTG (Assessment and Certification).
- Secure SDLC, architecture and threat modeling: MASVS assumes them and points to OWASP SAMM and NIST SP 800-218 SSDF (Using the MASVS, Assumptions).
- Legal privacy assessments such as a GDPR DPIA (MASVS-PRIVACY, Important disclaimer).

## Applicability

MASVS applies to native, cross-platform (Flutter, React Native, Xamarin, Ionic) and hybrid apps; follow the security practices of the framework too, since it can add issues native apps do not have. It also applies to preloaded apps and to SDKs, which should be evaluated as projects of their own (Using the MASVS, Applicability of the MASVS).

## Common mistakes

- Filing a `MASWE-*` ID from MASTG 2.0.0 metadata without translating it from beta numbering (see [`versions.md`](versions.md)).
- Reporting a missing root detection or obfuscation as a vulnerability in an L1 or L2 assessment.
- Filing backend findings (session timeout, password policy, brute-force limits) under MASVS-AUTH; they belong to the ASVS.
- Treating `MASVS-PRIVACY` as legal compliance.
