# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## Attribution Level 1

Source: https://www.w3.org/TR/attribution/

This specifies a browser API for attribution. The API produces aggregate statistics that can help sites better understand the real-world performance of their advertising. This API collates information about people from multiple web origins, which could be a significant risk to their privacy. To manage this risk, the information that is gathered is aggregated and differential privacy techniques are applied.

- **Document conventions.** The key words “MUST”, “MUST NOT”, “REQUIRED”, “SHALL”, “SHALL NOT”, “SHOULD”, “SHOULD NOT”, “RECOMMENDED”, “MAY”, and “OPTIONAL” in the normative parts of this document are to be interpreted as described in RFC 2119.
- **Terms defined by reference.** [] defines the following terms: collective privacy cross-context recognition cross-site recognition fingerprint fingerprinting same-site recognition [CLEAR-SITE-DATA] defines the following terms: Clear-Site-Data [CSS-2025] defines the following terms: user [CSS-VALUES-4] defines the following terms: integer [CSS2] defines the following terms: SHOULD NOT [DOM] defines the following terms: Document…
- **3.4. Saving Impressions.** The user agent should impose an upper limit on the lifetime, and silently reduce the value specified here if it exceeds that limit.
- **4.1.2. Maintenance.** The user agent should periodically use the timestamp and lifetime values to identify and delete any impressions in the impression store that have expired.
- **4.1.2. Maintenance.** However, the user agent should not retain expired impressions indefinitely.
- **4.1.4. Site Names.** These sites must all be in scheme-and-host form, with a scheme of " https ".
- **4.2.2. Attribution API Activation.** This should be no less than the transient activation duration , though a larger value might be advisable to ensure that delays from navigation do not cause the Attribution API to become inaccessible.
- **4.2.2. Attribution API Activation.** When a user interaction causes firing of an activation triggering input event in a Document document , the user agent must perform the steps below—​in addition to the activation notification steps—​before dispatching the event.
