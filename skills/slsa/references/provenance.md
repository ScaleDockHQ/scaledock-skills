# Build provenance

Read this when generating, reviewing or parsing SLSA Provenance v1, mapping a build platform's inputs to `externalParameters` and `resolvedDependencies`, distributing provenance, or migrating from v0.2. Sources: SLSA v1.2 Build: Provenance, Distributing Provenance and Software Attestations, and the in-toto Attestation Framework v1, listed in [Sources](../SKILL.md#sources).

## Envelope, statement, predicate

SLSA Provenance is an in-toto attestation predicate:

```json
"predicateType": "https://slsa.dev/provenance/v1"
```

Always emit this exact string, never the URL in the address bar; it resolves to the latest minor version (Build: Provenance, introduction). The URI has stayed `https://slsa.dev/provenance/v1` through SLSA v1.0, v1.1 and v1.2.

The recommended suite is a DSSE envelope (ECDSA over NIST P-256 or stronger, and SHA-256), an in-toto Statement, the SLSA predicate, and JSON Lines bundles (Software Attestations, Recommended Suite). The Statement has `_type` `https://in-toto.io/Statement/v1`, `subject` (each entry MUST have `digest`), `predicateType` and `predicate` (in-toto Statement, Fields). Subjects match purely by digest.

## Parsing rules (Build: Provenance, Parsing rules; in-toto v1, Parsing rules)

- Consumers MUST ignore unrecognized fields unless otherwise noted.
- The `predicateType` URI carries the major version and changes on every backwards-incompatible change; minor changes are backwards compatible and monotonic and keep the URI.
- Unset, null and empty values MUST be interpreted the same.
- In in-toto, 0.x versions count as major versions, so `v0.1`, `v0.2` and `v1` are three incompatible types.

## Model (Build: Provenance, Model)

- `builder.id` identifies the platform: the transitive closure of everything trusted to run the build and record provenance. Platform implementers SHOULD define a security model naming boundaries, actors and interfaces, and derive the `builder.id` closure and trusted control plane from it.
- `buildType` identifies the parameterized template the build ran.
- `externalParameters` are the external interface. They are untrusted, MUST be included, and MUST be verified downstream.
- `internalParameters` are set by the platform. They are trusted, OPTIONAL, and need not be verified; include them for reproducibility, debugging or incident response.
- `resolvedDependencies` lists artifacts fetched during initialization or execution, if known.
- Control plane and cache communication is implied by `builder.id`. It SHOULD NOT influence the build definition; if it does, it SHOULD go in `resolvedDependencies`.
- `subject` identifies the outputs.

## Schema (Build: Provenance, Schema)

The CUE and protobuf summaries are informative; the text is authoritative.

```jsonc
{
  "_type": "https://in-toto.io/Statement/v1",
  "subject": [{ "name": "out/app.tar.gz", "digest": { "sha256": "…" } }],
  "predicateType": "https://slsa.dev/provenance/v1",
  "predicate": {
    "buildDefinition": {
      "buildType": "<TypeURI>", // REQUIRED for Build L1
      "externalParameters": {}, // REQUIRED for Build L1
      "internalParameters": {},
      "resolvedDependencies": [/* ResourceDescriptor */],
    },
    "runDetails": {
      "builder": {
        "id": "<TypeURI>", // REQUIRED for Build L1
        "builderDependencies": [/* ResourceDescriptor */],
        "version": { "<component>": "<version>" },
      },
      "metadata": {
        "invocationId": "<string>",
        "startedOn": "<Timestamp>",
        "finishedOn": "<Timestamp>",
      },
      "byproducts": [/* ResourceDescriptor */],
    },
  },
}
```

A ResourceDescriptor carries `uri`, `digest` (for example `sha256`, `sha512`, `gitCommit`), `name`, `downloadLocation`, `mediaType`, `content` (base64) and `annotations`.

### Field rules

- **Predicate:** `buildDefinition` and `runDetails` are REQUIRED for Build L1.
- **`buildType`:** SHOULD resolve to a human-readable spec covering the description, the parameter schemas, how to start the build from the definition, and a complete example (BuildDefinition).
- **`externalParameters`:**
  - MUST be complete at Build L3, with no other way for an external party to influence the build; best effort below L3.
  - Platforms SHOULD keep them small and simple; verifiers SHOULD reject unrecognized or unexpected fields.
  - SHOULD hold only the values passed through the interface. Digests of referenced artifacts go in `resolvedDependencies`, and the `buildType` docs SHOULD explain how a parameter maps to a dependency `uri` (BuildDefinition).
