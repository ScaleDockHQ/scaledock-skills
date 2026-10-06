# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## Performance Timeline Level 1

Source: https://www.w3.org/TR/performance-timeline/

This specification extends the High Resolution Time specification [ HR-TIME-3 ] by providing methods to store and retrieve high resolution performance metric data.

- **2. Conformance.** The key words MUST , MUST NOT , and SHOULD in this document are to be interpreted as described in BCP 14 [ RFC2119 ] [ RFC8174 ] when, and only when, they appear in all capitals, as shown here.
- **4. The PerformanceEntry interface.** navigationId This attribute MUST return the value it is initialized to.
- **5.2 observe() method.** The user agent SHOULD notify developers if entry types is modified.
- **5.2 observe() method.** The user agent SHOULD notify developers when the steps are aborted to notify that registration has been aborted.
- **5.2 observe() method.** The user agent SHOULD notify developers when this happens, for instance via a console warning.
- **5.2.1 PerformanceObserverInit dictionary.** If present, the list MUST NOT be empty and all other members MUST NOT be present.
- **5.2.1 PerformanceObserverInit dictionary.** Types not recognized by the user agent MUST be ignored.
- **5.2.1 PerformanceObserverInit dictionary.** A type that is not recognized by the user agent MUST be ignored.

## Performance Timeline

Source: https://www.w3.org/TR/performance-timeline/

This specification extends the High Resolution Time specification [ HR-TIME-3 ] by providing methods to store and retrieve high resolution performance metric data.

- **2. Conformance.** The key words MUST , MUST NOT , and SHOULD in this document are to be interpreted as described in BCP 14 [ RFC2119 ] [ RFC8174 ] when, and only when, they appear in all capitals, as shown here.
- **4. The PerformanceEntry interface.** navigationId This attribute MUST return the value it is initialized to.
- **5.2 observe() method.** The user agent SHOULD notify developers if entry types is modified.
- **5.2 observe() method.** The user agent SHOULD notify developers when the steps are aborted to notify that registration has been aborted.
- **5.2 observe() method.** The user agent SHOULD notify developers when this happens, for instance via a console warning.
- **5.2.1 PerformanceObserverInit dictionary.** If present, the list MUST NOT be empty and all other members MUST NOT be present.
- **5.2.1 PerformanceObserverInit dictionary.** Types not recognized by the user agent MUST be ignored.
- **5.2.1 PerformanceObserverInit dictionary.** A type that is not recognized by the user agent MUST be ignored.

## High Resolution Time Level 2

Source: https://www.w3.org/TR/hr-time-2/

This specification defines an API that provides the time origin, and current time in sub-millisecond resolution, such that it is not subject to system clock skew or adjustments.

- **2. Time Origin.** The time origin is the time value from which time is measured: If the global object is a Window object, the time origin MUST be equal to: the time when the browsing context is first created if there is no previous document; otherwise, the time of the user confirming the navigation during the previous document's prompt to unload algorithm , if a previous document exists and if the confirmation…
- **2. Time Origin.** If the global object is a WorkerGlobalScope object, the time origin MUST be equal to the official moment of creation of the worker.
- **3. The DOMHighResTimeStamp typedef.** typedef double DOMHighResTimeStamp ; A DOMHighResTimeStamp SHOULD represent a time in milliseconds accurate enough to allow measurement while preventing timing attacks - see § 7.1 Clock resolution for additional considerations.
- **4.1 now() method.** The now() method MUST return the current high resolution time .
- **4.2 timeOrigin attribute.** The timeOrigin attribute MUST return a DOMHighResTimeStamp representing the high resolution time of the time origin timestamp for the relevant global object of the Performance object.
- **6. Monotonic Clock.** The time values returned when calling the now () method on Performance objects with the same time origin MUST use the same monotonic clock that is monotonically increasing and not subject to system clock adjustments or system clock skew.
- **6. Monotonic Clock.** now () method MUST never be negative if the two time values have the same time origin .
- **6. Monotonic Clock.** timeOrigin MUST use the same global monotonic clock that is shared by time origin s, is monotonically increasing and not subject to system clock adjustments or system clock skew, and whose reference point is the [ ECMA-262 ] time definition - see § 7.

