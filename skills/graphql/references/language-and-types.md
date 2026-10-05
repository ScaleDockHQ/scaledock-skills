# Language and type system

Read this when writing or reviewing SDL, executable documents, or a schema builder. Section numbers are from the September 2025 edition; October 2021 numbers its Language sections one lower from § 2.2, because it has no separate Descriptions section.

## Documents and operations

- A document holds definitions: executable (operations and fragments) or type system definitions and extensions (§ 2.3). Only an ExecutableDocument with at least one operation is executable. A service that receives type system definitions in a request should return a descriptive error (§ 2.3).
- Operation types: `query` (read-only fetch), `mutation` (write followed by a fetch), `subscription` (long-lived, one result per source event) (§ 2.4).
- With one operation it may be unnamed. Query shorthand (`{ field }`) is allowed only for a lone query with no variables and no directives, and it cannot carry a description (§ 2.3, § 2.4). With several operations, every operation is named and the request names the one to run (§ 2.3).
- Descriptions are CommonMark strings placed before the definition (§ 2.2). In executable documents they are documentation only: removing them must not change validation, execution or the response (§ 2.2, § 6).

```graphql
"Fetch a user and their friends for the profile page."
query UserProfile(
  "The user to load."
  $id: ID!
  $withFriends: Boolean! = false
) {
  user(id: $id) {
    ...UserCard
    friends @include(if: $withFriends) {
      ...UserCard
    }
  }
}

fragment UserCard on User {
  id
  name
  smallPic: profilePic(size: 64)
}
```

## Lexical rules

- Names are `[_A-Za-z][_0-9A-Za-z]*`, case-sensitive, and limited to ASCII on purpose (§ 2.1.8). Names starting with `__` are reserved for introspection (§ 2.1.8, § 4).
- Commas are insignificant; trailing and repeated commas are allowed (§ 2.1.4, § 2.10.7).
- Int literals have no leading zero and cannot be followed by `.`, a digit or a name start, so `0x123` and `123L` are invalid (§ 2.10.1). Float literals need a fraction or exponent (§ 2.10.2).
- Strings: escapes `\n`, `\u000A` and `\u{1F4A9}`; an escape must encode a Unicode scalar value, so `"\uDEAD"` is a parse error; a surrogate pair of fixed-width escapes is allowed for legacy reasons but should be avoided (§ 2.10.4). When producing strings, escape control characters U+0000 to U+001F and U+007F to U+009F (§ 2.10.4).
- Block strings `"""..."""` are verbatim (no escapes) and their value strips common indentation and leading and trailing blank lines via BlockStringValue() (§ 2.10.4). Use a quoted string when non-printable characters are needed.

## Selections, fields, aliases and fragments

- A selection set is an ordered set of fields, fragment spreads and inline fragments against an object, interface or union (§ 2.5). Every operation must select down to scalar (leaf) values (§ 2.6).
- An alias changes the response name, the key in the response object; without one the field name is used (§ 2.8). Use aliases to request the same field with different arguments.
- Arguments are unordered (§ 2.7); input object fields are unordered (§ 2.10.8); directive order is significant (§ 2.13).
- Fragments are named (`fragment F on Type`) or inline (`... on Type`); a type condition must be an object, interface or union, never an input type (§ 2.9.1). An inline fragment without a type condition applies directives to a group of fields (§ 2.9.2).
- Selections on interfaces are limited to the interface's fields; reach other fields through a fragment on the concrete type (§ 3.7). Unions declare no fields, so only `__typename` may be selected without a fragment (§ 3.8).

## Values and variables

- Input values are Int, Float, String, Boolean, `null`, enum (unquoted name), list `[...]` and input object `{...}` (§ 2.10). Constant positions (default values, `ConstDirectives`) cannot use variables (§ 2.10, § 2.11).
- `null` and an omitted value are different: an explicit `null` can mean "clear" and omission "leave unchanged"; neither is accepted for a Non-Null input (§ 2.10.5).
- Variables are declared at the top of the operation with a type, an optional default, optional directives and an optional description (§ 2.11). They have operation-wide scope, so a variable used in a fragment must be defined by every operation that includes that fragment (§ 2.11).

## Directives

- Built-in directives (§ 3.13, Appendix D):

```graphql
directive @include(if: Boolean!) on FIELD | FRAGMENT_SPREAD | INLINE_FRAGMENT
directive @skip(if: Boolean!) on FIELD | FRAGMENT_SPREAD | INLINE_FRAGMENT
directive @deprecated(
  reason: String! = "No longer supported"
) on FIELD_DEFINITION | ARGUMENT_DEFINITION | INPUT_FIELD_DEFINITION | ENUM_VALUE
directive @specifiedBy(url: String!) on SCALAR
directive @oneOf on INPUT_OBJECT
```

