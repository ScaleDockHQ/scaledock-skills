# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## Streams Living Standard

Source: https://streams.spec.whatwg.org/review-drafts/2026-08/

This specification provides APIs for creating, composing, and consuming streams of data that map efficiently to low-level I/O primitives.

- **Streams.** Developers should refer to the Living Standard for the most current error corrections and other developments.
- **2.2. Writable streams.** This indicates that the producer believes something has gone wrong, and that future writes should be discontinued.
- **2.4. Pipe chains and backpressure.** Once a pipe chain is constructed, it will propagate signals regarding how fast chunks should flow through it.
- **2.5. Internal queues and queuing strategies.** A queuing strategy is an object that determines how a stream should signal backpressure based on the state of its internal queue .
- **3. Conventions.** In this specification, all numbers are represented as double-precision 64-bit IEEE 754 floating point values (like the JavaScript Number type or Web IDL unrestricted double type), and all arithmetic operations performed on them must be done in the standard way for such values.
- **4.7.2. Internal slots.** buffer An ArrayBuffer buffer byte length A positive integer representing the initial byte length of buffer byte offset A nonnegative integer byte offset into the buffer where the underlying byte source will start writing byte length A positive integer number of bytes which can be written into the buffer bytes filled A nonnegative integer number of bytes that have been written into the buffer so…
- **4.9.1. Working with readable streams.** The following constraints apply regardless of the exact algorithm used: Public API must not be used: while reading or writing, or performing any of the operations below, the JavaScript-modifiable reader, writer, and stream APIs (i.e.
- **4.9.1. Working with readable streams.** methods on the appropriate prototypes) must not be used.
