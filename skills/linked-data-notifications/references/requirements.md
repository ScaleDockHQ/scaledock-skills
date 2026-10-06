# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## Linked Data Notifications

Source: https://www.w3.org/TR/ldn/

Linked Data Notifications is a protocol that describes how servers (receivers) can have messages pushed to them by applications (senders), as well as how other applications (consumers) may retrieve those messages. Any resource can advertise a receiving endpoint (Inbox) for the messages. Messages are expressed in RDF, and can contain any data.

- **2. Conformance.** The key words " MUST ", " MUST NOT ", " REQUIRED ", " SHALL ", " SHALL NOT ", " SHOULD ", " SHOULD NOT ", " RECOMMENDED ", " MAY ", and " OPTIONAL " in this document are to be interpreted as described in [ RFC2119 ].
- **3.1 Discovery.** These may be carried out in either order, but if the first fails to result in an Inbox the second MUST be tried.
- **3.1 Discovery.** Senders and consumers SHOULD omit the Link header discovery when specifically targeting URIs with fragment identifiers.
- **Note.** A resource MUST advertise only one Inbox.
- **3.2 Sender.** Following discovery , senders who want to send notifications MUST deliver them through a POST request to the Inbox URL .
- **3.2 Sender.** Otherwise, the body of the POST request MUST contain the notification payload in JSON-LD with header Content-Type: application/ld+json .
- **3.2 Sender.** Senders SHOULD NOT make POST requests to the Inbox that are localhost or a loopback IP address.
- **3.3 Receiver.** Receivers MUST support GET and POST requests on the Inbox URL.
