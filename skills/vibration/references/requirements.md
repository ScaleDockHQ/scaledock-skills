# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the algorithm steps and conformance sentences from the published text, quoted as written (only line breaks were joined). Apply the ones that match the role. Each is labelled with the section it comes from in the published document. The specification is short: § 3 and § 4 hold all of its normative text.

## Vibration API

Source: https://www.w3.org/TR/vibration/

- **§ 3.** The vibrate() method steps are to run the processing vibration patterns algorithm.
- **§ 3.** If the document's visibility state is not visible, then return false and terminate these steps.
- **§ 3.** Let max length have the value 10.
- **§ 3.** If the length of pattern is greater than max length, truncate pattern, leaving only the first max length entries.
- **§ 3.** Let max duration have the value 10000.
- **§ 3.** For each entry in pattern whose value is greater than max duration, set the entry's value to max duration.
- **§ 3.** If global does not have sticky activation, return false and terminate these steps.
- **§ 3.** An implementation MAY return false and terminate these steps.
- **§ 3.** If another instance of the perform vibration algorithm is already running, run the following substeps: Abort that other instance of the perform vibration algorithm, if any.
- **§ 3.** If pattern is an empty list, contains a single entry with a value of 0, or if the device is unable to vibrate, then return true and terminate these steps.
- **§ 3.** Return true, and then continue running these steps asynchronously.
- **§ 3.** If the index of time is even (the first entry has index 0), vibrate the device for time milliseconds.
- **§ 3.** When the user agent determines that the visibility state of the Document of the top-level browsing context changes, it MUST abort the already running processing vibration patterns algorithm, if any.
- **§ 4.** For these reasons, the user agent MAY inform the user when the API is being used and provide a mechanism to disable the API (effectively no-op), on a per-origin basis or globally.
- **§ 4.** The user agent SHOULD employ global rate limiting to restrict the number of vibration requests made within a certain period (e.g., per minute or hour) to prevent excessive use.
