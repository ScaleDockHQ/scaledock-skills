# Standard shell and screens

The auth pages, the app shell, the top bar, the page templates, and the standard multi-tenant screens. The component stack they use is in [`ui.md`](ui.md).

Applies to a Next.js `app`. An Expo app keeps the same screens, page templates and interaction contracts, built from the native components in [`expo.md`](expo.md).

Build these from blocks: the ReUI MCP first (`search`, `compose_page`), then shadcn `login-02` (split auth page) and `sidebar-07` (sidebar with an organization switcher and a user footer).

## File map (`apps/app`)

```
components/
  app-shell.tsx  app-shell-client.tsx  app-sidebar.tsx  organization-switcher.tsx  nav-user.tsx
  sidebar-search-trigger.tsx  command-palette.tsx (lazy)  app-breadcrumbs.tsx (+ breadcrumbs/)
  page-shell.tsx (PageShell, PageSkeleton, DataTableSkeleton, FormSkeleton, ActionSectionSkeleton)
  feature-empty-state.tsx  error-state.tsx  not-found-content.tsx  coming-soon.tsx
  intent-prefetch-link.tsx  skip-to-content-link.tsx
lib/navigation.ts   the only list of destinations
lib/app-chrome.ts   header class recipes
```

## Auth pages (`app/[locale]/(auth)`)

- **Layout.** One layout for all auth pages:
  - `grid min-h-svh lg:grid-cols-2`.
  - The form column has the brand link top left, the language switcher top right, and the form centered at `max-w-sm`.
  - The `bg-muted` hero column is hidden below `lg` and streams with a static fallback.
  - A skip link and `main#main-content`.
  - View-transition names `auth-chrome` and `auth-hero`.
- **Pages:** `login`, `register`, `forgot-password`, `reset-password`, `auth/callback`, `invitations/[token]`, and `oauth/consent` (client name, requested scopes, Approve and Deny). The consent page serves the MCP, the CLI and Scalar alike.
- **Login:**
  - Google, a divider, then email and password with a show/hide toggle.
  - `returnTo` is preserved.
  - The form is `noValidate` with inline errors, and `AuthError.code` maps to i18n keys.
  - The submit button shows a pending state.
  - The proxy sends signed-in users away from auth pages.

## App shell

- **Mounting.** One persistent `AppShell` serves tenant, profile and admin routes. Shell data comes from a single `"use cache: private"` `getAppShellAccess()` island with an `AppSidebarSkeleton` fallback. Page children never wait for it.
- **Frame.** `Sidebar collapsible="icon"` plus `SidebarInset`, at `h-[var(--app-viewport-height,100dvh)]`, with view-transition names `app-sidebar` and `app-header`.
- **Sidebar header:**
  - **Organization switcher.** The trigger shows the logo or initials, the name and the role. The menu lists the five most recent organizations as `IntentPrefetchLink` rows to `/{slug}`, with a check on the current one, followed by "All organizations" and "Create organization". The empty state offers "Create your first organization".
  - **Search trigger.** Opens the command palette and shows a `⌘K` / `Ctrl K` chip.
- **Sidebar content:**
  - Rendered from `lib/navigation.ts`. Sections have `scope`, `permission` and a label. Items have a label key, an icon, an org-relative href, `permission` and a `prefetch` tier.
  - Hiding items is a hint only; guards and RLS decide access. Empty groups disappear.
  - Only one collapsible is open at a time. It opens when a child is active, and becomes a hover dropdown when the sidebar is collapsed.
  - Badges cap at `99+`. Active items set `aria-current="page"`.
- **Sidebar footer (`NavUser`):**
  - Shows the avatar, name and email.
  - The menu holds, in order: identity, product links (homepage, docs, changelog), a "Navigation mode" radio group when the user has several modes, Account, and Log out. Log out is last, styled as destructive, and clears local list state.
  - Guests get a Login item that keeps `returnTo`.
- **Mobile.** The sidebar is a swipe drawer that closes on navigation, with safe-area insets. Menus open downward.
- **One config drives everything.** Organization, customer and admin are modes of one shell, derived from the pathname. `lib/navigation.ts` feeds the sidebar, the command palette and the breadcrumbs. A new nav item ships with a "Coming soon" page.

