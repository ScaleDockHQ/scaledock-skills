# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## EditorConfig

Source: https://spec.editorconfig.org/

considered literally. It means, that pattern [ab*c{1..2}] is considered literally:

- **Supported Pairs ¶.** With the exception of the root key, all pairs MUST be located under a section to take effect.
- **Indentation (Non-Normative) ¶.** For another example, if we have the following EditorConfig file: root = true [another_file.py] indent_style = tab indent_size = 8 tab_width = 4 One MUST expect that spaces will not be used at all for indentation, since all the indentation can be achieved via tabs only.
- **Terminology ¶.** EditorConfig files must conform to this specification.
- **Terminology ¶.** A conforming core or plugin must pass the tests in the core-tests repository or plugin-tests repository , respectively.
- **File Format ¶.** EditorConfig files must be UTF-8 encoded, with LF or CRLF line separators.
- **Glob Expressions ¶.** Thus, the globs /subdir/_.c and subdir/_.c must yield the same result.
- **Glob Expressions ¶.** Cores must accept section names with length up to and including 1024 characters.
- **Capitalization of the File Name ¶.** As noted above, the .editorconfig filename should be lowercased.
