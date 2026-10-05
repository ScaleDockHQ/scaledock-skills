# scaledock-enterprise-identity

An agent skill that makes a ScaleDock product enterprise-ready: OIDC and SAML SSO, passkeys, SCIM provisioning, immediate revocation through Shared Signals, NIST SP 800-63-4 assurance levels, CIBA and FAPI 2.0 when required, and workload identity, with PermDock turning what the IdP says into permissions.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill scaledock-enterprise-identity
```

It asks you to install the spec skills it builds on: `openid-connect`, `saml`, `webauthn`, `scim` and `shared-signals`, plus `nist-800-63`, `ciba`, `fapi`, `spiffe` and `wimse` when selected, and PermDock's skills (`npx skills add ScaleDockHQ/PermDock`).

Then ask your agent to "add SCIM provisioning for Okta", "add SAML SSO and passkeys", "revoke sessions when Entra says so", or "make this API FAPI 2.0 compliant".

## Rules

- The spec skills decide protocol details; this skill maps them onto Supabase Auth and PermDock.
- The IdP authenticates; PermDock authorizes from memberships and roles.
- SCIM stores directory data and never decides.
- Deprovisioning and revocation take effect on the next request.
- Every connection, token and stream belongs to one tenant.

## References

- [`references/stack.md`](references/stack.md): each spec mapped to the ScaleDock stack and the PermDock adapter.

## License

MIT
