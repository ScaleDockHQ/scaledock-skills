# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## npm trusted publishing

Source: https://docs.npmjs.com/trusted-publishers

Trusted publishing for npm packages | npm Docs Skip to search Skip to content npm Docs npmjs.com Status Support

- **For GitHub Actions.** Configure the following fields: Organization or user (required): Your GitHub username or organization name Repository (required): Your repository name Workflow filename (required): The filename of your workflow (e.g., publish.yml ) Enter only the filename, not the full path Must include the .yml or .yaml extension The workflow file must exist in .github/workflows/ in your repository Environment…
- **Troubleshooting.** All fields are case-sensitive and must be exact.
- **Troubleshooting.** To publish from GitHub, your package's repository.url field in package.json must exactly match your GitHub repository.
- **Troubleshooting.** The id-token: write permission must also be given to both parent and child workflows.

## PyPI trusted publishing

Source: https://docs.pypi.org/trusted-publishers/

OpenID Connect (OIDC) publishing is a mechanism for uploading packages to PyPI, complementing

- **abstract.** OpenID Connect (OIDC) publishing is a mechanism for uploading packages to PyPI, complementing
