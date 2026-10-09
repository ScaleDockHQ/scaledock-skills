# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. EPSS is a scoring model and its pages have no MUST or SHALL keywords, so the score is given by its definitions and by the usage guidance that drives implementation, quoted as written. Apply the ones that match the role. Each is labelled with the page section it comes from.

## Using EPSS

Source: https://www.first.org/epss/using-epss

- **What EPSS measures.** The EPSS score is a calibrated probability: the estimated likelihood that exploitation activity for a given vulnerability will be observed across EPSS data partners in the next 30 days.
- **Aggregating probabilities.** Assuming exploitation events are approximately independent across vulnerabilities, the probability that at least one of n vulnerabilities is exploited is:
- **Aggregating probabilities.** The expected number of exploited vulnerabilities in a set over the next 30 days is the sum of the individual probabilities.
- **Combining EPSS with other signals.** Cross-reference EPSS scores against the vulnerabilities discovered in your environment before acting on any of them.
- **Combining EPSS with other signals.** As a general rule of thumb: when a vulnerability appears on CISA KEV, treat it as actively exploited and prioritize accordingly, regardless of EPSS score.
- **Common misuses.** Do not multiply an EPSS score by an ordinal (such as CVSS) and think that produces a combined "risk score."
- **Common misuses.** Confirmed and recent exploitation evidence should take precedence over the score when it exists.
- **Common misuses.** This is why every score is published with a percentile ranking: it represents the percent of vulnerabilities at or below this score

## How EPSS Works

Source: https://www.first.org/epss/how-it-works

- **Calibration.** Calibration aligns that output to the empirically measured exploitation rate across the population, so that a score of 0.05 represents a genuine 5% probability of exploitation within 30 days.
- **Daily re-scoring.** Each day, EPSS recomputes features for every vulnerability in the corpus and runs the fixed model to generate updated scores.
- **Measuring performance.** Coverage is the fraction of exploited vulnerabilities a given score threshold captures.
- **Measuring performance.** Effort is the fraction of all vulnerabilities you must act on to achieve a given level of coverage.
- **Measuring performance.** Efficiency is the fraction of vulnerabilities you acted on that were actually exploited.
- **Known limitations.** Practitioners should layer EPSS scores with asset inventory and other local context to determine which high-scoring vulnerabilities are actually present in their environment.
- **Known limitations.** The score should be read as a probability and used as a prioritization input, not as a pass/fail threshold.

## Get the Data

Source: https://www.first.org/epss/data

- **API.** It should not be used for bulk downloads or to keep a local copy of all scores in sync; the daily CSV or the GitHub repository is the right mechanism for that.
- **Daily CSV.** percentile — the proportion of all scored vulnerabilities with the same score or lower
- **Historical data.** A time series that crosses one of these boundaries reflects a change in methodology, not a change in the vulnerability itself.
- **Historical data.** EPSS v5 (v2026.06.15): started publishing 2026-06-15
