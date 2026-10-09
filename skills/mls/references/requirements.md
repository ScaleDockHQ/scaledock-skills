# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are normative sentences from the published RFC text, quoted as written (only line breaks and page breaks from the plain-text layout were joined). Apply the ones that match the role. Each is labelled with the RFC and section it comes from.

## RFC 9420 The Messaging Layer Security (MLS) Protocol

Source: https://www.rfc-editor.org/rfc/rfc9420.html

- **RFC 9420 § 2.1.2.** The encoded value MUST use the smallest number of bits required to represent the value.
- **RFC 9420 § 5.3.1.** Whenever a new credential is introduced in the group, it MUST be validated with the AS.
- **RFC 9420 § 6.** Applications MUST use PrivateMessage to encrypt application messages and SHOULD use PrivateMessage to encode handshake messages, but they MAY transmit handshake messages encoded as PublicMessage objects in cases where it is necessary for the Delivery Service to examine such messages.
- **RFC 9420 § 6.1.** Recipients of an MLSMessage MUST verify the signature with the key depending on the sender_type of the sender as described above.
- **RFC 9420 § 6.2.** When decoding a PublicMessage into an AuthenticatedContent, the application MUST check membership_tag and MUST check that the FramedContentAuthData is valid.
- **RFC 9420 § 6.3.1.** A receiver MUST verify that there are no non-zero bytes in the padding field, and if this check fails, the enclosing PrivateMessage MUST be rejected as malformed.
- **RFC 9420 § 6.3.1.** To avoid this situation, the sender of a message MUST generate a fresh random four-byte "reuse guard" value and XOR it with the first four bytes of the nonce from the key schedule before using the nonce for encryption.
- **RFC 9420 § 7.2.** Applications MUST define a maximum total lifetime that is acceptable for a LeafNode, and reject any LeafNode where the total lifetime is longer than this duration.
- **RFC 9420 § 7.9.2.** When processing a Commit message that includes an UpdatePath, clients MUST recompute the expected value of parent_hash for the committer's new leaf and verify that it matches the parent_hash value in the supplied leaf_node.
- **RFC 9420 § 9.1.** Each key/nonce pair MUST NOT be used to encrypt more than one message.
- **RFC 9420 § 9.2.** As soon as a group member consumes a value, they MUST immediately delete (all representations of) that value.
- **RFC 9420 § 10.** The value for init_key MUST be a public key for the asymmetric encryption scheme defined by cipher_suite, and it MUST be unique among the set of KeyPackages created by this client.
- **RFC 9420 § 10.** A KeyPackage object with an invalid signature field MUST be considered malformed.
- **RFC 9420 § 11.** To protect against downgrade attacks, the creator MUST use the capabilities information in these KeyPackages to verify that the chosen version and cipher suite is the best option supported by all members.
- **RFC 9420 § 12.1.** On receiving a FramedContent containing a Proposal, a client MUST verify the signature inside FramedContentAuthData and that the epoch field of the enclosing FramedContent is equal to the epoch field of the current GroupContext object.
- **RFC 9420 § 12.2.** If the list of proposals is invalid, then the Commit message MUST be rejected as invalid.
- **RFC 9420 § 12.4.** A group member that has observed one or more valid proposals within an epoch MUST send a Commit message before sending application data.
- **RFC 9420 § 12.4.3.** New members MUST verify that group_id is unique among the groups they are currently participating in.
- **RFC 9420 § 12.4.3.3.** Regardless of how the client obtains the tree, the client MUST verify that the root hash of the ratchet tree matches the tree_hash of the GroupContext before using the tree for MLS operations.
- **RFC 9420 § 13.4.** * A client joining a group MUST verify that it supports every extension in the GroupContext for the group.
- **RFC 9420 § 13.5.** GREASE values MUST be handled using normal logic for processing unsupported values.
- **RFC 9420 § 14.** The generation of Commit messages MUST NOT modify a client's state, since the client doesn't know at that time whether the changes implied by the Commit message will conflict with another Commit or not.
- **RFC 9420 § 15.2.** During each epoch, senders MUST NOT encrypt more data than permitted by the security bounds of the AEAD scheme used [CFRG-AEAD-LIMITS].
- **RFC 9420 § 16.7.** The encryption and signature keys stored in the encryption_key and signature_key fields of ratchet tree nodes MUST be distinct from one another.
- **RFC 9420 § 17.1.** The mandatory-to-implement cipher suite for MLS 1.0 is MLS_128_DHKEMX25519_AES128GCM_SHA256_Ed25519, which uses Curve25519 for key exchange, AES-128-GCM for HPKE, HKDF over SHA2-256, and Ed25519 for signatures. MLS clients MUST implement this cipher suite.
