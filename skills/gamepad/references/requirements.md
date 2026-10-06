# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## Gamepad

Source: https://www.w3.org/TR/gamepad/

The Gamepad specification defines a low-level interface that represents gamepad devices.

- **3.1.** The user agent SHOULD consider a layout to correspond with a standard layout if its input controls have approximately the same relative positions and orientations as input controls described in the standard layout.
- **3.1.** The user agent SHOULD consider the device identifiers when deciding whether a gamepad corresponds with a standard layout .
- **3.1.** If the system assigns a label to each input control and the labels imply a particular layout then the user agent SHOULD consider the gamepad to have that layout.
- **3.1.** When there is a standard model and an accessible model with the same input controls , the user agent SHOULD consider the accessible model to have the same input control layout as the standard model.
- **3.2.** The user agent is responsible for detecting when input values have updated and SHOULD try to minimize the delay between the update and when the updated values are read.
- **3.2.** The user agent SHOULD rely on conventions around HID usage identifiers when deciding the input control layout .
- **4..** Unique identifiers like serial numbers or Bluetooth device addresses MUST NOT be included in the id string.
- **4..** When multiple gamepads are connected to a user agent , indices MUST be assigned on a first-come, first-serve basis, starting at zero.
