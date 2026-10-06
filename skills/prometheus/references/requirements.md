# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## Prometheus exposition formats

Source: https://prometheus.io/docs/instrumenting/exposition_formats/

Exposition formats | Prometheus Join PromCon EU 2026 , the Prometheus users conference, on October 7–8, 2026 in Munich. PromCon EU 2026 — Oct 7–8, Munich. Prometheus

- **Exposition formats.** As of Prometheus version 2.0, all processes that expose metrics to Prometheus must use a text format, by default.
- **Details.** The last line must end with a line feed character.
- **Line format.** Within a line, tokens can be separated by any number of blanks and/or tabs (and must be separated by at least one if they would otherwise merge with the previous token).
- **Comments, help text, and type information.** The TYPE line for a metric name must appear before the first sample is reported for that metric name.
- **Comments, help text, and type information.** Metric names not corresponding to the legacy Prometheus metric name character set must be quoted and escaped.
- **Comments, help text, and type information.** escaped_string consists of any UTF-8 characters, but backslash, double-quote, and line feed must be escaped.
- **Comments, help text, and type information.** Metric and label names not corresponding to the usual Prometheus expression language restrictions must use the quoted syntaxes.
- **Grouping and sorting.** All lines for a given metric must be provided as one single group, with the optional HELP and TYPE lines first (in no particular order).

## Prometheus remote write 2.0

Source: https://prometheus.io/docs/specs/remote_write_spec_2_0/

Prometheus Remote-Write 2.0 specification [EXPERIMENTAL] | Prometheus Join PromCon EU 2026 , the Prometheus users conference, on October 7–8, 2026 in Munich. PromCon EU 2026 — Oct 7–8, Munich. Prometheus

- **Prometheus Remote-Write 2.0 specification [EXPERIMENTAL].** The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in RFC 2119 .
- **Protocol.** The Remote-Write Protocol MUST consist of RPCs with the request body serialized using a Google Protocol Buffers and then compressed.
- **Protocol.** The protobuf serialization MUST use either of the following Protobuf Messages: The prometheus.WriteRequest introduced in the Remote-Write 1.0 specification .
- **Protocol.** It SHOULD be used only for compatibility reasons.
- **Protocol.** Senders and Receivers SHOULD use this message when possible.
- **Protocol.** Senders and Receivers MUST support the io.prometheus.write.v2.Request .
- **Protocol.** Protobuf Message MUST use binary Wire Format.
- **Protocol.** Then, MUST be compressed with Google’s Snappy .
