# Record syntax

Read this when writing, reviewing or parsing an SPF record. Section numbers are RFC 7208 unless another RFC is named. The § 12 Collected ABNF is normative and wins over the fragments in the text (§ 12).

## Where the record lives

- One TXT record at the name it covers, not under a subdomain of it (§ 3). The content is US-ASCII (§ 3.1).
- Other TXT records may share the name; only records that begin with `v=spf1` are used, and they count toward the DNS answer size (§ 3, § 3.4).
- A record longer than 255 octets is split into several character-strings in one TXT record; they are joined with no added space (§ 3.3):

  ```text
  example.com. IN TXT "v=spf1 ip4:192.0.2.0/24 include:_spf.example.net " "ip6:2001:db8::/32 -all"
  ```

  Put the separating space inside a string, as above, or the two terms run together.

- Wildcards are discouraged. If used, the record has to be repeated for each name that has any records and for a wildcard under it (§ 3.5).

## Grammar

```text
record           = version terms *SP
version          = "v=spf1"
terms            = *( 1*SP ( directive / modifier ) )
directive        = [ qualifier ] mechanism
qualifier        = "+" / "-" / "?" / "~"
mechanism        = ( all / include / a / mx / ptr / ip4 / ip6 / exists )
modifier         = redirect / explanation / unknown-modifier
unknown-modifier = name "=" macro-string
name             = ALPHA *( ALPHA / DIGIT / "-" / "_" / "." )
```

- Terms are separated by one or more spaces (§ 4.6.1). Trailing spaces are allowed (§ 4.5).
- Names of mechanisms and modifiers are case-insensitive: `MX`, `mx` and `Mx` are the same (§ 4.6.1, § 12).
- A term with `=` right after its name is a modifier; a term with none of `=`, `:` or `/` is a mechanism (§ 4.6.1).

## Qualifiers

| Qualifier     | Result on match |
| ------------- | --------------- |
| `+` (default) | `pass`          |
| `-`           | `fail`          |
| `~`           | `softfail`      |
| `?`           | `neutral`       |

The qualifier is optional and defaults to `+` (§ 4.6.2).

## Mechanisms

Mechanisms are tried left to right; the first match ends evaluation with its qualifier's result (§ 4.6.2). "Counts" means the term counts toward the limit of 10 DNS-querying terms (§ 4.6.4).

| Mechanism | Syntax                                          | Matches when                                                                           | Counts |
| --------- | ----------------------------------------------- | -------------------------------------------------------------------------------------- | ------ |
| `all`     | `all`                                           | Always (§ 5.1).                                                                        | no     |
| `include` | `include:<domain-spec>`                         | The target's own evaluation returns `pass` (§ 5.2).                                    | yes    |
| `a`       | `a[:<domain-spec>][/<ip4-cidr>][//<ip6-cidr>]`  | `<ip>` is one of the target's A or AAAA addresses, per connection type (§ 5.3).        | yes    |
| `mx`      | `mx[:<domain-spec>][/<ip4-cidr>][//<ip6-cidr>]` | `<ip>` is an address of one of the target's MX hosts (§ 5.4).                          | yes    |
| `ptr`     | `ptr[:<domain-spec>]`                           | A validated reverse name of `<ip>` is the target or under it (§ 5.5). Do not publish.  | yes    |
| `ip4`     | `ip4:<ipv4>[/<0-32>]`                           | `<ip>` is in the network; the default length is `/32` (§ 5.6).                         | no     |
| `ip6`     | `ip6:<ipv6>[/<0-128>]`                          | `<ip>` is in the network; the default length is `/128` (§ 5.6).                        | no     |
| `exists`  | `exists:<domain-spec>`                          | An A lookup of the expanded name returns any record, even on IPv6 connections (§ 5.7). | yes    |

Details:

- `a`, `mx` and `ptr` default to the current `<domain>` when no `<domain-spec>` is given (§ 4.8).
- `dual-cidr-length` is `[ "/" ip4-length ] [ "//" ip6-length ]`: `a/24` and `mx/30//64` are valid (§ 5.6). Without a length, addresses are compared for equality (§ 5).
- `ip4` and `ip6` need full addresses: write `192.0.2.0/24`, never `192.0.2` (§ 5.6). IPv4 addresses are only listed with `ip4` (§ 5).
- `mx` MUST NOT fall back to the implicit MX rule: a target with no MX record matches nothing (§ 5.4).
- `include` is an "if pass" test, not a textual include. A `-all` inside the included record does not end the parent's evaluation (§ 5.2). The mapping of the included result:

  | Included result               | `include` mechanism |
  | ----------------------------- | ------------------- |
  | `pass`                        | match               |
  | `fail`, `softfail`, `neutral` | no match            |
  | `temperror`                   | returns `temperror` |
  | `permerror`, `none`           | returns `permerror` |

- `ptr` SHOULD NOT be published: it is slow, unreliable on DNS errors and loads the `.arpa` servers. Use `ip4`, `ip6`, `a` or `mx` instead (§ 5.5).

