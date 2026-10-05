# Assurance levels and digital identity risk management (SP 800-63-4)

Read this when selecting or reviewing an IAL, AAL or FAL, or when writing a Digital Identity Acceptance Statement. Sections cite the base volume, SP 800-63-4, unless noted. Source: [SP 800-63-4](https://pages.nist.gov/800-63-4/sp800-63.html).

## Scope

- The guidelines apply to all online services that need identity proofing, authentication or federation, including services offered to the public (63 § 1.1).
- They do not cover machine-to-machine authentication, IoT devices, or API access on behalf of subjects (63 § 1.1).
- An organization selects an IAL, an AAL and an FAL; the three can differ for one service (63 § 1.2, § 3.3.3, § 3.4.4).

## The three assurance levels

| Level | What it measures                                                          | Detailed in |
| ----- | ------------------------------------------------------------------------- | ----------- |
| IAL   | Confidence that the applicant holds the claimed real-life identity        | 63A-4       |
| AAL   | Confidence that the claimant is the person the authenticator was bound to | 63B-4       |
| FAL   | Confidence in assertions passed from an IdP to an RP                      | 63C-4       |

The control objectives for each level are in 63 § 3.3.2.

## Digital Identity Risk Management (DIRM, § 3)

Federal RPs SHALL implement DIRM for all online services (§ 3). The process looks at risk along two dimensions. The first is the risk to the online service from an identity failure: an impostor, an account takeover or a wrong subject. The second is the risk the identity system itself creates, through privacy harm, barriers to access or threats it does not address (§ 3).

CSPs and IdPs that deviate from the normative guidance SHALL tell their RPs, and SHALL document the deviation in a DIAS (§ 3, § 3.4.4). At a minimum, organizations SHALL execute and document every step (§ 3).

### Step 1: Define the online service (§ 3.1)

RPs SHALL describe:

- the mission and business objectives;
- partner dependencies;
- legal, regulatory and contractual requirements, including privacy;
- the service's functionality and data;
- each user group, with its transactions and privileges;
- the entities impacted, including people who never use the system;
- earlier DIRM results and the identity technology already in place;
- the expected availability of identity evidence across user groups.

Impact assessments SHALL cover both the individuals using the service and the organization, and SHALL document every impacted entity (§ 3.1).

### Step 2: Initial impact assessment (§ 3.2)

- Assess each user group separately, based on the transactions available to it (§ 3.2).
- Use at least these impact categories (§ 3.2.1):
  - degradation of mission delivery;
  - damage to trust, standing or reputation;
  - unauthorized access to information;
  - financial loss or liability;
  - loss of life or danger to human safety, human health or environmental health.
- Assign each category an impact level: **Low** (limited adverse effect), **Moderate** (serious) or **High** (severe or catastrophic) (§ 3.2.2). A category with no harm can be marked None (§ 3.2.3).
- Combine the levels into one effective impact level per user group, for example by high-water mark or weighted average. Document the method and apply it consistently across services (§ 3.2.4).

### Step 3: Select initial assurance levels (§ 3.3.3)

First document whether each function is needed at all. Then map the effective impact level:

| Effective impact | IAL (if proofing is needed) | AAL (if authentication is needed) | FAL (if federation is used) |
| ---------------- | --------------------------- | --------------------------------- | --------------------------- |
| Low              | IAL1                        | AAL1                              | FAL1                        |
| Moderate         | IAL2                        | AAL2                              | FAL2                        |
| High             | IAL3                        | AAL3                              | FAL2 or FAL3                |

- **IAL** (§ 3.3.3.1): identity proofing is not required when the service needs no personal information, or can work with self-asserted attributes whose potential harm is insignificant. The organization SHALL document whether proofing is required. "No IAL" is a valid outcome.
- **AAL** (§ 3.3.3.2): Executive Order 13681 requires multi-factor authentication when personal data is made accessible, so such services need at least AAL2. 63B § 2 repeats this as an AAL2 minimum for personal information that federal agencies make available online.
- **FAL** (§ 3.3.3.3): for high-impact services, the organization SHALL assess the risk of a compromised IdP to choose between FAL2 and FAL3. Federal agencies SHOULD offer federation as an option.
- The xALs can differ. For example, a low-impact service with personal information can be IAL1 or no IAL, AAL2 and FAL1 (§ 3.3.3).
- Then identify the baseline controls from 63A, 63B and 63C for each user group (§ 3.3.4). An external CSP or IdP can implement them.

### Step 4: Tailor and document (§ 3.4)

- Organizations SHALL establish a documented tailoring process (§ 3.4).
- They SHALL assess privacy, customer experience and threat resistance for the initial controls (§ 3.4.1), and SHALL review the DIAS and practice statements of the CSPs and IdPs they use (§ 3.4).
- **Compensating controls** replace a SHALL-level control. Document the control, the rationale, how comparable it is, and the residual risk. CSPs and IdPs SHALL disclose their compensating controls to RPs before integration (§ 3.4.2).
- **Supplemental controls** add to the baseline, for example restricting AAL2 to phishing-resistant authenticators. They SHALL be assessed and documented (§ 3.4.3).
- **The DIAS** (§ 3.4.4) is required for each online service and for each external service the organization relies on. It contains at least:
  - the initial impact assessment results;
  - the initially assessed xALs;
  - the tailored xALs, with the rationale for any change;
  - every compensating control, with its comparability or residual risk;
  - every supplemental control.

  RPs SHALL fold the relevant parts of their CSP's or IdP's DIAS into their own.

### Step 5: Continuously evaluate and improve (§ 3.5)

Organizations SHALL run a documented continuous-evaluation program that uses end-user input and performance metrics; § 3.5.2 lists example metrics. They SHALL also monitor the threat and fraud landscape and regularly reassess their controls against it (§ 3.5).

## Cross-cutting requirements

- **Redress (§ 3.6):** RPs and CSPs SHALL:
  - provide a documented, accessible and trackable way to raise grievances;
  - put a governance model and a dedicated issue-handling function behind it;
  - make human staff available to override algorithmic decisions;
  - train support staff;
  - feed findings back into continuous evaluation;
  - protect the redress process itself against fraud.
- **Program integrity (§ 3.7):** organizations SHALL exchange information between their internal security and fraud teams. All data that identity services share SHALL get a privacy and legal assessment.
- **AI and ML (§ 3.8):** every use of AI or ML in the identity system SHALL be documented and disclosed to RPs. Organizations SHALL describe the training methods and data sets, how often models are updated, and test results, and SHALL perform privacy risk assessments. They SHOULD apply the NIST AI Risk Management Framework.

## Per-level control summary

- IAL requirements: see [`identity-proofing.md`](identity-proofing.md).
- AAL requirements: see [`authenticators.md`](authenticators.md) and [`sessions-and-recovery.md`](sessions-and-recovery.md).
- FAL requirements: see [`federation.md`](federation.md).