## High Resolution Time Level 3

Source: https://www.w3.org/TR/hr-time-3/

This specification defines an API that provides the time origin, and current time in sub-millisecond resolution, such that it is not subject to system clock skew or adjustments.

- **5..** typedef double DOMHighResTimeStamp ; A DOMHighResTimeStamp SHOULD represent a time in milliseconds accurate enough to allow measurement while preventing timing attacks - see § 9.1 Clock resolution for additional considerations.
- **7.1..** now() method The now() method MUST return the number of milliseconds in the current high resolution time given this ’s relevant global object (a duration ).
- **7.1..** The time values returned when calling the now() method on Performance objects with the same time origin MUST use the same monotonic clock .
- **7.1..** The difference between any two chronologically recorded time values returned from the now() method MUST never be negative if the two time values have the same time origin .
- **7.2..** timeOrigin attribute The timeOrigin attribute MUST return the number of milliseconds in the duration returned by get time origin timestamp for the relevant global object of this .
- **7.2..** timeOrigin MUST use the same monotonic clock that is shared by time origins , and whose reference point is the [ECMA-262] time definition - see [ § 9 Security Considerations ].
- **Document conventions.** The key words “MUST”, “MUST NOT”, “REQUIRED”, “SHALL”, “SHALL NOT”, “SHOULD”, “SHOULD NOT”, “RECOMMENDED”, “MAY”, and “OPTIONAL” in the normative parts of this document are to be interpreted as described in RFC 2119.
- **2.1..** Since the monotonic clock can’t be adjusted to match the user’s notion of time, it should be used for measurement, rather than user-visible times.

## Navigation Timing

Source: https://www.w3.org/TR/navigation-timing/

This specification defines an interface for web applications to access timing information related to navigation and elements.

- **2 Conformance.** The key words "MUST", "MUST NOT", "REQUIRED", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in the normative parts of this document are to be interpreted as described in RFC 2119 .
- **2 Conformance.** Requirements phrased in the imperative as part of algorithms (such as "strip any leading space characters" or "return false and abort these steps") are to be interpreted with the meaning of the key word ("must", "should", "may", etc) used in introducing the algorithm.
- **2 Conformance.** (In particular, the algorithms defined in this specification are intended to be easy to follow, and not intended to be performant.) The IDL fragments in this specification must be interpreted as required for conforming IDL fragments, as described in the Web IDL specification.
- **navigationStart attribute.** This attribute must return the time immediately after the user agent finishes prompting to unload the previous document.
- **navigationStart attribute.** If there is no previous document, this attribute must return the same value as fetchStart .
- **unloadEventStart attribute.** If the previous document and the current document have the same origin [ IETF RFC 6454 ], this attribute must return the time immediately before the user agent starts the unload event of the previous document.
- **unloadEventStart attribute.** If there is no previous document or the previous document has a different origin than the current document, this attribute must return zero.
- **unloadEventEnd attribute.** If the previous document and the current document have the same same origin , this attribute must return the time immediately after the user agent finishes the unload event of the previous document.

## Navigation Timing Level 2

Source: https://www.w3.org/TR/navigation-timing-2/

This specification defines an interface for web applications to access the complete timing information for navigation of a document.

