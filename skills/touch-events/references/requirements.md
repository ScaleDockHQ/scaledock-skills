# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## Touch Events

Source: https://www.w3.org/TR/touch-events/

The Touch Events specification defines a set of low-level events that represent one or more points of contact with a touch-sensitive surface, and changes of those points with respect to the surface and any DOM elements displayed upon it (e.g. for touch screens) or associated with it (e.g. for drawing tablets without displays). It also addresses pen-tablet devices, such as drawing tablets, with consideration toward stylus capabilities.

- **2. Conformance.** The key words MUST , MUST NOT , REQUIRED , SHOULD , SHOULD NOT , RECOMMENDED , MAY , and OPTIONAL in this specification are to be interpreted as described in [ RFC2119 ].
- **WebIDL Conformance.** A conforming Web Events user agent must also be a conforming ECMAScript implementation of this IDL fragments in this specification, with the following exception: section 4.4.6 of Web IDL requires that IDL attributes are reflected as accessor properties on interface prototype objects.
- **WebIDL Conformance.** These data properties must have the same behavior when getting and setting as would be exhibited when invoking the getter and setter of the accessor properties on the platform object.
- **3. Touch Interface.** Touch objects are immutable; after one is created, its attributes must not change.
- **3.1 Attributes.** When a touch point becomes active, it must be assigned an identifier that is distinct from any other active touch point .
- **3.1 Attributes.** While the touch point remains active, all events that refer to it must assign it the same identifier .
- **4. TouchList Interface.** TouchList objects are immutable; after one is created, its contents must not change.
- **5. TouchEvent Interface.** TouchEvent objects are immutable; after one is created and initialized, its attributes must not change.
