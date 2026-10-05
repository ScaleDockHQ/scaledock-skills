# Signing and verifying

Read this when generating secrets or keys, signing a webhook, verifying one, rotating keys, or debugging a failed verification. Section names refer to the Standard Webhooks specification; library notes refer to the reference JavaScript library on `main`. Both are listed in [Sources](../SKILL.md#sources).

## Metadata

Two pieces of metadata travel with every payload, and the signature covers both (Webhook metadata):

- **Message id.** One unique identifier per event. It stays the same no matter how many times a failed webhook is retried, so consumers use it as an idempotency key against duplicates sent "maliciously, in error, or due to networking issues".
- **Attempt timestamp.** When this attempt was made. It is updated on every retry, unlike the event time in the payload, and it is the replay-protection control.

## Headers

The payload goes in the body of an HTTP POST, and the metadata goes in headers prefixed `webhook-`, named exactly as below (Webhook headers):

| Header              | Value                                            |
| ------------------- | ------------------------------------------------ |
| `webhook-id`        | The unique message identifier.                   |
| `webhook-timestamp` | Integer Unix timestamp, seconds since the epoch. |
| `webhook-signature` | Space-delimited list of versioned signatures.    |

```http
webhook-id: msg_2KWPBgLlAfxdpx2AI54pPJ85f4W
webhook-timestamp: 1674087231
webhook-signature: v1,K5oZfzN95Z9UVu1EsfQmfVNQhnkZ2pj9o9NDN/H/pI4= v1a,hnO3f9T8Ytu9HwrXslvumlUpqtNVqkhqw/enGzPCXe5BdqzCInXqYXFymVJaA7AZdpXwVLPo3mNl8EM+m7TBAg==
```

The example is from the specification (Webhook headers). The `msg_` prefix on the id is the example's convention, not a requirement.

## Signed content

Concatenate the id, the timestamp and the body, delimited by full stops, and sign the result (Signature scheme):

```text
msg_2KWPBgLlAfxdpx2AI54pPJ85f4W.1674087231.{"type":"contact.created","timestamp":"2022-11-03T20:26:10.344522Z","data":{"id":"1f81eb52-5198-4599-803e-771906343485"}}
```

- The id and the timestamp must not be user controlled, "or at the very least not be allowed to include any `.`", to prevent attacks that shift bytes between fields (Signature scheme).
- Minifying the JSON for sending is fine and recommended, but the payload sent must be the payload signed (Signature scheme).
- A consumer that parses the body as JSON and serializes it again will often fail verification, because JSON serialization differs between implementations and even between invocations. Verify against the raw body (Signature scheme).

## Schemes, secrets and identifiers

Both schemes are allowed with no restriction: different consumers can use different schemes, and one consumer can switch back and forth (Signature scheme).

|                      | Symmetric                                | Asymmetric                                                     |
| -------------------- | ---------------------------------------- | -------------------------------------------------------------- |
| Signature scheme     | HMAC-SHA256                              | ed25519                                                        |
| Signing secret       | Random, 24 to 64 bytes (192 to 512 bits) | Standard ed25519 key pair                                      |
| Secret serialization | base64, prefixed `whsec_`                | base64, prefixed `whsk_` (secret key) and `whpk_` (public key) |
| Signature identifier | `v1`                                     | `v1a`                                                          |

- The serialization row is how secrets are presented to customers. The prefix lets an implementation pick the scheme without extra configuration and keeps keys from being misused (Signature scheme).
- A serialized signature is the identifier, a comma, then the base64 signature, for example `v1,K5oZfzN95Z9UVu1EsfQmfVNQhnkZ2pj9o9NDN/H/pI4=` (Signature scheme). The specification's examples use the standard base64 alphabet with padding.
- The specification does not say which byte form of the ed25519 keys is base64 encoded after `whsk_` and `whpk_`. Agree on it with each counterparty, or follow the library you both use.

### Which scheme

- Symmetric is fast, often hardware accelerated, simple and available everywhere. Treat the secret like any other cryptographic secret; if you do not control the security of both producer and consumer, use asymmetric instead (Signature scheme, Comparison).
- Asymmetric means only the producer holds the private key, and consumers verify with a non-secret public key; it costs more CPU (Signature scheme, Comparison).
- "Prefer asymmetric signature schemes over symmetric ones", weighing the performance benefit of symmetric against its security drawbacks (Signature scheme, Additional considerations).

### Key handling

From Signature scheme, Additional considerations:

- Symmetric keys are unique per endpoint; asymmetric keys are unique per endpoint, or possibly per customer. Reusing keys across customers "can lead to security issues".
- Plan key distribution between producers and consumers early.
- Consumers keep a trust list of public keys and signature schemes, and do not trust a signature made by a key they did not already trust, for example one read from an extra request header.

## Multiple signatures and rotation

`webhook-signature` is a list so that secrets can rotate with zero downtime (Webhook headers):

1. During rotation the producer signs with the current key and the old key, for a set period, and sends both signatures space-delimited.
2. The consumer tries each signature until one verifies.
3. Signing with several keys, even compromised ones, does not weaken the scheme, because the consumer still needs one valid signature.

Keys should not change under normal circumstances, but must be able to change, for example after a compromise (Webhook headers). One header can also mix `v1` and `v1a` signatures, as in the example above.

## Producer: signing

1. Serialize the payload once and keep those bytes.
2. Take the message id (stable for the event) and the current Unix time in seconds for this attempt.
3. Build `id + "." + timestamp + "." + body`.
4. For each active key: HMAC-SHA256 with the decoded `whsec_` secret (`v1`), or an ed25519 signature with the `whsk_` key (`v1a`); base64 encode; prefix with the identifier and a comma.
5. Join the signatures with single spaces and send the three headers with the same body bytes.

A minimal symmetric signer, using only Node.js built-ins:

```ts
import { createHmac } from "node:crypto";

export function signV1(
  secret: string,
  id: string,
  timestamp: number,
  body: string,
): string {
  const key = Buffer.from(secret.replace(/^whsec_/, ""), "base64");
  const mac = createHmac("sha256", key)
    .update(`${id}.${timestamp}.${body}`)
    .digest("base64");
  return `v1,${mac}`;
}
```

## Consumer: verifying

From Verifying signatures, plus the order the reference library uses:

1. Read the raw body bytes before any JSON parsing.
2. Read `webhook-id`, `webhook-timestamp` and `webhook-signature`; reject the request if any is missing.
3. Parse the timestamp as an integer and reject it if it is outside your tolerance of the current time, in either direction, to prevent replay.
4. Split `webhook-signature` on spaces; split each entry at the first comma into identifier and signature; skip identifiers you do not support.
5. For `v1`, compute the expected HMAC and compare with a constant-time function. A plain comparison exposes timing attacks and can turn the consumer into a signing oracle.
6. For `v1a`, verify with the `whpk_` key from your trust list, using a battle-tested, up-to-date cryptographic library.
7. Accept if any one signature verifies; otherwise reject.
8. De-duplicate on `webhook-id`, for example by storing seen ids "in redis for 5 minutes", the specification's example.

A minimal symmetric verifier:

```ts
import { createHmac, timingSafeEqual } from "node:crypto";

const TOLERANCE_SECONDS = 5 * 60;

export function verifyV1(
  secret: string,
  headers: Record<string, string>,
  rawBody: string,
): boolean {
  const id = headers["webhook-id"];
  const ts = headers["webhook-timestamp"];
  const sigs = headers["webhook-signature"];
  if (!id || !ts || !sigs) return false;

  const timestamp = Number.parseInt(ts, 10);
  if (
    Number.isNaN(timestamp) ||
    Math.abs(Date.now() / 1000 - timestamp) > TOLERANCE_SECONDS
  )
    return false;

  const key = Buffer.from(secret.replace(/^whsec_/, ""), "base64");
  const expected = createHmac("sha256", key)
    .update(`${id}.${timestamp}.${rawBody}`)
    .digest();

  return sigs.split(" ").some((entry) => {
    const [version, value] = entry.split(",", 2);
    if (version !== "v1" || !value) return false;
    const given = Buffer.from(value, "base64");
    return given.length === expected.length && timingSafeEqual(given, expected);
  });
}
```

Header names are case-insensitive in HTTP; normalize them to lowercase before lookup, as the reference library does.

## Reference library behaviour

The JavaScript reference library (`standardwebhooks` 1.1.1) shows concrete choices the specification leaves open:

- Timestamp tolerance is 5 minutes, checked both ways: "Message timestamp too old" and "Message timestamp too new". A non-numeric timestamp is rejected.
- The secret may be passed with or without `whsec_`; the prefix is stripped and the rest base64 decoded. An empty secret throws.
- Only `v1` entries are checked; other identifiers are skipped. No reference library implements `v1a`.
- Header names are lowercased before lookup; a missing header throws "Missing required headers".
- `verify` returns the parsed JSON on success unless JSON parsing is turned off.
- The Python library accepts unpadded base64 secrets (release v1.0.1).

Prefer a reference or community library over hand-written verification when one exists for your language; the README lists libraries for Python, JavaScript/TypeScript, Java/Kotlin, Rust, Go, Ruby, PHP, C# and Elixir, and community ones for C#, Haskell, Java and Swift.

## Common mistakes

- Verifying a re-serialized body instead of the raw bytes (Signature scheme).
- Comparing HMACs with `==` (Verifying signatures).
- Skipping the timestamp check, which leaves captured requests replayable (Verifying signatures).
- Treating `webhook-signature` as a single value and failing during key rotation (Webhook headers).
- Reading a public key from the request instead of a trust list (Signature scheme, Additional considerations).
- Generating a new `webhook-id` on retry, which defeats idempotency (Webhook metadata).
- Sending the `webhook-timestamp` in milliseconds or ISO 8601; it is integer seconds (Webhook headers).
- Sharing one symmetric secret across endpoints or customers (Signature scheme, Additional considerations).
