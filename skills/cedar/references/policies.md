# Writing Cedar policies

Sources: Basic policy construction, Operators and functions, Policy templates, JSON policy format and Cedar security, in the Cedar reference guide for language version 4.5.

## Structure

```cedar
@id("photo-owner-view")
@reason("Owners can view their own photos")
permit (
  principal,
  action == PhotoFlash::Action::"viewPhoto",
  resource is PhotoFlash::Photo
)
when { resource.account.owner == principal }
unless { context.authenticated == false };
```

- **Effect**: `permit` or `forbid`.
- **Scope**: `principal`, `action` and `resource` are all present. Each is unconstrained (any value) or constrained.
- **Conditions** (optional): every `when` must be `true` and every `unless` must be `false` for the policy to be satisfied.
- **Annotations** (optional): `@name("value")` pairs before the effect, with no impact on evaluation. A value can be omitted, in which case it is `""`. `@id` is not special in the language; the CLI uses it to set policy IDs, other interfaces set IDs differently.
- The policy ends with `;`.

### Scope forms

| Element     | Forms                                                                                                                    |
| ----------- | ------------------------------------------------------------------------------------------------------------------------ |
| `principal` | `principal`, `principal == User::"…"`, `principal in Group::"…"`, `principal is User`, `principal is User in Group::"…"` |
| `action`    | `action`, `action == Action::"view"`, `action in [Action::"a", Action::"b"]`, `action in Action::"adminGroup"`           |
| `resource`  | `resource`, `resource == Photo::"…"`, `resource in Album::"…"`, `resource is Photo`, `resource is Photo in Album::"…"`   |

The guide recommends not using roles or groups as the principal itself (for example `principal == Role::"admin"`), because that prevents more specific policies later; use `principal in Role::"admin"` with the user as principal.

## Operators

| Operator                                                        | Meaning                                                                                                              |
| --------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `in`                                                            | Hierarchy membership; transitive and reflexive (`A in A` is `true`). Errors if the left side is not an entity.       |
| `has`                                                           | Attribute presence on an entity or record; also takes a path such as `principal has contactInfo.address.zip`.        |
| `.hasTag(e)`, `.getTag(e)`                                      | Tag presence and access; the tag name can be any string expression. Only entities have tags.                         |
| `is`                                                            | Entity type test.                                                                                                    |
| `like`                                                          | String match where `*` matches zero or more characters; `\*` is a literal asterisk.                                  |
| `.contains()`, `.containsAll()`, `.containsAny()`, `.isEmpty()` | Set tests.                                                                                                           |
| `==`, `!=`, `<`, `<=`, `>`, `>=`                                | Comparison; ordering applies to `Long`, `datetime` and `duration`. `decimal` uses `.lessThan()` and similar methods. |
| `&&`, `\|\|`, `!`                                               | Logical operators; `&&` and `\|\|` short-circuit.                                                                    |
| `ip()`, `decimal()`, `datetime()`, `duration()`                 | Extension constructors from strings.                                                                                 |

Access to an absent attribute is an error, so guard optional attributes: `principal has manager && principal.manager == User::"kirk"`.

## Templates

```cedar
permit (
  principal in ?principal,
  action in [Action::"view", Action::"comment"],
  resource in ?resource
)
unless { resource.tag == "private" };
```

- Placeholders are `?principal` and `?resource` only, and only in the scope, on the right of `==` or `in`, including `is … in`, but not a solitary `is`.
- A template-linked policy supplies values for every placeholder and stays linked: changing the template changes every linked policy.
- Templates tie the policy store to user lifecycle: onboarding, role changes and departures create or archive linked policies. Archive rather than delete, to keep the record of who was permitted what. The burden grows when a role needs several policies, so weigh templates against static policies on `principal in Role::"…"` with role membership in entity data.

## Patterns

- **RBAC**: users are `in` role or group entities; policies grant to `principal in Role::"…"`.
- **ABAC**: conditions compare principal, resource and context attributes, such as `resource.owner == principal` or `context.authnMfa`.
- **Guardrails**: `forbid` policies express what must never happen, because a satisfied `forbid` always overrides `permit`.
- **Action groups**: actions can be `in` other actions in the schema, so `action in Action::"readOnly"` covers a group.

## Security practices (Cedar security)

- Grant least privilege.
- Control who can modify policies; if users submit policies, limit their length.
- Do not build policy text by string concatenation; an attacker controlling input can inject Cedar code such as `principal,action,resource); //`. Use templates.
- Use unique, immutable, non-recyclable entity IDs; add the friendly name as a `//` comment.
- Cedar authorizes; it does not authenticate. Authenticate first.
- Keep authorization logic in Cedar policies rather than spread through the application.

## JSON policy format

Policies also have a JSON form with `effect`, `principal`, `action`, `resource`, `conditions` and `annotations`, and a policy set form with `staticPolicies`, `templates` and `templateLinks`. Since SDK 4.13.0, a chained `has` (`e has a.b.c`) converts to a single JSON `has` node whose `attr` is an array; a single attribute still converts as a string. Evaluation is unchanged.
