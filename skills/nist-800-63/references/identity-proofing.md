# Identity proofing and enrollment (SP 800-63A-4)

Read this when a service must know who the user really is: account opening, benefits, regulated onboarding, or raising an existing account's IAL. Sections cite SP 800-63A-4 unless noted. Source: [SP 800-63A-4](https://pages.nist.gov/800-63-4/sp800-63a.html).

## Levels (§ 1.2)

- **No identity proofing.** The account is not linked to a real-life person. No evidence is collected and no verification is done. This is a valid choice when DIRM finds that proofing is not needed (63 § 3.3.3.1). Pseudonymous accounts are allowed and recorded as such (§ 5.1).
- **IAL1.** All core attributes are validated against authoritative or credible sources, and ownership of one piece of evidence is verified. Proofing can be remote or on-site, attended or not. IAL1 is aimed at scaled attacks, synthetic identities and stolen personal information.
- **IAL2.** More evidence and stronger validation and verification. Proofing can be remote or on-site. IAL2 is aimed at targeted attacks, basic evidence falsification, evidence theft and social engineering.
- **IAL3.** On-site attended proofing with a trained proofing agent, plus collection of at least one biometric.

This is a change from 800-63-3, where IAL1 meant self-asserted attributes with no validation. See [`versions.md`](versions.md).

## Proofing types (§ 2.1.3)

| Type               | Where                               | Agent present                     |
| ------------------ | ----------------------------------- | --------------------------------- |
| Remote unattended  | Applicant's own location and device | No, fully automated               |
| Remote attended    | Applicant's own location and device | Yes, by secure video              |
| On-site unattended | CSP-controlled workstation or kiosk | No                                |
| On-site attended   | CSP-controlled location             | Yes, colocated or through a kiosk |

Hybrid processes are allowed at IAL1 and IAL2 if they are documented (§ 4.1.1, § 4.2.1). IAL3 SHALL be on-site attended only (§ 4.3.1).

## Core attributes and resolution (§ 2.2, § 2.3)

- Core attributes SHALL include a government identifier, such as a Social Security number, driver's license number or passport number. They SHOULD also include first name, middle name or initial, last name, date of birth, and a physical or digital address (§ 2.2).
- Core attributes are documented in trust agreements and practice statements (§ 2.2).
- Collect only the minimum needed to resolve a unique identity (§ 2.3).

## Evidence strength (§ 2.4.1)

| Strength     | Key requirements                                                                                                                                                                                       |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **FAIR**     | Issuer followed formal procedures, for example a bank under CIP rules or a mobile network operator. The evidence has a name, a reference number, portrait or unique attributes, and security features. |
| **STRONG**   | Issuer followed written procedures (IAL2 or above) under recurring oversight. The evidence has a name, a unique reference, a facial image or other biometric, and security features.                   |
| **SUPERIOR** | As STRONG, plus attended enrollment by the issuer and attributes protected by a digital signature that can be verified with approved cryptography.                                                     |

Appendix A lists example evidence for each strength.

## Validation (§ 2.4.2)

- Evidence SHALL be checked for authenticity, accuracy and validity: correct format, no signs of tampering, security features present, and accurate core fields (§ 2.4.2.1).
- Methods (§ 2.4.2.2): visual and tactile inspection on-site, visual inspection remotely by trained staff, automated document validation, or cryptographic verification of digital evidence.
- All core attributes, whether from evidence or self-asserted, SHALL be validated against an authoritative source (the issuer, or a party with direct access to it) or a credible source (traceable to authoritative sources, or correlated across several sources and under regulatory oversight) (§ 2.4.2.3, § 2.4.2.4).

## Verification (§ 2.5.1)

Approved methods:

- confirmation code returned from an address on the evidence;
- authentication or federation into an account related to the evidence;
- microtransaction, for example a micro-deposit;
- visual facial comparison, on-site or remote;
- automated biometric comparison.

**Knowledge-based verification (KBV) SHALL NOT be used for identity verification.** CSPs MAY still use KBV inside their fraud management program (§ 3.2.1).

## Requirements by IAL (§ 4)

| Aspect                | IAL1 (§ 4.1)                                                                                                   | IAL2 (§ 4.2)                                                   | IAL3 (§ 4.3)                                                                    |
| --------------------- | -------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| Proofing types        | Any                                                                                                            | Any                                                            | On-site attended only (colocated or kiosk)                                      |
| Evidence              | 1 FAIR (digitally validatable or with a portrait or biometric), or 1 STRONG, or 1 SUPERIOR                     | 1 FAIR + 1 STRONG, or 2 STRONG, or 1 SUPERIOR                  | 1 FAIR + 1 STRONG, or 2 STRONG, or 1 SUPERIOR                                   |
| Attribute validation  | All core attributes and the government identifier                                                              | All core attributes, or signed attributes on SUPERIOR evidence | All core attributes, or signed attributes on SUPERIOR evidence                  |
| Verification          | Ownership of 1 piece of evidence (§ 4.1.6)                                                                     | One of three pathways (below)                                  | Ownership of the strongest piece, by portrait or biometric comparison (§ 4.3.6) |
| Biometric             | Optional                                                                                                       | Optional (Biometric Pathway)                                   | SHALL collect and retain a biometric sample (§ 4.3.3)                           |
| Initial authenticator | Remote enrollment of a subscriber-provided authenticator, physical delivery to a validated address, or on-site | Same as IAL1                                                   | SHALL be distributed or enrolled on-site, attended (§ 4.3.10)                   |

