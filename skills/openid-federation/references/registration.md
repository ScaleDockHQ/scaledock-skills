# Client registration: Automatic and Explicit

Sources: OpenID Federation for OpenID Connect 1.1 (Federation Connect) § 12; OpenID Federation 1.1 (Federation); OpenID Connect Relying Party Metadata Choices 1.0 (RP Metadata Choices).

## Choosing a method (Federation Connect § 12, § 12.4)

- Federations with OpenID Connect entities SHOULD agree on the registration methods they support. Other methods are allowed.
- Both methods also work for other OAuth 2.0 profiles, using `oauth_client` and `oauth_authorization_server` instead of `openid_relying_party` and `openid_provider`.
- `trust_anchor_hints` helps find shared Trust Anchors. RPs SHOULD choose a Trust Anchor they share with the OP when possible.

|                                                     | Automatic                                                | Explicit                                                                                     |
| --------------------------------------------------- | -------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| Registration step before the authentication request | None                                                     | A registration request with an Entity Configuration or a trust chain                         |
| Client ID                                           | The RP's Entity Identifier                               | Assigned by the OP                                                                           |
| Client authentication                               | Proof of control of a private key from the RP's metadata | Broader options, including a client secret                                                   |
| OP metadata                                         | `automatic` in `client_registration_types_supported`     | `explicit` in `client_registration_types_supported`, plus `federation_registration_endpoint` |

## Automatic Registration (Federation Connect § 12.1)

- The RP MUST resolve the OP's trust chain and metadata first. If that fails, it MUST NOT continue with the OP.
- The RP uses its Entity Identifier as `client_id` in every interaction. The OP fetches the RP's Entity Configuration from the well-known URL derived from it.
- Requests MUST be authenticated with asymmetric cryptography. The OP issues no client secret.
- An OP that supports it MUST list `automatic` in `client_registration_types_supported`.

### Authentication request (Federation Connect § 12.1.1)

- Send a signed Request Object, by value or by reference, or use a pushed authorization request. Requests that do not prove control of the RP's keys MUST be rejected.
- A deployment MAY disable `request_uri` by setting `request_uri_parameter_supported` to false, which makes denial of service harder.

Request Object claims (Federation Connect § 12.1.1.1):

| Claim               | Rule                                                                                                 |
| ------------------- | ---------------------------------------------------------------------------------------------------- |
| `aud`               | REQUIRED. The OP's Entity Identifier and no other value.                                             |
| `client_id`         | REQUIRED. The RP's Entity Identifier.                                                                |
| `iss`               | REQUIRED. The RP's Entity Identifier.                                                                |
| `sub`               | MUST NOT be present, so the JWT cannot be reused for `private_key_jwt`.                              |
| `jti`               | REQUIRED. A Request Object MUST be used only once unless reuse was negotiated.                       |
| `exp`               | REQUIRED.                                                                                            |
| `iat`               | OPTIONAL.                                                                                            |
| `trust_chain` claim | OPTIONAL and kept for historical reasons. The `trust_chain` header parameter is RECOMMENDED instead. |

```json
{
  "typ": "oauth-authz-req+jwt",
  "alg": "RS256",
  "kid": "kid-of-an-rp-key-in-the-trust-chain",
  "trust_chain": ["eyJ...rp-entity-configuration", "eyJ...subordinate-statement", "eyJ...trust-anchor"]
}
.
{
  "aud": "https://op.example.org",
  "client_id": "https://rp.example.com",
  "iss": "https://rp.example.com",
  "jti": "4d3ec0f81f134ee9a97e0449be6d32be",
  "exp": 1589699162,
  "iat": 1589699102,
  "response_type": "code",
  "redirect_uri": "https://rp.example.com/authz_cb",
  "scope": "openid profile",
  "nonce": "4LX0mFMxdBjkGmtx7a8WIOnB",
  "state": "YmX8PM9I7WbNoMnnieKKBiptVW0sP2OZ"
}
```

