# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## URL Pattern Living Standard

Source: https://urlpattern.spec.whatwg.org/review-drafts/2026-09/

The URL Pattern Standard provides a web platform primitive for matching URLs based on a convenient pattern syntax.

- **URL Pattern.** Developers should refer to the Living Standard for the most current error corrections and other developments.
- **1.6. Constructor string parsing.** A constructor string parser has an associated input , a string, which must be set upon creation.
- **1.6. Constructor string parsing.** A constructor string parser has an associated token list , a token list , which must be set upon creation.
- **1.6. Constructor string parsing.** It must be one of the following: " init " " protocol " " authority " " username " " password " " hostname " " port " " pathname " " search " " hash " " done " The URLPattern constructor string algorithm is very similar to the basic URL parser algorithm, but some differences prevent us from using that algorithm directly.
- **2. Pattern strings.** It can be parsed to produce a part list which describes, in order, what must appear in a component string for the pattern string to match.
- **2.1.1. Tokens.** It must be one of the following: " open " The token represents a U+007B ( { ) code point.
- **2.1.2. Tokenizing.** A tokenize policy is a string that must be either " strict " or " lenient ".
- **2.1.3. Parts.** A part has an associated type , a string, which must be set upon creation.
