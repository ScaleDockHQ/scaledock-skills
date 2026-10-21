# UI: shadcn + ReUI Pro, responsive by default

The component stack, ReUI Pro, lint rules, `DESIGN.md`, and the responsive and accessibility baseline. The shell and screens built on top are in [`app-shell.md`](app-shell.md).

Applies to a Next.js `app`, and its component stack, lint, `DESIGN.md`, responsive and accessibility rules apply to `docs` and `marketing` as well. The layout, chrome, components and content patterns all three web surfaces share are in [`web-design.md`](web-design.md). Expo UI is in [`expo.md`](expo.md); the `DESIGN.md`, responsive and accessibility rules here apply to it too.

- **shadcn** on Base UI (a `base-*` style) with Tailwind v4 and CSS-first tokens. Components live in `packages/ui`. Every `components.json` aliases `@{{SCOPE}}/ui` and sets `iconLibrary: "hugeicons"`.
  - Class merging comes from the `cn` package, and `lib/utils.ts` only re-exports it. In upgrade mode, run `pnpm dlx shadcn@latest migrate cn` to drop `clsx` and `tailwind-merge`.
  - Vendored registry code (shadcn, ReUI, AI Elements) stays as published, so a registry update is a re-add, not a merge. `packages/ui/tsconfig.json` turns off the strict flags it does not compile under (`exactOptionalPropertyTypes`, `noUncheckedIndexedAccess`, `noUnusedLocals`, `noUnusedParameters`, `isolatedDeclarations`, `noPropertyAccessFromIndexSignature`, `declaration`), recorded in an ADR (PermDock 0006). App code that calls it keeps the strict preset.
  - Private registries on GitHub install with `shadcn add <owner>/<repo>/<item>`, using `gh` credentials locally and `GH_TOKEN` in CI.
  - Agent interfaces use Message, Bubble, Trace, Code Block, Attachment and Questionnaire, and the shadcn AI Elements patterns copied on top of them. AI SDK Elements (`vercel/ai-elements`) is being deprecated; in upgrade mode, migrate each wrapper with the prompt on its pattern page.
- **ReUI Pro:**
  - Register the `@reui` registry with the `REUI_LICENSE_KEY` header, and add the ReUI MCP to `.cursor/mcp.json` and `.mcp.json`.
  - Install with `pnpm dlx shadcn@latest add @reui/<name> --yes`.
  - Use `data-grid` for every table, and `filters`, `kanban`, `stepper` and `date-selector` instead of hand-rolled versions.
  - Start pages from blocks; adapt them, never restyle them.
  - `REUI_LICENSE_KEY` is a team Shared Environment Variable listed in `global.passThroughEnv`, and is never committed.
- **`@shadcn/lint`** runs in oxlint: no inline styles and no raw colors.
- After every `shadcn add`, check the generated files: the `cn` import points at the app's `lib/utils` (it has come out as a bare `"cn"`), and unused React imports are removed.
- **`DESIGN.md`**, one per web app plus the shared tokens (see [`web-design.md`](web-design.md)), owns:
  - tokens and type roles
  - component ownership: `packages/ui`, then `components/`, then `features/`
  - the overlay table, the shell, and the page templates
  - a "Reject these" list that names each recurring generated-design pattern
  - Each rule is something a reviewer can observe and check ("evidence tables use the full available width", not "less cramped"). A correction that keeps coming back moves to the narrowest place that enforces it: `DESIGN.md` prose, a token or class in `packages/ui`, or a lint or e2e check.
- **Server first:**
  - Static sections (an FAQ, a feature grid, a pricing table) stay Server Components, with no `"use client"`.
  - Link-styled buttons render `<a className={buttonVariants(...)}>` from a server-only component, so `cn`, cva and the headless Button never reach the client. Record each such primitive in `DESIGN.md`.
- **Web builders** (a `/create` page that writes a preset code for `init`):
  - Each step is a filtered view of the preset catalogue by `kind`, never a hand-written list, and starts from the catalogue's defaults. The parity rules are in [`cli.md`](cli.md).
  - Follow the repo's design-system skill: its ReUI plan before building and its self-check after.
  - Take screenshots at 390px and 1440px for the review.
- **Create and edit** happen on routes. Dialogs are only for destructive confirmation or short tasks.
- **Responsive:**
  - From 360px up, with the same routes on every device.
  - The sidebar becomes a swipe drawer on mobile. `ResponsiveDialog` is a dialog on desktop and a drawer on mobile.
  - Grids hide secondary columns on small screens.
  - Touch targets `min-h-11`, hover styles behind `@media (hover: hover)`, `dvh` units and safe-area insets.
  - Light and dark themes, and reduced motion.
  - The latest published WCAG version at level AA.
  - When the repo has e2e tests, they run at mobile and desktop viewports.
