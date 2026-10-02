# Trust chains: collection, validation, constraints and refresh

Sources: OpenID Federation 1.1 (Federation). Federation 1.0 contains the same rules.

## Structure (Federation § 4)

A trust chain is an ordered list `ES[0..i]`:

- `ES[0]` is the subject's Entity Configuration, signed with a key in `ES[0].jwks`.
- Then zero or more Subordinate Statements from Intermediates, and the Trust Anchor's Subordinate Statement about the top Intermediate, or about the subject if there are no Intermediates.
- `ES[i]` is the Trust Anchor's Entity Configuration. It is always logically present, but MAY be left out of the JSON array.

For each `j < i`, `ES[j].iss == ES[j+1].sub`, and `ES[j]` is signed by a key in `ES[j+1].jwks`. The Trust Anchor's public keys reach verifiers by a secure out-of-band method.

Example for an RP under organization A in federation F:

1. The RP's Entity Configuration.
2. A Subordinate Statement about the RP, issued by A.
3. A Subordinate Statement about A, issued by F's Trust Anchor.
4. F's Trust Anchor Entity Configuration.

## Collection (Federation § 10.1)

Party A, which wants to trust Party B, MUST have B's Entity Identifier and a list of Trust Anchor Entity Identifiers with their public keys (Federation § 10).

1. Get B's Entity Configuration, from the well-known URL or because it was handed over.
2. Follow `authority_hints`, skipping hints that end in an unknown Trust Anchor, and fetch each Superior's Entity Configuration. Repeat while hints remain.
3. Use each Superior's `federation_fetch_endpoint` to fetch its Subordinate Statement about the entity below it.
4. MUST NOT fetch a statement already obtained in this run. A hint that leads to a loop MUST NOT be used.
5. The result is zero or more lists, each ending in a Trust Anchor's self-signed Entity Configuration. With zero lists, B cannot be trusted. What happens next is out of scope.

To delegate this work, Party A MAY call a resolve endpoint (Federation § 8.3, § 10.6). It then trusts the resolver to validate correctly (Federation § 8.3.3).

## Validation (Federation § 10.2)

For the chain `ES[0..i]`, Party A MUST check:

1. Every statement has all required claims, `iat` in the past and `exp` in the future.
2. `ES[0].iss == ES[0].sub`, and `ES[0]` verifies with a key in `ES[0].jwks`.
3. For each `j < i`: `ES[j].iss == ES[j+1].sub`, and `ES[j]` verifies with a key in `ES[j+1].jwks`.
4. `ES[i].iss` is the Trust Anchor's Entity Identifier, and `ES[i]` verifies with the Trust Anchor's out-of-band key.

Signature checks are expensive, so an implementation MAY run them after the cheaper checks. Statements and verification results MAY be cached until they expire. After validation, metadata policy MUST be resolved and applied (Federation § 6.1.4), and constraints MUST be enforced for each Subordinate Statement (Federation § 6.2).

```ts
type Statement = {
  header: { typ?: string; alg: string; kid: string };
  claims: {
    iss: string;
    sub: string;
    iat: number;
    exp: number;
    jwks?: { keys: Array<{ kid: string }> };
  };
  raw: string;
};

type VerifyJws = (
  raw: string,
  jwks: { keys: Array<{ kid: string }> },
) => Promise<boolean>;

async function validateChain(
  chain: Statement[],
  anchor: { entityId: string; jwks: { keys: Array<{ kid: string }> } },
  verify: VerifyJws,
  now = Math.floor(Date.now() / 1000),
): Promise<number> {
  if (chain.length < 2) throw new Error("chain too short");
  for (const es of chain) {
    if (es.header.typ !== "entity-statement+jwt" || es.header.alg === "none")
      throw new Error("bad header");
    if (!es.claims.jwks) throw new Error("jwks required");
    if (es.claims.iat > now + 60 || es.claims.exp <= now - 60)
      throw new Error("not current");
  }
  const first = chain[0];
  if (first.claims.iss !== first.claims.sub)
    throw new Error("ES[0] must be an Entity Configuration");
  if (!(await verify(first.raw, first.claims.jwks!)))
    throw new Error("ES[0] signature");
  for (let j = 0; j < chain.length - 1; j++) {
    if (chain[j].claims.iss !== chain[j + 1].claims.sub)
      throw new Error(`iss/sub break at ${j}`);
    if (!(await verify(chain[j].raw, chain[j + 1].claims.jwks!)))
      throw new Error(`signature break at ${j}`);
  }
  const last = chain[chain.length - 1];
  if (last.claims.iss !== anchor.entityId)
    throw new Error("not the configured Trust Anchor");
  if (!(await verify(last.raw, anchor.jwks)))
    throw new Error("Trust Anchor signature");
  return Math.min(...chain.map((es) => es.claims.exp));
}
```

The function returns the chain's expiration time. Run metadata policy and constraints on the result next.

## Choosing a chain and its lifetime

- If several chains are valid, Party A picks one. Preferring the shorter chain is one simple rule, and local policy MAY use others (Federation § 10.3).
- The chain expires at the minimum `exp` of its statements (Federation § 10.4).
- Topology changes can cause transient validation failures, so retry after a while (Federation § 10.5).

## Constraints (Federation § 6.2)

Constraints sit in the `constraints` claim of Subordinate Statements. Each one present in the chain MUST be applied independently, and any failure makes the chain invalid. Unknown constraint parameters MUST be ignored.

- **`max_path_length` (§ 6.2.1):** the maximum number of Intermediates between the entity that set it and the chain subject. It is at least 0, and 0 means no Intermediates. If omitted, no extra limit applies. Example: in Leaf, I1, I2, TA, a TA value of 2 passes and a TA value of 1 fails.
- **`naming_constraints` (§ 6.2.2):** `permitted` and `excluded` lists of host names, using the RFC 5280 domain name constraint syntax on the host part of Entity Identifiers. `excluded` wins. A leading `.` matches subdomains only: `.example.com` matches `host.example.com` but not `example.com`.
- **`allowed_entity_types` (§ 6.2.3):** the Entity Types Subordinates may have. Without it, any type is allowed. `federation_entity` is always allowed and MUST NOT be listed. `[]` allows only `federation_entity`.

```json
{
  "max_path_length": 2,
  "naming_constraints": {
    "permitted": [".example.com"],
    "excluded": ["east.example.com"]
  },
  "allowed_entity_types": ["openid_provider", "openid_relying_party"]
}
```

## Refresh, key rollover and revocation (Federation § 11)

- Participants MUST support refreshing a chain when it expires. How often they re-evaluate before that is their choice.
- An Entity Configuration's `exp` controls how often its keys are re-fetched (§ 11.1).
- A Trust Anchor rolling keys adds the new keys to its `jwks`, keeps signing with the old keys long enough for all Subordinates to get the new ones, switches to the new keys, and later removes the old ones (§ 11.2).
- Federation Operators are RECOMMENDED to offer a second, independent way to get Trust Anchor keys. Keys from both paths SHOULD be compared and re-fetched on mismatch (§ 11.3).
- No revocation process is defined, because chains are re-checked often. A federation MAY define its own (§ 11.4). The historical keys endpoint reports revoked keys (see [`endpoints.md`](endpoints.md)).

## Denial of service (Federation § 18.1)

- An attacker can list many fake `authority_hints` so that each request makes the verifier fetch many URLs. Implementations should cap how many hints they inspect.
- Statically validating a trust mark before discovery can filter such requests.
- If a resolve endpoint does not require client authentication, incoming requests should not automatically trigger chain collection.
