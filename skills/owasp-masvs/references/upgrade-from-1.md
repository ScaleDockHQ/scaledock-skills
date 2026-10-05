# Upgrading from MASVS 1.x

Read this when a checklist, contract, report or test plan still uses MASVS 1.x: categories V1 to V8, requirement IDs `MSTG-<GROUP>-<n>` or `V<n>.<m>`, or levels L1, L2 and R. Sources: the MASVS v1.5.0 document, the MASVS v2.0.0 and v2.1.0 releases and documents, the deprecated v1 test files in MASTG v2.0.0, and the MASWE v1.0.0 YAML, listed in [Sources](../SKILL.md#sources). The upgrade steps are in [`versions.md`](versions.md); this file holds the model and the mapping.

## The 1.x model

- Eight categories, V1 to V8. A requirement is cited as `MASVS-Vx.y` and also has an `MSTG-*` ID used by the testing guide (MASVS 1.5, Using the MASVS, Document Structure).
- Every requirement is marked L1, L2 or (V8 only) R. Verification types are MASVS-L1, L1+R, L2 and L2+R (MASVS 1.5, Verification Levels in Detail, Recommended Use).
- V1 is architecture, design and threat modeling, "the only category that does not map to technical test cases" in the testing guide (MASVS 1.5, V1, Control Objective).
- MASVS 1.5.0 changed no requirements from 1.4.x; "They will remain the same until the release of MASVS v2.0.0" (MASVS v1.5.0 release).

## What 2.x changed

- Requirements became 24 controls (`MASVS-<GROUP>-<n>`) in eight groups; 2.0.0 had seven, and 2.1.0 added MASVS-PRIVACY (MASVS v2.0.0 and v2.1.0 releases).
- Levels left the controls and became MAS testing profiles on tests and weaknesses; a fourth profile, P, covers privacy (MASVS v2.0.0 release; MAS Testing Profiles).
- Scope narrowed to rely on the OWASP ASVS, OWASP SAMM and NIST SP 800-218 SSDF for what is not mobile-specific; redundancies and overlaps were removed; terminology follows NIST SP 800-175B, NIST OSCAL, CWE and platform docs (MASVS v2.0.0 release, What's Changed).
- Architecture, secure SDLC and threat modeling became an assumption rather than requirements (MASVS 2.1, Using the MASVS, Assumptions). Remote endpoint controls go to the ASVS (Assessment and Certification).

## Category map

| 1.x category                                | Main 2.x groups                                              |
| ------------------------------------------- | ------------------------------------------------------------ |
| V1 Architecture, Design and Threat Modeling | Mostly assumptions (SAMM, SSDF); ARCH-9 goes to MASVS-CODE-2 |
| V2 Data Storage and Privacy                 | MASVS-STORAGE, MASVS-PLATFORM-1 and -3, MASVS-PRIVACY-3      |
| V3 Cryptography                             | MASVS-CRYPTO                                                 |
| V4 Authentication and Session Management    | MASVS-AUTH; server-side session rules go to the ASVS         |
| V5 Network Communication                    | MASVS-NETWORK                                                |
| V6 Platform Interaction                     | MASVS-PLATFORM, MASVS-CODE-4                                 |
| V7 Code Quality and Build Settings          | MASVS-CODE, MASVS-RESILIENCE-2 to -4                         |
| V8 Resilience                               | MASVS-RESILIENCE                                             |

This table summarises the requirement mapping below; the MASVS does not publish a category-level table.

## Requirement mapping

Two published mappings exist, and this table shows both:

- **Test**: the `masvs_v1_id` to `masvs_v2_id` front matter of the deprecated v1 tests in MASTG v2.0.0 (`tests/`). It says which 2.x control the old test now verifies.
- **MASWE**: the `mappings.masvs-v1` field of each weakness in MASWE v1.0.0. It lists weaknesses whose content derives from the old requirement, with the control each weakness sits under.

When they differ, file the finding under the MASWE weakness and its control. "None" means neither source maps the requirement: re-assess it against the 2.x controls, or move it out of MASVS scope (an assumption, or the ASVS for the backend). Levels are the 1.x levels.

### V1 Architecture, Design and Threat Modeling

| 1.x ID                         | Level  | Test   | MASWE               |
| ------------------------------ | ------ | ------ | ------------------- |
| MSTG-ARCH-1 to -4              | L1, L2 | None   | None                |
| MSTG-ARCH-5 to -8              | L2     | None   | None                |
| MSTG-ARCH-9 (enforced updates) | L2     | CODE-2 | MASWE-0043 (CODE-2) |
| MSTG-ARCH-10, -11              | L2     | None   | None                |
| MSTG-ARCH-12 (privacy laws)    | L1, L2 | None   | None                |

### V2 Data Storage and Privacy

| 1.x ID                 | Level  | Test              | MASWE                                           |
| ---------------------- | ------ | ----------------- | ----------------------------------------------- |
| MSTG-STORAGE-1         | L1, L2 | STORAGE-1         | MASWE-0003, MASWE-0004 (STORAGE-1)              |
| MSTG-STORAGE-2         | L1, L2 | STORAGE-1         | MASWE-0001, MASWE-0002 (STORAGE-1)              |
| MSTG-STORAGE-3         | L1, L2 | STORAGE-2         | None                                            |
| MSTG-STORAGE-4         | L1, L2 | STORAGE-2         | None                                            |
| MSTG-STORAGE-5         | L1, L2 | STORAGE-2         | None                                            |
| MSTG-STORAGE-6         | L1, L2 | PLATFORM-1        | MASWE-0018 (AUTH-1)                             |
| MSTG-STORAGE-7         | L1, L2 | PLATFORM-3        | MASWE-0005 (STORAGE-2), MASWE-0036 (PLATFORM-3) |
| MSTG-STORAGE-8         | L2     | STORAGE-2         | MASWE-0006 (STORAGE-2)                          |
| MSTG-STORAGE-9         | L2     | PLATFORM-3        | MASWE-0038 (PLATFORM-3)                         |
| MSTG-STORAGE-10        | L2     | STORAGE-2         | None                                            |
| MSTG-STORAGE-11        | L2     | AUTH-2, STORAGE-1 | MASWE-0017 (CRYPTO-2)                           |
| MSTG-STORAGE-12        | L1, L2 | None              | MASWE-0072, MASWE-0073 (PRIVACY-3)              |
| MSTG-STORAGE-13 to -15 | L2     | None              | None                                            |

### V3 Cryptography

| 1.x ID        | Level  | Test               | MASWE                                                    |
| ------------- | ------ | ------------------ | -------------------------------------------------------- |
| MSTG-CRYPTO-1 | L1, L2 | CRYPTO-1, CRYPTO-2 | MASWE-0003 (STORAGE-1)                                   |
| MSTG-CRYPTO-2 | L1, L2 | CRYPTO-1           | MASWE-0013, MASWE-0014 (CRYPTO-2), MASWE-0047 (CODE-3)   |
| MSTG-CRYPTO-3 | L1, L2 | CRYPTO-1           | None                                                     |
| MSTG-CRYPTO-4 | L1, L2 | CRYPTO-1           | MASWE-0007 to MASWE-0011 (CRYPTO-1), MASWE-0046 (CODE-3) |
| MSTG-CRYPTO-5 | L1, L2 | CRYPTO-2           | MASWE-0007, MASWE-0009, MASWE-0010 (CRYPTO-1)            |
| MSTG-CRYPTO-6 | L1, L2 | CRYPTO-1           | MASWE-0012 (CRYPTO-1)                                    |

### V4 Authentication and Session Management

| 1.x ID                                     | Level  | Test   | MASWE               |
| ------------------------------------------ | ------ | ------ | ------------------- |
| MSTG-AUTH-1                                | L1, L2 | AUTH-2 | MASWE-0020 (AUTH-2) |
| MSTG-AUTH-2                                | L1, L2 | None   | None                |
| MSTG-AUTH-3                                | L1, L2 | None   | MASWE-0018 (AUTH-1) |
| MSTG-AUTH-4 to -7                          | L1, L2 | None   | None                |
| MSTG-AUTH-8 (biometrics bound to keystore) | L2     | AUTH-2 | MASWE-0020 (AUTH-2) |
| MSTG-AUTH-9                                | L2     | None   | MASWE-0019 (AUTH-1) |
| MSTG-AUTH-10 (step-up)                     | L2     | None   | MASWE-0023 (AUTH-3) |
| MSTG-AUTH-11                               | L2     | None   | None                |
| MSTG-AUTH-12                               | L1, L2 | None   | MASWE-0020 (AUTH-2) |

MSTG-AUTH-2 and -4 to -7 are remote endpoint requirements (session identifiers, logout, password policy, brute-force protection, session timeout). MASVS 2.x leaves the remote endpoint to the ASVS.

### V5 Network Communication

| 1.x ID                   | Level  | Test      | MASWE                                          |
| ------------------------ | ------ | --------- | ---------------------------------------------- |
| MSTG-NETWORK-1           | L1, L2 | NETWORK-1 | MASWE-0026 (NETWORK-1), MASWE-0073 (PRIVACY-3) |
| MSTG-NETWORK-2           | L1, L2 | NETWORK-1 | MASWE-0018 (AUTH-1), MASWE-0026 (NETWORK-1)    |
| MSTG-NETWORK-3           | L1, L2 | NETWORK-1 | MASWE-0027 (NETWORK-1)                         |
| MSTG-NETWORK-4 (pinning) | L2     | NETWORK-2 | MASWE-0028 (NETWORK-2)                         |
| MSTG-NETWORK-5           | L2     | None      | None                                           |
| MSTG-NETWORK-6           | L2     | NETWORK-1 | MASWE-0047 (CODE-3)                            |

### V6 Platform Interaction

| 1.x ID                                        | Level  | Test       | MASWE                   |
| --------------------------------------------- | ------ | ---------- | ----------------------- |
| MSTG-PLATFORM-1 (permissions)                 | L1, L2 | PLATFORM-1 | None                    |
| MSTG-PLATFORM-2 (input validation)            | L1, L2 | CODE-4     | MASWE-0050 (CODE-4)     |
| MSTG-PLATFORM-3 (URL schemes)                 | L1, L2 | PLATFORM-1 | MASWE-0029 (PLATFORM-1) |
| MSTG-PLATFORM-4 (IPC)                         | L1, L2 | PLATFORM-1 | MASWE-0018 (AUTH-1)     |
| MSTG-PLATFORM-5                               | L1, L2 | PLATFORM-2 | None                    |
| MSTG-PLATFORM-6                               | L1, L2 | PLATFORM-2 | MASWE-0034 (PLATFORM-2) |
| MSTG-PLATFORM-7                               | L1, L2 | PLATFORM-2 | MASWE-0033 (PLATFORM-2) |
| MSTG-PLATFORM-8 (deserialization)             | L1, L2 | CODE-4     | None                    |
| MSTG-PLATFORM-9 (overlays)                    | L2     | PLATFORM-3 | MASWE-0039 (PLATFORM-3) |
| MSTG-PLATFORM-10                              | L2     | PLATFORM-2 | None                    |
| MSTG-PLATFORM-11 (third-party keyboards, iOS) | L2     | None       | MASWE-0031 (PLATFORM-1) |

### V7 Code Quality and Build Settings

| 1.x ID                              | Level  | Test         | MASWE                     |
| ----------------------------------- | ------ | ------------ | ------------------------- |
| MSTG-CODE-1 (signing)               | L1, L2 | RESILIENCE-2 | MASWE-0056 (RESILIENCE-2) |
| MSTG-CODE-2 (release build)         | L1, L2 | RESILIENCE-4 | MASWE-0004 (STORAGE-1)    |
| MSTG-CODE-3 (debug symbols)         | L1, L2 | RESILIENCE-3 | MASWE-0061 (RESILIENCE-3) |
| MSTG-CODE-4 (debug code)            | L1, L2 | RESILIENCE-3 | MASWE-0061 (RESILIENCE-3) |
| MSTG-CODE-5 (vulnerable components) | L1, L2 | CODE-3       | MASWE-0044 (CODE-3)       |
| MSTG-CODE-6, -7                     | L1, L2 | None         | None                      |
| MSTG-CODE-8 (memory safety)         | L1, L2 | CODE-4       | None                      |
| MSTG-CODE-9 (toolchain features)    | L1, L2 | CODE-4       | None                      |

Note that 1.x L1 build-setting requirements (CODE-1 to -4) now sit mostly under MASVS-RESILIENCE, whose weaknesses are in the R profile.

### V8 Resilience (R)

| 1.x ID                                  | Test         | MASWE                                 |
| --------------------------------------- | ------------ | ------------------------------------- |
| MSTG-RESILIENCE-1 (root/jailbreak)      | RESILIENCE-1 | MASWE-0051 (RESILIENCE-1)             |
| MSTG-RESILIENCE-2 (debugging)           | RESILIENCE-4 | MASWE-0063, MASWE-0064 (RESILIENCE-4) |
| MSTG-RESILIENCE-3 (file tampering)      | RESILIENCE-2 | MASWE-0057 (RESILIENCE-2)             |
| MSTG-RESILIENCE-4 (RE tools)            | RESILIENCE-4 | MASWE-0065 (RESILIENCE-4)             |
| MSTG-RESILIENCE-5 (emulator)            | RESILIENCE-1 | MASWE-0053 (RESILIENCE-1)             |
| MSTG-RESILIENCE-6 (memory tampering)    | RESILIENCE-2 | MASWE-0058 (RESILIENCE-2)             |
| MSTG-RESILIENCE-7                       | None         | None                                  |
| MSTG-RESILIENCE-8                       | None         | MASWE-0051, MASWE-0053 (RESILIENCE-1) |
| MSTG-RESILIENCE-9 (obfuscation)         | RESILIENCE-3 | MASWE-0059 (RESILIENCE-3)             |
| MSTG-RESILIENCE-10 (device binding)     | None         | MASWE-0054 (RESILIENCE-1)             |
| MSTG-RESILIENCE-11 (encrypted binaries) | RESILIENCE-3 | MASWE-0060 (RESILIENCE-3)             |
| MSTG-RESILIENCE-12                      | None         | MASWE-0059 (RESILIENCE-3)             |
| MSTG-RESILIENCE-13 (payload encryption) | None         | MASWE-0062 (RESILIENCE-3)             |

## Levels to profiles

Do not convert a 1.x level mechanically. Profiles are attached to weaknesses, and a weakness's profile can differ from the level of the 1.x requirement it came from. Pick the profile combination for the app (see [`profiles-and-testing.md`](profiles-and-testing.md)), then take each weakness's profile from the MASWE catalogue. MAS-P has no 1.x level, so decide on it explicitly: it is recommended for all apps that deal with user-sensitive data, and every example combination on the profiles page includes it (MAS-P; MAS Testing Profiles, Examples). MAS-R still only adds to L1 or L2, as R did in 1.x.