- A field or fragment is included only if `@skip` is false and `@include` is true; neither takes precedence (§ 3.13.2).
- Implementations should provide `@skip` and `@include`; SDL implementations must provide `@deprecated` when representing deprecation, and should provide `@specifiedBy` and `@oneOf` (§ 3.13). Introspection must list every directive, built-ins included (§ 3.13).
- Custom directives should use a prefix (for example `@fb_auth`, `@rfc_live`); future built-ins will not contain `_` (§ 3.13). A directive definition needs at least one location, must not reference itself directly or indirectly, and a non-repeatable directive appears at most once per location (§ 3.13, § 5.7.3). `repeatable` allows repeats (§ 3.13).

## Schema coordinates

A schema coordinate names one schema element and contains no whitespace (§ 2.14): `Business` (type), `Business.name` (field), `SearchCriteria.filter` (input field), `SearchFilter.OPEN_NOW` (enum value), `Query.searchBusiness(criteria:)` (argument), `@private` (directive), `@private(scope:)` (directive argument). Meta-fields and introspection types are not schema elements, so coordinates such as `Business.__typename` have no defined resolution (§ 2.14).

## Schema and root types

- Type names are unique, do not clash with built-in or introspection types, and do not start with `__`; directive names are unique (§ 3.3).
- The query root type must exist and be an Object type; mutation and subscription roots are optional Object types; all provided roots are different types (§ 3.3.1).
- The `schema { ... }` definition may be omitted only when every root uses its default name (`Query`, `Mutation`, `Subscription`), no other type uses a default name, and the schema has no description (§ 3.3.1). A document has at most one schema definition (§ 3.3.1).
- Built-in scalars are omitted from SDL output; introspection includes only the built-in scalars the schema references (§ 3.5).

## Types and their validation rules

| Kind         | Key rules                                                                                                                                                                                                                                                                                   |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Scalar       | Int is 32-bit signed; Float is finite IEEE 754 double; String is Unicode; Boolean; ID serializes as String and accepts string or integer input (§ 3.5.1 to § 3.5.5). Custom scalars should have a stable `@specifiedBy` URL to a human-readable spec; built-ins must not (§ 3.5, § 3.13.4). |
| Object       | At least one field; unique field names; output types only; arguments are input types; a Non-Null argument without a default must not be deprecated; it implements each declared interface validly (§ 3.6).                                                                                  |
| Interface    | Same field rules; may implement interfaces, must list transitive ones, and must not form cycles (§ 3.7). Implementing fields keep every argument with the same type, add only optional arguments, and return the same type or a subtype (covariant) (§ 3.6 IsValidImplementation).          |
| Union        | One or more unique member types, all Object types (§ 3.8).                                                                                                                                                                                                                                  |
| Enum         | One or more unique values; output must be a defined value; string literals are not accepted as enum input in documents (§ 3.9). Transports without symbols (JSON) may pass enum variables as strings (§ 3.9).                                                                               |
| Input object | Input fields of input types; no unbroken chain of Non-Null singular fields back to itself; default values must not form cycles (§ 3.10). Unknown fields in a value are a request error (§ 3.10).                                                                                            |
| OneOf input  | `@oneOf` input object; every field nullable and without a default; the value must have exactly one non-null entry (§ 3.10, § 3.10.1).                                                                                                                                                       |
| List         | Results are ordered lists; a nullable item error becomes `null` at that index, a Non-Null item error fails the whole list (§ 3.11). A single non-list input is coerced to a list of one (§ 3.11).                                                                                           |
| Non-Null     | Cannot wrap another Non-Null (§ 3.12). Nullable inputs are optional and Non-Null inputs are required (§ 3.12). `[T!]` forbids null items; `[T]!` forbids a null list but allows an empty one (§ 3.12.1).                                                                                    |

Extensions (`extend type`, `extend schema`, and so on) must target an existing definition of the same kind, must not redefine existing fields, values, members or interfaces, and must not reapply a non-repeatable directive (§ 3.3.2, § 3.5.6, § 3.6.3, § 3.7.1, § 3.8.1, § 3.9.1, § 3.10.2).

## Deprecation

- Fields, arguments, input fields and enum values may be deprecated with `@deprecated(reason:)`; the reason is CommonMark (§ 3.13.3). Deprecated fields remain selectable (§ 3.6.2).
- A required argument or input field (Non-Null without a default) cannot be deprecated: make it nullable or give it a default first (§ 3.13.3).
- If an implementing field is deprecated, the interface field must be too (§ 3.6).
- Tools should discourage deprecated use through hiding or warnings (§ 4.2).

## Common mistakes

- Using Int for 64-bit IDs or counters: use String, ID or a custom scalar (§ 3.5.1).
- Accepting `"123"` for an Int argument: Int input accepts only integer literals and values (§ 3.5.1).
- Returning a number for an ID field: ID always serializes as a String (§ 3.5.5).
- Marking a field Non-Null when its resolver can fail: the error nulls the parent object instead (§ 3.12, § 6.4.4).
- Defining a type or field starting with `__` (§ 3.3, § 4).
