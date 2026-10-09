# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are normative sentences from the published text, quoted as written (only line breaks were joined). Apply the ones that match the role. Each is labelled with the section it comes from in the published document.

## Push API

Source: https://www.w3.org/TR/push-api/

- **§ 3.4.** A push endpoint MUST uniquely identify the push subscription.
- **§ 3.4.** If the user agent has to change the keys of a push subscription for any reason and the push subscription's associated service worker registration is non-null, it MUST refresh the push subscription.
- **§ 3.4.2.** The new push subscription MUST have a key pair that's different from the original subscription.
- **§ 3.4.2.** Once messages have been received for a refreshed push subscription, any old push subscriptions MUST be deactivated.
- **§ 3.4.3.** When a push subscription is deactivated, both the user agent and the push service MUST delete any stored copies of its details.
- **§ 3.4.3.** Subsequent push messages for this push subscription MUST NOT be delivered.
- **§ 4.** The push endpoint MUST NOT expose information about the user to be derived by actors other than the push service, such as the user's device, identity or location.
- **§ 4.** The push endpoint of a deactivated push subscription MUST NOT be reused for a new push subscription.
- **§ 7.** User agents MUST support the aes128gcm content coding defined in [RFC8291], and MAY support content codings defined in previous versions of the draft for compatibility reasons.
- **§ 7.2.** If present, the value of applicationServerKey MUST include a point on the P-256 elliptic curve [DSS], encoded in the uncompressed form described in [ANSI-X9-62] Annex A (that is, 65 octets, starting with an 0x04 octet).
- **§ 7.2.** When provided as a DOMString, the value MUST be encoded using the base64url encoding [RFC7515].
- **§ 7.2.** The applicationServerKey MUST be a different value to the one used for message encryption [RFC8291].
- **§ 8.** The user agent MUST use a serialization method that does not contain input-dependent branches (that is, one that is constant time).

## RFC 8030: Generic Event Delivery Using HTTP Push

Source: https://www.rfc-editor.org/rfc/rfc8030.html

- **RFC 8030 § 3.** The push service MUST use HTTP over Transport Layer Security (TLS) [RFC2818] following the recommendations in [RFC7525].
- **RFC 8030 § 5.2.** An application server MUST include the TTL (Time-To-Live) header field in its request for push message delivery.
- **RFC 8030 § 5.4.** For use with this protocol, the Topic header field MUST be restricted to no more than 32 characters from the URL and a filename-safe Base 64 alphabet [RFC4648].
- **RFC 8030 § 7.2.** Push services MUST NOT return a 413 status code in responses to an entity body that is 4096 bytes or less in size.
- **RFC 8030 § 7.3.** A push service MUST return a 404 (Not Found) status code if an application server attempts to send a push message to an expired push message subscription.

## RFC 8291: Message Encryption for Web Push

Source: https://www.rfc-editor.org/rfc/rfc8291.html

- **RFC 8291 § 3.2.** A user agent MUST generate and provide a hard-to-guess sequence of 16 octets that is used for authentication of push messages.
- **RFC 8291 § 4.** An application server MUST encrypt a push message with a single record.
- **RFC 8291 § 4.** A push message MUST include the application server ECDH public key in the "keyid" parameter of the encrypted content coding header.
- **RFC 8291 § 7.** The user agent and application MUST verify that the public key they receive is on the P-256 curve.

## RFC 8292: Voluntary Application Server Identification (VAPID) for Web Push

Source: https://www.rfc-editor.org/rfc/rfc8292.html

- **RFC 8292 § 2.** The signature MUST use ECDSA on the NIST P-256 curve [FIPS186], which is identified as "ES256" [RFC7518].
- **RFC 8292 § 3.2.** An application server MUST select a different private key for the key exchange [RFC8291] and signing the authentication token.
- **RFC 8292 § 4.2.** A push service MUST reject a message sent to a restricted push message subscription if that message includes no "vapid" authentication or invalid "vapid" authentication.
