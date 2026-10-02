# Overlay recipes

Each recipe is a complete Overlay 1.2 document unless noted. The patterns follow the examples in Overlay 1.2.0 § 4.6 and the merge rules in § 4.5.4.

## Add an extension to many operations

```yaml
overlay: 1.2.0
info:
  title: Mark read operations as safe
  version: 1.0.0
extends: https://api.example.com/openapi.yaml
actions:
  - target: $.paths.*.get
    description: Every GET is safe to retry.
    update:
      x-safe: true
```

The wildcard selects every GET operation; `update` merges into each (§ 4.6.3).

## Change one description

```yaml
overlay: 1.2.0
info:
  title: Clarify the order lookup
  version: 1.0.0
actions:
  - target: $.paths['/orders/{orderId}'].get.description
    update: Returns one order. Cancelled orders are returned with status cancelled.
```

The target is a primitive, so the primitive `update` replaces it (§ 4.5.4.1, § 4.6.2).

## Add a parameter to every GET, whether or not it has parameters

```yaml
overlay: 1.2.0
info:
  title: Add a tracing header
  version: 1.0.0
actions:
  - target: $.paths.*.get
    update:
      parameters:
        - name: X-Request-Id
          in: header
          schema:
            type: string
```

Targeting `$.paths.*.get.parameters` and appending would skip operations that have no `parameters` array, because zero matches change nothing (§ 4.5.4.1). Targeting the operation instead inserts `parameters` where it is missing and concatenates where it exists (§ 4.5.4.1 merge rules).

## Remove operations before publishing

```yaml
overlay: 1.2.0
info:
  title: Partner edition
  version: 1.0.0
actions:
  - target: $.paths.*[?@['x-internal'] == true]
    description: Drop operations marked internal.
    remove: true
  - target: $.paths.*.*.parameters[?@.name == 'debug']
    description: Drop the internal debug parameter.
    remove: true
```

Removing by filter avoids array indexes, which shift as items are removed (§ 4.6.4). A path item left without operations stays in the document, so its path is still visible; remove the path itself if it should not be.

## Move (rename) a path

```yaml
overlay: 1.2.0
info:
  title: Rename /items to /products
  version: 1.0.0
actions:
  - target: $.paths
    update:
      /products: {}
  - target: $.paths['/products']
    copy: $.paths['/items']
  - target: $.paths['/items']
    remove: true
```

Ensure the target exists, copy into it, then remove the original (§ 4.6.6.3). `copy` merges into existing nodes; it does not create the target.

## Reuse one change across many targets (1.2)

```yaml
overlay: 1.2.0
info:
  title: Standard error responses
  version: 1.0.0
components:
  actions:
    problem-404:
      description: Adds a 404 problem response.
      fields:
        update:
          "404":
            description: Not Found
            content:
              application/problem+json:
                schema:
                  type: object
actions:
  - $ref: "#/components/actions/problem-404"
    target: $.paths['/orders/{orderId}'].get.responses
  - $ref: "#/components/actions/problem-404"
    target: $.paths['/orders/{orderId}'].delete.responses
    description: Deleting a missing order returns 404.
```

The reference supplies `target`, and its `description` overrides the one in `fields` (§ 4.5.6.1). A key such as `error/v1~beta` is referenced as `#/components/actions/error~1v1~0beta` (§ 4.5.3.1).

## Let the source document mark where changes apply (traits)

The source document tags operations with an extension, and the overlay targets the tag (§ 4.6.5). The specification's example uses `x-oai-traits`:

```yaml
overlay: 1.2.0
info:
  title: Apply paging
  version: 1.0.0
actions:
  - target: $.paths.*[?@['x-oai-traits'][?@ == 'paged']]
    update:
      parameters:
        - name: top
          in: query
          schema:
            type: integer
        - name: skip
          in: query
          schema:
            type: integer
```

This inverts control: the source document decides where the overlay applies.

## Overlay 1.1 form

A 1.1 overlay has the same actions without `$self`, `components` or reusable references:

```yaml
overlay: 1.1.0
info:
  title: Mark read operations as safe
  version: 1.0.0
actions:
  - target: $.paths.*.get
    update:
      x-safe: true
```
