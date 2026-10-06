# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## Web Audio API Level 1.0

Source: https://www.w3.org/TR/webaudio-1.0/

This specification describes a high-level Web API for processing and synthesizing audio in web applications. The primary paradigm is of an audio routing graph, where a number of AudioNode objects are connected together to define the overall audio rendering. The actual processing will primarily take place in the underlying implementation (typically optimized Assembly / C / C++ code), but direct script processing and synthesis is also supported. The Introduction section covers the motivation behind this specification. This API is designed to be used in conjunction with other APIs and elements on the web platform, notably: XMLHttpRequest [XHR] (using the responseType and response attributes). F

- **1.1.1. Attributes.** currentTime MUST be read atomically on the control thread before being returned.
- **1.1.2. Methods.** A NotSupportedError exception MUST be thrown if any of the arguments is negative, zero, or outside its nominal range.
- **1.1.2. Methods.** An implementation MUST support at least 32 channels.
- **1.1.2. Methods.** An implementation MUST support sample rates in at least the range 8000 to 96000.
- **1.1.2. Methods.** An IndexSizeError exception MUST be thrown if numberOfInputs is less than 1 or is greater than the number of supported channels.
- **1.1.2. Methods.** An IndexSizeError exception MUST be thrown if numberOfOutputs is less than 1 or is greater than the number of supported channels.
- **1.1.2. Methods.** If specified, this value MUST be greater than zero and less than three minutes or a NotSupportedError exception MUST be thrown.
- **1.1.2. Methods.** If all of the values are zero, an InvalidStateError MUST be thrown .

## Web Audio API 1.1

Source: https://www.w3.org/TR/webaudio-1.1/

This specification describes a high-level Web API for processing and synthesizing audio in web applications. The primary paradigm is of an audio routing graph, where a number of AudioNode objects are connected together to define the overall audio rendering. The actual processing will primarily take place in the underlying implementation (typically optimized Assembly / C / C++ code), but direct script processing and synthesis is also supported. The Introduction section covers the motivation behind this specification. This API is designed to be used in conjunction with other APIs and elements on the web platform, notably: XMLHttpRequest [XHR] (using the responseType and response attributes). F

- **1.1.1..** currentTime MUST be read atomically on the control thread before being returned.
- **1.1.2..** A NotSupportedError exception MUST be thrown if any of the arguments is negative, zero, or outside its nominal range.
- **1.1.2..** An implementation MUST support at least 32 channels.
- **1.1.2..** An IndexSizeError exception MUST be thrown if numberOfInputs is less than 1 or is greater than the number of supported channels.
- **1.1.2..** An IndexSizeError exception MUST be thrown if numberOfOutputs is less than 1 or is greater than the number of supported channels.
- **1.1.2..** If specified, this value MUST be greater than zero and less than three minutes or a NotSupportedError exception MUST be thrown.
- **1.1.2..** If all of the values are zero, an InvalidStateError MUST be thrown .
- **1.1.2..** A NotSupportedError MUST be thrown if the array length is 0 or greater than 20 .
