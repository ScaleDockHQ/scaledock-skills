# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## Digital Credentials

Source: https://www.w3.org/TR/digital-credentials/

This document specifies an API enabling user agents to mediate the presentation and issuance of digital credentials , such as a driver's license, government-issued identification card, or other types of digital credential . The API builds on Credential Management Level 1 and is designed to be agnostic to credential formats.

- **5..** A user agent MUST support all the presentation protocols listed in the table of supported presentation and issuance protocols .
- **7.7.** To simplify the developer experience of get () calls involving a DigitalCredential , user agents MUST NOT throw an error if the mediation member is absent or has a value other than " required ".
- **7.7.** Similarly, in create () calls involving a DigitalCredential , user agents MUST NOT throw an error if the mediation member is absent or has a value other than " required ".
- **7.7.3.** User agents MUST NOT vary the response value based on any information about availability of hardware, presence or configuration of software, credential managers , or digital credentials, or user configuration or preferences.
- **7.7.3.** The response value SHOULD vary only by user agent major version and indicate whether the browser supports distributing requests with that protocol to underlying platform or provider.
- **7.7.3.** When this method is invoked, the user agent MUST return the result of user agent allows protocol given protocol .
- **8.2.** [[Store]](credential, sameOriginWithAncestors) internal method When invoked, the [[Store]](credential, sameOriginWithAncestors) MUST call the default implementation of Credential 's [[Store]]( credential , sameOriginWithAncestors ) internal method with the same arguments.
- **11.3.1.** Presentation Protocol Considerations for User Privacy Issue 255 : Define concrete privacy and security requirements for the supported protocols privacy-tracker security-tracker registry privacy-considerations security-considerations There are two requirements for protocols that I think need further elaboration: MUST have undergone privacy review [...] And MUST have undergone security review [...]…
