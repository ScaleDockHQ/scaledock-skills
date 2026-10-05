# Understandable and robust

Read this when building or reviewing a UI against principles 3 and 4 of WCAG 2.2, including forms, sign-in, help and custom components. Each criterion is paraphrased from the WCAG 2.2 Recommendation with its level; read the Recommendation for the exact wording before deciding a borderline case. Understanding documents are cited where they explain how to apply a criterion; they are informative. Sources are in [Sources](../SKILL.md#sources). "New" marks a criterion added in 2.2; "2.1" marks one added in 2.1.

## Principle 3: Understandable

Information and the operation of the user interface must be understandable.

### 3.1 Readable

- **3.1.1 Language of Page (A).** The default human language of each page is programmatically determinable.
- **3.1.2 Language of Parts (AA).** The language of each passage or phrase is programmatically determinable, except proper names, technical terms, words of indeterminate language, and words that have become part of the surrounding vernacular.
- AAA: 3.1.3 Unusual Words, 3.1.4 Abbreviations, 3.1.5 Reading Level, 3.1.6 Pronunciation.

### 3.2 Predictable

- **3.2.1 On Focus (A).** Receiving focus does not initiate a change of context.
- **3.2.2 On Input (A).** Changing a component's setting does not automatically cause a change of context unless the user was advised beforehand.
- **3.2.3 Consistent Navigation (AA).** Navigation repeated across a set of pages stays in the same relative order unless the user changes it. Inserted or removed items do not break "same relative order" (Glossary).
- **3.2.4 Consistent Identification (AA).** Components with the same functionality across a set of pages are identified consistently. A "search" button on one page and a "find" button on another with the same function are inconsistent (Glossary, same functionality, Example).
- **3.2.6 Consistent Help (A, New).** Details below.
- AAA: 3.2.5 Change on Request.

A change of context is a major change that can disorient users who cannot see the whole page: opening a new window, moving focus to another component, going to a new page (or what looks like one), or significantly rearranging the page. Expanding an outline, a dynamic menu or a tab panel is a change of content, not of context, unless it also moves focus (Glossary, changes of context).

### 3.3 Input assistance

- **3.3.1 Error Identification (A).** When an input error is detected automatically, the item in error is identified and the error is described in text.
- **3.3.2 Labels or Instructions (A).** Labels or instructions are provided when content requires input.
- **3.3.3 Error Suggestion (AA).** When an error is detected and a correction is known, it is suggested, unless that would jeopardize security or purpose.
- **3.3.4 Error Prevention (Legal, Financial, Data) (AA).** For pages that create legal commitments or financial transactions, modify or delete user data, or submit test responses, submissions are reversible, checked with a chance to correct, or reviewable and confirmable before finalizing.
- **3.3.7 Redundant Entry (A, New).** Details below.
- **3.3.8 Accessible Authentication (Minimum) (AA, New).** Details below.
- AAA: 3.3.5 Help, 3.3.6 Error Prevention (All), 3.3.9 Accessible Authentication (Enhanced) (New, details below).

## Principle 4: Robust

Content must be robust enough that it can be interpreted by a wide variety of user agents, including assistive technologies.

- **4.1.1 Parsing (Obsolete and removed).** Not a WCAG 2.2 criterion. Details below.
- **4.1.2 Name, Role, Value (A).** For all UI components, including script-generated ones, name and role are programmatically determinable; states, properties and values the user can set can be set programmatically; and changes are notified to user agents and assistive technologies. Standard HTML controls used according to specification already meet it; it mainly concerns custom components (Note). For custom widgets, use WAI-ARIA roles, states and properties (see the `wai-aria` skill).
- **4.1.3 Status Messages (AA, 2.1).** In markup languages, status messages can be programmatically determined through role or properties so assistive technologies can present them without moving focus. A status message reports success or results of an action, a waiting state, progress, or errors, without a change of context (Glossary, status message).

## WCAG 2.2 additions in detail

### 3.2.6 Consistent Help (A)

- Rule: if a page has any of these help mechanisms, and they repeat across a set of pages, they appear in the same order relative to other page content, unless the user initiates a change: human contact details, a human contact mechanism, a self-help option, a fully automated contact mechanism (SC 3.2.6).
- The mechanism can be on the page or a direct link to a page with it (Note 1). "Same order" means order in the serialized page, compared within the same page variation (same breakpoint, zoom and orientation) (Note 2).
- It does not require help to exist, nor a human to be always available; pages without help do not fail (Understanding 3.2.6, Intent and Limitations and Exceptions).
- Test by checking that content before the help item on other pages is before it here, and content after it stays after it. A different visual position with the same serial order does not fail (Understanding 3.2.6, Intent).
- Navigating between pages or logging in is not a "change initiated by the user"; zooming or rotating is (Understanding 3.2.6, Limitations and Exceptions).
- Examples: phone number, email, hours (contact details); chat, contact form (contact mechanism); FAQ or support page (self-help); chatbot (automated) (Understanding 3.2.6, Help Mechanisms). Technique G220: a contact-us link in a consistent location.

### 3.3.7 Redundant Entry (A)

- Rule: information the user already entered, or that was provided to them, which must be entered again in the same process is auto-populated or available to select, except when re-entry is essential, required for security, or the earlier information is no longer valid (SC 3.3.7).
- Browser autocomplete does not count: the content must supply the stored value or avoid asking again (Understanding 3.3.7, Intent).
- "Available to select" includes a drop-down of earlier values, text on the page that can be copied, or a "billing address same as shipping" checkbox; it must be on the same page (Understanding 3.3.7, Intent).
- Scope is one process, which can cross domains (a third-party payment step is in scope); nothing has to be stored between sessions (Understanding 3.3.7, Intent).
- Exceptions in practice: memory games (essential), confirming a newly created password (security), expired data (Understanding 3.3.7, Exceptions).
- Keep submitted values after a validation error instead of clearing the form (Understanding 3.3.7, Examples). Protect stored values, since auto-population can leak personal data if done badly (Understanding 3.3.7, Intent; § 5.6).

### 3.3.8 Accessible Authentication (Minimum) (AA)

- Rule: no step of an authentication process requires a cognitive function test unless that step offers an **Alternative** method without one, a **Mechanism** to assist, or the test is **Object Recognition** or identifying **Personal Content** the user provided (SC 3.3.8).
- Cognitive function test: remembering, manipulating or transcribing information, such as memorizing a password, typing characters, spelling, calculating or solving puzzles. Name, email and phone number are not cognitive function tests (Glossary).
- Mechanisms that satisfy it include password manager fill and copy and paste (Note 2). A login with correctly marked-up username or email and password fields (1.3.5 `autocomplete` purposes and 4.1.2 names) that does not block fill or paste passes (Understanding 3.3.8, Login forms; technique H100).
- Failures: blocking paste or autofill on credential or code fields; one-time codes split into one box per digit where pasting fills one box; "enter the 1st, 3rd and 5th character of your password"; math or logic CAPTCHAs without an alternative (Understanding 3.3.8, Copy and paste and Other types of cognitive tests; failure F109).
- Every step counts, including each factor of multi-factor authentication and account recovery (Understanding 3.3.8, Cognitive Function Tests). It applies to tests shown only sometimes, for example after failed attempts (Understanding 3.3.8, Object Recognition).
- Not cognitive function tests: hardware security keys, approve-on-device apps, and operating-system authenticators such as fingerprint or face unlock (Understanding 3.3.8, Two-factor authentication systems).
- Alternatives that pass: email link sign-in (technique G218), WebAuthn, sign-in with a third-party provider, QR code scanned by an app, push notification confirmed on a device (Understanding 3.3.8, Examples).
- Focus is on signing in to existing accounts, not account creation (Understanding 3.3.8, Intent). A show-password toggle helps but is not required (Understanding 3.3.8, Hiding characters).

### 3.3.9 Accessible Authentication (Enhanced) (AAA)

- Same rule as 3.3.8, but only the Alternative and Mechanism exceptions apply: object recognition and personal content are not allowed (SC 3.3.9; What's New in WCAG 2.2).

### 4.1.1 Parsing (removed)

- WCAG 2.2 marks 4.1.1 "Obsolete and removed": it addressed assistive technology parsing HTML directly, which no longer happens, and its problems no longer exist or are covered by other criteria (SC 4.1.1, Note).
- WCAG 2.1 and the WCAG 2.0 errata keep the criterion but add a note: it "should be considered as always satisfied for any content using HTML or XML" (WCAG 2.1, SC 4.1.1, Note 1; WCAG 2.0 Errata).
- Report real symptoms under the criterion they break: a missing role from bad nesting, or a wrong name or state from a duplicate ID, belongs under 1.3.1 or 4.1.2 (WCAG 2.1, SC 4.1.1, Note 2; WCAG 2 FAQ, 4.1.1 Parsing).
- Validating markup can still be useful; it is just not required for accessibility (WCAG 2 FAQ, 4.1.1 Parsing).
- A policy that still requires WCAG 2.0 or 2.1 may expect 4.1.1 to be tested and reported (WCAG 2.2, Introduction, Comparison with WCAG 2.1).
