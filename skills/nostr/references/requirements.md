# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are normative sentences from the published text, quoted as written (only line breaks and hyphenation from PDF layout were joined). Apply the ones that match the role. Each is labelled with the nearest section, clause or article in the published document.

## Events, tags and kinds

Source: https://raw.githubusercontent.com/nostr-protocol/nips/a79e21d90fce5465b50ef385dd368bba99ec4a0b/01.md

- **NIP-01 Events and signatures.** To prevent implementation differences from creating a different event ID for the same event, the following rules MUST be followed while serializing:
- **NIP-01 Events and signatures.** Whitespace, line breaks or other unnecessary formatting should not be included in the output JSON.
- **NIP-01 Events and signatures.** The following characters in the content field must be escaped as shown, and all other characters must be included verbatim:
- **NIP-01 Tags.** Only the first value in any given tag is indexed.
- **NIP-01 Kinds.** for kind `n` such that `10000 <= n < 20000 || n == 0 || n == 3`, events are **replaceable**, which means that, for each combination of `pubkey` and `kind`, only the latest event MUST be stored by relays, older versions MAY be discarded.
- **NIP-01 Kinds.** for kind `n` such that `30000 <= n < 40000`, events are **addressable** by their `kind`, `pubkey` and `d` tag value -- which means that, for each combination of `kind`, `pubkey` and the `d` tag value, only the latest event MUST be stored by relays, older versions MAY be discarded.
- **NIP-01 Kinds.** In case of replaceable events with the same timestamp, the event with the lowest id (first in lexical order) should be retained, and the other discarded.

## Communication between clients and relays

Source: https://raw.githubusercontent.com/nostr-protocol/nips/a79e21d90fce5465b50ef385dd368bba99ec4a0b/01.md

- **NIP-01 Communication between clients and relays.** Clients SHOULD open a single websocket connection to each relay and use it for all their subscriptions.
- **NIP-01 From client to relay.** Relays MUST manage `<subscription_id>`s independently for each WebSocket connection.
- **NIP-01 From client to relay.** The `ids`, `authors`, `#e` and `#p` filter lists MUST contain exact 64-character lowercase hex values.
- **NIP-01 From client to relay.** All conditions of a filter that are specified must match for an event for it to pass the filter, i.e., multiple conditions are interpreted as `&&` conditions.
- **NIP-01 From client to relay.** A `REQ` message may contain multiple filters. In this case, events that match any of the filters are to be returned, i.e., multiple filters are to be interpreted as `||` conditions.
- **NIP-01 From client to relay.** The `limit` property of a filter is only valid for the initial query and MUST be ignored afterwards.
- **NIP-01 From client to relay.** When `limit` is zero, the relay MUST NOT return stored events for that filter.
- **NIP-01 From client to relay.** After the initial queries for all filters are complete, the relay MUST send `EOSE` and MUST keep the subscription active for newly received matching events.
- **NIP-01 From relay to client.** `EVENT` messages MUST be sent only with a subscription ID related to a subscription previously initiated by the client (using the `REQ` message above).
- **NIP-01 From relay to client.** `OK` messages MUST be sent in response to `EVENT` messages received from clients, they must have the 3rd parameter set to `true` when an event has been accepted by the relay, `false` otherwise.
- **NIP-01 From relay to client.** The 4th parameter MUST always be present, but MAY be an empty string when the 3rd is `true`, otherwise it MUST be a string formed by a machine-readable single-word prefix followed by a `:` and then a human-readable message.
- **NIP-01 From relay to client.** `CLOSED` messages MUST be sent in response to a `REQ` when the relay refuses to fulfill it.
