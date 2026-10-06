# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## WebSub

Source: https://www.w3.org/TR/websub/

WebSub provides a common mechanism for communication between publishers of any kind of Web content and their subscribers, based on HTTP web hooks. Subscription requests are relayed through hubs, which validate and verify the request. Hubs then distribute new and updated content to subscribers when it becomes available. WebSub was previously known as PubSubHubbub.

- **3. Conformance.** The key words " MUST ", " MUST NOT ", " REQUIRED ", " SHALL ", " SHALL NOT ", " SHOULD ", " SHOULD NOT ", " RECOMMENDED ", " MAY ", and " OPTIONAL " in this document are to be interpreted as described in [ RFC2119 ].
- **3.1 Conformance.** The key words MAY , MUST , MUST NOT , OPTIONAL , RECOMMENDED , REQUIRED , SHALL , SHALL NOT , SHOULD , and SHOULD NOT in this document are to be interpreted as described in BCP 14 [ RFC2119 ] [ RFC8174 ] when, and only when, they appear in all capitals, as shown here.
- **3.1.1.1 Publishers.** A conforming publisher MUST advertise topic and hub URLs for a given resource URL as described in Discovery .
- **3.1.1.2 Subscribers.** A conforming subscriber: MUST support each discovery mechanism in the specified order to discover the topic and hub URLs as described in Discovery .
- **3.1.1.2 Subscribers.** MUST send a subscription request as described in Subscriber Sends Subscription Request .
- **3.1.1.2 Subscribers.** MAY request a specific lease duration MAY include a secret in the subscription request, and if it does, then MUST use the secret to verify the signature in the content distribution request .
- **3.1.1.2 Subscribers.** MUST acknowledge a content distribution request with an HTTP 2xx status code.
- **3.1.1.3 Hubs.** A conforming hub: MUST accept a subscription request with the parameters hub.callback , hub.mode and hub.topic .
