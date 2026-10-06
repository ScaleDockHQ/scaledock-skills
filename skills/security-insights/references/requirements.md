# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## Security Insights

Source: https://raw.githubusercontent.com/ossf/security-insights/main/spec/schema.md

SecurityInsights defines a schema that projects can use to report information about their security in a machine-processable way. The data tracked within this specification is intended to fill the gaps between simplified solutions such as SECURITY.md and comprehensive automated solutions such as SBOMs. In that gap lay elements that must be self-reported by projects to allow end-users to make informed security decisions.

- **document.** In that gap lay elements that must be self-reported by projects to allow end-users to make informed security decisions.
- **document.** Only one entry should be marked as primary.
- **document.** The URL must be publicly readable and return raw YAML (content-type "text/plain" or "application/yaml"), not an HTML page.
- **document.** The URL value should include placeholders such as `{version}` if relevant.
- **document.** This should be used when the release license differs from the repository license.
- **document.** If customization is not enabled, the only value here should be "default".
