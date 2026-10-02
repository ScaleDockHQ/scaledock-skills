# Specs on the ScaleDock stack

Check option names against the installed packages and the PermDock docs MCP (`https://permdock.dev/mcp`) before you use them.

| Need                         | Spec skill       | ScaleDock implementation                                                                                                       |
| ---------------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| SSO sign-in                  | `openid-connect` | Supabase Auth SSO for the app; `subjectFromJwt` from `permdock/jwt` with `discovery` and `audience` for other issuers          |
| Role and group claims        | `jwt`, `scim`    | `permdock/jwt` maps `roles`, `groups` and `entitlements` claims into principal roles and memberships                           |
| Provisioning                 | `scim`           | `scimHandler({ store, tenant, token })` from `permdock/scim`; `directoryMembershipSource(store)` as `memberships`              |
| Deprovisioning effects       | `scim`           | Pass the app's `revocations` feed to `scimHandler` so open streams revalidate and close                                        |
| Session revocation           | `shared-signals` | `createPermDock(policy, { issuer, audience, jwks, subject, onEvent })` from `permdock/ssf`; `receiver.push` or `receiver.poll` |
| IdP logout                   | `openid-connect` | Back-Channel Logout `logout_token` into the same `permdock/ssf` receiver                                                       |
| Cache invalidation (Next.js) | `shared-signals` | `updateTag(snapshotTag(subject.id))` in `onEvent` handlers                                                                     |
| Pending approvals            | `shared-signals` | Pass `approvals` so `session-revoked` cancels that principal's pending approvals                                               |
| FAPI 2.0                     | `fapi`           | `permdock/jwt` `profile: 'fapi2'`; `permdock openapi emit --profile fapi2`                                                     |
| Workload identity            | `spiffe`         | Verify the SVID, then map it to a workload principal; in CI use `subjectFromCiOidc` from `permdock/jwt`                        |
| Tenant isolation             | none (PermDock)  | `tenant` on every adapter and handler; one SCIM token hash and one SSF stream per tenant                                       |

## Mapping directory groups to roles

Keep declared PermDock roles small and assignable. Map each IdP group to one declared role per tenant in configuration, not in code. Unknown or non-assignable role names from SCIM are stored but dropped when memberships are read, so a misconfigured IdP cannot grant a role the product does not offer.

## What the customer configures

- In their IdP: the SSO app, the SCIM base URL and token for their tenant, and the SSF stream pointing at the receiver's push URL (or the poll endpoint the receiver calls).
- In the product: which IdP groups map to which roles, and whether CAEP and Back-Channel Logout are on.
