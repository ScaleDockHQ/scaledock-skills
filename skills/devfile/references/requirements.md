# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are normative sentences from the published text, quoted as written (only line breaks and hyphenation from PDF layout were joined). Apply the ones that match the role. Each is labelled with the nearest section, clause or article in the published document.

## Devfile schema 2.3.0

Source: https://raw.githubusercontent.com/devfile/api/c088cf36a78ddadb8a45b951a2e7214a2ef2da26/schemas/latest/devfile.json

Labels are the schema property paths the description belongs to.

- **components[].name.** Mandatory name that allows referencing the component from other elements (such as commands) or from an external devfile that may reference this component through a parent or a plugin.
- **commands[].id.** Mandatory identifier that allows referencing this command in composite commands, from a parent, or in events.
- **components[].container.endpoints[].targetPort.** The same port cannot be used by two different container components.
- **components[].container.endpoints[].secure.** Describes whether the endpoint should be secured and protected by some authentication process. This requires a protocol of `https` or `wss`.
- **components[].container.mountSources.** Defaults to true for all component types except plugins and components that set `dedicatedPod` to true.
- **dependentProjects[].clonePath.** The path is invalid if it is absolute or tries to escape the project root through the usage of '..'.

## Devfile 2.3.0 docs: Adding components

Source: https://raw.githubusercontent.com/devfile/devfile-web/5e4115c7cb868fc52e9898268dd0c93e6292c445/libs/docs/src/docs/2.3.0/adding-components.md

- **Adding components.** Each component in a single devfile must have a unique name and use one of the objects: `container`, `kubernetes`, `openshift`, `image` or `volume`.

## Devfile 2.3.0 docs: Creating devfiles

Source: https://raw.githubusercontent.com/devfile/devfile-web/5e4115c7cb868fc52e9898268dd0c93e6292c445/libs/docs/src/docs/2.3.0/create-devfiles.md

- **Creating devfiles, Procedure.** `schemaVersion` is the only required root element
- **Creating devfiles, Procedure.** If a `container` entity is defined, an `image` property must be specified
- **Creating devfiles, Procedure.** An `exec` entity must be defined with a `commandLine` string and a reference to a `component`

## Devfile 2.3.0 docs: Adding a command group

Source: https://raw.githubusercontent.com/devfile/devfile-web/5e4115c7cb868fc52e9898268dd0c93e6292c445/libs/docs/src/docs/2.3.0/adding-a-command-group.md

- **Adding a command group, Procedure.** Use the following supported group kinds: `build`, `run`, `test`, `debug` or `deploy`
- **Adding a command group, Procedure.** At most, there can only be one default command for each group kind.

## Devfile 2.3.0 docs: Adding an exec command

Source: https://raw.githubusercontent.com/devfile/devfile-web/5e4115c7cb868fc52e9898268dd0c93e6292c445/libs/docs/src/docs/2.3.0/adding-an-exec-command.md

- **Adding an exec command.** The `component` attribute value must correspond to an existing container component name.
- **Adding an exec command.** A command can have only one action, though you can use `composite` commands to run several commands either in sequence or in parallel.

## Devfile 2.3.0 docs: Adding a container component

Source: https://raw.githubusercontent.com/devfile/devfile-web/5e4115c7cb868fc52e9898268dd0c93e6292c445/libs/docs/src/docs/2.3.0/adding-a-container-component.md

- **Adding a container component, Procedure.** For the `container` component to have a shared volume, you must define a volume component in the devfile and reference the volume using `volumeMount` in container component.

## Devfile 2.3.0 docs: Adding projects

Source: https://raw.githubusercontent.com/devfile/devfile-web/5e4115c7cb868fc52e9898268dd0c93e6292c445/libs/docs/src/docs/2.3.0/adding-projects.md

- **Adding projects, Procedure.** For each project, define a mandatory source of either the `git` or `zip` type.
- **Adding projects, Procedure.** The path must be relative to the `/projects/` directory, and it cannot leave the `/projects/` directory.

## Devfile 2.3.0 docs: Defining starter projects

Source: https://raw.githubusercontent.com/devfile/devfile-web/5e4115c7cb868fc52e9898268dd0c93e6292c445/libs/docs/src/docs/2.3.0/defining-starter-projects.md

- **Defining starter projects.** For a Git source in a starter project, a single remote must be specified.

## Devfile 2.3.0 docs: Defining endpoints

Source: https://raw.githubusercontent.com/devfile/devfile-web/5e4115c7cb868fc52e9898268dd0c93e6292c445/libs/docs/src/docs/2.3.0/defining-endpoints.md

- **Defining endpoints, Procedure.** When the endpoint is secured this way, clients must supply a JWT workspace token to call this endpoint.

## Devfile 2.3.0 docs: Referring to a parent devfile

Source: https://raw.githubusercontent.com/devfile/devfile-web/5e4115c7cb868fc52e9898268dd0c93e6292c445/libs/docs/src/docs/2.3.0/referring-to-a-parent-devfile.md

- **Referring to a parent devfile.** If you designate a parent devfile, the given devfile inherits all its behavior from its parent.
