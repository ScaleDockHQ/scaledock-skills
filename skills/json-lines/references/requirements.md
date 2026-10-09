# Requirements from the pinned text

These sentences were read from the pinned source on 2026-10-06. They are the requirements and conventions on the jsonlines.org page, quoted as written. Apply the ones that match the role. Each is labelled with the heading of the page it comes from.

## JSON Lines

Source: https://raw.githubusercontent.com/wardi/jsonlines/d5ba812c995afc83d8a3b29f0a7f1b7cf0bf17fb/index.md

The page source is HTML inside Markdown; the quotes are its text with the markup removed.

- **Introduction.** The JSON Lines format has three requirements:
- **1. UTF-8 Encoding.** The author of the JSON Lines file may choose to escape characters to work with plain ASCII files.
- **1. UTF-8 Encoding.** Like the JSON standard a byte order mark (U+FEFF) must NOT be included.
- **2. Each Line is a Valid JSON Value.** The most common values will be objects or arrays, but any JSON value is permitted.
- **2. Each Line is a Valid JSON Value.** e.g. null is a valid value but a blank line is not.
- **3. Line Terminator is '\n'.** This means '\r\n' is also supported because surrounding white space is implicitly ignored when parsing JSON values.
- **3. Line Terminator is '\n'.** Including a line terminator after the last JSON value in a file is strongly recommended but not required.
- **3. Line Terminator is '\n'.** If a line terminator follows the last JSON value in a file, it must be the last byte in the file.
- **Conventions.** JSON Lines files may be saved with the file extension .jsonl.
- **Conventions.** Stream compressors like gzip or bzip2 are recommended for saving space, resulting in .jsonl.gz or .jsonl.bz2 files.
- **Conventions.** MIME type may be application/jsonl, but this is not yet standardized;
- **Conventions.** The first value in a JSON Lines file should also be called "value 1".