## Top bar and titles

- **Top bar.** A sticky header holding `SidebarTrigger`, a divider, truncating breadcrumbs, then the notifications bell, the AI panel trigger and contextual chips.
  - Height `min-h-16` (`min-h-12` when collapsed), with safe-area padding.
  - Brand-tinted on mobile; `bg-background/95` with blur and a border on desktop.
- **Breadcrumbs:**
  - Built from a route config plus resolvers. Detail pages publish the record name.
  - The current segment is plain text. Nav-group prefixes are omitted, and tabs are not segments.
  - The skeleton fallback never calls `usePathname`.
- **Titles.** The breadcrumb says where you are, and `PageShell` renders the only `h1`. On mobile, nested pages show a back control.

## Page templates (every page is one of these)

- **`PageShell`:** synchronous.
  - Title `text-2xl font-semibold tracking-tight`, an optional description, `p-4 gap-6`.
  - Width `full`, `wide` (`max-w-4xl`) or `narrow` (`max-w-2xl`).
  - Skeletons announce loading.
- **List hub:**
  - One primary "New {entity}" action.
  - The toolbar (search, sort, Filters) sits outside the card.
  - A ReUI `data-grid` inside a `DataGridListFrame`:
    - rows are `IntentPrefetchLink`s
    - row actions are the same in the overflow menu, on right-click and on long-press
    - a floating bulk `ActionBar` appears on selection
    - pagination is server-side
  - Filters persist in localStorage. On mobile the toolbar goes icon-only and filter chips move to a second row.
  - Empty state: `FeatureEmptyState`.
- **Detail:**
  - A borderless `ActionSection` comes first: Back plus up to three actions and an Other menu on the left, cancel and confirm on the right.
  - Then `Section` cards. Each `SectionSaveButton` stays disabled until its section is dirty.
  - The danger zone comes last and uses type-to-confirm.
  - Leaving with unsaved edits prompts Keep editing, Discard, or Save and leave.
  - An optional 2/3 + 1/3 `PageSplitLayout`.
- **Create:**
  - A `/{collection}/create` route titled "New {entity}".
  - It shares one form with edit through a `mode` prop and has a bottom action bar.
  - The success toast links to the new record.
- **Settings:** route-based line tabs holding `Section` cards.
  - Profile: Info, Authentication, Communication, Delete account.
  - Organization: General, Branding (logo, primary and secondary colors), Address, Ownership, Danger zone.
- **Dashboard:** `Stat` cards, charts and short linked lists.
- **States:**
  - `ErrorState` with retry, inside a `SectionErrorBoundary`.
  - A segment `not-found.tsx` plus a `[...rest]` catch-all.
  - `global-not-found.tsx`.
  - `ComingSoon`.

## Standard multi-tenant screens and interaction contracts

- **Screens:**
  - Organizations overview and create.
  - Users: invite, resend, revoke, change role, remove.
  - A roles and permissions matrix, with built-in roles locked.
  - Notifications, the audit log, and billing (Stripe portal and plan picker).
  - Profile and organization settings.
  - `/admin` (Users, Organizations, Roles and permissions) under the system scope.
  - "Connected apps": the OAuth clients (MCP, CLI) the user has authorized, with revoke.
- **Forms:** TanStack Form with Valibot, `noValidate`, and inline errors wired through `aria-invalid` and `aria-describedby`.
- **Toasts:** one Base UI toast manager. A toast is never blank.
- **Overlays:**
  - `AlertDialog`.
  - `ResponsiveDialog`, with at most three buttons.
  - `SidePanel`, 32rem wide.
  - `Drawer`.
- **Command palette:** opens with `⌘K`, groups results into Go to, Actions and Records, and loads through `next/dynamic`.
- **Accessibility and motion:**
  - A skip link, a theme hotkey, a visible focus ring, and named icon buttons.
  - View transitions only for list to detail and between sibling tabs. Chrome never animates.