- **3.3..** In those cases, the type attribute SHOULD return appropriate value, such as reload if reloading the current page, or navigate if navigating to a new URL.
- **3.3.3. The PerformanceTimingConfidenceValue enum.** When determining the underlying confidence value , user agents MUST only base their decision on transient runtime conditions , such as user agent startup, temporarily high CPU usage, temporary memory pressure, or other short-lived considerations.
- **3.3.3. The PerformanceTimingConfidenceValue enum.** User agents MUST NOT base the underlying confidence value on permanent device or profile characteristics.
- **Document conventions.** The key words “MUST”, “MUST NOT”, “REQUIRED”, “SHALL”, “SHALL NOT”, “SHOULD”, “SHOULD NOT”, “RECOMMENDED”, “MAY”, and “OPTIONAL” in the normative parts of this document are to be interpreted as described in RFC 2119.
- **3.3..** These values should be set once, and not change for the lifetime of this .
- **3.3.2. The PerformanceTimingConfidence interface.** [ Exposed = Window ] interface PerformanceTimingConfidence { readonly attribute double randomizedTriggerRate ; readonly attribute PerformanceTimingConfidenceValue value ; object toJSON (); }; randomizedTriggerRate , of type double , readonly This attribute must return a real number the interval [0, 1), indicating how often noise is applied when exposing the confidence value .
- **3.3.2. The PerformanceTimingConfidence interface.** value , of type PerformanceTimingConfidenceValue , readonly This attribute must return a PerformanceTimingConfidenceValue .
- **8. Obsolete.** Authors should not use the following interfaces and are strongly advised to use the new PerformanceNavigationTiming interface—see summary of changes and improvements .

## Resource Timing

Source: https://www.w3.org/TR/resource-timing/

This specification defines an interface for web applications to access the complete timing information for resources in a document.

- **Document conventions.** The key words “MUST”, “MUST NOT”, “REQUIRED”, “SHALL”, “SHALL NOT”, “SHOULD”, “SHOULD NOT”, “RECOMMENDED”, “MAY”, and “OPTIONAL” in the normative parts of this document are to be interpreted as described in RFC 2119.
- **3.4..** Each ECMAScript global environment has: A resource timing buffer size limit which should initially be 250 or greater.
- **Conformant Algorithms.** Requirements phrased in the imperative as part of algorithms (such as "strip any leading space characters" or "return false and abort these steps") are to be interpreted with the meaning of the key word ("must", "should", "may", etc) used in introducing the algorithm.

## User Timing Level 2

Source: https://www.w3.org/TR/user-timing-2/

This specification defines an interface to help web developers measure the performance of their applications by giving them access to high precision timestamps.

- **2. Conformance.** The key words MAY and MUST are to be interpreted as described in [ RFC2119 ].
- **2. Conformance.** The IDL fragments in this specification MUST be interpreted as required for conforming IDL fragments, as described in the Web IDL specification.
- **3.1.1 mark() method.** It MUST run these steps: If the global object is a Window object and markName uses the same name as a read only attribute in the PerformanceTiming interface, throw a SyntaxError .
- **3.1.2 clearMarks() method.** It MUST run these steps: If markName is omitted, remove all PerformanceMark objects from the performance entry buffer .
- **3.1.3 measure() method.** It MUST run these steps: Let end time be 0 .
- **3.1.4 clearMeasures() method.** It MUST run these steps: If measureName is omitted, remove all PerformanceMeasure objects in the performance entry buffer .
- **3.2 The PerformanceMark Interface.** [ Exposed =(Window,Worker) ] interface PerformanceMark : PerformanceEntry { }; The PerformanceMark interface extends the following attributes of the PerformanceEntry interface: The name attribute must return the mark's name.
- **3.2 The PerformanceMark Interface.** The entryType attribute must return the DOMString "mark" .

## User Timing

Source: https://www.w3.org/TR/user-timing/

This specification defines an interface to help web developers measure the performance of their applications by giving them access to high precision timestamps.

