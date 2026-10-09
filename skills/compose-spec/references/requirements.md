# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are normative sentences from the published text, quoted as written (only line breaks and hyphenation from PDF layout were joined). Apply the ones that match the role. Each is labelled with the nearest section, clause or article in the published document.

## Application model

Source: https://raw.githubusercontent.com/compose-spec/compose-spec/914ec15d1fa498969c0df5c1d672306db3256089/02-model.md

- **The Compose application model.** If you are creating resources on a platform, you must prefix resource names by project and set the label `com.docker.compose.project`.
- **The Compose application model.** Project names must contain only lowercase letters, decimal digits, dashes, and underscores, and must begin with a lowercase letter or decimal digit.

## The Compose file

Source: https://raw.githubusercontent.com/compose-spec/compose-spec/914ec15d1fa498969c0df5c1d672306db3256089/03-compose-file.md

- **Compose file.** The default path for a Compose file is `compose.yaml` (preferred) or `compose.yml` that is placed in the working directory.
- **Compose file.** Simple attributes and maps get overridden by the highest order Compose file, lists get merged by appending.
- **Compose file.** Relative paths are resolved based on the first Compose file's parent folder, whenever complimentary files being merged are hosted in other folders.

## Version and name

Source: https://raw.githubusercontent.com/compose-spec/compose-spec/914ec15d1fa498969c0df5c1d672306db3256089/04-version-and-name.md

- **Version top-level element (obsolete).** The top-level `version` property is defined by the Compose Specification for backward compatibility. It is only informative you'll receive a warning message that it is obsolete if used.
- **Name top-level element.** The top-level `name` property is defined by the Specification as the project name to be used if you don't set one explicitly.

## Services

Source: https://raw.githubusercontent.com/compose-spec/compose-spec/914ec15d1fa498969c0df5c1d672306db3256089/05-services.md

- **Services top-level element.** A Compose file must declare a `services` top-level element as a map whose keys are string representations of service names, and whose values are service definitions.
- **image.** `image` must follow the Open Container Specification [addressable image format](https://github.com/opencontainers/org/blob/master/docs/docs/introduction/digests.md), as `[<registry>/][<project>/]<image>[:<tag>|@<digest>]`.
- **extends.** The `extends` value must be a mapping defined with a required `service` and an optional `file` key.
- **extends, Finding referenced service.** A service denoted by `service` must be present in the identified referenced Compose file.
- **Env_file format.** Each line in an `.env` file must be in `VAR[=[VAL]]` format.
- **healthcheck.** If it's a list, the first item must be either `NONE`, `CMD` or `CMD-SHELL`.
- **ports.** Port mapping must not be used with `network_mode: host`.
- **ports, Short syntax.** Ports can be either a single value or a range. `HOST` and `CONTAINER` must use equivalent ranges.
- **secrets.** Defining a secret in the top-level `secrets` must not imply granting any service access to it.

## Networks

Source: https://raw.githubusercontent.com/compose-spec/compose-spec/914ec15d1fa498969c0df5c1d672306db3256089/06-networks.md

- **external.** Compose doesn't attempt to create these networks, and returns an error if one doesn't exist.
- **external.** All other attributes apart from name are irrelevant. If Compose detects any other attribute, it rejects the Compose file as invalid.

## Volumes

Source: https://raw.githubusercontent.com/compose-spec/compose-spec/914ec15d1fa498969c0df5c1d672306db3256089/07-volumes.md

- **external.** Compose doesn't then create the volume, and returns an error if the volume doesn't exist.

## Extensions

Source: https://raw.githubusercontent.com/compose-spec/compose-spec/914ec15d1fa498969c0df5c1d672306db3256089/11-extension.md

- **Extension.** Compose ignores any fields that start with `x-`, this is the sole exception where Compose silently ignores unrecognized fields.

## Interpolation

Source: https://raw.githubusercontent.com/compose-spec/compose-spec/914ec15d1fa498969c0df5c1d672306db3256089/12-interpolation.md

- **Interpolation.** If Compose can't resolve a substituted variable and no default value is defined, it displays a warning and substitutes the variable with an empty string.

## Merge and override

Source: https://raw.githubusercontent.com/compose-spec/compose-spec/914ec15d1fa498969c0df5c1d672306db3256089/13-merge.md

- **Sequence.** A YAML `sequence` is merged by appending values from the overriding Compose file to the previous one.
- **Unique resources.** When merging Compose files, Compose appends new entries that do not violate a uniqueness constraint and merge entries that share a unique key.

## Include

Source: https://raw.githubusercontent.com/compose-spec/compose-spec/914ec15d1fa498969c0df5c1d672306db3256089/14-include.md

- **Include.** Compose displays a warning if resource names conflict and doesn't try to merge them.

## Profiles

Source: https://raw.githubusercontent.com/compose-spec/compose-spec/914ec15d1fa498969c0df5c1d672306db3256089/15-profiles.md

- **Profiles.** Services without a `profiles` attribute are always enabled.
