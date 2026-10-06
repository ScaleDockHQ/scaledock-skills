# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## NIP-01

Source: https://raw.githubusercontent.com/nostr-protocol/nips/master/01.md

This NIP defines the basic protocol that should be implemented by everybody. New NIPs may add new optional (or mandatory) fields and messages and features to the structures and flows described here.

- **document.** The serialization is done over the UTF-8 JSON-serialized string (which is described below) of the following structure: `[ 0, , , , , ]` To prevent implementation differences from creating a different event ID for the same event, the following rules MUST be followed while serializing: - UTF-8 should be used for encoding.
- **document.** And also a convention for kind ranges that allow for easier experimentation and flexibility of relay implementation: - for kind `n` such that `1000 ]}`, even if the relay has more than one version stored, it SHOULD return just the latest one.
- **document.** Clients SHOULD open a single websocket connection to each relay and use it for all their subscriptions.
- **document.** Relays MUST only accept connections to a single endpoint when additional path segments do not influence its behavior.
- **document.** Relays MUST manage ` `s independently for each WebSocket connection.
- **document.** ` ` is a JSON object that determines what events will be sent in that subscription, it can have the following attributes: `yaml { "ids": , "authors": , "kinds": , "# ": , "since": = to this to pass>, "until": , "limit": } ` Upon receiving a `REQ` message, the relay SHOULD return events that match the filter.
- **document.** Any new events it receives SHOULD be sent to that same websocket until the connection is closed, a `CLOSE` event is received with the same ` `, or a new `REQ` is sent using the same ` ` (in which case a new subscription is created, replacing the old one).
- **document.** The `ids`, `authors`, `#e` and `#p` filter lists MUST contain exact 64-character lowercase hex values.
