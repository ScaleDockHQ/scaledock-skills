# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## Referrer Policy

Source: https://www.w3.org/TR/referrer-policy/

This document describes how an author can set a referrer policy for documents they create, and the impact of such a policy on the Referer HTTP header for outgoing requests and navigations.

- **8.4. Strip url for use as a referrer.** Certain portions of URLs MUST not be included when sending a URL as the value of a `Referer` header: a URLs fragment, username, and password components should be stripped from the URL before it’s sent out.
- **Document conventions.** The key words “MUST”, “MUST NOT”, “REQUIRED”, “SHALL”, “SHALL NOT”, “SHOULD”, “SHOULD NOT”, “RECOMMENDED”, “MAY”, and “OPTIONAL” in the normative parts of this document are to be interpreted as described in RFC 2119.
- **4.1. Delivery via Referrer-Policy header.** The Referrer-Policy HTTP header specifies the referrer policy that the user agent applies when determining what referrer information should be included with requests made, and with browsing contexts created from the context of the protected resource.
- **7. Integration with CSS.** However, implementations should be sure to set the referrer-related properties of any requests initiated by stylesheets as follows: If a CSS declaration block is responsible for the request, set the referrer to the block’s owner node ’s node document ’s URL , and the referrer policy to the block’s owner node ’s node document ’s referrer policy .
- **9.1. User Controls.** Nothing in this specification should be interpreted as preventing user agents from offering options to users which would change the information sent out via a `Referer` header.
- **10.1. Information Leakage.** Authors wanting to ensure that they do not leak any more information than the default policy should instead use the policy states " same-origin " , " strict-origin " , " strict-origin-when-cross-origin " or " no-referrer " .
- **Conformant Algorithms.** Requirements phrased in the imperative as part of algorithms (such as "strip any leading space characters" or "return false and abort these steps") are to be interpreted with the meaning of the key word ("must", "should", "may", etc) used in introducing the algorithm.
