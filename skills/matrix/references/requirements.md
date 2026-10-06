# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## Matrix 1.14

Source: https://spec.matrix.org/v1.14/

The key words &ldquo;MUST&rdquo;, &ldquo;MUST NOT&rdquo;, &ldquo;REQUIRED&rdquo;, &ldquo;SHALL&rdquo;, &ldquo;SHALL NOT&rdquo;, &ldquo;SHOULD&rdquo;,

- **Requirement levels.** The key words &ldquo;MUST&rdquo;, &ldquo;MUST NOT&rdquo;, &ldquo;REQUIRED&rdquo;, &ldquo;SHALL&rdquo;, &ldquo;SHALL NOT&rdquo;, &ldquo;SHOULD&rdquo;, &ldquo;SHOULD NOT&rdquo;, &ldquo;RECOMMENDED&rdquo;, &ldquo;MAY&rdquo;, and &ldquo;OPTIONAL&rdquo; across all parts of the specification are to be interpreted as described in RFC 2119 .
- **Events.** type values MUST be uniquely globally namespaced following Java&rsquo;s package naming conventions , e.g.
- **Room Aliases.** For this reason, Clients SHOULD resolve the room alias to a room ID once and then use that ID on subsequent requests.
- **Namespacing.** Custom or non-specified namespaces used in the wild MUST use the Java package naming convention to prevent conflicts.
- **Introduction to the Matrix APIs.** Fully open: Fully open federation - anyone should be able to participate in the global Matrix network Fully open standard - publicly documented standard with no IP or patent licensing encumbrances Empowering the end-user The user should be able to choose the server and clients they use The user should be able to control how private their communication is The user should know precisely where their…
- **Events.** This means that any application using Matrix must validate that the event body is of the expected shape/schema before using the contents verbatim.
- **Event Graphs.** The root event should have a depth of 1.
- **Event Graphs.** Thus if one event is before another, then it must have a strictly smaller depth.
