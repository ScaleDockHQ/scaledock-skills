# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## Contact Picker API

Source: https://www.w3.org/TR/contact-picker/

An API to give one-off access to a user’s contact information with full control over the shared data.

- **7. Contact Picker.** To launch a contact picker with allowMultiple (a boolean ), and properties (a list of DOMString s), the user agent MUST present a user interface that follows these rules: If presenting a user interface fails or accessing the contacts source 's available contacts fails, then return failure.
- **7. Contact Picker.** The UI MUST prominently display the top-level traversable 's origin .
- **7. Contact Picker.** The UI MUST make it clear which properties of the contacts are requested.
- **7. Contact Picker.** The UI SHOULD provide a way for users to opt out of sharing certain contact information.
- **7. Contact Picker.** The UI MUST make it clear which information will be shared.
- **7. Contact Picker.** The UI MUST provide a way to select individual contacts.
- **7. Contact Picker.** The UI MUST provide an option to cancel/return without sharing any contacts, in which case remove the UI and return an empty list .
- **7. Contact Picker.** The UI MUST provide an a way for users to indicate that they are done selecting, in which case remove the UI and return a list of the selected contacts as user contacts .
