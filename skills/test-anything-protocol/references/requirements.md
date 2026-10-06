# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## TAP 14

Source: https://testanything.org/tap-version-14-specification.html

TestPoint := ("not ")? "ok" (" " Number)? ((" -")? (" " Description) )? (" " Directive)? "\n" (YAMLBlock)?

- **Whitespace Around Directive Delimiter.** For example: TAP version 14 # MUST be treated as a SKIP test ok 1 - must be skipped test # SKIP # MUST NOT be treated as a SKIP test ok 2 - must not be skipped test \# SKIP # MAY be treated as a SKIP test, but SHOULD warn about it ok 3 - may skip, but should warn# skip ok 4 - may skip, but should warn # skip ok 5 - may skip, but should warn#skip
- **Synopsis.** The key words must , must not , required , shall , shall not , should , should not , recommended , may , and optional in this document are to be interpreted as described in RFC 2119 .
- **Changes From TAP13 Format.** That is, TAP14 is designed to be reasonably parseable by any compliant TAP13 Harness, and TAP14 Harnesses should be able to reasonably interpret the output of TAP13 Producers.
- **Harness Behavior.** A harness that is collecting output from a test program should read and interpret TAP from the process’s standard output, not standard error.
- **Harness Behavior.** (Handling of test standard error is implementation-specific.) A Harness should normalize line endings by replacing any instances of \r\n or \r in the TAP document with \n .
- **Harness Behavior.** A harness should treat a test program as a failed test if: The TAP output lines indicate test failure, or The TAP output of the process is invalid in a way that is not recoverable, or The exit code of the test program is not 0 (including test programs killed by a fatal Unix signal).
- **Harness Behavior.** If one or more test programs are considered failures, then a TAP Harness should indicate failure to the user in whatever means are appropriate.
- **Document Structure.** TAP14 producers must encode TAP data using the UTF-8 encoding.
