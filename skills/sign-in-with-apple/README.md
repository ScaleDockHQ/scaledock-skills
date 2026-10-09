# sign-in-with-apple

An agent skill for Sign in with Apple: signing users in with Apple.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill sign-in-with-apple
```

Then ask your agent to apply Sign in with Apple.

## What it covers

- Sign in with Apple lets users sign in to apps and websites with their Apple Account. Apple documents the flow, the REST endpoints at `appleid.apple.com` and the server-to-server notifications in its developer documentation; this skill quotes those pages, read from Apple's documentation JSON.
- Apple publishes Sign in with Apple as developer documentation, not as a versioned specification. The pages are JavaScript-rendered; the pins are the documentation JSON that backs them. The flow follows OAuth 2.0 and OpenID Connect; install those skills for the general protocol rules.

## Versions

| Line               | Status  |
| ------------------ | ------- |
| Sign in with Apple | current |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [Authenticating users with Sign in with Apple](https://developer.apple.com/tutorials/data/documentation/signinwithapple/authenticating-users-with-sign-in-with-apple.json): Apple Developer Documentation, Apple Developer Documentation JSON, read 2026-10-06.
- [Verifying a user](https://developer.apple.com/tutorials/data/documentation/signinwithapple/verifying-a-user.json): Apple Developer Documentation, Apple Developer Documentation JSON, read 2026-10-06.
- [Token validation (Sign in with Apple REST API)](https://developer.apple.com/tutorials/data/documentation/signinwithapplerestapi/generate-and-validate-tokens.json): Apple Developer Documentation, Apple Developer Documentation JSON, read 2026-10-06.
- [Incorporating Sign in with Apple into other platforms](https://developer.apple.com/tutorials/data/documentation/signinwithapple/incorporating-sign-in-with-apple-into-other-platforms.json): Apple Developer Documentation, Apple Developer Documentation JSON, read 2026-10-06.
- [Processing changes for Sign in with Apple accounts](https://developer.apple.com/tutorials/data/documentation/signinwithapple/processing-changes-for-sign-in-with-apple-accounts.json): Apple Developer Documentation, Apple Developer Documentation JSON, read 2026-10-06.

## License

MIT
