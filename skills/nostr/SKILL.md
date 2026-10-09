---
name: nostr
description: >-
  Nostr: This NIP defines the basic protocol that should be implemented by everybody. Covers NIP-01. Use when implementing a Nostr client or relay. Triggers: Nostr.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.1.0"
  kind: standard
---

# Nostr

Nostr is a protocol of signed JSON events exchanged between clients and relays over WebSockets. NIP-01 from the nostr-protocol/nips repository defines the basic protocol that every implementation follows: the event structure and how its ID is computed, the standard tags, kind ranges, subscription filters and the messages between clients and relays.

**Scope.** Only NIP-01 is pinned. Other NIPs extend it with optional kinds, tags and messages; read them from the same repository when a feature needs one.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources). Quoted requirements are sentences taken from the pinned text, labelled with the section they come from. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: Nostr client publishing or reading events, or a relay storing and serving them.
- Target version: NIP-01 (current). See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill, re-read every URL in [Sources](#sources) and check the publisher for a newer revision or version line.

## Invariants

1. **NIP-01 Events and signatures.** "To prevent implementation differences from creating a different event ID for the same event, the following rules MUST be followed while serializing:"
2. **NIP-01 Events and signatures.** "Whitespace, line breaks or other unnecessary formatting should not be included in the output JSON."
3. **NIP-01 Events and signatures.** "The following characters in the content field must be escaped as shown, and all other characters must be included verbatim:"
4. **NIP-01 Kinds.** "for kind `n` such that `10000 <= n < 20000 || n == 0 || n == 3`, events are **replaceable**, which means that, for each combination of `pubkey` and `kind`, only the latest event MUST be stored by relays, older versions MAY be discarded."
5. **NIP-01 Kinds.** "for kind `n` such that `30000 <= n < 40000`, events are **addressable** by their `kind`, `pubkey` and `d` tag value -- which means that, for each combination of `kind`, `pubkey` and the `d` tag value, only the latest event MUST be stored by relays, older versions MAY be discarded."
6. **NIP-01 From client to relay.** "Relays MUST manage `<subscription_id>`s independently for each WebSocket connection."
7. **NIP-01 From client to relay.** "The `ids`, `authors`, `#e` and `#p` filter lists MUST contain exact 64-character lowercase hex values."
8. **NIP-01 From client to relay.** "All conditions of a filter that are specified must match for an event for it to pass the filter, i.e., multiple conditions are interpreted as `&&` conditions."
9. **NIP-01 From client to relay.** "When `limit` is zero, the relay MUST NOT return stored events for that filter."
10. **NIP-01 From client to relay.** "After the initial queries for all filters are complete, the relay MUST send `EOSE` and MUST keep the subscription active for newly received matching events."
11. **NIP-01 From relay to client.** "`OK` messages MUST be sent in response to `EVENT` messages received from clients, they must have the 3rd parameter set to `true` when an event has been accepted by the relay, `false` otherwise."
12. **NIP-01 From relay to client.** "`CLOSED` messages MUST be sent in response to a `REQ` when the relay refuses to fulfill it."

## Workflow

1. **Pick the version.** Use the current line unless a named consumer needs a supported one. Do not author a legacy line. Emit a preview only when its posture is build and the user asked for that draft.
   -> [`references/versions.md`](references/versions.md)
   ✓ The target version is recorded, and it is not a legacy line.
2. **Apply the pinned requirements.** Walk the quotes in [`references/requirements.md`](references/requirements.md) and implement each one that applies to the role.
   -> [`references/requirements.md`](references/requirements.md)
   ✓ Each applicable quote is either implemented or recorded as out of scope for the role, with the section it came from.
3. **Upgrade** (only when asked). Follow the upgrade section from the source line to the target.
   -> [`references/versions.md`](references/versions.md)
   ✓ The result cites the target line and no longer depends on a requirement that only the old line stated.

## Verify before done

- [ ] The artifact cites the target line's revision from [Sources](#sources).
- [ ] Every applicable quoted requirement in [`references/requirements.md`](references/requirements.md) holds.
- [ ] Nothing from a preview line is emitted unless its posture is build and the user opted in.

## Reference index

- **`references/versions.md`**: every version line, which one to use, and how to upgrade. Load for steps 1 and 3.
- **`references/requirements.md`**: quotes taken from the pinned specification, grouped by source. Load for step 2.

## Related skills

Install related spec skills by name with `npx skills add ScaleDockHQ/scaledock-skills --skill <name>`: `websocket`, `json`.

## Sources

Status uses the publishing body's own maturity term. Checked is the date the source was last read.

- [NIP-01: Basic protocol flow description](https://raw.githubusercontent.com/nostr-protocol/nips/a79e21d90fce5465b50ef385dd368bba99ec4a0b/01.md): NIP (draft, mandatory), nostr-protocol/nips commit a79e21d, 2026-10-05, checked 2026-10-06.
