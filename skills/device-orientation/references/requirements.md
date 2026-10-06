# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## Device Orientation and Motion

Source: https://www.w3.org/TR/orientation-event/

This specification defines events that represent the physical orientation and motion of a hosting device. These events provide web applications with access to orientation and motion data. The specification is designed to be agnostic to the underlying sources of this data, aiming to achieve interoperability across different environments.

- **Document conventions.** The key words “MUST”, “MUST NOT”, “REQUIRED”, “SHALL”, “SHALL NOT”, “SHOULD”, “SHOULD NOT”, “RECOMMENDED”, “MAY”, and “OPTIONAL” in the normative parts of this document are to be interpreted as described in RFC 2119.
- **1. Introduction.** Where practically possible, the event should provide the acceleration of the device’s center of mass.
- **3.2. Device Motion.** As with device orientation, rotations must use the right-hand convention, such that positive rotation around an axis is clockwise when viewed along the positive direction of the axis.
- **4. Permissions.** For the implementation to fall back to absolute orientation data, the "magnetometer" permission must also be granted .
- **6.1. deviceorientation Event.** The alpha attribute must return the value it was initialized to.
- **6.1. deviceorientation Event.** The beta attribute must return the value it was initialized to.
- **6.1. deviceorientation Event.** The gamma attribute must return the value it was initialized to.
- **6.1. deviceorientation Event.** The absolute attribute must return the value it was initialized to.