## Modifiers

- `redirect=<domain-spec>`: when no mechanism matched, the result of the target's record becomes this record's result (§ 6.1). It is ignored if the record contains `all` anywhere (§ 5.1, § 6.1). A target with no record, or a malformed target, gives `permerror` (§ 6.1). Use it within one administrative domain; across administrative boundaries `include` is more appropriate, because `<sender>` stays the same (§ 6.1).
- `exp=<domain-spec>`: on a `fail` from a matching mechanism, the TXT record at the expanded name is macro-expanded and returned as the explanation (§ 6.2). DNS errors, zero or several records, or a syntax error mean the `exp` is ignored. The explanation MUST be US-ASCII. During `include`, the included record's `exp` is not used; after `redirect`, the original record's `exp` is not used (§ 6.2).
- `redirect` and `exp` SHOULD come after all mechanisms, MUST NOT appear more than once each (else `permerror`), and `redirect` SHOULD be the very last term (§ 6, § 6.1).
- Unknown modifiers MUST be ignored wherever and however often they appear (§ 6).

## Macros

`<domain-spec>` and explanation strings can contain macros (§ 7).

| Letter | Expands to                                                 |
| ------ | ---------------------------------------------------------- |
| `s`    | `<sender>`, for example `user@example.com`                 |
| `l`    | local-part of `<sender>` (`postmaster` when there is none) |
| `o`    | domain of `<sender>`                                       |
| `d`    | the current `<domain>`                                     |
| `i`    | `<ip>`: dotted quad, or dot-separated nibbles for IPv6     |
| `p`    | validated domain name of `<ip>` (do not use)               |
| `v`    | `in-addr` for IPv4, `ip6` for IPv6                         |
| `h`    | `HELO` or `EHLO` domain                                    |
| `c`    | SMTP client IP, readable form (`exp` only)                 |
| `r`    | name of the receiving host (`exp` only)                    |
| `t`    | current Unix timestamp (`exp` only)                        |

Rules (§ 7.1 to § 7.3):

- Syntax: `%{` letter, optional digits, optional `r`, optional delimiters from `. - + , / _ =`, then `}`. `%%` is a literal `%`, `%_` a space, `%-` the URL-encoded space `%20`.
- A `%` not followed by `{`, `%`, `-` or `_` is a syntax error and gives `permerror`, for example `%(ir)`.
- Digits keep that many right-hand parts after an optional reversal; the value MUST be nonzero. `r` reverses parts. Parts split on `.` by default or on the delimiters given, and are rejoined with `.`.
- `s`, `l` and `o` keep their values through `include` and `redirect`.
- Uppercase letters expand the same way and are then URL-escaped.
- An expanded domain longer than 253 characters is truncated from the left, label by label.
- Keep expansions within the 63-character DNS label limit; local-parts can exceed it.
- Avoid `s`, `l`, `o` and `h` in mechanisms: they defeat result caching. Without them, results can be cached on `<domain>` and `<ip>` for the shortest TTL involved (§ 7.3).

Examples from § 7.4, with sender `strong-bad@email.example.com` and IP `192.0.2.3`:

| Macro                   | Expansion                            |
| ----------------------- | ------------------------------------ |
| `%{d2}`                 | `example.com`                        |
| `%{dr}`                 | `com.example.email`                  |
| `%{l-}`                 | `strong.bad`                         |
| `%{lr-}`                | `bad.strong`                         |
| `%{ir}.%{v}._spf.%{d2}` | `3.2.0.192.in-addr._spf.example.com` |

## Examples

From § 10.1.1, for a domain whose MX hosts are `192.0.2.1` and `192.0.2.129`:

```text
; Best: no DNS lookups during evaluation
example.com.   IN TXT "v=spf1 ip4:192.0.2.1 ip4:192.0.2.129 -all"

; Good: one lookup, and hosts can be renumbered in DNS
example.com.   IN TXT "v=spf1 a:authorized-spf.example.com -all"

; Expensive: an MX lookup plus an address lookup per MX host
example.com.   IN TXT "v=spf1 mx:example.com -all"

; Wasteful: authorizes a whole /24 and still looks up MX
example.com.   IN TXT "v=spf1 ip4:192.0.2.0/24 mx -all"
```

Standard records from § 10.1.2:

```text
www.example.com.    IN TXT "v=spf1 -all"     ; a name that sends no mail
relay.example.com.  IN TXT "v=spf1 a -all"   ; a host used in HELO
```

Third-party senders and shared policy from § 5.2, § 6.1 and Appendix A.2:

```text
example.net.      IN TXT "v=spf1 include:example.com include:example.org -all"
la.example.com.   IN TXT "v=spf1 redirect=_spf.example.com"
_spf.example.com. IN TXT "v=spf1 mx:example.com -all"
```

`v=spf1 +all` passes every host (Appendix A.1), so it authorizes no one in particular. The only `+all` record in RFC 7208 is the Appendix A.4 construction, where `-include` terms before it fail everything outside the policy.
