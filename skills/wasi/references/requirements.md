# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## WASI 0.2.12

Source: https://raw.githubusercontent.com/WebAssembly/WASI/main/specifications/wasi-0.2.12/Overview.md

The [WebAssembly Interface Type (WIT)][wit] definitions for the proposals included in this

- **abstract.** The [WebAssembly Interface Type (WIT)][wit] definitions for the proposals included in this

## WASI 0.3.1

Source: https://raw.githubusercontent.com/WebAssembly/WASI/main/specifications/wasi-0.3.1/Overview.md

The [WebAssembly Interface Type (WIT)][wit] definitions for the proposals included in this

- **abstract.** The [WebAssembly Interface Type (WIT)][wit] definitions for the proposals included in this

## WebAssembly Component Model

Source: https://raw.githubusercontent.com/WebAssembly/component-model/main/design/mvp/Explainer.md

Developer Preview release, as recorded in the [top-level readme](../../README.md),

- **document.** In the case of `export` aliases, validation requires ` ` to select an instance in the instance index space and `name` must match an export in the type of that instance.
- **document.** | (Xᵢ +) (for Xᵢ ∈ ) ``` Each ` ` projects an export of an instance: the first ` ` projects from ` ` (which must select an instance) and each subsequent ` ` projects from the (instance) result of the preceding alias.
- **document.** To ensure that nested components can be arbitrarily "unbundled" (transforming inline definitions into `import`s of out-of-line definitions), `outer` aliases that cross component boundaries must only refer to definitions that can be substituted inline, if needed.
- **document.** Unlike [`core:valtype`] which is low-level and assumes a shared linear memory for communicating compound values, component-level value types assume no shared memory and must therefore be high-level, describing entire compound values.
- **document.** The _fundamental value types_ have the following sets of abstract values: | Type | Values | | ------------------------- | ------ | | `bool` | `true` and `false` | | `s8`, `s16`, `s32`, `s64` | integers in the range [-2 N-1 , 2 N-1 -1] | | `u8`, `u16`, `u32`, `u64` | integers in the range [0, 2 N -1] | | `f32`, `f64` | [IEEE754] floating-point numbers, with a single NaN value | | `char` | [Unicode…
- **document.** A consequence of this, however, is that components _must not_ depend on the contents of `error-context` values for behavioral correctness.
- **document.** In particular, case analysis of the contents of an `error-context` should not determine _error recovery_; explicit `result` or `variant` types must be used in the function return type instead (e.g., `(func (result (tuple (stream u8) (future $my-error)))`).
- **document.** Note that the fixed length must be larger than 0.
