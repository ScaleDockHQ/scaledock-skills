# Evaluation, results and recording

Read this when implementing or auditing an SPF verifier, interpreting a result, choosing an SMTP reply, or writing `Received-SPF` and `Authentication-Results`. Section numbers are RFC 7208 unless another RFC is named.

## Identities

- **`HELO`**: the domain from the SMTP `HELO` or `EHLO` command (§ 1.1.4). Checking it is RECOMMENDED, and before `MAIL FROM` when both are checked (§ 2.3). It can only be checked when it is a valid multi-label domain name; verifiers have to expect IP literals and malformed values (§ 2.3).
- **`MAIL FROM`**: the RFC 5321 reverse-path (§ 1.1.3). It MUST be checked when a `HELO` check was not done or was not definitive (§ 2.4). With a null reverse-path, it is `postmaster@` plus the `HELO` domain (§ 2.4).
- Extract the domain carefully: source routes, the `%`-hack and bang paths have been used to bypass checks (§ 2.2).
- Other identities, such as `From:`, are NOT RECOMMENDED for `v=spf1` checks without the publisher's explicit approval (§ 2.2).
- Check during the SMTP transaction, at the `MAIL` command, with the connecting client's IP (§ 2.5). Within an organization, check at the border MTAs, including secondary MXs; checks further inside are unreliable (Appendix F).

## check_host()

`check_host(<ip>, <domain>, <sender>)` returns one result. An implementation may use another algorithm but MUST give the same results (§ 4).

1. **Arguments** (§ 4.1). `<ip>` is the SMTP client address; `<domain>` starts as the domain of the checked identity; `<sender>` is the full `MAIL FROM` or `HELO` identity.
2. **Initial processing** (§ 4.3). A malformed `<domain>` (a label over 63 characters, an empty label not at the end), a single-label name, or NXDOMAIN returns `none`. IDNs are A-labels (§ 4.3; RFC 8616 § 4). A `<sender>` without a local-part gets `postmaster`.
3. **Record lookup** (§ 4.4). Query TXT only. RCODE 2, any RCODE other than 0 or 3, or a timeout returns `temperror`.
4. **Record selection** (§ 4.5). Keep records that start with exactly `v=spf1` followed by a space or the end. None left returns `none`; more than one returns `permerror`.
5. **Syntax check** (§ 4.6). Any syntax error anywhere in the record returns `permerror` before anything is evaluated.
6. **Mechanisms** (§ 4.6.2). Evaluate left to right. A match returns the qualifier's result; no match continues; an exception returns it. Terms after `all` are ignored (§ 5.1).
7. **DNS errors inside mechanisms** (§ 5). RCODE other than 0 or 3, or a timeout, stops evaluation with `temperror` at the top level. NXDOMAIN is treated as an empty answer (and counts as a void lookup, § 4.6.4).
8. **Default** (§ 4.7). With no match: follow `redirect` if present (§ 6.1), else return `neutral`.
9. **Recursion** (§ 5.2, § 6.1). `include` and `redirect` call `check_host()` with the new `<domain>`; `<ip>` and `<sender>` stay the same. The DNS lookup limit is one global count across all recursion (§ 4.1).
10. **Explanation** (§ 6.2). On `fail` from a matching mechanism, compute the `exp` string, or return a default or empty explanation.

Limits that end evaluation are in [`limits-and-pitfalls.md`](limits-and-pitfalls.md).

## Results

| Result      | Meaning                                                            | Definition | Handling |
| ----------- | ------------------------------------------------------------------ | ---------- | -------- |
| `none`      | No valid domain, or no SPF record found                            | § 2.6.1    | § 8.1    |
| `neutral`   | The domain explicitly asserts nothing about this IP                | § 2.6.2    | § 8.2    |
| `pass`      | The client is authorized for this identity                         | § 2.6.3    | § 8.3    |
| `fail`      | The client is explicitly not authorized                            | § 2.6.4    | § 8.4    |
| `softfail`  | Weak statement that the host is probably not authorized            | § 2.6.5    | § 8.5    |
| `temperror` | Transient, generally DNS, error; a retry may succeed               | § 2.6.6    | § 8.6    |
| `permerror` | The published records cannot be interpreted; needs operator action | § 2.6.7    | § 8.7    |

RFC 7208 sets no normative handling for any result; disposition is local policy (§ 2.6, § 8, Appendix G). The rules it does set:

