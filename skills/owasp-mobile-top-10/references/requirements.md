# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. The OWASP Mobile Top 10 has no MUST or SHALL keywords, so each risk is given by the prevention guidance that drives implementation, quoted as written. Apply the ones that match the role. Each is labelled with its risk id.

## M1: Improper Credential Usage

Source: https://raw.githubusercontent.com/OWASP/www-project-mobile-top-10/f2dc2d6607f3da069e8b91c7a44825fd85c74555/2023-risks/m1-improper-credential-usage.md

- **M1.** Always avoid using hardcoded credentials in your mobile app's code or configuration files.
- **M1.** Do not store user credentials on the device. Instead, consider using secure, revocable access tokens.

## M2: Inadequate Supply Chain Security

Source: https://raw.githubusercontent.com/OWASP/www-project-mobile-top-10/f2dc2d6607f3da069e8b91c7a44825fd85c74555/2023-risks/m2-inadequate-supply-chain-security.md

- **M2.** Ensure secure app signing and distribution processes to prevent attackers from signing and distributing malicious code.
- **M2.** Use only trusted and validated third-party libraries or components to reduce the risk of vulnerabilities.

## M3: Insecure Authentication/Authorization

Source: https://raw.githubusercontent.com/OWASP/www-project-mobile-top-10/f2dc2d6607f3da069e8b91c7a44825fd85c74555/2023-risks/m3-insecure-authentication-authorization.md

- **M3.** Developers should assume that all client-side authorization and authentication controls can be bypassed by malicious users. Server-side reinforcement of these controls is critical.
- **M3.** Backend systems should independently verify the roles and permissions of the authenticated user. Do not rely on any roles or permission information that comes from the mobile device.
- **M3.** The "Remember Me" functionality should never store a user’s password on the device.

## M4: Insufficient Input/Output Validation

Source: https://raw.githubusercontent.com/OWASP/www-project-mobile-top-10/f2dc2d6607f3da069e8b91c7a44825fd85c74555/2023-risks/m4-insufficient-input-output-validation.md

- **M4.** Validate and sanitize user input using strict validation techniques.
- **M4.** Follow secure coding practices, such as using parameterized queries and prepared statements to prevent SQL injection.

## M5: Insecure Communication

Source: https://raw.githubusercontent.com/OWASP/www-project-mobile-top-10/f2dc2d6607f3da069e8b91c7a44825fd85c74555/2023-risks/m5-insecure-communication.md

- **M5.** Assume that the network layer is not secure and is susceptible to eavesdropping.
- **M5.** Never allow bad certificates (self-signed, expired, untrusted root, revoked, wrong host..).
- **M5.** Do not send sensitive data over alternate channels (e.g, SMS, MMS, or notifications).

## M6: Inadequate Privacy Controls

Source: https://raw.githubusercontent.com/OWASP/www-project-mobile-top-10/f2dc2d6607f3da069e8b91c7a44825fd85c74555/2023-risks/m6-inadequate-privacy-controls.md

- **M6.** Something that does not exist cannot be attacked, so the safest approach to prevent privacy violations is to minimize the amount and variety of PII that is processed.
- **M6.** The remaining PII should not be stored or transferred unless absolutely necessary. If it must be stored or transferred, access must be protected with proper authentication and possibly authorization.

## M7: Insufficient Binary Protection

Source: https://raw.githubusercontent.com/OWASP/www-project-mobile-top-10/f2dc2d6607f3da069e8b91c7a44825fd85c74555/2023-risks/m7-insufficient-binary-protection.md

- **M7.** Apps always run in untrusted execution environments and should only get the least necessary information they need to work, as this information is always at risk of being leaked or manipulated.
- **M7.** In addition, local security checks should also be enforced by the backend.

## M8: Security Misconfiguration

Source: https://raw.githubusercontent.com/OWASP/www-project-mobile-top-10/f2dc2d6607f3da069e8b91c7a44825fd85c74555/2023-risks/m8-security-misconfiguration.md

- **M8.** Disable Debugging: Disable debugging features in the production version of the app.
- **M8.** Limit application attack surface by only exporting activities, content providers and services that are necessary to be exported

## M9: Insecure Data Storage

Source: https://raw.githubusercontent.com/OWASP/www-project-mobile-top-10/f2dc2d6607f3da069e8b91c7a44825fd85c74555/2023-risks/m9-insecure-data-storage.md

- **M9.** Use platform-specific secure storage mechanisms provided by the mobile operating system, such as Keychain (iOS) or Keystore (Android).

## M10: Insufficient Cryptography

Source: https://raw.githubusercontent.com/OWASP/www-project-mobile-top-10/f2dc2d6607f3da069e8b91c7a44825fd85c74555/2023-risks/m10-insufficient-cryptography.md

- **M10.** Avoid custom encryption implementations, as they are more prone to errors and vulnerabilities.
- **M10.** Always use a strong random salt when hashing passwords.
