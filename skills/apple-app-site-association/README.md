# apple-app-site-association

An agent skill for apple-app-site-association: associating an app with a website.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill apple-app-site-association
```

Then ask your agent to apply apple-app-site-association.

## What it covers

- The `apple-app-site-association` file is the JSON file a website serves at `/.well-known/apple-app-site-association` to associate its domain with Apple apps for universal links, shared web credentials, Handoff and App Clips. Apple documents it in the Xcode and Bundle Resources documentation; this skill quotes those pages, read from Apple's documentation JSON.
- Apple publishes this as developer documentation, not as a versioned specification. The pages are JavaScript-rendered; the pins are the documentation JSON that backs them.

## Versions

| Line                       | Status  |
| -------------------------- | ------- |
| apple-app-site-association | current |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [Supporting associated domains](https://developer.apple.com/tutorials/data/documentation/xcode/supporting-associated-domains.json): Apple Developer Documentation, Apple Developer Documentation JSON, read 2026-10-06.
- [applinks.Details.Components](https://developer.apple.com/tutorials/data/documentation/bundleresources/applinks/details-swift.dictionary/components-swift.dictionary.json): Apple Developer Documentation, Apple Developer Documentation JSON, read 2026-10-06.
- [applinks.Defaults](https://developer.apple.com/tutorials/data/documentation/bundleresources/applinks/defaults-swift.dictionary.json): Apple Developer Documentation, Apple Developer Documentation JSON, read 2026-10-06.
- [Associated Domains Entitlement](https://developer.apple.com/tutorials/data/documentation/bundleresources/entitlements/com.apple.developer.associated-domains.json): Apple Developer Documentation, Apple Developer Documentation JSON, read 2026-10-06.
- [Supporting universal links in your app](https://developer.apple.com/tutorials/data/documentation/xcode/supporting-universal-links-in-your-app.json): Apple Developer Documentation, Apple Developer Documentation JSON, read 2026-10-06.

## License

MIT
