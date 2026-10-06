# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## Webmention

Source: https://www.w3.org/TR/webmention/

Webmention is a simple way to notify any URL when you mention it on your site. From the receiver's perspective, it's a way to request notifications when other sites mention it.

- **2. Conformance.** The key words " MUST ", " MUST NOT ", " REQUIRED ", " SHALL ", " SHALL NOT ", " SHOULD ", " SHOULD NOT ", " RECOMMENDED ", " MAY ", and " OPTIONAL " in this document are to be interpreted as described in [ RFC2119 ].
- **3.1.2 Sender discovers receiver Webmention endpoint.** The sender MUST fetch the target URL (and follow redirects [ FETCH ]) and check for an HTTP Link header [ RFC5988 ] with a rel value of webmention .
- **3.1.2 Sender discovers receiver Webmention endpoint.** If the content type of the document is HTML, then the sender MUST look for an HTML <link> and <a> element with a rel value of webmention .
- **3.1.2 Sender discovers receiver Webmention endpoint.** Senders MUST support all three options and fall back in this order.
- **3.1.2 Sender discovers receiver Webmention endpoint.** The endpoint MAY be a relative URL, in which case the sender MUST resolve it relative to the target URL according to [ URL ].
- **3.1.2 Sender discovers receiver Webmention endpoint.** The endpoint MAY contain query string parameters, which MUST be preserved as query string parameters and MUST NOT be sent as POST body parameters when sending the Webmention request.
- **3.1.3 Sender notifies receiver.** The sender MUST post x-www-form-urlencoded [ HTML5 ] source and target parameters to the Webmention endpoint, where source is the URL of the sender's page containing a link, and target is the URL of the page being linked to.
- **3.1.3 Sender notifies receiver.** Note that if the Webmention endpoint URL contains query string parameters, the query string parameters MUST be preserved, and MUST NOT be sent in the POST body.
