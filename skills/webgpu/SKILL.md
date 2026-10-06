---
name: webgpu
description: >-
  WebGPU: WebGPU exposes an API for performing operations, such as rendering and computation, on a Graphics Processing Unit. Covers WebGPU (build), WebGPU Shading Language (build). Use when rendering or computing with WebGPU or WGSL. Triggers: WebGPU, GPUDevice, WGSL.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.0"
  kind: standard
---

# WebGPU

WebGPU exposes an API for performing operations, such as rendering and computation, on a Graphics Processing Unit.

The publisher of the pinned text is named in [Sources](#sources). With this skill the agent applies that text: when rendering or computing with WebGPU or WGSL.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources). Quoted requirements are sentences taken from the pinned text. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: producer or consumer of this specification.
- Target version: WebGPU (default, posture build); WebGPU Shading Language (default, posture build). See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill, re-read every URL in [Sources](#sources) and check the publisher index for a newer revision or version line.

## Invariants

1. **Document conventions.** "The key words “MUST”, “MUST NOT”, “REQUIRED”, “SHALL”, “SHALL NOT”, “SHOULD”, “SHOULD NOT”, “RECOMMENDED”, “MAY”, and “OPTIONAL” in the normative parts of this document are to be interpreted as described in RFC 2119."
2. **2.1.3. Uninitialized data.** "As a result, all implementations should issue a developer console warning about this potential performance penalty, even if there is no penalty in that implementation."
3. **2.1.13. Abuse of capabilities.** "If a user agent implements such a warning, it should include WebGPU usage in its heuristics, in addition to JavaScript, WebAssembly, WebGL, and so on."
4. **2.2. Privacy Considerations.** "GPU APIs are complex and must expose various aspects of a device’s capabilities out of necessity in order to enable developers to take advantage of those capabilities effectively."
5. **2.2. Privacy Considerations.** "A user agent must not reveal more than 32 distinguishable configurations or buckets."
6. **2.2.2. Machine-specific artifacts.** "Privacy-critical applications and user agents should utilize software implementations to eliminate such artifacts."
7. **2.2.4. User Agent State.** "This can leak information across origins (like "did the user access a site with this specific shader") so user agents should follow the best practices in storage partitioning ."
8. **2.2.6. Adapter Identifiers.** "When adapter identifiers are exposed by default they should be as broad as possible while still being useful."

## Workflow

1. **Pick the version.** Use the current line unless a named consumer needs a supported one. Do not author a legacy line. Emit a preview only when its posture is build and the user asked for that draft.
   -> [`references/versions.md`](references/versions.md)
   ✓ The target version is recorded, and it is not a legacy line.
2. **Apply the pinned requirements.** Walk the quotes in [`references/requirements.md`](references/requirements.md) and implement each one that applies to the role.
   -> [`references/requirements.md`](references/requirements.md)
   ✓ Each applicable quote is either implemented or recorded as out of scope for the role, with the heading it came from.
3. **Upgrade** (only when asked). Follow the upgrade section from the source line to the target.
   -> [`references/versions.md`](references/versions.md)
   ✓ The result cites the target line and no longer depends on a requirement that only the old line stated.

## Verify before done

- [ ] The artifact cites the target line's revision from [Sources](#sources).
- [ ] Every applicable quoted requirement in [`references/requirements.md`](references/requirements.md) holds.
- [ ] Nothing from a preview line is emitted unless its posture is build and the user opted in.

## Reference index

- **`references/versions.md`**: every version line, which one to use, and how to upgrade. Load for steps 1 and 3.
- **`references/requirements.md`**: quotes taken from the pinned specification. Load for step 2.

## Related skills

Install related spec skills by name with `npx skills add ScaleDockHQ/scaledock-skills --skill <name>`.

## Sources

Status uses the publishing body's own maturity term. Checked is the date the source was last read.

- [WebGPU](https://www.w3.org/TR/webgpu/): Candidate Recommendation Draft, webgpu CRD-webgpu-20260915 (Candidate Recommendation Draft, 2026-09-15), checked 2026-10-06.
- [WebGPU Shading Language](https://www.w3.org/TR/WGSL/): Candidate Recommendation Draft, WGSL CRD-WGSL-20260921 (Candidate Recommendation Draft, 2026-09-21), checked 2026-10-06.
