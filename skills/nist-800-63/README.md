# nist-800-63

An agent skill for NIST SP 800-63-4 Digital Identity Guidelines: sign-in, MFA, passkeys, account recovery, identity proofing and federation at a chosen IAL, AAL and FAL, and upgrading from SP 800-63-3.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill nist-800-63
```

Then ask your agent to "check our password and MFA rules against NIST 800-63B" or "design AAL2 sign-in and account recovery for our app".

## What it covers

- Digital identity risk management: impact assessment, choosing the IAL, AAL and FAL, tailoring, and the Digital Identity Acceptance Statement.
- Identity proofing at IAL1-3: evidence strength, validation, verification pathways, fraud checks, and no knowledge-based verification.
- Authenticators at AAL1-3: password length and blocklists without composition rules or forced rotation, OTP and SMS limits, phishing resistance, and syncable authenticators (passkeys).
- Authenticator binding, account recovery, notifications, session secrets, cookies, timeouts and reauthentication.
- Federation at FAL1-3: assertion contents and validation, injection protection, holder-of-key and bound authenticators, and shared signaling.
- Migrating from SP 800-63-3.

## Versions

| Line        | Status                |
| ----------- | --------------------- |
| SP 800-63-4 | current               |
| SP 800-63-3 | legacy (upgrade from) |

`references/versions.md` says what SP 800-63-4 changed in each volume and how to upgrade from SP 800-63-3.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [SP 800-63-4 online edition](https://pages.nist.gov/800-63-4/): Final, released July 2025, with the base volume and the 63A-4, 63B-4 and 63C-4 volumes.
- [CSRC: SP 800-63-4](https://csrc.nist.gov/pubs/sp/800/63/4/final), [63A-4](https://csrc.nist.gov/pubs/sp/800/63/a/4/final), [63B-4](https://csrc.nist.gov/pubs/sp/800/63/b/4/final) and [63C-4](https://csrc.nist.gov/pubs/sp/800/63/c/4/final): Final, published 2025-07-31.
- [CSRC: SP 800-63B Supplement 1 (syncable authenticators)](https://csrc.nist.gov/pubs/sp/800/63/b/sup/final): Withdrawn 2025-07-31, folded into 63B-4 Appendix B.
- [SP 800-63-3 online edition](https://pages.nist.gov/800-63-3/): June 2017 with errata through 2020-03-02, superseded 2025-08-01.
- [NIST SP 800-63 FAQ](https://pages.nist.gov/800-63-FAQ/): FAQ for SP 800-63-3, 2022-03-03.

## License

MIT
