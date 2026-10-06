# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## Device Memory API Level 1

Source: https://www.w3.org/TR/device-memory-1/

This document defines a HTTP Client Hint header and a JavaScript API to surface device capability for memory (device RAM) in order to enable web apps to customize content depending on device memory constraints.

- **Document conventions.** The key words “MUST”, “MUST NOT”, “REQUIRED”, “SHALL”, “SHALL NOT”, “SHOULD”, “SHOULD NOT”, “RECOMMENDED”, “MAY”, and “OPTIONAL” in the normative parts of this document are to be interpreted as described in RFC 2119.
- **2. Computing device memory value.** The range between the upper and the lower bounds should include the majority of device memory values but exclude rare device memory values to mitigate device fingerprinting.
- **3. Sec - CH - Device - Memory (Client Hint) Header Field.** The ABNF (Augmented Backus-Naur Form) syntax for the `Sec - CH - Device - Memory` header field is as follows: Sec-CH-Device-Memory = sf-decimal The `Sec - CH - Device - Memory`'s value should be set to the user agent ’s deviceMemory .
- **4.1. JavaScript examples.** Note: The web application should consider how to handle browsers that do not support the API: either by enabling by default, or disabling by default.
- **5. Security & privacy considerations.** These bounds should be reviewed over time as commonly used device memory characteristics change.
- **5. Security & privacy considerations.** Device type should be taken into account when defining these bounds since mobile devices typically have different characteristics than desktops and laptops.
- **Conformant Algorithms.** Requirements phrased in the imperative as part of algorithms (such as "strip any leading space characters" or "return false and abort these steps") are to be interpreted with the meaning of the key word ("must", "should", "may", etc) used in introducing the algorithm.
