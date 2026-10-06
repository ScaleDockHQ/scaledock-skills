# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## WebGPU

Source: https://www.w3.org/TR/webgpu/

WebGPU exposes an API for performing operations, such as rendering and computation, on a Graphics Processing Unit.

- **Document conventions.** The key words “MUST”, “MUST NOT”, “REQUIRED”, “SHALL”, “SHALL NOT”, “SHOULD”, “SHOULD NOT”, “RECOMMENDED”, “MAY”, and “OPTIONAL” in the normative parts of this document are to be interpreted as described in RFC 2119.
- **2.1.3. Uninitialized data.** As a result, all implementations should issue a developer console warning about this potential performance penalty, even if there is no penalty in that implementation.
- **2.1.13. Abuse of capabilities.** If a user agent implements such a warning, it should include WebGPU usage in its heuristics, in addition to JavaScript, WebAssembly, WebGL, and so on.
- **2.2. Privacy Considerations.** GPU APIs are complex and must expose various aspects of a device’s capabilities out of necessity in order to enable developers to take advantage of those capabilities effectively.
- **2.2. Privacy Considerations.** A user agent must not reveal more than 32 distinguishable configurations or buckets.
- **2.2.2. Machine-specific artifacts.** Privacy-critical applications and user agents should utilize software implementations to eliminate such artifacts.
- **2.2.4. User Agent State.** This can leak information across origins (like "did the user access a site with this specific shader") so user agents should follow the best practices in storage partitioning .
- **2.2.6. Adapter Identifiers.** When adapter identifiers are exposed by default they should be as broad as possible while still being useful.

## WebGPU Shading Language

Source: https://www.w3.org/TR/WGSL/

Shading language for WebGPU.

- **Document conventions.** The key words “MUST”, “MUST NOT”, “REQUIRED”, “SHALL”, “SHALL NOT”, “SHOULD”, “SHOULD NOT”, “RECOMMENDED”, “MAY”, and “OPTIONAL” in the normative parts of this document are to be interpreted as described in RFC 2119.
- **2.1. Shader Lifecycle.** causality: the shader must start executing before it can finish executing.
- **2.2. Errors.** Statements in this specification that describe something the program must do generally produce a shader-creation error if those assertions are violated.
- **2.3.2. Filterable Triggering Rules.** Using an unrecognized triggering rule consisting of a single diagnostic name-token should trigger a warning from the user agent.
- **2.3.3. Diagnostic Filtering.** A @diagnostic attribute must not appear anywhere else.
- **2.4. Limits.** Note: A WGSL implementation should issue an error if it does not support a shader that goes beyond the specified limits.
- **3. Textual Structure.** WGSL module text consists of a sequence of Unicode code points , grouped into contiguous non-empty sets forming: comments tokens blankspaces The program text must not include a null code point ( U+0000 ).
- **3.2. Blankspace and Line Breaks.** That is, a line break is any of: line feed ( U+000A ) vertical tab ( U+000B ) form feed ( U+000C ) carriage return ( U+000D ) when not also followed by line feed ( U+000A ) carriage return ( U+000D ) followed by line feed ( U+000A ) next line ( U+0085 ) line separator ( U+2028 ) paragraph separator ( U+2029 ) Note: Diagnostics that report source text locations in terms of line numbers should use…
