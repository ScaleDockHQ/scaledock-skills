# Ecosystems and ids

Read this when choosing an `id` prefix, filling `affected[].package.ecosystem` and `name`, or checking a record from an unfamiliar database. Sources: `docs/schema.md` § id, modified fields and § Defined ecosystems, and the `prefix` and `ecosystemWithSuffix` definitions in `validation/schema.json`, all at tag `v1.9.1`.

## ids

- Format `<DB>-<ENTRYID>`: `DB` names the database, `ENTRYID` uses that database's format, for example `OSV-2020-111`, `CVE-2021-3114`, `GHSA-vp9c-fpxx-744v` (§ id, modified fields).
- `x_` marks a local database not aggregated by OSV.dev, so private records can still be schema-compliant, for example `x_CUSTOM-0001` (§ id, modified fields, since 1.8.0).
- Publish within your reasonable scope or ecosystem. To derive an id from a CVE, prefix it with your home database prefix, for example `DEBIAN-CVE-2000-0001` (§ id, modified fields, since 1.9.0).
- A database prefix and an ecosystem name may be the same only if one owner decides the meaning of `ecosystem_specific` (§ Defined ecosystems).
- New prefixes are added by pull request to `ossf/osv-schema` ("Your database here").

The JSON Schema `prefix` pattern at 1.9.1 is `^(x_|(<PREFIX>)-)` with these prefixes:

`ASB-A`, `PUB-A`, `ALPINE`, `ALSA`, `ALBA`, `ALEA`, `AZL`, `BELL`, `BIT`, `BREW`, `CGA`, `CLEANSTART`, `CLSA`, `CURL`, `CVE`, `DEBIAN`, `DHI`, `DRUPAL`, `DSA`, `DLA`, `ELA`, `DTSA`, `ECHO`, `EEF`, `FreeBSD`, `GHSA`, `GO`, `GSD`, `HSEC`, `JLSEC`, `KUBE`, `LBSEC`, `LSN`, `MAL`, `MINI`, `MGASA`, `OESA`, `OSEC`, `OSV`, `openSUSE-SU`, `PHSA`, `PSF`, `PYSEC`, `RHBA`, `RHEA`, `RHLW`, `RHSA`, `RLSA`, `RXSA`, `RSEC`, `ROOT`, `RUSTSEC`, `SUSE-SU`, `SUSE-RU`, `SUSE-FU`, `SUSE-OU`, `UBUNTU`, `USN`, `V8`, `VCPKG`.

The pattern is case-sensitive and only anchors the start, so the rest of the `id` is free-form at 1.9.1. The prose table writes `CleanStart` where the pattern has `CLEANSTART`, and the pattern has `FreeBSD`, which the table lacks; validate against the pattern.

Some prefixes and their home databases (§ id, modified fields):

| Prefix                           | Home database                                            |
| -------------------------------- | -------------------------------------------------------- |
| `CVE`                            | National Vulnerability Database (provided by OSV.dev)    |
| `GHSA`                           | GitHub Security Advisory Database                        |
| `GO`                             | Go Vulnerability Database                                |
| `MAL`                            | OpenSSF Malicious Packages Repository                    |
| `OSV`                            | Advisories allocated by OSV.dev (OSS-Fuzz)               |
| `PYSEC` / `PSF`                  | PyPI Vulnerability Database / Python Software Foundation |
| `RUSTSEC`                        | RustSec Advisory Database                                |
| `DSA` / `DLA` / `DTSA`, `DEBIAN` | Debian Security Advisories, Debian Security Tracker      |
| `USN`, `UBUNTU`, `LSN`           | Ubuntu Security Notices, CVE reports, Livepatch notices  |
| `RHSA` / `RHBA` / `RHEA`         | Red Hat Security Data                                    |

The full table also gives each database's source URL and the URL where it serves OSV JSON, for example `https://vuln.go.dev/ID/<ID>.json` or `https://api.osv.dev/v1/vulns/<ID>`.

The `main` branch adds an `id` character set and semantically neutral id guidance that is not in 1.9.1; see the preview in [`versions.md`](versions.md).

## Ecosystems

`ecosystem` must be a defined value; the JSON Schema pattern is `^(<NAME>|GIT)(:.+)?$` (§ affected[].package field; `ecosystemWithSuffix`). Values are case-sensitive: `PyPI`, not `pypi`. A suffix is only meaningful where the ecosystem defines it.

### Language and package registries

