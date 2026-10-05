# Versions and upgrades

Read this when choosing a target revision, reading a policy or system that cites 800-63-3, or upgrading one. Sources: the CSRC publication pages for SP 800-63-4 and its volumes, the SP 800-63-4 online edition (each volume's change log), the SP 800-63-3 online edition, and the withdrawn syncable-authenticators supplement, all listed in [Sources](../SKILL.md#sources).

## Version lines

| Id         | Line        | Status  | Revision                                                                          | Posture | Summary                                                                                                   |
| ---------- | ----------- | ------- | --------------------------------------------------------------------------------- | ------- | --------------------------------------------------------------------------------------------------------- |
| `800-63-4` | SP 800-63-4 | current | Final, published 2025-07-31 (all four volumes: 63-4, 63A-4, 63B-4, 63C-4)         |         | The default target. Supersedes SP 800-63-3. Folds in the 2024 syncable-authenticators supplement.         |
| `800-63-3` | SP 800-63-3 | legacy  | Final, June 2017, with errata of 2017-12-01 and 2020-03-02; superseded 2025-08-01 |         | Superseded by SP 800-63-4 as of 1 August 2025. Read and upgrade from it; do not design new systems to it. |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows.

## Which version to use

- Default to SP 800-63-4 and cite the volume you mean: SP 800-63-4 (base), SP 800-63A-4, SP 800-63B-4 or SP 800-63C-4.
- SP 800-63-3 is not a supported target. CSRC lists each -3 volume as superseded by its -4 counterpart, and the 800-63-3 site states it was superseded as of 1 August 2025. Treat an 800-63-3 design, contract clause or audit checklist as input to the upgrade below.
- The SP 800-63B Supplement 1 on syncable authenticators (April 2024) was withdrawn on 2025-07-31. Its content is now 63B-4 Appendix B. Cite Appendix B, not the supplement.
- The pages.nist.gov 800-63 FAQ was last updated on 2022-03-03 and answers questions about SP 800-63-3. The 800-63-4 site lists its FAQ and conformance criteria as "coming soon". Do not apply -3 FAQ answers to -4 without checking the -4 text.

## What changed

### SP 800-63-4 (base volume)

Appendix C.4 lists the changes from 800-63-3:

- The 800-63-3 impact table and decision trees (63-3 § 6) are replaced by a five-step Digital Identity Risk Management process. It defines the online service, user groups and impacted entities, maps the effective impact level to xALs, tailors them, and evaluates continuously (§ 3).
- A Digital Identity Acceptance Statement is required (§ 3.4.4).
- New sections on performance metrics (§ 3.5.2), redress (§ 3.6) and AI/ML (§ 3.8).
- The subscriber-controlled wallet model is added (§ 2.5.3).

### SP 800-63A-4

- **The IALs are redefined.** In 800-63-3, IAL1 meant self-asserted attributes and "SHALL NOT validate and verify" (63A-3 § 4.3). In -4, IAL1 validates all core attributes and verifies one piece of evidence; "no identity proofing" is the separate no-proofing option (63A-4 § 1.2, § 4.1).
- KBV for verification: 63A-3 allowed it at IAL2 with constraints (63A-3 § 5.3.2). 63A-4 forbids it (§ 2.5.1).
- IAL2 evidence: 63A-3 accepted 1 STRONG plus 2 FAIR, among other options (63A-3 § 4.4.1.2). 63A-4 accepts 1 FAIR plus 1 STRONG, 2 STRONG, or 1 SUPERIOR (§ 4.2.2), and adds three verification pathways (§ 4.2.6).
- IAL3: 63A-3 allowed supervised remote proofing. 63A-4 requires on-site attended proofing, colocated or through a kiosk ("SRIP" is renamed), with a retained biometric (§ 4.3).
- Also new: a government identifier among the core attributes (§ 2.2), a death records check (§ 3.2.1), injection and deepfake controls (§ 3.14), trusted referees and applicant references (§ 3.15), and IAL elevation (§ 3.16).

### SP 800-63B-4

Appendix E lists the changes from 800-63B-3. The ones engineers hit most often:

| Topic                 | SP 800-63-3 (63B-3)                                                                                         | SP 800-63-4 (63B-4)                                                                                                                                                                                           |
| --------------------- | ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Name                  | "Memorized secret"                                                                                          | "Password"                                                                                                                                                                                                    |
| Minimum length        | 8 if chosen by the subscriber, 6 if random (§ 5.1.1.1)                                                      | 15 if single-factor, 8 if used only within MFA (§ 3.1.1.2)                                                                                                                                                    |
| Composition rules     | SHOULD NOT (§ 5.1.1.2)                                                                                      | SHALL NOT                                                                                                                                                                                                     |
| Periodic change       | SHOULD NOT (§ 5.1.1.2)                                                                                      | SHALL NOT; SHALL force a change on compromise                                                                                                                                                                 |
| Password managers     | Paste SHOULD be allowed                                                                                     | Password managers and autofill SHALL be allowed                                                                                                                                                               |
| Unicode normalization | NFKC or NFKD                                                                                                | NFC                                                                                                                                                                                                           |
| Out-of-band           | Compare-and-approve allowed; VoIP and email prohibited (§ 5.1.3)                                            | Secret must be transferred, compare-and-approve disallowed; email still prohibited; VoIP prohibition removed                                                                                                  |
| AAL2 reauthentication | SHALL every 12 h and after 30 min inactivity (§ 4.2.3)                                                      | Overall timeout SHOULD be ≤ 24 h, inactivity SHOULD be ≤ 1 h (§ 2.2.3)                                                                                                                                        |
| AAL2 phishing         | Not required                                                                                                | Verifiers SHALL offer a phishing-resistant option (§ 2.2.2)                                                                                                                                                   |
| AAL3 authenticator    | "Hardware-based" authenticator plus verifier impersonation resistance (§ 4.3)                               | Non-exportable key and phishing resistance; FIPS 140 level for authenticators reduced to Level 1 (§ 2.3.2)                                                                                                    |
| Session secrets       | SHALL be non-persistent (§ 7.1)                                                                             | Bearer secrets SHOULD NOT persist; proof-of-possession secrets such as DBSC MAY persist (§ 5.1)                                                                                                               |
| Binding               | Authenticate at the new authenticator's AAL; notification SHOULD                                            | Authenticate at the lower of the account's maximum AAL and the new authenticator's AAL; notification SHALL (§ 4.1.2.1)                                                                                        |
| Recovery              | Lost factor replaced by re-proofing, or by two physical authenticators plus a confirmation code (§ 6.1.2.3) | Saved or issued codes, recovery contacts, re-proofing, with per-AAL rules (§ 4.2)                                                                                                                             |
| Biometrics            | PAD SHOULD                                                                                                  | PAD SHALL for face; voice prohibited (§ 3.2.3.2)                                                                                                                                                              |
| New sections          | None                                                                                                        | Syncable authenticators (Appendix B), wallets (§ 3.1.7.3), activation secrets (§ 3.2.10), wireless and hybrid connections (§ 3.2.11), exportability (§ 3.2.13), cookies (§ 5.1.1), session monitoring (§ 5.3) |

Verifier compromise resistance is no longer a separately named requirement (Appendix E).

### SP 800-63C-4

Appendix C lists the changes from 800-63C-3:

- **FALs are no longer defined by encryption.** In 63C-3, FAL1 was a bearer assertion signed by the IdP, FAL2 added encryption to the RP, and FAL3 added holder-of-key (63C-3 § 4, Table 4-1). In 63C-4:
  - FAL2 is defined by injection protection, RP-initiated transactions, a single audience and a pre-established trust agreement (§ 2.3).
  - FAL3 is defined by a holder-of-key assertion or a bound authenticator (§ 2.4).
  - Encryption depends on context, for example personal information sent through HTTP redirects (§ 3.13.3, § 4.11.2).
- The IdP SHALL signal the IAL, AAL and FAL of each transaction (§ 2.5).
- New: bound authenticators (§ 3.16), shared signaling (§ 4.8) and subscriber-controlled wallets (§ 5).

## Upgrading

### SP 800-63-3 to SP 800-63-4

1. **Change the version marker.** Replace citations of SP 800-63-3, 800-63A, 800-63B and 800-63C with the -4 volume identifiers, and renumber section references: most 63B-3 § 5 and § 6 rules are now in 63B-4 § 3 and § 4, and 63B-3 § 7 is now § 5. Remove references to the 2024 syncable supplement and cite 63B-4 Appendix B instead.
2. **Redo the risk assessment.** Run the DIRM steps per user group (63 § 3.1 to § 3.3), map the effective impact level to the xALs, and write a DIAS (63 § 3.4.4). An -3 "IAL1" service that collects only self-asserted attributes becomes "no identity proofing" in -4, not IAL1.
3. **Update password rules** (63B-4 § 3.1.1.2):
   - raise the single-factor minimum to 15 characters;
   - remove every composition rule and forced expiry;
   - remove hints and security questions;
   - keep the full-password blocklist check and show the rejection reason;
   - allow password managers and autofill;
   - switch Unicode normalization to NFC.
4. **Replace removed or changed authenticator flows:**
   - Convert out-of-band "compare and approve" pushes to secret-transfer flows, for example typing or scanning a code (63B-4 § 3.1.3).
   - Mark SMS and voice as restricted, offer an unrestricted alternative, and record the migration plan in the DIAS (§ 3.2.9).
   - Add a phishing-resistant option at AAL2 (§ 2.2.2).
   - At AAL3, accept only non-exportable keys and reject synced passkeys (§ 2.3.2).
5. **Check WebAuthn handling.** Request UV as preferred, inspect the UV flag, and treat a credential without UV as single-factor. Do not reject passkeys only because of the BS flag in public-facing applications (63B-4 Appendix B.3).
6. **Update binding, recovery and notifications.** Require authentication at the lower of the account's maximum AAL and the new authenticator's AAL when binding. Support at least two notification addresses, and send notifications as SHALL. Implement recovery codes, contacts or re-proofing with the AAL2 two-method rule (§ 4.1.2.1, § 4.2, § 4.6).
7. **Update sessions.** Set the -4 timeouts and harden cookies (`Secure`, `HttpOnly`, `__Host-`, `SameSite`). Stop treating access tokens as proof of presence, and never let "remember this browser" replace authentication (63B-4 § 2.1.3 to § 2.3.3, § 5.1).
8. **Update identity proofing** (when an IAL is used):
   - drop KBV from verification;
   - re-map evidence combinations to the -4 tables;
   - add the death records check and injection and deepfake controls;
   - record the IAL2 verification pathway;
   - move IAL3 to on-site attended proofing (63A-4 § 2.5.1, § 3.2.1, § 3.14, § 4.2.6, § 4.3).
9. **Update federation** (when an FAL is used):
   - stop relying on encryption as the FAL2 marker;
   - make FAL2 RP-initiated with a nonce and injection protection, preferably back-channel;
   - keep federated identifiers free of plaintext personal information at FAL2;
   - require the IdP to signal the xALs;
   - check all seven assertion validation items (63C-4 § 2.3, § 2.5, § 3.11.1, § 4.9).
10. **Plan the transition for existing subscribers.** 63B-4 forbids periodic password changes and forces a change only on evidence of compromise (§ 3.1.1.2). Neither volume states how to bring existing passwords, authenticators or proofing records up to the -4 rules, so decide how and when existing accounts move over, and record that decision and its residual risk in the DIAS (63 § 3.4.4).

## Preview

No preview line is listed. As of 2026-10-05, the CSRC pages for SP 800-63-4, 63A-4, 63B-4 and 63C-4 show Final (2025-07-31) with no newer draft or errata, and the CSRC list of drafts open for comment has no 800-63 document. The only later NIST item found was the syncable-authenticators supplement, which is withdrawn and folded into 63B-4 Appendix B. Re-check the CSRC pages when refreshing this skill.
