# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## CTAP 2.3

Source: https://fidoalliance.org/specs/fido-v2.3-ps-20260226/fido-client-to-authenticator-protocol-v2.3-ps-20260226.html

This specification describes an application layer protocol for communication between a roaming authenticator and another client/platform, as well as bindings of this application protocol to a variety of transport protocols using different physical media. The application layer protocol defines requirements for such transport protocols. Each transport binding defines the details of how such transport layer connections should be set up, in a manner that meets the requirements of the application layer protocol.

- **1.1. Relationship to Other Specifications.** Thus a superseded document or feature SHOULD NOT be used unless the replacement is not implemented by the counterparty.
- **1.1. Relationship to Other Specifications.** a CTAP 2.1 authenticator MUST still support authenticatorClientPIN ’s getPinToken subcommand if it supports clientPIN and CTAP 2.0.) The [U2FUsbHid] , [U2FNfc] , [U2FBle] , and [U2FRawMsgs] specifications, specifically, are superseded by this specification.
- **1.1. Relationship to Other Specifications.** CTAP2 authenticators SHOULD also implement CTAP1/U2F.
- **2. Conformance.** The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "NOT RECOMMENDED", "MAY", and "OPTIONAL" in this specification are to be interpreted as described in [RFC2119] .
- **5. Terminology.** Note: Authenticators with a method to collect a user gesture inside the authenticator boundary via other methods MUST not use this method.
- **5. Terminology.** not a command from the platform.) The duration of this timeout is chosen by the authenticator but MUST be at least 10 seconds.
- **6. Authenticator API.** In order to accommodate authenticators with limited capacity, the following accommodations are made: The state SHOULD NOT be maintained across power cycles.
- **6. Authenticator API.** An authenticator MUST discard the state for a stateful command command if the pinUvAuthToken that authenticated the state initializing command expires since the stateful commands do not themselves always verify a pinUvAuthToken .

## CTAP 2.2

Source: https://fidoalliance.org/specs/fido-v2.2-ps-20250714/fido-client-to-authenticator-protocol-v2.2-ps-20250714.html

This specification describes an application layer protocol for communication between a roaming authenticator and another client/platform, as well as bindings of this application protocol to a variety of transport protocols using different physical media. The application layer protocol defines requirements for such transport protocols. Each transport binding defines the details of how such transport layer connections should be set up, in a manner that meets the requirements of the application layer protocol.

- **1.1. Relationship to Other Specifications.** Thus a superseded document or feature SHOULD NOT be used unless the replacement is not implemented by the counterparty.
- **1.1. Relationship to Other Specifications.** a CTAP 2.1 authenticator MUST still support authenticatorClientPIN ’s getPinToken subcommand if it supports clientPIN and CTAP 2.0.) The [U2FUsbHid] , [U2FNfc] , [U2FBle] , and [U2FRawMsgs] specifications, specifically, are superseded by this specification.
- **1.1. Relationship to Other Specifications.** CTAP2 authenticators SHOULD also implement CTAP1/U2F.
- **2. Conformance.** The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "NOT RECOMMENDED", "MAY", and "OPTIONAL" in this specification are to be interpreted as described in [RFC2119] .
- **5. Terminology.** not a command from the platform.) The duration of this timeout is chosen by the authenticator but MUST be at least 10 seconds.
- **6. Authenticator API.** In order to accommodate authenticators with limited capacity, the following accommodations are made: The state SHOULD NOT be maintained across power cycles.
- **6. Authenticator API.** An authenticator MUST discard the state for a stateful command command if the pinUvAuthToken that authenticated the state initializing command expires since the stateful commands do not themselves always verify a pinUvAuthToken .
- **6.1. authenticatorMakeCredential (0x01).** Authenticators MUST NOT error if the icon member is present, they MAY not store this value.

## CTAP 2.1

Source: https://fidoalliance.org/specs/fido-v2.1-ps-20210615/fido-client-to-authenticator-protocol-v2.1-ps-20210615.html

This specification describes an application layer protocol for communication between a roaming authenticator and another client/platform, as well as bindings of this application protocol to a variety of transport protocols using different physical media. The application layer protocol defines requirements for such transport protocols. Each transport binding defines the details of how such transport layer connections should be set up, in a manner that meets the requirements of the application layer protocol.

