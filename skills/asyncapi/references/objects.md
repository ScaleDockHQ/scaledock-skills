# AsyncAPI 3.1.0 objects

Read this when writing or reviewing a document. Headings in parentheses are the section names in AsyncAPI 3.1.0. Field names are case-sensitive (§ Format), and every object below MAY carry `x-` extensions except the Reference Object.

## AsyncAPI Object (§ AsyncAPI Object)

| Field                | Rule                                                                                                                   |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `asyncapi`           | REQUIRED. `major.minor.patch`, optionally with a hyphen suffix. Tooling ignores the patch (§ AsyncAPI Version String). |
| `id`                 | The application's identifier, a URI; a URN is RECOMMENDED (§ Identifier).                                              |
| `info`               | REQUIRED. Info Object.                                                                                                 |
| `servers`            | Map of server name (`^[A-Za-z0-9_\-]+$`) to Server Object or Reference Object (§ Servers Object).                      |
| `defaultContentType` | Default media type for message payloads (§ Default Content Type).                                                      |
| `channels`           | Map of channel ID to Channel Object or Reference Object. Optional.                                                     |
| `operations`         | Map of operation ID to Operation Object or Reference Object: operations the application MUST implement.                |
| `components`         | Reusable objects that may or may not be used.                                                                          |

Everything outside `components` MUST be used by the application (§ File Structure). Documents can be split across files and joined with Reference Objects.

## Info Object (§ Info Object)

`title` (REQUIRED), `version` (REQUIRED, the application API version), `description`, `termsOfService`, `contact`, `license`, `tags`, `externalDocs`.

## Server Object (§ Server Object)

| Field                              | Rule                                                               |
| ---------------------------------- | ------------------------------------------------------------------ |
| `host`                             | REQUIRED. Host name, optionally with port; supports `{variables}`. |
| `protocol`                         | REQUIRED. For example `kafka`, `amqp`, `mqtt`, `ws`.               |
| `protocolVersion`                  | For example AMQP `0.9.1`.                                          |
| `pathname`                         | Path on the host; supports `{variables}`.                          |
| `title`, `summary`, `description`  | Human-readable text.                                               |
| `variables`                        | Server Variable Objects for `host` and `pathname`.                 |
| `security`                         | Security Scheme Objects or references; any one satisfies.          |
| `tags`, `externalDocs`, `bindings` | Grouping, docs, and server bindings.                               |

## Channel Object (§ Channel Object)

| Field                                                                 | Rule                                                                                                                                                                                  |
| --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `address`                                                             | The topic, routing key, event type or path; may contain `{name}` expressions. `null` or absent means unknown (for example, generated at runtime). No query or fragment; use bindings. |
| `messages`                                                            | Map of message ID to Message Object or reference. Every message on the channel MUST match exactly one.                                                                                |
| `servers`                                                             | Reference Objects to servers. A root channel MUST reference root servers only. Absent or empty means all servers.                                                                     |
| `parameters`                                                          | Present only when `address` has expressions; MUST contain every one, keyed by the expression name (§ Parameters Object).                                                              |
| `title`, `summary`, `description`, `tags`, `externalDocs`, `bindings` | As usual.                                                                                                                                                                             |

The channel key is an ID, not the address.

### Parameter Object (§ Parameter Object)

`enum` (strings), `default`, `description`, `examples` (strings), and `location` (a runtime expression for where the value is found in the message). Parameters have no schema.

## Operation Object (§ Operation Object)

| Field                                                                 | Rule                                                                                                                                         |
| --------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `action`                                                              | REQUIRED. `send` or `receive`: what this application does.                                                                                   |
| `channel`                                                             | REQUIRED. A Reference Object. A root operation MUST reference a root channel.                                                                |
| `messages`                                                            | Reference Objects to a subset of the channel's messages. Omitted means all; `[]` means none. Every processed message MUST match exactly one. |
| `reply`                                                               | Operation Reply Object for request-reply.                                                                                                    |
| `security`                                                            | Security Scheme Objects or references; one MUST be satisfied, in addition to server security.                                                |
| `title`, `summary`, `description`, `tags`, `externalDocs`, `bindings` | As usual.                                                                                                                                    |
| `traits`                                                              | Operation Trait Objects, merged by the traits mechanism; the result MUST be a valid Operation Object.                                        |

