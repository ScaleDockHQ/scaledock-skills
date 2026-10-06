# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## Debug Adapter Protocol

Source: https://microsoft.github.io/debug-adapter-protocol/specification

The Debug Adapter Protocol defines the protocol used between an editor or IDE and a debugger or runtime.

- **Debug Adapter Protocol.** Clients should only call this request if the corresponding capability supportsCancelRequest is true.
- **Debug Adapter Protocol.** The cancel request may return an error if it could not cancel an operation but a client should refrain from presenting this error to end users.
- **Debug Adapter Protocol.** A client should not assume that progress just got cancelled after sending the cancel request.
- **Debug Adapter Protocol.** * For backward compatibility this string is shown in the UI if the * `description` attribute is missing (but it must not be translated).
- **Debug Adapter Protocol.** _/ threadId ?: number ; /_* * A value of true hints to the client that this event should not change the * focus.
- **Debug Adapter Protocol.** * - The client should use this information to enable that all threads can * be expanded to access their stacktraces.
- **Debug Adapter Protocol.** This category should only be used for informational * output from the debugger (as opposed to the debuggee).
- **Debug Adapter Protocol.** This category should only be used for important messages * from the debugger (as opposed to the debuggee).
