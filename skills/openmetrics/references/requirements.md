# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are normative sentences from the published text, quoted as written (only line breaks and hyphenation from PDF layout were joined). Apply the ones that match the role. Each is labelled with the nearest section, clause or article in the published document.

## OpenMetrics 1.0

Source: https://raw.githubusercontent.com/prometheus/OpenMetrics/42cbeb674d91064a1ca5cab72741d87159064550/specification/OpenMetrics.md

- **Overview.** Implementers MUST expose metrics in the OpenMetrics text format in response to a simple HTTP GET request to a documented URL for a given process or device.
- **Data Model § Values.** The non-real values NaN, +Inf and -Inf MUST be supported.
- **Data Model § Timestamps.** Timestamps MUST be Unix Epoch in seconds.
- **Data Model § Strings.** Strings MUST only consist of valid UTF-8 characters and MAY be zero length.
- **Data Model § Label.** Label names beginning with underscores are RESERVED and MUST NOT be used unless specified by this standard.
- **Data Model § Exemplars.** The combined length of the label names and values of an Exemplar's LabelSet MUST NOT exceed 128 UTF-8 character code points.
- **Data Model § MetricFamily.** Every Metric within a MetricFamily MUST have a unique LabelSet.
- **Data Model § Unit.** If non-empty, it MUST be a suffix of the MetricFamily name separated by an underscore.
- **Metric Types § Counter.** A Total is a non-NaN and MUST be monotonically non-decreasing over time, starting from 0.
- **Metric Types § Histogram.** Histogram MetricPoints MUST have one bucket with an +Inf threshold.
- **Metric Types § Histogram.** A Histogram's Metric's LabelSet MUST NOT have a "le" label name.
- **Metric Types § Summary.** Quantiles MUST be between 0 and 1 inclusive.
- **Data transmission & wire formats.** Partial or invalid expositions MUST be considered erroneous in their entirety.
- **Protocol Negotiation.** Producers MUST use the oldest version of the standard (i.e. 1.0.0) unless requested otherwise by the ingestor.
- **Text format § Overall Structure.** The content type MUST be: application/openmetrics-text; version=1.0.0; charset=utf-8
- **Text format § Overall Structure.** Line endings MUST be signalled with line feed (\n) and MUST NOT contain carriage returns (\r).
- **Text format § Overall Structure.** Expositions MUST end with EOF and SHOULD end with 'EOF\n'.
- **Text format § MetricFamily metadata.** There MUST NOT be more than one of each type of metadata line for a MetricFamily.
- **Text format § Counter.** The MetricPoint's Total Value Sample MetricName MUST have the suffix "_total".
- **Text format § Histogram.** Buckets MUST be sorted in number increasing order of "le", and the value of the "le" label MUST follow the rules for Canonical Numbers.
- **Design Considerations § Statelessness.** A core design choice is that exposers MUST NOT exclude a metric merely because it has had no recent changes, or observations.
- **Design Considerations § NaN.** NaN does not have any special meaning in OpenMetrics, and in particular MUST NOT be used as a marker for missing or otherwise bad data.
- **Design Considerations § Supporting Target Metadata in both Push-based and Pull-based Systems.** Exposers MUST NOT prefix MetricFamily names or otherwise vary MetricFamily names based on target metadata.
