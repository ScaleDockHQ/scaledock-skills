# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## Audio Session

Source: https://www.w3.org/TR/audio-session/

This API defines an API surface for controlling how audio is rendered and interacts with other audio playing applications.

- **3. The AudioSession interface.** On getting, it MUST return the AudioSession [[state]] value.
- **3. The AudioSession interface.** On getting, it MUST return the AudioSession [[type]] value.
- **3. The AudioSession interface.** On setting, it MUST run the following steps with newValue being the new value being set on audioSession : If audioSession .
- **4. Extensions to the Navigator interface.** Upon creation of the Window object, its associated AudioSession MUST be set to a newly created AudioSession object with the Window object’s relevant realm .
- **5.1. Update AudioSession’s type.** To update the type of audioSession , the user agent MUST run the following steps: If audioSession .
- **5.2. Update AudioSession’s state.** When the user agent observes such a modification, the user agent MUST queue a task to notify the state’s change with audioSession , the AudioSession object tied to the modified audio session and with newState being the new audio session state .
- **5.2. Update AudioSession’s state.** To notify the state’s change with audioSession and newState , the user agent MUST run the following steps: Let isMutatingState be true if audioSession .
- **5.2. Update AudioSession’s state.** To inactivate an AudioSession named audioSession , the user agent MUST run the following steps: If audioSession .
