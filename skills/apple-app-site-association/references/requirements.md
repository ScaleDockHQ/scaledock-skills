# Requirements from the pinned text

These sentences were read from the pinned Apple documentation on 2026-10-06. Apple's documentation does not use BCP 14 keywords, so the quotes are the defining rules and statements of the pages, quoted as written. Apply the ones that match the role. Each is labelled with the page and section it comes from.

## Supporting associated domains

Source: https://developer.apple.com/tutorials/data/documentation/xcode/supporting-associated-domains.json

- **Overview.** The apps in the `apple-app-site-association` file on your website must have a matching Associated Domains Entitlement.
- **Add the associated domain file to your website.** If your site uses multiple subdomains (such as `example.com`, `www.example.com`, and `support.example.com`), each requires its own entry in the Associated Domains Entitlement, and each must serve its own `apple-app-site-association` file.
- **Add the associated domain file to your website.** To add the associated domain file to your website, create a file named `apple-app-site-association` (without an extension).
- **Add the associated domain file to your website.** For universal links, be sure to list the app identifiers for your domain in the `applinks` service. Similarly, if you create an App Clip, be sure to list your App Clip's app identifier using the `appclips` service.
- **Add the associated domain file to your website.** `<Application Identifier Prefix>.<Bundle Identifier>`
- **Add the associated domain file to your website.** The `details` dictionary only applies to the applinks service type; other service types don't use it.
- **Add the associated domain file to your website.** After you construct the association file, place it in your site's .`well-known` directory.
- **Add the associated domain file to your website.** You must host the file using `https://` with a valid certificate and with no redirects.
- **Add the associated domains entitlement to your app.** Make sure to only include the desired subdomain and the top-level domain.
- **Add the associated domains entitlement to your app.** `<service>:<fully qualified domain>`
- **Add the associated domains entitlement to your app.** For services other than `appclips`, you can prefix a domain with `*.` to match all of its subdomains.
- **Add the associated domains entitlement to your app.** Starting with macOS 11 and iOS 14, apps no longer send requests for `apple-app-site-association` files directly to your web server. Instead, they send these requests to an Apple-managed content delivery network (CDN) dedicated to associated domains.
- **Add the associated domains entitlement to your app.** Apple's content delivery network requests the `apple-app-site-association` file for your domain within 24 hours. Devices check for updates approximately once per week after app installation.

## applinks pattern matching

Source: https://developer.apple.com/tutorials/data/documentation/bundleresources/applinks/details-swift.dictionary/components-swift.dictionary.json

- **applinks.Details.Components.** The order that you use to specify the patterns in the array determines the order the system follows when looking for a match. The first match wins, allowing you to designate one app to handle specified URLs in your website, and another app to handle the rest.
- **applinks.Details.Components.** A match occurs when a URL matches all the components that a `components` object specifies.
- **applinks.Details.Components.** `exclude`: A Boolean value that indicates whether to stop pattern matching and prevent the universal link from opening if the URL matches the associated pattern. The default is `false`.
- **applinks.Details.Components.** `caseSensitive`: A Boolean value that indicates whether pattern matching is case-sensitive. The default is `true`.
- **applinks.Details.Components.** `percentEncoded`: A Boolean value that indicates whether URLs are percent-encoded. The default is `true`.
- **applinks.Details.Components.** In addition, you can use `?*` to match one or more characters (that is, at least one character).

## applinks defaults

Source: https://developer.apple.com/tutorials/data/documentation/bundleresources/applinks/defaults-swift.dictionary.json

- **applinks.Defaults.** The more specific definition overrides the less specific. So the default values you set at the app level override the default values you set at the domain level.

## Associated Domains Entitlement

Source: https://developer.apple.com/tutorials/data/documentation/bundleresources/entitlements/com.apple.developer.associated-domains.json

- **Associated Domains Entitlement.** If the CDN has an old version of the file, or doesn't already have a copy of the file, it connects to your web server to obtain the latest version.
- **Associated Domains Entitlement.** As an additional precaution, only apps that you sign with a development profile can use developer mode, and users must opt-in on any device they use.

## Supporting universal links in your app

Source: https://developer.apple.com/tutorials/data/documentation/xcode/supporting-universal-links-in-your-app.json

- **Overview.** Universal links offer a potential attack vector into your app, so make sure to validate all URL parameters and discard any malformed URLs. In addition, limit the available actions to those that don't risk the user's data.
