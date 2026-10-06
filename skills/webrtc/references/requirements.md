# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## WebRTC: Real-Time Communication in Browsers

Source: https://www.w3.org/TR/webrtc/

This document defines a set of ECMAScript APIs in WebIDL to allow media and generic application data to be sent to and received from another browser or device implementing the appropriate set of real-time protocols. This specification is being developed in conjunction with a protocol specification developed by the IETF RTCWEB group and an API specification to get access to local media devices.

- **2. Conformance.** The key words MAY , MUST , MUST NOT , and SHOULD in this document are to be interpreted as described in BCP 14 [ RFC2119 ] [ RFC8174 ] when, and only when, they appear in all capitals, as shown here.
- **2. Conformance.** (In particular, the algorithms defined in this specification are intended to be easy to follow, and not intended to be performant.) Implementations that use ECMAScript to implement the APIs defined in this specification MUST implement them in a manner consistent with the ECMAScript Bindings defined in the Web IDL specification [ WEBIDL ], as this specification uses that specification and terminology.
- **4.2.1.** This implementation defined limit MUST be at least 32.
- **4.4.1.1.** Constructor When the RTCPeerConnection.constructor() is invoked, the user agent MUST run the following steps: If any of the steps enumerated below fails for a reason not specified here, throw an UnknownError with the message attribute set to an appropriate description.
- **4.4.1.3.** Whenever the state of an RTCDtlsTransport changes, the user agent MUST queue a task that runs the following steps: Let connection be this RTCPeerConnection object associated with the RTCDtlsTransport object whose state changed.
- **4.4.1.4.** ) , the ICE Agent MUST NOT gather candidates that would be administratively prohibited .
- **4.4.1.4.** ) , the ICE Agent MUST NOT attempt to connect to candidates that are administratively prohibited .
- **4.4.1.4.** If the process to apply description fails for any reason, then the user agent MUST queue a task that runs the following steps: If connection .

## Identifiers for WebRTC's Statistics API

Source: https://www.w3.org/TR/webrtc-stats/

This document defines a set of WebIDL objects that allow access to the statistical information about a RTCPeerConnection . These objects are returned from the getStats API that is specified in [ WEBRTC ].

- **2. Conformance.** The key words MAY , MUST , MUST NOT , and SHOULD in this document are to be interpreted as described in BCP 14 [ RFC2119 ] [ RFC8174 ] when, and only when, they appear in all capitals, as shown here.
- **2. Conformance.** Implementations that use ECMAScript to implement the objects defined in this specification MUST implement them in a manner consistent with the ECMAScript Bindings defined in the Web IDL specification [ WEBIDL ], as this document uses that specification and terminology.
- **2. Conformance.** They should put in their document text like this (EXAMPLE ONLY): An implementation MUST support generating statistics for the type RTCInboundRtpStreamStats , with members packetsReceived , bytesReceived , packetsLost , and jitter .
- **2. Conformance.** It MUST support generating statistics for the type RTCOutboundRtpStreamStats , with members packetsSent , bytesSent .
- **2. Conformance.** For all subclasses of RTCRtpStreamStats , it MUST include ssrc and kind .
- **2. Conformance.** When stats exist for both sides of a connection, in the form of an " inbound-rtp " / " remote-outbound-rtp " pair or an " outbound-rtp " / " remote-inbound-rtp " pair, the members remoteId and localId MUST also be present.
- **4.1.** The object MUST define a new value in the RTCStatsType enum, and MUST define the syntax of the stats object it returns either by reference to an existing sub-dictionary of RTCStats or by defining a new sub-dictionary of RTCStats .
- **4.4.** When a stats object is deleted , subsequent getStats () calls MUST NOT return stats for that monitored object .

## WebRTC Encoded Transform

Source: https://www.w3.org/TR/webrtc-encoded-transform/

This API defines an API surface for manipulating the bits on MediaStreamTrack s being sent via an RTCPeerConnection .

- **2. Specification.** Whenever the encoder outputs an encoded frame , the user agent MUST invoke the encoder .
- **2. Specification.** Whenever the depacketizer outputs an encoded frame , the user agent MUST invoke the depacketizer .
- **2.1.1. Stream processing.** On the sender side, as part of readEncodedData , frames produced by the encoder MUST be enqueued into transformer .
- **2.1.1. Stream processing.** On the receiver side, as part of readEncodedData , frames produced by the depacketizer MUST be enqueued into transformer .
- **4.1.1. Members.** On populating this member, the user agent MUST return the value of the frame’s [[captureTime]] slot, shifted to be relative to Performance .
- **4.1.1. Members.** On populating this member, the user agent MUST return the value of the frame’s [[senderCaptureTimeOffset]] slot.
- **4.4.1. Members.** If the frame comes from a remotely sourced track, this MUST be converted from the level value defined in [RFC6464] .
- **4.4.1. Members.** If the [RFC6464] header extension is not present in the received packets of the frame, this value MUST be absent.

## Scalable Video Coding (SVC) Extension for WebRTC

Source: https://www.w3.org/TR/webrtc-svc/

This document defines a set of ECMAScript APIs in WebIDL to extend the WebRTC specification to enable configuration of encoding parameters for Scalable Video Coding (SVC). Discovery of SVC encoder and decoder capabilities is handled by the Media Capabilities specification.

