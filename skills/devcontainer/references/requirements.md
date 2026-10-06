# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## Development Containers

Source: https://containers.dev/implementors/spec/

The purpose of the Development Container Specification is to provide a way to enrich containers with the content and metadata necessary to enable development inside them. These container environments should be easy to use, create, and recreate.

- **Development Container Specification.** These container environments should be easy to use, create, and recreate.
- **Development Container Specification.** Tools that want to implement this specification should provide a set of features/commands that give more flexibility to users and allow development containers to scale to large development groups.
- **devcontainer.json.** Products using it should expect to find a devcontainer.json file in one or more of the following locations (in order of precedence): .devcontainer/devcontainer.json .devcontainer.json .devcontainer/<folder>/devcontainer.json (where <folder> is a sub-folder, one level deep) It is valid that these files may exist in more than one location, so consider providing a mechanism for users to select one when appropriate.
- **Image Metadata.** These contents should then be merged with any local devcontainer.json file contents at the time the container is created.
- **Image Metadata.** Metadata should be representative of with the following structure, using one entry per Dev Container Feature and devcontainer.json (see table below for the full list): [ { "id" ?: string , "init" ?: boolean , "privileged" ?: boolean , "capAdd" ?: string [], "securityOpt" ?: string [], "entrypoint" ?: string , "mounts" ?: [], ...
- **Notes.** Using one line per Feature should allow for making full use of these limits.
- **Image based.** Image based configurations only reference an image that should be reachable and downloadable through docker pull commands.
- **Docker Compose based.** runServices : an optional property that indicates the set of services in the docker-compose configuration that should be started or stopped with the environment.
