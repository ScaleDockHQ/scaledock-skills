# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative prose and algorithm steps from the published text, quoted as written (only line breaks were joined), labelled by clause. Apply the ones that match the role. Each is labelled with the section it comes from in the published document.

## ECMA-426: Source map format specification

Source: https://tc39.es/ecma426/

- **§ 2.** A conforming source map generator should generate documents which are conforming source map documents, and can be decoded by the algorithms in this specification without reporting any errors (even those which are specified as optional).
- **§ 2.** A conforming consumer is permitted to ignore errors or report them without terminating where the specification indicates that an algorithm may optionally report an error.
- **§ 6.** This means that values exceeding 32-bits are invalid and implementations may reject them.
- **§ 9.** The version field shall always be the number 3 as an integer.
- **§ 9.** The sources field is a list of original sources used by the mappings field. Each entry is either a string that is a (potentially relative) URL or null if the source name is not known.
- **§ 9.** The contents are listed in the same order as in the sources field.
- **§ 9.1.2.** If mappingsField is not a String, throw an error.
- **§ 9.1.2.** If JSONObjectGet(json, "sources") is not a JSON array, throw an error.
- **§ 9.2.** each segment is made up of 1, 4, or 5 variable length fields.
- **§ 9.2.** Note that this is different from the subsequent fields below because the previous value is reset after every generated line.
- **§ 9.2.1.** The mappings String must adhere to the following grammar:
- **§ 9.3.** If the sources are not absolute URLs after prepending the sourceRoot, the sources are resolved relative to the source map (like resolving the script src attribute in an HTML document).
- **§ 9.3.1.** Set sourceUrlPrefix to the string-concatenation of sourceRoot and "/".
- **§ 9.4.** Source map consumers shall ignore any additional unrecognized properties, rather than causing the source map to be rejected, so that additional features can be added to this format without breaking existing users.
- **§ 10.** An embedded map does not inherit any values from the containing index map.
- **§ 10.** The sections shall be sorted by starting position and the represented sections shall not overlap.
- **§ 11.1.** Source maps are linked through URLs as defined in WHATWG URL; in particular, characters outside the set permitted to appear in URIs shall be percent-encoded and it may be a data URI.
- **§ 11.1.** The HTTP sourcemap header has precedence over a source annotation, and if both are present, the header URL should be used to resolve the source map file.
- **§ 11.1.1.** Previous revisions of this document recommended a header name of x-sourcemap. This is now deprecated; sourcemap is now expected.
- **§ 11.1.2.** If a tool consumes one or more source files that unambiguously links to a source map and it produces an output file that links to a source map, it shall do so unambiguously.
- **§ 11.1.2.1.1.** Source map generators shall only emit //#, while source map consumers shall accept both //@ and //#.
- **§ 11.1.2.3.** It is invalid for tools that generate WebAssembly code to generate two or more custom sections with the sourceMappingURL name.
- **§ 11.2.1.** If url's scheme is an HTTP(S) scheme and the byte sequence `)]}'` is a byte-sequence-prefix of bodyBytes, then
