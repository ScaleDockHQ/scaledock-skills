# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## Web Platform Design Principles

Source: https://www.w3.org/TR/design-principles/

This document contains a set of design principles to be used when designing web platform technologies. These principles have been collected during the Technical Architecture Group’s discussions in reviewing developing specifications, and build upon the Ethical Web Principles [ethical-web-principles] . We encourage specification designers to read this document and use it as a resource when making design decisions.

- **10.9. Do not expose new information through Client Hints.** As it says in RFC 8942 §4.1 where client hints are defined: Therefore, features relying on this document to define Client Hint headers MUST NOT provide new information that is otherwise not made available to the application by the user agent, such as existing request headers, HTML, CSS, or JavaScript.
- **1.1. Put user needs first (Priority of Constituencies).** See also: The web should not cause harm to society The web must enhance individuals' control and power [RFC8890]
- **1.2. It should be safe to visit a web page.** To work towards making sure the reality of safety on the web matches users' expectations, we can take complementary approaches when adding new features: We can improve the user interfaces through which the Web is used to make it clearer what users of the Web should (and should not) expect; We can change the technical foundations of the Web so that they match user expectations of privacy; We can…
- **1.3. Trusted user interface should be trustworthy.** These trusted user interfaces must be able to be designed in a way that enables users to trust and verify that the information they provide is genuine, and hasn’t been spoofed or hijacked by the website.
- **1.4. Design for user intent.** Using such a feature should only be possible if the user’s expectation matches the feature’s consequences (e.g., the personal information it reveals or the state it changes).
- **1.4.1. Help users make good decisions.** If users' decisions last longer than the current session, user agents should remind users that their past decision still applies.
- **1.4.1. Help users make good decisions.** APIs should include a way for sites to learn of the change in status.
- **1.4.1. Help users make good decisions.** When a typical user reads the question about a feature, they should immediately think of the associated risks.

## Self-Review Questionnaire: Security and Privacy

Source: https://www.w3.org/TR/security-privacy-questionnaire/

This document contains a set of questions to be used when evaluating the security and privacy implications of web platform technologies.

- **1. Introduction.** When designing new features for the Web platform, we must always consider the security and privacy implications of our work.
- **1. Introduction.** New Web features should always maintain or enhance the overall security and privacy of the Web.
- **1. Introduction.** Please let us know if you identify a security or privacy concern this questionnaire should ask about.
- **1.2. Additional resources.** The Mitigating Browser Fingerprinting in Web Specifications [FINGERPRINTING-GUIDANCE] document published by the Privacy WG goes into further depth about browser fingerprinting and should be considered in parallel with this document.
- **2.1. What information does this feature expose,.** User agents should only expose information to the Web when doing so is necessary to serve a clear user need.
- **2.2. Do features in your specification expose the minimum amount of information.** Features should only expose information when it’s absolutely necessary.
- **2.3. Do the features in your specification expose personal information,.** When exposing personal information, PII, or derivative information, specification authors must prevent or, when prevention is not possible, minimize potential harm to users.
- **2.3. Do the features in your specification expose personal information,.** A feature which gathers biometric data (such as fingerprints or retina scans) for authentication should not directly expose this biometric data to the web.

## Self-Review Questionnaire: Societal Impact

Source: https://www.w3.org/TR/societal-impact-questionnaire/

The web should be a platform that helps people and provides a net positive social benefit. As we continue to evolve the web platform, we must consider the consequences of our work. This document sets out questions for specification authors, reviewers, and implementors of new web platform technologies to answer as part of a critical assessment of the impact of their work.

- **1. Introduction.** New features, and additions or changes to existing features, should bring benefits to end users of the web, and avoid doing harms.
- **2. Questions to consider.** Note that not everything can (or should) be quantified, and that data collection itself can have a negative societal impact; ensure that in measuring your impact, you are not putting people at risk.
- **2. Questions to consider.** Example 1 : Measuring impact If a local government decides to add separated bicycle lanes and improved signalling, they should expect increased bicycle use and a reduction in collisions involving bicycles.

## Mitigating Browser Fingerprinting in Web Specifications

Source: https://www.w3.org/TR/fingerprinting-guidance/

Exposure of settings and characteristics of browsers can harm user privacy by allowing for browser fingerprinting. This document defines different types of fingerprinting, considers distinct levels of mitigation for the related privacy risks and provides guidance for Web specification authors on how to balance these concerns when designing new Web features.

- **1.3 What can we do about it?.** In order to mitigate these privacy risks as a whole, fingerprinting must be considered during the design and development of all specifications.
- **5. Identifying fingerprinting surface and evaluating severity.** Because detectability is an important — and perhaps the most feasible — mitigation, increases to the surface for passive fingerprinting are of particular concern and should be avoided.
- **5. Identifying fingerprinting surface and evaluating severity.** Although each factor may suggest specific mitigations, in weighing whether to add fingerprinting surface they should be considered in concert.
- **6.1 Weighing increased fingerprinting surface.** In particular, unless a feature cannot reasonably be designed in any other way, increased passive fingerprintability should be avoided.
- **6.1 Weighing increased fingerprinting surface.** Consider whether it should be restricted by an iframe sandbox.
- **6.4 Clearing all local state.** Permanent identifiers or other state (for example, identifiers or keys set in hardware) should typically not be used.
- **6.4 Clearing all local state.** As a result, your design should not rely on saving and later querying data on the client and expecting it to persist beyond a user clearing cookies or other local state.
- **6.4 Clearing all local state.** That is, you should not expect any local state information to be permanent or to persist longer than other local state.
