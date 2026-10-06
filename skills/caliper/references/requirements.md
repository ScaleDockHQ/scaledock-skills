# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## Caliper 1.2

Source: https://www.imsglobal.org/spec/caliper/v1p2/

1EdTech Caliper Analytics® is a technical specification that describes a structured set of vocabulary that assists institutions in collecting learning and usage data from digital resources and learning tools. This data can be used to present information to students, instructors, advisers, and administrators in order to drive effective decision making and promote learner success.

- **IPR and Distribution Notice.** ANY USE OF THIS SPECIFICATION SHALL BE MADE ENTIRELY AT THE IMPLEMENTER'S OWN RISK, AND NEITHER THE CONSORTIUM, NOR ANY OF ITS MEMBERS OR SUBMITTERS, SHALL HAVE ANY LIABILITY WHATSOEVER TO ANY IMPLEMENTER OR THIRD PARTY FOR ANY DAMAGES OF ANY NATURE WHATSOEVER, DIRECTLY OR INDIRECTLY, ARISING FROM THE USE OF THIS SPECIFICATION.
- **1.2 Terminology.** Each Caliper Event MUST be assigned a UUID that is expressed as a URN using the form "urn:uuid:<UUID>" as described in [ RFC4122 ].
- **1.3 Conformance Statements.** The key words " MAY ", " MUST ", " MUST NOT ", " OPTIONAL ", " RECOMMENDED ", " REQUIRED ", " SHALL ", " SHALL NOT ", " SHOULD ", and " SHOULD NOT " in this document are to be interpreted as described in [ RFC2119 ].
- **1.3 Conformance Statements.** An implementation of this specification that fails to implement a MUST/REQUIRED/SHALL requirement or fails to abide by a MUST NOT/SHALL NOT prohibition is considered nonconformant.
- **1.3 Conformance Statements.** SHOULD/SHOULD NOT/RECOMMENDED statements constitute a best practice.
- **2.1 Event.** The type value is a string that MUST match the Term specified for the Event by the Caliper information model (e.g.
- **2.1 Event.** Each property MUST be referenced only once.
- **2.1 Event.** Custom attributes not described by the model MAY be included but MUST be added to the extensions property as a map of key:value pairs.
