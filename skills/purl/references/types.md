# PURL types and qualifiers

Read this when mapping a package to a purl, normalizing a registered type, or choosing qualifiers. Sources: ECMA-427 Clause 6 and Annex A (type definition schema), the registered definitions in purl-spec `types/` on main at 7cd2d34, the type test files, the qualifiers guidance, and the 2nd Edition draft Annex B, listed in [Sources](../SKILL.md#sources).

## Type definitions (Clause 6, Annex A)

ECMA-427 defines the schema for a type, not the types themselves. Each registered type is a JSON document in purl-spec `types/<type>-definition.json` (schema `purl-type-definition.schema-1.0.json`); `purl-types-index.json` lists them and `docs/types/definitions/` holds generated documentation.

| Property                                                      | Meaning                                                                                         |
| ------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `type`, `type_name`, `description`                            | Required. `type` matches `^[a-z][a-z0-9-\.]+$`.                                                 |
| `repository.use_repository`, `default_repository_url`, `note` | Whether the type has a public repository and its default URL.                                   |
| `namespace_definition`                                        | Required. `requirement` is `required`, `optional` or `prohibited`.                              |
| `name_definition`                                             | Required. `requirement` is always `required`.                                                   |
| `version_definition`, `subpath_definition`                    | Optional. `requirement` is `optional`.                                                          |
| component `permitted_characters`                              | ECMA-262 regular expression; a subset of the core permitted characters.                         |
| component `case_sensitive`                                    | Default `true`. If `false`, the canonical form shall be lowercased.                             |
| component `normalization_rules`                               | Plain-text rules that tools apply in code.                                                      |
| component `native_name`                                       | The ecosystem's own term, such as `groupId` for the maven namespace.                            |
| `qualifiers_definition[]`                                     | `key`, `requirement` (`optional` or `required`), `description`, `default_value`, `native_name`. |
| `examples`                                                    | Required. Valid, canonical purls matching `^pkg:[a-z][a-z0-9-\.]+/.*$`.                         |

The 2nd Edition draft (schema 1.1) adds namespace `registered_values` and a `recommended` qualifier requirement; both only produce warnings. Do not depend on them yet.

Validation (2nd Edition draft § 5.7, test suite `required` group): a purl of a registered type that breaks its definition is invalid; an unregistered type that follows § 5.6.2 is valid and should produce a warning.

## Registered types

42 types on main (2026-09-29): `alpm`, `apk`, `bazel`, `bitbucket`, `bitnami`, `brew`, `cargo`, `chrome-extension`, `cocoapods`, `composer`, `conan`, `conda`, `cpan`, `cran`, `deb`, `docker`, `gem`, `generic`, `git`, `github`, `golang`, `hackage`, `hex`, `huggingface`, `julia`, `luarocks`, `maven`, `mlflow`, `npm`, `nuget`, `oci`, `opam`, `otp`, `pub`, `pypi`, `qpkg`, `rpm`, `swid`, `swift`, `vcpkg`, `vscode-extension`, `yocto`.

The common ones, from their definitions and tests:

| Type       | Namespace                                         | Name and version rules                                                                                                               | Type qualifiers                                                             | Example                                                                                                 |
| ---------- | ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| `npm`      | optional; the scope, `@` always encoded as `%40`  | Case-sensitive (old mixed-case names exist). Default repository `https://registry.npmjs.org/`.                                       | none                                                                        | `pkg:npm/%40angular/animation@12.3.1`                                                                   |
| `pypi`     | prohibited                                        | Name case-insensitive: lowercase and replace `_` with `-`. Version case-insensitive. Default `https://pypi.org`.                     | `file_name` (case-sensitive distribution file)                              | `pkg:pypi/django@1.11.1?file_name=Django-1.11.1.tar.gz`                                                 |
| `maven`    | required; groupId, case-sensitive                 | Name is the artifactId; all case-sensitive. Default `https://repo.maven.apache.org/maven2/`.                                         | `classifier`; `type` (default `jar`)                                        | `pkg:maven/org.apache.xmlgraphics/batik-anim@1.9.1?classifier=sources`                                  |
| `golang`   | required                                          | Namespace and name "shall be lowercased"; version usually a commit. The definition predates Go modules.                              | none; subpath points inside the module                                      | `pkg:golang/google.golang.org/genproto#googleapis/api/annotations`                                      |
| `cargo`    | prohibited                                        | Name case-sensitive. Default `https://crates.io/`.                                                                                   | none                                                                        | `pkg:cargo/rand@0.7.2`                                                                                  |
| `nuget`    | prohibited                                        | Name case-preserving (`case_sensitive: true`), though NuGet treats it case-insensitively. Version may have more than three segments. | none                                                                        | `pkg:nuget/EnterpriseLibrary.Common@6.0.1304`                                                           |
| `gem`      | prohibited                                        | Default `https://rubygems.org`.                                                                                                      | `platform` (default `ruby`)                                                 | `pkg:gem/jruby-launcher@1.1.2?platform=java`                                                            |
| `docker`   | optional; registry/user/organization              | Version is a tag or image id; a `sha256` id is preferred because tags move. Default `https://hub.docker.com`.                        | `repository_url` for other registries                                       | `pkg:docker/customer/dockerimage@sha256:244fd47e07d10?repository_url=gcr.io`                            |
| `oci`      | prohibited                                        | Name is the last repository segment, lowercased. Version is `sha256:<lowercase hex digest>` and identifies the artifact.             | `arch`, `repository_url`, `tag`                                             | `pkg:oci/debian@sha256:244fd47e07d10?arch=amd64&repository_url=docker.io%2Flibrary%2Fdebian&tag=latest` |
| `github`   | required; user or organization, lowercased        | Name lowercased; version a commit or tag. Default `https://github.com`.                                                              | none                                                                        | `pkg:github/package-url/purl-spec@244fd47e07d1004`                                                      |
| `git`      | required; the host path, case-sensitive           | Name is the repository path; version a git reference, ideally a commit or tag. No default repository.                                | none                                                                        | `pkg:git/codeberg.org/forgejo/forgejo@a72d2c07cfca03b55371089de6aa230d8c951fa0`                         |
| `deb`      | required; vendor (`debian`, `ubuntu`), lowercased | Name lowercased; version of the binary or source package.                                                                            | `arch` (`arch=source` for source packages); examples add `distro`           | `pkg:deb/debian/curl@7.50.3-1?arch=i386&distro=jessie`                                                  |
| `rpm`      | required; vendor, lowercased                      | Name case-sensitive; version is `version-release`.                                                                                   | `epoch` (strongly encouraged when it exists), `arch`; examples add `distro` | `pkg:rpm/fedora/centerim@4.22.10-1.el6?arch=i686&epoch=1&distro=fedora-25`                              |
| `composer` | required; vendor, lowercased                      | Name lowercased. Default `https://packagist.org`.                                                                                    | none                                                                        | `pkg:composer/laravel/laravel@5.5.0`                                                                    |
| `swift`    | required; source host and owner                   | Case-sensitive.                                                                                                                      | none                                                                        | `pkg:swift/github.com/Alamofire/Alamofire@5.4.3`                                                        |
| `generic`  | optional                                          | No public repository; the name may be a file or directory name. Use another type, or propose a new one, when possible.               | `download_url`, `checksum`                                                  | `pkg:generic/openssl@1.1.10g?download_url=https:%2F%2Fopenssl.org%2Fsource%2Fopenssl-1.1.0g.tar.gz`     |

Other rules worth knowing: `hackage` names use kebab-case; `pub` names allow only `[a-z0-9_]`; `chrome-extension` names match `^[a-p]{32}$`; `julia` requires a `uuid` qualifier; `swid` requires `tag_id`; `conan` uses `user`, `channel`, `rrev` and `prev`; `cpan` names are distribution names without `::`, with the CPAN ID preferably in the `author` qualifier; `brew` encodes `@` in versioned formula names (`pkg:brew/postgresql%4012@12.17`); `huggingface` versions are lowercased commit hashes.

Some definitions are internally inconsistent: `golang` sets `case_sensitive: true` on namespace and name while its notes say they "shall be lowercased", and its tests only exercise lowercase values. Flag such a case to the user instead of silently rewriting identifiers, and check the definition's latest revision.

## Recommended qualifiers

Keep qualifiers to the minimum needed to identify or locate the package; put long metadata in attributes outside the purl (qualifiers guidance; 2nd Edition draft Annex B.1).

| Key              | Use                                                                                                                                                                                                            |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `repository_url` | A package repository when the type has no `default_repository_url` or several repositories are common. Never put a host in the namespace instead.                                                              |
| `download_url`   | A direct download URL, for when it cannot be derived from the purl or the package manager.                                                                                                                     |
| `vcs_url`        | A version-control location in pip VCS syntax: `<vcs_tool>+<transport>://<host>[/<path>][@<revision>][#<sub_path>]`, for example `git+https://…@cc55108da32`. No user name or password in the host.             |
| `file_name`      | The file name of a package archive. Use the subpath for a file inside the package.                                                                                                                             |
| `checksum`       | One or more `lowercase_algorithm:lowercase_hex` values, comma-separated (the comma encoded as `%2C`). Algorithm keys include `sha1`, `sha256`, `sha384`, `sha512`, `sha3-256`, `blake2b-256`, `blake3`, `md5`. |
| `vers`           | A VERS range instead of a single version; mutually exclusive with the version component.                                                                                                                       |

Every URL-valued qualifier is percent-encoded like any other value: `vcs_url=git%2Bhttps:%2F%2Fgit.fsfe.org%2Fdxtr%2Fbitwarderl%40cc55108da32`. Annex B.3.5 (draft) lists the accepted VCS schemes: `git`, `git+git`, `git+https`, `git+http`, `git+ssh`; `hg+http`, `hg+https`, `hg+static-http`, `hg+ssh`; `svn`, `svn+svn`, `svn+http`, `svn+https`, `svn+ssh`; and `bzr+http`, `bzr+https`, `bzr+ssh`, `bzr+sftp`, `bzr+ftp`, `bzr+lp`.

Type definitions add their own keys (`arch`, `distro`, `classifier`, `platform`, `epoch`, …). A type may declare a `default_value`; for example maven `type` defaults to `jar` and gem `platform` to `ruby`.
