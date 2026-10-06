# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## xAPI 2.0

Source: https://raw.githubusercontent.com/adlnet/xAPI-Spec/master/xAPI-Data.md

> Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except

- **document.** [MUST / SHOULD / MAY](./xAPI-About.md#21-must--should--may) * 2.2.
- **document.** ###### Requirements * Statements and other objects SHOULD NOT include properties with a value of an empty object.
- **document.** * A Statement MUST use each property no more than one time.
- **document.** * A Statement MUST use "actor", "verb", and "object".
- **document.** * The LRS MUST NOT return a different serialization of any properties except those [listed as exceptions](#231-statement-immutability).
- **document.** * Values requiring IRIs MUST be sent with valid IRIs.
- **document.** * Keys of language maps MUST be sent with valid [RFC 5646](http://tools.ietf.org/html/rfc5646) language tags, for similar reasons.
- **document.** * A library SHOULD be used to construct IRIs, as opposed to string concatenation.
