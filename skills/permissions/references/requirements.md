# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## Permissions

Source: https://www.w3.org/TR/permissions/

This specification defines common infrastructure that other specifications can use to interact with browser permissions. These permissions represent a user's choice to allow or deny access to "powerful features" of the platform. For developers, the specification standardizes an API to query the permission state of a powerful feature, and be notified if a permission to use a powerful feature changes state.

- **4..** Specifying a powerful feature When a conforming specification specifies a powerful feature it: MUST give the powerful feature a name in the form of a ascii lowercase string.
- **4..** MUST register the powerful feature in the Permissions Registry .
- **4..** A feature that specifies a custom permission key type MUST also specify a permission key generation algorithm .
- **4..** A feature that specifies a custom permission key generation algorithm MUST also specify a permission key comparison algorithm .
- **4..** A permission lifetime : Specifications that define one or more powerful features SHOULD suggest a permission lifetime that is best suited for the particular feature.
- **6.2.1.** query() method When the query() method is invoked, the user agent MUST run the following query a permission algorithm, passing the parameter permissionDesc : If this 's relevant global object is a Window object, then: If the current settings object 's associated Document is not fully active , return a promise rejected with an " InvalidStateError " DOMException .
- **6.3.5.** Garbage collection A PermissionStatus object MUST NOT be garbage collected if it has an event listener whose type is change .
- **7. Conformance.** The key words MAY , MUST , MUST NOT , OPTIONAL , and SHOULD in this document are to be interpreted as described in BCP 14 [ RFC2119 ] [ RFC8174 ] when, and only when, they appear in all capitals, as shown here.

## Permissions Policy Level 1

Source: https://www.w3.org/TR/permissions-policy-1/

This specification defines a mechanism that allows developers to selectively enable and disable use of various browser features and APIs.

- **Document conventions.** The key words “MUST”, “MUST NOT”, “REQUIRED”, “SHALL”, “SHALL NOT”, “SHOULD”, “SHOULD NOT”, “RECOMMENDED”, “MAY”, and “OPTIONAL” in the normative parts of this document are to be interpreted as described in RFC 2119.
- **2. Examples.** Note that " https://example.com " is not covered by the allowlist entry " https://*.example.com " and must also be added.
- **2. Examples.** JSPlaygroundCorp should avoid iframing user-generated web applications using the allow attribute from its own domain in this case, as this would grant its domain permissions to all of them.
- **2. Examples.** An iframe where the component "app1" should have camera access, "app2" should have microphone access, and "app3" should have both might look like this: <iframe allow="camera https://app1.site.com https://app3.site.com; microphone https://app2.site.com https://app3.site.com" src="https://doc1.site.com" sandbox="allow-same-origin allow-scripts"> </iframe> Iframe attributes can selectively enable…
- **4.1. Policy-controlled Features.** Other specifications, defining such features, should use the longer term to avoid any ambiguity.
- **4.1. Policy-controlled Features.** We should figure out how to word this to include the possibility of features and permissions policies in Workers and Worklets as well.
- **5.2. Structured header serialization.** The Member Values represent allowlists , and must be one of: a String containing the ASCII permissions-source-expression the Token * the Token self an Inner List containing zero or more of the above items.
- **5.2. Structured header serialization.** Member Values may have a Parameter named "report-to" , whose value must be a Token .
