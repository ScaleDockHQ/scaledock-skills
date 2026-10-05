// Shared fetchers for `pnpm inventory` and `pnpm versions:check`. No dependencies.
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const SKILLS_DIR = join(ROOT, "skills");
const CATALOG_PATH = join(ROOT, "scripts", "standards", "catalog.json");
const TIMEOUT_MS = 45_000;
const CONCURRENCY = 6;
const USER_AGENT = "scaledock-skills inventory";

const RETIRED = /^(retired|rescinded|discontinued|superseded)$/i;
const RFC_CANDIDATE_STATUS = new Set([
  "INTERNET STANDARD",
  "PROPOSED STANDARD",
  "DRAFT STANDARD",
  "BEST CURRENT PRACTICE",
  "INFORMATIONAL",
  "EXPERIMENTAL",
]);

export async function loadStandardsIndex() {
  const failures = [];
  const skills = loadSkills();
  const tokenMap = indexSkillTokens(skills);
  const catalog = JSON.parse(readFileSync(CATALOG_PATH, "utf8"));

  const [
    w3c,
    whatwg,
    browserSpecs,
    rfcs,
    drafts,
    tc39,
    unicode,
    hl7,
    catalogRows,
  ] = await Promise.all([
    loadW3c(failures),
    loadWhatwg(failures),
    loadBrowserSpecs(failures),
    loadRfcIndex(failures),
    loadWgDrafts(failures),
    loadTc39(failures),
    loadUnicode(failures),
    loadHl7(failures),
    loadCatalog(catalog.entries, failures),
  ]);

  const publishers = [
    publisherW3c(w3c, skills, tokenMap),
    publisherWicg(browserSpecs, tokenMap),
    publisherWhatwg(whatwg, skills, tokenMap),
    publisherBrowserSpecs(browserSpecs, tokenMap),
    publisherIetf(rfcs, drafts, skills, tokenMap),
    publisherTc39(tc39, tokenMap),
    publisherUnicode(unicode, skills, tokenMap),
    publisherHl7(hl7, skills, tokenMap),
    ...publisherCatalog(catalog.entries, catalogRows, skills, tokenMap),
  ];

  return {
    generatedOn: new Date().toISOString().slice(0, 10),
    failures,
    publishers,
  };
}

function loadSkills() {
  const skills = [];
  for (const folder of readdirSync(SKILLS_DIR).sort()) {
    const file = join(SKILLS_DIR, folder, "metadata.json");
    if (!existsSync(file)) continue;
    const json = JSON.parse(readFileSync(file, "utf8"));
    if (json.kind !== "standard" || !Array.isArray(json.sources)) continue;
    skills.push({
      name: folder,
      versions: Array.isArray(json.versions) ? json.versions : [],
      sources: json.sources,
    });
  }
  return skills;
}

function indexSkillTokens(skills) {
  const map = new Map();
  for (const skill of skills) {
    for (const source of skill.sources) {
      if (!source.url) continue;
      for (const token of tokensFromUrl(source.url))
        addToken(map, token, skill.name);
    }
  }
  return map;
}

function addToken(map, token, skill) {
  const key = token.toLowerCase();
  const set = map.get(key) ?? new Set();
  set.add(skill);
  map.set(key, set);
}

function skillsFor(map, tokens) {
  const names = new Set();
  for (const token of tokens) {
    const found = map.get(token.toLowerCase());
    if (found) for (const name of found) names.add(name);
  }
  return [...names].sort();
}

