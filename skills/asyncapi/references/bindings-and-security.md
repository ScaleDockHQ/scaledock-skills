# Bindings and security

Read this when adding protocol details or authentication. Sections cite AsyncAPI 3.1.0.

## Bindings (§ Definitions, Bindings; § Server, Channel, Operation and Message Bindings Objects)

A binding defines protocol-specific information, and MUST define protocol-specific information only. Bindings live on four objects, each with its own bindings map:

| Object    | Map                       | Use for                                                |
| --------- | ------------------------- | ------------------------------------------------------ |
| Server    | Server Bindings Object    | Broker or connection settings.                         |
| Channel   | Channel Bindings Object   | Topic, queue or exchange settings.                     |
| Operation | Operation Bindings Object | Per-operation settings such as acknowledgement or QoS. |
| Message   | Message Bindings Object   | Protocol headers, keys and message-level settings.     |

All four accept the same protocol keys in 3.1.0:

`http`, `ws`, `kafka`, `anypointmq`, `amqp` (AMQP 0-9-1), `amqp1` (AMQP 1.0), `mqtt`, `mqtt5`, `nats`, `jms`, `sns`, `solace`, `sqs`, `stomp`, `redis`, `mercure`, `ibmmq`, `googlepubsub`, `pulsar`, `ros2`.

- `ros2` is new in 3.1.0; it is the only feature of that release (AsyncAPI 3.1.0 release notes).
- The fields inside each binding are defined in the separate bindings repository that each key links to, not in the specification.
- A binding map can be a Reference Object, and reusable bindings live in `components.serverBindings`, `channelBindings`, `operationBindings` and `messageBindings` (§ Components Object).
- Protocol headers belong in message bindings, never in Message `headers` (§ Message Object).
- Query parameters and fragments of a channel address go in channel bindings (§ Channel Object).

```yaml
operations:
  onUserSignUp:
    action: send
    channel:
      $ref: "#/channels/userSignup"
    bindings:
      amqp:
        ack: false
```

## Security Scheme Object (§ Security Scheme Object)

| `type`                                          | Required fields                             | Notes                                                                    |
| ----------------------------------------------- | ------------------------------------------- | ------------------------------------------------------------------------ |
| `userPassword`                                  | none                                        | User and password.                                                       |
| `apiKey`                                        | `in`: `user` or `password`                  | An API key sent as the user or the password.                             |
| `X509`                                          | none                                        | Client certificate.                                                      |
| `symmetricEncryption`, `asymmetricEncryption`   | none                                        | End-to-end encryption.                                                   |
| `httpApiKey`                                    | `name`, `in`: `query`, `header` or `cookie` | HTTP API key.                                                            |
| `http`                                          | `scheme`                                    | An RFC 7235 Authorization scheme; `bearerFormat` is a hint for `bearer`. |
| `oauth2`                                        | `flows`                                     | `scopes` lists the scopes needed.                                        |
| `openIdConnect`                                 | `openIdConnectUrl` (absolute URL)           | `scopes` lists the scopes needed.                                        |
| `plain`, `scramSha256`, `scramSha512`, `gssapi` | none                                        | SASL mechanisms (RFC 4422).                                              |

Every scheme also takes `description`. An empty `scopes` array means no scopes are needed.

### OAuth Flows (§ OAuth Flows Object, § OAuth Flow Object)

| Flow                | Required                                          |
| ------------------- | ------------------------------------------------- |
| `implicit`          | `authorizationUrl`, `availableScopes`             |
| `password`          | `tokenUrl`, `availableScopes`                     |
| `clientCredentials` | `tokenUrl`, `availableScopes`                     |
| `authorizationCode` | `authorizationUrl`, `tokenUrl`, `availableScopes` |

`refreshUrl` is optional. All URLs MUST be absolute. `availableScopes` maps each scope name to a short description; the scheme's `scopes` array says which of them this use needs.

### Where security applies (§ Server Object, § Operation Object)

- A server's `security` list holds alternatives: satisfying any one authorizes the connection.
- An operation's `security` list also holds alternatives, and one MUST be satisfied. When server security applies, it MUST also be satisfied.
- Entries are Security Scheme Objects or Reference Objects, usually `$ref: '#/components/securitySchemes/<name>'`. There is no name-only form as in 2.x (Migrating to v3, "Unifying explicit and implicit references").

```yaml
servers:
  production:
    host: broker.example.com:9093
    protocol: kafka
    security:
      - $ref: "#/components/securitySchemes/saslScram"
components:
  securitySchemes:
    saslScram:
      type: scramSha512
      description: SASL/SCRAM-SHA-512 credentials issued per client.
    oauth:
      type: oauth2
      flows:
        clientCredentials:
          tokenUrl: https://auth.example.com/oauth/token
          availableScopes:
            orders:read: Read order events
            orders:write: Publish order events
      scopes:
        - orders:read
```
