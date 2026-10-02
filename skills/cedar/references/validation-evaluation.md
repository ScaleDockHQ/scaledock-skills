# Evaluation, validation and integration

Sources: How Cedar authorization works, Policy validation against schema, Cedar security, and the Cedar v4.13.0 release notes.

## Authorization algorithm

1. Evaluate every policy against the request. Each returns `true` (satisfied), `false`, or `error`.
2. If any `forbid` is `true`, the decision is `Deny`.
3. Else, if any `permit` is `true`, the decision is `Allow`.
4. Otherwise the decision is `Deny`.

The response includes the decision and diagnostics: the **determining policies** and any **errors**. For `Allow`, the determining policies are the satisfied `permit` policies; otherwise they are the satisfied `forbid` policies, and the list is empty when nothing was satisfied. The IDs of policies that errored are always included.

Properties: **default deny**, **forbid overrides permit**, and **skip on error**. A policy that errors does not take part in the decision. Cedar chose skip on error over deny on error for safety: with deny on error, one faulty policy among many could start denying every request. Applications can inspect the diagnostics and decide differently when a policy errors.

Engineering consequences:

- Log the errors in every response and alert on them; an erroring `forbid` silently stops protecting.
- Prefer validation (below) so errors cannot occur for well-formed requests.

## Policy evaluation

- A policy **matches** when its principal, action and resource constraints all evaluate to `true` with P, A and R bound. Scope evaluation cannot error.
- If it matches, `when` and `unless` conditions are evaluated in order with P, A, R and C bound. The policy is satisfied when every `when` is `true` and every `unless` is `false`.

## Validation

Validation compares policies with a schema. The authorizer does not validate when it evaluates a request, so validate before policies are used, and again when the schema changes.

Errors:

- unrecognized entity types and actions;
- action applied to an unsupported principal or resource (a warning since SDK 4.13.0, below);
- improper use of `in` or `==`;
- unrecognized attributes;
- unsafe access to optional attributes (guard with `has`);
- type mismatch in operators;
- invalid entity literals of enumerated entity types.

Warnings:

- conditions that always evaluate to false, so the policy never applies;
- mixed-script strings and identifiers;
- bidirectional text control characters;
- unexpected characters in entity identifiers.

**SDK 4.13.0 change**: invalid action application ("Unable to find an applicable action given the policy scope constraints") is now a validation warning instead of an error, because it means the policy cannot apply, not that it may error. Callers who still want to reject these policies check the warnings for `InvalidActionApplication`.

### Validation soundness

If policies are valid and requests and entities follow the schema, evaluation avoids the listed errors. Remaining possible errors:

- integer overflow on `Long` arithmetic;
- missing entities referenced by a policy;
- invalid extension constructor arguments, in non-strict mode.

Requests must follow the schema: the action is listed in `actions`, and principal, resource and context have the types given for it; entities have the declared shape. The application is responsible for this; the Cedar CLI and the Rust `Request::new()` can optionally check requests, and schema-based parsing checks entity and context JSON.

## Integration checklist

- [ ] Authenticate the caller before building the request; Cedar does not authenticate.
- [ ] Bound the size of policies, schemas and requests accepted from users; the parsers are safe on bounded input, and bounded policies terminate.
- [ ] Validate the policy set in CI and on every policy or schema change.
- [ ] Build entity data with schema-based parsing so malformed attributes fail early.
- [ ] Log decision, determining policies and errors for each request.
- [ ] Write tests for: a plain allow, default deny with no matching policy, a `forbid` overriding a `permit`, a missing optional attribute guarded by `has`, and a template-linked policy.
