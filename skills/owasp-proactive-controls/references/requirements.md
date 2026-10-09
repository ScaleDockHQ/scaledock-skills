# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. The Proactive Controls have no MUST or SHALL keywords, so each control is given by the implementation practices that drive the code, quoted as written. Apply the ones that match the role. Each is labelled with its control id.

## C1: Implement Access Control

Source: https://raw.githubusercontent.com/OWASP/www-project-proactive-controls/v4.0.0/docs/the-top-10/c1-accesscontrol.md

- **C1.** Ensure that all access requests are forced to go through an access control verification layer.
- **C1.** Ensure that by default, all the requests are denied, unless they are specifically allowed.
- **C1.** Application code may throw an error or exception while processing access control requests. In these cases, access control should always be denied.

## C2: Use Cryptography to Protect Data

Source: https://raw.githubusercontent.com/OWASP/www-project-proactive-controls/v4.0.0/docs/the-top-10/c2-crypto.md

- **C2.** The first rule of sensitive data management is to avoid storing sensitive data when at all possible.
- **C2.** Do not store the passwords in plain text anywhere in the database. Always use a hashing function to store passwords.
- **C2.** Don’t store secrets in code, config files or pass them through environment variables.
- **C2.** Use TLSv1.2 or TLSv1.3, preferably TLSv1.3.

## C3: Validate all Input & Handle Exceptions

Source: https://raw.githubusercontent.com/OWASP/www-project-proactive-controls/v4.0.0/docs/the-top-10/c3-validate-input-and-handle-exceptions.md

- **C3.** Always perform Input validation on the server side for security.
- **C3.** Allowlisting is the recommended minimal approach.
- **C3.** When using relational databases through SQL, utilize Prepared-Statements.
- **C3.** The only safe architectural pattern is to not accept serialized objects from untrusted sources or to only deserialize in limited capacity for only simple data types.

## C4: Address Security from the Start

Source: https://raw.githubusercontent.com/OWASP/www-project-proactive-controls/v4.0.0/docs/the-top-10/c4-secure-architecture.md

- **C4.** Identify all areas that an attacker can access, review them and try to minimize them: attackers cannot attack what's not there.

## C5: Secure By Default Configurations

Source: https://raw.githubusercontent.com/OWASP/www-project-proactive-controls/v4.0.0/docs/the-top-10/c5-secure-by-default.md

- **C5.** Software should start in a secure state without requiring extensive user configuration, ensuring the default settings are always the most secure option.
- **C5.** Access is denied by default and allowed via an allowed list

## C6: Keep your Components Secure

Source: https://raw.githubusercontent.com/OWASP/www-project-proactive-controls/v4.0.0/docs/the-top-10/c6-use-secure-dependencies.md

- **C6.** A SBOM contains all used third-party dependencies and their versions and can be automatically monitored by a variety of supply chain management tools.
- **C6.** Updating software must be a recurring task that occurs throughout the life cycle of the application or product, from ideation to retirement.

## C7: Secure Digital Identities

Source: https://raw.githubusercontent.com/OWASP/www-project-proactive-controls/v4.0.0/docs/the-top-10/c7-secure-digital-identities.md

- **C7.** Ensure that the session id is long, unique and random, i.e., is of high entropy.
- **C7.** The application should generate a new session during authentication and re-authentication.

## C8: Leverage Browser Security Features

Source: https://raw.githubusercontent.com/OWASP/www-project-proactive-controls/v4.0.0/docs/the-top-10/c8-leverage-browser-security-features.md

- **C8.** Strict CSP policies can effectively disable inline JavaScript and style, making it much harder for attackers to inject malicious content.
- **C8.** Marking cookies as SameSite can mitigate the risk of cross-origin information leakage, as well as provide some protection against cross-site request forgery attacks.

## C9: Implement Security Logging and Monitoring

Source: https://raw.githubusercontent.com/OWASP/www-project-proactive-controls/v4.0.0/docs/the-top-10/c9-security-logging-and-monitoring.md

- **C9.** Do not log sensitive information. For example, do not log password, session ID, credit cards, or social security numbers.
- **C9.** Forward logs from distributed systems to a central, secure logging service.

## C10: Stop Server Side Request Forgery

Source: https://raw.githubusercontent.com/OWASP/www-project-proactive-controls/v4.0.0/docs/the-top-10/c10-stop-server-side-request-forgery.md

- **C10.** If outgoing requests have to be made, check the target against an allow-list
