# Risks API1 to API5 (2023)

Read this for step 3 of the workflow. Each entry summarises one page of the OWASP API Security Top 10 2023: the risk rating, threat agents and attack vectors, security weakness, impacts, "Is the API Vulnerable?", the example attack scenarios and "How To Prevent". Citations use the entry ID and section, with the bullet (or, where the section has no list, paragraph) number counted from the top, for example (API1:2023 Prevent 2). "Vulnerable" is the "Is the API Vulnerable?" section and "Prevent" is "How To Prevent". Sources: the 2023 risk pages listed in [Sources](../SKILL.md#sources).

Ratings follow the OWASP Risk Rating Methodology, scored by team consensus rather than data, and ignore threat-agent likelihood and business impact (API Security Risks page). Treat them as defaults, not as your severity.

## API1:2023 Broken Object Level Authorization (BOLA)

Rating: exploitability Easy, prevalence Widespread, detectability Easy, technical impact Moderate.

- **Attack vector.** The attacker changes an object ID in the request: path, query string, header or payload. The ID can be a sequential integer, a UUID or any string.
- **Weakness.** The server does not track client state and decides which object to access from client-supplied IDs. The response usually shows whether the attempt worked.
- **Impact.** Disclosure, loss or manipulation of other users' data; sometimes full account takeover.

Is the API vulnerable:

- Every endpoint that receives an object ID and acts on the object needs an object-level check that the logged-in user may perform the requested action on that object (Vulnerable 2).
- Comparing the session's user ID (for example from the JWT) with the ID parameter is not enough; it covers only a small subset of cases (Vulnerable 4).
- BOLA means the user may call the endpoint but not on that object. Reaching an endpoint the user may not call at all is API5, BFLA (Vulnerable 5).

Scenarios: shop names swapped into `/shops/{shopName}/revenue_data.json` leak thousands of stores' revenue; a vehicle API accepts any VIN and lets the attacker start, stop, lock and unlock cars they do not own; a GraphQL `deleteReports` mutation deletes any document ID without a permission check.

How to prevent:

1. Implement an authorization mechanism that relies on user policies and hierarchy.
2. Use it in every function that uses client input to access a record, checking that the logged-in user may perform the requested action on that record.
3. Prefer random, unpredictable values (GUIDs) for record IDs.
4. Write tests for the authorization mechanism and do not deploy changes that make them fail.

A clarification merged on the project's `develop` branch (issue #154, not yet on the published site) adds that GUIDs only slow enumeration: a disclosed ID is public information, and authorization must never rely on the secrecy or unpredictability of IDs. Every request verifies access independently.

References in the entry: CWE-285, CWE-639; OWASP Authorization Cheat Sheet.

## API2:2023 Broken Authentication

Rating: exploitability Easy, prevalence Common, detectability Easy, technical impact Severe.

- **Attack vector.** Authentication is exposed to everyone; tools to exploit it are widely available.
- **Weakness.** Misconceptions about authentication boundaries and implementation complexity.
- **Impact.** Full control of other users' accounts, their data and sensitive actions, indistinguishable from the real user.

Is the API vulnerable: authentication endpoints and flows, including forgot and reset password, are assets to protect. The API is vulnerable if it:

1. permits credential stuffing;
2. permits brute force on one account without captcha or lockout;
3. permits weak passwords;
4. sends auth tokens or passwords in the URL;
5. lets users change email, password or other sensitive settings without password confirmation;
6. does not validate token authenticity;
7. accepts unsigned or weakly signed JWTs (`{"alg":"none"}`);
8. does not validate JWT expiry;
9. stores passwords in plain text, unencrypted or weakly hashed;
10. uses weak encryption keys.

A microservice is also vulnerable if other microservices reach it without authentication, or if it uses weak or predictable tokens.

Scenarios: GraphQL query batching sends many `login` mutations in one request, bypassing a three-requests-per-minute rate limit; `PUT /account` changes the email without the current password, so a stolen token becomes account takeover via password reset.

How to prevent:

1. Know every authentication flow (mobile, web, deep links with one-click login); ask engineers which flows you missed.
2. Understand your mechanisms: OAuth is not authentication, and neither are API keys.
3. Do not reinvent authentication, token generation or password storage; use the standards.
4. Treat credential recovery endpoints like login for brute force, rate limiting and lockout.
5. Require re-authentication for sensitive operations (owner email, 2FA phone number).
6. Use the OWASP Authentication Cheat Sheet.
7. Implement multi-factor authentication where possible.
8. Implement anti-brute-force on authentication endpoints, stricter than the API's regular rate limiting.
9. Implement account lockout or captcha against per-user brute force, and weak-password checks.
10. Do not use API keys for user authentication; use them only for API client authentication (the `develop` branch rewords this to "API clients authorization").

References in the entry: CWE-204, CWE-307; Authentication, Key Management and Credential Stuffing cheat sheets.

## API3:2023 Broken Object Property Level Authorization (BOPLA)

Rating: exploitability Easy, prevalence Common, detectability Easy, technical impact Moderate.

Combines API3:2019 Excessive Data Exposure and API6:2019 Mass Assignment under their root cause: missing or improper authorization at the property level (Top 10 list).

- **Attack vector.** Endpoints return all of an object's properties, especially in REST; in GraphQL the attacker crafts a selection set. Hidden writable properties are found by fuzzing.
- **Weakness.** Sensitive properties appear in responses; writable properties are found by sending them and analysing the response or side effects.
- **Impact.** Disclosure, loss or corruption; sometimes privilege escalation or account takeover.

Is the API vulnerable, if an endpoint:

1. exposes object properties the user should not read (formerly Excessive Data Exposure);
2. lets the user change, add or delete a sensitive property they should not access (formerly Mass Assignment).

Scenarios: a GraphQL `reportUser` mutation returns the reported user's `fullName` and `recentLocation`; a host adds `total_stay_price` to `POST /api/host/approve_booking`; a user adds `"blocked": false` to `PUT /api/video/update_video` to unblock their video.

How to prevent:

1. When exposing an object, check that the user may access each property you expose.
2. Avoid generic serialisers such as `to_json()` and `to_string()`; cherry-pick the properties to return.
3. Avoid functions that automatically bind client input to variables, internal objects or properties (mass assignment).
4. Allow changes only to properties the client should update.
5. Add schema-based response validation as an extra layer, defining and enforcing the data every method returns.
6. Keep returned structures to the minimum the endpoint's business requirements need.

References in the entry: CWE-213, CWE-915; Mass Assignment Cheat Sheet.

## API4:2023 Unrestricted Resource Consumption

Rating: exploitability Average, prevalence Widespread, detectability Easy, technical impact Severe.

- **Attack vector.** Simple requests, concurrently from one machine or cloud resources.
- **Weakness.** APIs that do not limit interactions or consumption; found by varying parameters that control result counts and watching status, time and length. Batched operations count too.
- **Impact.** Denial of service by starvation, or higher operating cost (CPU, storage, paid integrations).

Is the API vulnerable: resources include bandwidth, CPU, memory and storage, and per-request paid integrations such as email, SMS, phone calls and biometric checks. The API is vulnerable if any of these limits is missing or set inappropriately (too low or too high):

1. execution timeouts;
2. maximum allocable memory;
3. maximum file descriptors;
4. maximum processes;
5. maximum upload file size;
6. number of operations in one client request (for example GraphQL batching);
7. records per page in one response;
8. third-party providers' spending limit.

Scenarios: a script triggers `POST /initiate_forgot_password` tens of thousands of times and the back end pays per SMS; a batched GraphQL request carries hundreds of `uploadPic` mutations, each generating thumbnails, past a per-request rate limit and size check; an 18 GB file exceeds a 15 GB cache and, with no cost alerts or caps, a monthly cloud bill goes from about US$13 to US$8k.

How to prevent:

1. Use a runtime that makes it easy to limit memory, CPU, restarts, file descriptors and processes (containers, serverless).
2. Define and enforce maximum sizes on all parameters and payloads: string length, array elements, upload size, wherever stored.
3. Rate-limit how often a client can interact with the API in a timeframe.
4. Tune rate limits to business needs; some endpoints need stricter policies.
5. Limit how often one client or user can run a single operation (validate an OTP, request password recovery).
6. Validate query string and body parameters server-side, especially those that control the number of returned records.
7. Configure spending limits for all providers and integrations; where impossible, configure billing alerts.

References in the entry: CWE-770, CWE-400, CWE-799; GraphQL Cheat Sheet ("DoS Prevention", "Mitigating Batching Attacks").

## API5:2023 Broken Function Level Authorization (BFLA)

Rating: exploitability Easy, prevalence Common, detectability Easy, technical impact Severe.

- **Attack vector.** Legitimate calls, as an anonymous or non-privileged user, to endpoints they should not reach.
- **Weakness.** Function checks live in configuration or code; many roles, groups and hierarchies make them confusing. APIs are structured, so functions are predictable.
- **Impact.** Access to unauthorised functions, especially administrative ones; disclosure, loss, corruption and service disruption.

Is the API vulnerable: analyse the authorization mechanism against the user hierarchy, roles and groups, and ask:

1. Can a regular user reach administrative endpoints?
2. Can a user perform sensitive actions (create, modify, delete) by changing the HTTP method, for example `GET` to `DELETE`?
3. Can a user in group X reach a function meant for group Y by guessing the URL and parameters (for example `/api/v1/users/export_all`)?

Do not decide whether an endpoint is regular or administrative from its URL path: administrative endpoints often sit next to regular ones, under `/api/users` as well as `/api/admins`.

Scenarios: a user turns `GET /api/invites/{invite_guid}` into `POST /api/invites/new` with `"role":"admin"` and creates an admin account; `GET /api/admin/v1/users/all` has no function-level check and is found by guessing.

How to prevent: have a consistent, easy-to-analyse authorization module invoked from all business functions, often a component outside the application code.

1. Deny by default, requiring explicit grants to specific roles for every function.
2. Review endpoints for function-level flaws with the business logic and group hierarchy in mind.
3. Make all administrative controllers inherit from an administrative abstract controller that checks group or role.
4. Make administrative functions inside regular controllers check group and role.

References in the entry: CWE-285; Forced Browsing; OWASP Top 10 2013 A7.
