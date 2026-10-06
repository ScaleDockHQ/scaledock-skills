# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## LwM2M 1.2

Source: https://www.openmobilealliance.org/release/LightweightM2M/V1_2-20201110-A/HTML-Version/OMA-TS-LightweightM2M_Core-V1_2-20201110-A.html

Use of this document is subject to all of the terms and conditions of the Use Agreement located at https://www.omaspecworks.org/about/policies-and-terms-of-use/ .

- **3.1. Conventions.** The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in [RFC2119].
- **5.1.2. Attributes Classification.** The LwM2M Server and LwM2M Client SHOULD support Table: 5.1.2.-1 Class Attributes , except when specifically mentioned as not required.
- **5.1.2. Attributes Classification.** Additionally, the following rules MUST be considered: a "Maximum Period" (pmax) applied to a Resource that is smaller than the "Minimum Period" applied to the same Resource MUST be ignored for that Resource, the "Change Value Conditions" are considered as valid, if the two following rules related to the Attributes defined in the table below ("Greater Than", "Less Than", "Step") are respected:
- **5.1.2. Attributes Classification.** ("lt" value < "gt" value) ("lt" value + 2*"st" values <"gt" value) When the "Change Value Conditions" Attributes are set in a single Write-Attributes operation, the operation MUST be rejected when the rules above are violated.
- **5.1.2. Attributes Classification.** After the expiry of epmax, the device MUST perform an evaluation per the "Notification Conditions".
- **5.1.2. Attributes Classification.** The behaviour of Notification class attributes MUST follow [DynLink] unless stated otherwise in this specification.
- **5.1.2. Attributes Classification.** The LwM2M Server MUST support and LwM2M Client SHOULD support all the <NOTIFICATION> Class Attributes listed in Table: 5.1.2.-2 class Attributes .
- **5.1.2. Attributes Classification.** Table: 5.1.2.-2 <NOTIFICATION> class Attributes Attribute Name CoRE Link param Attachment Assignation Level Required Access Mode Value Type Default Value Apply Condition Minimum Period "pmin" "=" 1*DIGIT Resource Resource Resource Instance Object Object Instance No RW Integer 0 (sec) Readable Resource Notes: The Minimum Period Attribute indicates the minimum time in seconds the LwM2M Client MUST…
