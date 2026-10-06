# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## Geolocation API 2016

Source: https://www.w3.org/TR/2016/REC-geolocation-API-20161108/

This specification defines an API that provides scripted access to geographical location information associated with the hosting device.

- **1 Conformance requirements.** The key words "MUST", "MUST NOT", "REQUIRED", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in the normative parts of this document are to be interpreted as described in RFC2119.
- **1 Conformance requirements.** [RFC2119] Requirements phrased in the imperative as part of algorithms (such as "strip any leading space characters" or "return false and abort these steps") are to be interpreted with the meaning of the key word ("must", "should", "may", etc) used in introducing the algorithm.
- **1 Conformance requirements.** Implementations that use ECMAScript to implement the APIs defined in this specification must implement them in a manner consistent with the ECMAScript Bindings defined in the Web IDL specification, as this specification uses that specification's terminology.
- **4 Security and privacy.** A conforming implementation of this specification must provide a mechanism that protects the user's privacy and this mechanism should ensure that no location information is made available through this API without the user's express permission.
- **4.1 Privacy.** considerations for implementers of the Geolocation API User agents must not send location information to Web sites without the express permission of the user.
- **4.1 Privacy.** User agents must acquire permission through a user interface, unless they have prearranged trust relationships with users, as described below.
- **4.1 Privacy.** The user interface must include the host component of the document's URI [URI] .
- **4.1 Privacy.** beyond the time when the browsing context [BROWSINGCONTEXT] is navigated to another URL) must be revocable and user agents must respect revoked permissions.

## Geolocation

Source: https://www.w3.org/TR/geolocation/

Geolocation provides access to geographical location information associated with the hosting device.

- **6.4.** clearWatch() method When clearWatch() is invoked, the user agent MUST : Remove watchId from this 's [[watchIDs]] .
- **6.5.** User agents MUST consider invoking set emulated position data as a significant change.
- **12..** User agents MUST consider this as a "significant change" in the wait for a significant change of geographic position step.
- **13. Conformance.** The key words MAY , MUST , and RECOMMENDED in this document are to be interpreted as described in BCP 14 [ RFC2119 ] [ RFC8174 ] when, and only when, they appear in all capitals, as shown here.
- **6.6.** If permission is "granted": Check if an emulated position should be used by running the following steps: Let emulatedPositionData be get emulated position data passing this .
