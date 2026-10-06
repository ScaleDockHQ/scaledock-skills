# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## WebAssembly Core Specification Level 1

Source: https://www.w3.org/TR/wasm-core-1/

This document describes version 1.0 of the core WebAssembly standard, a safe, portable, low-level code format designed for efficient execution and compact representation. Part of a collection of related documents: the Core WebAssembly Specification , the WebAssembly JS Interface , and the WebAssembly Web API .

- **Document conventions.** The key words “MUST”, “MUST NOT”, “REQUIRED”, “SHALL”, “SHALL NOT”, “SHOULD”, “SHOULD NOT”, “RECOMMENDED”, “MAY”, and “OPTIONAL” in the normative parts of this document are to be interpreted as described in RFC 2119.
- **2.4.5. Control Instructions.** As the grammar prescribes, they must be well-nested.
- **2.5.2. Types.** All function types used in a module must be defined in this component.
- **2.5.3. Functions.** The b o d y is an instruction sequence that upon termination must produce a stack matching the function type’s result type .
- **3.1.2. Prose Notation.** The formulation “Under context C ′ , … statement …” is adopted to express that the following statement must apply under the assumptions embodied in the extended context.
- **3.1.3. Formal Notation.** Moreover, the result type must match the block’s annotation [ t ?
- **3.2. Types.** However, restrictions apply to function types as well as the limits of table types and memory types , which must be checked during validation.
- **3.2.1. Limits.** Limits must have meaningful bounds that are within a given range.

## WebAssembly Core Specification Level 2.0

Source: https://www.w3.org/TR/wasm-core-2/

This document describes release 3.0 of the core WebAssembly standard, a safe, portable, low-level code format designed for efficient execution and compact representation. This is part of a collection of related documents: the Core WebAssembly Specification , the WebAssembly JS Interface , and the WebAssembly Web API .

- **Document conventions.** The key words “MUST”, “MUST NOT”, “REQUIRED”, “SHALL”, “SHALL NOT”, “SHOULD”, “SHOULD NOT”, “RECOMMENDED”, “MAY”, and “OPTIONAL” in the normative parts of this document are to be interpreted as described in RFC 2119.
- **2.1.1. Grammar Notation.** If the same meta variable or non-terminal symbol appears multiple times in a production, then all those occurrences must have the same instantiation.
- **2.4.1. Parametric Instructions.** If missing, the operands must be of numeric or vector type.
- **2.4.2. Control Instructions.** As the grammar prescribes, they must be well-nested.
- **2.4.2. Control Instructions.** The call_indirect instruction calls a function indirectly through an operand indexing into a table that is denoted by a table index and must contain function references .
- **2.5.2. Types.** All function , structure , or array types used in a module must be defined in this section.
- **2.5.3. Tags.** The tag section of a module defines a list of tags : ​ tag ​ ::= ​ tag tagtype ​ ​ The type index of a tag must refer to a function type that declares its tag type .
- **2.5.7. Functions.** Upon termination it must produce a stack matching the function type’s result type .

## WebAssembly JavaScript Interface Level 1

Source: https://www.w3.org/TR/wasm-js-api-1/

This document provides an explicit JavaScript API for interacting with WebAssembly. Part of a collection of related documents: the Core WebAssembly Specification , the WebAssembly JS Interface , and the WebAssembly Web API .

- **Document conventions.** The key words “MUST”, “MUST NOT”, “REQUIRED”, “SHALL”, “SHALL NOT”, “SHOULD”, “SHOULD NOT”, “RECOMMENDED”, “MAY”, and “OPTIONAL” in the normative parts of this document are to be interpreted as described in RFC 2119.
- **3.6. Exported Functions.** This exception should be a WebAssembly RuntimeError exception, unless otherwise indicated by the WebAssembly error mapping .
- **3.7. Error Objects.** WebAssembly errors have the following custom bindings: Unlike normal interface types, the interface prototype object for these exception classes must have as its [[Prototype]] the intrinsic object %ErrorPrototype% .
- **3.7. Error Objects.** If an implementation gives native Error objects special powers or nonstandard properties (such as a stack property), it should also expose those on these exception instances.
- **5. Implementation-defined Limits.** An implementation must reject a module that exceeds these limits with a CompileError .

## WebAssembly JavaScript Interface Level 2.0

Source: https://www.w3.org/TR/wasm-js-api-2/

This document provides an explicit JavaScript API for interacting with WebAssembly. This is part of a collection of related documents: the Core WebAssembly Specification , the WebAssembly JS Interface , and the WebAssembly Web API .

- **Document conventions.** The key words “MUST”, “MUST NOT”, “REQUIRED”, “SHALL”, “SHALL NOT”, “SHOULD”, “SHOULD NOT”, “RECOMMENDED”, “MAY”, and “OPTIONAL” in the normative parts of this document are to be interpreted as described in RFC 2119.
- **5.3. Memories.** ArrayBuffer objects returned by a Memory object must have a size that is a multiple of a WebAssembly page size (the constant 65536).
- **5.6. Exported Functions.** This exception should be a WebAssembly RuntimeError exception, unless otherwise indicated by the WebAssembly error mapping .
- **5.10. Error Objects.** When the namespace object for the WebAssembly namespace is created , the following steps must be run: Let namespaceObject be the namespace object .
- **6.1.2. cast.** When this builtin is invoked with parameter v , the following steps must be run: Return ?
- **6.1.3. test.** When this builtin is invoked with parameter v , the following steps must be run: If v is not a String , Return 0.
- **6.1.4. fromCharCodeArray.** When this builtin is invoked with parameters array , start , and end , the following steps must be run: If array is null, Throw a RuntimeError exception as if a trap was executed.
- **6.1.5. intoCharCodeArray.** When this builtin is invoked with parameters string , array , and start , the following steps must be run: If array is null, Throw a RuntimeError exception as if a trap was executed.

## WebAssembly Web API Level 1

Source: https://www.w3.org/TR/wasm-web-api-1/

This document describes the integration of WebAssembly with the broader web platform. Part of a collection of related documents: the Core WebAssembly Specification , the WebAssembly JS Interface , and the WebAssembly Web API .

- **Document conventions.** The key words “MUST”, “MUST NOT”, “REQUIRED”, “SHALL”, “SHALL NOT”, “SHOULD”, “SHOULD NOT”, “RECOMMENDED”, “MAY”, and “OPTIONAL” in the normative parts of this document are to be interpreted as described in RFC 2119.
- **2. Serialization.** Web user agents must augment the Module interface with the [ Serializable ] extended attribute.
- **2. Serialization.** Engines should attempt to share/reuse internal compiled code when performing a structured serialization, although in corner cases like CPU upgrade or browser update, this might not be possible and full recompilation may be necessary.
- **3. Developer-Facing Display Conventions.** When the response-based instantiation API is used in a browser, the associated URL should be used; or when the ArrayBuffer -based instantiation API is used, the browser should represent the location of the API call.
- **3. Developer-Facing Display Conventions.** If a WebAssembly module contains a name section , these names should be used to synthesize a function name as follows: If a function name subsection is present, the displayed name should be ${module_name}.${function_name} or ${function_name} , depending on whether the module name is present.
- **3. Developer-Facing Display Conventions.** Otherwise, ${module_name}.wasm-function[${funcIndex}] or wasm-function[${funcIndex}] should be used to convey the function index.

## WebAssembly Web API Level 2.0

Source: https://www.w3.org/TR/wasm-web-api-2/

This document describes the integration of WebAssembly with the broader web platform. This is part of a collection of related documents: the Core WebAssembly Specification , the WebAssembly JS Interface , and the WebAssembly Web API .

- **Document conventions.** The key words “MUST”, “MUST NOT”, “REQUIRED”, “SHALL”, “SHALL NOT”, “SHOULD”, “SHOULD NOT”, “RECOMMENDED”, “MAY”, and “OPTIONAL” in the normative parts of this document are to be interpreted as described in RFC 2119.
- **3. Serialization.** Web user agents must augment the Module interface with the [ Serializable ] extended attribute.
- **3. Serialization.** Engines should attempt to share/reuse internal compiled code when performing a structured serialization, although in corner cases like CPU upgrade or browser update, this might not be possible and full recompilation may be necessary.
- **4. Developer-Facing Display Conventions.** When the response-based instantiation API is used in a browser, the associated URL should be used; or when the ArrayBuffer -based instantiation API is used, the browser should represent the location of the API call.
- **4. Developer-Facing Display Conventions.** If a WebAssembly module contains a name section , these names should be used to synthesize a function name as follows: If a function name subsection is present, the displayed name should be ${module_name}.${function_name} or ${function_name} , depending on whether the module name is present.
- **4. Developer-Facing Display Conventions.** Otherwise, ${module_name}.wasm-function[${funcIndex}] or wasm-function[${funcIndex}] should be used to convey the function index.
- **5. Media-type Registration.** If such protection is needed it must be provided externally, e.g., through the use of HTTPS.
- **6. Security and Privacy Considerations.** WebAssembly code should be protected in transit from active and passive network attackers) and policy (e.g.
