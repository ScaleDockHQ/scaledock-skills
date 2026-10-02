# Workload Endpoint and Workload API

Sources: [SPIFFE Workload Endpoint](https://raw.githubusercontent.com/spiffe/spiffe/main/standards/SPIFFE_Workload_Endpoint.md) (Endpoint) and [SPIFFE Workload API](https://raw.githubusercontent.com/spiffe/spiffe/main/standards/SPIFFE_Workload_API.md) (API), both Stable at `main` f97c46d. API §7, the WIT-SVID profile, is Incubating.

## Workload Endpoint

### Accessibility and transport (Endpoint §2, §3)

- The endpoint SHOULD be local, and one endpoint instance SHOULD NOT be exposed to more than one host (§2).
- It MUST be served over gRPC, and clients MUST support gRPC (§3).
- Prefer a Unix domain socket. TCP MUST NOT be used unless the network lets the server strongly authenticate the workload, for example by source address on localhost or a link-local network, or by SDN policy (§3).
- Every request MUST carry the gRPC metadata `workload.spiffe.io` with value `true` (case-sensitive), and the endpoint MUST reject requests without it. This blocks SSRF unless the attacker also controls outgoing gRPC metadata (§3).
- TLS MUST NOT be required, because the workload may not yet know any roots of trust (§3.1).

### Locating the endpoint (Endpoint §4)

Clients may be configured with the socket address. If not, they MUST fall back to the `SPIFFE_ENDPOINT_SOCKET` environment variable, an RFC 3986 URI:

- `unix:///path/to/endpoint.sock`: no authority, absolute path, nothing else.
- `tcp://127.0.0.1:8000`: an IP address host and a port, nothing else. `tcp://127.0.0.1:8000/foo` is invalid.

```ts
export function parseEndpointSocket(
  value: string,
):
  { kind: "unix"; path: string } | { kind: "tcp"; host: string; port: number } {
  const url = new URL(value);
  if (url.search || url.hash || url.username || url.password)
    throw new Error("no other URI components allowed");
  if (url.protocol === "unix:") {
    if (url.host || !url.pathname.startsWith("/"))
      throw new Error("unix: needs an absolute path and no authority");
    return { kind: "unix", path: decodeURIComponent(url.pathname) };
  }
  if (url.protocol === "tcp:") {
    const host = url.hostname.replace(/^\[|\]$/g, "");
    const isIp = /^\d{1,3}(\.\d{1,3}){3}$/.test(host) || host.includes(":");
    if (!isIp || !url.port || url.pathname)
      throw new Error("tcp: needs an IP address and port, and no path");
    return { kind: "tcp", host, port: Number(url.port) };
  }
  throw new Error("scheme must be unix or tcp");
}
```

### Authentication (Endpoint §5)

- The endpoint MUST NOT require direct client authentication; workloads have no secret yet.
- Implementations SHOULD identify callers out of band, for example through kernel socket state or an orchestrator that places the socket in a specific container. The method MUST NOT require the workload to actively participate.

### Error codes (Endpoint §6, Appendix A)

| gRPC code          | Condition                                                                     | Client behavior                                     |
| ------------------ | ----------------------------------------------------------------------------- | --------------------------------------------------- |
| `InvalidArgument`  | The `workload.spiffe.io` header is missing (the server MUST return this code) | Report an error and do not retry (SHOULD NOT retry) |
| `Unavailable`      | The endpoint is initializing or shedding load, or cannot be reached           | MAY retry with backoff                              |
| `PermissionDenied` | No identity is defined for the caller (SHOULD); it may not be provisioned yet | MAY retry with backoff                              |
| `Unimplemented`    | The RPC is not implemented                                                    | Report an error and do not retry                    |

### Extensibility (Endpoint §7)

- Existing services such as the Workload API MUST NOT be extended directly; add new, uniquely named gRPC services instead (Endpoint §7; API §2).
- All endpoints MUST expose the Workload API and SHOULD support gRPC Server Reflection. Without reflection, clients SHOULD assume only the Workload API is available.

## Workload API

### Profiles (API §1, §3)

- The X.509-SVID and JWT-SVID profiles are mandatory for implementations; operators MAY disable a profile in their deployment.
- The WIT-SVID profile is optional (§1) and Incubating (§7).
- All profiles are RPCs in one `WorkloadAPI` service, defined in `workloadapi.proto` (§3).

### Client and server behavior (API §4)

- **Caller identity (§4.1).** The endpoint implementation identifies the caller; the API uses that to decide what to serve.
- **Connection lifetime (§4.2).** Clients SHOULD keep the stream open as long as possible and SHOULD reconnect immediately when it ends, or they fall out of date.
- **Stream responses (§4.3).** Every message MUST carry the full set of information, not a diff. A client request MUST trigger a response, so the first message is sent as soon as possible. Servers may add jitter so that a fleet does not reload at once.
- **Defaults and redaction (§4.4).** A field with a default or empty value MUST replace the previous value; clients MUST NOT keep the old one. Clients SHOULD treat missing data as a redaction, for example by unloading a bundle that no longer appears.
- **Mandatory fields (§4.5).** Servers SHOULD answer a message with a default-valued mandatory field with `InvalidArgument`. Clients SHOULD report an error and discard such a message.
- **Federated bundles (§4.6).** Authenticate a peer with the bundle for the peer's trust domain. With no matching bundle, the peer is untrusted. This replaces URI name constraints, which X.509 libraries rarely support.

### X.509-SVID profile (API §5)

| RPC                         | Request                 | Response                                             |
| --------------------------- | ----------------------- | ---------------------------------------------------- |
| `FetchX509SVID` (stream)    | `X509SVIDRequest {}`    | `X509SVIDResponse { svids, crl, federated_bundles }` |
| `FetchX509Bundles` (stream) | `X509BundlesRequest {}` | `X509BundlesResponse { crl, bundles }`               |

- `FetchX509SVID` (§5.2.1):
  - `svids` MUST contain one or more `X509SVID` messages, one per identity; `crl` and `federated_bundles` are optional.
  - Each `X509SVID` has `spiffe_id`, `x509_svid` (DER chain with the leaf first), `x509_svid_key` (unencrypted DER PKCS#8) and `bundle` (DER), all mandatory, plus an optional `hint`.
  - A non-empty `hint` MUST be unique in the response; on duplicates, clients SHOULD pick the first.
  - `federated_bundles` is keyed by the foreign trust domain's SPIFFE ID (§5.1).
  - With no entitled SVIDs the server SHOULD return `PermissionDenied`; the client MAY retry after backoff and SHOULD stop using redacted SVIDs.
  - These bundles MUST only be used to authenticate X.509-SVIDs.
- `FetchX509Bundles` (§5.2.2): `bundles`, keyed by trust domain SPIFFE ID, MUST include at least the server's own trust domain. Bundles are used only for X.509-SVIDs. `PermissionDenied` and redaction work as above.

### JWT-SVID profile (API §6)

| RPC                        | Request                                     | Response                                        |
| -------------------------- | ------------------------------------------- | ----------------------------------------------- |
| `FetchJWTSVID` (unary)     | `JWTSVIDRequest { audience, spiffe_id }`    | `JWTSVIDResponse { svids }`                     |
| `FetchJWTBundles` (stream) | `JWTBundlesRequest {}`                      | `JWTBundlesResponse { bundles }`                |
| `ValidateJWTSVID` (unary)  | `ValidateJWTSVIDRequest { audience, svid }` | `ValidateJWTSVIDResponse { spiffe_id, claims }` |

- `FetchJWTSVID` (§6.2.1):
  - `audience` is mandatory and MUST hold the value for the `aud` claim; `spiffe_id` is optional, and without it the server MUST return JWT-SVIDs for all authorized identities.
  - `svids` MUST contain one or more `JWTSVID { spiffe_id, svid, hint }`; `hint` rules match the X.509 profile.
  - The server SHOULD return `PermissionDenied` when the client is not authorized for any or the requested identity.
- `FetchJWTBundles` (§6.2.2):
  - `bundles` MUST include at least the server's own trust domain, as JWK Sets keyed by trust domain SPIFFE ID.
  - The server MUST NOT include keys with other uses.
  - `PermissionDenied` and redaction work as in the X.509 profile.
- `ValidateJWTSVID` (§6.2.3): the server MUST validate the token per the JWT-SVID specification. Claims SHOULD be returned, and non-SPIFFE claims MAY be filtered. All request and response fields are mandatory.
- Validation guidance (§6.3):
  - Clients SHOULD use `ValidateJWTSVID` when they can.
  - Legacy validators can be fed bundles from `FetchJWTBundles`.
  - The validator MUST use the bundle of the subject's trust domain; with no bundle, the token is untrusted.

### WIT-SVID profile (API §7, Incubating)

- `FetchWITSVID` and `FetchWITBundles` are streams. `WITSVIDRequest` has an optional `spiffe_id`. Each `WITSVID` has `spiffe_id`, `wit_svid` (compact JWS) and `wit_svid_key` (a JWK private key), all required, plus an optional `hint` (§7.1).
- A server without the profile MUST return `Unimplemented` for its RPCs, and clients SHOULD NOT retry with this profile (§7).

### Default identity (API §8)

- Workloads that do not handle multiple identities use the default identity: the first entry in `svids`.
- `hint` lets workloads that do handle multiple identities choose one, for example `internal` or `external`. Implementations SHOULD NOT support hints over 1024 bytes.
- The workload decides what to do when an expected hint is missing or an unexpected one appears.

## Client loop

```ts
interface X509Svid {
  spiffeId: string;
  chainDer: Uint8Array[];
  keyDer: Uint8Array;
  bundleDer: Uint8Array;
  hint?: string;
}
interface X509Update {
  svids: X509Svid[];
  federatedBundles: Map<string, Uint8Array>;
}

interface WorkloadApiClient {
  // Opens FetchX509SVID with metadata workload.spiffe.io: true.
  fetchX509Svid(): AsyncIterable<X509Update>;
}

export async function watchX509(
  client: WorkloadApiClient,
  apply: (update: X509Update) => void,
  isRetryable: (err: unknown) => boolean, // true for Unavailable and PermissionDenied
  sleep: (ms: number) => Promise<void>,
) {
  let backoff = 1000;
  for (;;) {
    try {
      for await (const update of client.fetchX509Svid()) {
        backoff = 1000;
        apply(update); // replace all state: missing bundles and SVIDs are redacted
      }
      // The server closed the stream: reconnect immediately (API §4.2).
    } catch (err) {
      if (!isRetryable(err)) throw err; // InvalidArgument and Unimplemented: do not retry
      await sleep(backoff);
      backoff = Math.min(backoff * 2, 30_000);
    }
  }
}
```
