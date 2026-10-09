# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the field descriptions from the schema documentation and the placement rules from the README, quoted as written. Each is labelled with the schema field it describes (a dotted path from the top of the file, or the schema type for nested objects), and with `(required)` where the schema marks the field required.

## Schema 2.2.0: header

Source: https://raw.githubusercontent.com/ossf/security-insights/v2.2.0/spec/schema.md

- **`header.schema-version` (required).** The version of the Security Insights schema being used.
- **`header.last-reviewed` (required).** The date when the document or data was last reviewed.
- **`header.url` (required).** This should point to the canonical location where the file is hosted (e.g., a raw file URL in a version control system).
- **`header.project-si-source`.** The URL provided here should respond to an unauthenticated GET request and return a valid security insights file using a content-type of "text/plain" or "application/yaml".
- **`repository`.** This field is required if the file is intended for use as a parent security insights file with project information to be inherited by multiple repositories via their respective `header.project-si-source`.

## Schema 2.2.0: project

Source: https://raw.githubusercontent.com/ossf/security-insights/v2.2.0/spec/schema.md

- **`project.administrators` (required).** A list of 1 or more individuals who have administrative access to the project's resources.
- **`project.repositories` (required).** A list of 1 or more repositories that are part of this project, including the repository this file is published in.
- **`project.vulnerability-reporting` (required).** An object describing how security vulnerabilities can be reported and how they are handled by the project.
- **`VulnerabilityReporting.reports-accepted` (required).** Indicates whether this project currently accepts vulnerability reports.
- **`VulnerabilityReporting.contact`.** Point of contact for reporting vulnerabilities. This may be a single person or a mailgroup.
- **`Contact.primary` (required).** Indicates whether this admin is the first point of contact for inquiries. Only one entry should be marked as primary.

## Schema 2.2.0: repository

Source: https://raw.githubusercontent.com/ossf/security-insights/v2.2.0/spec/schema.md

- **`repository.core-team` (required).** A list of 1 or more core team members for this repository, such as maintainers or approvers.
- **`repository.security` (required).** An object describing security-related artifacts, champions, and tooling for the repository.
- **`License.expression` (required).** The SPDX license expression for the license.
- **`SecurityTool.rulesets` (required).** The set of rules or configurations applied by the tool. If customization is not enabled, the only value here should be "default".
- **`repository.release.license`.** This should be used when the release license differs from the repository license.
- **`repository.release.changelog`.** The URL value should include placeholders such as `{version}` if relevant.
- **`repository.release.attestations`.** List of attestations for the repository’s releases.

## README 2.2.0: publishing the file

Source: https://raw.githubusercontent.com/ossf/security-insights/v2.2.0/README.md

- **File location.** Place your `security-insights.yml` file in the root of your repository or in your source forge directory (e.g. `.github/` or `.gitlab/`) to support automated detection
- **File scope.** Consumers of the `security-insights.yml` file(s) provided by projects should assume the contents is only relative to the commit or release artifact it is associated with.
- **File upkeep.** As your project evolves, keep your `security-insights.yml` file up to date.

## Specification 1.0.0 (legacy)

Source: https://raw.githubusercontent.com/ossf/security-insights/v1.0.0/specification.md

- **`header.expiration-date` (1.0.0, required).** The date this file should no longer be considered valid, and it can be at most one year from the date it was last reviewed.
- **`header.last-updated` (1.0.0).** The date of the last update to `SECURITY-INSIGHTS.yml`, excluding the properties `commit-hash` and `last-reviewed`.
