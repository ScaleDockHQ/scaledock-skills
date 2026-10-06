---
name: gamepad
description: >-
  Gamepad: The Gamepad specification defines a low-level interface that represents gamepad devices. Covers Gamepad (track). Use when reading gamepad input. Triggers: Gamepad API, navigator.getGamepads.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.0"
  kind: standard
---

# Gamepad

The Gamepad specification defines a low-level interface that represents gamepad devices.

The publisher of the pinned text is named in [Sources](#sources). With this skill the agent applies that text: when reading gamepad input.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources). Quoted requirements are sentences taken from the pinned text. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: producer or consumer of this specification.
- Target version: Gamepad (default, posture track). See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill, re-read every URL in [Sources](#sources) and check the publisher index for a newer revision or version line.

## Invariants

1. **3.1.** "The user agent SHOULD consider a layout to correspond with a standard layout if its input controls have approximately the same relative positions and orientations as input controls described in the standard layout."
2. **3.1.** "The user agent SHOULD consider the device identifiers when deciding whether a gamepad corresponds with a standard layout ."
3. **3.1.** "If the system assigns a label to each input control and the labels imply a particular layout then the user agent SHOULD consider the gamepad to have that layout."
4. **3.1.** "When there is a standard model and an accessible model with the same input controls , the user agent SHOULD consider the accessible model to have the same input control layout as the standard model."
5. **3.2.** "The user agent is responsible for detecting when input values have updated and SHOULD try to minimize the delay between the update and when the updated values are read."
6. **3.2.** "The user agent SHOULD rely on conventions around HID usage identifiers when deciding the input control layout ."
7. **4..** "Unique identifiers like serial numbers or Bluetooth device addresses MUST NOT be included in the id string."
8. **4..** "When multiple gamepads are connected to a user agent , indices MUST be assigned on a first-come, first-serve basis, starting at zero."

## Workflow

1. **Pick the version.** Use the current line unless a named consumer needs a supported one. Do not author a legacy line. Emit a preview only when its posture is build and the user asked for that draft.
   -> [`references/versions.md`](references/versions.md)
   ✓ The target version is recorded, and it is not a legacy line.
2. **Apply the pinned requirements.** Walk the quotes in [`references/requirements.md`](references/requirements.md) and implement each one that applies to the role.
   -> [`references/requirements.md`](references/requirements.md)
   ✓ Each applicable quote is either implemented or recorded as out of scope for the role, with the heading it came from.
3. **Upgrade** (only when asked). Follow the upgrade section from the source line to the target.
   -> [`references/versions.md`](references/versions.md)
   ✓ The result cites the target line and no longer depends on a requirement that only the old line stated.

## Verify before done

- [ ] The artifact cites the target line's revision from [Sources](#sources).
- [ ] Every applicable quoted requirement in [`references/requirements.md`](references/requirements.md) holds.
- [ ] Nothing from a preview line is emitted unless its posture is build and the user opted in.

## Reference index

- **`references/versions.md`**: every version line, which one to use, and how to upgrade. Load for steps 1 and 3.
- **`references/requirements.md`**: quotes taken from the pinned specification. Load for step 2.

## Related skills

Install related spec skills by name with `npx skills add ScaleDockHQ/scaledock-skills --skill <name>`.

## Sources

Status uses the publishing body's own maturity term. Checked is the date the source was last read.

- [Gamepad](https://www.w3.org/TR/gamepad/): Working Draft, gamepad WD-gamepad-20250710 (Working Draft, 2025-07-10), checked 2026-10-06.
