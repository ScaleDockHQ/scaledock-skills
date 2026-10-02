# Logging and log retention: Arts. 12, 19 and 26(6)

Source: Regulation (EU) 2024/1689, consolidated text of 27.07.2026. The Act sets what logging must enable, not a log format. The design below is one way to meet it; agree it with counsel and the quality management system owner.

## What the Act requires

| Provision           | Requirement                                                                                                                                                                                                                                                                                  |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Art. 12(1)          | High-risk AI systems technically allow the automatic recording of events (logs) over the lifetime of the system.                                                                                                                                                                             |
| Art. 12(2)          | Logging enables recording events relevant for (a) identifying situations that may result in a risk under Art. 79(1) or in a substantial modification, (b) post-market monitoring under Art. 72, and (c) monitoring of operation by deployers under Art. 26(5).                               |
| Art. 12(3)          | For remote biometric identification systems (Annex III point 1(a)), at a minimum: the period of each use (start and end date and time), the reference database checked, the input data that led to a match, and the identification of the persons who verified the results under Art. 14(5). |
| Art. 13(3)(f)       | The instructions for use describe, where relevant, the mechanisms that let deployers collect, store and interpret the logs.                                                                                                                                                                  |
| Art. 19(1)          | Providers keep the automatically generated logs under their control for a period appropriate to the intended purpose, at least six months, unless Union or national law, in particular on personal data protection, provides otherwise.                                                      |
| Art. 19(2)          | Providers that are financial institutions keep the logs as part of their financial-services documentation.                                                                                                                                                                                   |
| Art. 26(6)          | Deployers keep the logs under their control for at least six months, with the same proviso.                                                                                                                                                                                                  |
| Annex IV point 2(g) | Technical documentation includes test logs and test reports, dated and signed by the responsible persons.                                                                                                                                                                                    |

## Event design

Derive events from the three Art. 12(2) purposes:

| Purpose                                          | Events to record                                                                                                                                                                                  |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| (a) Risk situations and substantial modification | Model, prompt, configuration and data-set version changes; out-of-distribution or low-confidence outputs; guardrail and safeguard triggers; human override or "stop" actions (Art. 14(4)(d), (e)) |
| (b) Post-market monitoring                       | Each inference or decision with system version, timing and outcome; performance metric samples; user feedback and complaints; incidents                                                           |
| (c) Deployer monitoring                          | Who used the system and when; inputs and outputs needed to review a decision, subject to data minimisation; oversight actions                                                                     |

```json
{
  "time": "2026-12-03T10:15:42.120Z",
  "system": {
    "name": "candidate-screening-ranker",
    "version": "3.4.1",
    "modelVersion": "2026-11-20"
  },
  "event": "decision.recommended",
  "purpose": ["art12_2_b", "art12_2_c"],
  "deployer": "acme-hr",
  "actor": { "type": "user", "id": "u-1842" },
  "input": { "ref": "blob://inputs/9f2c", "hash": "sha256:4be1…" },
  "output": { "score": 0.82, "rank": 3, "confidence": 0.71 },
  "oversight": { "reviewed": true, "overridden": false },
  "trace": { "traceId": "0af7651916cd43dd8448eb211c80319c" }
}
```

Field names here are illustrative. Store large or personal inputs by reference, so retention and access control can differ from the event itself.

## Retention and access

- Retain at least six months, or longer where the intended purpose or other law requires; data protection law can also limit retention (Art. 19(1), Art. 26(6)). Have counsel set the period.
- Providers give a competent authority access to the logs under their control on reasoned request (Art. 21(2)), and logs support incident analysis (Art. 73). Protect their integrity and restrict access accordingly; the Act does not prescribe a mechanism.
- Document in the instructions for use how deployers collect, store and interpret logs (Art. 13(3)(f)).

## Implementing with open specifications

- Trace model, tool and agent calls with the OpenTelemetry GenAI conventions (the `opentelemetry-genai` skill), keeping content capture off unless a reviewed decision enables it.
- Store audit events, such as user, configuration and oversight actions, in OCSF classes (the `ocsf` skill).
- Neither specification is required by the Act; they are interoperable formats that make the Art. 12 events easier to retain and query.