- **2. Conformance.** The key words MAY and MUST in this document are to be interpreted as described in BCP 14 [ RFC2119 ] [ RFC8174 ] when, and only when, they appear in all capitals, as shown here.
- **2. Conformance.** The IDL fragments in this specification MUST be interpreted as required for conforming IDL fragments, as described in the Web IDL specification.
- **3.1.1 mark() method.** It MUST run these steps: Run the PerformanceMark constructor and let entry be the newly created object.
- **3.1.2 clearMarks() method.** It MUST run these steps: If markName is omitted, remove all PerformanceMark objects from the performance entry buffer .
- **3.1.3 measure() method.** It MUST run these steps: If startOrMeasureOptions is a PerformanceMeasureOptions object and at least one of start , end , duration , and detail exist , run the following checks: If endMark is given, throw a TypeError .
- **3.1.4 clearMeasures() method.** It MUST run these steps: If measureName is omitted, remove all PerformanceMeasure objects in the performance entry buffer .
- **3.2 The PerformanceMark Interface.** WebIDL [ Exposed =(Window,Worker) ] interface PerformanceMark : PerformanceEntry { constructor ( DOMString markName , optional PerformanceMarkOptions markOptions = {}); readonly attribute any detail ; }; The PerformanceMark interface extends the following attributes of the PerformanceEntry interface: The name attribute must return the mark's name.
- **3.2 The PerformanceMark Interface.** The entryType attribute must return the DOMString "mark" .

## Server Timing

Source: https://www.w3.org/TR/server-timing/

This specification enables a server to communicate performance metrics about the request-response cycle to the user agent. It also standardizes a JavaScript interface to enable applications to collect, process, and act on these metrics to optimize application delivery.

- **2. The Server-Timing Header Field.** A response MAY have multiple server-timing-metric entries with the same metric-name, and the user agent MUST process and expose all such entries.
- **2. The Server-Timing Header Field.** A user agent that does not recognize particular server-timing-param-name in the Server-Timing header field of a response MUST ignore those tokens and continue processing instead of signaling an error.
- **2. The Server-Timing Header Field.** To avoid any possible ambiguity, individual server-timing-param-name s SHOULD NOT appear multiple times within a server-timing-metric .
- **2. The Server-Timing Header Field.** All subsequent occurrences MUST be ignored without signaling an error or otherwise altering the processing of the server-timing-metric .
- **2. The Server-Timing Header Field.** User agents MUST ignore extraneous characters found after a server-timing-param-value but before the next server-timing-param and before the end of the current server-timing-metric .
- **2. The Server-Timing Header Field.** User agents MUST ignore extraneous characters found after a metric-name but before the first server-timing-param and before the next server-timing-metric .
- **Document conventions.** The key words “MUST”, “MUST NOT”, “REQUIRED”, “SHALL”, “SHALL NOT”, “SHOULD”, “SHOULD NOT”, “RECOMMENDED”, “MAY”, and “OPTIONAL” in the normative parts of this document are to be interpreted as described in RFC 2119.
- **2. The Server-Timing Header Field.** To minimize the HTTP overhead the provided names and descriptions should be kept as short as possible - e.g.

## Paint Timing Level 1

Source: https://www.w3.org/TR/paint-timing/

This document defines an API that can be used to capture a series of key moments (first paint, first contentful paint) during pageload which developers care about.

- **Document conventions.** The key words “MUST”, “MUST NOT”, “REQUIRED”, “SHALL”, “SHALL NOT”, “SHOULD”, “SHOULD NOT”, “RECOMMENDED”, “MAY”, and “OPTIONAL” in the normative parts of this document are to be interpreted as described in RFC 2119.
- **2. Terminology.** NOTE: The rendering pipeline is very complex, and the timestamp should be the latest timestamp the user agent is able to note in this pipeline (best effort).
- **4. The PerformancePaintTiming interface.** [ Exposed = Window ] interface PerformancePaintTiming : PerformanceEntry { [ Default ] object toJSON (); }; PerformancePaintTiming includes PaintTimingMixin ; PerformancePaintTiming extends the following attributes of PerformanceEntry interface: The name attribute’s getter must return a DOMString for minimal frame attribution.
- **4. The PerformancePaintTiming interface.** Possible values of name are: "first-paint" : for first paint "first-contentful-paint" : for first contentful paint The entryType attribute’s getter must return "paint" .
- **4. The PerformancePaintTiming interface.** The startTime attribute’s getter must return a DOMHighResTimeStamp of when the paint occurred.
- **4. The PerformancePaintTiming interface.** The duration attribute’s getter must return 0.
- **5.2.2. Modifications to the HTML specification.** When the user agent paints a Text node text for the first time, it should execute the following steps: If text will not be painted due to the font face being in its font block period , then return.
- **5.3.1. First Contentful Paint.** To know whether Document document should report first contentful paint , perform the following steps: If document ’s set of previously reported paints contains "first-contentful-paint" , then return false.

