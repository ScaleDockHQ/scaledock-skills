# Testing and modeling patterns

Sources: the Testing Models, Store File Format, OpenFGA CLI and Get Started with Modeling pages, and the User Groups, Roles and Permissions, Parent-Child Objects, Public Access, Multiple Restrictions, Custom Roles, Blocklists and Usersets pages, listed in [Sources](../SKILL.md#sources). The pattern models below are the DSL form of each page's JSON, using the DSL and JSON mapping in [`modeling-language.md`](modeling-language.md).

## The `.fga.yaml` store file

Top-level keys (Testing Models, Define the model and tuples; Store File Format):

| Key                                     | Meaning                                                             |
| --------------------------------------- | ------------------------------------------------------------------- |
| `name`                                  | Optional descriptive name.                                          |
| `model` or `model_file`                 | Inline DSL, or a path to a `.fga`, `.json` or `fga.mod` model.      |
| `tuples`, `tuple_file` or `tuple_files` | Tuples for every test: inline, or `.json`, `.yaml` or `.csv` files. |
| `tests`                                 | The tests.                                                          |

Each test has an optional `name`, optional test-only tuples (`tuples`, `tuple_file`, `tuple_files`, appended to the global ones), and any of (Testing Models, Write tests):

- **`check`**: entries with `user`, `object`, optional `context`, and `assertions` as `relation: true|false`.
- **`list_objects`**: entries with `user`, `type`, optional `context`, and `assertions` as `relation: [objects]`.
- **`list_users`**: entries with `object`, `user_filter` (exactly one entry, `type` and optional `relation`), optional `context`, and `assertions` as `relation: {users: [...]}`. Users are written `type:id`, `type:id#relation` or `type:*`.

```yaml
name: Organization tests
model: |
  model
    schema 1.1

  type user

  type organization
    relations
      define member: [user]
      define admin: [user with non_expired_grant]

  condition non_expired_grant(current_time: timestamp, grant_time: timestamp, grant_duration: duration) {
    current_time < grant_time + grant_duration
  }
tuples:
  - user: user:anne
    relation: member
    object: organization:acme
  - user: user:peter
    relation: admin
    object: organization:acme
    condition:
      name: non_expired_grant
      context:
        grant_time: "2024-02-01T00:00:00Z"
        grant_duration: 1h
tests:
  - name: membership and time-bound admin
    check:
      - user: user:anne
        object: organization:acme
        assertions:
          member: true
          admin: false
      - user: user:peter
        object: organization:acme
        context:
          current_time: "2024-02-01T00:10:00Z"
        assertions:
          member: false
          admin: true
    list_objects:
      - user: user:anne
        type: organization
        assertions:
          member:
            - organization:acme
          admin: []
    list_users:
      - object: organization:acme
        user_filter:
          - type: user
        context:
          current_time: "2024-02-02T00:10:00Z"
        assertions:
          member:
            users:
              - user:anne
          admin:
            users: []
```

Good practice (Store File Format, Best Practices; Testing Models; Get Started with Modeling, 05):

- Cover every relation the application queries, with `check`, `list_objects` and `list_users`.
- Assert both "has" and "does not have". For conditions, test context values on both sides of the boundary.
- Use tuples that represent real situations with fake data.
- Keep models in `.fga`, store files in `.fga.yaml`, tuples in `.yaml`, `.json` or `.csv`, all in version control.

## The CLI and CI

- `fga model test --tests <file>.fga.yaml` runs the tests and prints a summary, or one line per failing assertion with expected and actual values (Testing Models, Running tests).
- `fga model write --store-id=… --file model.fga` (or `fga.mod`), `fga model get`, `fga model list` (Modular Models; OpenFGA CLI).
- `fga store import --file store.fga.yaml` and `fga store export --store-id=…` (Store File Format, CLI Commands).
- `fga tuple write`, `fga tuple read`, `fga tuple delete`, `fga query check`, `fga query list-objects` and `fga query list-relations` for manual work (OpenFGA CLI).
- In GitHub Actions, `openfga/action-openfga-test` with `store-file-path` runs the same tests (Testing Models, Running tests using GitHub Actions).

## Patterns

### Roles and permissions

Roles are assignable relations; permissions are computed from roles and have no type restrictions, so they can only be granted through a role (Roles and Permissions, note).

```dsl.openfga
type trip
  relations
    define owner: [user]
    define viewer: [user]
    define booking_adder: owner
    define booking_viewer: viewer or owner
```

### User groups

Assign a relation to every member of a group with a userset restriction and a userset tuple (User Groups).

```dsl.openfga
type team
  relations
    define member: [user]

type document
  relations
    define editor: [team#member]
```

Tuple: `{user: "team:writers#member", relation: "editor", object: "document:meeting_notes.doc"}`; then any member of `team:writers` is an editor. Nested groups add the userset to the group itself: `define member: [user, team#member]` (Configuration Language, Direct Relationship Type Restrictions).

### Parent-child hierarchies

Inherit through a concrete parent relation with `from` (Parent-Child Objects).

```dsl.openfga
type folder
  relations
    define editor: [user]

type document
  relations
    define parent: [folder]
    define editor: [user] or editor from parent
```

Write `{user: "folder:notes", relation: "parent", object: "document:meeting_notes.doc"}`; editors of the folder are editors of the document. The tupleset (`parent`) must hold concrete objects only.

### Public access

Add `type:*` to the restrictions and write a `type:*` tuple (Public Access).

```dsl.openfga
type document
  relations
    define view: [user, user:*]
```

`{user: "user:*", relation: "view", object: "document:company-psa.doc"}` lets every user view it. `document:*` as an object and `org:*#member` as a user are invalid.

### Multiple restrictions

Require two relations at once with `and` (Multiple Restrictions; Configuration Language, The Intersection Operator).

```dsl.openfga
type document
  relations
    define owner: [organization]
    define writer: [user]
    define can_delete: writer and member from owner
```

A writer who is not a member of the owning organization cannot delete.

### Custom roles

When roles are defined by users at run time, make the role a type and grant permissions to its assignees (Custom Roles).

```dsl.openfga
type role
  relations
    define assignee: [user]

type asset-category
  relations
    define editor: [user, role#assignee]
    define viewer: [user, role#assignee] or editor
```

Tuples: `{user: "user:anne", relation: "assignee", object: "role:media-manager"}` and `{user: "role:media-manager#assignee", relation: "editor", object: "asset-category:logos"}`.

### Blocklists

Deny a set of users with `but not` (Blocklists; Configuration Language, The Exclusion Operator).

```dsl.openfga
type team
  relations
    define member: [user]

type document
  relations
    define blocked: [user]
    define editor: [user, team#member] but not blocked
```

A blocked user loses `editor` even if a team grants it.

### Contextual and time-based access

Use conditions for time windows and IP ranges, and contextual tuples for the current organization or token claims; see [`conditions-and-modules.md`](conditions-and-modules.md).

## How Check walks the model

Check looks up the relation's definition, builds a tree of the union, intersection and exclusion of usersets, expands usersets recursively, and returns as soon as it finds the user as a leaf (Usersets, Internals).
