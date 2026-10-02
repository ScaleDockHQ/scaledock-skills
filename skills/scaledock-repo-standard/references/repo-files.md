# README, repo files and VS Code

The README outline, the standard root files, the `.github` folder, and the VS Code workspace settings.

Applies to every repo kind. Keep only the README first-run steps and VS Code tasks the repo has.

## README

- Title and a one-line value statement, links, prerequisites.
- First run: `pnpm install`, `vercel link`, `pnpm env:pull`, `pnpm supabase:start`, `pnpm env:local`, `pnpm dev:portless`.
- Portless URLs and seeded logins.
- A scripts table, layout, architecture, deploy, contributing (the agent workflow from [`git-workflow.md`](git-workflow.md)) and license.

## Standard files

- `LICENSE` (MIT), `SECURITY.md`, `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `SUPPORT.md`, `.editorconfig`.
- `.gitattributes`: `* text=auto eol=lf`, binary types marked, and `linguist-generated` on the lockfile and generated types.
- `.gitignore`: build output, `.turbo`, `.next`, `.source`, `.vercel`, every `.env*` except `!.env.example`, Supabase local state, `signing_key.json` and `.claude/settings.local.json`. With Expo, also `.expo`, `dist`, and the generated `ios/` and `android/` folders.
- `.vercelignore` (never `.git`) and `.cursorignore`.
- `.env.example` with keys only.

## `.github/`

- `CODEOWNERS`.
- A PR template with What, Verify and a checklist (schema, env, i18n, changeset, pre-release pins).
- Issue forms with `blank_issues_enabled: false` and a security advisory link.

Workflows and Dependabot are in [`ci.md`](ci.md).

## VS Code

- **`settings.json`:**
  - Oxc formats every language. Format on save, `source.fixAll.oxc`, `oxc.typeAware`, `oxc.fmt.configPath`.
  - `js/ts.experimental.useTsgo` and `js/ts.tsdk.path`, with non-relative imports.
  - Tailwind `classFunctions: ["cn", "cva", "tv"]`.
  - Excludes for generated output.
- **`extensions.json`:**
  - Recommended: `oxc.oxc-vscode`, `typescriptteam.native-preview`, `bradlc.vscode-tailwindcss`, `EditorConfig.EditorConfig`, `vivaxy.vscode-conventional-commits`, `github.vscode-pull-request-github`, and `expo.vscode-expo-tools` with Expo.
  - Unwanted: eslint, prettier and biome.
- **`tasks.json`:** install, verify, `dev:portless` and the Supabase tasks.
- **`launch.json`:** `dev:portless` per app, a `serverReadyAction` matching `Ready in [0-9]+ms`, and `postDebugTask: dev:cleanup`. With Expo, one Expo Tools attach configuration for the dev client.
- **`mcp.json`:** the same servers as `.mcp.json`.
