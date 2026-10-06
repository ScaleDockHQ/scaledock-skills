# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## Secure Payment Confirmation

Source: https://www.w3.org/TR/secure-payment-confirmation/

Secure Payment Confirmation (SPC) is a Web API to support streamlined authentication during a payment transaction. It is designed to scale authentication across merchants, to be used within a wide range of authentication protocols, and to produce cryptographic evidence that the user has confirmed transaction details.

- **4.7. Availability of Secure Payment Confirmation capabilities.** partial interface PaymentRequest { static Promise < SecurePaymentConfirmationCapabilities > getSecurePaymentConfirmationCapabilities (); }; typedef record < DOMString , boolean > SecurePaymentConfirmationCapabilities ; Keys in SecurePaymentConfirmationCapabilities MUST be sorted in ascending lexicographical order.
- **4.7. Availability of Secure Payment Confirmation capabilities.** The set of keys SHOULD contain the set of enumeration values of SecurePaymentConfirmationCapability , but the user agent MAY omit keys as it deems necessary; see § 12.6 Fingerprinting via getSecurePaymentConfirmationCapabilities .
- **4.10. Displaying a transaction confirmation UX.** When PaymentRequest.show() is called and the Secure Payment Confirmation payment handler is selected (steps 19-24 of that algorithm), the User Agent MUST present the user with a user interface that allows them to select if and how they wish to proceed.
- **4.10.1. Information presented to the user.** However, so that a Relying Party can trust the information included in CollectedClientPaymentData , the User Agent MUST ensure that the following is communicated to the user and that the user’s consent is collected for the authentication: The payeeName if it is present.
- **4.10.1. Information presented to the user.** The user agent is not required to display the label for each PaymentEntityLogo , but SHOULD use them for accessibility purposes.
- **4.10.1. Information presented to the user.** If showOptOut is true , the user agent MUST give the user the opportunity to indicate that they want to opt out of the process for the given relying party .
- **4.10.2. Outcome of the transaction confirmation UX.** A User Agent MUST allow the user to indicate one of the following options as to if and how to proceed: The user wishes to proceed with the payment, using an SPC Credential to authenticate, Run the user accepts the payment request algorithm on the PaymentRequest the user is interacting with.
- **9.1. Verifying an Authentication Assertion.** In order to perform an authentication ceremony for Secure Payment Confirmation, the Relying Party MUST proceed as follows: Let credential be a PublicKeyCredential returned from a successful invocation of the Secure Payment Confirmation payment handler by the SPC caller .