- **2. Conformance.** The key words MAY , MUST , and SHOULD in this document are to be interpreted as described in BCP 14 [ RFC2119 ] [ RFC8174 ] when, and only when, they appear in all capitals, as shown here.
- **2. Conformance.** Implementations that use ECMAScript to implement the APIs defined in this specification MUST implement them in a manner consistent with the ECMAScript Bindings defined in the Web IDL specification [ WEBIDL ], as this specification uses that specification and terminology.
- **4.2.3 getParameters ().** The default scalabilityMode SHOULD be one of the temporal scalability modes (e.g.
- **5.1 Guidelines for addition of scalabilityMode values.** When proposing a scalabilityMode value, the following principles should be followed: The proposed scalabilityMode MUST define entries to the table in Section 5, including values for the Scalabilty Mode Identifier, spatial and temporal layers, Resolution Ratio, Inter-layer dependency and the corresponding AV1 scalability_mode_idc value (if assigned).
- **5.1 Guidelines for addition of scalabilityMode values.** The Scalability Mode Identifier SHOULD be consistent with the existing naming scheme, which utilizes L x T y to denote a scalabilityMode with x spatial layers using a 2:1 resolution ratio and y temporal layers.
- **5.1 Guidelines for addition of scalabilityMode values.** A dependency diagram MUST be supplied, in the format provided in Section 9.

## WebRTC Priority Control API

Source: https://www.w3.org/TR/webrtc-priority/

This API defines a control surface for manipulating the network control bits (DSCP bits) of outgoing WebRTC packets, and the queueing priority of outgoing WebRTC packets under congestion.

- **4.1. New RTCDataChannel attribute.** On getting, the attribute MUST return the value of the [[DataChannelPriority]] slot.
- **Document conventions.** The key words “MUST”, “MUST NOT”, “REQUIRED”, “SHALL”, “SHALL NOT”, “SHOULD”, “SHOULD NOT”, “RECOMMENDED”, “MAY”, and “OPTIONAL” in the normative parts of this document are to be interpreted as described in RFC 2119.
- **3.1. RTCPriorityType Enum.** Applications that use this API should be aware that often better overall user experience is obtained by lowering the priority of things that are not as important rather than raising the priority of the things that are.
- **Conformant Algorithms.** Requirements phrased in the imperative as part of algorithms (such as "strip any leading space characters" or "return false and abort these steps") are to be interpreted with the meaning of the key word ("must", "should", "may", etc) used in introducing the algorithm.

## Identity for WebRTC 1.0

Source: https://www.w3.org/TR/webrtc-identity/

This document defines a set of ECMAScript APIs in WebIDL to allow and application using WebRTC to assert an identity, and to mark media streams as only viewable by another identity. This specification is being developed in conjunction with a protocol specification developed by the IETF RTCWEB group.

- **2. Conformance.** The key words MAY , MUST , MUST NOT , and SHOULD are to be interpreted as described in [ RFC2119 ].
- **2. Conformance.** (In particular, the algorithms defined in this specification are intended to be easy to follow, and not intended to be performant.) Implementations that use ECMAScript to implement the APIs defined in this specification MUST implement them in a manner consistent with the ECMAScript Bindings defined in the Web IDL specification [ WEBIDL-1 ], as this specification uses that specification and terminology.
- **4.2 Instantiating an IdP Proxy.** The IdP MAY generate an HTTP redirect to another "https" origin, the browser MUST treat a redirect to any other scheme as a fatal error.
- **4.2.1 Implementing an IdP Securely.** Data that is acquired from a server SHOULD require credentials and be protected from cross-origin access.
- **5. Registering an IdP Proxy.** The IdP MUST call the register() function on the RTCIdentityProviderRegistrar instance during script execution.
- **5. Registering an IdP Proxy.** If an IdP is not registered during this script execution, the user agent cannot use the IdP proxy and MUST fail any future attempt to interact with the IdP.
- **Callback GenerateAssertionCallback.** The IdP MUST treat contents as opaque string.
- **Callback GenerateAssertionCallback.** A successful validation of the provided assertion MUST produce the same string.

## WebRTC Extended Use Cases

Source: https://www.w3.org/TR/webrtc-nv-use-cases/

This document describes an extended set of use cases motivating the development of additional WebRTC APIs, as well as the requirements derived from those use cases.

- **2.1 Multiparty online game with voice communications.** N02 The user agent must be capable of establishing multiple connections to peers without generating a separate configuration ("offer") for each connection prior to establishment.
- **2.1 Multiparty online game with voice communications.** N03 Congestion control must be able to manage audio quality and latency in a fair manner between multiple connections.
- **2.2 Mobile calling service.** Requirement ID Description N02 The user agent must be capable of establishing multiple connections to peers without generating a separate configuration ("offer") for each connection prior to establishment.
- **2.2 Mobile calling service.** N04 The ICE agent must be able to maintain multiple candidate pairs and move traffic between them.
- **2.2 Mobile calling service.** N05 The ICE agent must be able to take the network cost into account when considering re-routing.
- **2.2 Mobile calling service.** N30 The user agent must provide the ability to re-establish media after an interruption.
- **2.2 Mobile calling service.** N31 The user agent must provide notification of a media interruption caused by the OS (e.g.
- **2.2 Mobile calling service.** N32 The user agent must provide the ability to 'park' a connection such that it can be retrieved and continued by a newly loaded page to prevent accidental 'browsing away' from dropping a call irretrievably.
