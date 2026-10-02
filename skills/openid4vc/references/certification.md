# OpenID conformance testing for OpenID4VP and OpenID4VCI

The OpenID Foundation conformance suite runs at `https://www.certification.openid.net/`. Sign in with a Google or GitLab account, create a test plan, and run every module in it. Pick an `alias` unique to your organization, because it forms part of the suite's URLs. Facts below come from the two conformance testing pages as read on 2026-10-02.

## Shared rules

- **OpenID4VP**: certification is accepted only for OpenID4VP 1.0 Final, and HAIP 1.0 Final support is mandatory.
- **OpenID4VCI**: use only plans whose name ends in "/HAIP". Plans without the suffix omit the HAIP requirements and are not for certification.
- **Formats**: tests run with mdoc or SD-JWT VC, but these formats are not exhaustively tested. A certification shows only that the format provisions in OpenID4VP, OpenID4VCI and HAIP are correct; test the rest of the format specifications yourself.
- **Older versions**: older OpenID4VP versions can be tested, including the ID2 version used by ISO 18013-7 Annex B, but they are not certifiable.
- **Help and submission**: email certification@oidf.org with a link to the failing `log-detail.html`, file bugs in the conformance suite's GitLab project, and submit results through the OpenID Foundation's certification request process.

## OpenID4VP wallet

- **Plan**: `oid4vp-1final-wallet-haip-test-plan`.
- **Options**:
  - Credential format: `iso_mdl` or `sd_jwt_vc`.
  - Response mode `direct_post.jwt` for redirects, or the W3C Digital Credentials API option.
- **Configuration**: the suite acts as the verifier and sends signed `x509_hash` requests with the DCQL query from the configuration.
  - The example configuration's client JWKS uses a self-signed certificate. Use it as is only if the wallet accepts self-signed certificates for `x509_hash`.
- Read the instructions at the top of each test.

## OpenID4VP verifier

- **Plan**: `oid4vp-1final-verifier-haip-test-plan`. The suite plays a fake wallet.
- **Options**: credential format `sd_jwt_vc` or `iso_mdl`, and response mode `direct_post.jwt` or the DC API.
- **Configuration**:
  - Set your `client_id`.
  - Set a credential `signing_jwk` with an `x5c` that your verifier trusts. The prefilled self-signed one works if you trust it.
- **Running**:
  - Start the test, which then waits.
  - Send the request to the suite's exported `authorization_endpoint` instead of `openid4vp://`.
  - Alternatively, paste the `openid4vp://` URL into the suite or scan its QR code.
- The page recommends the demo server for the newest tests. Negative tests, such as bad key binding, are still being added.

## OpenID4VCI issuer

- **Plan**: "OpenID for Verifiable Credential Issuance 1.0 Final/HAIP: Test an Issuer".
- **Options**:
  - Credential format: `sd_jwt_vc` or `mdoc`. Run the plan once per format.
  - Flow: authorization code, `wallet_initiated` or `issuer_initiated`. The pre-authorized code flow is not tested, because HAIP requires the authorization code flow.
- **Client authentication**: client attestation is required.
- **Setup**:
  - Register a client for the emulated wallet with redirect URI `https://www.certification.openid.net/test/a/<alias>/callback`.
  - The suite calls out from IP 35.196.44.185.
- **Configure**:
  - The credential issuer URL; the suite derives the metadata URL from it.
  - The credential and status list trust anchors, as PEM.
  - The credential configuration id.
  - Two client ids.
  - The client attestation issuer and attester keys, with `x5c`.
  - Optionally, key attestation keys.
- The suite requests the configured credential using the configuration id and the `scope` from its metadata.

## OpenID4VCI wallet

- **Plan**: "OpenID for Verifiable Credential Issuance 1.0 Final/HAIP: Test a Wallet". The suite plays the issuer at `https://www.certification.openid.net/test/a/<alias>/`.
- **Options**:
  - Flow: `wallet_initiated` or `issuer_initiated`.
  - Format: `sd_jwt_vc` or `mdoc`.
  - Offer delivery for issuer-initiated flows: `by_value` or `by_reference`.
- **Credential configurations**: the emulated issuer offers SD-JWT VC and mdoc configurations, with variants for attestation proofs, `jwt` proofs with key attestation, and no holder binding.
  - Its metadata is at `/.well-known/openid-credential-issuer/test/a/<alias>/` once the test starts.
  - When unsure, use `org.iso.18013.5.1.mDL` for mdoc and the default SD-JWT VC configuration the page names.
- **Configure**:
  - The signing JWK with its `x5c` chain.
  - For issuer-initiated flows, the credential offer endpoint URL, such as `haip-vci://`.
  - Server JWKS, client id, client attestation issuer and trust anchor, and the key attestation trust anchor.

## Checklist

- [ ] The plan matches the role, and for OpenID4VCI it has the "/HAIP" suffix.
- [ ] Every credential format to be certified has its own run.
- [ ] Certificates, trust anchors and the alias are your own. Self-signed defaults are used only where the implementation trusts them.
- [ ] Every module in the plan passes before submission.
