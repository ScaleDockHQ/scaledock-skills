#!/usr/bin/env node
// Needs the network, so it is not part of `pnpm verify`. Run it before refreshing spec skills.
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SKILLS_DIR = join(ROOT, "skills");
const STALE_AFTER_DAYS = 90;
const TIMEOUT_MS = 20_000;
const CONCURRENCY = 8;
const DAY_MS = 24 * 60 * 60 * 1000;

const only = process.argv.slice(2);

function loadSources() {
  const entries = [];
  for (const folder of readdirSync(SKILLS_DIR).sort()) {
    if (only.length > 0 && !only.includes(folder)) continue;
    const file = join(SKILLS_DIR, folder, "metadata.json");
    if (!existsSync(file)) continue;
    const json = JSON.parse(readFileSync(file, "utf8"));
    if (json.kind !== "standard" || !Array.isArray(json.sources)) continue;
    for (const source of json.sources)
      entries.push({ skill: folder, ...source });
  }
  return entries;
}

async function probe(url) {
  for (const method of ["HEAD", "GET"]) {
    try {
      const response = await fetch(url, {
        method,
        redirect: "follow",
        signal: AbortSignal.timeout(TIMEOUT_MS),
        headers: { "user-agent": "scaledock-skills sources:check" },
      });
      if (response.ok) return { ok: true, status: response.status };
      // Some hosts reject HEAD; retry with GET before reporting.
      if (method === "GET") return { ok: false, status: response.status };
    } catch (error) {
      if (method === "GET") return { ok: false, status: error.name };
    }
  }
  return { ok: false, status: "unknown" };
}

const sources = loadSources();
const urls = [...new Set(sources.map((source) => source.url))];
const results = new Map();
let next = 0;
await Promise.all(
  Array.from({ length: CONCURRENCY }, async () => {
    while (next < urls.length) {
      const url = urls[next++];
      results.set(url, await probe(url));
    }
  }),
);

const now = Date.now();
const dead = sources.filter((source) => !results.get(source.url).ok);
const stale = sources.filter(
  (source) => now - Date.parse(source.checked) > STALE_AFTER_DAYS * DAY_MS,
);

for (const source of dead) {
  console.error(
    `dead   ${source.skill}: ${source.url} (${results.get(source.url).status})`,
  );
}
for (const source of stale) {
  console.warn(
    `stale  ${source.skill}: ${source.title} (checked ${source.checked})`,
  );
}

console.log(
  `\nChecked ${urls.length} URL(s) across ${new Set(sources.map((s) => s.skill)).size} spec skill(s): ${dead.length} dead, ${stale.length} stale.`,
);
if (dead.length > 0) process.exit(1);
