# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## Secure Contexts

Source: https://www.w3.org/TR/secure-contexts/

This specification defines "secure contexts", thereby allowing user agent implementers and specification authors to enable certain features only when certain minimum standards of authentication and confidentiality are met.

- **3.1. Is origin potentially trustworthy?.** In particular, the user agent SHOULD treat file URLs as potentially trustworthy.
- **5.2. localhost.** as special, and suggests that local resolvers SHOULD/MAY treat them specially.
- **1. Introduction.** As an extension of the TAG’s recommendations in [SECURING-WEB] , this document describes threat models for feature abuse on the web (see § 4.1 Threat Models ) and outlines normative requirements which should be incorporated into documents specifying new features (see § 7 Implementation Considerations ).
- **2.1. Integration with WebIDL.** The following example should help: interface ExampleFeature { // This call will succeed in all contexts.
- **4.1. Threat Models.** The state of the Internet is such that we must indeed assume that a network attacker is present.
- **4.3. Risks associated with non-secure contexts.** Certain web platform features that have a distinct impact on a user’s security or privacy should be available for use only in secure contexts in order to defend against the threats above.
- **4.3. Risks associated with non-secure contexts.** This list is non-exhaustive, but should give you a feel for the types of risks we should consider when writing or implementing specifications.
- **7.4. Restricting Legacy Features.** If such a feature is in wide use, we recommend that the existing functionality be deprecated; the specification should be modified to note that it does not conform to the restrictions outlined in this document, and a plan should be developed to both offer a conformant version of the feature and to migrate existing users into that new version.

## Mixed Content

Source: https://www.w3.org/TR/mixed-content/

This specification describes how a user agent should handle fetching of content over unencrypted or unauthenticated connections in the context of an encrypted and authenticated document.

- **7.1. Form Submission.** If a user agent warns on form element submissions to not potentially trustworthy URL s, it SHOULD also warn and allow users to abort the submission if upon submission, the form element’s action, redirects to a non potentially trustworthy URL , exposing the form information.
- **7.2. User Controls.** That said, allowing mixed script is in particular a very dangerous option, and each user agent REALLY SHOULD NOT [RFC6919] present such a choice to users without careful consideration and communication of the risk involved.
- **7.2. User Controls.** Any such controls offered by a user agent MUST also be offered through accessibility APIs for users of assistive technologies.
- **1. Introduction.** When a webpage loads mixed content, browsers display an "in-between" security indicator (such as removing the padlock icon), which does not give users a clear indication of whether they should trust the page.
- **1. Introduction.** Instead of advising browsers to simply strictly block all mixed content, this specification advises mixed content autoupgrading : Mixed content that user agents are not already blocking should be autoupgraded to a secure transport.
- **1. Introduction.** User agents should block mixed downloads because they can escape the user agent’s sandbox (in the case of an executable) or contain sensitive information (e.g., a downloaded bank statement).
- **4.4. Should fetching request be blocked as mixed content?.** Note: The Fetch specification hooks into this algorithm to determine whether a request should be entirely blocked (e.g.
- **4.4. Should fetching request be blocked as mixed content?.** Given a Request request , a user agent determines whether the Request request should proceed or not via the following algorithm: Return allowed if one or more of the following conditions are met: § 4.3 Does settings prohibit mixed security contexts?

## Upgrade Insecure Requests

Source: https://www.w3.org/TR/upgrade-insecure-requests/

This document defines a mechanism which allows authors to instruct a user agent to upgrade a priori insecure resource requests to secure transport before fetching them.

- **3.2.1. The Upgrade-Insecure-Requests HTTP Request Header Field.** That step represents the following requirements: User agents MUST send an Upgrade-Insecure-Requests header field along with request s for a priori insecure URLs .
- **3.2.1. The Upgrade-Insecure-Requests HTTP Request Header Field.** User agents MUST send an Upgrade-Insecure-Requests header field along with request s for potentially secure URLs whose url ’s host is not a preloadable HSTS host .
- **3.2.1. The Upgrade-Insecure-Requests HTTP Request Header Field.** User agents SHOULD periodically send an Upgrade-Insecure-Requests header field along with request s for potentially secure URLs whose url ’s host is a preloadable HSTS host .
- **3.2.1. The Upgrade-Insecure-Requests HTTP Request Header Field.** When a server encounters this preference in an HTTP request’s headers, it SHOULD redirect the user to a potentially secure representation of the resource being requested.
- **3.2.1. The Upgrade-Insecure-Requests HTTP Request Header Field.** When a server encounters this preference in an HTTPS request’s headers, it SHOULD include a Strict-Transport-Security header in the response if the request’s host is HSTS-safe or conditionally HSTS-safe [RFC6797] .
- **3.3. Policy Inheritance.** If a Document 's incumbent settings object ’s insecure requests policy is set to Upgrade , the user agent MUST ensure that all nested browsing contexts inherit the setting in the following ways: When a nested browsing context context is created: If context ’s embedding document ’s insecure requests policy is Upgrade , then: Set context ’s insecure requests policy to Upgrade .
- **3.3. Policy Inheritance.** Likewise, when spinning up a worker, the user agent MUST ensure that it inherits the setting from the context that created it in the following ways: When executing the set up a worker environment settings object algorithm, perform the following steps after the current step #4: If inherited responsible browsing context ’s insecure requests policy is Upgrade , then: Set settings object ’s insecure…
- **3.4. Reporting Upgrades.** Upgrading insecure requests MUST not interfere with an authors' ability to track down requests that would be insecure in a user agent that does not support upgrades.
