# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## Web MIDI API

Source: https://www.w3.org/TR/webmidi/

Some user agents have music devices, such as synthesizers, keyboard and other controllers, and drum machines connected to their host computer or device. The widely adopted Musical Instrument Digital Interface (MIDI) protocol enables electronic musical instruments, controllers and computers to communicate and synchronize with each other. MIDI does not transmit audio signals: instead, it sends event messages about musical notes, controller signals for parameters such as volume, vibrato and panning, cues and clock signals to set the tempo, and system-specific MIDI communications (e.g. to remotely store synthesizer-specific patch data). This same protocol has become a standard for non-musical us

- **2. Conformance.** The key words MUST and SHOULD in this document are to be interpreted as described in BCP 14 [ RFC2119 ] [ RFC8174 ] when, and only when, they appear in all capitals, as shown here.
- **2. Conformance.** Implementations that use ECMAScript to implement the APIs defined in this specification MUST implement them in a manner consistent with the ECMAScript Bindings defined in the Web IDL specification [ WEBIDL ], as this specification uses that specification and terminology.
- **4.3.** Requesting MIDI access SHOULD prompt the user for access to MIDI devices, particularly if System Exclusive access is requested.
- **4.3.** When the requestMIDIAccess () method is called, the user agent MUST run the following steps: Let promise be a new Promise object and resolver be its associated resolver.
- **5.3.** This event handler , of type MIDIConnectionEvent , MUST be supported by all objects implementing the MIDIAccess interface.
- **5.3.** Whenever a previously unavailable MIDI port becomes available for use, or an existing port changes the state attribute, the user agent SHOULD run the following steps: Let port be the MIDIPort corresponding to the newly-available, or the existing port.
- **5.4.** The User Agent MUST ensure that the id is unique to only that port.
- **5.4.** The User Agent SHOULD ensure that the id is maintained across instances of the application - e.g., when the system is rebooted - and when a device is removed from the system.
