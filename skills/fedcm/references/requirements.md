# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## Federated Credential Management API Level 1

Source: https://www.w3.org/TR/fedcm-1/

A Web Platform API that allows users to login to websites with their federated accounts in a privacy preserving manner.

- **2.1.5. Clearing the Login Status Map data.** User agents MUST also clear the Login Status map data when: the user clears all cookies or site settings data The user agent MUST clear the entire map.
- **2.1.5. Clearing the Login Status Map data.** the user clears all cookies or all site data for a specific origin The user agent MUST remove all entries that would be affected by the deleted cookies, that is, any entry with an origin to which a deleted cookie could be sent to.
- **2.1.5. Clearing the Login Status Map data.** the user agent receives a Clear-Site-Data header with a value of "cookies" or "*" , and the request 's client is not null, and the client’s origin is same origin with the top-level origin while clearing cookies for origin it MUST remove any entries in the Login Status Map where the key is the input origin.
- **2.2. The connected accounts set.** If a user clears browsing data for an origin (cookies, localStorage, etc.), the user agent MUST remove all triples with an origin matching the origin from connected accounts set .
- **2.3.3. The [[DiscoverFromExternalSource]](origin, options, sameOriginWithAncestors) internal method.** When the IdentityCredential 's [[DiscoverFromExternalSource]](origin, options, sameOriginWithAncestors) algorithm is invoked, the user agent MUST execute the following steps.
- **2.3.3. The [[DiscoverFromExternalSource]](origin, options, sameOriginWithAncestors) internal method.** The user agent SHOULD wait a random amount of time before the next step if all of the following conditions hold: throwImmediately is false The promise rejection delay was not disabled by user agent automation The user agent has not implemented another way to prevent exposing to the RP whether the user has an account logged in to the RP Note: The intention here is as follows.
- **2.3.4. Create an IdentityCredential.** If loginStatus is logged-out , the user agent MUST do one of the following: Return (failure, false).
- **2.3.4. Create an IdentityCredential.** If the user continues, the user agent SHOULD set loginStatus to unknown .
