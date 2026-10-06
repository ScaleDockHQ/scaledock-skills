# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## DIDComm Messaging 2.1

Source: https://identity.foundation/didcomm-messaging/spec/v2.1/

Contributors: Sam Curren (Indicio), Tobias Looker (MATTR), Oliver Terbu (ConsenSys), Kyle Den Hartog (MATTR), Baha Shaaban (SecureKey), Drummond Reed (Evernym), Steve McCown (Anonyome Labs), Troy Ronda (SecureKey), George Aristy (SecureKey), Vyacheslav Gudkov (DSR), Alexander Shcherbakov (DSR), Alexander Martynov (DSR), Daniel Buchner (Microsoft), Devin Fisher (Evernym), Orie Steele (Transmute), Brian Richter (Aviary Tech), Juan Caballero ( Centre.io ), @liormargalit, Timo Glastra (Animo Solutions), Andrew Whitehead (Government of British Columbia), Nader Helmy (MATTR), Markus Sabadello (Danube Tech), Patrick McClurg (SICPA), Stephen Curran (Government of British Columbia), Daniel Hardman (S

- **§ Specific Requirements.** The DIDComm Messaging design attempts to be: Secure (specifically, MUST preserve the integrity of messages against tampering; MUST allow the authenticity of messages and message senders to be proved; MUST use best-of-breed crypto; MUST allow parties to emit both repudiable and non-repudiable messages; perfect forward secrecy is not formally required due to the lack of a session construct, but…
- **§ IANA Media Types.** This is the default wrapping choice, and SHOULD be used unless a different goal is clearly identified.
- **§ IANA Media Types.** authcrypt(sign(plaintext)) application/didcomm-encrypted+json Adds no useful guarantees over the previous choice, and is slightly more expensive, so this wrapping combination SHOULD NOT be emitted by conforming implementations.
- **§ IANA Media Types.** If they choose to do so, they MUST emit an error if the signer of the plaintext is different from the sender identified by the authcrypt layer.
- **§ IANA Media Types.** However, in the set of envelopes that targets a single hop, envelope combinations other than the ones above MUST NOT be used.
- **§ IANA Media Types.** Aligning with RFC 7515 , IANA types for DIDComm messages MAY omit the application/ prefix; the recipient MUST treat media types not containing / as having the application/ prefix present.
- **§ DIDComm Plaintext Messages.** The media type for a generic DIDComm plaintext message MUST be reported as application/didcomm-plain+json by conformant implementations.
- **§ DIDComm Plaintext Messages.** The media type of the envelope MAY be set in the typ property of the plaintext; it SHOULD be set if the message is intended for use without a signature or encryption.