Authenticators bound outside a single protected session SHALL be tied to the applicant with a continuation code or a biometric comparison (§ 4.1.12, § 4.2.12). At IAL3, binding outside the session requires a biometric comparison (§ 4.3.10). CSPs SHOULD encourage subscribers to bind at least two authenticators (§ 4.1.12).

### IAL2 verification pathways (§ 4.2.6)

CSPs SHOULD offer more than one pathway. The pathway used SHALL be recorded and made available to RPs. For the Non-Biometric Pathway, the CSP SHALL also record whether a mailed code or a visual comparison was used (§ 4.2.6).

- **Non-Biometric (§ 4.2.6.1).** For FAIR evidence: a confirmation code to a validated address, or a visual comparison. For STRONG or SUPERIOR evidence: a code mailed to a postal address taken from the evidence and validated with an authoritative source, or a visual comparison. An asynchronous visual comparison needs presentation attack detection (PAD) and document presence checks. CSPs SHALL tell RPs when they offer this pathway.
- **Digital Evidence (§ 4.2.6.2).**
  - FAIR evidence: a microtransaction, a code to a validated digital address, or authentication at AAL2/FAL2-equivalent to a related account.
  - STRONG evidence: authentication at AAL2/FAL2 or higher.
  - SUPERIOR evidence: a local activation factor plus a cryptographically verifiable attribute bundle, for example a wallet or a PKI smart card.
- **Biometric (§ 4.2.6.3).** Automated comparison of a facial image or another biometric on the evidence, or in records associated with it, against a live sample.

In remote and on-site unattended proofing, every piece of evidence SHALL have its ownership verified. In on-site attended proofing, the strongest piece SHALL (§ 4.2.6.1 to § 4.2.6.3).

## Cross-cutting CSP requirements (§ 3)

- **Practice statement (§ 3.1)**, which documents the CSP's processes, including the core attributes.
- **Fraud management (§ 3.2.1).** CSPs SHALL:
  - run a documented fraud program and privacy-assess every fraud check;
  - analyze remote channels for high-risk indicators;
  - stop applicants from inferring which attributes matched;
  - give RPs a way to receive fraud reports;
  - run a **death records check** on every proofing;
  - put insider-threat controls on agents.

  SIM swap, device tenure, address, device fingerprint, transaction analytics and fraud-indicator checks are SHOULD. RPs SHALL keep a fraud point of contact and periodically review their CSP's fraud controls (§ 3.2.2).

- **Security (§ 3.5).** CSPs SHALL use authenticated protected channels, automated attack protection (bot detection, web application firewall settings), encryption of personal information at rest, and at least the SP 800-53 moderate baseline.
- **Confirmation codes (§ 3.8).** At least 6 decimal digits from an approved random bit generator, single use. Valid for at most:
  - 21 days to a postal address inside the contiguous United States;
  - 30 days to a postal address outside it;
  - 10 minutes by SMS or voice;
  - 24 hours by email.
- **Continuation codes (§ 3.9).** At least 64 bits, throttled, stored hashed, single use.
- **Notification of proofing (§ 3.10)** goes to a validated postal address or phone number (email is allowed at IAL1). It includes the service name, the date, how to repudiate, and the subscriber's responsibilities.
- **Biometrics (§ 3.11).** Explicit consent, recorded; published retention and deletion policies; independent testing. For 1:1 verification, a false match rate of 1:10,000 or better and a false non-match rate of 1:100 or better. Demographic performance no more than 25 % worse than the overall population. Remote capture needs PAD with an impostor attack presentation accept rate (IAPAR) below 0.07.
- **Document validation (§ 3.13).** Document false accept and false reject rates of 0.1 or less, live capture, and document presence checks.
- **Injection and deepfakes (§ 3.14).** Remote proofing SHALL:
  - use genuine-sensor controls, for example detecting virtual cameras, emulators and jailbroken devices;
  - analyze all media for manipulation;
  - run only over authenticated protected channels.

  Remote attended sessions SHALL add random human-in-the-loop cues.

- **Exceptions (§ 3.15).** CSPs SHALL document exception handling. Trusted referees (§ 3.15.1) and applicant references (§ 3.15.3) are SHOULD and come with training and record requirements. Applicant references SHALL be supported for minors (§ 3.15.6).
- **Raising the IAL (§ 3.16).** The subscriber SHALL first authenticate at the highest AAL available on the account; the CSP then collects the additional evidence.

## Subscriber accounts (§ 5)

- Each account has a unique identifier, which SHOULD be random (§ 5.1). The account records:
  - any subject identifiers;
  - the proofing steps: evidence, proofing type, methods, trusted referee or applicant reference;
  - the maximum IAL achieved;
  - consents;
  - bound authenticators;
  - validated attributes.
- Access to an account that holds personal information SHALL use AAL2 or AAL3 (§ 5.2).
- Changes to core attributes SHALL be validated, except physical address, which SHOULD be. The subscriber SHALL be notified of every update (§ 5.3).
- Suspension or termination (§ 5.4) is triggered by the subscriber's request, compromise, policy violation, inactivity, a death notice, a legal order or the CSP shutting down. The subscriber is notified with the reason and the redress options. Personal information is deleted after termination.
- Breach notification goes to affected subscribers as quickly as possible (§ 5.5).
