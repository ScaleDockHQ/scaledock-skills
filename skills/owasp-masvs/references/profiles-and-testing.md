# Profiles and testing

Read this when scoping an assessment, choosing MAS testing profiles, or running and reporting MASTG tests. Sources: the MAS Profiles pages, Using MAS Profiles, the MASWE page, the MASTG v2.0.0 release, the MASTG v2.0.0 Mobile App Security Testing chapter and test files, and MASTG pull request 3979, listed in [Sources](../SKILL.md#sources).

## From levels to profiles

MASVS 1.x put levels on requirements: MASVS-L1, MASVS-L2 and MASVS-R, combined as L1, L1+R, L2 or L2+R (MASVS 1.5, Using the MASVS, Verification Levels). MASVS 2.0.0 removed them from the controls and moved them to tests, so one control can be tested differently per profile; for example, MASVS-STORAGE-1 accepts unencrypted data in internal storage for L1 but requires encryption for L2 (MASVS 2.0.0 release, "Why are there no levels in the new MASVS controls?"). MASVS 2.1.0 says the levels were "reworked as MAS Testing Profiles" and moved to the MASTG (Using the MASVS, MAS Testing Profiles).

Where profiles are recorded has moved again:

- In MASTG 2.0.0, each test file carries a `profiles:` list, for example `profiles: [L1, L2]` (MASTG v2.0.0, `tests-beta/`).
- In MASWE 1.0.0, each weakness carries `profiles:` (`OWASP_MASWE.yaml`), and the website lists profiles per weakness (MASWE).
- After MASTG 2.0.0, pull request 3979 (merged 2026-09-17, unreleased) removed profiles from MASTG test metadata: "They will be inherited from the relevant MASWEs going forward."

So: take the profile from the MASWE weakness. Read a test's own `profiles:` only when working from the MASTG 2.0.0 release.

## The default profiles

There are two groups: security profiles (L1, L2, R) and a privacy profile (P). When a custom profile from a threat model is not feasible, use the defaults; for the highest assurance, a custom profile from a detailed threat model is still recommended (MAS Testing Profiles).

| Profile | Name               | Attacker model                                                                                                              | Recommended for                                                                                |
| ------- | ------------------ | --------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| MAS-L1  | Essential Security | Other installed apps are adversaries; the OS can be trusted; the user is not an adversary.                                  | All apps as a baseline; apps with only low-risk sensitive data and no sensitive functionality. |
| MAS-L2  | Advanced Security  | Extends L1. The OS cannot be trusted (rooted or jailbroken); a third party with or without physical access is an adversary. | Apps with high-risk sensitive data and sensitive functionality, such as health and finance.    |
| MAS-R   | Resilient Security | The device user is an adversary (reverse engineer, cheater); the OS cannot be trusted.                                      | Apps that must protect their own business assets and logic.                                    |
| MAS-P   | Baseline Privacy   | Not attacker-centric: protecting users' personal data and responsible handling.                                             | All apps that deal with user-sensitive data.                                                   |

Rules from the profile pages:

- L1 emphasises the secure defaults of the OS and frameworks, such as TLS and up-to-date strong cryptography (MAS-L1).
- MAS-R "is meant to augment and not replace MAS-L1 and MAS-L2" and is never used standalone. Its absence is not a vulnerability, and it cannot be 100% effective against an attacker with full device access (MAS-R).
- MAS-P works together with L1 and L2 (MAS-P).

### Example combinations

From MAS Testing Profiles, Examples:

| Combination | App characteristics                                                                               | Example apps              |
| ----------- | ------------------------------------------------------------------------------------------------- | ------------------------- |
| L1+P        | No business assets, low-risk sensitive data (name, email), no sensitive functionality             | News, calendar            |
| L1+P+R      | Business assets (IP, ad revenue), low-risk data, no sensitive functionality                       | Ad-supported weather app  |
| L2+P        | Moderate or high-risk data (location, payment, health, tokens, API keys), sensitive functionality | Messenger, health, sport  |
| L2+P+R      | Business assets plus high-risk data and sensitive functionality such as money transfers           | Banking, insurance, games |

The page marks these as illustrative only.

### Specialized profile: MAS-EUDIW

MAS-EUDIW (EU Digital Identity Wallet) translates EU regulatory requirements for EUDI Wallet Instances into testable MAS-aligned requirements. It draws on most controls from the four default profiles, adds wallet-specific assets such as Wallet Instance Attestations and Person Identification Data, and maps requirements to the Risk Register for European Digital Identity Wallets and to MASWE. Users map their assets and set configuration values (approved algorithms, minimum OS version). It is recommended for EUDI Wallet Instances that must resist attackers with "high attack potential" and for other high-assurance apps (MAS-EUDIW). It is on the website but not in the MASWE v1.0.0 YAML.

## Choosing and tailoring

From Using MAS Profiles:

1. Start from the app's threat model, functionality and data sensitivity. "The goal is not to comply with every profile or every test within a profile."
2. Drop tests for features the app lacks (no server communication, no MFA, no biometrics); interfaces that handle no sensitive data are less critical.
3. Involve all stakeholders in setting the assurance level.
4. Weigh the trade-offs: security against cost (apply a profile where potential impact exceeds the cost of the controls), usability, privacy (SMS MFA exposes the phone number) and value.
5. Consider applicable privacy law; profiles can differ per area, for example L2 for storage tests and L1 for network tests when high-risk data never leaves the device. NIST SP 800-122 gives illustrative PII impact levels.

The MASVS adds that applying profiles fully or partially is a risk-based decision with business owners, and deviations are justified and documented (MASVS 2.1, MAS Testing Profiles). Organisations may also fork the MASVS for their risk levels if traceability is kept (Assessment and Certification, Other Uses).

## How MASVS, MASWE and MASTG link

From the MASTG v2.0.0 release, MASTG v2:

1. **MASVS controls**: high-level, platform-agnostic requirements.
2. **MASWE weaknesses**: specific, typically platform-agnostic weaknesses under a control.
3. **MASTG tests** (`MASTG-TEST-****`): per-platform tests that evaluate a weakness. They are backed by knowledge articles (`MASTG-KNOW-****`) and best practices (`MASTG-BEST-****`), and use techniques (`MASTG-TECH-****`).
4. **MASTG demos** (`MASTG-DEMO-****`): working code samples and test scripts for reproducibility, using tools (`MASTG-TOOL-****`).

The MASWE "acts as the bridge between the MASVS and the MASTG" (MASWE, About the MASWE).

### MASTG test files

In MASTG 2.0.0, v2 tests are in `tests-beta/<platform>/MASVS-<GROUP>/MASTG-TEST-<nnnn>.md`. Front matter includes `platform`, `title`, `id`, `type` (for example `[static, code]` or `[dynamic, hooks]`), `best-practices`, `prerequisites` (such as `identify-sensitive-data`), `knowledge`, `profiles` and a weakness reference. The body has Overview, Steps, Observation and Evaluation (MASTG v2.0.0, MASTG-TEST-0204).

The weakness field changed after the release: MASTG 2.0.0 uses `weakness: MASWE-0027` with beta numbering, while the development branch uses `maswe: [MASWE-0012]` with 1.0 numbering for the same test (MASTG-TEST-0204, "Insecure Random API Usage"). Translate before citing (see [`versions.md`](versions.md)).

v1 tests (`tests/`) are deprecated: their front matter has `status: deprecated`, `masvs_v1_id`, `masvs_v2_id` and `covered_by`, listing the v2 tests that replace them. MASTG 2.0.0 says they are no longer maintained and the v2 tests are canonical (MASTG v2.0.0 release, MASTG Tests).

### When no MASTG test exists

The MASTG does not yet have a test for every weakness. Then: read the weakness's Modes of Introduction; borrow patterns from related MASTG tests, knowledge, techniques and tools, plus official platform documentation; and consider contributing a test and demo back (MASWE, How to proceed when no MASTG TEST exists).

## Testing process

From MASTG, Mobile App Security Testing (v2.0.0):

- **Access.** Black-box, gray-box or white-box. Request source code to use testing time efficiently; white-box is "the way to go if the app hasn't been tested before" (Principles of Testing).
- **Static and dynamic analysis.** Combine automated scans with manual review; manual review finds business logic and design flaws tools miss. Always review scanner results for false positives (Static Analysis, Dynamic Analysis).
- **Preparation.** Agree scope, applicable controls, goals and sensitive data with stakeholders; get written authorization. Request a release build (to check that controls work and resist bypass) and a debug build with controls deactivated (Preparation, Coordinating with the Client).
- **Sensitive data.** Decide the definition before testing. Data can be at rest, in use or in transit. Without a classification policy, treat as sensitive: authentication information, PII usable for identity theft, identifying device identifiers, data whose compromise causes reputational or financial harm, data with legal protection, and technical data protecting other data, such as keys (Identifying Sensitive Data).
- **Intelligence gathering and mapping.** Collect environmental and architectural information (app, OS versions, MDM, network, remote services), then map entry points, features and data. Ask for threat model documents (Intelligence Gathering, Mapping the Application).
- **Exploitation.** Confirm relevance by damage potential, reproducibility, exploitability, affected users and discoverability (Exploitation).
- **Reporting.** Executive summary, scope and context, methods, sources of information, prioritised and detailed findings, and a fix per defect (Reporting).

The MASVS adds that the recommended verification is an "open book" review with access to architects, developers, documentation, source and at least one account per role (Assessment and Certification, Guidance for Certifying Mobile Apps).
