# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## Reporting API Level 1

Source: https://www.w3.org/TR/reporting-1/

This document defines a generic reporting framework which allows web developers to associate a set of named reporting endpoints with an origin. Various platform features can use these endpoints to deliver feature-specific reports in a consistent manner.

- **3.1. Document configuration.** Each object implementing WindowOrWorkerGlobalScope has an endpoints list, which is a list of endpoints , each of which MUST have a distinct name .
- **3.2. The Reporting-Endpoints HTTP Response Header Field.** If its value is not a valid URI-reference, that endpoint member MUST be ignored.
- **3.2. The Reporting-Endpoints HTTP Response Header Field.** Moreover, the URL that the member’s value represents MUST be potentially trustworthy [SECURE-CONTEXTS] .
- **3.5. Report Delivery.** That said, a user agent SHOULD make an effort to deliver reports as soon as possible after queuing, as a report’s data might be significantly more useful in the period directly after its generation than it would be a day or a week later.
- **5.1. Delivery.** The user agent SHOULD attempt to deliver reports as soon as possible to provide feedback to developers as quickly as possible.
- **5.1. Delivery.** For instance, the user agent SHOULD prioritize the transmission of reporting data lower than other network traffic.
- **5.2. Garbage Collection.** Periodically, the user agent SHOULD walk through the cached reports and endpoints , and discard those that are no longer relevant.
- **8.1. Capability URLs.** Specifications which extend this API and which include any URLs in a report’s body SHOULD require that they be similarly stripped.

## Network Error Logging

Source: https://www.w3.org/TR/network-error-logging/

This document defines a mechanism that enables developers to declare a network error reporting policy for a web application. A user agent can use this policy to report encountered network errors that prevented it from successfully fetching requested resources.

- **2. Conformance.** The key words MAY , MUST , MUST NOT , OPTIONAL , REQUIRED , and SHOULD in this document are to be interpreted as described in BCP 14 [ RFC2119 ] [ RFC8174 ] when, and only when, they appear in all capitals, as shown here.
- **3.1 Network requests.** A request MUST NOT result in a network request if the user agent is known to be offline (i.e., when navigator.
- **3.1 Network requests.** A request MUST NOT result in a network request if it is blocked due to mixed content or CORS failures.
- **3.1 Network requests.** Any CORS-preflight request MUST result in its own network request .
- **3.6 Policy cache.** A conformant user agent MUST provide a policy cache , which is a storage mechanism that maintains a set of NEL policies , keyed by ( network partition key , origin ) tuples.
- **3.6 Policy cache.** This storage mechanism is opaque, vendor-specific, and not exposed to the web, but it MUST provide the following methods which will be used in the algorithms this document defines: Insert, update, and delete NEL policies .
- **4.1 NEL response header.** The user agent MUST process the first valid policy in the array and ignore any additional policies in the array.
- **4.1 NEL response header.** User agents MUST ignore any unknown or invalid field(s) or value(s) that do not conform to the syntax defined in this specification.
