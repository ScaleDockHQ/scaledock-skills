# Limits, forwarding and pitfalls

Read this when a record is near the lookup or size limits, when someone proposes flattening, when forwarded or list mail fails SPF, or when reviewing a record for common mistakes. Section numbers are RFC 7208 unless another RFC is named.

## Processing limits (§ 4.6.4)

| Limit              | Rule                                                                                                                 | On exceeding                |
| ------------------ | -------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| DNS-querying terms | At most 10 of `include`, `a`, `mx`, `ptr`, `exists` and `redirect` in the whole evaluation (MUST)                    | `permerror` (MUST)          |
| MX hosts           | The MX records queried count toward the 10; each MX record MUST NOT cause more than 10 A or AAAA lookups             | `permerror` for `mx` (MUST) |
| PTR names          | The PTR records queried count toward the 10; each MUST NOT cause more than 10 A or AAAA lookups                      | Ignore all but the first 10 |
| Void lookups       | At most 2 terms whose query returns NXDOMAIN or an empty answer (SHOULD; a configurable default of 2 is RECOMMENDED) | `permerror`                 |
| Elapsed time       | A limit SHOULD be imposed and SHOULD allow at least 20 seconds                                                       | `temperror` (SHOULD)        |

- `all`, `ip4`, `ip6` and `exp` do not count; `exp` is looked up only after evaluation (§ 4.6.4).
- The count is global across every recursive `include` and `redirect`, not per record (§ 4.1).
- The initial TXT lookup of the checked domain is not a term and is not in the count of terms (§ 4.6.4 lists the counted terms).
- The limits are low on purpose: SPF verifiers can otherwise be used to amplify DNS traffic toward a victim named in an attacker's record (§ 11.1).

## Counting a record tree

Walk the tree depth first and add one for every counted term you meet, including those inside included and redirected records:

```text
example.com.       TXT "v=spf1 ip4:192.0.2.0/24 mx include:_spf.mail.example -all"
_spf.mail.example. TXT "v=spf1 include:a.mail.example include:b.mail.example ~all"
a.mail.example.    TXT "v=spf1 ip4:198.51.100.0/24 -all"
b.mail.example.    TXT "v=spf1 a:out.mail.example -all"
```

Count: `mx` (1), `include:_spf.mail.example` (2), `include:a.mail.example` (3), `include:b.mail.example` (4), `a:out.mail.example` (5). The `ip4` terms and `all` add nothing. Five of the ten are used, before any MX host addresses, which count under the separate per-MX limit.

Evaluation stops at the first match, so a record can pass for one IP and exceed the limit for another. Count the full tree, not the path of one test message.

Each third-party `include` brings that provider's own terms, which it can change at any time. Re-count when a provider changes its record.

## Record size (§ 3.4)

- Keep the answer for the SPF query within 512 octets, so it fits in UDP without EDNS0 (SHOULD). The working guideline is under 450 octets for the DNS name plus the text of all records of that type at the name.
- Count every TXT record at the name, not only the SPF one, because a TXT query returns them all (§ 3.4).
- Answers too large for one UDP packet can be silently ignored by verifiers whose DNS over TCP or EDNS0 is blocked (§ 3.4).
- The same applies to every name the evaluation queries, including `include` and `redirect` targets (§ 3.4).

## Flattening

"Flattening" means replacing `include`, `a` or `mx` terms with the `ip4` and `ip6` addresses they currently resolve to, to save lookups. RFC 7208 does not use the term; these are the trade-offs its rules imply:

- It removes lookups: `ip4` and `ip6` are not counted (§ 4.6.4), and § 10.1.1 calls an `ip4`-only record the best record for DNS cost.
- It loses automatic updates: `a` lets hosts be renumbered in DNS at the cost of a query, and `mx` lets the set of mail hosts change (§ 10.1.2). An `include` is meant to cross administrative boundaries, so the other domain controls what it authorizes (§ 5.2). A flattened copy only changes when you change it.
- It grows the record: every address is now literal text, which pushes toward the § 3.4 size guideline and forces splitting into several strings (§ 3.3).
- Over-broad ranges authorize more than intended; § 10.1.1 calls `ip4:192.0.2.0/24 mx` wasteful when two hosts would do.

Prefer, in order: removing senders that no longer send, moving senders that use your domain onto their own `MAIL FROM` domain (Appendix E), consolidating with `redirect` inside your own administrative domain (§ 6.1), and only then flattening with a process that re-resolves and republishes when providers change.

## Forwarding and mediators