## Largest Contentful Paint

Source: https://www.w3.org/TR/largest-contentful-paint/

This document defines an API that enables monitoring the largest paint an element triggered on screen.

- **Document conventions.** The key words “MUST”, “MUST NOT”, “REQUIRED”, “SHALL”, “SHALL NOT”, “SHOULD”, “SHOULD NOT”, “RECOMMENDED”, “MAY”, and “OPTIONAL” in the normative parts of this document are to be interpreted as described in RFC 2119.
- **3.1. LargestContentfulPaint interface.** The entryType attribute’s getter must return the DOMString "largest-contentful-paint" .
- **3.1. LargestContentfulPaint interface.** The name attribute’s getter must return the empty string.
- **3.1. LargestContentfulPaint interface.** The startTime attribute’s getter must return the value of this ’s renderTime .
- **3.1. LargestContentfulPaint interface.** The duration attribute’s getter must return 0.
- **3.1. LargestContentfulPaint interface.** The renderTime attribute must return the default paint timestamp given this ’s paint timing info .
- **3.1. LargestContentfulPaint interface.** The loadTime attribute must return the value of this ’s loadTime .
- **3.1. LargestContentfulPaint interface.** The size attribute must return the value of this ’s size .

## Event Timing API

Source: https://www.w3.org/TR/event-timing/

This document defines an API that provides web page authors with insights into the latency of certain events triggered by user interactions.

- **Document conventions.** The key words “MUST”, “MUST NOT”, “REQUIRED”, “SHALL”, “SHALL NOT”, “SHOULD”, “SHOULD NOT”, “RECOMMENDED”, “MAY”, and “OPTIONAL” in the normative parts of this document are to be interpreted as described in RFC 2119.
- **1.4. Events exposed.** Given an event , to determine if it should be considered for Event Timing , run the following steps: If event ’s isTrusted attribute value is set to false, return false.
- **2.1. PerformanceEventTiming interface.** The target attribute’s getter must perform the following steps: If this ’s eventTarget is not exposed for paint timing given null, return null.
- **3.2. Modifications to the HTML specification.** Upon construction of a Performance object whose relevant global object is a Window , its eventCounts must be initialized to a map containing 0s for all event types that the user agent supports from the list described in § 1.4 Events exposed .
- **3.4. Should add PerformanceEventTiming.** Given a PerformanceEventTiming entry and a PerformanceObserverInit options , to determine if we should add PerformanceEventTiming , with entry and optionally options as inputs, run the following steps: If entry ’s entryType attribute value equals to " first - input ", return true.
- **3.5. Increasing interaction count.** A user agent must not use a shared global user interaction value s for all Windows , because this could introduce cross-origin leaks.
- **3.7. Initialize event timing.** When asked to initialize event timing , with event , processingStart , and interactionId as inputs, run the following steps: If the algorithm to determine if event should be considered for Event Timing returns false, then return null.
- **Conformant Algorithms.** Requirements phrased in the imperative as part of algorithms (such as "strip any leading space characters" or "return false and abort these steps") are to be interpreted with the meaning of the key word ("must", "should", "may", etc) used in introducing the algorithm.

## Long Tasks API Level 1

Source: https://www.w3.org/TR/longtasks-1/

This document defines an API that web page authors can use to detect presence of "long tasks" that monopolize the UI thread for extended periods of time and block other critical tasks from being executed - e.g. reacting to user input.

