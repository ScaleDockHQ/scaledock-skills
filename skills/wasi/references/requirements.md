# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are normative sentences from the published text, quoted as written (only line breaks and hyphenation from PDF layout were joined). Apply the ones that match the role. Each is labelled with the nearest section, clause or article in the published document.

## WASI 0.2.12

Source: https://raw.githubusercontent.com/WebAssembly/WASI/90105ffc2a4eed594909f9df2f473596500b49d2/specifications/wasi-0.2.12/Overview.md

- **WASI 0.2.12 § WASI Specification v0.2.12.** This is version 0.2.12 of the WASI specification, based on the [WebAssembly Component Model][cm].
- **WASI 0.2.12 § Proposals.** The [WebAssembly Interface Type (WIT)][wit] definitions for the proposals included in this version of the specification are pushed to OCI based on the [Wasm OCI Artifact layout][wasm-oci]:

## WASI 0.3.1

Source: https://raw.githubusercontent.com/WebAssembly/WASI/90105ffc2a4eed594909f9df2f473596500b49d2/specifications/wasi-0.3.1/Overview.md

- **WASI 0.3.1 § Component Model features.** Implementing this version of the specification requires the default (ungated) [Component Model][cm] features, plus the [gated features][gates] adopted by the WASI Subgroup up to and including this version:
- **WASI 0.3.1 § Component Model features.** These are required whether or not an API in this version uses them.

## Component Model explainer

Source: https://raw.githubusercontent.com/WebAssembly/component-model/a25fc0b372dd21f07f0242c46e98bd0f1ea0c0e1/design/mvp/Explainer.md

- **Explainer § Gated Features.** All other features are in various stages of implementation, are not enabled by default, may have breaking changes, and, after a suitable [WASI] SG vote, may be shipped as part of a future WASI Developer Preview release:
- **Explainer § Component Invariants.** Component validation rules only allow a component to import and export component-level functions, not Core WebAssembly functions.
- **Explainer § Import and Export Definitions.** The `label` production used inside `plainname` as well as the labels of `record` and `variant` types must be [kebab case].
- **Explainer § Definition types.** A destructor for a `resource (rep $T)` must have type `($T) -> ()`.
- **Explainer § Handle types.** The `typeidx` immediate of a handle type must refer to a `resource` type (described below) that statically classifies the particular kinds of resources the handle can point to.
- **Explainer § 🔀 `task.return`.** One of `task.return` or `task.cancel` must be called exactly once from any of a task's threads.
- **Explainer § 🔀 `backpressure.inc` and `backpressure.dec`.** As a composable convention, each piece of code that calls `backpressure.inc` must take responsibility for calling `backpressure.dec` exactly once when the source of backpressure subsides.
- **Explainer § 📝 Error Context type.** A consequence of this, however, is that components _must not_ depend on the contents of `error-context` values for behavioral correctness.

## The `wit` format

Source: https://raw.githubusercontent.com/WebAssembly/component-model/a25fc0b372dd21f07f0242c46e98bd0f1ea0c0e1/design/mvp/WIT.md

- **WIT § Package Names.** At least one of these files must specify a package name. Multiple files can specify the `package`, though they must all agree on what the package name is.
- **WIT § WIT Worlds.** Each name must be case-insensitively unique in the scope in which it is declared.
- **WIT § Interfaces, worlds, and `use`.** Interfaces linked with `use` must be acyclic.
- **WIT § WIT Functions.** Parameters to a function must all be named and have case-insensitively unique names:
- **WIT § WIT Types.** The `record`, `variant`, `enum`, and `flags` types must all have names associated with them.
- **WIT § Lexical structure.** Additionally, wit files must not contain any bidirectional override scalar values, control codes other than newline, carriage return, and horizontal tab, or codepoints that Unicode officially deprecates or strongly discourages.
- **WIT § Rules for feature gate usage.** As part of WIT validation, any item that refers to another gated item must also be compatibly gated.
- **WIT § Rules for feature gate usage.** If a package contains a feature gate, it's version must be specified (i.e. `namespace:package@x.y.z`)
- **WIT § Item: `variant` (one of a set of types).** All `variant` type must have at least one case specified.
