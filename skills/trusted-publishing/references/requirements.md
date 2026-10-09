# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. The registry documentation has few MUST or SHALL keywords, so the configuration rules, limits and security recommendations that drive implementation are quoted as written. Apply the ones that match the role. Each is labelled with the heading it appears under.

## npm: Trusted publishing for npm packages

Source: https://raw.githubusercontent.com/npm/documentation/48e397113e76387d72286f2f9f532eb2781a56eb/content/packages-and-modules/securing-your-code/trusted-publishers.mdx

- **How trusted publishing works.** When you configure a trusted publisher for your package, npm will accept publishes from the specific workflow you've authorized, in addition to traditional authentication methods like npm tokens and manual publishes.
- **Supported CI/CD providers.** Self-hosted runners are not currently supported but are planned for future releases.
- **GitHub Actions configuration.** The critical requirement is the `id-token: write` permission, which allows GitHub Actions to generate OIDC tokens.
- **GitLab CI/CD configuration.** Don't forget to configure id_tokens 'aud' to `"npm:registry.npmjs.org"` in your GitLab pipeline.
- **CircleCI configuration.** When `NPM_ID_TOKEN` is set, the npm CLI automatically exchanges it for a short-lived publish token.
- **Recommended: Restrict token access when using trusted publishers.** Once you've configured trusted publishers for your package, we strongly recommend restricting traditional token-based publishing access for enhanced security.
- **Automatic provenance generation.** Packages published via CircleCI trusted publishing will not include provenance attestations.
- **Prefer trusted publishing over tokens.** When trusted publishing is available for your workflow, always prefer it over long-lived tokens.
- **Troubleshooting.** All fields are case-sensitive and must be exact.
- **Troubleshooting.** npm does not verify your trusted publisher configuration when you save it.
- **Troubleshooting.** To publish from GitHub, your package's `repository.url` field in `package.json` must exactly match your GitHub repository.
- **Troubleshooting.** If your package has private dependencies and `npm install` or `npm ci` is failing with authentication errors, remember that trusted publishing is not intended for `npm install`.
- **Troubleshooting.** The `id-token: write` permission must also be given to both parent and child workflows.
- **Managing dist-tags with trusted publishing.** Permission to publish or stage a package does not grant this access automatically.

## PyPI: Publishing to PyPI with a Trusted Publisher

Source: https://raw.githubusercontent.com/pypi/warehouse/f97350ae5bd7cecc7254e5994ee484d047184591/docs/user/trusted-publishers/index.md

- **Quick background: Publishing with OpenID Connect.** The short-lived API token behaves exactly like a normal project-scoped API token, except that it's only valid for 15 minutes from time of creation (enough time for the CI to use it to upload packages).

## PyPI: Publishing with a Trusted Publisher

Source: https://raw.githubusercontent.com/pypi/warehouse/f97350ae5bd7cecc7254e5994ee484d047184591/docs/user/trusted-publishers/using-a-publisher.md

- **GitHub Actions: The easy way.** Note the `id-token: write` permission: you **must** provide this permission at either the job level (**strongly recommended**) or workflow level (**discouraged**).

## PyPI: Security model and considerations

Source: https://raw.githubusercontent.com/pypi/warehouse/f97350ae5bd7cecc7254e5994ee484d047184591/docs/user/trusted-publishers/security-model.md

- **General considerations.** Trusted Publishing does not address whether the package has been modified before or after it was built.
- **General considerations.** OIDC tokens themselves are also sensitive material that must be protected from getting stolen or leaked.
- **General considerations.** In practice, this means that users of Trusted Publishing must protect and secure the CI/CD workflows that they register as Trusted Publishers, as weaknesses in those workflows can be equivalent to credential compromise.
- **General considerations.** In summary: treat your Trusted Publishers _as if_ they are API tokens.
- **GitHub Actions: Considerations.** Trust the correct workflow: you shouldn't trust every workflow to upload to PyPI; instead, you should isolate responsibility to the smallest (and least-privileged) possible separate workflow.
- **GitHub Actions: Considerations.** This means that removing a user from a PyPI project does **not** remove any Trusted Publishers that they might have registered, and that you should include a review of any/all Trusted Publishers as part of "offboarding" a project maintainer.
- **GitHub Actions: Considerations.** By using a separate build job, you keep the number of steps that can access the OIDC token to a bare minimum.
- **GitLab CI/CD: Considerations.** However, if that username or group is deleted and a new one with the same name is created, PyPI will still recognise OIDC tokens generated by the new one as valid.
