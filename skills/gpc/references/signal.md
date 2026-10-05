# The signal: header, property and meaning

Read this when deciding what GPC means for a system, reading or sending the `Sec-GPC` header, or reading `navigator.globalPrivacyControl`. Sections refer to `WD-gpc-20260924`.

## Definitions (§ 2)

- A **do-not-sell-or-share interaction** is one in which the person asks that their data not be sold to or shared with any party other than the one they intend to interact with, or used for cross-context ad targeting. In W3C Privacy Principles terms the person asks for at least one data controller, and no ad targeting in another context, even one owned by the same business.
- A **do-not-sell-or-share preference** is set by turning on a GPC setting in a user agent, or by using a tool that defaults to it. When set, the person expects every interaction to be a do-not-sell-or-share interaction.

What the signal is not (§ 1, § 5.2): it is not meant to exercise every privacy right, nor every right to opt out of advertising. It is not meant to invoke deletion rights, and not meant to limit a first party's use of data within the same context, such as a publisher targeting ads on its own site based on activity on that site.

## Expression format (§ 3.1)

- The preference should be conveyed on all HTTP requests (as the header) and to all websites (as the property).
- When set, it is the single value `1`, or `true`, depending on context.
- Absent regulatory, legal or other requirements, a website can interpret the signal as it finds most appropriate for the person, and may use other preference information (site-specific choices, registration services) when no explicit preference is expressed.
- User agents SHOULD represent what they best believe the person's preference to be.

## Preference caching (§ 3.2)

- The preference MUST be cached on each top-level navigation. A change during or after a navigation shows only from the next one.
- Each top-level browsing context has a boolean `gpcAtNavigation`, initially false.
- `gpcAtNavigation` MUST reflect the preference when the top-level browsing context's active document began loading: true if enabled, false if disabled or never set.
- When the preference changes, the user agent SHOULD tell the user which tabs are inconsistent and offer to reload them.

## The `Sec-GPC` header (§ 3.3)

```abnf
Sec-GPC-field-name  = "Sec-GPC"
Sec-GPC-field-value = "1"
```

It expresses a general preference on requests of any method. A specific arrangement with the person may permit a website to set the general preference aside (§ 3.3, § 5.3).

User agents:

- MUST NOT send `Sec-GPC` when the top-level browsing context's `gpcAtNavigation` is false.
- MUST send it with the value exactly `1` when `gpcAtNavigation` is true.
- MUST NOT send more than one `Sec-GPC` field in a request, and MUST NOT send it as a trailer.

Servers:

- MUST ignore a `Sec-GPC` field and process the request as if it were absent unless the value is exactly `1`.
- With several `Sec-GPC` fields: if at least one is exactly `1`, treat the request as having one `Sec-GPC: 1`; otherwise as having none.

Intermediaries:

- MUST NOT remove `Sec-GPC: 1`.
- MAY remove `Sec-GPC` fields with other values.
- MAY insert `Sec-GPC: 1` when they have reason to believe the person has a do-not-sell-or-share preference.

```http
GET /something/here HTTP/1.1
Host: example.com
Sec-GPC: 1
```

### No extensions (§ 3.3.1)

The field has no extension mechanism on purpose: implementers compare strings rather than parse values, so extension content would break those checks. Any future extension would come as a different header.

## The JavaScript property (§ 3.4)

```webidl
interface mixin GlobalPrivacyControl {
  readonly attribute boolean globalPrivacyControl;
};
Navigator includes GlobalPrivacyControl;
WorkerNavigator includes GlobalPrivacyControl;
```

- It tells script what `Sec-GPC` value was sent when the top-level browsing context's active document loaded: false if no header would be sent, true otherwise.
- Its value MUST be the top-level browsing context's `gpcAtNavigation`.
- It is on `navigator` in both window and worker contexts.

Frames and workers, as far as the text goes:

- The property and the header are both defined from the **top-level** browsing context's `gpcAtNavigation`. A document in an iframe therefore reads the same value as the top-level document, and requests from that tab carry the header or not together; the spec defines no per-frame value.
- Workers expose the property through `WorkerNavigator`. The text does not say which top-level browsing context a shared or service worker takes its value from. Treat a worker's value as the user agent's and do not assume more.
- In a user agent that predates GPC the property is absent (`undefined`), which code should treat as "not set". This follows from the property not existing, not from a spec rule.

## Privacy considerations (§ 6)

Exposing the preference splits users into two groups and can add fingerprinting information, unless the signal correlates perfectly with other signals or is on in a non-configurable setting. The spec accepts this cost as justified by the benefit of sending the signal.

## Security considerations (§ 7)

The spec lists no known security impacts.

## Legal effects (§ 5, non-normative)

What the spec itself says. This is not legal advice; applicability depends on the jurisdiction, the scope of the law and any separate agreement with the person (§ 5).

- The signal was designed to let people use legal rights to stop certain sharing or processing, so sending and receiving it may have legal effects (§ 5).
- **United States** (§ 5.1): GPC was created for US state opt-out laws, starting with the California Consumer Privacy Act (2018). Many state laws provide for universal opt-out mechanisms, and at least four states have identified GPC as a valid way to exercise opt-out rights. The introduction names the CCPA's "opt out preference signals" and Colorado's "universal opt-out mechanisms" (§ 1).
- **Other jurisdictions** (§ 5.2): the GDPR potentially affords a right to limit sharing under Articles 7 and 21, and a regulator elsewhere could decide GPC invokes a right. Some US state laws (the spec names Virginia and Utah) give opt-out rights but are silent on global signals.
- **Disclosure** (§ 5.2): publishers that accept GPC should disclose how they treat it in each jurisdiction and how they resolve conflicts with choices the person made directly, including permitted sharing with service providers or processors, sharing required by law, or at the person's direction.
- **User agents** (§ 5.3): the spec does not say what must be shown before turning GPC on. Many US states say a user agent may not send a universal opt-out by default, though at least one has said choosing a privacy-focused user agent is enough. Jurisdictions differ on when a company may override the signal, for example with the person's consent. User agents are expected, where required, to present the notices that make the rights binding.
- The spec points to its Legal and Implementation Considerations Guide for current legal detail (§ 1, § 5). This skill does not summarise that guide.
