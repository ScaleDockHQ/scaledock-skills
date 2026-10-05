# Authorization patterns

Read this when designing an authorization decision in Rego and the code that asks OPA for it. Each pattern is assembled from rules in OPA Policy Language, Rego Keyword: import, OPA Policy Testing, OPA REST API and OPA Policy Performance, listed in [Sources](../SKILL.md#sources). Where a recommendation combines several documented rules, the rules are cited.

## Deny by default

An undefined rule produces no value, and a `default` gives the value used when every rule of that name is undefined (Policy Language, The Basics; Default Keyword). So an `allow` decision starts denied and each `allow if` rule opens one case; the rules are OR-ed (Incremental Definitions).

```rego
package httpapi.authz

default allow := false

# anyone may create a user
allow if {
    input.method == "POST"
    input.path == ["users"]
}

# users may read their own profile
allow if {
    input.method == "GET"
    input.path == ["users", input.user_id]
}
```

This mirrors the Policy Testing example. Rules to keep:

- Never write an `allow` rule whose body can succeed when an `input` field is missing. A reference to a missing field is undefined, which fails the body, so positive checks are safe. A `not` over a missing field succeeds, so an allow condition written as `not input.user.suspended` grants access when `suspended` is absent (Policy Language, Negation). Prefer positive conditions in allow rules, and put `not` in deny rules.
- In deny rules the opposite holds: a positive check or a `!=` on a missing field never fires, so the denial is lost. Phrase deny conditions as `not <required condition>` (next section).
- A failing built-in is undefined by default (Policy Language, Built-in Functions, Errors). In an allow rule that fails closed; inside `not` it fails open. Guard with a positive check, as in the documented JWT example where `io.jwt.verify_hs256(input.token, "secret")` must hold before the payload is read.

## Deny set with reasons

Collect reasons in a partial set and derive the decision from it. The documentation shows the shape `allow if count(deny) == 0` with `deny contains "not admin" if input.user.role != "admin"` (Rego Keyword: import, Importing `rego.v1`). That deny rule fails open: `!=` on an undefined value is undefined (Policy Language, The Basics), so with `input` `{}` OPA v1.21.1 returns `deny: []` and `allow: true`. Write each deny condition as `not` over the condition that must hold, and import `future.keywords.not` so a composite negation also succeeds when a sub-expression is undefined (Rego Keyword: not, Improved Negation Semantics):

```rego
package example

import future.keywords.not

default allow := false

allow if count(deny) == 0

deny contains "role must be admin" if not input.user.role == "admin"

deny contains "missing scope orders:read" if not "orders:read" in input.token.scopes

deny contains $"role {input.user.role} may not delete" if {
    input.method == "DELETE"
    not input.user.role in {"owner", "admin"}
}
```

Checked with OPA v1.21.1 against `input` `{}`: both of the first two reasons are reported and `allow` is false. Without the `future.keywords.not` import, the `in` reason is silently dropped, because the undefined `input.token.scopes` fails the rule before the `not`.

- A partial set rule with no members evaluates to an empty set (OPA v1.21.1 returns `"deny": []`), so `count(deny) == 0` holds when nothing is denied.
- String interpolation keeps the message when a referenced value is undefined (it renders `<undefined>`), where `sprintf` drops the whole message and so drops the denial (Policy Language, String Interpolation, Undefined values). Use `$"..."` for deny messages when every consumer runs OPA v1.12.0 or later.
- `future.keywords.not` needs OPA v1.17.0 or later on every consumer. For older consumers, guard composite negations with a positive existence rule, for example a separate `deny contains "missing scopes" if not input.token.scopes` (a bare reference, which legacy negation handles).
- If you add `allow` rules alongside the deny set, keep `default allow := false` and add `count(deny) == 0` to each allow rule so a reason always blocks.

## Roles and permissions from data

Keep role bindings and permissions in `data` (bundles or the Data API) and the logic in Rego (OPA Philosophy, The OPA Document Model).

```rego
package rbac

default allow := false

allow if {
    some role in data.bindings[input.user]
    some grant in data.permissions[role]
    grant.action == input.action
    grant.type == input.type
}
```

- Key data by identifier (`data.bindings[input.user]`) instead of scanning arrays: object lookup needs no search (Policy Performance, Use objects over arrays).
- A reference into base data whose last element is the only variable, such as `data.groups.admins.members[input.subject]`, is indexed as one hash lookup on an object (Policy Performance, Bare reference statements).

## Structured decisions

Return an object when the caller needs more than a boolean. Every field needs a defined value, so build it from rules that have defaults:

```rego
package authz

import future.keywords.not

default allow := false

allow if count(deny) == 0

deny contains "missing scope" if not "orders:read" in input.token.scopes

decision := {"allow": allow, "reasons": deny}
```

`decision` is always defined because `allow` has a default and `deny` is a set. Query `data.authz.decision`. With OPA v1.21.1 and `input` `{}` it returns `{"allow": false, "reasons": ["missing scope"]}`; without the import it returns `{"allow": true, "reasons": []}`.

## Ordered decisions

`else` chains evaluate in order and stop at the first match, which suits rules ported from order-sensitive systems like firewalls (Policy Language, Else Keyword). End the chain in a value that denies, or give the rule a `default`.

```rego
default authorize := "deny"

authorize := "allow" if {
    input.user == "superuser"
} else := "deny" if {
    input.path[0] == "admin"
    input.source_network == "external"
}
```

## Calling OPA for a decision

- Query the decision path with the request as `input`: `POST /v1/data/httpapi/authz/allow` with body `{"input": {...}}` (REST API, Get a Document (with Input)).
- HTTP 200 without a `result` key means the document is undefined. With a `default`, a defined result always comes back, so a missing `result` usually means a wrong path. Deny in that case, and deny on 400, 500, timeouts and connection errors.
- `decision_id` in the response correlates with decision logs when logging is enabled (REST API, Response Message).
- Add `strict-builtin-errors=true` to turn built-in errors into request errors instead of undefined values, when silent undefined values would hide bugs (REST API, Query Parameters; Policy Language, Errors).
- OPA 1.x binds the server to `localhost` by default; expose it with `--addr` only where needed (Upgrading to v1.0, Upgrading OPA Instances).

## Testing the decision

For each `allow` and `deny` rule, write one test that hits it and one that just misses it, and test the empty input (Policy Testing, Getting Started):

```rego
package httpapi.authz_test

import data.httpapi.authz

test_post_users_allowed if {
    authz.allow with input as {"method": "POST", "path": ["users"]}
}

test_other_users_profile_denied if {
    not authz.allow with input as {"method": "GET", "path": ["users", "bob"], "user_id": "alice"}
}

test_empty_input_denied if {
    not authz.allow with input as {}
}
```

Testing and coverage are in [`testing-and-tooling.md`](testing-and-tooling.md).