- **Document conventions.** The key words “MUST”, “MUST NOT”, “REQUIRED”, “SHALL”, “SHALL NOT”, “SHOULD”, “SHOULD NOT”, “RECOMMENDED”, “MAY”, and “OPTIONAL” in the normative parts of this document are to be interpreted as described in RFC 2119.
- **1. Introduction.** The RAIL performance model suggests that applications should respond to user input in less than 100ms (for touch move and scrolling, the threshold is 16ms).
- **1. Introduction.** A website without these tasks should respond to user input in under 100ms: it will take less than 50ms to finish the task that is being executed when the user input is received and less than 50ms to execute the task to react to such user input.
- **2. Terminology.** Note: This term is outdated, and the new terms should be reused when revamping this.
- **3.3. Pointing to the culprit.** When delivering this information the Web’s same-origin policy must be adhered to.
- **4.1. Report long tasks.** Developers should look this up themselves.
- **5.1. What is Exposed to Observers?.** Observers in other different pages (tabs or windows) should not receive notifications, regardless of the architecture of the user agent.
- **Conformant Algorithms.** Requirements phrased in the imperative as part of algorithms (such as "strip any leading space characters" or "return false and abort these steps") are to be interpreted with the meaning of the key word ("must", "should", "may", etc) used in introducing the algorithm.

## Long Animation Frames API

Source: https://www.w3.org/TR/long-animation-frames/

This document defines an API that web page authors can use to detect presence of "long animation frames" that monopolize the UI thread for extended periods of time and block other critical tasks from being executed - e.g. reacting to user input.

- **Document conventions.** The key words “MUST”, “MUST NOT”, “REQUIRED”, “SHALL”, “SHALL NOT”, “SHOULD”, “SHOULD NOT”, “RECOMMENDED”, “MAY”, and “OPTIONAL” in the normative parts of this document are to be interpreted as described in RFC 2119.
- **1. Introduction.** The RAIL performance model suggests that applications should respond to user input in less than 100ms (for touch move and scrolling, the threshold is 16ms).
- **1. Introduction.** A website without these tasks should respond to user input in under 100ms: it will take less than 50ms to finish the task that is being executed when the user input is received and less than 50ms to execute the task to react to such user input.
- **3.1. Frame Timing Info.** Note: all the above are unsafe , and should be coarsened when exposed via an API.
- **5.1. What is Exposed to Observers?.** Observers in other different pages (tabs or windows) should not receive notifications, regardless of the architecture of the user agent.
- **Conformant Algorithms.** Requirements phrased in the imperative as part of algorithms (such as "strip any leading space characters" or "return false and abort these steps") are to be interpreted with the meaning of the key word ("must", "should", "may", etc) used in introducing the algorithm.

## Beacon

Source: https://www.w3.org/TR/beacon/

This specification defines an interface that web developers can use to schedule asynchronous and non-blocking delivery of data that minimizes resource contention with other time-critical operations, while ensuring that such requests are still processed and delivered to destination.

