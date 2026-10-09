---
name: trusted-publishing
description: >-
  Trusted publishing: publish npm and PyPI packages from CI with OIDC instead of long-lived tokens. Covers npm trusted publishing, PyPI trusted publishing. Use when publishing packages with OIDC trusted publishers. Triggers: trusted publishing, OIDC.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.1.0"
  kind: standard
---

# Trusted publishing

Trusted publishing on npm and PyPI: a package registry trusts a specific CI workflow through OpenID Connect and mints a short-lived publish token for it, so no long-lived token is stored. Read from the npm documentation and PyPI (Warehouse) documentation Markdown sources at pinned commits.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources). Quoted requirements are sentences taken from the pinned text, labelled with the section they come from. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: Package maintainer who configures a trusted publisher on the registry, or owner of the CI workflow that publishes through it.
- Target version: npm trusted publishing (current); PyPI trusted publishing (current). See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill, re-read every URL in [Sources](#sources) and check the publisher for a newer revision or version line.

## Invariants

1. **GitHub Actions configuration.** "The critical requirement is the `id-token: write` permission, which allows GitHub Actions to generate OIDC tokens."
2. **Troubleshooting.** "To publish from GitHub, your package's `repository.url` field in `package.json` must exactly match your GitHub repository."
3. **GitHub Actions: The easy way.** "Note the `id-token: write` permission: you **must** provide this permission at either the job level (**strongly recommended**) or workflow level (**discouraged**)."
4. **General considerations.** "In practice, this means that users of Trusted Publishing must protect and secure the CI/CD workflows that they register as Trusted Publishers, as weaknesses in those workflows can be equivalent to credential compromise."
5. **GitHub Actions: Considerations.** "Trust the correct workflow: you shouldn't trust every workflow to upload to PyPI; instead, you should isolate responsibility to the smallest (and least-privileged) possible separate workflow."

## Workflow

1. **Pick the version.** Use the current line unless a named consumer needs a supported one. Do not author a legacy line. Emit a preview only when its posture is build and the user asked for that draft.
   -> [`references/versions.md`](references/versions.md)
   ✓ The target version is recorded, and it is not a legacy line.
2. **Apply the pinned requirements.** Walk the quotes in [`references/requirements.md`](references/requirements.md) and implement each one that applies to the role.
   -> [`references/requirements.md`](references/requirements.md)
   ✓ Each applicable quote is either implemented or recorded as out of scope for the role, with the section it came from.
3. **Upgrade** (only when asked). Follow the upgrade section from the source line to the target.
   -> [`references/versions.md`](references/versions.md)
   ✓ The result cites the target line and no longer depends on a requirement that only the old line stated.

## Verify before done

- [ ] The artifact cites the target line's revision from [Sources](#sources).
- [ ] Every applicable quoted requirement in [`references/requirements.md`](references/requirements.md) holds.
- [ ] The trusted publisher on the registry names the exact repository, workflow file and environment that publish, and the publish job alone holds `id-token: write`.
- [ ] Nothing from a preview line is emitted unless its posture is build and the user opted in.

## Reference index

- **`references/versions.md`**: every version line, which one to use, and how to upgrade. Load for steps 1 and 3.
- **`references/requirements.md`**: quotes taken from the pinned specification, grouped by source. Load for step 2.

## Related skills

Install related spec skills by name with `npx skills add ScaleDockHQ/scaledock-skills --skill <name>`: `slsa`, `sigstore`, `openid-connect`, `owasp-ci-cd-top-10`.

## Sources

Status uses the publishing body's own maturity term. Checked is the date the source was last read.

- [npm: Trusted publishing for npm packages](https://raw.githubusercontent.com/npm/documentation/48e397113e76387d72286f2f9f532eb2781a56eb/content/packages-and-modules/securing-your-code/trusted-publishers.mdx): Documentation, Commit 48e397113e76 (2026-10-02), checked 2026-10-06.
- [PyPI: Publishing to PyPI with a Trusted Publisher](https://raw.githubusercontent.com/pypi/warehouse/f97350ae5bd7cecc7254e5994ee484d047184591/docs/user/trusted-publishers/index.md): Documentation, Commit f97350ae5bd7 (2026-10-06), checked 2026-10-06.
- [PyPI: Publishing with a Trusted Publisher](https://raw.githubusercontent.com/pypi/warehouse/f97350ae5bd7cecc7254e5994ee484d047184591/docs/user/trusted-publishers/using-a-publisher.md): Documentation, Commit f97350ae5bd7 (2026-10-06), checked 2026-10-06.
- [PyPI: Security model and considerations](https://raw.githubusercontent.com/pypi/warehouse/f97350ae5bd7cecc7254e5994ee484d047184591/docs/user/trusted-publishers/security-model.md): Documentation, Commit f97350ae5bd7 (2026-10-06), checked 2026-10-06.
