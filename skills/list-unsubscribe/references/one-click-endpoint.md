# One-click unsubscribe: the sender side

Read this when minting unsubscribe URIs, building the HTTPS endpoint that receives one-click POSTs, or setting a processing timeline. Section numbers refer to RFC 8058 unless another source is named.

## Why one-click exists

Anti-spam software often fetches every URI in mail header fields automatically, and the sender cannot tell an automated fetch from a user's click. Senders therefore put a confirmation step on GET landing pages, which an automated system will not complete (§ 1). One-click separates the two: a receiver that has the user's consent sends a POST, and the sender handles it as a completed unsubscribe without manual intervention (§ 1).

## The message

```text
List-Unsubscribe: <mailto:listrequest@example.com?subject=unsubscribe>,
    <https://example.com/unsubscribe/opaquepart>
List-Unsubscribe-Post: List-Unsubscribe=One-Click
```

- One `List-Unsubscribe` and one `List-Unsubscribe-Post` field (§ 3.1).
- `List-Unsubscribe` MUST contain one HTTPS URI and MAY contain other non-HTTP URIs such as `mailto:` (§ 3.1).
- `List-Unsubscribe-Post` MUST contain the single pair `List-Unsubscribe=One-Click` (§ 3.1, § 5).
- The message MUST carry at least one valid DKIM signature, and both fields MUST be in its `h=` tag (§ 3.1, § 4). DKIM is the only authentication identifier this version supports (§ 4).

## Designing the URI

- It MUST contain enough information to identify the recipient and the list, so the unsubscribe completes automatically (§ 3.1). One-click cannot ask the user which address or which list (§ 3.1).
- There are no extra POST arguments, so all message and recipient information is encoded in the URI (§ 3.1).
- It SHOULD include an opaque identifier or another hard-to-forge component, in addition to or instead of plaintext list and subscriber names, and the server SHOULD verify that component (§ 3.1, § 6). This stops a spammer from putting your unsubscribe URIs in their spam so that spam reports unsubscribe your subscribers, and stops direct POSTs to your server (§ 3.1).
- The URI may contain a plaintext or encoded recipient address; that address is usually also in `To:` (§ 6). An opaque token avoids exposing it in the URI.
- Scope the token to one list. Gmail's FAQ notes that one-click removes the recipient only from the list associated with the message (provider policy).

A token can be, for example, a random identifier looked up server-side, or a MAC over recipient and list identifiers. The RFC requires only that it is hard to forge and verified; it does not prescribe a format.

## The request the receiver sends

The receiver POSTs to the HTTPS URI, with the `List-Unsubscribe-Post` pair as the body (§ 3.2). The body SHOULD be `multipart/form-data` (RFC 7578) or MAY be `application/x-www-form-urlencoded` (§ 3.2), so accept both. From § 8.1:

```http
POST /unsubscribe/opaquepart HTTP/1.1
Host: example.com
Content-Type: application/x-www-form-urlencoded
Content-Length: 26

List-Unsubscribe=One-Click
```

From § 8.3, with errata EID 5117, 8927 and 5559 applied (boundary parameter and request target):

```http
POST /unsubscribe.html/opaque123456789 HTTP/1.1
Host: example.com
Content-Type: multipart/form-data; boundary=-FormBoundaryjWmhtjORrn
Content-Length: 124

---FormBoundaryjWmhtjORrn
Content-Disposition: form-data; name="List-Unsubscribe"

One-Click
---FormBoundaryjWmhtjORrn--
```

The request carries no cookies, HTTP authorization or other context information: the receiver MUST NOT include them (§ 3.1, § 6). The unsubscribe is logically unrelated to earlier web activity (§ 3.1).

## Handling it

- The POST target is the same as the GET target used for manual unsubscription, so the same server code can handle both (§ 3.2). Distinguish them: a POST with `List-Unsubscribe=One-Click` is the one-click action (§ 1), while a GET is the manual path, which may show a confirmation page because automated fetchers also send GETs (§ 1).
- Verify the opaque or hard-to-forge component before acting (§ 3.1, § 6).
- Complete the unsubscribe without requiring cookies, a login or any further interaction (§ 1, § 3.1). Yahoo additionally says the unsubscribe process should not require users to log in (provider policy).
- MUST NOT return an HTTPS redirect: redirected POSTs have not worked reliably, and browsers often turn them into GETs (§ 3.1).
- Provide the infrastructure to handle the POSTs and the volume of unsubscribe requests your mail will provoke (§ 3.1).
- RFC 8058 defines no response status codes, response body, retry behaviour or idempotency rules. It does say the unsubscribe can be triggered by anyone with access to the message (§ 6), so treat a repeated request for an already removed recipient as a normal case.
- Senders who also offer an in-body link may point it to a preferences page; providers accept that as long as the header-based one-click works (Gmail FAQ, Yahoo best practices; provider policy).

## Security considerations (§ 6)

- Anyone with the message can unsubscribe its recipient; that was already true of `List-Unsubscribe`, with more steps.
- A malicious mailer can craft headers that send POSTs to servers that do not want them. This is why the body is fixed to one known pair: the POST cannot simulate filling in an arbitrary form.
- An unsubscribe tells the sender the address was valid. The RFC notes simpler ways exist, such as image fetches.
- The server cannot tell where a POST came from, which is why the URI SHOULD carry a hard-to-forge component.

## Processing timeline (provider policy)

RFC 2369 and RFC 8058 set no deadline for processing an unsubscribe. Mailbox providers do:

- **Gmail** (Email sender guidelines FAQ): "we recommend that you fulfill unsubscribe requests within 48 hours". The FAQ also lists "Unsubscribe requests aren't honored within 48 hours" among conditions where delivery support or mitigations are unavailable.
- **Yahoo** (Sender Requirements & Recommendations): bulk senders must "Honor unsubscribes within 2 days"; the FAQ adds that an unsubscribe not honored in 2 days does not meet the requirement.

## Other provider requirements (provider policy)

These come from the provider pages pinned in [Sources](../SKILL.md#sources), not from the RFCs. Re-read them before relying on them.

- **Gmail** (Email sender guidelines): senders of more than 5,000 messages a day to Gmail accounts must make marketing and subscribed messages support one-click unsubscribe and include a clearly visible unsubscribe link in the body. The FAQ says one-click is required only for marketing and promotional messages, not transactional ones; that `mailto:` links and body links do not meet the requirement; that the `List-Unsubscribe` header must include one HTTPS URL; that one-click links leading to a landing page do not comply with RFC 8058; and that Gmail shows its own unsubscribe button only for messages that pass its eligibility checks.
- **Yahoo** (Sender Requirements & Recommendations): bulk senders must implement a functioning `List-Unsubscribe` header that supports one-click for marketing and subscribed messages; the POST (RFC 8058) method is highly recommended and `mailto:` is acceptable; they must have a clearly visible unsubscribe link in the body, which may lead to a preference page. The FAQ says one-click applies to promotional and marketing messages, not transactional ones, and that a body link alone is not enough.
- Both providers also require SPF, DKIM and DMARC from bulk senders; see the `spf`, `dkim` and `dmarc` skills.