The operation's key in `operations` is its `operationId`, case-sensitive (§ Operations Object).

### Operation Reply Object (§ Operation Reply Object)

| Field      | Rule                                                                                                      |
| ---------- | --------------------------------------------------------------------------------------------------------- |
| `address`  | Operation Reply Address Object: where implementations MUST send the reply.                                |
| `channel`  | Reference to the reply channel. When `address` is set, that channel's `address` MUST be `null` or absent. |
| `messages` | Subset of the reply channel's messages.                                                                   |

Operation Reply Address Object: `location` (REQUIRED, a runtime expression such as `$message.header#/replyTo`) and `description`.

## Message Object (§ Message Object)

| Field                                          | Rule                                                                                        |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------- |
| `headers`                                      | Schema for application headers: a map of key-value pairs. MUST NOT define protocol headers. |
| `payload`                                      | Schema for the payload.                                                                     |
| `correlationId`                                | Correlation ID Object or reference.                                                         |
| `contentType`                                  | A specific media type; defaults to `defaultContentType`.                                    |
| `name`, `title`, `summary`, `description`      | Names and text.                                                                             |
| `tags`, `externalDocs`, `bindings`, `examples` | As usual; examples are Message Example Objects.                                             |
| `traits`                                       | Message Trait Objects; the result MUST be a valid Message Object.                           |

A plain Schema Object in `headers` or `payload` is read as the AsyncAPI Schema format for the document's version.

## Schemas (§ Schema Object, § Multi Format Schema Object)

- The Schema Object is a superset of JSON Schema Draft 07.
- To use another format, wrap it in a Multi Format Schema Object: `schemaFormat` (REQUIRED) and `schema` (REQUIRED). Avro goes inline as YAML or JSON; non-JSON formats such as Protobuf go inline as a string.
- Implementations MUST support the AsyncAPI 3.1.0 Schema Object and JSON Schema Draft 07, and are RECOMMENDED to support Avro 1.9.0, the OpenAPI 3.0.0 Schema Object, RAML 1.0 data types and Protocol Buffers 2 and 3.
- References inside a schema MUST point to resources with the same `schemaFormat`.

```yaml
payload:
  schemaFormat: application/vnd.apache.avro;version=1.9.0
  schema:
    type: record
    name: User
    fields:
      - name: displayName
        type: string
```

## Correlation ID and runtime expressions (§ Correlation ID Object, § Runtime Expression)

- Correlation ID Object: `location` (REQUIRED) and `description`.
- Runtime expressions have the form `$message.header#/<pointer>` or `$message.payload#/<pointer>` and preserve the type of the referenced value. They are used by correlation IDs, reply addresses and channel parameters.

## Components Object (§ Components Object)

Holds reusable `schemas`, `servers`, `channels`, `operations`, `messages`, `securitySchemes`, `serverVariables`, `parameters`, `correlationIds`, `replies`, `replyAddresses`, `externalDocs`, `tags`, `operationTraits`, `messageTraits`, and server, channel, operation and message bindings. Components have no effect unless referenced; keys MUST match `^[a-zA-Z0-9\.\-_]+$`. Operations in `components.operations` are ones the application may or may not implement (§ Operations Object).

## Reference Object (§ Reference Object)

`$ref` (REQUIRED). Follows JSON Reference resolution, not JSON Schema's. Extra properties SHALL be ignored.

## Traits (§ Traits Merge Mechanism)

Traits merge into the target object with JSON Merge Patch, in the order listed, and a trait property MUST NOT override the same property on the target.

```yaml
description: A longer description.
traits:
  - name: UserSignup
    description: Description from trait.
```

After merging, `name` is `UserSignup` and `description` stays `A longer description.`
