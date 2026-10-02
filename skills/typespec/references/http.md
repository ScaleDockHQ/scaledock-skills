# @typespec/http

Read this when describing HTTP operations. Sources: the HTTP Operations, HTTP Authentication and HTTP decorators reference pages, and `lib/auth.tsp` in `@typespec/http` 1.16.0.

## Decorators

`@body`, `@bodyIgnore`, `@bodyRoot`, `@cookie`, `@delete`, `@get`, `@head`, `@header`, `@multipartBody`, `@patch`, `@path`, `@post`, `@put`, `@query`, `@route`, `@server`, `@sharedRoute`, `@statusCode`, `@useAuth`.

## Verbs and routes (HTTP Operations, Operation verb and Route)

- Without a verb decorator, an operation is `@post` if it has a request body and `@get` otherwise.
- `@route` on a namespace or interface prefixes every route beneath it.
- `{name}` in a route is a path parameter; marking the matching parameter `@path` is optional.
- Path parameters without a matching `{name}` in the route are appended to the URL.
- `@route("/files{+path}")` uses reserved expansion for a path that contains slashes (HTTP decorators reference).

```typespec
import "@typespec/http";
using Http;

@service(#{ title: "Pet Store" })
@server("https://api.example.com", "Production")
namespace PetStore;

model Pet {
  @visibility(Lifecycle.Read) id: string;
  name: string;
}

@error
model Error {
  code: string;
  message: string;
}

@route("/pets")
interface Pets {
  list(@query skip?: int32, @query top?: int32): Pet[] | Error;

  @route("{petId}")
  read(@path petId: string, @header ifMatch?: string):
    | { @statusCode statusCode: 200; @header eTag: string; @body pet: Pet }
    | { @statusCode statusCode: 404 }
    | Error;

  @post
  create(@body pet: Pet): { @statusCode statusCode: 201; @body pet: Pet } | Error;
}
```

## Parameters and bodies (HTTP Operations, Request & response bodies)

- `@query`, `@header`, `@path` and `@cookie` place a parameter. A header name is inferred from the parameter name when not given; `contentType` becomes `content-type`.
- Without `@body`, request parameters not marked `@header`, `@query` or `@path` form the request body, as a JSON object of those properties.
- Without `@body`, response properties not marked `@header` or `@statusCode` form the response body; a non-model return type is the body itself.
- `@body` makes the type exactly the body; metadata decorators inside that model are ignored with a warning.
- `@bodyRoot` also defines the body, but properties inside it marked as metadata are treated as metadata and left out of the body.
- An optional body is `@body user?: User` (OpenAPI v3 emitter, Request Body).
- `...Pet` in a parameter list spreads the model's properties into the body.

## Status codes and responses (HTTP Operations, Status codes and Built-in response shapes)

- Default status: `200`, or `4xx,5xx` when the response model has `@error`.
- `@statusCode` on a property sets the code; use number literals and a union of responses for several codes.
- Built-in shapes such as `OkResponse`, `NoContentResponse` and `NotFoundResponse`, and `Body<T>` for `{ @body body: T }`.
- Without an explicit code, a non-empty body gives `200` and an empty body gives `204`.
- An `@error` model becomes the OpenAPI `default` response (OpenAPI v3 emitter, Error Responses).

## Files and visibility

- `Http.File`, or a model that extends it, as the exact body is sent as raw content, with `contentType` mapped to `Content-Type` and `filename` to `Content-Disposition` where allowed. Narrow accepted types by overriding `contentType` (HTTP Operations, Handling files).
- Lifecycle visibility controls where a property appears: `Read` in responses, `Query` in GET and HEAD, `Create` in POST and PUT, `Update` in PATCH and PUT, `Delete` in DELETE. The OpenAPI emitter uses `readOnly: true` for read-only properties and generates suffixed schemas, such as `WidgetCreate`, for other visibilities (HTTP Operations, Automatic visibility).

## Authentication (HTTP Authentication)

`@useAuth` applies to a service namespace, sub-namespace, interface or operation, and a child's `@useAuth` replaces the parent's. To add a scheme, repeat the parent's schemes with the new one.

| Form                    | Meaning                  |
| ----------------------- | ------------------------ |
| `@useAuth(A)`           | Scheme A.                |
| `@useAuth([A, B])`      | A and B together.        |
| `@useAuth(A \| B)`      | A or B.                  |
| `@useAuth([A, B] \| C)` | A and B together, or C.  |
| `@useAuth(A \| NoAuth)` | A, or no authentication. |

Scheme models in `@typespec/http` 1.16.0 (`lib/auth.tsp`):

| Model                                        | Fields                                                                                |
| -------------------------------------------- | ------------------------------------------------------------------------------------- |
| `BasicAuth`                                  | `type: AuthType.http`, `scheme: "Basic"`                                              |
| `BearerAuth`                                 | `type: AuthType.http`, `scheme: "Bearer"`                                             |
| `ApiKeyAuth<Location, Name>`                 | `in`: `ApiKeyLocation.header`, `query` or `cookie`; `name`                            |
| `OAuth2Auth<Flows, Scopes = []>`             | `flows`, and `defaultScopes` for every flow; flow-level scopes override them          |
| `OpenIdConnectAuth<ConnectUrl, Scopes = []>` | `openIdConnectUrl` (may be relative to the server URL) and the scopes operations need |
| `NoAuth`                                     | `type: AuthType.noAuth`                                                               |

OAuth 2.0 flows: `AuthorizationCodeFlow` (`authorizationUrl`, `tokenUrl`), `ImplicitFlow` (`authorizationUrl`), `PasswordFlow` (`tokenUrl`) and `ClientCredentialsFlow` (`tokenUrl`); each takes optional `refreshUrl` and `scopes`. A custom HTTP scheme is a model with `type: Http.AuthType.http` and a `scheme` value.

```typespec
alias MyOAuth2<Scopes extends string[]> = OAuth2Auth<
  [
    {
      type: OAuth2FlowType.clientCredentials;
      tokenUrl: "https://auth.example.com/oauth2/token";
    }
  ],
  Scopes
>;

@useAuth(MyOAuth2<["pets:read"]>)
namespace PetStore;

@useAuth(MyOAuth2<["pets:write"]>)
op create(@body pet: Pet): Pet;
```

Scope support on `OpenIdConnectAuth` arrived in `@typespec/http` 1.15.0; the OpenAPI emitter writes those scopes on each operation's security requirement.
