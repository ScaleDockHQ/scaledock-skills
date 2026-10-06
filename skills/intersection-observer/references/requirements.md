# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## Intersection Observer

Source: https://www.w3.org/TR/intersection-observer/

This specification describes an API that can be used to understand the visibility and position of DOM elements ("targets") relative to a containing element or to the top-level viewport ("root"). The position is delivered asynchronously and is useful for understanding the visibility of elements and implementing pre-loading and deferred loading of DOM content.

- **Document conventions.** The key words “MUST”, “MUST NOT”, “REQUIRED”, “SHALL”, “SHALL NOT”, “SHOULD”, “SHOULD NOT”, “RECOMMENDED”, “MAY”, and “OPTIONAL” in the normative parts of this document are to be interpreted as described in RFC 2119.
- **2.2. The IntersectionObserver interface.** Any target of an explicit root observer is also a same-origin-domain target , since the target must be in the same document as the intersection root .
- **2.3. The IntersectionObserverEntry interface.** time , of type DOMHighResTimeStamp , readonly The attribute must return a DOMHighResTimeStamp that corresponds to the time the intersection was recorded, relative to the time origin of the global object associated with the IntersectionObserver instance that generated the notification.
- **2.4. The IntersectionObserverInit dictionary.** Threshold values must be in the range of [0, 1.0] and represent a percentage of the area of the rectangle produced by getting the bounding box for target .
- **3. Processing Model.** This section outlines the steps the user agent must take when implementing the Intersection Observer API.
- **3.4.2. Pending initial IntersectionObserver targets.** In the HTML Event Loops Processing Model , under the " Update the rendering " step, the " Unnecessary rendering " step should be modified to add an additional requirement for skipping the rendering update: The document does not have pending initial IntersectionObserver targets .
- **5. Privacy and Security.** It should be noted that prior to IntersectionObserver , web developers used other API’s in very ingenious (and grotesque) ways to tease out the information available from IntersectionObserver .
- **Conformant Algorithms.** Requirements phrased in the imperative as part of algorithms (such as "strip any leading space characters" or "return false and abort these steps") are to be interpreted with the meaning of the key word ("must", "should", "may", etc) used in introducing the algorithm.
