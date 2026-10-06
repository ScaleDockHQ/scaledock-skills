# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## Service Workers Nightly

Source: https://www.w3.org/TR/service-workers/

The core of this specification is a worker that wakes to receive events. This provides an event destination that can be used when other destinations would be inappropriate, or no other destination exists. For example, to allow the developer to decide how a page should be fetched, an event needs to dispatch potentially before any other execution contexts exist for that origin. To react to a push message, or completion of a persistent download, the context that originally registered interest may no longer exist. In these cases, the service worker is the ideal event destination. This specification also provides a fetch event , and a request and response store similar in design to the HTTP cache

- **Document conventions.** The key words “MUST”, “MUST NOT”, “REQUIRED”, “SHALL”, “SHALL NOT”, “SHOULD”, “SHOULD NOT”, “RECOMMENDED”, “MAY”, and “OPTIONAL” in the normative parts of this document are to be interpreted as described in RFC 2119.
- **1. Motivations.** A key design principle of the service worker is that errors should always be recoverable.
- **2.3.1. Lifetime.** A user agent must persistently keep a list of registered service worker registrations unless otherwise they are explicitly unregistered .
- **2.7. User Agent Shutdown.** A user agent must maintain the state of its stored service worker registrations across restarts with the following rules: An installing worker does not persist but is discarded.
- **2.7. User Agent Shutdown.** To attain this, the user agent must invoke Handle User Agent Shutdown when it terminates.
- **3.1.3. state.** The state attribute must return the value (in ServiceWorkerState enumeration) to which it was last set.
- **3.1.6. Event handler.** The following is the event handler (and its corresponding event handler event type ) that must be supported, as event handler IDL attributes , by all objects implementing ServiceWorker interface: event handler event handler event type onstatechange statechange
- **3.2.2. installing.** installing attribute must return the value to which it was last set.
