# Review checklist

A checklist built from the "Is the API Vulnerable?" and "How To Prevent" sections of the OWASP API Security Top 10 2023. Each item cites its entry and section (see [`risks-api1-api5.md`](risks-api1-api5.md) and [`risks-api6-api10.md`](risks-api6-api10.md)). Mark each item done, not applicable (with a reason), or a finding.

## Mapping API styles to the Top 10's terms

The Top 10 speaks of endpoints, object IDs, properties and HTTP methods, and its scenarios use REST-style HTTP and GraphQL. It names no RPC protocol. To apply it consistently, a review maps each API style onto those terms; this mapping is a reviewing convention, not text from the Top 10.

| Top 10 term            | HTTP (REST-style)                          | GraphQL                                                                        | RPC (gRPC, JSON-RPC and similar)                              |
| ---------------------- | ------------------------------------------ | ------------------------------------------------------------------------------ | ------------------------------------------------------------- |
| Endpoint / function    | method plus path                           | each query, mutation and subscription field, and each resolver that loads data | each procedure or method                                      |
| Object ID              | path, query, header or body value          | arguments and input fields of type `ID` or keys (API1:2023 scenario 3)         | request message fields that select a record                   |
| Object property        | response and request body fields           | selectable fields and input fields (API3:2023 attack vector, scenario 1)       | message fields                                                |
| HTTP method change     | `GET` to `DELETE` (API5:2023 Vulnerable 2) | a query versus a mutation on the same type                                     | a read procedure versus a write procedure on the same service |
| Operations per request | bulk endpoints                             | query batching and aliases (API2:2023 and API4:2023 scenario 2)                | batch or streaming calls                                      |

## Object and property authorization (API1, API3)

