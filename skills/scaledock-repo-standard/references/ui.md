# UI: shadcn + ReUI Pro, responsive by default

The component stack, ReUI Pro, lint rules, `DESIGN.md`, and the responsive and accessibility baseline. The shell and screens built on top are in [`app-shell.md`](app-shell.md).

Applies to a Next.js `app`. Expo UI is in [`expo.md`](expo.md); the `DESIGN.md`, responsive and accessibility rules here apply to it too.

- **shadcn** on Base UI (a `base-*` style) with Tailwind v4 and CSS-first tokens. Components live in `packages/ui`. Every `components.json` aliases `@{{SCOPE}}/ui` and sets `iconLibrary: "hugeicons"`.
- **ReUI Pro:**
  - Register the `@reui` registry with the `REUI_LICENSE_KEY` header, and add the ReUI MCP to `.cursor/mcp.json` and `.mcp.json`.
  - Install with `pnpm dlx shadcn@latest add @reui/<name> --yes`.
  - Use `data-grid` for every table, and `filters`, `kanban`, `stepper` and `date-selector` instead of hand-rolled versions.
  - Start pages from blocks; adapt them, never restyle them.
  - `REUI_LICENSE_KEY` is a team Shared Environment Variable listed in `global.passThroughEnv`, and is never committed.
- **`@shadcn/lint`** runs in oxlint: no inline styles and no raw colors.
- **`DESIGN.md`** owns:
  - tokens and type roles
  - component ownership: `packages/ui`, then `components/`, then `features/`
  - the overlay table, the shell, and the page templates
  - a "Reject these" list
- **Server first:**
  - Static sections (an FAQ, a feature grid, a pricing table) stay Server Components, with no `"use client"`.
  - Link-styled buttons render `<a className={buttonVariants(...)}>` from a server-only component, so tailwind-merge, cva and the headless Button never reach the client. Record each such primitive in `DESIGN.md`.
- **Create and edit** happen on routes. Dialogs are only for destructive confirmation or short tasks.
- **Responsive:**
  - From 360px up, with the same routes on every device.
  - The sidebar becomes a swipe drawer on mobile. `ResponsiveDialog` is a dialog on desktop and a drawer on mobile.
  - Grids hide secondary columns on small screens.
  - Touch targets `min-h-11`, hover styles behind `@media (hover: hover)`, `dvh` units and safe-area insets.
  - Light and dark themes, and reduced motion.
  - The latest published WCAG version at level AA.
  - When the repo has e2e tests, they run at mobile and desktop viewports.
