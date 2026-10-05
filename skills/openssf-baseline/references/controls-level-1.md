# Control families and Level 1 requirements (v2026.08.28)

Read this for steps 4 and 9 of the workflow. Source: the v2026.08.28 control catalog (`baseline/OSPS-*.yaml` at tag v2026.08.28), the version page, its checklist and lexicon, listed in [Sources](../SKILL.md#sources). Requirement text is quoted closely; the full recommendation is on the version page under each identifier.

## Identifiers and families

An identifier has the form `OSPS-<family>-<control>.<requirement>`, for example `OSPS-AC-03.02`. The numeric parts are assigned sequentially per family and carry no other meaning (Maintenance Process, Identifiers). The catalog is a Gemara `ControlCatalog`: each control has an `objective` and a list of `assessment-requirements`, each with `text`, `applicability` (`maturity-1`, `maturity-2`, `maturity-3`) and `recommendation`.

| Family | Name                     | Scope (catalog group description)                                                |
| ------ | ------------------------ | -------------------------------------------------------------------------------- |
| AC     | Access Control           | Access to the version control system and CI/CD pipelines.                        |
| BR     | Build and Release        | Tools and processes that compile, package and distribute the software.           |
| DO     | Documentation            | Information for users, contributors and maintainers.                             |
| GV     | Governance               | Policies and procedures that guide decisions and community interaction.          |
| LE     | Legal                    | Licensing and intellectual property.                                             |
| QA     | Quality                  | Quality and reliability of source code and released assets.                      |
| SA     | Security Assessment      | Identifying and addressing security vulnerabilities and threats in the software. |
| VM     | Vulnerability Management | Identifying and addressing vulnerabilities, including in dependencies.           |

Levels (Controls Overview):

- **Level 1**: any code or non-code project with any number of maintainers or users.
- **Level 2**: any code project with at least 2 maintainers and a small number of consistent users.
- **Level 3**: any code project with a large number of consistent users.

Most Level 1 requirements list all three levels in `applicability`, so they carry forward to Levels 2 and 3. Two list only `maturity-1` in the v2026.08.28 catalog: OSPS-BR-07.01 and OSPS-VM-02.01. The catalog does not explain this, and the checklist simply lists them under Level 1. Follow the catalog's applicability and say so in the assessment; note that related higher-level requirements (OSPS-VM-03.01 private reporting to the security contacts, OSPS-BR-07.02 a secrets policy) assume what these two establish.

Terms used below come from the lexicon: a **sensitive resource** is one that, if compromised, would provide a vector for further compromising build and delivery or disclosing sensitive data (build systems, image repositories, data storage); a **collaborator** is any entity with any level of permissions issued by repository administrators; the **primary branch** is the main development branch, or the original repository where branches are not used; **project documentation** includes user guides, developer guides, contribution guidelines and, at release time, provenance and licensing information.

## Level 1 requirements

24 requirements. Results: met, not met, not applicable (name the failed precondition), or unknown (evidence needs access you do not have).

### Access Control

- **OSPS-AC-01.01**: When a user attempts to read or modify a sensitive resource in the project's authoritative repository, the system MUST require multi-factor authentication. Recommendation: enforce MFA in the version control system for collaborators; passkeys are acceptable. Evidence: the organization or repository MFA requirement setting. Usually needs organization admin access.
- **OSPS-AC-02.01**: When a new collaborator is added, the version control system MUST require manual permission assignment, or default to the lowest available privileges. Evidence: the base or default permission for new members and collaborators.
- **OSPS-AC-03.01**: When a direct commit is attempted on the primary branch, an enforcement mechanism MUST prevent the change from being applied. Recommendation: branch protection on a centralized VCS, or a decentralized model where merging into the primary repository is a separate act. Evidence: a branch protection rule or ruleset that requires changes through pull requests.
- **OSPS-AC-03.02**: When an attempt is made to delete the primary branch, the version control system MUST treat this as a sensitive activity and require explicit confirmation of intent. Evidence: branch protection or ruleset that blocks deletion.

### Build and Release

- **OSPS-BR-01.01**: When a CI/CD pipeline operates on untrusted metadata, those parameters MUST be sanitized and validated before use. Recommendation: quote, escape or exit on expected values for branch names, commit messages, tags, pull request titles and author information. Evidence: workflows that pass such values through environment variables or validation, not directly into scripts.
- **OSPS-BR-01.02**: retired in v2026.02.19 (pull request #443). Do not assess.
- **OSPS-BR-01.03**: When a CI/CD pipeline operates on untrusted code snapshots, it MUST prevent access to privileged CI/CD credentials and assets. Recommendation: workflows that build or run code before collaborator review have no access to CI/CD credentials. Evidence: no privileged trigger that checks out and runs pull request code with secrets.
- **OSPS-BR-03.01**: When the project lists a URI as an official project channel, that URI MUST be delivered exclusively over encrypted channels. Recommendation: SSH or HTTPS for websites and the VCS, and only encrypted access to every tool and domain in the documentation. Evidence: every official URL is `https://` (or SSH) and does not fall back to plain HTTP.
- **OSPS-BR-03.02**: When the project lists a URI as an official distribution channel, that channel MUST be protected from adversary-in-the-middle attacks using cryptographically authenticated channels. Recommendation: HTTPS downloads, signed releases, or distribution through trusted package managers. Evidence: each distribution channel and how it is authenticated.
- **OSPS-BR-07.01**: The project MUST prevent the unintentional storage of unencrypted sensitive data, such as secrets and credentials, in the version control system. Recommendation: `.gitignore` for files that may hold secrets, plus pre-commit hooks and automated scanning. Evidence: ignore rules and an enabled secret scanning or pre-commit check.

### Documentation

- **OSPS-DO-01.01**: When the project has made a release, the project documentation MUST include user guides for all basic functionality. Recommendation: how to install, configure and use the features, with highly visible warnings for dangerous or destructive actions.
- **OSPS-DO-02.01**: When the project has made a release, the project documentation MUST include a guide for reporting defects. Recommendation: use the VCS default issue tracker, or explain an external one clearly; set triage expectations.

### Governance

- **OSPS-GV-02.01**: The project MUST have one or more mechanisms for public discussions about proposed changes and usage obstacles. Recommendation: mailing lists, instant messaging or issue trackers.
- **OSPS-GV-03.01**: The project documentation MUST include an explanation of the contribution process, or clearly state that public contributions are not accepted. Recommendation: a `CONTRIBUTING.md` or `CONTRIBUTING/` directory.

### Legal

- **OSPS-LE-02.01**: The license for the source code MUST meet the OSI Open Source Definition or the FSF Free Software Definition. Public domain release meets this if there are no other encumbrances such as patents.
- **OSPS-LE-02.02**: The license for the released software assets MUST meet the OSI Open Source Definition or the FSF Free Software Definition. It may differ from the source code license.
- **OSPS-LE-03.01**: The source code license MUST be maintained in the repository's `LICENSE` file, `COPYING` file, `LICENSES/` directory or `LICENSE/` directory. The filename may have an extension; with multiple repositories, each one includes the license.
- **OSPS-LE-03.02**: The license for released software assets MUST be included in the released source code, or in a `LICENSE` file, `COPYING` file or `LICENSE/` directory alongside the release assets.

### Quality

- **OSPS-QA-01.01**: The source code repository MUST be publicly readable at a static URL. Recommendation: avoid mirrors unless documentation makes the primary source clear, and avoid URL changes.
- **OSPS-QA-01.02**: The version control system MUST contain a publicly readable record of all changes, who made them and when. Recommendation: avoid squashing or rewriting commits in a way that obscures authorship.
- **OSPS-QA-02.01**: When the package management system supports it, the repository MUST contain a dependency list that accounts for the direct language dependencies, such as `package.json`, `Gemfile` or `go.mod`.
- **OSPS-QA-04.01**: Projects with multiple repositories MUST document a list of codebases that are part of the project, with the status and intent of each.
- **OSPS-QA-05.01**: The version control system MUST NOT contain generated executable artifacts. Generate them at build time, or store them separately and fetch them in a documented pipeline step.
- **OSPS-QA-05.02**: The version control system MUST NOT contain unreviewable binary artifacts, such as executable application binaries and library files. Images, sound and similar binary-format assets are not included.

### Vulnerability Management

- **OSPS-VM-02.01**: The project documentation MUST contain security contacts. Recommendation: a `security.md` (or similarly named) file with the contacts.

## Common mistakes

- Marking OSPS-AC-01.01 or OSPS-AC-02.01 met from a public view of the repository. These settings are not visible without admin access; Scorecard's coverage analysis classes both as not observable.
- Treating branch protection that allows administrators to bypass as meeting OSPS-AC-03.01 without recording the bypass.
- Reading OSPS-DO-01.01 and OSPS-DO-02.01 as not applicable for a project that publishes packages or tags: a release is "a version-controlled bundle of assets made available to users" (lexicon, Release).
- Counting a license detected only in the repository as meeting OSPS-LE-02.02 and OSPS-LE-03.02, which are about the released assets.
- Assessing retired OSPS-BR-01.02 because an older checklist lists it.
