# Schemas, entities and requests

Sources: Cedar schema, Cedar schema format, JSON schema format, Entities and context syntax, and How Cedar authorization works, in the Cedar reference guide for language version 4.5.

## Cedar schema format

```cedarschema
namespace PhotoFlash {
  entity User in UserGroup = {
    "department": String,
    "jobLevel": Long,
  };
  entity UserGroup;
  entity Album in Album = {
    "account": Account,
    "private": Bool,
  };
  entity Account = {
    "admins"?: Set<User>,
    "owner": User,
  };
  entity Photo in Album = {
    "account": Account,
    "private": Bool,
  };
  action "viewPhoto" appliesTo {
    principal: User,
    resource: Photo,
    context: {
      "authenticated": Bool,
    }
  };
}
```

This is the PhotoFlash example from the schema format page, shortened to one action.

- **Namespaces** group declarations; a name can be qualified as `PhotoFlash::User`. Two `namespace` declarations with the same name are not allowed, and the same applies to inner declarations.
- **Entity types**: `entity User in [Group] { … }` declares parents and attributes; `?` marks an optional attribute; `tags String` allows any number of string-valued tags; `entity Group enum ["G1", "G2", "G3"]` declares an enumerated type whose only EIDs are those listed. `entity A, B, C` declares several types with the same definition.
- **Actions**: `action ViewDocument in [ReadActions] appliesTo { principal: [User, Public], resource: Document, context: { … } };`. Without `appliesTo`, an action applies to no principals, resources or contexts.
- **Common types**: `type Name = …` declares a reusable type.
- **Annotations**: `@doc("…")` can precede namespace (not the empty namespace), entity, action, common type and record attribute declarations.
- **Name resolution**: common type, then entity type, then primitive or extension type. The `__cedar` namespace is reserved, so `__cedar::Long` always means the primitive `Long`.

## JSON schema format

The same model in JSON uses `entityTypes` with `memberOfTypes` and a `shape` of type `Record`, and `actions` with `appliesTo` holding `principalTypes`, `resourceTypes` and `context`. Attributes are required by default; mark an optional one with `"required": false`.

```json
{
  "PhotoFlash": {
    "entityTypes": {
      "User": {
        "memberOfTypes": ["UserGroup"],
        "shape": {
          "type": "Record",
          "attributes": {
            "department": { "type": "String" },
            "jobLevel": { "type": "Long" }
          }
        }
      },
      "UserGroup": {}
    },
    "actions": {
      "viewPhoto": {
        "appliesTo": {
          "principalTypes": ["User"],
          "resourceTypes": ["Photo"],
          "context": {
            "type": "Record",
            "attributes": { "authenticated": { "type": "Boolean" } }
          }
        }
      }
    }
  }
}
```

The snippet omits the `Photo`, `Album` and `Account` types for brevity, so it does not validate on its own.

## Entities JSON

A JSON array of entities, each with `uid`, `parents`, `attrs` and optional `tags`:

```json
[
  {
    "uid": {
      "type": "PhotoFlash::User",
      "id": "6f1c2a9e-0d4b-4b8e-9a51-3c2f7d8e1a42"
    },
    "attrs": {
      "department": "HardwareEngineering",
      "jobLevel": 5,
      "homeIp": { "__extn": { "fn": "ip", "arg": "222.222.222.7" } }
    },
    "parents": [
      {
        "type": "PhotoFlash::UserGroup",
        "id": "b7e0c1d4-5a63-4f2e-8d19-7a4b6c2e9f10"
      }
    ]
  }
]
```

- JSON strings, integers, booleans, arrays and objects become `String`, `Long`, `Bool`, `Set` and `Record`.
- Entity references use `{ "__entity": { "type", "id" } }` and extension values use `{ "__extn": { "fn", "arg" } }`. With schema-based parsing, both escapes can be left implicit.
- Entity types are normalized: no whitespace or comments, so `"User "` is invalid.
- Use unique, immutable and non-reusable IDs.

## Context

Context is a record with the same syntax as `attrs`, such as `{ "sourceIp": "10.0.1.101", "authnMfa": true }`. Policies read it as `context.authnMfa`. Declare its shape in the action's `appliesTo`.

## Requests

A request has four parts, PARC: principal, action and resource are entity references, and context is a record. The application decides which policies and entity data are relevant to pass to the authorizer.

```ts
type EntityUid = { type: string; id: string };

type AuthorizationRequest = {
  principal: EntityUid;
  action: EntityUid;
  resource: EntityUid;
  context: Record<string, unknown>;
};

const request: AuthorizationRequest = {
  principal: {
    type: "PhotoFlash::User",
    id: "6f1c2a9e-0d4b-4b8e-9a51-3c2f7d8e1a42",
  },
  action: { type: "PhotoFlash::Action", id: "viewPhoto" },
  resource: {
    type: "PhotoFlash::Photo",
    id: "3d9a7e21-8c44-4f0b-a6d2-91e5b0c7f3a8",
  },
  context: { authenticated: true },
};
```

The shape is framework-neutral; map it to the request type of the Cedar SDK or service you call.