- **1.1. Relationship to Other Specifications.** Thus a superseded document or feature SHOULD NOT be used unless the replacement is not implemented by the counterparty.
- **1.1. Relationship to Other Specifications.** a CTAP 2.1 authenticator MUST still support authenticatorClientPIN 's getPinToken subcommand if it supports clientPIN and CTAP 2.0.) The [U2FUsbHid] , [U2FNfc] , [U2FBle] , and [U2FRawMsgs] specifications, specifically, are superseded by this specification.
- **1.1. Relationship to Other Specifications.** CTAP2 authenticators SHOULD also implement CTAP1/U2F.
- **2. Conformance.** The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "NOT RECOMMENDED", "MAY", and "OPTIONAL" in this specification are to be interpreted as described in [RFC2119] .
- **5. Terminology.** not a command from the platform.) The duration of this timeout is chosen by the authenticator but MUST be at least 10 seconds.
- **6. Authenticator API.** In order to accommodate authenticators with limited capacity, the following accommodations are made: The state SHOULD NOT be maintained across power cycles.
- **6. Authenticator API.** An authenticator MUST discard the state for a stateful command command if the pinUvAuthToken that authenticated the state initializing command expires since the stateful commands do not themselves always verify a pinUvAuthToken .
- **6.1. authenticatorMakeCredential (0x01).** Authenticators MUST NOT error if the icon member is present, they MAY not store this value.

## U2F 1.2

Source: https://fidoalliance.org/specs/fido-u2f-v1.2-ps-20170411/fido-u2f-raw-message-formats-v1.2-ps-20170411.html

https://fidoalliance.org/specs/fido-u2f-v1.2-ps-20170411/fido-u2f-raw-message-formats-v1.1-v1.2-ps-20170411.html

- **1.1 Key Words.** The key words “ MUST ”, “ MUST NOT ”, “ REQUIRED ”, “ SHALL ”, “ SHALL NOT ”, “ SHOULD ”, “ SHOULD NOT ”, “ RECOMMENDED ”, “ MAY ”, and “ OPTIONAL ” in this document are to be interpreted as described in [ RFC2119 ].
- **4.3 Registration Response Message: Success.** Note that U2F tokens SHOULD verify user presence before returning a registration response success message (otherwise they SHOULD return a test-of-user-presence-required message - see above).
- **5.1 Authentication Request Message - U2F_AUTHENTICATE.** If so, the U2F token MUST respond with an authentication response message:error:test-of-user-presence-required (note that despite the name this signals a success condition).
- **5.1 Authentication Request Message - U2F_AUTHENTICATE.** If the key handle was not created by this U2F token, or if it was created for a different application parameter, the token MUST respond with an authentication response message:error:bad-key-handle.
- **5.1 Authentication Request Message - U2F_AUTHENTICATE.** The signature SHOULD only be provided if user presence could be validated.
- **5.1 Authentication Request Message - U2F_AUTHENTICATE.** In all other cases (i.e., during authentication), the FIDO Client MUST use the enforce-user-presence-and-sign or don't-enforce-user-presence-and-sign values.
- **5.4 Authentication Response Message: Success.** The values of Bit 1 through 7 SHALL be 0; different values are reserved for future use.
- **7. Client Data.** The FIDO Client MUST send the Client Data (rather than its hash - the challenge parameter) to the relying party during the verification phase, where the relying party can re-generate the challenge parameter (by hashing the client data), which is necessary in order to verify the signature both on the registration response message and authentication response message.

## CTAP 2.3.1

Source: https://fidoalliance.org/specs/fido-v2.3.1-wd-20260529/fido-client-to-authenticator-protocol-v2.3.1-wd-20260529.html

This specification describes an application layer protocol for communication between a roaming authenticator and another client/platform, as well as bindings of this application protocol to a variety of transport protocols using different physical media. The application layer protocol defines requirements for such transport protocols. Each transport binding defines the details of how such transport layer connections should be set up, in a manner that meets the requirements of the application layer protocol. WORKING DRAFT

- **1.1. Relationship to Other Specifications.** Thus a superseded document or feature SHOULD NOT be used unless the replacement is not implemented by the counterparty.
- **1.1. Relationship to Other Specifications.** a CTAP 2.1 authenticator MUST still support authenticatorClientPIN ’s getPinToken subcommand if it supports clientPIN and CTAP 2.0.) The [U2FUsbHid] , [U2FNfc] , [U2FBle] , and [U2FRawMsgs] specifications, specifically, are superseded by this specification.
- **1.1. Relationship to Other Specifications.** CTAP2 authenticators SHOULD also implement CTAP1/U2F.
- **2. Conformance.** The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "NOT RECOMMENDED", "MAY", and "OPTIONAL" in this specification are to be interpreted as described in [RFC2119] .
- **5. Terminology.** Note: Authenticators with a method to collect a user gesture inside the authenticator boundary via other methods MUST not use this method.
- **5. Terminology.** not a command from the platform.) The duration of this timeout is chosen by the authenticator but MUST be at least 10 seconds.
- **6. Authenticator API.** In order to accommodate authenticators with limited capacity, the following accommodations are made: The state SHOULD NOT be maintained across power cycles.
- **6. Authenticator API.** An authenticator MUST discard the state for a stateful command command if the pinUvAuthToken that authenticated the state initializing command expires since the stateful commands do not themselves always verify a pinUvAuthToken .
