# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## Score specification

Source: https://docs.score.dev/docs/score-specification/score-spec-reference/

The Score Specification is a YAML file that contains the following top-level reference definitions.

- **Container definition.** to indicate that the image must be supplied at deploy time.
- **Container definition.** Either content , binaryContent or source must be specified.
- **Container definition.** readOnly : indicates if the volume should be mounted in a read-only mode.
- **Container definition.** Both httpGet and exec are supported and implementations should support one or both options.
- **Service definition.** The port specification must include the public port and should include the container targetPort .
- **Resources.** This should be a type supported by the Score implementations being used.
- **Supporting secret or sensitive resource outputs.** For example, a database password should be kept as a secret where possible.
- **Supporting secret or sensitive resource outputs.** The Score specification itself does not provide any explicit support for indicating whether something is secret or how that should be handled by the runtime since each platform has different support and interpolation options.
