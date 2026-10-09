# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are normative sentences from the published text, quoted as written (only line breaks and hyphenation from PDF layout were joined). Apply the ones that match the role. Each is labelled with the nearest section, clause or article in the published document.

## Overview

Source: https://raw.githubusercontent.com/bluesky-social/atproto-website/7937e9cc5119a670311ac933d34fa7a0de04b0e9/src/app/%5Blocale%5D/specs/atp/en.mdx

- **Protocol Structure.** Applications interoperate by reading and writing user data records following published Lexicon schemas.
- **What is Missing?.** We recommend against simply "bolting on" encryption or private content using the existing protocol primitives.

## DIDs

Source: https://raw.githubusercontent.com/bluesky-social/atproto-website/7937e9cc5119a670311ac933d34fa7a0de04b0e9/src/app/%5Blocale%5D/specs/did/en.mdx

- **DIDs: did:web in AT Protocol.** In the context of atproto, only hostname-level `did:web` DIDs are supported: path-based DIDs are not supported.
- **DIDs: DID Documents.** The DID declared in the document (in the `id` field) should always be verified against what was expected (eg, used for resolution).
- **DIDs: DID Documents.** The `serviceEndpoint` field must contain an HTTPS URL of server.
- **DIDs: Usage and Implementation Guidelines.** While the currently-supported methods are _not_ case sensitive, and could be safely lowercased, protocol implementations should reject DIDs with invalid casing.

## Handles

Source: https://raw.githubusercontent.com/bluesky-social/atproto-website/7937e9cc5119a670311ac933d34fa7a0de04b0e9/src/app/%5Blocale%5D/specs/handle/en.mdx

- **Handles.** Handles must be bi-directionally linked to a DID: the DID document must claim the handle, and the handle must resolve to the DID identifier.
- **Handles: Handle Resolution.** The link between handle and DID must be confirmed bidirectionally, otherwise anybody could create handle aliases for third-party accounts.

## Repository

Source: https://raw.githubusercontent.com/bluesky-social/atproto-website/7937e9cc5119a670311ac933d34fa7a0de04b0e9/src/app/%5Blocale%5D/specs/repository/en.mdx

- **Repository: MST Structure.** In other words, empty nodes must be pruned from the top and bottom of the tree, but empty intermediate nodes must be kept, such that sub-tree links do not skip a level of depth.
- **Repository: CAR File Serialization.** The first element of the CAR `roots` metadata array must be the CID of the most relevant Commit object.

## Data Model

Source: https://raw.githubusercontent.com/bluesky-social/atproto-website/7937e9cc5119a670311ac933d34fa7a0de04b0e9/src/app/%5Blocale%5D/specs/data-model/en.mdx

- **Data Model: Data Types.** Implementations should ignore unknown `$` fields (to allow protocol evolution).
- **Data Model: blob Type.** Implementations should not throw errors when encountering the old format, but should never write them, and it is acceptable to only partially support them.

## Lexicon

Source: https://raw.githubusercontent.com/bluesky-social/atproto-website/7937e9cc5119a670311ac933d34fa7a0de04b0e9/src/app/%5Blocale%5D/specs/lexicon/en.mdx

- **Lexicon: permission.** Permission declarations with unsupported resource types or parameters (fields) must be ignored by services implementing access control.
- **Lexicon: union.** All the variants must be represented by a CBOR map (or JSON Object) and must include a `$type` field indicating the variant type.
- **Lexicon: Lexicon Evolution.** The basic principle is that all old data must still be valid under the updated Lexicon, and new data must be valid under the old Lexicon.
- **Lexicon: Lexicon Evolution.** If larger breaking changes are necessary, a new Lexicon name must be used.

## HTTP API (XRPC)

Source: https://raw.githubusercontent.com/bluesky-social/atproto-website/7937e9cc5119a670311ac933d34fa7a0de04b0e9/src/app/%5Blocale%5D/specs/xrpc/en.mdx

- **XRPC: Inter-Service Authentication (JWT).** Receiving services must verify that the audience field matches their own DID and service type, to prevent reuse or forwarding of tokens.

## Data Synchronization

Source: https://raw.githubusercontent.com/bluesky-social/atproto-website/7937e9cc5119a670311ac933d34fa7a0de04b0e9/src/app/%5Blocale%5D/specs/sync/en.mdx

- **Sync: Repository Revisions.** The revision must always increase between commits for the same repository, even if the account migrates between hosts or has an extended period of inactivity.
- **Sync: #commit Events.** The commit object must always be included, and the CAR header must indicate the commit block as the first "root".

## Cryptography

Source: https://raw.githubusercontent.com/bluesky-social/atproto-website/7937e9cc5119a670311ac933d34fa7a0de04b0e9/src/app/%5Blocale%5D/specs/cryptography/en.mdx

- **Cryptography: ECDSA Signature Malleability.** In atproto, use of the "low-S" signature variant is required for both `p256` and `k256` curves.
- **Cryptography: ECDSA Signature Malleability.** In atproto, signatures should always be verified using the verification routines provided by the cryptographic library, never by comparing signature values as raw bytes.
