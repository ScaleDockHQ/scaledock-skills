# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## CNAB 1.2.0

Source: https://raw.githubusercontent.com/cnabio/cnab-spec/main/100-CNAB.md

The Cloud Native Application Bundle (CNAB) is a _standard packaging format_ for multi-component distributed applications. It allows packages to target different runtimes and architectures. It empowers application distributors to package applications for deployment on a wide variety of cloud platforms, providers, and services. Furthermore, it provides necessary capabilities for delivering multi-container applications in disconnected (airgapped) environments.

- **document.** This indicates which credentials MUST be passed into the invocation image in order for the invocation image to correctly authenticate to the services used by the bundle.
- **document.** Credentials are injected into the invocation image, but they MUST NOT be stored.
- **document.** The _bundle definition_ is a single file that contains the following information: - Information about the bundle, such as name, bundle version, description, and keywords - Information about locating and running the _invocation image_ (the installer program) - A list of user-overridable parameters that this package recognizes - The list of executable images that this bundle will install - A list…
- **document.** However, as a signed bundle definition represents an immutable bundle, all invocation images and images references must have a content digest.
- **document.** Also, when referencing tooling, the following terms are used: - `CNAB runtime` or `runtime`: A program capable of reading a CNAB bundle and executing it - `CNAB builder` or `builder`: A program that can assemble a CNAB bundle - `bundle tooling`: Programs or tooling that generate CNAB bundle contents Individual tools may meet more than one of the definitions above, they have been separated in…
