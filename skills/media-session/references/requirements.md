# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## Media Session

Source: https://www.w3.org/TR/mediasession/

This specification enables web developers to show customized media metadata on platform UI, customize available platform media controls, and access platform media keys such as hardware keys found on keyboards, headsets, remote controls, and software keys found in notification areas and on lock screens of mobile devices.

- **4.1. Playback State.** In order to make play and pause actions work properly, the user agent SHOULD be able to determine if a browsing context of the active media session is playing media or not, which is called the guessed playback state .
- **4.1. Playback State.** Other information SHOULD also be considered, such as WebAudio and plugins.
- **4.1. Playback State.** When the actual playback state of the active media session changes, the user agent MUST run the media session actions update algorithm .
- **4.2. Routing.** The user agent MUST select at most one of the MediaSession objects to present to the user, which is called the active media session .
- **4.2. Routing.** The selection is up to the user agent and SHOULD be based on preferred user experience.
- **4.2. Routing.** Note that the playbackState attribute MUST not affect media session routing.
- **4.2. Routing.** Whenever the active media session is changed, the user agent MUST run the media session actions update algorithm and the update metadata algorithm .
- **4.3. Metadata.** Whenever the active media session changes or setting metadata of the active media session , the user agent MUST run the update metadata algorithm .
