# Components and catalogs

Read this when composing a component tree, choosing or negotiating a catalog, or writing your own catalog with custom components and functions. Sources: Protocol v0.9.1 (Component model, The protocol schemas, Basic Component Catalog), the v0.9.1 basic catalog and `client_capabilities.json`, Defining Custom Functions, the Catalogs concept page, and Protocol v1.0 for the preview rules, listed in [Sources](../SKILL.md#sources).

## The component object

Each item in `components` is one component instance (Protocol v0.9.1, The component object):

- `id` (`ComponentId`, required): unique within the surface, used for parent-child references.
- `component` (string, required): the type, for example `"Text"`.
- Every other key is a property of that type (`text`, `children`, `action` and so on), placed directly on the object.

Common properties on every v0.9 component come from `ComponentCommon` in `common_types.json`, which includes `AccessibilityAttributes`.

## The adjacency list

- The UI is a flat list; containers (`Row`, `Column`, `List`, `Card`) reference children by id, and the renderer keeps a map from id to component and rebuilds the tree at render time (Protocol v0.9.1, UI composition: the adjacency list model).
- Definitions may arrive in any order. Rendering starts once `root` is defined, and later definitions fill in the tree.
- There must be exactly one component with id `root`.
- `ChildList` is either an array of ids, or a template object `{"componentId": "<template id>", "path": "<array in the data model>"}` that instantiates the template once per array item (Protocol v0.9.1, Common types).

```json
[
  {
    "id": "root",
    "component": "List",
    "children": { "path": "/employees", "componentId": "employee_row" }
  },
  { "id": "employee_row", "component": "Text", "text": { "path": "name" } }
]
```

## The basic catalog (v0.9)

The v0.9.1 basic catalog (`specification/v0_9_1/catalogs/basic/catalog.json`) declares `catalogId` and `$id` `https://a2ui.org/specification/v0_9/catalogs/basic/catalog.json`. Some prose examples use a `v0_9_1` path instead; a `catalogId` is just an agreed string, so use the value both sides advertise.

Components and their required properties, from the schema:

| Component       | Required             | Notes                                                                                                          |
| --------------- | -------------------- | -------------------------------------------------------------------------------------------------------------- |
| `Text`          | `text`               | `variant`: `h1` to `h5`, `caption`, `body`. Supports simple Markdown.                                          |
| `Image`         | `url`                | `fit`, `variant` (`icon`, `avatar`, `smallFeature`, `mediumFeature`, `largeFeature`, `header`), `description`. |
| `Icon`          | `name`               | A name from the catalog's predefined list.                                                                     |
| `Video`         | `url`                |                                                                                                                |
| `AudioPlayer`   | `url`                | `description`.                                                                                                 |
| `Row`, `Column` | `children`           | `justify`, `align`.                                                                                            |
| `List`          | `children`           | `direction` (`vertical`, `horizontal`), `align`.                                                               |
| `Card`          | `child`              |                                                                                                                |
| `Tabs`          | `tabs`               | Each tab has a title and a child.                                                                              |
| `Modal`         | `trigger`, `content` |                                                                                                                |
| `Divider`       |                      | `axis` (`horizontal`, `vertical`).                                                                             |
| `Button`        | `child`, `action`    | `variant` (`default`, `primary`, `borderless`). The label is a child component, not `text`.                    |
| `TextField`     | `label`              | `value`, `variant` (`shortText`, `longText`, `number`, `obscured`), `checks`.                                  |
| `CheckBox`      | `label`, `value`     |                                                                                                                |
| `ChoicePicker`  | `options`, `value`   | `variant` (`multipleSelection`, `mutuallyExclusive`), `displayStyle`, `filterable`.                            |
| `Slider`        | `value`, `max`       | `min`, `label`.                                                                                                |
| `DateTimeInput` | `value`              | `enableDate`, `enableTime`, `min`, `max`, `label`.                                                             |

Functions: `required`, `regex`, `length`, `numeric`, `email`, `formatString`, `formatNumber`, `formatCurrency`, `formatDate`, `pluralize`, `openUrl`, `and`, `or`, `not`. Theme properties: `primaryColor` (`#RRGGBB`), `iconUrl`, `agentDisplayName` (Protocol v0.9.1, Basic Component Catalog). The Basic Catalog Implementation Guide gives each one's renderer logic. The catalog folder also ships `rules.txt`, a plain-text prompt fragment for constraints JSON Schema expresses poorly (Evolution Guide v0.9 § 2.3).

Some prose examples in the v0.9.1 protocol document put `"text"` on a `Button` or write checks as bare `{"call": ...}`. The schema requires `child` and `action` on `Button` and `{"condition": ..., "message": ...}` for each check; follow the schema.

## Catalog identity and negotiation

- A `catalogId` is a string for matching catalogs between agent and renderer. It is conventionally a URI to avoid collisions but need not resolve; both sides must agree on shared catalogs with well-known ids. Set the catalog's JSON Schema `$id` and its `catalogId` to the same URI (Protocol v0.9.1, Catalog Identification & Compatibility).
- The agent advertises `supportedCatalogIds` and `acceptsInlineCatalogs` (default `false`) in its server capabilities (`server_capabilities.json`).
- The renderer sends `supportedCatalogIds` (required) and, only if the agent accepts them, `inlineCatalogs` under a `v0.9` key in `a2uiClientCapabilities` (`client_capabilities.json`).
- The agent picks one catalog per surface and names it in `createSurface.catalogId`; it must generate only what that catalog defines (Protocol v0.9.1, The component catalog).
- For a breaking catalog change, put the major version in the `catalogId` (for example `.../v2/catalog.json`); renderers list both during a migration and agents prefer the newer one they support (Catalogs, Major Version Bumps with CatalogId, Handling Migrations).

## Writing your own catalog

Most production apps define a catalog that matches their design system, which restricts the agent to exactly those components (Protocol v0.9.1, The component catalog; Swappable Catalogs & Validation):

1. Write a JSON Schema document with `$schema`, `$id`, `catalogId`, `components` (type name to schema), `functions`, and `$defs` with `anyComponent`, `anyFunction` and `theme`, in the same form as the basic catalog, using types from `common_types.json`. The envelope references all three through the `catalog.json` placeholder.
2. Type every component-id property as `{"$ref": "common_types.json#/$defs/ComponentId"}` and every children or template property as `{"$ref": "common_types.json#/$defs/ChildList"}`, never `"type": "string"`. Validators find tree links only through these references (Validator compliance when defining catalogs).
3. Use `Dynamic*` types (`DynamicString`, `DynamicNumber`, `DynamicBoolean`, `DynamicStringList`) for properties that may be bound to data.
4. Validate messages by mapping the envelope's placeholder `catalog.json` (referenced as `catalog.json#/$defs/anyComponent` and `catalog.json#/$defs/theme`) to your file, and put your catalog in the prompt in place of the basic one.
5. Custom functions go under `functions`, each with `call` as a `const` of its name, an `args` object schema, and `returnType`; list them in `$defs/anyFunction`, optionally alongside the basic catalog's `anyFunction` (Defining Custom Functions §§ 1 and 2). A `call` that matches no function fails validation (How Validation Works).
6. The renderer implements each custom component and function in native code. Agents can only reference them by name; wrapping existing widgets or sandboxed iframe content is the renderer developer's job, and so are its security policies (README, High-level philosophy, Flexibility).

## v1.0 catalog rules (preview, build behind a flag)

Protocol v1.0, The component catalog, Catalog Entity Naming Rules, Catalog Schema Rules and Conventions, Composition validation rules, Mixable catalogs:

- Root keys are limited to `$schema`, `$id`, `protocolVersion` (required for 1.0), `title`, `description`, `catalogId`, `instructions`, `components`, `functions` and `$defs`. `$defs` may hold only `anyComponent` and `anyFunction`; helpers are inlined.
- Each component has a required `component` property with a `const` equal to its key; do not wrap it with `ComponentCommon` (the envelope adds `id`, `catalogId`, `accessibility` and `metadata`). `$ref`s go only to the catalog's own components or functions, or to listed `common_types.json#/$defs/...` types.
- Each function declares `returnType` (now including `validationResult`) and `allowedCallers` (`rendererOnly` default, `agentOnly`, `rendererOrAgent`); `functions` is a map. `agentOnly` functions cannot be bound to UI or called by UI actions.
- Component, function and argument names MUST match UAX #31 (`^[\p{XID_Start}_][\p{XID_Continue}]*$`); `Surface` is reserved; names starting with `@` are reserved for the protocol.
- `allowedParents` and `allowedChildren` constrain nesting, with `Surface` as the top-level parent; violations are reported as `UNALLOWED_PARENT` or `UNALLOWED_CHILD`.
- A surface can mix components from several catalogs. Resolution: the component's or call's `catalogId`, then the surface default, then an error, with no fallback to advertised capabilities. All mixed catalogs must use the same spec version.
- Renderers and catalogs MUST map `accessibility` (`label`, `description`, `live`, `hidden`) to the platform's accessibility APIs, let explicit attributes override inferred ones, and lint that action and input components declare accessible labels.
