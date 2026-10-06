# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## Remote Playback API

Source: https://www.w3.org/TR/remote-playback/

This specification defines an API extending the HTMLMediaElement that enables controlling remote playback of media from a web page.

- **1. Conformance.** The key words MAY , MUST , MUST NOT , RECOMMENDED , and SHOULD in this document are to be interpreted as described in BCP 14 [ RFC2119 ] [ RFC8174 ] when, and only when, they appear in all capitals, as shown here.
- **1. Conformance.** Implementations that use ECMAScript to expose the APIs defined in this specification MUST implement them in a manner consistent with the ECMAScript Bindings defined in the Web IDL specification [ WEBIDL ].
- **5.2.1.** If the user agent can monitor the list of available remote playback devices in the background (without a pending request to prompt () ), the RemotePlaybackAvailabilityCallback behavior defined below MUST be implemented by the user agent.
- **5.2.1.** Otherwise, the promise returned by watchAvailability () MUST be rejected with NotSupportedError .
- **5.2.1.1.** The set of availability callbacks The user agent MUST keep track of the set of availability callbacks registered with each media element through the watchAvailability() method.
- **5.2.1.2.** The list of available remote playback devices The user agent MUST keep a list of available remote playback devices .
- **5.2.1.2.** In this case the promise returned by watchAvailability () MUST be rejected with NotSupportedError , the global set of availability callbacks will be empty and the algorithm to monitor the list of available remote playback devices will only run as part of the initiate remote playback algorithm.
- **5.2.1.2.** When the global set of availability callbacks is not empty, the user agent MUST monitor the list of available remote playback devices continuously, so that pages can keep track of the last value received via the registered callbacks to offer remote playback only when there are available devices.
