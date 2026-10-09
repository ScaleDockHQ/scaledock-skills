# smart-on-fhir

An agent skill for SMART App Launch: launching apps against a FHIR server and authorizing their access.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill smart-on-fhir
```

Then ask your agent to apply SMART App Launch.

## What it covers

- The HL7 SMART App Launch Implementation Guide (v2.2.0, STU 2.2, based on FHIR R4): how apps launch from an EHR or standalone, obtain OAuth 2.0 authorization with PKCE, request scopes and launch context, authenticate with asymmetric keys, run as backend services, and discover server capabilities through .well-known/smart-configuration, read from the guide's published pages.

## Versions

| Line                 | Status  |
| -------------------- | ------- |
| SMART App Launch 2.2 | current |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [SMART App Launch 2.2: App Launch](https://hl7.org/fhir/smart-app-launch/STU2.2/app-launch.html): Standard for Trial Use, SMART App Launch v2.2.0 (STU 2.2), based on FHIR R4.
- [SMART App Launch 2.2: Scopes and Launch Context](https://hl7.org/fhir/smart-app-launch/STU2.2/scopes-and-launch-context.html): Standard for Trial Use, SMART App Launch v2.2.0 (STU 2.2), based on FHIR R4.
- [SMART App Launch 2.2: Asymmetric (public key) client authentication](https://hl7.org/fhir/smart-app-launch/STU2.2/client-confidential-asymmetric.html): Standard for Trial Use, SMART App Launch v2.2.0 (STU 2.2), based on FHIR R4.
- [SMART App Launch 2.2: Conformance](https://hl7.org/fhir/smart-app-launch/STU2.2/conformance.html): Standard for Trial Use, SMART App Launch v2.2.0 (STU 2.2), based on FHIR R4.
- [SMART App Launch 2.2: Backend Services](https://hl7.org/fhir/smart-app-launch/STU2.2/backend-services.html): Standard for Trial Use, SMART App Launch v2.2.0 (STU 2.2), based on FHIR R4.

## License

MIT
