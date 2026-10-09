# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are normative sentences from the published text, quoted as written (only line breaks and hyphenation from PDF layout were joined). Apply the ones that match the role. Each is labelled with the nearest section, clause or article in the published document.

## Overview (100-CNAB.md)

Source: https://raw.githubusercontent.com/cnabio/cnab-spec/5771c874bedce48f5762a40becc984d55116b8b7/100-CNAB.md

- **Summary.** However, as a signed bundle definition represents an immutable bundle, all invocation images and images references must have a content digest.
- **Approach.** Credentials are injected into the invocation image, but they MUST NOT be stored.
- **Key Terms.** A runtime MUST support the 'install', 'upgrade', and 'uninstall' actions, while bundle tooling MAY choose not to implement 'upgrade'.

## The bundle.json file (101-bundle-json.md)

Source: https://raw.githubusercontent.com/cnabio/cnab-spec/5771c874bedce48f5762a40becc984d55116b8b7/101-bundle-json.md

- **The bundle.json File.** The bundle.json MUST be mounted to /cnab/bundle.json.
- **Dotted Names.** CNAB tools MUST NOT treat these strings as domain names or domain components, as this specification allows characters that are not legal in DNS addresses.
- **Schema Version.** Every `bundle.json` MUST have a `schemaVersion` element.
- **Invocation Images.** A CNAB bundle MUST have at least one invocation image.
- **Invocation Images.** If multiple images match the criterion set by the user, the runtime MUST execute only one, and MUST execute the first match as determined by the order of the `invocationImages` list.
- **Invocation Images.** The list of formats is open-ended, but any CNAB-compliant system MUST implement `docker` and `oci`.
- **Definitions.** Indicates that the value of the parameter is sensitive and MUST NOT be written to insecure locations such as log files or user-facing output.
- **Parameters.** When `true`, a runtime MUST fail if the parameter is not provided for any action to which the parameter applies.
- **Resolving Destinations.** If both `env` and `path` are specified, implementations MUST put a copy of the data in each destination.
- **Credentials.** If `path` is set, the value of the credential MUST be written into a file at the specified location on the invocation image's filesystem.
- **Custom Actions.** The `modifies` field MUST be set to `true` if any resource that is managed by the bundle is changed in any way.
- **Custom Actions.** The built-in actions (`install`, `upgrade`, `uninstall`) MUST NOT appear in the `actions` section, and an implementation MUST NOT allow custom actions named `install`, `upgrade`, or `uninstall`.
- **Custom Actions.** That is, even if an implementation cannot execute custom actions, it MUST NOT fail to operate on bundles that declare custom actions.
- **Custom Extensions.** Tools MUST NOT define additional fields anywhere else in the bundle descriptor.

## The invocation images (102-invocation-image.md)

Source: https://raw.githubusercontent.com/cnabio/cnab-spec/5771c874bedce48f5762a40becc984d55116b8b7/102-invocation-image.md

- **The `/cnab` Directory.** An invocation image MUST have a directory named `cnab` placed directly under the root of the file system hierarchy inside of an image.
- **The `/cnab` Directory.** This directory MUST NOT have any files or directories not explicitly named in the present document.
- **The Run Tool.** The run tool MUST be located at the path `/cnab/app/run`.
- **The Run Tool.** It MUST react to the `CNAB_ACTION` provided to it.
