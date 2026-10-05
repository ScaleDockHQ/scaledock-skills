# Versions and upgrades

Read this when choosing a target version, reading a server or client written against an earlier draft or against `X-RateLimit-*` headers, or upgrading one. Sources: the datatracker history of `draft-ietf-httpapi-ratelimit-headers` (and its predecessor `draft-polli-ratelimit-headers`), the texts of revisions 11, 08, 07, 06, 04, 02, 01 and 00 and of `draft-polli-ratelimit-headers-00`, and the "Changes" and "RateLimit header fields currently used on the web" sections of revision 11, listed in [Sources](../SKILL.md#sources).

Section numbers are those of the revision named in each subsection. Bare numbers elsewhere in the skill refer to revision 11.

## Version lines

| Id            | Line                 | Status  | Revision                                                                                   | Posture | Summary                                                                                                                    |
| ------------- | -------------------- | ------- | ------------------------------------------------------------------------------------------ | ------- | -------------------------------------------------------------------------------------------------------------------------- |
| `draft-11`    | draft-11             | current | `draft-ietf-httpapi-ratelimit-headers-11` (2026-05-23)                                     | build   | Named policies: `RateLimit-Policy` items with `q`, `qu`, `w`, `pk`; `RateLimit` items with `r`, `t`, `pk`. Not yet an RFC. |
| `draft-07`    | draft-07             | legacy  | `draft-ietf-httpapi-ratelimit-headers-07` (2023-06-24)                                     |         | One `RateLimit` Dictionary with `limit`, `remaining` and `reset` keys, plus anonymous `RateLimit-Policy` items.            |
| `draft-06`    | draft-06 and earlier | legacy  | `-00` to `-06` (2020-12-18 to 2022-12-22), and `draft-polli-ratelimit-headers-00` to `-05` |         | Separate `RateLimit-Limit`, `RateLimit-Remaining` and `RateLimit-Reset` fields.                                            |
| `x-ratelimit` | X-RateLimit headers  | legacy  | de facto, no specification                                                                 |         | `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset` and variants, with inconsistent meanings.                |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows.

The datatracker, read 2026-10-05, shows revision 11 as the latest, with the document still an active working group draft and no RFC number. Revision 11 expires on 24 November 2026.

## Which version to use

- Default to draft-11, with posture build: emit `RateLimit-Policy` and `RateLimit` exactly as revision 11 defines them, and always send `Retry-After` with a 429 or 503, because that stable field carries the wait signal to every client (§ 6, § 7).
- No line is supported. Clients that only understand an earlier draft or `X-RateLimit-*` are served by `Retry-After` and the status code, not by emitting the old fields.
- A server may keep sending `X-RateLimit-*` headers alongside draft-11 for existing clients during a migration, as long as the values agree; drop them once the clients have moved. Never emit the draft-06 or draft-07 field shapes in new work.
- A client reading responses from many servers may meet all four lines. Parse draft-11 first, and treat older shapes as hints only, because their meanings are not guaranteed.

## What changed

### draft-11

From the "Changes" section of revision 11 ("Since draft-ietf-httpapi-ratelimit-headers-08"):

- Problem types for throttled responses: `quota-exceeded`, `temporary-reduced-capacity` and `abnormal-usage-detected` (§ 5, § 10.2).
- Clarified when to use `RateLimit-Policy` and when to use `RateLimit` (§ 3, § 4).
- The `r` and `t` parameters are described as the available quota and the effective window (§ 4.1.1, § 4.1.2); revision 08 called them the remaining and reset parameters, with the same keys.

From the same section ("Since draft-ietf-httpapi-ratelimit-headers-07"), introduced in revision 08:

- Both fields became Lists of Items whose String value names a policy, with the data in parameters (§ 3.1, § 4.1).
- The quota unit parameter `qu`, with the `requests`, `content-bytes` and `concurrent-requests` units (§ 3.1.2).
- The partition key parameter `pk` (§ 3.1.4, § 4.1.3).

### draft-07

- The three separate fields are merged into one `RateLimit` field, a Structured Fields Dictionary with a required `limit`, an optional `remaining` and a required `reset` key (draft-07 § 3.1 to § 3.4).
- `RateLimit-Policy` stays a List of anonymous quota policies, each an Integer limit with a required `w` window parameter, for example `100;w=60` (draft-07 § 2.1, § 3.5).
- `reset` is delay-seconds until the quota resets (draft-07 § 3.4).

### draft-06 and earlier

- `RateLimit-Limit`, `RateLimit-Remaining` and `RateLimit-Reset` are separate Item fields, each a non-negative Integer; `RateLimit-Reset` is delay-seconds (draft-06 § 3.1, § 3.3, § 3.4).
- From revision 04, the policies moved into a separate `RateLimit-Policy` List of anonymous `limit;w=window` items (draft-06 § 3.2; revision 11 "Changes", "Since draft-ietf-httpapi-ratelimit-headers-03", #81). In revisions 00 to 03, they followed the expiring limit in `RateLimit-Limit`, for example `RateLimit-Limit: 100, 100;w=10` (draft-00, `RateLimit-Limit` definition).
- Revisions 00 and 01 defined the syntax in ABNF; revision 02 moved to Structured Fields (draft-02, Notational Conventions).
- The individual draft `draft-polli-ratelimit-headers` (revisions 00 to 05, 2019 to 2020) preceded the working group draft with the same three-field design, but named the window parameter `window` instead of `w`, for example `RateLimit-Limit: 100, 100;window=10`.

### X-RateLimit headers

- Not specified anywhere. Revision 11's informative section "RateLimit header fields currently used on the web" lists `X-RateLimit-Limit`, `X-RateLimit-Remaining` and `X-RateLimit-Reset`, variants such as `X-Rate-Limit-Limit` and `x-ratelimit-limit-minute`, and notes that the reset value is variously seconds, milliseconds, a UNIX timestamp or a date. That section is to be removed before RFC publication.

## Upgrading

Each checklist ends with the same rule: the upgraded server enforces the same quotas and the client backs off at the same points. Only the wire shape changes.

### draft-07 to draft-11

1. Change the version marker: give every policy a String name, and send `RateLimit-Policy` items as `"name";q=<limit>;w=<window>` instead of `<limit>;w=<window>` (§ 3, § 3.1).
2. Replace removed or renamed fields: rewrite `RateLimit: limit=L, remaining=R, reset=T` as `RateLimit: "name";r=R;t=T`. The `limit` key has no counterpart in `RateLimit`; the limit lives in `q` of the named policy (§ 4.1). Add `qu` only for a unit other than requests, and `pk` only if quotas are partitioned (§ 3.1.2, § 3.1.4).
3. Validate against the target: both fields parse as RFC 9651 Lists, every Item value is a String, every policy has `q`, and every service limit has `r` (§ 3.1.1, § 4.1.1).
4. Keep behaviour unchanged: `t` keeps the delay-seconds meaning of `reset`, and `Retry-After` still takes precedence (§ 4.1.2, § 7).

### draft-06 and earlier to draft-07

Only needed to read a draft-07 deployment; for new work go straight to draft-11.

1. Change the version marker: replace the three fields with one `RateLimit` Dictionary (draft-07 § 3.1).
2. Replace removed or renamed fields: `RateLimit-Limit` becomes `limit`, `RateLimit-Remaining` becomes `remaining`, `RateLimit-Reset` becomes `reset`. Move any policies that revisions 00 to 03 put in `RateLimit-Limit` into `RateLimit-Policy` (draft-07 § 3.2 to § 3.5).
3. Validate against draft-07: `limit` and `reset` are present (draft-07 § 3.1).
4. Keep behaviour unchanged: the same limit, remaining count and reset seconds.

### draft-06 and earlier to draft-11

1. Change the version marker: stop sending `RateLimit-Limit`, `RateLimit-Remaining` and `RateLimit-Reset`.
2. Replace removed or renamed fields: `RateLimit-Limit` and its policy (or the matching `RateLimit-Policy` item) become `"name";q=<limit>;w=<window>` in `RateLimit-Policy`; `RateLimit-Remaining` becomes `r` and `RateLimit-Reset` becomes `t` in `RateLimit: "name";r=R;t=T` (§ 3.1, § 4.1).
3. Validate against the target, as for draft-07 to draft-11.
4. Keep behaviour unchanged: the expiring limit was the policy closest to its limit (draft-06 § 3.1); in draft-11, report each policy you want clients to see as its own named item.

### X-RateLimit headers to draft-11

1. Change the version marker: add `RateLimit-Policy` and `RateLimit` for each policy, using the mapping in [`fields.md`](fields.md#mapping-from-x-ratelimit-headers).
2. Replace removed or renamed fields: `X-RateLimit-Limit` becomes `q` (with `w` for the window), `X-RateLimit-Remaining` becomes `r`, and `X-RateLimit-Reset` becomes `t`. Convert a timestamp, millisecond or date reset into whole delay-seconds from now (§ 4.1.2).
3. Validate against the target, as above; per-window variants such as `x-ratelimit-limit-minute` become one named policy per window.
4. Keep behaviour unchanged: keep sending the `X-RateLimit-*` headers with consistent values until existing clients have moved, then remove them.

## Preview

No preview line is listed. The only line with text is revision 11 of a draft that has not become an RFC, so it is the current line with posture build. When the RFC is published: make it current with its RFC number as the id and label, make draft-11 legacy, add a "draft-11 to RFC" upgrade section from the RFC's changes, and drop the build posture. Re-read the datatracker page when refreshing this skill.
