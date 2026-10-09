# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. The WSTG is a testing guide without MUST or SHALL keywords, so each test is given by its test objectives and, where the test has one, its remediation guidance, quoted as written. Apply the ones that match the scope of the test. Each is labelled with its WSTG test id.

## WSTG-CONF-06: Test HTTP Methods

Source: https://raw.githubusercontent.com/OWASP/wstg/v4.2/document/4-Web_Application_Security_Testing/02-Configuration_and_Deployment_Management_Testing/06-Test_HTTP_Methods.md

- **WSTG-CONF-06.** Enumerate supported HTTP methods.
- **WSTG-CONF-06.** Test for access control bypass.
- **WSTG-CONF-06.** Ensure that no workarounds are implemented to bypass security measures implemented by user-agents, frameworks, or web servers.

## WSTG-CONF-07: Test HTTP Strict Transport Security

Source: https://raw.githubusercontent.com/OWASP/wstg/v4.2/document/4-Web_Application_Security_Testing/02-Configuration_and_Deployment_Management_Testing/07-Test_HTTP_Strict_Transport_Security.md

- **WSTG-CONF-07.** Review the HSTS header and its validity.

## WSTG-ATHN-02: Testing for Default Credentials

Source: https://raw.githubusercontent.com/OWASP/wstg/v4.2/document/4-Web_Application_Security_Testing/04-Authentication_Testing/02-Testing_for_Default_Credentials.md

- **WSTG-ATHN-02.** Enumerate the applications for default credentials and validate if they still exist.
- **WSTG-ATHN-02.** Review and assess new user accounts and if they are created with any defaults or identifiable patterns.

## WSTG-ATHN-03: Testing for Weak Lock Out Mechanism

Source: https://raw.githubusercontent.com/OWASP/wstg/v4.2/document/4-Web_Application_Security_Testing/04-Authentication_Testing/03-Testing_for_Weak_Lock_Out_Mechanism.md

- **WSTG-ATHN-03.** Evaluate the account lockout mechanism's ability to mitigate brute force password guessing.
- **WSTG-ATHN-03.** Evaluate the unlock mechanism's resistance to unauthorized account unlocking.

## WSTG-ATHZ-01: Testing Directory Traversal File Include

Source: https://raw.githubusercontent.com/OWASP/wstg/v4.2/document/4-Web_Application_Security_Testing/05-Authorization_Testing/01-Testing_Directory_Traversal_File_Include.md

- **WSTG-ATHZ-01.** Identify injection points that pertain to path traversal.
- **WSTG-ATHZ-01.** Assess bypassing techniques and identify the extent of path traversal.

## WSTG-ATHZ-04: Testing for Insecure Direct Object References

Source: https://raw.githubusercontent.com/OWASP/wstg/v4.2/document/4-Web_Application_Security_Testing/05-Authorization_Testing/04-Testing_for_Insecure_Direct_Object_References.md

- **WSTG-ATHZ-04.** Identify points where object references may occur.
- **WSTG-ATHZ-04.** Assess the access control measures and if they're vulnerable to IDOR.

## WSTG-SESS-02: Testing for Cookies Attributes

Source: https://raw.githubusercontent.com/OWASP/wstg/v4.2/document/4-Web_Application_Security_Testing/06-Session_Management_Testing/02-Testing_for_Cookies_Attributes.md

- **WSTG-SESS-02.** Ensure that the proper security configuration is set for cookies.

## WSTG-SESS-03: Testing for Session Fixation

Source: https://raw.githubusercontent.com/OWASP/wstg/v4.2/document/4-Web_Application_Security_Testing/06-Session_Management_Testing/03-Testing_for_Session_Fixation.md

- **WSTG-SESS-03.** Force cookies and assess the impact.
- **WSTG-SESS-03.** The application should always first invalidate the existing session ID before authenticating a user, and if the authentication is successful, provide another session ID.

## WSTG-SESS-05: Testing for Cross Site Request Forgery

Source: https://raw.githubusercontent.com/OWASP/wstg/v4.2/document/4-Web_Application_Security_Testing/06-Session_Management_Testing/05-Testing_for_Cross_Site_Request_Forgery.md

- **WSTG-SESS-05.** Determine whether it is possible to initiate requests on a user's behalf that are not initiated by the user.

## WSTG-INPV-01: Testing for Reflected Cross Site Scripting

Source: https://raw.githubusercontent.com/OWASP/wstg/v4.2/document/4-Web_Application_Security_Testing/07-Input_Validation_Testing/01-Testing_for_Reflected_Cross_Site_Scripting.md

- **WSTG-INPV-01.** Identify variables that are reflected in responses.
- **WSTG-INPV-01.** Assess the input they accept and the encoding that gets applied on return (if any).

## WSTG-INPV-05: Testing for SQL Injection

Source: https://raw.githubusercontent.com/OWASP/wstg/v4.2/document/4-Web_Application_Security_Testing/07-Input_Validation_Testing/05-Testing_for_SQL_Injection.md

- **WSTG-INPV-05.** Identify SQL injection points.
- **WSTG-INPV-05.** Assess the severity of the injection and the level of access that can be achieved through it.

## WSTG-INPV-12: Testing for Command Injection

Source: https://raw.githubusercontent.com/OWASP/wstg/v4.2/document/4-Web_Application_Security_Testing/07-Input_Validation_Testing/12-Testing_for_Command_Injection.md

- **WSTG-INPV-12.** Identify and assess the command injection points.
- **WSTG-INPV-12.** The web application and its components should be running under strict permissions that do not allow operating system command execution.

## WSTG-INPV-19: Testing for Server-Side Request Forgery

Source: https://raw.githubusercontent.com/OWASP/wstg/v4.2/document/4-Web_Application_Security_Testing/07-Input_Validation_Testing/19-Testing_for_Server-Side_Request_Forgery.md

- **WSTG-INPV-19.** Identify SSRF injection points.
- **WSTG-INPV-19.** Test if the injection points are exploitable.
