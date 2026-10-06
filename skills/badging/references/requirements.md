# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## Badging API

Source: https://www.w3.org/TR/badging/

This specification defines an API that allows installed web applications to set an application badge, which is usually shown alongside the application's icon on the device's home screen or application dock.

- **4..** Displaying a badge When the application's badge is set , the user agent or operating system SHOULD display the application's badge alongside the primary iconic representation of the application in the user's operating system (for example, as a small overlay on top of the application's icon on the home screen on a device).
- **4..** When a user agent requires such permission , it SHOULD tie the permission grant to the " notifications " permission.
- **4..** When the badge is set to "flag" , the user agent or operating system SHOULD display an indicator with a non-specific symbol (for example, a colored circle).
- **4..** If the platform does not support displaying a "flag" badge, the user agent SHOULD display the badge using the closest available representation that indicates the presence of a badge (e.g., the value "1"), rather than clearing the badge entirely.
- **4..** When a badge 's value is set to "nothing" , the user agent or operating system SHOULD clear the badge by no longer displaying it.
- **4..** When the badge is set to a number , the user agent or operating system: SHOULD format and display the number according to the user's font and formatting preferences.
- **4..** SHOULD localize the number according to the user's locale preferences.
- **4..** Similarly, if the platform does not support "flag" badges, it MAY represent "flag" using a number or other appropriate visual indicator, but MUST NOT clear the badge when "flag" is requested.
