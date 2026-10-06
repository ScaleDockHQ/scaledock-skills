# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## SemVer 2.0.0

Source: https://semver.org/spec/v2.0.0.html

^(?P<major>0|[1-9]\d*)\.(?P<minor>0|[1-9]\d*)\.(?P<patch>0|[1-9]\d*)(?:-(?P<prerelease>(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]_)(?:\.(?:0|[1-9]\d_|\d*[a-zA-Z-][0-9a-zA-Z-]_))_))?(?:\+(?P<buildmetadata>[0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$

- **Semantic Versioning Specification (SemVer).** The key words “MUST”, “MUST NOT”, “REQUIRED”, “SHALL”, “SHALL NOT”, “SHOULD”, “SHOULD NOT”, “RECOMMENDED”, “MAY”, and “OPTIONAL” in this document are to be interpreted as described in RFC 2119 .
- **Semantic Versioning Specification (SemVer).** Software using Semantic Versioning MUST declare a public API.
- **Semantic Versioning Specification (SemVer).** However it is done, it SHOULD be precise and comprehensive.
- **Semantic Versioning Specification (SemVer).** A normal version number MUST take the form X.Y.Z where X, Y, and Z are non-negative integers, and MUST NOT contain leading zeroes.
- **Semantic Versioning Specification (SemVer).** Once a versioned package has been released, the contents of that version MUST NOT be modified.
- **Semantic Versioning Specification (SemVer).** Any modifications MUST be released as a new version.
- **Semantic Versioning Specification (SemVer).** The public API SHOULD NOT be considered stable.
- **Semantic Versioning Specification (SemVer).** Patch version Z (x.y.Z | x > 0) MUST be incremented if only backward compatible bug fixes are introduced.
