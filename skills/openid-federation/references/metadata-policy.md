# Metadata policy

Source: OpenID Federation 1.1 (Federation) § 6.1. Federation 1.0 contains the same rules.

## Principles (Federation § 6.1.1)

- **Hierarchy:** once a Superior applies a policy, Subordinates cannot repeal it or make it more permissive.
- **Equal opportunity:** every Superior can add policy, provided the combined policy stays logically sound. A conflict introduced by an Intermediate makes the chain invalid.
- **Specificity:** policies bind to one Entity Type and one metadata parameter.
- **Integral enforcement:** a chain whose policy fails to resolve, or whose metadata does not comply with the resolved policy, is invalid.
- **Determinism:** resolution and application are deterministic.

## Structure (Federation § 6.1.2)

`metadata_policy` sits in Subordinate Statements and has three levels:

1. Entity Type Identifier, for example `openid_relying_party`.
2. Metadata parameter name, optionally with a language tag.
3. Operators, which must be allowed to combine with each other.

Duplicate member names MUST NOT appear at any level.

```json
{
  "metadata_policy": {
    "openid_relying_party": {
      "id_token_signed_response_alg": {
        "default": "ES256",
        "one_of": ["ES256", "ES384", "ES512"]
      }
    }
  }
}
```

## Standard operators (Federation § 6.1.3.1)

| Operator      | Action                                                                                    | Order             | Merge across statements                                  |
| ------------- | ----------------------------------------------------------------------------------------- | ----------------- | -------------------------------------------------------- |
| `value`       | Sets the parameter. `null` removes it.                                                    | First             | Only if the values are equal. Otherwise, a policy error. |
| `add`         | Adds values that are not already present, and initializes the parameter if absent.        | After `value`     | Union.                                                   |
| `default`     | Sets the parameter only if absent.                                                        | After `add`       | Only if the values are equal. Otherwise, a policy error. |
| `one_of`      | If present, the value must be one of the listed values.                                   | After `default`   | Intersection. Empty is a policy error.                   |
| `subset_of`   | If present, the value becomes its intersection with the listed values, which can be `[]`. | After `one_of`    | Intersection, which can be `[]`.                         |
| `superset_of` | If present, the value must contain all listed values.                                     | After `subset_of` | Union.                                                   |
| `essential`   | `true` means the parameter must be present. Omitted means `false`.                        | Last              | Logical OR.                                              |

### Combination rules within one parameter policy

- `value` with `add`: the `add` values MUST be a subset of `value`.
- `value` with `default`: only if `value` is not `null`.
- `value` with `one_of`: `value` MUST be among the `one_of` values.
- `value` with `subset_of`: `value` MUST be a subset of `subset_of`.
- `value` with `superset_of`: `value` MUST be a superset of `superset_of`.
- `value` with `essential`: allowed, except `value: null` with `essential: true`.
- `add` with `subset_of`: the `add` values MUST be a subset of `subset_of`.
- `subset_of` with `superset_of`: `subset_of` MUST be a superset of `superset_of`.
- `add` and `one_of` cannot be combined. Neither can `one_of` and `subset_of`, or `one_of` and `superset_of`. Each operator's definition lists only the combinations it allows.
- `essential` combines with any operator, subject to the `value` exception above.
- A combination that is not allowed MUST produce a policy error.

### Value types

- Support for array-of-strings parameters is mandatory for `add`, `subset_of` and `superset_of`. Arrays of objects or numbers are optional.
- Support for string parameters is mandatory for `one_of`.
- `value` and `default` must support string, number, boolean and array.
- `essential` must support every JSON type, including objects.
- An unsupported type MUST produce a policy error. An operator MUST NOT output `null`.
- The space-separated `scope` client parameter is treated as an array of strings by operators, then rejoined (Federation § 6.1.3.1.8).
- `subset_of` plus `superset_of` with identical arrays expresses "set equals" (Federation § 6.1.3.1.8).

### essential with subset_of (Federation § 6.1.3.1.8, Table 1)

| essential | subset_of | Input   | Output |
| --------- | --------- | ------- | ------ |
| true      | `[a,b,c]` | `[a,e]` | `[a]`  |
| false     | `[a,b,c]` | `[a,e]` | `[a]`  |
| true      | `[a,b,c]` | `[d,e]` | `[]`   |
| false     | `[a,b,c]` | `[d,e]` | `[]`   |
| true      | `[a,b,c]` | absent  | error  |
| false     | `[a,b,c]` | absent  | absent |

## Additional operators (Federation § 6.1.3.2)

- Federations MAY define more operators that follow the principles above.
- Modifying operators run after `value`. Checking operators run before `essential`.
- Unknown additional operators MUST be ignored, unless they are listed in `metadata_policy_crit`. A listed operator that is not understood MUST produce a policy error, and the chain is invalid.

## Resolution (Federation § 6.1.4.1)

1. Collect the operator names in every `metadata_policy_crit` in the chain.
2. Iterate the Subordinate Statements from the one issued by the most Superior entity down to the one issued by the subject's Immediate Superior.
3. Validate each `metadata_policy`: its structure, allowed operator combinations, and no unsupported critical operators. A failure is a policy error.
4. The first policy found becomes the current policy. Merge each later policy into it, level by level:
   - An Entity Type present in both is merged at the parameter level. One present only in the new policy is copied in.
   - A parameter present in both is merged at the operator level. The result MUST still be an allowed combination.
   - An operator present in both is merged by its merge rule. A merge that is not allowed or fails is a policy error. An operator present only in the new policy is copied in.
5. The final current policy is the resolved policy.

Any error during resolution or application makes the chain invalid (Federation § 6.1.4).

## Application (Federation § 6.1.4.2)

1. If the subject's Immediate Superior gave `metadata` in its Subordinate Statement, apply it to the subject's Entity Configuration metadata first.
2. If no policy was resolved, that is the Resolved Metadata.
3. Otherwise, apply each parameter's operators in their defined order.
4. If application produces illegal or conflicting metadata, the chain is invalid.

```ts
type Ops = {
  value?: unknown;
  add?: unknown[];
  default?: unknown;
  one_of?: unknown[];
  subset_of?: unknown[];
  superset_of?: unknown[];
  essential?: boolean;
};

// Applies one resolved parameter policy to string or string-array values. Throws on a policy error.
function applyParam(
  present: boolean,
  input: unknown,
  ops: Ops,
): { present: boolean; value?: unknown } {
  let has = present;
  let v = input;
  if ("value" in ops) {
    if (ops.value === null) {
      has = false;
      v = undefined;
    } else {
      has = true;
      v = ops.value;
    }
  }
  if (ops.add) {
    const cur = has && Array.isArray(v) ? v : [];
    v = [...cur, ...ops.add.filter((x) => !cur.includes(x))];
    has = true;
  }
  if ("default" in ops && !has) {
    has = true;
    v = ops.default;
  }
  if (ops.one_of && has && !ops.one_of.includes(v))
    throw new Error("one_of violated");
  if (ops.subset_of && has)
    v = (v as unknown[]).filter((x) => ops.subset_of!.includes(x));
  if (
    ops.superset_of &&
    has &&
    !ops.superset_of.every((x) => (v as unknown[]).includes(x))
  )
    throw new Error("superset_of violated");
  if (ops.essential && !has) throw new Error("essential parameter missing");
  return has ? { present: true, value: v } : { present: false };
}
```

This sketch skips the `scope` string handling and object comparisons. Add both if the federation's policies need them.
