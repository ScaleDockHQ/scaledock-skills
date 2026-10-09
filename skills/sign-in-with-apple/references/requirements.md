# Requirements from the pinned text

These sentences were read from the pinned Apple documentation on 2026-10-06. Apple's documentation rarely uses BCP 14 keywords, so the quotes are the defining rules and statements of the pages, quoted as written (including Apple's own typos). Apply the ones that match the role. Each is labelled with the page section or parameter it comes from.

## Authenticating users

Source: https://developer.apple.com/tutorials/data/documentation/signinwithapple/authenticating-users-with-sign-in-with-apple.json

- **Authenticate the user and request information.** Initialize an authentication session with your app server and associate a client session with an ID token using the `nonce` value.
- **Authenticate the user and request information.** Treat this user as any other account with limited information that requires additional verification steps. Don't block service, because the user may be a real person.
- **Send information to app servers and verify tokens.** Use the authorization grant code to verify the token claims with Apple servers, and exchange them for refresh tokens.
- **Send information to app servers and verify tokens.** When you receive user information from the API response, immediately store it locally so your app can access it again in the event of a process or network failure.
- **Prevent duplicate accounts.** For new accounts that use Sign in with Apple, let the user know that they're creating a new account, and ask if they have any existing accounts to link to.

## Verifying a user

Source: https://developer.apple.com/tutorials/data/documentation/signinwithapple/verifying-a-user.json

- **Verify the identity token.** Verify the JWS E256 signature using the server's public key
- **Verify the identity token.** Verify the `nonce` for the authentication
- **Verify the identity token.** Verify that the `iss` field contains `https://appleid.apple.com`
- **Verify the identity token.** Verify that the `aud` field is the developer's `client_id`
- **Verify the identity token.** Verify that the time is earlier than the `exp` value of the token
- **Obtain a refresh token.** You may verify the refresh token up to once a day to confirm that the user's Apple Account on that device is still in good standing with Apple's servers. Apple's servers may throttle your call if you attempt to verify a user's Apple Account more than once a day.
- **Obtain a refresh token.** If any step of the token verification fails, direct your app to fetch a new identity token for the user.
- **Manage the user session.** If the user's Apple Account changes in the system, calls to `getCredentialState(forUserID:completion:)` indicate that the user changed. Assume that a different user has signed in and log out the app's currently known user.
- **Manage the user session.** For apps running on other systems, use the periodic successful verification of the refresh token to determine the lifetime of the user session.

## Token validation

Source: https://developer.apple.com/tutorials/data/documentation/signinwithapplerestapi/generate-and-validate-tokens.json

- **Validate the authorization grant code.** When authorizing a user with your app, include the `redirect_uri` parameter only if the application provided a `redirect_uri` in the initial authorization request.

## Authorization request on other platforms

Source: https://developer.apple.com/tutorials/data/documentation/signinwithapple/incorporating-sign-in-with-apple-into-other-platforms.json

- **Send the required query parameters, client_id.** The identifier must not include your Team ID, to help mitigate the possibility of exposing sensitive data to the end user.
- **Send the required query parameters, redirect_uri.** It must include a domain name and can't be an IP address or `localhost`, and must not contain a fragment identifer (#).
- **Send the required query parameters, response_type.** Requesting only `id_token` is unsupported. When requesting `id_token`, `response_mode` must be either `fragment` or `form_post`.
- **Send the required query parameters, response_mode.** If you requested any scopes, the value must be `form_post`.
- **Send the required query parameters, nonce.** `nonce`: A String value used to associate a client session with an ID token. This value is also used to mitigate replay attacks.
- **Handle the response, code.** `code`: A single-use authorization code that's valid for five minutes.

## Server-to-server notifications

Source: https://developer.apple.com/tutorials/data/documentation/signinwithapple/processing-changes-for-sign-in-with-apple-accounts.json

- **Set up your server.** To receive server notifications for Sign in with Apple, your server must support the Transport Layer Security (TLS) 1.2 protocol or later.
- **Decode and validate the notifications.** After your server receives a notification, examine the JWS payload and use the algorithm specified in the header's `alg` parameter to validate the signature.
- **Process disabling and deleting a user's Apple Account.** When a user permanently deletes their Apple Account, Sign in with Apple invalidates all user tokens and disables email forwarding for all associated apps.
