# Binding, recovery, notifications and sessions (SP 800-63B-4)

Read this when adding a second factor, building "forgot password" or account recovery, sending security notifications, or setting session and cookie policy. Sections cite SP 800-63B-4 unless noted. Source: [SP 800-63B-4](https://pages.nist.gov/800-63-4/sp800-63b.html).

## Binding additional authenticators (§ 4.1.2)

- CSPs SHALL allow multiple authenticators per account. They SHOULD encourage subscribers to keep at least two, so that recovery is rarely needed (§ 4.1.2.1).
- Binding a new authenticator SHALL require authentication at the **lower** of two levels: the highest AAL currently available on the account, or the AAL at which the new authenticator will be used. For example, adding an AAL2-capable authenticator requires AAL2, unless the account only supports AAL1 (§ 4.1.2.1).
- The CSP SHALL notify the subscriber through a mechanism independent of the binding transaction (§ 4.1.2.1, § 4.6).
- **Binding across endpoints** (§ 4.1.2.2), for example a QR code shown on a laptop and scanned by a phone:
  - authenticated protected channel to the CSP;
  - binding code from an approved random bit generator, at least **40 bits** when paired with an identifier the subscriber enters, otherwise at least **112 bits**;
  - transferred manually or by QR code, never by email;
  - single use and valid for at most **10 minutes**;
  - clear instructions for undoing a binding mistake.
- Every lifecycle event is recorded with its date and time, and SHOULD include the source, such as the IP address or device (§ 4.1).
- Renewal SHOULD follow the additional-authenticator process before the old authenticator expires (§ 4.1.4). An expired authenticator SHALL NOT be usable (§ 4.4).

## Account recovery (§ 4.2)

Recovery restores access after the subscriber has lost the authenticators needed for the desired AAL. **Replacing a forgotten password while another authenticator still works is a binding, not a recovery** (§ 4.2).

### Methods (§ 4.2.1)

CSPs SHALL support at least one of the four methods below. Any other method, such as help-desk interaction, needs a documented risk analysis.

| Method                           | Requirements                                                                                                                                                                                                                                                                                                                                                                |
| -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Saved recovery code (§ 4.2.1.1)  | SHOULD be issued at enrollment. At least **64 bits** from an approved random bit generator. Stored hashed and throttled. Invalidated after use, with a new one issued. Issuing a replacement triggers a recovery notification                                                                                                                                               |
| Issued recovery code (§ 4.2.1.2) | Sent to a recovery address the claimant chooses. At least **6 digits**. Valid for at most **21 days** by post within the contiguous United States, **30 days** by post elsewhere, **10 minutes** by SMS or voice, **24 hours** by email. Throttled. New recovery addresses SHALL be verified with a confirmation code. CSPs SHALL allow **at least two** recovery addresses |
| Recovery contacts (§ 4.2.1.3)    | Trusted associates receive issued codes, with up to 24 hours extra validity. Subscribers SHALL be able to view and manage their contacts, and SHOULD get an annual reminder to review them                                                                                                                                                                                  |
| Repeated proofing (§ 4.2.1.4)    | SHOULD be supported for accounts proofed at IAL1 or above. Repeat the proofing steps at the original level and confirm they match the account. A retained biometric or evidence copy MAY allow repeating only the verification step                                                                                                                                         |

### What each account needs (§ 4.2.2)

- **No identity proofing (§ 4.2.2.1):** a saved code, an issued code or a recovery contact. Accounts that can only reach AAL1 count as unproofed.
- **Highest AAL is AAL2 (§ 4.2.2.2):** one of the following:
  - two recovery codes obtained by **different** methods;
  - one recovery code plus authentication with a bound single-factor authenticator;
  - repeated identity proofing, if the account was proofed.
- **AAL3 (§ 4.2.2.3):** the AAL2 rules apply to accounts proofed at IAL1 or IAL2. An IAL3 account requires a biometric comparison against the sample collected at on-site proofing.
- Every recovery **SHALL** trigger a notification (§ 4.2.3).

## Loss, compromise, expiration and invalidation (§ 4.3 to § 4.5)

- Compromised authenticators, meaning lost, stolen, duplicated or damaged ones, SHALL be suspended, invalidated or destroyed promptly (§ 4.3).
- The CSP SHOULD let the subscriber report a loss by authenticating with a backup password or physical authenticator; one factor is enough for the report (§ 4.3).
- Suspension MAY be reversed after authentication with a valid authenticator (§ 4.3).
- Invalidation SHALL happen promptly when the account ends, at the subscriber's request, on compromise, or when the subscriber is no longer eligible (§ 4.5).

## Notifications (§ 4.6)

- CSPs SHALL support at least two notification addresses: postal, email, SMS or voice, or push. For proofed accounts, at least one of them SHALL have been validated during proofing.
- Notifications SHALL go to every address except postal ones. Postal addresses are used when no other address exists, when the event is an AAL3 recovery, or when the only other address is the one that received the recovery code.
- Every notification SHALL include instructions and contact details for repudiating the event.
- Events that require notification include binding an authenticator (§ 4.1.2.1), account recovery (§ 4.2.3) and issuing a replacement saved recovery code (§ 4.2.1.1).

## Sessions (§ 5.1)

- **Session secrets** SHALL:
  - be issued by the session host in direct response to authentication;
  - have at least **64 bits** from an approved random bit generator;
  - be erased or invalidated on logout;
  - be unavailable to intermediaries;
  - time out according to the AAL timeouts.

  They SHOULD NOT be stored in insecure places such as HTML5 localStorage.

- Bearer session secrets SHOULD NOT persist across an application restart or device reboot. Proof-of-possession session secrets, such as Device Bound Session Credentials, MAY persist, but the AAL session limits still apply.
- **"Remember my browser" cookies SHALL NOT replace authentication.** The one exception is AAL2 reauthentication after the inactivity timeout but before the overall timeout (§ 5.1, § 2.2.3).
- A session SHALL NOT be treated as a higher AAL than the authentication that created it.
- Sessions SHALL NOT fall back from HTTPS to HTTP. POST and PUT bodies SHALL carry a session identifier that the RP verifies, as CSRF protection. A logout option SHOULD be easy to reach.

### Cookies (§ 5.1.1)

| Attribute                  | Requirement                                                                         |
| -------------------------- | ----------------------------------------------------------------------------------- |
| `Secure`                   | SHALL                                                                               |
| Host and path scope        | SHALL be the minimum practical                                                      |
| `HttpOnly`                 | SHOULD                                                                              |
| `__Host-` prefix, `Path=/` | SHOULD                                                                              |
| `SameSite`                 | SHOULD be `Lax` or `Strict`                                                         |
| Contents                   | SHOULD be an opaque identifier. SHALL NOT contain cleartext personal information    |
| Expiry                     | SHOULD match the session's validity, but SHALL NOT be relied on to enforce timeouts |

### Access tokens (§ 5.1.2)

The RP SHALL NOT treat an access token, such as an OAuth token, as evidence that the subscriber is present. Refresh tokens can outlive the session.

## Reauthentication and timeouts (§ 5.2)

- When either the overall or the inactivity timeout expires, the session SHALL be terminated.
- Activity SHALL reset the inactivity timer. A successful reauthentication SHALL reset both.
- Agencies SHALL document their limits in a system security plan.

| AAL  | Overall timeout                    | Inactivity timeout     | Reauthentication                                                               |
| ---- | ---------------------------------- | ---------------------- | ------------------------------------------------------------------------------ |
| AAL1 | SHALL be set; SHOULD be ≤ 30 days  | Optional               | Any AAL1 method                                                                |
| AAL2 | SHALL be set; SHOULD be ≤ 24 hours | SHOULD be ≤ 1 hour     | After inactivity only: MAY use a password or biometric plus the session secret |
| AAL3 | SHALL be ≤ 12 hours                | SHOULD be ≤ 15 minutes | Full AAL3 authentication                                                       |

Sources: § 2.1.3, § 2.2.3, § 2.3.3.

- **Federation:** IdP and RP sessions are independent. The RP SHALL be authoritative on whether reauthentication requirements are met, using the authentication time the IdP reports (§ 5.2; 63C § 4.7).
- **Session monitoring (§ 5.3):** usage patterns, behavioral signals, device, geolocation and IP address MAY be evaluated during the session. On suspected fraud the RP SHOULD reauthenticate, terminate the session or alert support. Collecting these signals SHALL be covered by the privacy risk assessment.
