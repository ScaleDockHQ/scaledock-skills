# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## Battery Status API

Source: https://www.w3.org/TR/battery-status/

This specification defines an API that provides information about the battery status of the hosting device.

- **2. Conformance.** The key words MAY , MUST , and SHOULD in this document are to be interpreted as described in BCP 14 [ RFC2119 ] [ RFC8174 ] when, and only when, they appear in all capitals, as shown here.
- **3..** The user agent SHOULD not expose high precision readouts of battery status information as that can introduce a new fingerprinting vector.
- **3..** The user agent SHOULD inform the user of the API use by scripts in an unobtrusive manner to aid transparency and to allow the user to revoke the API access.
- **6.1.1.** It MUST be set to false if the battery is discharging, and set to true if the battery is charging, the implementation is unable to report the state, or there is no battery attached to the system, or otherwise.
- **6.1.2.** It MUST be set to 0 if the battery is full or there is no battery attached to the system, and to the value positive Infinity if the battery is discharging, the implementation is unable to report the remaining charging time, or otherwise.
- **6.1.3.** It MUST be set to the value positive Infinity if the battery is charging, the implementation is unable to report the remaining discharging time, there is no battery attached to the system, or otherwise.
- **6.1.4.** It MUST be set to 0 if the system's battery is depleted and the system is about to be suspended, and to 1.0 if the battery is full, the implementation is unable to report the battery's level, or there is no battery attached to the system.
- **6.6.** Event handlers The following are the event handlers (and their corresponding event handler event types ) that MUST be supported as attributes by the BatteryManager object: event handler event handler event type onchargingchange chargingchange onchargingtimechange chargingtimechange ondischargingtimechange dischargingtimechange onlevelchange levelchange
