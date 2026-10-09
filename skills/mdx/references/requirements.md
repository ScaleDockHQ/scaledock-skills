# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. The MDX documentation has no MUST or SHALL keywords, so these are its syntax rules and usage rules, quoted as written. Apply the ones that match the role. Each is labelled with the page heading it comes from.

## What is MDX?

Source: https://raw.githubusercontent.com/mdx-js/mdx/50aa8df0b027c893dec9f97a2b7c51539e9f1a4b/docs/docs/what-is-mdx.mdx

- **MDX syntax.** The MDX syntax combines markdown with JSX.
- **MDX syntax § Markdown.** Nonstandard markdown features (such as GFM, frontmatter, math, syntax highlighting) can be enabled with plugins
- **MDX syntax § Markdown.** Indented code does not work in MDX:
- **MDX syntax § Markdown.** Autolinks do not work in MDX.
- **MDX syntax § Markdown.** HTML syntax doesn’t work in MDX as it’s replaced by JSX (`<img>` to `<img />`).
- **MDX syntax § Markdown.** Instead of HTML comments, you can use JavaScript comments in braces:
- **MDX syntax § Markdown.** Unescaped left angle bracket / less than (`<`) and left curly brace (`{`) have to be escaped: `\<` or `\{` (or use expressions: `{'<'}`, `{'{'}`)
- **MDX syntax § JSX.** Note that components must be defined.
- **MDX syntax § Expressions.** Expressions can contain whole JavaScript programs as long as they’re (wrapped in) an expression that evaluates to something that can be rendered.
- **MDX syntax § ESM.** MDX supports `import` and `export` statements from JavaScript as well.
- **MDX syntax § Interleaving.** You can use markdown “inlines” but not “blocks” inside JSX if the text and tags are on the same line:
- **MDX syntax § Interleaving.** Text and tags on one line don’t produce blocks so they don’t produce `<p>`s either.
- **MDX syntax § Interleaving.** It’s not possible to wrap “blocks” if text and tags are on the same line but the corresponding opening and closing tags are in different blocks (so this is invalid!):

## Using MDX

Source: https://raw.githubusercontent.com/mdx-js/mdx/50aa8df0b027c893dec9f97a2b7c51539e9f1a4b/docs/docs/using-mdx.mdx

- **How MDX works.** An integration compiles MDX syntax to JavaScript.
- **MDX content.** We just saw that MDX files are compiled to components.
- **MDX content § Layout.** If it is defined, it’s used to wrap all content.
- **MDX content § Layout.** The layout can also be passed as `components.wrapper` (but a local one takes precedence).
- **MDX provider.** You probably don’t need a provider.
