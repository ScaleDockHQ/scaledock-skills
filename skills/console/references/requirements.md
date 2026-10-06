# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## Console Living Standard

Source: https://console.spec.whatwg.org/review-drafts/2024-12/

This specification defines APIs for console debugging facilities.

- **Console.** Developers should refer to the Living Standard for the most current error corrections and other developments.
- **1. Namespace console.** For historical web-compatibility reasons, the namespace object for console must have as its [[Prototype]] an empty object, created as if by ObjectCreate ( %ObjectPrototype% ), instead of %ObjectPrototype% .
- **1.3.1. group(... data ).** Optionally, if the environment supports interactive groups, group should be expanded by default.
- **1.3.2. groupCollapsed(... data ).** Optionally, if the environment supports interactive groups, group should be collapsed by default.
- **2.3. Printer( logLevel , args [, options ]).** How the implementation prints args is up to the implementation, but implementations should separate the objects by a space or something similar, as that has become a developer expectation.
- **2.3. Printer( logLevel , args [, options ]).** The output produced by calls to Printer should appear only within the last group on the appropriate group stack if the group stack is not empty, or elsewhere in the console otherwise.
- **2.3. Printer( logLevel , args [, options ]).** If the console is not open when the printer operation is called, implementations should buffer messages to show them in the future up to an implementation-defined limit (typically on the order of at least 100).
- **2.3.3. Common object formats.** It should be noted that the formatting described in this section is applied to implementation-defined object representations that will eventually be passed into Printer , where the actual side effect of formatting will be seen.
