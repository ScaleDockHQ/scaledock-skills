# Response validation (service provider)

Read this when implementing or reviewing the code that accepts a SAML `Response` at an assertion consumer service (ACS), and for any SAML security review. Run the steps in order; any failure rejects the whole response, and no session is created. Section numbers: Core, Bind, Prof, Meta and Sec are the SAML 2.0 documents, En is an item of Errata 05, and XMLDSig and BP are XML Signature 1.1 and its Best Practices note. Sources are in [Sources](../SKILL.md#sources).

## 0. Before any response arrives

- Serve the ACS over TLS. Confidentiality MUST be provided whenever a response passes between a site and the browser (Sec §6.4.1).
- Keep IdP metadata current: entityID, signing keys, encryption algorithms and validity (see [`metadata.md`](metadata.md)).
- For each `AuthnRequest` sent, store its `ID` and tie it to the browser, for example with a cookie, so that a response can be matched to the client that started the flow (Prof §4.1.5 via E90).
- Decide whether unsolicited (IdP-initiated) responses are accepted. SPs SHOULD be able to disable them (E90).
- Configure the clock-skew allowance: 3 to 5 minutes by default (Core §1.3.3 via E92). Keep clocks synchronized to within a few minutes (Sec §6.4.1).

## 1. Receive and decode

- HTTP-POST: base64-decode the `SAMLResponse` form field (Bind §3.5.4).
- HTTP-Artifact: resolve `SAMLart` with `ArtifactResolve` over a mutually authenticated, integrity-protected and confidential channel, to the endpoint the artifact's SourceID and index identify (Bind §3.6.4.2; Prof §4.1.4.4). Each artifact is accepted once (Bind §3.6.5.2).
- HTTP-Redirect, if ever used for a response: verify the query-string signature over the original URL-encoded `SAMLResponse`, `RelayState` and `SigAlg`, in that order (Bind §3.4.4.1).
- Record the exact URL the message arrived at. Steps 5 and 7 compare `Destination` and `Recipient` against it.

## 2. Parse safely

No SAML schema uses a DTD, and SAML defines no use for entities. Parse with:

- **No DTD processing and no external entities.** Reject any document with a `DOCTYPE`. Entity expansion during canonicalization lets content change between signature validation and later processing (BP §2.2.1). Signers must not send unparsed external entity references (BP 23). Defaults and entities from outside the document can change what a signature covers (XMLDSig §3.1). This hardening is derived from the XML Signature sources; the SAML documents do not mandate it.
- **No network or file access** while parsing or validating: no `ds:RetrievalMethod`, no external `ds:Reference` URIs, no XSLT, and a small cap on the number of transforms (BP 3, BP 7, BP 8, BP 9).
- **No destructive validation first.** Schema validation that rewrites the DOM or adds defaults must not run before signature validation (BP 25).
- **Unique IDs.** Reject the document if any `ID` value is declared more than once (Core §1.3.4). With duplicate IDs it is ambiguous which element a reference resolves to, and that ambiguity is what a wrapping attack exploits.
- The root is `<samlp:Response>` in `urn:oasis:names:tc:SAML:2.0:protocol` with `Version="2.0"` (Core §1.2, §3.2.2).

## 3. Verify each signature

Apply this to every `<ds:Signature>` that is a direct child of the `Response` or of an `Assertion`. Those are the only placements the SAML signature profile covers (Core §5.4).

1. Exactly one `<ds:Reference>`, whose `URI` is `#` plus the `ID` of the signature's parent element (Core §5.4.2). Resolve the ID and confirm the result is that parent element itself, checking name and position, not just the name (BP 14).
2. Only the enveloped-signature transform and Exclusive C14N, with or without comments (Core §5.4.4). Reject anything else.
3. No `<ds:Object>` (Core §5.4.5 via E91). In the classic wrapping example, the signed copy hides inside `ds:Object` while the application reads a forged copy (BP §3.1.5, Example 11).
4. The `SignatureMethod` and `DigestMethod` are on your allowlist. Any XML Signature algorithm MAY be used (E81), but XMLDSig 1.1 marks SHA-1 as discouraged and requires RSA-SHA256 and SHA-256 support (XMLDSig §6.1).
5. The verification key is one of the IdP's metadata `KeyDescriptor`s with `use="signing"` or no `use` (Meta §2.4.1.1 via E62, E68). A key or certificate inside the message's `ds:KeyInfo` is used at most to choose among those trusted keys, never trusted by itself (BP 2; Sec §4.4.2).
6. Validate `SignedInfo` with the trusted key first, then validate the references (BP 1).
7. Keep a handle to the exact node each verified reference covered (BP 10). Every later step reads values from those nodes only, never from a fresh search of the document for `Assertion` or `NameID`.

## 4. Decide what is protected

- A verified `Response` signature protects the `Response` and every assertion inside it (Core §5.3).
- A verified `Assertion` signature protects that assertion.
- Under HTTP-POST, every assertion MUST be protected by one of the two (Prof §4.1.4.5 via E26). Reject a response that contains any unprotected assertion; do not silently skip it.
- If the SP's metadata says `WantAssertionsSigned="true"`, each `Assertion` needs its own signature. A `Response` signature or TLS is not enough (Meta §2.4.4 via E7).
- If an `EncryptedAssertion` uses a CBC-mode algorithm, require a verified `Response` signature, or another integrity layer, before decrypting (Core §6.2 via E93; Prof §4.1.4.3 via E93).

## 5. Check the Response

- **Destination**: if present, it MUST equal the URL recorded in step 1, or the message is discarded (Core §3.2.2). If the response is signed, `Destination` MUST be present (Bind §3.5.5.2).
- **Issuer**: required if the response is signed or contains an encrypted assertion (E17). If present, it equals the IdP's entityID, and `Format` is absent or `urn:oasis:names:tc:SAML:2.0:nameid-format:entity` (Prof §4.1.4.2).
- **InResponseTo**: equals the ID of an outstanding `AuthnRequest` from this browser (Core §3.2.2; Prof §4.1.4.3). If it is absent, the response is unsolicited: reject it unless unsolicited responses are enabled (Prof §4.1.5; E90).
- **Status**: the top-level `StatusCode` is `urn:oasis:names:tc:SAML:2.0:status:Success`. An error response contains no assertions (Prof §4.1.4.2).

## 6. Decrypt

- Decrypt each `<saml:EncryptedAssertion>` with the SP's encryption key (Meta §2.4.1.1), only after step 4 allows it (E93).
- Parse the decrypted XML under the step 2 rules.
- A signed assertion is signed before it is encrypted, so verify the decrypted assertion's own signature with step 3 after decrypting (Core §6.2).
- Prefer RSA-OAEP key transport and authenticated encryption such as GCM. PKCS#1 v1.5 key transport and unprotected CBC are attackable (Sec §4.6 via E93).

## 7. Check every assertion

Evaluate each assertion on its own (Prof §4.1.4.3 via E26):

- `Version="2.0"`, and the assertion was protected per step 4.
- **Issuer** equals the IdP's entityID. Every assertion in the response comes from the same IdP (Prof §4.1.4.2 via E26).
- **Subject**: if there are several assertions, all refer to the same principal (E26).
- **Bearer confirmation**: at least one `<SubjectConfirmation Method="urn:oasis:names:tc:SAML:2.0:cm:bearer">` whose `<SubjectConfirmationData>` passes all of these (Prof §4.1.4.3; Core §2.4.1.2):
  - `Recipient` equals the ACS URL the response or artifact arrived at;
  - `NotOnOrAfter` is later than now minus the skew allowance (E92);
  - `NotBefore`, if present, is not later than now plus the skew allowance. The IdP should not send one (Prof §4.1.4.2);
  - `InResponseTo` equals the request ID from step 5, or is absent for an unsolicited response;
  - `Address`, if present, MAY be compared with the client address.
- **Conditions** (Core §2.5.1.1). Reject an assertion whose conditions are Invalid or Indeterminate, including any condition you do not understand.
  - `NotBefore` and `NotOnOrAfter` hold, with the skew allowance (Core §2.5.1.2, E92).
  - Every `<AudienceRestriction>` contains the SP's entityID as an `<Audience>`, and each bearer assertion has at least one restriction (Prof §4.1.4.2; Core §2.5.1.4 via E46).
  - `<OneTimeUse>`: never cache or reuse the assertion (Core §2.5.1.5).
- **AuthnStatement**: the bearer assertions together contain at least one (Prof §4.1.4.2 via E26).

## 8. Prevent replay

- Store every accepted assertion `ID` until its bearer `SubjectConfirmationData` `NotOnOrAfter`, plus skew, and reject any ID already seen (Prof §4.1.4.5).
- Keep validity windows short. `NotBefore` and `NotOnOrAfter` of SSO assertions SHOULD be the shortest that still lets the assertion arrive (Sec §6.4.1).

## 9. Create the session

- Key the local account on the IdP's entityID together with the `NameID` value and `Format`. Persistent identifiers are unique only per IdP and SP pair (E86) and are never reassigned to another principal (E78).
- End the session no later than `SessionNotOnOrAfter`, taking the soonest value when there are several (Prof §4.1.4.3 via E26).
- Keep `SessionIndex` and the `NameID` for Single Logout (Prof §4.4.4.1).

## 10. Redirect with RelayState

- Treat RelayState as attacker-controlled. Allow only `http` and `https` in any URL derived from it, and reject unencoded characters (Bind §3.1.1 via E90; Prof §4.1.6 "Use of Relay State" via E90). Because the SP both produces and consumes it, it can protect the value with a symmetric MAC (Sec §6.4.6).
- Do not attach sensitive state to RelayState without checking it against the validated message, because RelayState values can be swapped between responses (Bind §3.5.5.2).

## Attacks and the checks that stop them

| Attack                                                                    | Stopped by                                                                 |
| ------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| Signature wrapping (XSW): a forged assertion next to a validly signed one | Unique IDs (step 2); reference-to-parent and node handles (step 3); step 4 |
| Signed copy hidden in `ds:Object`                                         | No `ds:Object` (step 3, E91)                                               |
| Self-signed message carrying its own `KeyInfo` certificate                | Keys only from metadata (step 3, BP 2)                                     |
| Assertion issued to another SP, or a response posted to another endpoint  | `Audience`, `Recipient` and `Destination` (steps 5 and 7)                  |
| Replay of a captured response                                             | Assertion ID cache and short validity windows (step 8)                     |
| Login CSRF: injecting the attacker's response into the victim's browser   | `InResponseTo` tied to the browser; unsolicited responses disabled (E90)   |
| XXE, entity expansion, remote DTDs, transform-based denial of service     | Safe parsing (step 2, BP §2.2.1, BP 3, BP 7, BP 8, BP 9)                   |
| CBC padding or PKCS#1 v1.5 oracles on encrypted assertions                | Integrity before decryption, RSA-OAEP, GCM (step 6, E93)                   |
| Open redirect or XSS through RelayState; swapped RelayState               | Step 10 (E90, Bind §3.5.5.2)                                               |
| Assertions from a different IdP mixed into one response                   | One issuer, one subject (step 7, E26)                                      |
