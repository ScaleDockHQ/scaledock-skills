# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## AMQP 1.0

Source: https://docs.oasis-open.org/amqp/core/v1.0/os/amqp-core-overview-v1.0-os.html

OASIS Advanced Message Queuing Protocol (AMQP) Version 1.0, Part 0: Overview OASIS Advanced Message Queuing Protocol (AMQP) Version 1.0

- **← 0.1 Introduction.** Every compliant AMQP process MUST be able to send and receive messages in this standard encoding.
- **← 0.1.1 Terminology.** The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this specification are to be interpreted as described in IETF RFC 2119 [ RFC2119 ].
- **← 0.2 Conformance.** A conformant implementation MUST perform protocol negotiation (see section 2.2 ), and then parse, process, and produce frames in accordance with the format and semantics defined in parts 1 through 5 of this specification.
- **← 0.2 Conformance.** Conformant implementations MUST NOT require the use of any extensions defined outside this document in order to interoperate with any other conformant implementation.
- **← 0.2 Conformance.** Part 1 of this document defines the type system and type encodings that every conformant implementation MUST implement.
- **← 0.2 Conformance.** Every conformant implementation of AMQP over TCP MUST implement Part 2.
- **← 0.2 Conformance.** A conformant implementation MUST implement Part 2 or a mapping of AMQP to some non-TCP protocol.
- **← 0.2 Conformance.** Where an implementation does not allow for a behavior the implementation MUST respond according to the rules defined within Part 2 of the specification.