- `neutral` MUST be treated exactly like `none` (§ 8.2).
- `softfail`: SHOULD NOT reject on this result alone; MAY scrutinize more closely (§ 8.5).
- Do not drop or delete mail after accepting it; deliver it in some manner or notify the sender (Appendix G.2).
- Avoid sending non-delivery notifications to forged identities that failed the check; that is backscatter (§ 2.5).
- Delivering `fail` mail admits content the purported sender explicitly did not authorize (§ 11.7).

## SMTP replies

| Result      | Reply (RFC 7208)   | Enhanced code alternative (RFC 7372 § 3.2) |
| ----------- | ------------------ | ------------------------------------------ |
| `fail`      | 550, 5.7.1 (§ 8.4) | `5.7.23` "SPF validation failed"           |
| `temperror` | 451, 4.4.3 (§ 8.6) | `4.7.24` "SPF validation error"            |
| `permerror` | 550, 5.5.2 (§ 8.7) | `5.7.24` "SPF validation error"            |

- RFC 7372 registers `X.7.23` with basic code 550 and `X.7.24` with 451 or 550, for use in place of the RFC 7208 codes (RFC 7372 § 3.2). Their use is optional; an operator can keep a generic code such as 5.7.7, 5.7.1 or 5.7.0 to avoid revealing policy (RFC 7372 § 5).
- When more than one authentication check failed and caused the rejection, the server SHOULD use `X.7.26` "Multiple authentication checks failed" (RFC 7372 § 4).
- Make clear that an `exp` explanation comes from the sender's domain, not the receiver (§ 6.2, § 8.4). Multi-line replies use continuation lines (§ 8.4, verified erratum 6721):

  ```text
  550-5.7.1 SPF MAIL FROM check failed:
  550-5.7.1 The domain example.com explains:
  550 5.7.1 Please see http://www.example.com/mailpolicy.html
  ```

- Treat explanation text as untrusted: it can carry malicious URLs or misleading text, and trace field contents need checking for invalid characters and long lines before they go into a reply (§ 11.5.1, § 11.5.2).
- A persistent `temperror` across many delivery attempts may be better treated as permanent (Appendix G.4).

## Recording the result

Recording the result in the message header is RECOMMENDED (§ 9). If the mail is not rejected, the verifier SHOULD add `Received-SPF` or `Authentication-Results`, especially on `fail` (§ 8.4). When both are added, they must say the same thing (§ 9).

### Received-SPF (§ 9.1)

- A trace field, prepended above the receiver's `Received:` field (SHOULD) and above all other `Received-SPF` fields (MUST).
- Grammar, as corrected by verified erratum 5436:

  ```text
  header-field = "Received-SPF:" [CFWS] result [ FWS comment ] [ FWS key-value-list ] [FWS] CRLF
  key          = "client-ip" / "envelope-from" / "helo" / "problem" / "receiver" / "identity" / "mechanism" / name
  identity     = "mailfrom" / "helo" / name
  ```

- Include a comment after the result with `<ip>`, `<sender>` and `<domain>` (SHOULD), and at least `client-ip`, `helo` and, for a `MAIL FROM` check, `envelope-from` (SHOULD). `mechanism` is the matched mechanism, or `default`.
- Values are a dot-atom or a quoted-string, so quote values such as `mechanism="ip4:192.0.2.1"` (§ 9.1 grammar; reported erratum 5843).
- The field MUST NOT contain invalid characters, be excessively long, or carry malicious sender-supplied data.

```text
Received-SPF: pass (mybox.example.org: domain of
 myname@example.com designates 192.0.2.1 as permitted sender)
 receiver=mybox.example.org; client-ip=192.0.2.1;
 envelope-from="myname@example.com"; helo=foo.example.com;
```

### Authentication-Results (§ 9.2, RFC 8601)

- Method `spf`, with the RFC 7208 result names, plus `policy`: authorized by SPF but unacceptable under local policy (RFC 8601 § 2.7.2, § 2.4).
- The ptype is `smtp` and the property is `mailfrom` or `helo`; `helo` is also used when the client sent `EHLO` (RFC 8601 § 2.7.2). Report only the identity that produced the result (RFC 8601 § 4).
- Unless the policy authenticated the local-part, the value SHOULD NOT include the local-part or the `@` (RFC 8601 § 2.7.2). Do not include data the method did not authenticate (RFC 8601 § 4).
- MTAs MUST delete any `Authentication-Results` field that claims their own authentication service identifier but did not come from a trusted MTA inside the boundary (RFC 8601 § 5).

```text
Authentication-Results: example.com;
        spf=pass smtp.mailfrom=example.net
```
