# Risks API6 to API10 (2023)

Read this for step 3 of the workflow. Same layout and citation convention as [`risks-api1-api5.md`](risks-api1-api5.md): (API7:2023 Prevent 3) is the third bullet of "How To Prevent". Sources: the 2023 risk pages listed in [Sources](../SKILL.md#sources).

## API6:2023 Unrestricted Access to Sensitive Business Flows

Rating: exploitability Easy, prevalence Widespread, detectability Average, technical impact Moderate.

New in 2023; covers most threats that rate limiting can mitigate (release notes). It does not necessarily come from implementation bugs (Top 10 list).

- **Attack vector.** Understand the business model, find sensitive flows, and automate access to them.
- **Weakness.** No holistic view of the API against business requirements; attackers map which endpoints make up the flow and bypass existing mitigations.
- **Impact.** Usually no technical impact; business harm such as blocking legitimate purchases or inflating a game's internal economy.

Is the API vulnerable: an endpoint is vulnerable if it exposes a sensitive business flow without appropriately restricting access to it. Examples: buying a product (scalping all the stock), creating a comment or post (spam), making a reservation (reserving every slot). What counts as excessive differs by business: scripted posting is spam for one network and encouraged by another.

Scenarios: a bot distributed across IP addresses buys most of a new console's stock on release day; a user books 90% of a flight with no cancellation fee, cancels, and buys one discounted seat; a script automates sign-ups to farm referral credit.

How to prevent, in two layers:

1. **Business:** identify the flows that harm the business if used excessively.
2. **Engineering:** choose protections that mitigate that business risk. Methods that slow automated threats:
   - device fingerprinting: deny unexpected client devices such as headless browsers;
   - human detection: captcha or biometric signals such as typing patterns;
   - non-human patterns: for example "add to cart" and "complete purchase" within one second;
   - consider blocking Tor exit nodes and well-known proxies.

Also secure and limit APIs consumed directly by machines (developer and B2B APIs), which often lack these protections.

References in the entry: OWASP Automated Threats to Web Applications; API10:2019 Insufficient Logging & Monitoring.

## API7:2023 Server Side Request Forgery (SSRF)

Rating: exploitability Easy, prevalence Common, detectability Easy, technical impact Moderate.

New in 2023.

- **Attack vector.** An endpoint that fetches a client-supplied URI. Basic SSRF returns the response; blind SSRF gives no feedback and is harder.
- **Weakness.** Missing or improper validation of client-supplied URIs.
- **Impact.** Internal service enumeration (port scanning), disclosure, firewall bypass; sometimes DoS or use of the server as a proxy.

Is the API vulnerable: it fetches a remote resource without validating the user-supplied URL, so an attacker can send a crafted request to an unexpected destination even behind a firewall or VPN. Webhooks, file fetching from URLs, custom SSO and URL previews make it more common; cloud providers, Kubernetes and Docker expose HTTP management channels on predictable paths, making it more dangerous. SSRF risk cannot always be eliminated; choose protections against business risk and needs.

Scenarios: a profile-picture URL of `localhost:8080` turns the upload endpoint into a port scanner by response time; a GraphQL webhook mutation with `send_test_req: true` and the cloud metadata URL `http://169.254.169.254/latest/meta-data/iam/security-credentials/…` shows the cloud credentials in the test response.

How to prevent:

1. Isolate the resource-fetching mechanism in your network; it is usually meant for remote, not internal, resources.
2. Where possible, use allow lists of remote origins, URL schemes and ports, and accepted media types per feature.
3. Disable HTTP redirections.
4. Use a well-tested, maintained URL parser to avoid parsing inconsistencies.
5. Validate and sanitise all client-supplied input.
6. Do not send raw responses to clients.

References in the entry: CWE-918; Server-Side Request Forgery Prevention Cheat Sheet.

## API8:2023 Security Misconfiguration

Rating: exploitability Easy, prevalence Widespread, detectability Easy, technical impact Severe.

- **Attack vector.** Unpatched flaws, common endpoints, insecure default configurations, unprotected files and directories; exploits are often public.
- **Weakness.** Misconfiguration at any level of the stack, network to application; automated tools find unnecessary services and legacy options.
- **Impact.** Exposure of user data and system details, up to full server compromise.

Is the API vulnerable, if:

1. security hardening is missing in any part of the stack, or cloud service permissions are improperly configured;
2. security patches are missing or systems are out of date;
3. unnecessary features are enabled (HTTP verbs, logging features);
4. servers in the HTTP chain process requests inconsistently;
5. TLS is missing;
6. security or cache control directives are not sent to clients;
7. a CORS policy is missing or improperly set;
8. error messages include stack traces or other sensitive information.

Scenarios: a logging library with JNDI lookups enabled by default expands an `X-Api-Version: ${jndi:ldap://…}` header and loads remote code; a direct-message endpoint without `Cache-Control` leaves private conversations in the browser cache.

How to prevent. The API life cycle includes:

1. a repeatable hardening process that deploys a locked-down environment quickly;
2. a task to review and update configuration across the stack: orchestration files, API components and cloud services (for example S3 bucket permissions);
3. an automated process that continuously assesses configuration in all environments.

Furthermore:

4. use TLS for all communication, client to API and to every upstream and downstream component, internal or public;
5. allow only the HTTP verbs each API needs and disable the rest (for example `HEAD`);
6. APIs used from browsers implement at least a proper CORS policy and applicable security headers;
7. restrict incoming content types and data formats to what the business needs;
8. make every server in the HTTP chain (load balancers, reverse and forward proxies, back ends) process requests uniformly, to avoid desync;
9. where applicable, define and enforce all response payload schemas, including errors, so exception traces and other details do not reach attackers.

References in the entry: CWE-2, CWE-16, CWE-209, CWE-319, CWE-388, CWE-444, CWE-942; OWASP Secure Headers Project.

## API9:2023 Improper Inventory Management

Rating: exploitability Easy, prevalence Widespread, detectability Average, technical impact Moderate.

- **Attack vector.** Old API versions or endpoints left unpatched with weaker security; or sensitive data reached through a third party that has no reason to have it.
- **Weakness.** Outdated documentation, no asset inventory or retirement strategy, unnecessarily exposed hosts (microservices, cloud, Kubernetes); found with search-engine dorking and DNS enumeration.
- **Impact.** Data access or server takeover; old versions often share the production database; deprecated endpoints can expose admin functions.

Is the API vulnerable. It has a **documentation blindspot** if:

1. a host's purpose is unclear: which environment (production, staging, test, development), who should have network access (public, internal, partners), which API version runs;
2. documentation is missing or outdated;
3. there is no retirement plan per version;
4. the host inventory is missing or outdated.

It has a **data flow blindspot** if it shares sensitive data with a third party and there is no business justification or approval, no inventory or visibility of the flow, or no visibility of which sensitive data is shared.

Scenarios: a beta host `beta.api…` runs the same reset-password API without the rate limiter that sits in front of production, so a 6-digit token is brute-forced; a third-party app with 270,000 consents reaches 50,000,000 users' data through an unrestricted friends data flow.

How to prevent:

1. Inventory all API hosts with environment, network audience and API version.
2. Inventory integrated services: role, data exchanged (data flow) and sensitivity.
3. Document authentication, errors, redirects, rate limiting, CORS policy and endpoints with their parameters, requests and responses.
4. Generate documentation from open standards and build it in CI/CD.
5. Make API documentation available only to those authorised to use the API.
6. Apply external protections to all exposed versions, not only current production.
7. Avoid production data in non-production deployments; if unavoidable, protect them like production.
8. When a newer version adds security improvements, analyse the risk for older versions: backport without breaking compatibility, or retire the old version quickly and move all clients.

References in the entry: CWE-1059.

## API10:2023 Unsafe Consumption of APIs

Rating: exploitability Easy, prevalence Common, detectability Average, technical impact Severe.

New in 2023. Attackers go after a target's integrated services instead of its API (release notes).

- **Attack vector.** Identify and possibly compromise the APIs or services the target integrates with.
- **Weakness.** Developers trust third-party endpoints and apply weaker transport, authentication, authorization and input validation rules to them.
- **Impact.** Depends on what the API does with the data: disclosure, injection of many kinds, or DoS.

Is the API vulnerable, if it:

1. talks to other APIs over an unencrypted channel;
2. does not validate and sanitise data from other APIs before processing or passing it downstream;
3. blindly follows redirections;
4. does not limit resources used to process third-party responses;
5. has no timeouts for third-party interactions.

Scenarios: an address-enrichment service returns a stored SQL-injection payload that the API writes to its database; a compromised storage provider answers `308 Permanent Redirect` to `https://attacker.com/` and the API resends the medical record there; a git repository named `'; drop db;--` is used in a SQL query.

How to prevent:

1. Assess providers' API security posture when choosing them.
2. Use TLS for all API interactions.
3. Validate and sanitise data from integrated APIs before use.
4. Keep an allow list of locations integrated APIs may redirect you to; do not follow redirects blindly.

References in the entry: CWE-20, CWE-200, CWE-319; Input Validation, Injection Prevention, Transport Layer Protection and Unvalidated Redirects cheat sheets.

## What the list leaves out

The list covers risks that behave differently in APIs. Generic risks such as "Vulnerable and Outdated Components" and "Injection" still occur in APIs but are left to the general OWASP Top 10 (Methodology and Data, "API Specific Risks"). Review them with that list.
