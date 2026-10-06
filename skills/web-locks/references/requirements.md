# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## Web Locks API

Source: https://www.w3.org/TR/web-locks/

This document defines a web platform API that allows script to asynchronously acquire a lock over a resource, hold it while work is performed, then release it. While held, no other script in the origin can acquire a lock over the same resource. This allows contexts (windows, workers) within a web application to coordinate the usage of resources.

- **Document conventions.** The key words “MUST”, “MUST NOT”, “REQUIRED”, “SHALL”, “SHALL NOT”, “SHOULD”, “SHOULD NOT”, “RECOMMENDED”, “MAY”, and “OPTIONAL” in the normative parts of this document are to be interpreted as described in RFC 2119.
- **1.2. Motivating Use Cases.** When the same document is opened for editing in two tabs the work must be coordinated across tabs, such as allowing only one tab to make changes to or synchronize the document at a time.
- **1.2. Motivating Use Cases.** This tab is the only one that should be performing some operations (e.g.
- **6.1. Lock Scope.** Locks can be used as an ephemeral state retention mechanism and, like storage APIs, can be used as a communication mechanism, and must be no more privileged than storage facilities.
- **6.1. Lock Scope.** User agents that impose finer granularity on one of these services must impose it on others; for example, a user agent that exposes different storage partitions to a top-level page (first-party) and a cross-origin iframe (third-party) in the same origin for privacy reasons must similarly partition locking.
- **6.1. Lock Scope.** This also provides reasonable expectations for web application authors; if a lock is acquired over a storage resource, all same-origin browsing contexts must observe the same state.
- **6.3. Implementation Risks.** Implementations must ensure that locks do not span origins.
- **Conformant Algorithms.** Requirements phrased in the imperative as part of algorithms (such as "strip any leading space characters" or "return false and abort these steps") are to be interpreted with the meaning of the key word ("must", "should", "may", etc) used in introducing the algorithm.
