# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## Web Neural Network API

Source: https://www.w3.org/TR/webnn/

This document describes a dedicated low-level API for neural network inference hardware acceleration.

- **8.3.8. exportToGPU().** The user agent MUST ensure that no operation enqueued to gpuDevice ’s GPUQueue which reads from or writes to buffer executes before the steps enqueued above to ensure the contents of buffer reflect tensor .
- **8.3.8. exportToGPU().** When the GPUBuffer returned by exportToGPU() is destroyed, the user agent MUST return an exported MLTensor given the MLTensor it was exported from.
- **8.6. MLOperand interface.** Implementations MAY support fewer data types for operands than specified, but MUST support at least the specified required data types .
- **8.6. MLOperand interface.** Implementations MAY impose a more restricted lower bound and/or upper bound on the rank of operands than specified, but MUST support at least the specified required ranks .
- **8.8.1. Creating an MLTensor.** The user agent MUST ensure that the enqueued steps above to ensure tensor .
- **Document conventions.** The key words “MUST”, “MUST NOT”, “REQUIRED”, “SHALL”, “SHALL NOT”, “SHOULD”, “SHOULD NOT”, “RECOMMENDED”, “MAY”, and “OPTIONAL” in the normative parts of this document are to be interpreted as described in RFC 2119.
- **2.1. Application Use Cases.** Developers who are planning to use the API for such use cases should ensure that the API is being used to benefit users, for purposes that users understand, and approve.
- **2.1. Application Use Cases.** They should apply the Ethical Principles for Web Machine Learning [webmachinelearning-ethics] and implement appropriate privacy risk mitigations such as transparency, data minimisation, and users controls.