- [ ] Every function that takes a client-supplied object ID checks that the current user may perform this action on this object, through one authorization mechanism based on user policies and hierarchy. (API1:2023 Vulnerable 2; Prevent 1, 2)
- [ ] The check is not just "session user ID equals the ID parameter". (API1:2023 Vulnerable 4)
- [ ] Authorization does not depend on IDs being unguessable; random IDs are defence in depth only. (API1:2023 Prevent 3; `develop` note, issue #154)
- [ ] Automated tests cover object-level authorization and block deployment when they fail. (API1:2023 Prevent 4)
- [ ] Responses are built from an explicit list of properties per caller, not a generic serialiser. (API3:2023 Prevent 1, 2, 6)
- [ ] Input is not auto-bound to models; only properties the client may change are accepted. (API3:2023 Prevent 3, 4)
- [ ] Response schemas are defined and enforced for every method. (API3:2023 Prevent 5)

## Function authorization (API5)

- [ ] One consistent authorization module is invoked from all business functions and denies by default. (API5:2023 Prevent intro, 1)
- [ ] Administrative functions check role or group whether they sit in admin or regular controllers. (API5:2023 Prevent 3, 4)
- [ ] Regular users cannot reach admin functions by guessing paths, changing the method or calling write operations. (API5:2023 Vulnerable 1 to 3)
- [ ] Nobody classifies a function as regular or admin from its path alone. (API5:2023 Vulnerable, closing paragraphs)

## Authentication (API2)

- [ ] Every authentication flow is inventoried, including mobile, deep links and password recovery. (API2:2023 Prevent 1, 4)
- [ ] Login and recovery have anti-brute-force stricter than general rate limiting, plus lockout or captcha, and count attempts per operation, not per HTTP request (batching). (API2:2023 Prevent 4, 8, 9; scenario 1)
- [ ] Tokens are validated for authenticity and expiry; unsigned or weakly signed JWTs (`alg: none`) are rejected. (API2:2023 Vulnerable 6 to 8)
- [ ] No tokens or passwords in URLs. (API2:2023 Vulnerable 4)
- [ ] Changing email, password, 2FA phone or other sensitive settings requires re-authentication. (API2:2023 Vulnerable 5; Prevent 5)
- [ ] Passwords use standard, strong storage; weak passwords are rejected; keys are strong. (API2:2023 Vulnerable 3, 9, 10; Prevent 3, 9)
- [ ] API keys identify clients, never users; OAuth is not treated as authentication by itself. (API2:2023 Prevent 2, 10)
- [ ] Service-to-service calls are authenticated with strong, unpredictable tokens. (API2:2023 Vulnerable, microservices)

## Resource consumption (API4)

- [ ] Timeouts, memory, file descriptors, processes and upload size are bounded. (API4:2023 Vulnerable 1 to 5; Prevent 1)
- [ ] Strings, arrays and payloads have maximum sizes. (API4:2023 Prevent 2)
- [ ] Page size and other count parameters are validated server-side with a maximum. (API4:2023 Vulnerable 7; Prevent 6)
- [ ] Operations per request are bounded (GraphQL batching, bulk calls). (API4:2023 Vulnerable 6)
- [ ] Rate limits exist, tuned per endpoint, with per-operation limits for OTP checks and password recovery. (API4:2023 Prevent 3 to 5)
- [ ] Paid integrations (SMS, email, phone, biometrics, cloud egress) have spending limits or billing alerts. (API4:2023 Vulnerable 8; Prevent 7)

## Business flows (API6)

- [ ] Sensitive business flows (purchase, post, reserve, referral) are listed with the harm excessive use would cause. (API6:2023 Prevent, business layer)
- [ ] Each listed flow has anti-automation chosen for that harm: device fingerprinting, human detection, non-human pattern detection, or proxy and Tor blocking. (API6:2023 Prevent, engineering layer)
- [ ] Machine-facing APIs (developer, B2B) are secured and limited too. (API6:2023 Prevent, last paragraph)

## Outbound requests (API7, API10)

- [ ] Every feature that fetches a client-supplied URL (webhooks, imports, previews, custom SSO) is inventoried. (API7:2023 Vulnerable 2)
- [ ] The fetcher is network-isolated from internal services and metadata endpoints. (API7:2023 Prevent 1)
- [ ] Origins, schemes, ports and media types are allow-listed where possible. (API7:2023 Prevent 2)
- [ ] Redirects are disabled for user-supplied URLs, and allow-listed for integrated APIs. (API7:2023 Prevent 3; API10:2023 Prevent 4)
- [ ] One maintained URL parser is used. (API7:2023 Prevent 4)
- [ ] Raw fetched responses are not returned to clients. (API7:2023 Prevent 6)
- [ ] Data from third-party APIs is validated and sanitised before storage, queries or downstream use. (API10:2023 Vulnerable 2; Prevent 3)
- [ ] Third-party calls use TLS, timeouts and bounded response processing. (API10:2023 Vulnerable 1, 4, 5; Prevent 2)
- [ ] Providers' API security posture was assessed. (API10:2023 Prevent 1)

## Configuration (API8)

- [ ] Hardening is repeatable, configuration is reviewed across orchestration, components and cloud services, and continuously assessed. (API8:2023 Prevent 1 to 3)
- [ ] Systems are patched; unnecessary features are off. (API8:2023 Vulnerable 2, 3)
- [ ] TLS everywhere, internal hops included. (API8:2023 Prevent 4)
- [ ] Only needed HTTP methods and content types are accepted. (API8:2023 Prevent 5, 7)
- [ ] Browser-facing APIs set a proper CORS policy and security headers. (API8:2023 Prevent 6)
- [ ] Responses with private data send cache control directives. (API8:2023 Vulnerable 6; scenario 2)
- [ ] Proxies, load balancers and back ends parse requests the same way. (API8:2023 Prevent 8)
- [ ] Error responses follow a schema and carry no stack traces. (API8:2023 Vulnerable 8; Prevent 9)

## Inventory (API9)

- [ ] Every host is inventoried with environment, audience and version; every version has a retirement plan. (API9:2023 Vulnerable 1 to 4; Prevent 1)
- [ ] Integrated services and sensitive data flows are inventoried, justified and approved. (API9:2023 data flow blindspot; Prevent 2)
- [ ] Documentation covers authentication, errors, redirects, rate limiting, CORS and every endpoint, is generated from an open standard in CI/CD, and is restricted to authorised users. (API9:2023 Prevent 3 to 5)
- [ ] Non-production and older versions get the same protections as production, and no production data without production-grade security. (API9:2023 Prevent 6, 7)
- [ ] Security fixes in a new version trigger a risk decision for older versions. (API9:2023 Prevent 8)
