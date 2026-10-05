# saml

An agent skill for OASIS SAML 2.0 single sign-on: building SAML requests, responses and metadata, validating responses securely, and upgrading from SAML 1.1.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill saml
```

Then ask your agent to "review our SAML ACS endpoint for signature wrapping and replay" or "add SAML SSO with IdP metadata to our app".

## What it covers

- Assertions, subjects, conditions and statements, plus `AuthnRequest`, `Response`, `LogoutRequest` and status codes.
- The HTTP-Redirect, HTTP-POST and HTTP-Artifact bindings, RelayState, and the Web Browser SSO and Single Logout profiles.
- Metadata: entityIDs, endpoints, keys and rollover, signing flags, publication, caching and validity.
- An ordered service-provider checklist for response validation: safe parsing, signature placement and wrapping, Destination, Issuer, InResponseTo, Recipient, NotOnOrAfter, Audience, replay, clock skew, encrypted assertions and RelayState.
- XML Signature and Exclusive C14N as SAML profiles them, the SAML 2.0 Errata 05 changes, and migrating from SAML 1.1.

## Versions

| Line     | Status                |
| -------- | --------------------- |
| SAML 2.0 | current               |
| SAML 1.1 | legacy (upgrade from) |

`references/versions.md` says which line to use, what Errata 05 changed, and how to upgrade from SAML 1.1.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [SAML V2.0 Core](https://docs.oasis-open.org/security/saml/v2.0/saml-core-2.0-os.pdf), [Bindings](https://docs.oasis-open.org/security/saml/v2.0/saml-bindings-2.0-os.pdf), [Profiles](https://docs.oasis-open.org/security/saml/v2.0/saml-profiles-2.0-os.pdf), [Metadata](https://docs.oasis-open.org/security/saml/v2.0/saml-metadata-2.0-os.pdf), [Security and Privacy Considerations](https://docs.oasis-open.org/security/saml/v2.0/saml-sec-consider-2.0-os.pdf) and [Conformance](https://docs.oasis-open.org/security/saml/v2.0/saml-conformance-2.0-os.pdf): OASIS Standard, 15 March 2005.
- [SAML Version 2.0 Errata 05](https://docs.oasis-open.org/security/saml/v2.0/errata05/os/saml-v2.0-errata05-os.pdf): OASIS Approved Errata, 01 May 2012.
- [SAML V2.0 Core Errata Composite](https://groups.oasis-open.org/higherlogic/ws/public/download/56776/sstc-saml-core-errata-2.0-wd-07.pdf/latest): non-normative Working Draft 07, 8 September 2015.
- [SAML V1.1 Core](https://www.oasis-open.org/committees/download.php/3406/oasis-sstc-saml-core-1.1.pdf): OASIS Standard, 2 September 2003.
- [OASIS Security Services (SAML) TC](https://www.oasis-open.org/committees/security/): closed 08 July 2023.
- [XML Signature 1.1](https://www.w3.org/TR/xmldsig-core1/): W3C Recommendation, 11 April 2013.
- [Exclusive XML Canonicalization 1.0](https://www.w3.org/TR/xml-exc-c14n/): W3C Recommendation, 18 July 2002.
- [XML Signature Best Practices](https://www.w3.org/TR/xmldsig-bestpractices/): W3C Working Group Note, 11 April 2013.

## License

MIT
