# Receiver and mail client behaviour

Read this when building a mail client (MUA) or mailbox provider feature that offers list commands or one-click unsubscribe. Section numbers refer to RFC 2369 unless another RFC is named.

## Parsing the RFC 2369 fields

To allow future extension, clients MUST follow these rules (§ 2):

1. Except where a field says otherwise (`List-Post: NO`, § 3.4), if the content, after leading whitespace and comments, starts with anything other than `<`, the field SHOULD be ignored.
2. Characters after an angle-bracketed URL SHOULD be ignored, unless the first non-whitespace, non-comment character after `>` is a comma.
3. If a comma-separated item is not an angle-bracketed URL, that item and every item after it SHOULD be ignored.

Also:

- Ignore whitespace inside the angle brackets; poorly behaved MTAs may insert it (§ 2).
- Header field names are case-insensitive (RFC 2919 erratum EID 361, verifier notes).
- Expect at most one of each field (§ 3). The RFCs do not say what to do with duplicates; offering no one-click action is the conservative reading of RFC 8058 § 3.1, which requires one of each.

## Choosing a URI

- URLs are in order of preference from left to right; use the leftmost protocol you support or can hand to another application (§ 2).
- Use only one URL per command, and try another only if the first one failed (§ 2).
- Do not support URLs that could compromise the user's system, such as `file://` (§ 5).

## One-click (RFC 8058)

Offer one-click only when all of these hold:

- `List-Unsubscribe` contains an HTTPS URI and `List-Unsubscribe-Post` contains `List-Unsubscribe=One-Click` (RFC 8058 § 3.1, § 5).
- The message has a valid DKIM signature whose `h=` tag includes both `List-Unsubscribe` and `List-Unsubscribe-Post` (RFC 8058 § 4). Without it, the receiver SHOULD NOT offer one-click (§ 4). See the `dkim` skill for verification.

Then:

- Get user consent. The receiver MUST NOT POST without it; when and how consent is obtained is outside the spec (RFC 8058 § 3.2). RFC 8058 § 1 gives examples: a user's unsubscribe action, or an unsubscribe combined with a junk report. It also mentions systems that unsubscribe closed or abandoned mailboxes automatically (§ 1).
- POST to the HTTPS URI with the pair `List-Unsubscribe=One-Click` as the body, as `multipart/form-data` (SHOULD) or `application/x-www-form-urlencoded` (MAY) (RFC 8058 § 3.2). See [`one-click-endpoint.md`](one-click-endpoint.md) for the exact requests.
- Do not include cookies, HTTP authorization or any other context information (RFC 8058 § 3.1, § 6).
- Process it in the background without further interaction; the sender's system is expected to complete it (RFC 8058 § 1).
- Do not follow a redirect as if it were success: senders MUST NOT redirect the POST (RFC 8058 § 3.1), and browsers often turn redirected POSTs into GETs.
- RFC 8058 does not define what a receiver does with the HTTP response, or whether to retry.

## Without one-click

- For an HTTPS or HTTP URI without the one-click signal, open it for the user; the sender may show a confirmation page (RFC 8058 § 1). Automatically fetching it does not reliably unsubscribe and is exactly what one-click was designed around (RFC 8058 § 1).
- For `mailto:` commands, the client may show a dialog asking for confirmation instead of the raw command message; it should name the destination and the command (Appendix B.1). A dialog interface MUST let the user review, and possibly modify, the message before it is sent (Appendix B.2.4).
- The user must have a chance to confirm any action before it runs; for `mailto:`, building the message without sending it is appropriate (§ 5).
- If the user has several addresses, use the subscribed address when unsubscribing; prompt only when it cannot be determined from the message headers (Appendix B.1).
- Disable list commands that do not apply to the selected message (Appendix B.2).

## Using `List-Id`

- The only operation on list identifiers is case-insensitive equality, ignoring everything outside the angle brackets (RFC 2919 § 6).
- Treat a different identifier as a different list (RFC 2919 § 4). The MUA MAY tell the user when the description changes (RFC 2919 § 6).
- A forged identifier may break automated processing. Do not use `List-Id` as evidence that a message is authentic (RFC 2919 § 8).
- Parsing the optional description means decoding encoded words and other phrase forms; extracting the text between the brackets is enough for most MUAs (RFC 2919 § 3).

## Trust

List header fields can be forged like any other header (RFC 2369 § 5, RFC 2919 § 8). RFC 8058 ties one-click to a DKIM signature over the two headers for this reason (§ 4). For other list commands, the user's confirmation is the safeguard (RFC 2369 § 5). Mailbox providers may apply further checks before showing an unsubscribe button: Gmail shows it only for messages that pass its eligibility checks, and Yahoo only with sufficient reputation and engagement (provider policy).
