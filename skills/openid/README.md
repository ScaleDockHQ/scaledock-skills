# openid

An agent skill that indexes every OpenID Foundation specification: what each one defines, how mature it is, which revision and errata to pin, and which family reference or dedicated skill to use next.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill openid
```

Then ask your agent, for example, "Which OpenID spec do I need for logging users out of every RP?", "Is CIBA final?" or "Which FAPI version should a new open banking ecosystem use?".

## What it covers

`SKILL.md` routes a task to a family and states the rules that apply across all OpenID specifications: the three maturity levels (Draft, Implementer's Draft, Final Specification), the IPR protection that comes with Implementer's Drafts and Finals, the approval process, how errata replace unversioned URLs, and the certification programme.

One reference file per working group or family lists each specification with its exact title, URL, maturity, date and errata:

- OpenID Connect (AB/Connect): Core, Discovery, Dynamic Client Registration, RP Metadata Choices, response types, Form Post, Migration, RP-Initiated, Session, Front-Channel and Back-Channel Logout, `unmet_authentication_requirements`, `prompt=create`, Native SSO, SIOPv2, Key Binding, drafts and implementer's guides.
- OpenID Federation 1.0 and 1.1, Federation for OpenID Connect 1.1, and its extensions.
- FAPI 1.0 and 2.0, JARM, FAPI CIBA, Grant Management.
- MODRNA: CIBA Core, Authentication Profile, Account Porting, User Questioning API.
- Shared Signals: SSF, CAEP, RISC, CAEP Interoperability Profile.
- Digital Credentials Protocols: OpenID4VCI, OpenID4VP, HAIP. Digital Credentials Harmonized Presentation (no specifications yet).
- AuthZEN Authorization API and its draft profiles.
- eKYC & Identity Assurance (`verified_claims`), including errata set 1.
- iGov, IPSIE and R&E.
- Archived working groups: EAP (ACR values, Token Bound Authentication), FastFed and HEART.
- Community groups, including AI Identity Management.
- Inactive drafts and obsolete specifications: Account Chooser, Native Applications, OpenID Authentication 1.x and 2.0, Attribute Exchange, PAPE, Simple Registration, Yadis, Contract Exchange.

## Dedicated skills

These families have their own skills with normative detail. This skill points to them:

| Family            | Skill               | Install                                                                 |
| ----------------- | ------------------- | ----------------------------------------------------------------------- |
| OpenID Connect    | `openid-connect`    | `npx skills add ScaleDockHQ/scaledock-skills --skill openid-connect`    |
| OpenID Federation | `openid-federation` | `npx skills add ScaleDockHQ/scaledock-skills --skill openid-federation` |
| FAPI              | `fapi`              | `npx skills add ScaleDockHQ/scaledock-skills --skill fapi`              |
| Shared Signals    | `shared-signals`    | `npx skills add ScaleDockHQ/scaledock-skills --skill shared-signals`    |
| OpenID4VC         | `openid4vc`         | `npx skills add ScaleDockHQ/scaledock-skills --skill openid4vc`         |
| AuthZEN           | `authzen`           | `npx skills add ScaleDockHQ/scaledock-skills --skill authzen`           |

## Pinned sources

The skill was written from these index pages, read on 2026-10-02 and pinned in `metadata.json`. Each reference file also cites the specification documents it summarises.

- [Explore All Specifications](https://openid.net/developers/specs/)
- Working group specification pages: [AB/Connect](https://openid.net/wg/connect/specifications/), [AuthZEN](https://openid.net/wg/authzen/specifications/), [DCP](https://openid.net/wg/digital-credentials-protocols/specifications/), [DCHP](https://openid.net/wg/digital-credentials-harmonized-presentation-working-group/specifications/), [eKYC & IDA](https://openid.net/wg/ekyc-ida/specifications/), [FAPI](https://openid.net/wg/fapi/specifications/), [iGov](https://openid.net/wg/igov/specifications/), [IPSIE](https://openid.net/wg/ipsie/specifications/), [MODRNA](https://openid.net/wg/modrna/specifications/), [R&E](https://openid.net/wg/rande/specifications/), [Shared Signals](https://openid.net/wg/sharedsignals/specifications/)
- Archived working groups: [EAP](https://openid.net/wg/eap/specifications/), [FastFed](https://openid.net/wg/fastfed/specifications/), [HEART](https://openid.net/wg/heart/specifications/), [Archived Groups](https://openid.net/wg/archived-groups/)
- [Community Groups](https://openid.net/cg/)
- [Developing an OpenID Standard](https://openid.net/foundation/developing-openid-standards/) and [OpenID Foundation Contribution Agreements](https://openid.net/intellectual-property/openid-foundation-contribution-agreements/)
- [Certification](https://openid.net/certification/) and [How to Certify Your Implementation](https://openid.net/certification/how-to-certify-your-implementation/)

## License

MIT