| Ecosystem              | `name`                                                                                  | Suffix                                                                      |
| ---------------------- | --------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| `npm`                  | npm package name                                                                        | none                                                                        |
| `PyPI`                 | PEP 503 normalized name                                                                 | none                                                                        |
| `Maven`                | `groupId:artifactId`                                                                    | optional `:<REMOTE-REPO-URL>` without trailing slash; default Maven Central |
| `Go`                   | Go module path                                                                          | none                                                                        |
| `crates.io`            | crate name                                                                              | none                                                                        |
| `RubyGems`             | gem name                                                                                | none                                                                        |
| `NuGet`                | NuGet package name                                                                      | none                                                                        |
| `Packagist`            | package name                                                                            | optional `:<REMOTE-REPO-URL>`; default `https://packagist.org`              |
| `Pub`                  | Dart package name                                                                       | none                                                                        |
| `Hex`                  | Hex package name                                                                        | none                                                                        |
| `Hackage`, `GHC`       | Hackage package; GHC component (compiler, GHCI, RTS)                                    | none                                                                        |
| `CRAN`, `Bioconductor` | R package name                                                                          | none                                                                        |
| `Julia`                | package in the General registry                                                         | none                                                                        |
| `opam`                 | opam package name                                                                       | none                                                                        |
| `ConanCenter`          | Conan package name                                                                      | none                                                                        |
| `vcpkg`                | port name; `port-version` goes in the purl `port_version` qualifier                     | none                                                                        |
| `SwiftURL`             | Git URL of the package; versions are SemVer tags                                        | none                                                                        |
| `GitHub Actions`       | `{owner}/{repo}`                                                                        | none                                                                        |
| `VSCode`               | `<publisher>.<name>`                                                                    | optional `:<REMOTE-REPO-URL>`; default the VS Code Marketplace              |
| `Homebrew`             | formula name, for example `openssl@3`; versions carry `_N` when the revision is nonzero | optional `:<tap>`; default `homebrew/core`                                  |
| `WordPress`            | `wordpress`, or the plugin or theme slug                                                | `:Core`, `:Plugin` or `:Theme`                                              |
| `Kubernetes`           | Go module of the component, for example `k8s.io/apiserver`                              | none                                                                        |

### Linux distributions and OS packages

| Ecosystem                                            | `name`                                                                                          | Suffix                                                                                                    |
| ---------------------------------------------------- | ----------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `Debian`                                             | source package                                                                                  | optional `:<RELEASE>` numeric from distro-info-data, or the series for unnumbered releases (`Debian:sid`) |
| `Ubuntu`                                             | source package                                                                                  | `:<YY.MM>`, plus mandatory `:LTS` for LTS releases, optional `:Pro:` prefix (`Ubuntu:Pro:18.04:LTS`)      |
| `Alpine`                                             | source package                                                                                  | required `:v<RELEASE-NUMBER>`, for example `Alpine:v3.16`                                                 |
| `Red Hat`                                            | binary or source RPM                                                                            | `:<CPE>` with the `cpe:/[oa]:redhat:` prefix removed, for example `Red Hat:rhel_aus:8.4::appstream`       |
| `AlmaLinux`, `Rocky Linux`, `TuxCare`, `Azure Linux` | source package                                                                                  | `:<RELEASE>` numeric (optional, except Azure Linux, which has one)                                        |
| `SUSE`, `openSUSE`                                   | source RPM, with a purl                                                                         | `:<RELEASE>` matching `PRETTY_NAME` in `/etc/os-release`; `ecosystem_specific.binaries` lists binary RPMs |
| `Photon OS`                                          | RPM package                                                                                     | required `:<RELEASE-NUMBER>`, for example `Photon OS:3.0`                                                 |
| `Mageia`                                             | source package                                                                                  | required `:<RELEASE-NUMBER>`, for example `Mageia:9`                                                      |
| `openEuler`                                          | source RPM                                                                                      | a `<RELEASE>` suffix naming an LTS release                                                                |
| `FreeBSD`                                            | `pkg(8)` package for ports                                                                      | `:ports`, `:base` or `:kernel`, then an optional `:<RELEASE>`                                             |
| `Linux`                                              | only `Kernel`                                                                                   | none                                                                                                      |
| `Android`                                            | `repo` project name, or `:linux_kernel:` with an optional SoC vendor (`:linux_kernel:Qualcomm`) | none                                                                                                      |

### Vendor and hardened-image ecosystems

`Alpaquita` and `BellSoft Hardened Containers` (`:<RELEASE>` suffix), `Bitnami`, `Chainguard`, `CleanStart`, `Docker Hardened Images`, `MinimOS`, `Wolfi`, `Echo` (optional `:PyPI`, `:Maven`, `:npm` or `:NuGet` for secured builds of those ecosystems; without a suffix, Echo OS packages ordered like Debian), `Red Hat Lightwell` (suffix required, naming an existing OSV ecosystem, for example `Red Hat Lightwell:Maven`), and `Root` (`Root:{BaseDistro}:{Version}` or `Root:{PackageManager}`), plus `OSS-Fuzz` for OSS-Fuzz reports with no better ecosystem.

Each row above paraphrases § Defined ecosystems at 1.9.1; read the full description there before relying on version ordering for an ecosystem.

### GIT

`GIT` is not in the defined ecosystem table, but the JSON Schema `ecosystemWithSuffix` pattern accepts it, and § Version Enumeration for Git Entries calls it the `GIT` "ecosystem". For Git-level data, 1.9.1 recommends an `affected` entry with no `package` and a `GIT` range (§ Separating Git and Strict Ecosystems). OSV.dev also accepts `GIT` as a query ecosystem with the repository URL as `name` (OSV.dev POST /v1/query, Queries for Git records).

## Common mistakes

- Wrong case: `pypi`, `Npm`, `maven`.
- An Ubuntu LTS release without `:LTS`, or an Alpine release without the `v`.
- A Maven name without `groupId:`.
- A PyPI name that is not normalized.
- An `id` prefix that is not registered and not `x_`.
