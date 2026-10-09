# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are normative sentences from the published text, quoted as written (only line breaks and hyphenation from PDF layout were joined). Apply the ones that match the role. Each is labelled with the nearest section, clause or article in the published document.

## Buildpack Interface Specification (Buildpack API 0.12)

Source: https://raw.githubusercontent.com/buildpacks/spec/b745fcfd90d7139d6a04cca2878b47ec402be943/buildpack.md

- **Buildpack Interface.** The lifecycle MUST invoke executables in component buildpacks as described in the Phase sections.
- **Execution Environments.** When the `CNB_EXEC_ENV` environment variable is not set, buildpacks MUST assume the default value of `production`.
- **Layer Types.** The lifecycle MUST treat a layer with unset `types` as a `launch = false`, `build = false`, `cache = false` layer.
- **Launch Layers.** The lifecycle MUST include each launch layer in the built OCI image.
- **Phase #1: Detection, Process.** Image extensions MUST always be optional during detection.
- **Phase #1: Detection, Process.** The selected group MUST be filtered to only include extensions and buildpacks with exit status zero.
- **Phase #1: Detection, Process.** In order to make contributions to the Build Plan, a `/bin/detect` executable MUST write entries to `<plan>` in two sections: `requires` and `provides`.
- **Phase #1: Detection, Order Resolution.** Order definitions for image extensions MUST NOT contain nested orders.
- **Phase #3: Generation, Purpose.** The generation phase MUST NOT be run for Windows builds.
- **Phase #5: Build, Process.** For each buildpack in the group in order, the lifecycle MUST execute `/bin/build`.
- **Unmet Buildpack Plan Entries.** The lifecycle SHALL assume that all entries in the Buildpack Plan were satisfied by the buildpack unless the buildpack writes an entry with the given name to the `unmet` section of `build.toml`.
- **Reusing Layers.** If the buildpack does not set `launch`, `build`, or `cache` under `[types]` in the restored `<layers>/<layer>.toml` the layer SHALL be ignored.
- **buildpack.toml (TOML).** Buildpack authors MUST choose a globally unique ID, for example: "io.buildpacks.ruby".
- **buildpack.toml (TOML), Order.** A buildpack reference inside of a `group` MUST contain an `id` and `version`. The `order` MUST include only buildpacks and MUST NOT include image extensions.

## Platform Interface Specification (Platform API 0.15)

Source: https://raw.githubusercontent.com/buildpacks/spec/b745fcfd90d7139d6a04cca2878b47ec402be943/platform.md

- **Rebase.** When layers are rebased, any app image metadata referencing to the original run image MUST be updated to reference to the new run image.
- **Rebase.** To rebase an app image a platform MUST execute the `/cnb/lifecycle/rebaser` or perform an equivalent operation.
- **restorer, Layer Restoration.** The lifecycle MUST use the provided `cache-dir` or `cache-image` to retrieve cache contents.
- **creator, Inputs.** Running `creator` SHALL be equivalent to running `detector`, `analyzer`, `restorer`, `builder` and `exporter` in order with identical inputs where they are accepted, with the following exceptions.
- **launcher, Execution.** The launcher MUST set the working directory for the start command to `<working-dir>`, or to `<app>` if `<working-dir>` is not specified.
- **Registry Authentication.** The lifecycle MUST attempt to authenticate anonymously if no matching credentials are found.
- **User-Provided Variables.** User-provided environment variables MUST be supplied by the platform as files in the `<platform>/env/` directory.
- **User-Provided Variables.** Each file SHALL define a single environment variable, where the file name defines the key and the file contents define the value.
- **Operator-Defined Variables.** Operator-provided environment variables MUST be supplied by the platform as files in the `<build-config>/env/` directory.
- **`group.toml` (TOML).** `id`, `version`, and `api` MUST be present for each buildpack object in a group.
