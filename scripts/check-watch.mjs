#!/usr/bin/env node
// Needs the network, so it is not part of `pnpm verify`. Run it before refreshing opinionated skills.
// It reports what changed since each entry's `checked` date or `seen` version; it never fails the run.
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SKILLS_DIR = join(ROOT, "skills");
const TIMEOUT_MS = 20_000;
const CONCURRENCY = 8;
const USER_AGENT = "scaledock-skills-watch-check";

const only = process.argv.slice(2);

function loadWatch() {
  const entries = [];
  for (const folder of readdirSync(SKILLS_DIR).sort()) {
    if (only.length > 0 && !only.includes(folder)) continue;
    const file = join(SKILLS_DIR, folder, "metadata.json");
    if (!existsSync(file)) continue;
    const json = JSON.parse(readFileSync(file, "utf8"));
    for (const entry of json.watch ?? [])
      entries.push({ skill: folder, ...entry });
  }
  return entries;
}

function parseVersion(version) {
  const [core, pre] = version.split("-", 2);
  return { parts: core.split(".").map(Number), pre: pre ?? null };
}

function compareVersions(a, b) {
  const left = parseVersion(a);
  const right = parseVersion(b);
  for (let index = 0; index < 3; index++) {
    const diff = (left.parts[index] ?? 0) - (right.parts[index] ?? 0);
    if (diff !== 0) return diff;
  }
  if (left.pre === right.pre) return 0;
  if (left.pre === null) return 1;
  if (right.pre === null) return -1;
  return left.pre.localeCompare(right.pre, "en", { numeric: true });
}

async function get(url, accept) {
  const headers = { "user-agent": USER_AGENT, accept };
  if (url.startsWith("https://api.github.com/") && process.env.GITHUB_TOKEN) {
    headers.authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  const response = await fetch(url, {
    headers,
    redirect: "follow",
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response;
}

// The abbreviated document keeps `next` and `expo` small; it has dist-tags but no publish times.
async function checkNpm(entry) {
  const response = await get(
    `https://registry.npmjs.org/${entry.name.replace("/", "%2F")}`,
    "application/vnd.npm.install-v1+json",
  );
  const tags = (await response.json())["dist-tags"] ?? {};
  const tracked = entry.tag ?? "latest";
  const seenMajor = parseVersion(entry.seen).parts[0];
  const news = [];
  for (const [tag, version] of Object.entries(tags)) {
    if (compareVersions(version, entry.seen) <= 0) continue;
    // Other tags only matter when they preview a new major; canaries otherwise drown the report.
    if (tag === tracked || parseVersion(version).parts[0] > seenMajor) {
      news.push(`${tag} ${version} (seen ${entry.seen})`);
    }
  }
  return news;
}

async function checkGithub(entry) {
  const response = await get(
    `https://api.github.com/repos/${entry.repo}/releases?per_page=30`,
    "application/vnd.github+json",
  );
  const since = Date.parse(entry.checked);
  return (await response.json())
    .filter(
      (release) => !release.draft && Date.parse(release.published_at) > since,
    )
    .map(
      (release) =>
        `${release.published_at.slice(0, 10)} ${release.tag_name}${release.prerelease ? " (pre-release)" : ""} ${release.html_url}`,
    );
}

function tagText(block, names) {
  for (const name of names) {
    const match = block.match(
      new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`),
    );
    if (match) return match[1].replace(/<!\[CDATA\[|\]\]>/g, "").trim();
  }
  return null;
}

async function checkFeed(entry) {
  const response = await get(
    entry.url,
    "application/rss+xml, application/atom+xml, application/xml, text/xml",
  );
  const xml = await response.text();
  const since = Date.parse(entry.checked);
  const news = [];
  for (const [block] of xml.matchAll(/<(item|entry)\b[\s\S]*?<\/\1>/g)) {
    const date = Date.parse(
      tagText(block, ["pubDate", "published", "updated", "dc:date"]) ?? "",
    );
    if (!(date > since)) continue;
    const link =
      tagText(block, ["link"]) ??
      block.match(/<link[^>]*href="([^"]+)"/)?.[1] ??
      "";
    news.push(
      `${new Date(date).toISOString().slice(0, 10)} ${tagText(block, ["title"])} ${link}`,
    );
  }
  return news;
}

const CHECKS = { npm: checkNpm, github: checkGithub, feed: checkFeed };
const LABELS = { npm: "name", github: "repo", feed: "url" };

const entries = loadWatch();
const results = new Array(entries.length);
let next = 0;
await Promise.all(
  Array.from({ length: CONCURRENCY }, async () => {
    while (next < entries.length) {
      const index = next++;
      const entry = entries[index];
      try {
        results[index] = { news: await CHECKS[entry.type](entry) };
      } catch (error) {
        results[index] = { error: error.message ?? String(error) };
      }
    }
  }),
);

let newCount = 0;
let errorCount = 0;
let currentSkill = null;
entries.forEach((entry, index) => {
  const { news, error } = results[index];
  if (!error && news.length === 0) return;
  if (entry.skill !== currentSkill) {
    currentSkill = entry.skill;
    console.log(`\n${entry.skill}`);
  }
  const label = `${entry.type} ${entry[LABELS[entry.type]]}`;
  if (error) {
    errorCount++;
    console.warn(`  error  ${label}: ${error}`);
    return;
  }
  newCount += news.length;
  console.log(`  ${label} (checked ${entry.checked})`);
  for (const line of news) console.log(`    new  ${line}`);
});

console.log(
  `\nWatched ${entries.length} entr${entries.length === 1 ? "y" : "ies"} across ${new Set(entries.map((e) => e.skill)).size} skill(s): ${newCount} new item(s), ${errorCount} error(s).`,
);
console.log(
  "After acting on an item, update the skill, then bump `checked` (and `seen` for npm) in its metadata.json.",
);
