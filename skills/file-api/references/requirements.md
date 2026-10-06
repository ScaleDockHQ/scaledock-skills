# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## File API

Source: https://www.w3.org/TR/FileAPI/

This specification provides an API for representing file objects in web applications, as well as programmatically selecting them and accessing their data. This includes: A FileList interface, which represents an array of individually selected files from the underlying system. The user interface for selection can be invoked via <input type="file"> , i.e. when the input element is in the File Upload state [HTML] . A Blob interface, which represents immutable raw binary data, and allows access to ranges of bytes within the Blob object as a separate Blob . A File interface, which includes readonly informational attributes about a file such as its name and the date of the last modification (on di

- **Document conventions.** The key words “MUST”, “MUST NOT”, “REQUIRED”, “SHALL”, “SHALL NOT”, “SHOULD”, “SHOULD NOT”, “RECOMMENDED”, “MAY”, and “OPTIONAL” in the normative parts of this document are to be interpreted as described in RFC 2119.
- **1. Introduction.** Web applications should have the ability to manipulate as wide as possible a range of user input, including files that a user may wish to upload to a remote server or manipulate inside a rich web application.
- **1. Introduction.** File or Blob reads should happen asynchronously on the main thread, with an optional synchronous API used within threaded web applications.
- **2. Terminology and Algorithms.** When this specification says to terminate an algorithm the user agent must terminate the algorithm after finishing the step it is on.
- **2. Terminology and Algorithms.** It must act as follows: Let originalSize be blob ’s size .
- **2. Terminology and Algorithms.** The start parameter, if non-null, is a value for the start point of a slice blob call, and must be treated as a byte-order position, with the zeroth position representing the first byte.
- **2. Terminology and Algorithms.** User agents must normalize start according to the following: If start is null, let relativeStart be 0.
- **2. Terminology and Algorithms.** User agents must normalize end according to the following: If end is null, let relativeEnd be originalSize .
