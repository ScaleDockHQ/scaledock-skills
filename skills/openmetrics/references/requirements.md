# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## OpenMetrics

Source: https://raw.githubusercontent.com/OpenObservability/OpenMetrics/main/specification/OpenMetrics.md

target: https://github.com/protocolbuffers/protobuf/blob/2f6a7546e4539499bc08abc6900dc929782f5dcd/src/google/protobuf/timestamp.proto

- **document.** Implementers MUST expose metrics in the OpenMetrics text format in response to a simple HTTP GET request to a documented URL for a given process or device.
- **document.** This endpoint SHOULD be called "/metrics".
- **document.** # Data Model This section MUST be read together with the ABNF section.
- **document.** In case of disagreements between the two, the ABNF's restrictions MUST take precedence.
- **document.** This reduces repetition as the text wire format MUST be supported.
- **document.** ## Data Types ### Values Metric values in OpenMetrics MUST be either floating points or integers.
- **document.** The non-real values NaN, +Inf and -Inf MUST be supported.
- **document.** NaN MUST NOT be considered a missing value, but it MAY be used to signal a division by zero.
