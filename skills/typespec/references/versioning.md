# @typespec/versioning

Read this when the API has more than one version. Sources: the Versioning guide and the Versioning decorators reference. The package is at 0.86.0 (pre-1.0) while the compiler is at 1.16.0.

## Set up

```typespec
import "@typespec/http";
import "@typespec/versioning";
using Http;
using Versioning;

@service(#{ title: "Widget Manager" })
@versioned(Versions)
namespace WidgetManager;

enum Versions {
  v1,
  v2,
  v3,
}
```

`@versioned(versions: Enum)` goes on the service namespace; the enum lists the versions in order.

## Decorators

| Decorator                                  | Meaning                                                                      |
| ------------------------------------------ | ---------------------------------------------------------------------------- |
| `@added(version)`                          | The element exists from this version on.                                     |
| `@removed(version)`                        | The element no longer exists from this version on.                           |
| `@renamedFrom(version, oldName)`           | Renamed in this version; `oldName` is the earlier name.                      |
| `@madeOptional(version)`                   | Optional from this version on; required before.                              |
| `@madeRequired(version)`                   | Required from this version on; optional before.                              |
| `@typeChangedFrom(version, oldType)`       | The property type changed in this version.                                   |
| `@returnTypeChangedFrom(version, oldType)` | The operation's return type changed in this version.                         |
| `@useDependency(...versionRecords)`        | Pins the version of a versioned library used by a service or by one version. |

## The current-state rule

Write the TypeSpec as the API is now. Each decorator names the version where the definition became accurate and, where relevant, the earlier value (Versioning guide).

```typespec
model Widget {
  @key id: string;

  @renamedFrom(Versions.v3, "name")
  @madeOptional(Versions.v3)
  description?: string;
}

@route("/widgets")
op list(): Widget[];

@added(Versions.v2)
@route("/widgets/{id}")
op get(@path id: string): Widget;
```

The emitter writes one OpenAPI file per version. Here, v1 has only `list` and a required `name`; v2 adds `get`; v3 has an optional `description` instead of `name`.

## Dependencies on versioned libraries

- In an unversioned service, put `@useDependency(Lib.Versions.vX)` on the namespace.
- In a versioned service, put it on each member of the versions enum, so each API version names the library version it uses.

## Review checklist

- [ ] Every element added after the first version has `@added`.
- [ ] Removed elements remain in the TypeSpec with `@removed`, so earlier versions still emit them.
- [ ] Renames use `@renamedFrom` on the new name, not a second property.
- [ ] Each emitted version file has been read, not just the latest.
