# Shared web design

The layout, chrome, components, state and content patterns that `app`, `docs` and `marketing` share, so the three look and behave as one product. The component stack is in [`ui.md`](ui.md), the product shell in [`app-shell.md`](app-shell.md), and the Fumadocs setup in [`docs-site.md`](docs-site.md); each of them points here for what they share.

Applies to every Next.js web surface. Library repos apply it to their docs site and, when they have one, their marketing site. Each rule applies only when the surface has that feature: a site without install commands needs no "Get code" dialog.

The architecture is the `nextjs-app-architecture` skill on every surface (see [`nextjs.md`](nextjs.md)). The visual rules are the `reui` skill and the installed shadcn style. This file adds only what those two leave open.

## Folders and `DESIGN.md`

- **Feature folders on every surface.** Marketing and docs put their UI in `features/<domain>/components`, the same as the app, with `<domain>-queries.ts` beside them when a feature reads data. `components/ui` and `components/reui` hold installed primitives, `components/site` holds the chrome (navbar, footer, logo, `NavLink`, `SiteLink`, `LinkButton`), and `components/sections` holds page sections.
- **`lib/` is pure.** It holds data and helpers with no React and no I/O beyond reading committed files: parsers, graph layouts, prompt builders, the integration list, the entity icon map. Every helper has a unit test (see [`tests.md`](tests.md)).
- **One `DESIGN.md` per web app** (`apps/app/DESIGN.md`, `apps/docs/DESIGN.md`, `apps/marketing/DESIGN.md`). Each names the app's layouts, its shared components and where they live, and its exceptions to the `reui` rules, each with a reason. Tokens, type roles and the "Reject these" list are the same for all three, so they live in the root `DESIGN.md` or `packages/ui`, and the app files link to them instead of copying them. A docs app on the Fumadocs theme says which Fumadocs tokens it maps to the shared ones.

## Layout

- **One route group per section.** A section with its own navigation gets its own route group and layout (for example `(guides)`, `(examples)`, `(builder)`), so each layout passes its own nav. One catalog layout shared by unrelated sections is a gap.
- **`SidebarShell`.** One component holds the section sidebar on every surface: a sticky aside from `lg` up, and a Sheet with a trigger below it. Each section's layout passes its own nav component into it. The nav groups links by category, and each category heading carries its category icon. Fumadocs pages keep the Fumadocs sidebar; any other sidebar on the docs site uses `SidebarShell`.
- **Sidebar scrolling.**
  - The nav sits in the shadcn `ScrollArea`, so no system scrollbar shows. Its scrollbar appears on hover or while scrolling.
  - The viewport sets `overscroll-behavior: contain` and has fade masks at the top and bottom edges.
  - After each navigation, the link with `aria-current="page"` scrolls into view with `scrollIntoView({ block: "nearest" })`, so a link that is already visible stays put. The scroll is instant under `prefers-reduced-motion: reduce`.
- **Width and rhythm.** Content and section widths, paddings and type roles come from the shared tokens in `DESIGN.md`, so a page moved from marketing to docs looks the same.

## Shared chrome

- **Topbar.**
  - No theme button. Pressing D toggles light and dark. The handler ignores `event.repeat`, any modifier key, and focus in an `input`, `textarea`, `select` or `contenteditable` element. The footer names the shortcut.
  - GitHub is an icon button with an `aria-label` such as "GitHub repository".
  - Nav links set `aria-current="page"` from `NavLink`, a small client leaf that reads `usePathname`. The topbar itself stays a Server Component.
- **`CopyButton({ text, label })`.** One component for the whole site, in `components/site`. `label` is the accessible name ("Copy install command"). After a copy it swaps to a check icon for about two seconds and announces "Copied" through a polite live region. No feature defines its own copy button.
- **Install commands** sit in one "Get code" dialog, with one tab per package manager (pnpm, npm, yarn, bun) and a `CopyButton` per command. The chosen package manager is URL state (see below).
- **Footer.** The same footer on every surface, with the theme shortcut, the docs and GitHub links, and the legal links.

## Entities, logos and integrations

- **Entity icons.** One map from each catalog entity to its icon, in `lib/` or the feature folder (`<entity>-icons.ts`). The icon is tinted with its category color from the category definitions; category hues appear only in catalog visuals, never in the chrome. A unit test checks that every entity has an icon, that the map has no entry for a removed entity, that icons are unique within a category, and that unknown entities get the fallback icon.
- **Logo clouds and integration lists.**
  - The list is data in `lib/integrations.ts`: name, slug, icon and docs path.
  - Brand marks come from `simple-icons`. A brand it lacks gets a plain fallback glyph (its initial in the same box), never a hand-drawn logo.
  - Every logo links to a docs page that exists. A completeness test checks each docs path against the docs content, and checks that each integration page in the docs appears in the list.

## State in the URL

- Shareable state lives in the URL: the platform, the package manager, the selected preset, the selected items. Use nuqs, or keep local state in sync with the URL in both directions.
- Under `cacheComponents` the page is prerendered, so the first render has no search params. A tab must still read the URL after hydration and switch when the URL changes; we hit a bug where the URL changed and the tab did not. An e2e test covers it on the production build (see [`tests.md`](tests.md)).

## Graphics and heavy client code

- **Static graphics** (a dependency graph, an architecture diagram) are SVG rendered on the server, with token classes for color.
  - The SVG has `role="img"` and a `<title>`, and contains no links; links inside it fail axe `nested-interactive`.
  - The links sit in an absolutely positioned overlay with `aria-hidden="true"` and `tabindex="-1"`, and are repeated in a visually hidden list that shows when one of its links has focus.
- **Heavy client libraries** (diagram editors, graph layout engines, rich editors) load through `next/dynamic` only when their UI renders, never from a module every page imports. Record the lazy chunk's gzipped size in the size baseline (see [`performance.md`](performance.md)).

## Content for people and agents

- **Code highlighting.** Shiki output rendered on the server is part of the page HTML, and a page with many files can grow by hundreds of KB. Highlight only the file that is shown, and highlight the others on demand when the user opens them.
- **Generated catalog data** (JSON built from the library, through scripts such as `pnpm catalog` or `pnpm recipes`) is committed, has a `--check` mode that `gen:check` runs in `verify`, and is never edited by hand.
- **Markdown mirrors.** Every docs and marketing page has a `.md` mirror for agents, built and cached as [`performance.md`](performance.md) describes. A page that offers an AI prompt puts the same prompt in its mirror. The negotiation rules are in [`nextjs.md`](nextjs.md) and the `scaledock-agent-ready-web` skill.
- **Screenshots** of an example app come from a Playwright script, run with a root `screenshots:<name>` script. The script finds elements through `data-*` hooks placed outside the code regions that the docs publish as snippets, and waits until the results show before it captures.

## Accessibility baseline

The rules in [`ui.md`](ui.md) apply to every surface. In addition:

- A skip link to `main` is the first tab stop on every page.
- A region that scrolls on its own (a long code panel) is focusable and named.
- axe passes in light and dark mode, and no page scrolls sideways at 360px except inside code blocks.
