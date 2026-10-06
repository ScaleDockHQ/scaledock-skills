# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## Open Screen Network Protocol

Source: https://www.w3.org/TR/openscreen-network/

The Open Screen Network Protocol is a network protocol that allows two Open Screen agents to establish a secure network transport in an interoperable fashion.

- **Document conventions.** The key words “MUST”, “MUST NOT”, “REQUIRED”, “SHALL”, “SHALL NOT”, “SHOULD”, “SHOULD NOT”, “RECOMMENDED”, “MAY”, and “OPTIONAL” in the normative parts of this document are to be interpreted as described in RFC 2119.
- **2.1. General Requirements.** An Open Screen Network Protocol agent must be able to discover the presence of another OSP agent connected to the same IPv4 or IPv6 subnet and reachable by IP multicast.
- **2.1. General Requirements.** An OSP agent must be able to obtain the IPv4 or IPv6 address of the agent, a display name for the agent, and an IP port number for establishing a network transport to the agent.
- **2.2. Non-Functional Requirements.** It should be possible to implement the Open Screen Network Protocol using modest hardware requirements, similar to what is found in a low end smartphone, smart TV or streaming device.
- **2.2. Non-Functional Requirements.** The discovery and connection protocols should minimize power consumption, especially on a listening agent which is likely to be battery powered.
- **2.2. Non-Functional Requirements.** The protocol should minimize the amount of information provided to a passive network observer about the identity of the user or activities on the agent, including presentations, remote playbacks, or the content of media streams.
- **2.2. Non-Functional Requirements.** The protocol should prevent active network attackers from impersonating a display and observing or altering data intended for the controller or receiver.
- **2.2. Non-Functional Requirements.** A listening agent should be able to discover quickly when an advertising agent becomes available or unavailable (i.e., when it connects or disconnects from the network).

## Open Screen Application Protocol

Source: https://www.w3.org/TR/openscreen-application/

The Open Screen Application Protocol allows user agents to implement the Presentation API and the Remote Playback API in an interoperable fashion.

- **5.1. Presentation API.** When section 6.7.1 says "it MUST listen to and accept incoming connection requests from a controlling browsing context using an implementation specific mechanism", the receiver must receive and process the presentation-connection-open-request .
- **Document conventions.** The key words “MUST”, “MUST NOT”, “REQUIRED”, “SHALL”, “SHALL NOT”, “SHOULD”, “SHOULD NOT”, “RECOMMENDED”, “MAY”, and “OPTIONAL” in the normative parts of this document are to be interpreted as described in RFC 2119.
- **1. Introduction.** To maximize interoperability, browsers and devices should support the Open Screen Network Protocol, which provides a way for browsers and devices to discover, connect, and authenticate each other on a local area network.
- **2.3. Presentation API Requirements.** A controller must be able to determine if a receiver is reasonably capable of rendering a specific presentation request URL .
- **2.3. Presentation API Requirements.** A controller must be able to start a new presentation on a receiver given a presentation request URL and presentation identifier .
- **2.3. Presentation API Requirements.** A controller must be able to create a new PresentationConnection to an existing presentation on the receiver, given its presentation request URL and presentation identifier .
- **2.3. Presentation API Requirements.** It must be possible to close a PresentationConnection between a controller and a presentation, and signal both parties with the reason why the connection was closed.
- **2.3. Presentation API Requirements.** Multiple controllers must be able to connect to a single presentation simultaneously.
