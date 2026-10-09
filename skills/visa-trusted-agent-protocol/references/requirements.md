# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06 and are quoted as written. The Merchant Specifications page mostly uses lowercase should/must for its verification steps, with BCP 14 capitals only in the ID token tables; the quotes are its defining rules. Apply the ones that match the role. Each is labelled with the page's section heading and, in parentheses, the step or field.

## Merchant Specifications: agent recognition signature

Source: https://developer.visa.com/capabilities/trusted-agent-protocol/trusted-agent-protocol-specifications

Quoted from the page text with HTML tags removed. The page spells the expiry parameter `expires` in the field table and `expired` in the timestamp step.

- **Agent Recognition Signature: Required Message Signature Fields.** Below is the minimum list of fields required to be a trusted Agent.
- **Agent Recognition Signature: Required Message Signature Fields (tag).** Will contain the value of agent-browser-auth or agent-payer-auth based on the type of interaction
- **Agent Recognition Signature: Required Message Signature Fields (nonce).** If there are multiple message signatures in the header, the session identifier should be the same nonce used in other message signatures.
- **Agent Recognition Signature: Verification Steps.** If the header does not contain a message signature with a Signature-Input field containing a tag of either agent-browser-auth or agent-payer-auth, the message has not been signed by a trusted agent.
- **Agent Recognition Signature: Verification Steps (Minimum fields).** If any of the fields listed in the table above are missing, the message should be blocked.
- **Agent Recognition Signature: Verification Steps (Timestamps).** The timestamps (created and expired) should fall within the current GMT time and should not be more than 8 minutes apart.
- **Agent Recognition Signature: Verification Steps (Nonce).** If maintaining a record of all nonces received in the last 8 minutes, if the nonce received matches a recorded nonce, the message should be blocked.
- **Agent Recognition Signature: Verification Steps (Locate the public key).** If the public key cannot be retrieved or the public key has expired, the message should be blocked.
- **Agent Recognition Signature: Verification Steps (Validate the signature).** If signature validation fails, the message should be blocked.

## Merchant Specifications: consumer recognition and payment

Source: https://developer.visa.com/capabilities/trusted-agent-protocol/trusted-agent-protocol-specifications

- **Consumer Recognition.** That is, the Agentic Consumer Recognition Object contains a signature signed with the same private key used to sign the message signature and one of the fields signed is the same nonce present in the message signature.
- **Consumer Recognition (kid).** This value should be the same key identifier (keyid) present in the message signature.
- **Consumer Recognition: Validate the signature.** The signature base string is a canonical representation of all fields in the object in the order received except for the signature itself.
- **Payment: Verification Steps (Minimum fields).** If any of the fields listed in the table above are missing, the content of the object is inaccurate and should not be used for processing any payment.
- **Payment: Verification Steps (Nonce).** If a message signature was present for this interaction and the nonce contained in the object does not match the nonce received in the message signature, the content of the object is inaccurate and should not be used for processing any payment.
- **Payment: Verification Steps (Validate the signature).** If signature validation fails, the content of the object is inaccurate and should not be used for processing any payment.
- **Processing of Payment Data: Payment Credential Hash.** If the hashes do not match, the information being key entered is most likely fraudulent and the Merchant should decline the transaction.
- **Processing of Payment Data: Browsing IOU.** Prior to granting access to the resource, the Merchant must verify that the data in the IOU matches the data returned in the 402 response and verify the signature.

## Merchant Specifications: keys and ID token

Source: https://developer.visa.com/capabilities/trusted-agent-protocol/trusted-agent-protocol-specifications

- **Public Keys Retrieval Service.** Each key must be easily identifiable so it can be selected by the relying party based on the kid or keyid specified in the header of the JWS or Signature-Input respectively.
- **Public Keys Retrieval Service.** The relying party selects the corresponding public key that matched the key ID and performs verification of the signature following the known or indicated algorithm
- **ID Token: Token Header (alg).** PS256 is preferred to RS256 following the recommendation in RFC 3447
- **ID Token: Token Header (kid).** The key type of the public key identified by the Key ID MUST match the type of the signing algorithm
- **ID Token: Public Claims (exp).** Expiration time on or after which the ID Token SHOULD NOT be accepted for processing.

## Repository README

Source: https://raw.githubusercontent.com/visa/trusted-agent-protocol/16d59bdf3f8a542bc538d0962edbb80ea30a02af/README.md

- **The Solution.** The agent presents a secure signature that includes timestamps, a unique session identifier, key identifier, and algorithm identifier, allowing you to verify that the signature is current and prevent relays or replays.
- **Key Benefits.** Each signature includes unique, time-sensitive elements that ensure every request is fresh and valid only for a single use.
