---
name: nostr
description: >-
  Nostr: This NIP defines the basic protocol that should be implemented by everybody. Covers NIP-01. Use when implementing a Nostr client or relay. Triggers: Nostr.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.0"
  kind: standard
---

# Nostr

This NIP defines the basic protocol that should be implemented by everybody. New NIPs may add new optional (or mandatory) fields and messages and features to the structures and flows described here.

The publisher of the pinned text is named in [Sources](#sources). With this skill the agent applies that text: when implementing a Nostr client or relay.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources). Quoted requirements are sentences taken from the pinned text. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: producer or consumer of this specification.
- Target version: NIP-01 (default). See `references/versions.md`.
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill, re-read every URL in [Sources](#sources) and check the publisher index for a newer revision or version line.

## Invariants

1. **document.** "The serialization is done over the UTF-8 JSON-serialized string (which is described below) of the following structure: `[ 0, , , , , ]` To prevent implementation differences from creating a different event ID for the same event, the following rules MUST be followed while serializing: - UTF-8 should be used for encoding."
2. **document.** "And also a convention for kind ranges that allow for easier experimentation and flexibility of relay implementation: - for kind `n` such that `1000 ]}`, even if the relay has more than one version stored, it SHOULD return just the latest one."
3. **document.** "Clients SHOULD open a single websocket connection to each relay and use it for all their subscriptions."
4. **document.** "Relays MUST only accept connections to a single endpoint when additional path segments do not influence its behavior."
5. **document.** "Relays MUST manage ` `s independently for each WebSocket connection."
6. **document.** "` ` is a JSON object that determines what events will be sent in that subscription, it can have the following attributes: `yaml { "ids": , "authors": , "kinds": , "# ": , "since": = to this to pass>, "until": , "limit": } ` Upon receiving a `REQ` message, the relay SHOULD return events that match the filter."
7. **document.** "Any new events it receives SHOULD be sent to that same websocket until the connection is closed, a `CLOSE` event is received with the same ` `, or a new `REQ` is sent using the same ` ` (in which case a new subscription is created, replacing the old one)."
8. **document.** "The `ids`, `authors`, `#e` and `#p` filter lists MUST contain exact 64-character lowercase hex values."

## Workflow

1. **Pick the version.** Use the current line unless a named consumer needs a supported one. Do not author a legacy line. Emit a preview only when its posture is build and the user asked for that draft.
   -> `references/versions.md`
   ✓ The target version is recorded, and it is not a legacy line.
2. **Apply the pinned requirements.** Walk the quotes in `references/requirements.md` and implement each one that applies to the role.
   -> `references/requirements.md`
   ✓ Each applicable quote is either implemented or recorded as out of scope for the role, with the heading it came from.
3. **Upgrade** (only when asked). Follow the upgrade section from the source line to the target.
   -> `references/versions.md`
   ✓ The result cites the target line and no longer depends on a requirement that only the old line stated.

## Verify before done

- [ ] The artifact cites the target line's revision from [Sources](#sources).
- [ ] Every applicable quoted requirement in `references/requirements.md` holds.
- [ ] Nothing from a preview line is emitted unless its posture is build and the user opted in.

## Reference index

- **`references/versions.md`**: every version line, which one to use, and how to upgrade. Load for steps 1 and 3.
- **`references/requirements.md`**: quotes taken from the pinned specification. Load for step 2.

## Related skills

Install related spec skills by name with `npx skills add ScaleDockHQ/scaledock-skills --skill <name>`.

## Sources

Status uses the publishing body's own maturity term. Checked is the date the source was last read.

- [NIP-01](https://raw.githubusercontent.com/nostr-protocol/nips/master/01.md): NIP, NIP-01 on nostr-protocol/nips master (NIP, 2026-10-06), checked 2026-10-06.