- **2. Conformance.** The key words MAY , MUST , SHOULD , and SHOULD NOT in this document are to be interpreted as described in BCP 14 [ RFC2119 ] [ RFC8174 ] when, and only when, they appear in all capitals, as shown here.
- **3.1 sendBeacon() Method.** data = null); }; The sendBeacon() method transmits data provided by the data parameter to the URL provided by the url parameter: The user agent MUST initiate a fetch with keepalive flag set, which restricts the amount of data that can be queued by such requests to ensure that beacon requests are able to complete quickly and in a timely manner.
- **3.1 sendBeacon() Method.** The user agent MUST schedule immediate transmission of all beacon requests when the document visibilityState transitions to hidden , and must allow all such requests to run to completion without blocking other time-critical and high-priority work.
- **3.1 sendBeacon() Method.** The user agent SHOULD schedule transmission of provided data to minimize resource (CPU and network) contention with other time-critical and high priority work.
- **3.1 sendBeacon() Method.** However, the user agent SHOULD NOT delay transmission indefinitely and ensure that pending transmissions are periodically flushed even if there is no other network activity.
- **1. Introduction.** result in 204, or 200 HTTP response codes with an empty response body), and should not compete for network and compute resources with other high priority operations such as fetching critical resources, reacting to input, running animations, and so on.
- **1. Introduction.** Developers should avoid relying on unload event because it will not fire whenever a page is in a background state (i.e.
- **1. Introduction.** Applications that require non-default settings for such requests should use the [ FETCH ] API with keepalive set to true .

## requestIdleCallback()

Source: https://www.w3.org/TR/requestidlecallback/

This document defines an API that web page authors can use to cooperatively schedule background tasks such that they do not introduce delays to other high priority tasks that share the same event loop, such as input processing, animations and frame compositing. The user agent is in a better position to determine when background tasks can be run without introducing user-perceptible delays or jank in animations and input response, based on its knowledge of currently scheduled tasks, vsync deadlines, user-interaction and so on. Using this API should therefore result in more appropriate scheduling of background tasks during times when the browser would otherwise be idle.

- **3. Conformance.** The key words MUST , REQUIRED , SHALL , and SHOULD in this document are to be interpreted as described in BCP 14 [ RFC2119 ] [ RFC8174 ] when, and only when, they appear in all capitals, as shown here.
- **3. Conformance.** The IDL fragments in this specification MUST be interpreted as required for conforming IDL fragments.
- **3. Conformance.** This specification defines a single conformance class: conforming user agent A user agent is considered to be a conforming user agent if it satisfies all of the MUST -, REQUIRED - and SHALL -level criteria in this specification.
- **4. Window interface extensions.** The list MUST be initially empty and each entry in this list is identified by a number, which MUST be unique within the list for the lifetime of the Window object.
- **4. Window interface extensions.** The list MUST be initially empty and each entry in this list is identified by a number, which MUST be unique within the list of the lifetime of the Window object.
- **4. Window interface extensions.** An idle callback identifier , which is a number which MUST initially be zero.
- **4.1 The requestIdleCallback() method.** When requestIdleCallback ( callback , options ) is invoked with a given IdleRequestCallback and optional IdleRequestOptions , the user agent MUST run the following steps: Let window be this Window object.
- **4.2 The cancelIdleCallback() method.** When cancelIdleCallback ( handle ) is invoked, the user agent MUST run the following steps: Let window be this Window object.

## Core Web Vitals

Source: https://web.dev/articles/vitals

Optimizing for quality of user experience is key to the long-term success of any site on the web. Whether you're a business owner, marketer, or developer, Web Vitals can help you quantify the experience of your site and identify opportunities to improve.

- **Core Web Vitals.** Core Web Vitals are the subset of Web Vitals that apply to all web pages, should be measured by all site owners, and will be surfaced across all Google tools.
- **Core Web Vitals.** To provide a good user experience, LCP should occur within 2.5 seconds of when the page first starts loading.
- **Core Web Vitals.** To provide a good user experience, pages should have a INP of 200 milliseconds or less.
- **Core Web Vitals.** To provide a good user experience, pages should maintain a CLS of 0.1.
- **Core Web Vitals.** Tools that assess Core Web Vitals compliance should consider a page passing if it meets the recommended targets at the 75th percentile for all three of the Core Web Vitals metrics.
- **Lifecycle.** Each phase is designed to signal to developers how they should think about each metric: Experimental metrics are prospective Core Web Vitals that may still be undergoing significant changes depending on testing and community feedback.
- **Measure Core Web Vitals in JavaScript.** While some analytics providers have built-in support for Core Web Vitals metrics, even those that don't should include basic custom metric features that allow you to measure Core Web Vitals in their tool.
- **Changes to Web Vitals.** Web Vitals and Core Web Vitals represent the best available signals developers have today to measure quality of experience across the web, but these signals are not perfect and future improvements or additions should be expected.
