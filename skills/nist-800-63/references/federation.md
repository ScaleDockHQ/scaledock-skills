# Federation and assertions (SP 800-63C-4)

Read this when an RP accepts sign-in from an IdP or wallet, or when building an IdP. Sections cite SP 800-63C-4 unless noted. Source: [SP 800-63C-4](https://pages.nist.gov/800-63-4/sp800-63c.html).

## Federation assurance levels

Each level includes all requirements of the levels below it (§ 2, Table 1). Table 1 itself is non-normative; the normative text is in § 2.1 to § 2.4.

| Requirement              | FAL1                                        | FAL2                               | FAL3                                           |
| ------------------------ | ------------------------------------------- | ---------------------------------- | ---------------------------------------------- |
| Audience restriction     | Multiple RPs allowed; single RP recommended | Single RP                          | Single RP                                      |
| Replay protection        | Required per RP                             | Required                           | Required                                       |
| Injection protection     | Recommended                                 | Required; transaction starts at RP | Required; transaction starts at RP             |
| Trust agreement          | Subscriber-driven or pre-established        | Pre-established                    | Pre-established                                |
| Identifier and key setup | Dynamic or manual                           | Dynamic or manual                  | Manual                                         |
| Presentation             | Bearer assertion                            | Bearer assertion                   | Holder-of-key assertion or bound authenticator |

- **All FALs** (§ 2.1, § 2.2): the IdP SHALL sign the assertion with approved cryptography and the RP SHALL validate the signature with the expected IdP's key. The assertion SHALL be audience-restricted and each RP SHALL enforce replay protection. At FAL1, injection protection and RP-initiated transactions are SHOULD, and federated identifiers SHOULD NOT contain plaintext personal information.
- **FAL2** (§ 2.3): the assertion SHALL be strongly protected from injection, and the transaction SHALL be initiated by the RP. Single audience. Federated identifiers SHALL NOT contain plaintext personal information such as usernames, email addresses or employee numbers. Trust agreement SHALL be pre-established. Federal IdPs at FAL2 and above protect signing keys with FIPS 140 Level 1 or higher.
- **FAL3** (§ 2.4): the RP SHALL verify that the subscriber controls an authenticator in addition to the assertion, through a holder-of-key assertion (§ 3.15) or a bound authenticator (§ 3.16). Identifiers for CSP, IdP and RP SHALL be established manually, and verification keys travel through a trusted mechanism.

## Requesting and signalling xALs (§ 2.5)

- IdPs SHALL let RPs specify minimum acceptable xALs in the trust agreement, and SHOULD let RPs request stricter ones at runtime.
- The IdP SHALL always indicate the resulting xAL in the assertion, even when the request was not met. For each transaction it SHALL tell the RP the IAL of the account (or that no IAL is claimed), the AAL of the current IdP session (or that none is claimed), and the FAL.
- No IAL claim means "no IAL": the RP cannot assume IAL1.
- The RP SHALL decide the minimum IAL, AAL and FAL for each function and check every assertion against them, with a mechanism for responses that fall short (decline or route to exception handling).

## Federated identifiers (§ 3.4)

- A federated identifier is the subject identifier plus the issuer identifier. Never process a subject identifier without the issuer that issued it (§ 3.4); subject identifiers SHALL NOT be treated as globally unique across IdPs (§ 4.9).
- Federated identifiers SHALL be unique to one subscriber and associated with a single subscriber at the RP (§ 3.4).
- Pairwise pseudonymous identifiers (PPIs, § 3.4.1): when used, a different identifier per RP or per agreed set of RPs; no identifying information; unguessable; disclosed to a single RP unless the trust agreement designates a shared PPI. Shared PPIs need the conditions in § 3.4.1.3, for example consent and a demonstrable relationship between the RPs. The OIDC sector identifier is one mechanism.

## RP subscriber accounts and sessions

- The RP SHALL notify the subscriber when a federated identifier is added to, or removed from, an existing RP account (§ 3.8).
- Account linking SHALL require an authenticated session, which SHOULD come from an existing federated identifier; a removed federated identifier SHALL lose access (§ 3.8.1).
- Account resolution SHALL request enough attributes to resolve the subscriber uniquely and SHALL NOT attach an account to someone else's federated identifier (§ 3.8.2).
- Direct authenticators added at the RP follow 63B, and that access has no FAL (§ 3.8.3).
- An authenticated session SHALL be created only after a valid assertion from the expected IdP, whose issuer matches the federated identifier, has been tied to a provisioned RP account. At FAL3 the holder-of-key or bound authenticator SHALL be verified first (§ 3.9).
- The RP manages its session separately from the IdP. The assertion validity window SHALL NOT limit the RP session (§ 4.9). The IdP SHALL communicate the recency of the last authentication, and SHOULD let the RP request a fresh one (§ 4.7).
- Fetching attributes from an identity API SHALL NOT establish or extend an RP session (§ 4.7, § 3.12.3).

## Security controls and injection protection (§ 3.11)

- IdPs and CSPs use at least the SP 800-53 moderate baseline. RPs use at least low, or moderate when they handle personal information (§ 3.11).
- Injection protection (§ 3.11.1) is recommended at all FALs and required at FAL2 and above. Common practices include:
  - back-channel presentation;
  - an unguessable value tying the unauthenticated RP session to the request;
  - RP authentication to the IdP;
  - no IdP-initiated flows (an external signal that makes the RP start the flow is allowed);
  - a signed front-channel response that covers the RP's nonce;
  - platform APIs instead of HTTP redirects.
- All IdP–RP and subscriber–party communication SHALL use an authenticated protected channel (§ 3.11.2).

## Assertion protection (§ 3.13)

- Assertions SHALL be unique enough for the RP to identify them (§ 3.13.1).
- Assertions SHALL be signed (asymmetric signature or MAC with approved cryptography), and the signature SHALL cover the whole assertion (§ 3.13.2).
- Encryption is optional in general (§ 3.13.3). When used, the IdP SHALL encrypt to the RP's key. An IdP that sends assertions through HTTP redirects SHALL encrypt all personal information in them (§ 4.11.2).
- Every RP SHALL check that the audience contains its identifier (§ 3.13.4).
- Holder-of-key assertions (§ 3.15) SHALL identify an authenticator the RP can verify independently, and that authenticator SHALL be phishing-resistant. An assertion SHALL NOT carry an unencrypted private or symmetric key.
- Bound authenticators (§ 3.16):
  - They are unique per subscriber, phishing-resistant, and their identifier is stored in the RP account. The RP SHALL notify the subscriber out of band when one is added or removed.
  - The subscriber-provided binding ceremony has a timeout of 5 minutes or less and SHALL NOT be used as a session for anything else (§ 3.16.2).
  - Removing a bound authenticator SHALL end all FAL3 sessions (§ 3.16.2).
- With a bound authenticator, failure to authenticate with it SHALL be an error and SHALL NOT create a session (§ 3.17).

## Assertion contents and validation (§ 4.9)

Every assertion SHALL include:

- issuer;
- audience;
- issuance time;
- validity window;
- assertion identifier;
- authentication time;
- a signature covering the whole assertion.

It also SHALL include:

- a subject identifier, when federated identifiers are used;
- the IAL (and verification type), the AAL and the intended FAL, through the assertion or the trust agreement;
- the RP's nonce, at FAL2 and above;
- a key reference or a bound-authenticator indicator, at FAL3.

Assertions SHALL NOT contain authentication secrets.

The RP SHALL check all of the following:

1. Signature: valid, with a key that belongs to the sending IdP.
2. Issuer: the expected IdP.
3. Time: the validity window is within acceptable limits of now.
4. Audience: this RP.
5. Nonce: the request nonce is present, where applicable.
6. Transaction terms: the IAL, AAL and FAL are allowed by the trust agreement and meet the RP's needs.
7. Assertion identifier: not replayed at this RP within the validity window.

## Requests and presentation

- RP-initiated requests SHALL carry an RP identifier and a nonce, and SHOULD list requested attributes with their purpose and the authentication requirements. Transactions at FAL2 and above are always RP-initiated (§ 4.10).
- Back channel (§ 4.11.1), recommended at FAL2 and above, for example the OIDC authorization code flow or SAML artifact binding. The assertion reference SHALL be:
  - single-RP and single-use;
  - time-limited, and SHOULD be valid for 5 minutes or less;
  - presented with RP authentication;
  - unguessable.

  The IdP SHALL check that the presenting RP is the one that made the request, and the RP SHALL defend against injected references (XSS and CSRF protection, rejecting references outside the expected stage of the transaction).

- Front channel (§ 4.11.2): not recommended when other mechanisms exist. The RP SHALL use the assertion identifier to accept each assertion at most once, and SHALL apply injection defences.

## Shared signaling (§ 4.8)

- Shared signals SHALL be documented in the trust agreement and privacy-reviewed, and SHALL carry no personal information beyond what identifies the account. IdP-to-RP signals SHALL require a pre-established trust agreement.
- The IdP SHOULD signal termination, suspension, suspected compromise, attribute changes, xAL range changes and authenticator updates. The RP SHOULD signal account status, suspected compromise, and bound authenticator additions and removals.
- An IdP told of a suspected compromise SHALL review the account, and SHALL signal the other RPs the account used when the compromise is confirmed.

## Subscriber-controlled wallets (§ 5)

A wallet is an IdP that presents CSP-signed attribute bundles, such as SD-JWT, W3C Verifiable Credentials or mdoc (§ 3.12.1). The RP SHALL validate the bundle signature and the container signature (§ 3.12.1). Assertions from on-device wallets can count as holder-of-key (§ 3.15). The wallet requirements are in § 5, and assertion validation is in § 5.10.

## Protocol mapping (§ 9.1, informative)

| FAL  | OIDC                                                                               | SAML                                                          |
| ---- | ---------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| FAL1 | Any core flow with a signed ID Token                                               | Web SSO profile with XML DSig                                 |
| FAL2 | Flows that return the ID Token in the back channel (authorization code, hybrid)    | Artifact binding (back channel)                               |
| FAL3 | ID Token claims for holder-of-key or bound authenticator (no standard profile yet) | Holder-of-Key profile, combined with other deployment choices |

For wallets, § 9.1 names OpenID for Verifiable Credential Issuance (OIDC4VCI) and OpenID for Verifiable Presentations (OIDC4VP). It also suggests sender-constrained access tokens for API calls alongside FAL3.
