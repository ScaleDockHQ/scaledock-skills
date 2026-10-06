# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## RFC 8216

Source: https://www.rfc-editor.org/rfc/rfc8216

RFC 8216: HTTP Live Streaming | RFC Editor Your browser has JavaScript disabled. Most of this site works without JS, but some features require it. If something seems broken please try enabling JavaScript and reloading the page. The JavaScript used by this site is served directly from IETF infrastructure and does not include any code that links to a third party service. Skip to content

- **RFC 8216 : HTTP Live Streaming.** Data SHOULD be carried over HTTP [ RFC7230 ], but, in general, a URI can specify any protocol that can reliably transfer the specified resource on demand.
- **RFC 8216 : HTTP Live Streaming.** The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "NOT RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in BCP 14 [ RFC2119 ] [ RFC8174 ] when, and only when, they appear in all capitals, as shown here.
- **RFC 8216 : HTTP Live Streaming.** Each Media Segment MUST carry the continuation of the encoded bitstream from the end of the segment with the previous Media Sequence Number, where values in a series such as timestamps and Continuity Counters MUST continue uninterrupted.
- **RFC 8216 : HTTP Live Streaming.** Any Media Segment that contains video SHOULD include enough information to initialize a video decoder and decode a continuous set of frames that includes the final frame in the Segment; network efficiency is optimized if there is enough information in the Segment
- **RFC 8216 : HTTP Live Streaming.** For example, any Media Segment containing H.264 video SHOULD contain an Instantaneous Decoding Refresh (IDR); frames prior to the first IDR will be downloaded but possibly discarded.
- **RFC 8216 : HTTP Live Streaming.** Supported Media Segment Formats All Media Segments MUST be in a format described in this section.
- **RFC 8216 : HTTP Live Streaming.** The Media Initialization Section MUST NOT contain sample data.
- **RFC 8216 : HTTP Live Streaming.** Transport Stream Segments MUST contain a single MPEG-2 Program; playback of Multi-Program Transport Streams is not defined.
