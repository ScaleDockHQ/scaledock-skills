# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## Web IDL Living Standard

Source: https://webidl.spec.whatwg.org/review-drafts/2026-09/

This standard defines an interface definition language, Web IDL, that can be used to describe interfaces that are intended to be implemented in web browsers.

- **Web IDL.** Developers should refer to the Living Standard for the most current error corrections and other developments.
- **2.1. Names.** The identifier of any of the abovementioned IDL constructs (except operation arguments) must not be " constructor ", " toString ", or begin with a U+005F (_).
- **2.1. Names.** Although the " toJSON " identifier is not a reserved identifier , it must only be used for regular operations that convert objects to JSON types , as described in § 2.5.3.1 toJSON .
- **2.1. Names.** Within the set of IDL fragments that a given implementation supports, the identifier of every interface , namespace , dictionary , enumeration , callback function , callback interface and typedef must not be the same as the identifier of any other interface , namespace , dictionary , enumeration , callback function , callback interface or typedef .
- **2.2. Interfaces.** An interface must not be declared such that its inheritance hierarchy has a cycle.
- **2.2. Interfaces.** The identifier of a partial interface definition must be the same as the identifier of an interface definition.
- **2.2. Interfaces.** Interfaces must be annotated with an [ Exposed ] extended attribute .
- **2.3. Interface mixins.** The identifier of a partial interface mixin definition must be the same as the identifier of an interface mixin definition .
