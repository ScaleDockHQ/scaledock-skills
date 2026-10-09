# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative prose and algorithm steps from the published text, quoted as written (only line breaks were joined), labelled by clause. Apply the ones that match the role. Each is labelled with the section it comes from in the published document. They come from the 2026 edition; check the pinned 2025 or 2024 edition when targeting an older line.

## ECMA-402 2026 (ECMAScript 2026 Internationalization API Specification)

Source: https://tc39.es/ecma402/2026/

- **§ 2.** A conforming implementation of this specification must conform to ECMA-262, and must provide and support all the objects, properties, functions, and program semantics described in this specification.
- **§ 2.** A conforming implementation is not permitted to add optional arguments to the functions defined in this specification.
- **§ 4.4.** In browser implementations the initial set of locales, currencies, calendars, numbering systems, and other enumerable items visible to a particular origin must be the same for all users sharing the same user agent string (engine and platform version).
- **§ 4.4.** Furthermore, dynamic changes to these sets must not result in users becoming distinguishable from each other.
- **§ 4.4.** As a result of this constraint, the first time a browser implementation that allows on-demand locale installation receives a request from a particular origin that could require installing a new locale, it must not reveal whether or not that locale is already installed.
- **§ 5.** An implementation of the API must behave as if it produced and operated upon internal slots in the manner described here.
- **§ 6.1.** No other case folding equivalences are applied.
- **§ 6.1.** For example, "ß" (U+00DF) must not match or be mapped to "SS" (U+0053, U+0053).
- **§ 6.2.3.** It must not contain a Unicode locale extension sequence.
- **§ 6.3.** This specification identifies currencies using 3-letter currency codes as defined by ISO 4217. Their canonical form is uppercase.
- **§ 6.3.1.** If the length of currency is not 3, return false.
- **§ 6.5.** Implementations that adopt this specification must be time zone aware: they must use the IANA Time Zone Database https://www.iana.org/time-zones/ to supply available named time zone identifiers and data used in ECMAScript calculations and formatting.
- **§ 6.5.** Available named time zone identifiers returned by ECMAScript built-in objects must use the casing found in the IANA Time Zone Database.
- **§ 6.5.** For historical reasons, "UTC" must be a primary time zone identifier.
- **§ 6.5.** "Etc/UTC", "Etc/GMT", and "GMT", as well as all Link names that resolve to any of them, must be non-primary time identifiers that resolve to "UTC".
- **§ 9.1.** It must include the value returned by DefaultLocale.
- **§ 9.1.** Additionally, for each element with more than one subtag, it must also include a less narrow language tag with the same language subtag and a strict subset of the same following subtags (i.e., omitting one or more) to serve as a potential fallback from ResolveLocale.
- **§ 9.2.1.** If IsWellFormedLanguageTag(tag) is false, throw a RangeError exception.
- **§ 9.2.1.** If seen does not contain canonicalizedTag, append canonicalizedTag to seen.
- **§ 10.3.3.2.** String values must be interpreted as UTF-16 code unit sequences as described in ECMA-262, 6.1.4, and a surrogate pair (a code unit in the range 0xD800 to 0xDBFF followed by a code unit in the range 0xDC00 to 0xDFFF) within a string must be interpreted as the corresponding code point.
- **§ 11.2.3.** [[LocaleData]].[[`<locale>`]].[[hourCycle]] must be one of the String values "h11", "h12", "h23", or "h24".
- **§ 14.2.3.** Each template string must contain the substrings "{0}" and "{1}" exactly once.
- **§ 16.1.3.** If IsWellFormedCurrencyCode(currency) is false, throw a RangeError exception.
- **§ 16.2.3.** The List that is the value of the "nu" field of any locale field of [[LocaleData]] must not include the values "native", "traditio", or "finance".
