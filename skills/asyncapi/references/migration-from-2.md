# Migrating from AsyncAPI 2.x to 3.x

Read this when converting a 2.x document. The changes come from the AsyncAPI guide "Migrating to v3"; the 3.x rules they lead to are cited from AsyncAPI 3.1.0.

## Start with the converter

The guide recommends the AsyncAPI CLI converter:

```bash
asyncapi convert asyncapi.json --output=asyncapi_v3.json --target-version=3.0.0
```

It targets 3.0.0. To move to 3.1.0, change `asyncapi` to `3.1.0` and validate against the 3.1.0 schema; the only addition in 3.1.0 is the `ros2` binding (AsyncAPI 3.1.0 release notes). Review the converted document against the list below.

## Breaking changes

| Area              | 2.x                                                          | 3.x                                                                                                                                                                        |
| ----------------- | ------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Metadata          | `tags` and `externalDocs` at the root                        | Inside `info`.                                                                                                                                                             |
| Server location   | `url`                                                        | `host` and `pathname`, with `protocol` as before (§ Server Object).                                                                                                        |
| Structure         | Operations nested in channel items                           | Channels, messages and operations are separate; root `operations` reference channels (§ Operation Object).                                                                 |
| Channel key       | The key is the address                                       | The key is an arbitrary ID; the address goes in `address` (§ Channel Object).                                                                                              |
| Operation keyword | `publish` and `subscribe`, which describe what others can do | `action: send` or `action: receive`, which describe what this application does (§ Operation Object).                                                                       |
| Multiple messages | `message.oneOf`                                              | The channel's `messages` map; `messageId` is gone, the map key is the ID (§ Messages Object).                                                                              |
| References        | Some implicit, by name (server security, channel servers)    | All explicit. Server `security` becomes an array of references; OAuth and OpenID Connect scopes move to the scheme's `scopes` (§ Server Object, § Security Scheme Object). |
| Traits            | Trait properties override the object                         | The object wins; a trait MUST NOT override the same property (§ Traits Merge Mechanism).                                                                                   |
| Schema format     | `schemaFormat` on the message                                | `schemaFormat` and `schema` together in a Multi Format Schema Object (§ Multi Format Schema Object).                                                                       |
| Empty channels    | `channels: {}` required                                      | `channels` is optional.                                                                                                                                                    |
| Parameters        | A full `schema` per parameter                                | Only `enum`, `default`, `description`, `examples` and `location`; values are strings (§ Parameter Object).                                                                 |

## Turning publish and subscribe around

In 2.x, `publish` meant others publish and the application receives; `subscribe` meant the application sends. Map them as follows:

| 2.x                      | 3.x                                 |
| ------------------------ | ----------------------------------- |
| `subscribe` on a channel | An operation with `action: send`    |
| `publish` on a channel   | An operation with `action: receive` |

```yaml
# 2.6.0
channels:
  user/signedup:
    publish:
      message:
        payload:
          type: object
---
# 3.x
channels:
  userSignup:
    address: user/signedup
    messages:
      userMessage:
        payload:
          type: object
operations:
  consumeUserSignups:
    action: receive
    channel:
      $ref: "#/channels/userSignup"
```

## Review checklist after conversion

- [ ] No server has `url`; each has `host` and `protocol`.
- [ ] No channel item has `publish` or `subscribe`; root `operations` exist instead.
- [ ] Every operation's `action` matches the old keyword using the table above.
- [ ] Server and operation `security` entries are references, and scopes sit on the scheme.
- [ ] Avro, Protobuf or RAML payloads use a Multi Format Schema Object.
- [ ] Traits that relied on overriding the object have been moved onto the object.
- [ ] Parameters use only the five allowed fields.
