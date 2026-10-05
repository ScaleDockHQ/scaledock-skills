#!/usr/bin/env node
// Needs the network, so it is not part of `pnpm verify`. Reports version lines the publisher indexes have that skills omit.
import { loadStandardsIndex } from "./standards/indexes.mjs";

const index = await loadStandardsIndex();
const gaps = index.publishers.flatMap((publisher) =>
  publisher.gaps.map((gap) => ({ publisher: publisher.name, ...gap })),
);

for (const failure of index.failures) {
  console.error(
    `fetch  ${failure.publisher}: ${failure.url} (${failure.message})`,
  );
}
for (const gap of gaps) {
  console.error(`missing ${gap.skill} (${gap.publisher}): ${gap.detail}`);
}

const skills = new Set(gaps.map((gap) => gap.skill));
console.log(
  `\nVersion lines: ${gaps.length} missing across ${skills.size} skill(s); ${index.failures.length} fetch failure(s).`,
);
if (gaps.length > 0 || index.failures.length > 0) process.exit(1);
