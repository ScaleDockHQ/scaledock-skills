# Layouts and links

Read this when writing an in-toto supply chain layout, recording link metadata for a step, or using sublayouts. Source: the in-toto specification v1.0 (`in-toto-spec.md` at tag `v1.0`, version 1.0.0, June 2, 2023), with ITE-4 and ITE-5 named where it defers to them, listed in [Sources](../SKILL.md#sources). Cites use the spec's section numbers.

## Roles and pieces

- **Project owner**: defines the layout: the steps, who may perform each (by public key), and the inspections the client runs (§ 2.1, § 2.1.1).
- **Functionary**: performs a step and signs link metadata as evidence. A functionary is identified by the public key it signs with (§ 2.1.2).
- **Client**: verifies the final product against the layout and the links, and runs the inspections (§ 2.1.3).
- **Sublayout**: a functionary acting as project owner for part of the chain (§ 2.1.4, § 4.5).
- The **final product** contains at least the layout, link metadata and a target file (§ 3.1). Link metadata is not tied to one layout, so several layouts can reuse the same links (§ 3.1.2).

## Signature envelope

Since ITE-5 the specification is agnostic to the signature envelope and recommends DSSE (§ 1.6, § 4.1). The older `{"signed": {...}, "signatures": [{"keyid", "sig"}]}` wrapper, signed over canonical JSON, is described only in the ITE-5 appendix. With DSSE, the `payloadType` for both links and layouts is `application/vnd.in-toto+json`, and the payload is the JSON that used to be the `signed` object (ITE-5, Specification).

## Keys

Keys have the form `{"keytype", "scheme", "keyval": {"public": ...}}`; metadata never contains the private part (§ 4.2.1). The reference implementation defines:

| Method     | `keytype` | `scheme`              | Public key format       |
| ---------- | --------- | --------------------- | ----------------------- |
| RSASSA-PSS | `rsa`     | `rsassa-pss-sha256`   | PEM, at least 2048 bits |
| Ed25519    | `ed25519` | `ed25519`             | hex string              |
| ECDSA      | `ecdsa`   | `ecdsa-sha2-nistp256` | PEM                     |

in-toto does not mandate these; implementations may publish what they support (§ 4.2.1). The KEYID is the hex SHA-256 of the canonical JSON of the public key (§ 4.2.1). Dates are `YYYY-MM-DDTHH:MM:SSZ` in UTC (§ 4.2.2). Hashes are hash objects such as `{"sha256": "<hex>"}` (§ 4.2.3).

## Layout

```json
{
  "_type": "layout",
  "expires": "2027-01-01T00:00:00Z",
  "readme": "Build and package foo",
  "keys": {
    "<KEYID>": {
      "keytype": "ed25519",
      "scheme": "ed25519",
      "keyval": { "public": "..." }
    }
  },
  "steps": [],
  "inspect": []
}
```

- `expires`: clients MUST NOT trust an expired layout; it is the time after which the layout is expired (§ 4.3).
- `readme`: optional human-readable description (§ 4.3).
- `keys`: every public key used in the steps (§ 4.3).
- `steps` and `inspect`: below (§ 4.3.1, § 4.3.2).

### Steps (§ 4.3.1)

```json
{
  "_type": "step",
  "name": "package",
  "threshold": 1,
  "expected_materials": [
    ["MATCH", "foo.py", "WITH", "PRODUCTS", "FROM", "write-code"],
    ["DISALLOW", "*"]
  ],
  "expected_products": [
    ["CREATE", "foo.tar.gz"],
    ["DISALLOW", "*"]
  ],
  "pubkeys": ["<BOB_KEYID>"],
  "expected_command": ["tar", "zcvf", "foo.tar.gz", "foo.py"]
}
```

- `name` identifies the step; names MUST NOT repeat across steps.
- `threshold` is how many pieces of link metadata must be provided for the step; set it to 1 when one functionary performs the step. Higher values require several functionaries to perform the step and report the same results.
- `pubkeys` lists the KEYIDs allowed to sign the step's links.
- `expected_command` is only a suggestion. It can be forged by a compromised functionary and commands vary by preference, so a mismatch only produces a warning and never fails verification.

### Inspections (§ 4.3.2)

```json
{
  "_type": "inspection",
  "name": "untar",
  "expected_materials": [
    ["MATCH", "foo.tar.gz", "WITH", "PRODUCTS", "FROM", "package"],
    ["DISALLOW", "*"]
  ],
  "expected_products": [
    ["MATCH", "foo.py", "WITH", "PRODUCTS", "FROM", "write-code"],
    ["ALLOW", "foo.tar.gz"],
    ["DISALLOW", "*"]
  ],
  "run": ["tar", "xzf", "foo.tar.gz"]
}
```

- Inspections run on the client at verification time. Names MUST NOT repeat across steps or inspections.
- `run` is executed in a new process that produces link metadata for the inspection; then the artifact rules are applied.
- Exit code 0 means success; any other value means the inspection failed and validation should halt (§ 4.3.2.1).

## Artifact rules (§ 4.3.3)

```text
MATCH <pattern> [IN <source-path-prefix>] WITH (MATERIALS|PRODUCTS) [IN <destination-path-prefix>] FROM <step>
CREATE <pattern>
DELETE <pattern>
MODIFY <pattern>
ALLOW <pattern>
REQUIRE <artifact-name>
DISALLOW <pattern>
```

Patterns are Unix glob patterns matched against artifact names; they also apply to ITE-4 abstract artifacts, which need not be file paths (§ 4.3.3).

| Rule     | Meaning                                                                                                                        |
| -------- | ------------------------------------------------------------------------------------------------------------------------------ |
| MATCH    | Matching artifacts must equal, by name and hash, a material or product of the named step. `IN` clauses handle relocated paths. |
| CREATE   | Matching products must not appear as materials of this step.                                                                   |
| DELETE   | Matching materials must not appear as products of this step.                                                                   |
| MODIFY   | Matching products must appear as materials and their hashes must differ.                                                       |
| ALLOW    | Matching artifacts are allowed.                                                                                                |
| REQUIRE  | The named artifact must appear. It takes a name, not a pattern.                                                                |
| DISALLOW | Matching artifacts are not allowed.                                                                                            |

Processing (§ 4.3.3.1, § 4.3.3.2, § 4.3.3.3):

- Rules apply in order to a queue of the link's materials or products, like firewall rules: an artifact consumed by a rule is removed and later rules do not see it.
- MATCH consumes a source artifact only when the destination has an artifact with the same name (after removing `IN` prefixes) and the same hash. Unmatched artifacts stay in the queue.
- Only DISALLOW and REQUIRE can fail rule processing: DISALLOW fails if its pattern matches anything left in the queue, REQUIRE fails if the named artifact is not in the queue.
- There is an implicit `ALLOW *` at the end of every rule list. Without an explicit `DISALLOW *` last, unexpected artifacts can sneak in undetected, so end every list with `DISALLOW *`.

## Link metadata (§ 4.4)

```json
{
  "_type": "link",
  "name": "package",
  "command": ["tar", "zcvf", "foo.tar.gz", "foo.py"],
  "materials": { "foo.py": { "sha256": "..." } },
  "products": { "foo.tar.gz": { "sha256": "..." } },
  "byproducts": { "stdout": "", "stderr": "", "return-value": 0 },
  "environment": { "variables": "", "filesystem": "", "workdir": "" }
}
```

- The file name is `<name>.<KEYID-PREFIX>.link`: the step name and the first six bytes of the functionary's KEYID, so steps with a threshold above one do not collide.
- `name` MUST equal the step name in the layout.
- `materials` and `products` map artifact names (file paths, or ITE-4 names for abstract artifacts) to hash objects.
- `byproducts` is opaque and not verified by default; it should at least have `stdout`, `stderr` and `return-value` (an integer), even if empty.
- `environment` is opaque and should at least have `variables`, `filesystem` and `workdir` keys (§ 4.4.1 recommends their content).

The same step can be recorded as an Attestation Framework Statement with the Link predicate `https://in-toto.io/attestation/link/v0.3`; see [`predicates.md`](predicates.md).

## Sublayouts (§ 4.5)

- A sublayout is a layout saved under the step's link file name, `<name>.<keyid-prefix>.link`, in place of link metadata, and signed by the key the parent layout authorizes for that step.
- The parent's artifact rules apply to the materials of the sublayout's first step and the products of its last step, presented as a virtual link (§ 4.5.1).
- Links for the sublayout go in a directory named like the link file without `.link`, for example `build.<BOB-KEYID-PREFIX>/` (§ 4.5.2).
- A sublayout inspection is either presented as link metadata signed with the sublayout's key, or run by the client while recursing; inspection results are not passed to the parent (§ 4.5.3).

## Common mistakes

- Rule lists without a final `DISALLOW *` (§ 4.3.3.1).
- Expecting `expected_command` to enforce anything (§ 4.3.1).
- A link `name` that differs from the step name, so the verifier never finds it (§ 4.4).
- Reusing one name for a step and an inspection (§ 4.3.2).
- A far-future `expires` on a layout that embeds functionary keys. The verification workflow's freshness check is the layout expiry (§ 4.3, § 5.2).
- Using REQUIRE with a glob. It takes an artifact name in v1.0 (§ 4.3.3).
