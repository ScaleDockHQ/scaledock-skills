# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## Server-sent events

Source: https://html.spec.whatwg.org/multipage/server-sent-events.html

← 9 Communication — Table of Contents — 9.3 Cross-document messaging → 9.2 Server-sent events 9.2.1 Introduction 9.2.2 The EventSource interface 9.2.3 Processing model 9.2.4 The `Last-Event-ID` header 9.2.5 Parsing an event stream 9.2.6 Interpreting an event stream 9.2.7 Authoring notes 9.2.8 Connectionless push and other features 9.2.9 Garbage collection 9.2.10 Implementation advice

- **9.2.2 The EventSource interface.** This must initially be an implementation-defined value, probably in the region of a few seconds.
- **9.2.2 The EventSource interface.** This must initially be the empty string.
- **9.2.2 The EventSource interface.** The EventSource( url , eventSourceInitDict ) constructor, when invoked, must run these steps: Let ev be a new EventSource object.
- **9.2.2 The EventSource interface.** The url attribute's getter must return the serialization of this EventSource object's url .
- **9.2.2 The EventSource interface.** The withCredentials attribute must return the value to which it was last initialized.
- **9.2.2 The EventSource interface.** When the object is created, it must be initialized to false.
- **9.2.2 The EventSource interface.** When the object is created, its readyState must be set to CONNECTING (0).
- **9.2.2 The EventSource interface.** The close() method must abort any instances of the fetch algorithm started for this EventSource object, and must set the readyState attribute to CLOSED .