export function tokensFromUrl(url) {
  const tokens = new Set();
  let clean = url.split("#")[0];
  try {
    const parsed = new URL(url);
    parsed.hash = "";
    if (parsed.pathname.endsWith("/"))
      parsed.pathname = parsed.pathname.replace(/\/+$/, "/");
    clean = parsed.toString().replace(/\/$/, "");
  } catch {
    clean = url.split("#")[0].replace(/\/$/, "");
  }
  tokens.add(`url:${clean.toLowerCase()}`);

  const tr = clean.match(/w3\.org\/TR\/([^/?#]+)/i);
  if (tr) tokens.add(`w3c:${decodeURIComponent(tr[1]).toLowerCase()}`);

  const rfc = clean.match(/rfc(\d+)/i);
  if (rfc) tokens.add(`rfc:${Number(rfc[1])}`);

  const draft = clean.match(/draft-(ietf(?:-[a-z0-9]+)+)-(\d{2})(?!\d)/i);
  if (draft) tokens.add(`draft:draft-${draft[1].toLowerCase()}`);

  const github = clean.match(
    /github\.com\/([^/]+)\/([^/]+?)(?:\.git)?(?:\/([^?#]*))?$/i,
  );
  if (github) {
    const rest = github[3] ?? "";
    if (rest === "" || rest.startsWith("releases")) {
      tokens.add(`gh:${github[1].toLowerCase()}/${github[2].toLowerCase()}`);
    }
  }

  const whatwg = clean.match(
    /https?:\/\/([a-z0-9-]+\.spec\.whatwg\.org)([^?#]*)/i,
  );
  if (whatwg) {
    const path = whatwg[2].replace(/\/$/, "") || "/";
    if (
      path === "/" ||
      path === "/multipage" ||
      path.startsWith("/review-drafts")
    ) {
      tokens.add(`whatwg:${whatwg[1].toLowerCase()}`);
    }
  }

  for (const match of clean.matchAll(/CELEX(?::|%3A)([0-9A-Z]+)/gi)) {
    tokens.add(`celex:${match[1].toLowerCase()}`);
  }

  const ecma = clean.match(/ecma-(\d+)/i);
  if (ecma) tokens.add(`ecma:${Number(ecma[1])}`);

  return [...tokens];
}

function versionBlob(skill) {
  return skill.versions
    .map((version) =>
      [version.id, version.label, version.revision].filter(Boolean).join(" "),
    )
    .join("\n");
}

function mentions(blob, token) {
  if (!token) return false;
  const escaped = String(token).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`(?<![A-Za-z0-9])${escaped}(?![A-Za-z0-9])`, "i").test(
    blob,
  );
}

async function mapPool(items, fn) {
  const results = new Array(items.length);
  let next = 0;
  const workers = Math.min(CONCURRENCY, items.length);
  await Promise.all(
    Array.from({ length: workers }, async () => {
      while (next < items.length) {
        const index = next++;
        results[index] = await fn(items[index], index);
      }
    }),
  );
  return results;
}

async function fetchText(url, accept) {
  const response = await fetch(url, {
    redirect: "follow",
    signal: AbortSignal.timeout(TIMEOUT_MS),
    headers: {
      "user-agent": USER_AGENT,
      accept: accept ?? "*/*",
    },
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return { text: await response.text(), url: response.url };
}

async function fetchJson(url) {
  const { text, url: finalUrl } = await fetchText(url, "application/json");
  return { json: JSON.parse(text), url: finalUrl };
}

function fail(failures, publisher, url, error) {
  failures.push({
    publisher,
    url,
    message: error instanceof Error ? error.message : String(error),
  });
}

async function loadW3c(failures) {
  const specifications = await fetchW3cCollection(
    failures,
    "specifications",
    "specifications",
  );
  const series = await fetchW3cCollection(
    failures,
    "specification-series",
    "specification-series",
  );
  return { specifications, series };
}

async function fetchW3cCollection(failures, path, key) {
  const firstUrl = `https://api.w3.org/${path}?embed=1&items=100&page=1`;
  let first;
  try {
    first = (await fetchJson(firstUrl)).json;
  } catch (error) {
    fail(failures, "W3C", firstUrl, error);
    return [];
  }
  const pageCount = first.pages ?? 1;
  const rest = await mapPool(
    Array.from({ length: Math.max(0, pageCount - 1) }, (_, index) => index + 2),
    async (page) => {
      const url = `https://api.w3.org/${path}?embed=1&items=100&page=${page}`;
      try {
        return (await fetchJson(url)).json;
      } catch (error) {
        fail(failures, "W3C", url, error);
        return null;
      }
    },
  );
  return [first, ...rest.filter(Boolean)].flatMap(
    (page) => page._embedded?.[key] ?? [],
  );
}

function w3cSpec(raw) {
  const latest = raw._links?.["latest-version"];
  const seriesHref = raw._links?.series?.href ?? "";
  const series = seriesHref.split("/").filter(Boolean).pop() ?? raw.shortname;
  const dated = latest?.href?.match(/versions\/(\d{8})/);
  const date = dated
    ? `${dated[1].slice(0, 4)}-${dated[1].slice(4, 6)}-${dated[1].slice(6, 8)}`
    : "—";
  return {
    shortname: raw.shortname,
    title: strip(raw.title),
    series: series?.toLowerCase() ?? raw.shortname?.toLowerCase(),
    seriesVersion: raw["series-version"] ? String(raw["series-version"]) : "",
    status: latest?.title ?? "unknown",
    date,
    url: (raw.shortlink ?? `https://www.w3.org/TR/${raw.shortname}/`).replace(
      /\/$/,
      "",
    ),
  };
}

function publisherW3c(w3c, skills, tokenMap) {
  const specs = w3c.specifications
    .filter((spec) => spec.shortname)
    .map(w3cSpec);
  const currentBySeries = new Map();
  for (const series of w3c.series) {
    const current = series._links?.["current-specification"]?.href
      ?.split("/")
      .filter(Boolean)
      .pop();
    if (series.shortname && current) {
      currentBySeries.set(
        series.shortname.toLowerCase(),
        current.toLowerCase(),
      );
    }
  }

  const grouped = new Map();
  for (const spec of specs) {
    const list = grouped.get(spec.series) ?? [];
    list.push(spec);
    grouped.set(spec.series, list);
  }

  const covered = [];
  const uncovered = [];
  const gaps = [];
  const skillsByName = new Map(skills.map((skill) => [skill.name, skill]));

  for (const [series, levels] of [...grouped.entries()].sort((a, b) =>
    a[0].localeCompare(b[0]),
  )) {
    const matched = new Map();
    for (const level of levels) {
      for (const skill of skillsFor(tokenMap, [
        `w3c:${level.shortname.toLowerCase()}`,
      ])) {
        const shortnames = matched.get(skill) ?? [];
        shortnames.push(level.shortname);
        matched.set(skill, shortnames);
      }
    }
    const representative = pickSeriesSpec(levels, currentBySeries.get(series));
    if (matched.size > 0) {
      covered.push({
        id: series,
        title: representative.title,
        status: representative.status,
        date: representative.date,
        url: representative.url,
        detail: [...matched.values()]
          .flat()
          .filter((name, index, list) => list.indexOf(name) === index)
          .sort()
          .join(", "),
        skills: [...matched.keys()].sort(),
      });
      for (const [skillName, shortnames] of matched) {
        const skill = skillsByName.get(skillName);
        const blob = versionBlob(skill);
        for (const level of levels) {
          if (ignoredW3cLevel(level) || levelMentioned(blob, level)) continue;
          if (
            shortnames.some(
              (name) => name.toLowerCase() === level.shortname.toLowerCase(),
            )
          ) {
            gaps.push({
              skill: skillName,
              detail: `${level.shortname} (${level.status}, ${level.date}) is a source but not a version line`,
            });
            continue;
          }
          gaps.push({
            skill: skillName,
            detail: `series ${series} level ${level.shortname} (${level.seriesVersion || "no series version"}, ${level.status}, ${level.date}) is missing from versions`,
          });
        }
      }
      continue;
    }
    if (RETIRED.test(representative.status)) continue;
    if (levels.every((level) => RETIRED.test(level.status))) continue;
    uncovered.push({
      id: series,
      title: representative.title,
      status: representative.status,
      date: representative.date,
      url: representative.url,
      detail: representative.shortname,
      skills: [],
    });
  }

  return {
    id: "w3c",
    name: "W3C",
    note: "Series come from api.w3.org specifications and specification-series. A series is covered when any level shortname appears in a skill source. Retired series with no skill are omitted. Other levels of a covered series are version gaps.",
    covered,
    uncovered,
    gaps: uniqueGaps(gaps),
  };
}

function pickSeriesSpec(levels, currentShortname) {
  const current = levels.find(
    (level) => level.shortname.toLowerCase() === currentShortname,
  );
  if (current) return current;
  const rank = {
    recommendation: 60,
    "proposed recommendation": 50,
    "candidate recommendation": 40,
    "candidate recommendation draft": 40,
    "proposed edited recommendation": 40,
    "working draft": 20,
    "first public working draft": 10,
  };
  return [...levels].sort((a, b) => {
    const score =
      (rank[b.status.toLowerCase()] ?? 0) - (rank[a.status.toLowerCase()] ?? 0);
    if (score !== 0) return score;
    return b.date.localeCompare(a.date);
  })[0];
}

function ignoredW3cLevel(level) {
  return /note|registry|retired|rescinded|discontinued/i.test(level.status);
}

function levelMentioned(blob, level) {
  if (mentions(blob, level.shortname)) return true;
  if (level.seriesVersion.includes(".") && mentions(blob, level.seriesVersion))
    return true;
  if (level.seriesVersion && mentions(blob, `Level ${level.seriesVersion}`))
    return true;
  return false;
}

async function loadBrowserSpecs(failures) {
  const url = "https://w3c.github.io/browser-specs/index.json";
  try {
    return (await fetchJson(url)).json;
  } catch (error) {
    fail(failures, "browser-specs", url, error);
    return [];
  }
}

function browserRow(spec) {
  const release = spec.release ?? spec.nightly ?? {};
  return {
    id: spec.shortname,
    title: spec.title,
    status: release.status ?? spec.standing ?? "unknown",
    date: "—",
    url: spec.url,
    detail: spec.organization,
    organization: spec.organization,
    groups: (spec.groups ?? []).map((group) => group.name).join(", "),
    tokens: [
      `url:${spec.url.replace(/\/$/, "").toLowerCase()}`,
      `w3c:${spec.shortname.toLowerCase()}`,
      ...tokensFromUrl(spec.url),
      ...tokensFromUrl(spec.nightly?.url ?? spec.url),
    ],
  };
}

function publisherWicg(browserSpecs, tokenMap) {
  const rows = browserSpecs
    .filter((spec) =>
      (spec.groups ?? []).some((group) =>
        /incubator|wicg/i.test(group.name ?? ""),
      ),
    )
    .map(browserRow);
  return splitRows(
    "wicg",
    "WICG",
    "W3C Web Incubator Community Group specifications tagged in w3c/browser-specs.",
    rows,
    tokenMap,
  );
}

function publisherBrowserSpecs(browserSpecs, tokenMap) {
  const wanted = new Set([
    "Khronos Group",
    "IETF",
    "Ecma International",
    "FIDO Alliance",
    "Alliance for Open Media",
    "ISO/IEC",
    "W3C/OGC",
  ]);
  const rows = browserSpecs
    .filter((spec) => wanted.has(spec.organization))
    .map(browserRow);
  return splitRows(
    "browser-specs",
    "browser-specs (other publishers)",
    "WHATWG, WICG and W3C entries are in their own sections. This section is the rest of w3c/browser-specs: Khronos, IETF web specs, Ecma, FIDO, Alliance for Open Media, ISO/IEC and W3C/OGC.",
    rows,
    tokenMap,
  );
}

async function loadWhatwg(failures) {
  const dbUrl = "https://raw.githubusercontent.com/whatwg/sg/main/db.json";
  let standards = [];
  try {
    const db = (await fetchJson(dbUrl)).json;
    standards = db.workstreams.flatMap((workstream) =>
      (workstream.standards ?? []).map((standard) => ({
        ...standard,
        workstream: workstream.name,
      })),
    );
  } catch (error) {
    fail(failures, "WHATWG", dbUrl, error);
    return [];
  }

  const drafted = await mapPool(standards, async (standard) => {
    const reviewUrl = new URL("/review-drafts/", standard.href).toString();
    try {
      const { text } = await fetchText(reviewUrl, "text/html");
      const months = [...text.matchAll(/href="(\d{4}-\d{2})\//g)].map(
        (match) => match[1],
      );
      months.sort();
      return { ...standard, reviewDraft: months.at(-1) ?? "", reviewUrl };
    } catch {
      // Some living standards do not publish a Review Draft directory.
      return { ...standard, reviewDraft: "", reviewUrl };
    }
  });
  return drafted;
}

function publisherWhatwg(standards, skills, tokenMap) {
  const rows = standards.map((standard) => {
    const host = new URL(standard.href).host.toLowerCase();
    return {
      id: standard.reference || standard.name,
      title: standard.name,
      status: "Living Standard",
      date: standard.reviewDraft || "—",
      url: standard.href,
      detail: standard.workstream,
      tokens: [`whatwg:${host}`, ...tokensFromUrl(standard.href)],
    };
  });
  const split = splitRows(
    "whatwg",
    "WHATWG",
    "Living standards from whatwg/sg db.json. The date is the latest Review Draft month.",
    rows,
    tokenMap,
  );
  const gaps = [];
  for (const standard of standards) {
    if (!standard.reviewDraft) continue;
    const host = new URL(standard.href).host.toLowerCase();
    for (const skillName of skillsFor(tokenMap, [`whatwg:${host}`])) {
      const skill = skills.find((item) => item.name === skillName);
      if (mentions(versionBlob(skill), standard.reviewDraft)) continue;
      gaps.push({
        skill: skillName,
        detail: `${standard.name} latest Review Draft ${standard.reviewDraft} is missing from versions`,
      });
    }
  }
  split.gaps = uniqueGaps(gaps);
  return split;
}

async function loadRfcIndex(failures) {
  const url = "https://www.rfc-editor.org/rfc-index.xml";
  try {
    const { text } = await fetchText(url, "application/xml");
    const rfcs = [];
    for (const block of text.split("<rfc-entry>").slice(1)) {
      const end = block.indexOf("</rfc-entry>");
      const entry = end === -1 ? block : block.slice(0, end);
      const docId = tagText(entry, "doc-id");
      const number = Number(docId.replace(/^RFC/, ""));
      if (!number) continue;
      const month = tagText(entry, "month");
      const year = tagText(entry, "year");
      rfcs.push({
        number,
        title: tagText(entry, "title"),
        status: tagText(entry, "current-status").replace(/\s+/g, " ").trim(),
        date: month && year ? `${month} ${year}` : year || "—",
        obsoletedBy: wrappedDocs(entry, "obsoleted-by"),
        updatedBy: wrappedDocs(entry, "updated-by"),
      });
    }
    return rfcs;
  } catch (error) {
    fail(failures, "IETF", url, error);
    return [];
  }
}

function tagText(block, name) {
  const match = block.match(new RegExp(`<${name}>([\\s\\S]*?)</${name}>`));
  return match ? match[1].replace(/\s+/g, " ").trim() : "";
}

function wrappedDocs(block, wrapper) {
  const numbers = [];
  for (const match of block.matchAll(
    new RegExp(`<${wrapper}>([\\s\\S]*?)</${wrapper}>`, "g"),
  )) {
    for (const id of match[1].matchAll(/<doc-id>RFC(\d+)<\/doc-id>/g)) {
      numbers.push(Number(id[1]));
    }
  }
  return numbers;
}

async function loadWgDrafts(failures) {
  const drafts = [];
  const base =
    "https://datatracker.ietf.org/api/v1/doc/document/?format=json&type=draft&group__type=wg&states=1&limit=250";
  try {
    let offset = 0;
    let total = Infinity;
    while (offset < total) {
      const { json } = await fetchJson(`${base}&offset=${offset}`);
      total = json.meta?.total_count ?? 0;
      for (const doc of json.objects ?? []) {
        drafts.push({
          name: doc.name,
          title: strip(doc.title || doc.name),
          rev: String(doc.rev ?? ""),
          date: (doc.time || doc.expires || "—").slice(0, 10),
        });
      }
      if (!json.meta?.next) break;
      offset += json.meta?.limit ?? 250;
    }
    return drafts;
  } catch (error) {
    fail(failures, "IETF", base, error);
    return [];
  }
}

function publisherIetf(rfcs, drafts, skills, tokenMap) {
  const covered = [];
  const uncovered = [];
  for (const rfc of rfcs) {
    const names = skillsFor(tokenMap, [`rfc:${rfc.number}`]);
    const row = {
      id: `RFC ${rfc.number}`,
      title: rfc.title,
      status: rfc.status || "unknown",
      date: rfc.date,
      url: `https://www.rfc-editor.org/rfc/rfc${rfc.number}`,
      detail: rfc.obsoletedBy.length
        ? `obsoleted by ${rfc.obsoletedBy.map((number) => `RFC ${number}`).join(", ")}`
        : "",
      skills: names,
    };
    if (names.length > 0) covered.push(row);
    else if (
      rfc.obsoletedBy.length === 0 &&
      RFC_CANDIDATE_STATUS.has(rfc.status.toUpperCase())
    ) {
      uncovered.push(row);
    }
  }

  for (const draft of drafts) {
    const token = `draft:${draft.name.toLowerCase()}`;
    const names = skillsFor(tokenMap, [token]);
    const row = {
      id: draft.name,
      title: draft.title,
      status: `Active WG draft, rev ${draft.rev || "?"}`,
      date: draft.date,
      url: `https://datatracker.ietf.org/doc/html/${draft.name}`,
      detail: "",
      skills: names,
    };
    if (names.length > 0) covered.push(row);
    else uncovered.push(row);
  }

  const byNumber = new Map(rfcs.map((rfc) => [rfc.number, rfc]));
  const byDraft = new Map(
    drafts.map((draft) => [draft.name.toLowerCase(), draft]),
  );
  const gaps = [];
  for (const skill of skills) {
    const blob = versionBlob(skill);
    const seenRfc = new Set();
    for (const source of skill.sources) {
      if (!source.url) continue;
      const rfcMatch = source.url.match(/rfc(\d+)/i);
      if (rfcMatch) {
        const number = Number(rfcMatch[1]);
        if (!seenRfc.has(number)) {
          seenRfc.add(number);
          const rfc = byNumber.get(number);
          for (const newer of rfc?.obsoletedBy ?? []) {
            if (mentions(blob, `RFC ${newer}`) || mentions(blob, `RFC${newer}`))
              continue;
            gaps.push({
              skill: skill.name,
              detail: `RFC ${number} is obsoleted by RFC ${newer}, which is missing from versions`,
            });
          }
        }
      }
      const draftMatch = source.url.match(
        /draft-(ietf(?:-[a-z0-9]+)+)-(\d{2})(?!\d)/i,
      );
      if (!draftMatch) continue;
      const name = `draft-${draftMatch[1].toLowerCase()}`;
      const cited = Number(draftMatch[2]);
      const live = byDraft.get(name);
      if (!live) continue;
      const latest = Number(live.rev);
      if (!Number.isFinite(latest) || latest <= cited) continue;
      const padded = String(latest).padStart(2, "0");
      if (
        mentions(blob, `${name}-${padded}`) ||
        mentions(blob, `rev ${latest}`)
      )
        continue;
      gaps.push({
        skill: skill.name,
        detail: `${name} newest WG revision is ${padded}; versions do not mention it (source cites ${draftMatch[2]})`,
      });
    }
  }

  covered.sort((a, b) =>
    a.id.localeCompare(b.id, undefined, { numeric: true }),
  );
  uncovered.sort((a, b) =>
    a.id.localeCompare(b.id, undefined, { numeric: true }),
  );
  return {
    id: "ietf",
    name: "IETF",
    note: "RFCs come from rfc-index.xml. Uncovered RFCs are not obsoleted and have status Internet Standard, Proposed Standard, Draft Standard, Best Current Practice, Informational or Experimental. Active working-group drafts come from the datatracker (state Active). Version gaps are obsoleted-by RFCs and newer revisions of cited draft-ietf drafts.",
    covered,
    uncovered,
    gaps: uniqueGaps(gaps),
  };
}

async function loadTc39(failures) {
  const readmeUrl =
    "https://raw.githubusercontent.com/tc39/proposals/main/README.md";
  const finishedUrl =
    "https://raw.githubusercontent.com/tc39/proposals/main/finished-proposals.md";
  const rows = [];
  try {
    const { text } = await fetchText(readmeUrl, "text/plain");
    const stage3 =
      text.match(/^### Stage 3\b[\s\S]*?(?=^### |^## )/m)?.[0] ?? "";
    rows.push(...referenceProposals(stage3, text, "stage 3"));
  } catch (error) {
    fail(failures, "TC39", readmeUrl, error);
  }
  try {
    const { text } = await fetchText(finishedUrl, "text/plain");
    rows.push(...referenceProposals(text, text, "finished"));
  } catch (error) {
    fail(failures, "TC39", finishedUrl, error);
  }
  return rows;
}

function referenceProposals(section, markdown, status) {
  const defs = new Map();
  for (const match of markdown.matchAll(/^\[([^\]]+)\]:\s+(\S+)/gm)) {
    defs.set(match[1].toLowerCase(), match[2].replace(/\/$/, ""));
  }
  const rows = [];
  const seen = new Set();
  for (const match of section.matchAll(/^\|\s*\[([^\]]+)\]\[([^\]]+)\]/gm)) {
    const url = defs.get(match[2].toLowerCase());
    if (!url || !/github\.com\/tc39\//i.test(url) || seen.has(url)) continue;
    seen.add(url);
    const repo = url.match(/github\.com\/([^/]+\/[^/#]+)/i)?.[1] ?? "";
    rows.push({
      id: repo || match[1],
      title: match[1],
      status,
      date: "—",
      url,
      detail: "",
      tokens: repo
        ? [`gh:${repo.toLowerCase()}`, ...tokensFromUrl(url)]
        : tokensFromUrl(url),
    });
  }
  return rows;
}

function publisherTc39(rows, tokenMap) {
  return splitRows(
    "tc39",
    "TC39",
    "Stage 3 proposals from the tc39/proposals README, and finished proposals from finished-proposals.md. Finished proposals are language features of ECMAScript, not separate specifications.",
    rows,
    tokenMap,
  );
}

async function loadUnicode(failures) {
  const url = "https://www.unicode.org/versions/latest/";
  try {
    const { url: finalUrl } = await fetchText(url, "text/html");
    const version = finalUrl.match(/Unicode(\d+\.\d+(?:\.\d+)?)/i)?.[1] ?? "";
    if (!version) throw new Error("no Unicode version in the redirect");
    return { version, url: finalUrl };
  } catch (error) {
    fail(failures, "Unicode", url, error);
    return { version: "", url };
  }
}

function publisherUnicode(unicode, skills, tokenMap) {
  if (!unicode.version) {
    return emptyPublisher(
      "unicode",
      "Unicode",
      "Latest Unicode Standard version from unicode.org/versions/latest.",
    );
  }
  const row = {
    id: `Unicode ${unicode.version}`,
    title: `The Unicode Standard ${unicode.version}`,
    status: "current",
    date: "—",
    url: unicode.url,
    detail: "",
    tokens: [
      `url:${unicode.url.replace(/\/$/, "").toLowerCase()}`,
      ...tokensFromUrl(unicode.url),
    ],
  };
  const split = splitRows(
    "unicode",
    "Unicode",
    "Latest Unicode Standard version, from the unicode.org/versions/latest redirect.",
    [row],
    tokenMap,
  );
  const gaps = [];
  for (const skill of skills) {
    const citesStandard = skill.sources.some((source) =>
      /unicode\.org\/versions\//i.test(source.url ?? ""),
    );
    if (!citesStandard) continue;
    if (mentions(versionBlob(skill), unicode.version)) continue;
    gaps.push({
      skill: skill.name,
      detail: `latest Unicode Standard ${unicode.version} is missing from versions`,
    });
  }
  split.gaps = uniqueGaps(gaps);
  return split;
}

async function loadHl7(failures) {
  const url = "https://hl7.org/fhir/package-list.json";
  try {
    const { json } = await fetchJson(url);
    return (json.list ?? []).map((item) => ({
      version: item.version ?? "",
      status: item.status ?? "unknown",
      date: item.date ?? "—",
      sequence: item.sequence ?? item.desc ?? item.version ?? "",
      url: item.path
        ? new URL(item.path, "https://hl7.org/fhir/").toString()
        : url,
    }));
  } catch (error) {
    fail(failures, "HL7", url, error);
    return [];
  }
}

function publisherHl7(editions, skills, tokenMap) {
  const rows = editions.map((edition) => ({
    id: edition.sequence || edition.version,
    title: `FHIR ${edition.sequence || edition.version}`,
    status: edition.status,
    date: edition.date,
    url: edition.url,
    detail: edition.version,
    tokens: [
      `hl7:${(edition.sequence || edition.version).toLowerCase()}`,
      ...tokensFromUrl(edition.url),
    ],
  }));
  const split = splitRows(
    "hl7",
    "HL7",
    "FHIR editions from hl7.org/fhir/package-list.json. A skill that cites hl7.org/fhir is checked against the latest release edition.",
    rows,
    tokenMap,
  );
  const releases = editions.filter((edition) =>
    /release|trial-use|active/i.test(edition.status),
  );
  const latest = releases[0] ?? editions[0];
  if (latest) {
    for (const skill of skills) {
      const cites = skill.sources.some((source) =>
        /hl7\.org\/fhir/i.test(source.url ?? ""),
      );
      if (!cites) continue;
      const blob = versionBlob(skill);
      if (mentions(blob, latest.version) || mentions(blob, latest.sequence))
        continue;
      split.gaps.push({
        skill: skill.name,
        detail: `latest FHIR edition ${latest.sequence || latest.version} (${latest.status}, ${latest.date}) is missing from versions`,
      });
    }
    split.gaps = uniqueGaps(split.gaps);
  }
  return split;
}

async function loadCatalog(entries, failures) {
  const loaded = await mapPool(entries, async (entry) => {
    try {
      const rows = await parseCatalogEntry(entry);
      return { id: entry.id, rows };
    } catch (error) {
      fail(failures, entry.publisher, entry.url, error);
      return { id: entry.id, rows: [] };
    }
  });
  return new Map(loaded.map((item) => [item.id, item.rows]));
}

async function parseCatalogEntry(entry) {
  switch (entry.parser) {
    case "ecma-standards":
      return parseEcma(entry);
    case "github-release":
      return parseGithubRelease(entry);
    case "github-org":
      return parseGithubOrg(entry);
    case "cwe-version":
      return parseCweVersion(entry);
    case "apache-index":
      return parseApacheIndex(entry);
    case "oasis-docs":
      return parseOasis(entry);
    case "html-links":
      return parseHtmlLinks(entry);
    case "rss":
      return parseRss(entry);
    case "sitemap":
      return parseSitemap(entry);
    case "omg-specs":
      return parseOmg(entry);
    default:
      throw new Error(`unknown parser ${entry.parser}`);
  }
}

async function parseEcma(entry) {
  const { text, url } = await fetchText(entry.url, "text/html");
  const rows = [];
  const seen = new Set();
  for (const match of text.matchAll(
    /href="([^"]*\/standards\/ecma-(\d+)\/?)"[^>]*>([^<]*)</gi,
  )) {
    const number = Number(match[2]);
    if (seen.has(number)) continue;
    seen.add(number);
    const absolute = new URL(match[1], url).toString();
    rows.push(
      row(entry, {
        id: `ECMA-${number}`,
        title: strip(match[3]) || `ECMA-${number}`,
        status: "listed",
        date: "—",
        url: absolute,
        tokens: [`ecma:${number}`, ...tokensFromUrl(absolute)],
      }),
    );
  }
  return rows;
}

async function parseGithubOrg(entry) {
  const url =
    entry.url ??
    `https://api.github.com/orgs/${entry.org}/repos?per_page=100&sort=pushed&type=public`;
  const { json } = await fetchJson(url);
  if (!Array.isArray(json)) throw new Error("unexpected repository list");
  return json.map((repo) =>
    row(entry, {
      id: repo.full_name,
      title: strip(repo.description || repo.name),
      status: repo.archived ? "archived" : "repository",
      date: String(repo.pushed_at ?? "").slice(0, 10) || "—",
      url: repo.html_url,
      detail: repo.full_name,
      tokens: [`gh:${String(repo.full_name).toLowerCase()}`],
    }),
  );
}

async function parseCweVersion(entry) {
  const { text, url } = await fetchText(entry.url, "text/html");
  const version = text.match(/CWE List Version\s+([0-9.]+)/i)?.[1];
  if (!version) throw new Error("CWE List version heading not found");
  return [
    row(entry, {
      id: `CWE ${version}`,
      title: `CWE List Version ${version}`,
      status: "current",
      date: "—",
      url,
      tokens: [
        ...tokensFromUrl(url),
        ...tokensFromUrl("https://cwe.mitre.org/"),
      ],
    }),
  ];
}

async function parseGithubRelease(entry) {
  const releaseUrl = `https://github.com/${entry.repo}/releases/latest`;
  const { url } = await fetchText(releaseUrl, "text/html");
  const tag = decodeURIComponent(url.split("/tag/")[1] ?? "").replace(
    /\/$/,
    "",
  );
  if (!tag) throw new Error("no latest release tag");
  const repo = entry.repo.toLowerCase();
  return [
    row(entry, {
      id: entry.id,
      title: entry.title,
      status: tag,
      date: "—",
      url: `https://github.com/${entry.repo}/releases/tag/${encodeURIComponent(tag)}`,
      detail: entry.repo,
      tokens: [`gh:${repo}`, ...tokensFromUrl(entry.url)],
      releaseTag: tag,
    }),
  ];
}

async function parseApacheIndex(entry) {
  const { text, url } = await fetchText(entry.url, "text/html");
  const rows = [];
  const re = /<a href="([^"]+\/)">[^<]*<\/a>\s+(\d{2}-[A-Za-z]{3}-\d{4})/g;
  for (const match of text.matchAll(re)) {
    if (match[1] === "../") continue;
    const absolute = new URL(match[1], url).toString();
    const name = match[1].replace(/\/$/, "");
    rows.push(
      row(entry, {
        id: name,
        title: name,
        status: "directory",
        date: match[2],
        url: absolute,
        tokens: tokensFromUrl(absolute),
      }),
    );
  }
  return rows;
}

async function parseOasis(entry) {
  const { text } = await fetchText(entry.url, "text/html");
  const byId = new Map();
  for (const match of text.matchAll(
    /https?:\/\/docs\.oasis-open\.org\/([a-z0-9-]+)\/[^"'\s]*/gi,
  )) {
    const id = match[1].toLowerCase();
    const info = byId.get(id) ?? { os: false };
    if (/\/os\//i.test(match[0])) info.os = true;
    byId.set(id, info);
  }
  return [...byId.entries()]
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([id, info]) =>
      row(entry, {
        id,
        title: id,
        status: info.os ? "OASIS Standard" : "listed",
        date: "—",
        url: `https://docs.oasis-open.org/${id}/`,
        tokens: [`url:https://docs.oasis-open.org/${id}`.toLowerCase()],
      }),
    );
}

async function parseHtmlLinks(entry) {
  const { text, url } = await fetchText(entry.url, "text/html");
  return linksMatching(text, url, entry);
}

async function parseSitemap(entry) {
  const { text, url } = await fetchText(entry.url, "application/xml");
  const locs = [...text.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) =>
    match[1].replace(/&amp;/g, "&"),
  );
  const pattern = new RegExp(entry.linkPattern, "i");
  const rows = [];
  const seen = new Set();
  for (const loc of locs) {
    const absolute = new URL(loc, url).toString().replace(/\/$/, "");
    if (!pattern.test(absolute) || seen.has(absolute)) continue;
    if (entry.id === "1edtech-standards" && absolute.endsWith("/details"))
      continue;
    seen.add(absolute);
    rows.push(
      row(entry, {
        id: absolute.split("/").filter(Boolean).pop(),
        title: absolute.split("/").filter(Boolean).pop(),
        status: "listed",
        date: "—",
        url: absolute,
        tokens: tokensFromUrl(absolute),
      }),
    );
  }
  return rows;
}

async function parseRss(entry) {
  const { text } = await fetchText(
    entry.url,
    "application/rss+xml, application/xml, text/xml",
  );
  const rows = [];
  for (const item of text.matchAll(/<item>([\s\S]*?)<\/item>/g)) {
    const title = decodeXml(tagText(item[1], "title"));
    const link = decodeXml(tagText(item[1], "link"));
    const date = tagText(item[1], "pubDate") || "—";
    if (!title || !link) continue;
    rows.push(
      row(entry, {
        id: title,
        title,
        status: "listed",
        date,
        url: link,
        tokens: tokensFromUrl(link),
      }),
    );
  }
  return rows;
}

async function parseOmg(entry) {
  const { text, url } = await fetchText(entry.url, "text/html");
  const seen = new Set();
  const rows = [];
  for (const match of text.matchAll(
    /href="([^"]*\/spec\/([A-Za-z][A-Za-z0-9.+-]*)\/?)"/gi,
  )) {
    const id = match[2];
    if (/^(category|about)$/i.test(id) || seen.has(id.toLowerCase())) continue;
    seen.add(id.toLowerCase());
    const absolute = new URL(match[1], url).toString();
    rows.push(
      row(entry, {
        id,
        title: id,
        status: "listed",
        date: "—",
        url: absolute,
        tokens: tokensFromUrl(absolute),
      }),
    );
  }
  return rows;
}

function linksMatching(text, base, entry) {
  const pattern = new RegExp(entry.linkPattern, "i");
  const rows = [];
  const seen = new Set();
  for (const match of text.matchAll(/href="([^"]+)"[^>]*>([^<]*)</gi)) {
    let absolute;
    try {
      absolute = new URL(match[1], base).toString().replace(/\/$/, "");
    } catch {
      continue;
    }
    if (!pattern.test(absolute) || seen.has(absolute)) continue;
    if (
      absolute.endsWith("/standards/details") ||
      absolute.endsWith("/details")
    )
      continue;
    seen.add(absolute);
    const title = strip(match[2]) || absolute.split("/").filter(Boolean).pop();
    const celex = absolute.match(/CELEX(?::|%3A)([0-9A-Z]+)/i);
    rows.push(
      row(entry, {
        id: celex ? celex[1] : title,
        title,
        status: "listed",
        date: "—",
        url: absolute,
        tokens: [
          ...tokensFromUrl(absolute),
          ...(celex ? [`celex:${celex[1].toLowerCase()}`] : []),
        ],
      }),
    );
  }
  return rows;
}

function row(entry, fields) {
  return {
    detail: "",
    releaseTag: "",
    ...fields,
    catalogId: entry.id,
  };
}

function publisherCatalog(entries, rowsById, skills, tokenMap) {
  const byPublisher = new Map();
  for (const entry of entries) {
    const list = byPublisher.get(entry.publisher) ?? [];
    list.push(entry);
    byPublisher.set(entry.publisher, list);
  }
  return [...byPublisher.entries()].map(([publisher, group]) => {
    const rows = group.flatMap((entry) => rowsById.get(entry.id) ?? []);
    const notes = group.map((entry) => entry.note).filter(Boolean);
    const split = splitRows(
      publisher.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      publisher,
      notes.join(" "),
      rows,
      tokenMap,
    );
    for (const item of split.covered) {
      if (!item.releaseTag) continue;
      const repoToken = `gh:${String(item.detail).toLowerCase()}`;
      for (const skillName of item.skills) {
        const skill = skills.find((candidate) => candidate.name === skillName);
        const citesRepo = skill.sources.some(
          (source) =>
            source.url && tokensFromUrl(source.url).includes(repoToken),
        );
        if (!citesRepo) continue;
        const blob = versionBlob(skill);
        const bare = item.releaseTag.replace(/^v/i, "");
        if (mentions(blob, item.releaseTag) || mentions(blob, bare)) continue;
        split.gaps.push({
          skill: skillName,
          detail: `${item.title} latest release ${item.releaseTag} is missing from versions`,
        });
      }
    }
    if (publisher === "MITRE") {
      const versions = rows
        .map((item) => item.url.match(/\/versions\/v(\d+)/i)?.[1])
        .filter(Boolean)
        .map(Number);
      const latest = versions.length ? Math.max(...versions) : 0;
      if (latest) {
        for (const skill of skills) {
          const cites = skill.sources.some((source) =>
            /attack\.mitre\.org/i.test(source.url ?? ""),
          );
          if (!cites) continue;
          if (
            mentions(versionBlob(skill), `v${latest}`) ||
            mentions(versionBlob(skill), String(latest))
          ) {
            continue;
          }
          split.gaps.push({
            skill: skill.name,
            detail: `latest ATT&CK version v${latest} is missing from versions`,
          });
        }
      }
    }
    split.gaps = uniqueGaps(split.gaps);
    return split;
  });
}

function splitRows(id, name, note, rows, tokenMap) {
  const covered = [];
  const uncovered = [];
  for (const item of rows) {
    const names = skillsFor(tokenMap, item.tokens ?? []);
    const copy = { ...item, skills: names };
    if (names.length > 0) covered.push(copy);
    else uncovered.push(copy);
  }
  covered.sort(byId);
  uncovered.sort(byId);
  return { id, name, note, covered, uncovered, gaps: [] };
}

function emptyPublisher(id, name, note) {
  return { id, name, note, covered: [], uncovered: [], gaps: [] };
}

function byId(a, b) {
  return String(a.id).localeCompare(String(b.id), undefined, { numeric: true });
}

function uniqueGaps(gaps) {
  const seen = new Set();
  const unique = [];
  for (const gap of gaps) {
    const key = `${gap.skill}\n${gap.detail}`;
    if (seen.has(key)) continue;
    seen.add(key);
    unique.push(gap);
  }
  return unique.sort(
    (a, b) =>
      a.skill.localeCompare(b.skill) || a.detail.localeCompare(b.detail),
  );
}

function strip(value) {
  return String(value ?? "")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function decodeXml(value) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"');
}