- SPF checks the IP of the last SMTP client. A forwarder or mailing list that keeps the original `MAIL FROM` sends from its own IP, so the original domain's record evaluates to `fail` unless mitigated (§ 10.3).
- SPF can return `fail` for legitimate mail that went through an alias, and `pass` for harmful mail from throwaway domains; plan local policy for both (§ 10.2).

Mitigations from Appendix D:

- Originator: return `neutral` instead of `fail` for known forwarders, for example `v=spf1 mx ?exists:%{ir}.whitelist.example.org -all` (D.1); or sign the `MAIL FROM` local-part and validate it with `exists` against a dedicated DNS server, keeping it within 63 characters (D.1).
- Mediator: rewrite `MAIL FROM` into the mediator's own domain and route bounces back (D.2); switch aliases to mailing-list semantics with an `owner-` alias (D.2); or reject with 551 "User not local" so the sender resends to the right address (D.2).
- Receiver: skip SPF for clients that belong to a trusted mediator, let a `HELO` result override a failed `MAIL FROM` result, or allow-list known forwarding services (D.3).

## Security considerations (§ 11)

- **Other identities are not authenticated.** A `pass` covers only the `MAIL FROM` or `HELO` domain; the `From:` field can still be false (§ 11.2). DMARC ties these together; see the `dmarc` skill.
- **Spoofed DNS.** Results depend on DNS; spoofed answers can turn `fail` into `pass`. DNSSEC is the countermeasure named (§ 11.3).
- **Cross-user forgery.** SPF maps domains to hosts, not addresses to users. Shared MTAs must restrict authenticated users to their own addresses (§ 11.4, Appendix E).
- **Untrusted input.** `HELO`, `MAIL FROM`, records and explanations come from outside; check for invalid characters and long lines before reflecting them, and be ready for hostile macro content in DNS queries (§ 11.5).
- **Privacy.** SPF queries, especially through `exists`, can tell the domain owner who is mailing whom (§ 11.6). The Appendix C "tracking `exists:`" technique uses exactly this to log senders.
- **`temperror` as a bypass.** A receiver that accepts on `temperror` can be made to accept mail that would otherwise `fail`, by records crafted to exhaust its DNS resources (§ 11.1).

## Common mistakes

| Mistake                                                 | Effect                                                       | Fix                                                                |
| ------------------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------------ |
| Two `v=spf1` TXT records at one name                    | `permerror` (§ 4.5)                                          | Merge into one record (§ 3.2).                                     |
| Relying on an SPF type 99 record                        | Ignored by RFC 7208 verifiers (§ 3.1)                        | Publish TXT only (§ 14.1).                                         |
| More than 10 counted terms across includes              | `permerror` (§ 4.6.4)                                        | Remove dead senders, use `ip4`/`ip6`, consolidate with `redirect`. |
| `include` of a domain with no SPF record                | `permerror` (§ 5.2)                                          | Remove it or point to the provider's published SPF name.           |
| Terms pointing at names that no longer exist            | Void lookups; `permerror` after two (§ 4.6.4)                | Remove stale terms.                                                |
| `redirect` in a record that also has `all`              | `redirect` ignored (§ 6.1)                                   | Use one or the other.                                              |
| No `all` and no `redirect`                              | Implicit `?all`: `neutral` (§ 4.7)                           | End with `-all` or `~all`.                                         |
| `ptr` in the record                                     | Slow and unreliable (§ 5.5)                                  | Use `ip4`, `ip6`, `a` or `mx`.                                     |
| `ip4:192.0.2` without a length                          | Syntax error, `permerror` (§ 5.6, § 4.6)                     | `ip4:192.0.2.0/24`.                                                |
| Strings split without a space at the joint              | Terms run together (§ 3.3)                                   | Put the space inside one of the strings.                           |
| `mx` for a target with no MX record                     | Matches nothing (§ 5.4)                                      | Use `a` or `ip4`/`ip6`.                                            |
| No record for `HELO` host names                         | Bounces with a null `MAIL FROM` get `none` (§ 2.4, § 10.1.3) | Publish `v=spf1 a -all` for each sending host (§ 10.1.2).          |
| No record for names that send no mail                   | Anyone can use them                                          | Publish `v=spf1 -all` (§ 10.1.2).                                  |
| Switching records with no overlap                       | Mail in transit fails (§ 2.1)                                | Keep the old policy valid during a transition period.              |
| `%{l}` or `%{s}` in `exists` for internationalized mail | Non-ASCII local-parts match nothing (RFC 8616 § 4)           | Avoid local-part macros, or accept the gap.                        |
