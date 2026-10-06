# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## OpenC2 Language 1.0

Source: https://docs.oasis-open.org/openc2/oc2ls/v1.0/oc2ls-v1.0.html

https://docs.oasis-open.org/openc2/oc2ls/v1.0/cs02/oc2ls-v1.0-cs02.md (Authoritative)

- **1.2 Terminology.** The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "NOT RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in [ RFC2119 ] and [ RFC8174 ] when, and only when, they appear in all capitals, as shown here.
- **3.1.4 Extensions.** All extensions MUST be identified with a short namespace reference, called a namespace identifier (NSID).
- **3.1.4 Extensions.** For example, the OASIS standard Stateless Packet Filtering actuator profile has: Unique Name : http://docs.oasis-open.org/openc2/oc2slpf/v1.0/oc2slpf-v1.0.md NSID : slpf The namespace identifier for non-standard extensions MUST be prefixed with "x-".
- **3.1.4 Extensions.** For example, the fictional, non-standard Superwidget actuator profile has: Unique Name : http://www.acme.com/openc2/superwidget-v1.0.html NSID : x-acme The list of Actions in Section 3.3.1.1 SHALL NOT be extended.
- **3.1.4 Extensions.** Extended Target names MUST be prefixed with a namespace identifier followed by a colon (":").
- **3.1.4 Extensions.** Extended Arguments MUST be defined within the extended Argument namespace.
- **3.1.4 Extensions.** } }, "args" : { "slpf" : { "direction" : "ingress" } } } The Actuator property of a Command, defined in Section 3.3.1.3 , MUST be extended using the namespace identifier as the Actuator name, called an extended Actuator namespace.
- **3.1.4 Extensions.** Actuator Specifiers MUST be defined within the extended Actuator namespace.
