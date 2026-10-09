# owasp-wstg

An agent skill for OWASP WSTG: testing web applications with the OWASP Web Security Testing Guide.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill owasp-wstg
```

Then ask your agent to apply OWASP WSTG.

## What it covers

- The OWASP Web Security Testing Guide (WSTG) 4.2: the test objectives and remediation guidance of core tests across configuration, authentication, authorization, session management and input validation, read from the project's Markdown source at the v4.2 release tag.

## Versions

| Line       | Status  |
| ---------- | ------- |
| OWASP WSTG | current |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [WSTG-CONF-06: Test HTTP Methods](https://raw.githubusercontent.com/OWASP/wstg/v4.2/document/4-Web_Application_Security_Testing/02-Configuration_and_Deployment_Management_Testing/06-Test_HTTP_Methods.md): OWASP Flagship Project guide, Tag v4.2 (2020-12-03).
- [WSTG-CONF-07: Test HTTP Strict Transport Security](https://raw.githubusercontent.com/OWASP/wstg/v4.2/document/4-Web_Application_Security_Testing/02-Configuration_and_Deployment_Management_Testing/07-Test_HTTP_Strict_Transport_Security.md): OWASP Flagship Project guide, Tag v4.2 (2020-12-03).
- [WSTG-ATHN-02: Testing for Default Credentials](https://raw.githubusercontent.com/OWASP/wstg/v4.2/document/4-Web_Application_Security_Testing/04-Authentication_Testing/02-Testing_for_Default_Credentials.md): OWASP Flagship Project guide, Tag v4.2 (2020-12-03).
- [WSTG-ATHN-03: Testing for Weak Lock Out Mechanism](https://raw.githubusercontent.com/OWASP/wstg/v4.2/document/4-Web_Application_Security_Testing/04-Authentication_Testing/03-Testing_for_Weak_Lock_Out_Mechanism.md): OWASP Flagship Project guide, Tag v4.2 (2020-12-03).
- [WSTG-ATHZ-01: Testing Directory Traversal File Include](https://raw.githubusercontent.com/OWASP/wstg/v4.2/document/4-Web_Application_Security_Testing/05-Authorization_Testing/01-Testing_Directory_Traversal_File_Include.md): OWASP Flagship Project guide, Tag v4.2 (2020-12-03).
- [WSTG-ATHZ-04: Testing for Insecure Direct Object References](https://raw.githubusercontent.com/OWASP/wstg/v4.2/document/4-Web_Application_Security_Testing/05-Authorization_Testing/04-Testing_for_Insecure_Direct_Object_References.md): OWASP Flagship Project guide, Tag v4.2 (2020-12-03).
- [WSTG-SESS-02: Testing for Cookies Attributes](https://raw.githubusercontent.com/OWASP/wstg/v4.2/document/4-Web_Application_Security_Testing/06-Session_Management_Testing/02-Testing_for_Cookies_Attributes.md): OWASP Flagship Project guide, Tag v4.2 (2020-12-03).
- [WSTG-SESS-03: Testing for Session Fixation](https://raw.githubusercontent.com/OWASP/wstg/v4.2/document/4-Web_Application_Security_Testing/06-Session_Management_Testing/03-Testing_for_Session_Fixation.md): OWASP Flagship Project guide, Tag v4.2 (2020-12-03).
- [WSTG-SESS-05: Testing for Cross Site Request Forgery](https://raw.githubusercontent.com/OWASP/wstg/v4.2/document/4-Web_Application_Security_Testing/06-Session_Management_Testing/05-Testing_for_Cross_Site_Request_Forgery.md): OWASP Flagship Project guide, Tag v4.2 (2020-12-03).
- [WSTG-INPV-01: Testing for Reflected Cross Site Scripting](https://raw.githubusercontent.com/OWASP/wstg/v4.2/document/4-Web_Application_Security_Testing/07-Input_Validation_Testing/01-Testing_for_Reflected_Cross_Site_Scripting.md): OWASP Flagship Project guide, Tag v4.2 (2020-12-03).
- [WSTG-INPV-05: Testing for SQL Injection](https://raw.githubusercontent.com/OWASP/wstg/v4.2/document/4-Web_Application_Security_Testing/07-Input_Validation_Testing/05-Testing_for_SQL_Injection.md): OWASP Flagship Project guide, Tag v4.2 (2020-12-03).
- [WSTG-INPV-12: Testing for Command Injection](https://raw.githubusercontent.com/OWASP/wstg/v4.2/document/4-Web_Application_Security_Testing/07-Input_Validation_Testing/12-Testing_for_Command_Injection.md): OWASP Flagship Project guide, Tag v4.2 (2020-12-03).
- [WSTG-INPV-19: Testing for Server-Side Request Forgery](https://raw.githubusercontent.com/OWASP/wstg/v4.2/document/4-Web_Application_Security_Testing/07-Input_Validation_Testing/19-Testing_for_Server-Side_Request_Forgery.md): OWASP Flagship Project guide, Tag v4.2 (2020-12-03).

## License

MIT
