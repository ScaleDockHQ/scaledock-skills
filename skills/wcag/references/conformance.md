# Conformance and claims

Read this when setting the scope and level of a build or audit, deciding whether a technology can be relied upon, or writing a conformance claim or partial conformance statement. Sources: WCAG 2.2 § 5 and Glossary, and Understanding Conformance (informative), listed in [Sources](../SKILL.md#sources). Section numbers are WCAG 2.2.

## Structure of WCAG 2

- Four principles (perceivable, operable, understandable, robust), 13 guidelines under them, and testable success criteria under each guideline (Introduction, WCAG 2 Layers of Guidance). The guidelines themselves are not testable.
- Each criterion has one level: A (lowest), AA, or AAA (highest). WCAG 2.2 has 31 Level A, 24 Level AA and 31 Level AAA criteria; 4.1.1 Parsing has no level because it is removed.
- Normative: the success criteria, the conformance section and the glossary terms they use. Informative: the introduction, appendices, sections marked non-normative, diagrams, examples and notes (§ 5.1). The key words are those of RFC 2119 (§ 5.1).
- "Satisfies a success criterion" means the criterion does not evaluate to false when applied to the page (Glossary). A criterion that does not apply (no video on the page, so no captions needed) is satisfied.
- Levels are not priorities. WCAG 2 does not assign severity to criteria; choosing a level is a policy decision (Understanding Conformance, Understanding Levels of Conformance).

## The five conformance requirements (§ 5.2)

All five must hold for a web page to conform.

1. **Conformance level** (§ 5.2.1). Level A: all A criteria. Level AA: all A and AA criteria. Level AAA: all A, AA and AAA criteria. Or a conforming alternate version is provided at that level. Report progress beyond the achieved level if you like (Note 1). Do not require AAA as a general policy for entire sites, because some content cannot meet all AAA criteria (Note 2).
2. **Full pages** (§ 5.2.2). Conformance is for full pages only; excluding part of a page makes conformance impossible. Alternatives reachable directly from the page (a long description, an alternative video presentation) count as part of it (Note 1). Each variation the page presents automatically for different screen sizes must conform (Note 3).
3. **Complete processes** (§ 5.2.3). When a page is one step of a process, every page in the process conforms at the level. A checkout flow conforms only if every step does.
4. **Only accessibility-supported ways of using technologies** (§ 5.2.4). Anything provided in a way that is not accessibility supported must also be available in a way that is.
5. **Non-interference** (§ 5.2.5). Technologies used in an unsupported or non-conforming way must not block access to the rest of the page, and the page still conforms when any technology not relied upon is turned on, turned off, or unsupported. SC 1.4.2 Audio Control, 2.1.2 No Keyboard Trap, 2.3.1 Three Flashes or Below Threshold and 2.2.2 Pause, Stop, Hide apply to all content on the page, including content not relied upon.

A page that cannot conform, such as a test page or an example of a failure, cannot be in the scope of conformance or a claim (§ 5.2.5, Note).

## Key terms

- **Web page**: a non-embedded resource from a single URI using HTTP, plus the resources rendered with it (Glossary). A single-page application whose views do not change the URI is still one web page; every state it presents is part of that page.
- **Set of web pages**: pages with a common purpose by the same author or organization. A checkout whose template differs from the product pages is a separate set, and different language versions are different sets (Glossary). This scopes 2.4.5, 3.2.3, 3.2.4 and 3.2.6.
- **Process**: a series of user actions where each is required to complete an activity (Glossary).
- **Accessibility supported**: the way the technology is used has been tested for interoperability with users' assistive technology in the content's human language, and accessibility-supported user agents are available (natively in widely distributed browsers such as for HTML and CSS, in a widely distributed accessible plug-in, in a closed environment, or at no extra cost and equally easy to obtain for disabled users) (Glossary). W3C does not set how much assistive technology support is enough (Note 1). Supporting one feature of a technology does not mean all of it is supported (Note 3).
- **Relied upon**: the content would not conform if the technology were turned off or unsupported (Glossary).
- **Conforming alternate version**: conforms at the level, has the same information and functionality in the same human language, is as up to date, and can be reached from the non-conforming page through an accessibility-supported mechanism (or the non-conforming version can only be reached from the conforming one) (Glossary). Alternate versions exist for technologies whose accessibility support lags; they are not a way to skip fixing the main page (Understanding Conformance, Why permit alternate versions?).
- **Mechanism**: a process or technique for achieving a result; it may be provided by the content, the platform, or user agents including assistive technologies (Glossary). Where a criterion asks for "a mechanism", a browser feature can satisfy it when the criterion allows (for example SC 1.4.8, Note 1).
- **Essential**: removing it would fundamentally change the information or functionality, and it cannot be achieved another way that conforms (Glossary). Essential exceptions are narrow.

## Conformance claims (§ 5.3)

Claims are optional; content can conform without one (§ 5.3.1). Conformance is defined only for web pages, but a claim can cover one page, a series, or multiple related pages (§ 5.3).

Required components when a claim is made (§ 5.3.1):

1. Date of the claim.
2. Guidelines title, version and URI: "Web Content Accessibility Guidelines 2.2 at https://www.w3.org/TR/WCAG22/".
3. Conformance level satisfied: Level A, AA or AAA.
4. A concise description of the pages, such as a list of URIs or an expression describing them, including whether subdomains are included. A product without a URI before installation may state that it would conform when installed (Notes 1 and 2).
5. A list of the web content technologies relied upon.

A conformance logo is a claim and must carry the required components (Note 3).

Optional components (§ 5.3.2): criteria met beyond the claimed level, technologies used but not relied upon, the user agents and assistive technologies used to test, accessibility characteristics as machine-readable metadata, extra steps taken beyond the criteria, and machine-readable versions of the technology list and the claim.

Example shape, adapted from the WCAG 2.0 examples in Understanding Conformance, which says the same structure applies to WCAG 2.2:

```text
On 5 October 2026, all web pages at https://www.example.com/ (excluding subdomains)
conform to Web Content Accessibility Guidelines 2.2 at https://www.w3.org/TR/WCAG22/,
Level AA. Technologies relied upon: HTML, CSS, JavaScript, WAI-ARIA.
```

## Partial conformance

- **Third-party content** (§ 5.4). For pages that will later receive content the author does not control (comments, user-generated content, aggregated feeds, ads), either claim conformance based on best knowledge when non-conforming content is monitored and repaired or removed within two business days, or make a statement of partial conformance: "This page does not conform, but would conform to WCAG 2.2 at level X if the following parts from uncontrolled sources were removed." The excluded parts must not be under the author's control and must be described so users can identify them.
- **Language** (§ 5.5). When the page would conform if accessibility support existed for its language(s): "This page does not conform, but would conform to WCAG 2.2 at level X if accessibility support existed for the following language(s):".

## Privacy and security notes (non-normative)

- Privacy-relevant criteria: 2.2.6 Timeouts and 3.3.7 Redundant Entry (§ 5.6). Storing entered data to avoid redundant entry should protect it even temporarily (Understanding Redundant Entry, Intent).
- Security-relevant criteria: 1.1.1, 1.3.5, 1.4.7, 2.2.1, 2.2.5, 2.2.6, 2.5.6, 3.3.3, 3.3.7, 3.3.8 and 3.3.9 (§ 5.7). Several criteria have security exceptions built in, for example 3.3.3 (suggestions that would jeopardize security), 3.3.7 (information required for security), and 2.5.6 (restrictions required for security).

## Mobile and non-web software

WCAG 2.2 addresses web content on any device, including mobile devices (Abstract), and its definitions are written for web pages. The WCAG 2 Overview says WCAG can be applied to native apps, software and documents as described in WCAG2ICT, and the WCAG 2 FAQ points to "Guidance on Applying WCAG 2.2 to Non-Web Information and Communications Technologies (WCAG2ICT)". This skill does not cover WCAG2ICT's mappings; for a native app, apply the criteria as written and record which terms (web page, set of web pages) were interpreted.
