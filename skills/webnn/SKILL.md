---
name: webnn
description: >-
  Web Neural Network API (WebNN): This document describes a dedicated low-level API for neural network inference hardware acceleration. Covers Web Neural Network API (build). Use when running a neural network graph in the browser. Triggers: WebNN, MLContext, MLGraphBuilder.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.0"
  kind: standard
---

# Web Neural Network API (WebNN)

This document describes a dedicated low-level API for neural network inference hardware acceleration.

The publisher of the pinned text is named in [Sources](#sources). With this skill the agent applies that text: when running a neural network graph in the browser.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources). Quoted requirements are sentences taken from the pinned text. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: producer or consumer of this specification.
- Target version: Web Neural Network API (default, posture build). See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill, re-read every URL in [Sources](#sources) and check the publisher index for a newer revision or version line.

## Invariants

1. **8.3.8. exportToGPU().** "The user agent MUST ensure that no operation enqueued to gpuDevice ’s GPUQueue which reads from or writes to buffer executes before the steps enqueued above to ensure the contents of buffer reflect tensor ."
2. **8.3.8. exportToGPU().** "When the GPUBuffer returned by exportToGPU() is destroyed, the user agent MUST return an exported MLTensor given the MLTensor it was exported from."
3. **8.6. MLOperand interface.** "Implementations MAY support fewer data types for operands than specified, but MUST support at least the specified required data types ."
4. **8.6. MLOperand interface.** "Implementations MAY impose a more restricted lower bound and/or upper bound on the rank of operands than specified, but MUST support at least the specified required ranks ."
5. **8.8.1. Creating an MLTensor.** "The user agent MUST ensure that the enqueued steps above to ensure tensor ."
6. **Document conventions.** "The key words “MUST”, “MUST NOT”, “REQUIRED”, “SHALL”, “SHALL NOT”, “SHOULD”, “SHOULD NOT”, “RECOMMENDED”, “MAY”, and “OPTIONAL” in the normative parts of this document are to be interpreted as described in RFC 2119."
7. **2.1. Application Use Cases.** "Developers who are planning to use the API for such use cases should ensure that the API is being used to benefit users, for purposes that users understand, and approve."
8. **2.1. Application Use Cases.** "They should apply the Ethical Principles for Web Machine Learning [webmachinelearning-ethics] and implement appropriate privacy risk mitigations such as transparency, data minimisation, and users controls."

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

- [Web Neural Network API](https://www.w3.org/TR/webnn/): Candidate Recommendation Draft, webnn CRD-webnn-20260910 (Candidate Recommendation Draft, 2026-09-10), checked 2026-10-06.