- With the `trust_chain` header, the RP MAY also send `peer_trust_chain` with the OP's chain to the same Trust Anchor. Both chains MUST share the Trust Anchor (Federation Connect § 12.1.1.1.1).

### OP processing (Federation Connect § 12.1.1.1.2)

1. If the `client_id` is a URL the OP has not registered, the OP SHOULD resolve the RP's trust chains.
2. A provided `trust_chain` MAY guide discovery, but the OP MUST fully verify every statement in it.
3. Otherwise, the OP MUST collect and validate chains starting from the RP's Entity Configuration, and resolve the `openid_relying_party` metadata (Federation § 10).
4. The OP SHOULD check that the Resolved Metadata conforms to Dynamic Client Registration.
5. The OP MUST verify the Request Object signature with the RP's `openid_relying_party` keys, and reject the request if it fails.

### Client authentication (Federation Connect § 12.1.4)

The RP declares its client authentication methods with `token_endpoint_auth_methods_supported` from RP Metadata Choices, or with `token_endpoint_auth_method`. OPs SHOULD accept any method both sides support, and RPs MUST use only mutually supported methods. Using the same method every time improves interoperability.

## Explicit Registration (Federation Connect § 12.2)

### Request (Federation Connect § 12.2.1)

1. The RP picks the Trust Anchors it shares with the OP, and MUST resolve the OP's chain and metadata first. If that fails, it MUST abort.
2. The RP picks `authority_hints` such that each one leads to at least one chosen Trust Anchor.
3. It builds an Entity Configuration, tailored to the OP, with `aud` set to the OP's Entity Identifier.
4. It POSTs it to `federation_registration_endpoint`, as `application/entity-statement+jwt`, or a whole chain as `application/trust-chain+json`.

### OP processing (Federation Connect § 12.2.2)

- Check the content type, then validate the JWT as an Entity Statement. Reject it if `aud` is not the OP's Entity Identifier.
- Without a chain in the request, collect and evaluate chains from the RP's `authority_hints`, then verify the Entity Configuration's signature. Choose one chain if several are acceptable.
- A provided chain MAY save fetches. The metadata used is the one in the request's Entity Configuration.
- If `peer_trust_chain` is present, verify that it starts at the OP.

### Response (Federation Connect § 12.2.3)

- Success is an Entity Statement served as `application/explicit-registration-response+jwt` and signed with a current Federation Entity Key.
- `iss` is the OP and `sub` is the RP. `aud` is only the RP. `iat` and `exp` are set, and `exp` is the registration's expiry.
- `trust_anchor` is the Trust Anchor the OP chose. `authority_hints` is the RP's Immediate Superior in the chosen chain.
- `metadata.openid_relying_party` MUST include the `client_id` and any issued credentials, such as `client_secret`. It SHOULD include parameters that have defaults.
- `jwks`, if present, is a verbatim copy from the RP's Entity Configuration.

### RP processing (Federation Connect § 12.2.5)

1. Verify that it is a valid Entity Statement from the OP, signed with a key present in the `jwks` of the Subordinate Statement about the OP in a chain the RP resolved.
2. Verify that `aud` is the RP's Entity Identifier.
3. Verify that `trust_anchor` is one of the RP's Trust Anchors and matches the roots of any chains it sent.
4. Verify that one of its `authority_hints` leads to that Trust Anchor.
5. Verify that the registered Entity Types match the request, and SHOULD check the returned metadata against the resolved policy.
6. If any check fails, reject the response. The RP MAY retry to work around transient misalignment.

## Lifetime and re-evaluation (Federation Connect § 12.2.6, § 12.3)

- An Automatic or Explicit registration at the OP MUST NOT outlive the trust chain the OP used. The OP MAY expire it earlier or re-check the chain.
- The RP MUST NOT use a registration past the expiry of the chain it used to trust the OP. With Automatic Registration, it re-evaluates trust in the OP. With Explicit Registration, it renews the registration.
- The RP can use the response `exp` to plan renewal.