- **`internalParameters`:** the same field name SHOULD NOT appear in both parameter objects.
- **`resolvedDependencies`:** unordered and best effort through Build L3. Record URI and digest of anything that could affect the build if compromised, including transitively fetched scripts.
- **`byproducts`:** logs or a digest of the fully evaluated configuration. SHOULD NOT list every intermediate file, only what is useful later and hard to reproduce (RunDetails).
- **`builder.id`** (Builder):
  - MUST reflect the trust base consumers care about. A platform with modes of different security or level MUST give each mode its own `builder.id`, and SHOULD give each its own signer identity.
  - SHOULD resolve to docs giving its scope, the claimed Build level, accuracy and completeness guarantees, tenant-generated fields other than `subject`, and extension meanings.
  - It is meant to be the sole determiner of the Build level.
- **`invocationId`:** opaque, case-sensitive, and SHOULD be globally unique (BuildMetadata).

Example from the spec (BuildDefinition):

```json
"externalParameters": {
    "repository": "https://github.com/octocat/hello-world",
    "ref": "refs/heads/main"
},
"resolvedDependencies": [{
    "uri": "git+https://github.com/octocat/hello-world@refs/heads/main",
    "digest": {"gitCommit": "7fd1a60b01f91b314f59955a4e4d4e80d8edf11d"}
}]
```

### Design guidelines (BuildDefinition, Guidelines)

- Make boilerplate implicit in `buildType`.
- Move configuration into input artifacts, such as flags next to source, so verifying the source verifies them.
- Leave out parameters with no security impact, such as deadline or priority, only after careful analysis.
- Where possible, make the build definition the platform's sole top-level input.
- For client-side evaluated configuration, it is RECOMMENDED to read configuration from version control on the server, putting the URI in `externalParameters` and the digest in `resolvedDependencies`. Otherwise record the digest and link it to version control with a separate provenance.

### Extension fields (Extension fields)

- Use `<vendor>_<fieldname>` names; standard fields never contain an underscore.
- Extensions MUST NOT change the meaning of other fields: an absent extension and an ignored one MUST read the same.
- Extensions SHOULD be monotonic: dropping one never turns DENY into ALLOW.

## Distributing provenance (Distributing Provenance)

- Bind attestations to artifacts, not releases. A release's attestation set MAY grow, and ecosystems SHOULD support many attestations per release and one-to-many from artifact to attestations.
- Provenance SHOULD accompany the artifact at publish time, and ecosystems SHOULD map each artifact to its attestations. Name it after the artifact, for example `<filename>.intoto.jsonl`.
- Producers MUST publish attestations in at least one place and SHOULD use more than one: the source repository release, the package registry next to the artifact, or elsewhere with a hash and pointer in a transparency log. Long term, registries SHOULD distribute provenance next to artifacts.
- Attestations SHOULD be immutable. To change one, cut a new release with new artifacts.
- Use SLSA Build Provenance unless producer and consumer agree on another format that meets the other requirements.
- Intermediaries that transform source into archives, such as module proxies, are doing a build and SHOULD provide build provenance.

## Migrating from v0.2 (Build: Provenance, Migrating from 0.2)

| v0.2                                             | v1                                                                   |
| ------------------------------------------------ | -------------------------------------------------------------------- |
| `buildType`                                      | `buildDefinition.buildType`, updated to describe the new inputs      |
| `invocation.parameters`                          | `buildDefinition.externalParameters`                                 |
| `invocation.configSource.entryPoint`             | `externalParameters.entryPoint` (renaming it is RECOMMENDED)         |
| `invocation.configSource.uri`                    | `externalParameters.source`, plus a `resolvedDependencies` entry     |
| `invocation.configSource.digest`                 | digest of that `resolvedDependencies` entry                          |
| `invocation.environment`                         | `buildDefinition.internalParameters`                                 |
| `materials`                                      | `buildDefinition.resolvedDependencies`                               |
| `builder.id`                                     | `runDetails.builder.id`                                              |
| `metadata.buildInvocationId`                     | `runDetails.metadata.invocationId`                                   |
| `metadata.buildStartedOn` / `buildFinishedOn`    | `runDetails.metadata.startedOn` / `finishedOn`                       |
| `buildConfig`                                    | digest in `externalParameters["config"]` or `byproducts`, or omitted |
| `metadata.completeness`, `metadata.reproducible` | removed; implied by `builder.id`                                     |

v1 also adds `builderDependencies`, `builder.version`, `byproducts`, and the ResourceDescriptor fields `annotations`, `content`, `downloadLocation`, `mediaType` and `name` (Change history, v1.0). v0.2 statements use `_type` `https://in-toto.io/Statement/v0.1`; v1 uses `https://in-toto.io/Statement/v1`.

## Common mistakes

- Copying `https://slsa.dev/spec/v1.2/build-provenance` or another browser URL into `predicateType`.
- Generating provenance in a tenant-controlled build step and claiming Build L2 or L3.
- Recording a list of commands in `externalParameters`. Such parameters change every build and cannot be checked against expectations (Verifying Artifacts, Step 2 tip).
- One `builder.id` covering both hosted and self-hosted runners.
- Treating `resolvedDependencies` as complete. SLSA has no completeness requirement for it.
