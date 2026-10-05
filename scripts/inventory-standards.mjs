#!/usr/bin/env node
// Needs the network, so it is not part of `pnpm verify`. Rewrites docs/standards-inventory.md.
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { loadStandardsIndex } from "./standards/indexes.mjs";

const OUT = join(
  dirname(fileURLToPath(import.meta.url)),
  "..",
  "docs",
  "standards-inventory.md",
);

const index = await loadStandardsIndex();
writeFileSync(OUT, render(index));

const covered = index.publishers.reduce(
  (sum, publisher) => sum + publisher.covered.length,
  0,
);
const uncovered = index.publishers.reduce(
  (sum, publisher) => sum + publisher.uncovered.length,
  0,
);
const gaps = index.publishers.reduce(
  (sum, publisher) => sum + publisher.gaps.length,
  0,
);
console.log(
  `Wrote ${OUT} on ${index.generatedOn}: ${covered} covered, ${uncovered} uncovered, ${gaps} version gap(s), ${index.failures.length} fetch failure(s).`,
);
for (const failure of index.failures) {
  console.error(
    `fetch  ${failure.publisher}: ${failure.url} (${failure.message})`,
  );
}

function render(loaded) {
  const lines = [];
  lines.push("# Standards inventory");
  lines.push("");
  lines.push(
    `Generated ${loaded.generatedOn} by \`pnpm inventory\`. Rows come from the publisher indexes fetched by \`scripts/inventory-standards.mjs\` and from \`scripts/standards/catalog.json\`. A row is covered when a \`skills/*/metadata.json\` source URL maps to that specification. Uncovered rows are candidates, not skills. Version gaps are levels or revisions of a covered specification that do not appear in that skill's \`versions\`.`,
  );
  lines.push("");
  lines.push("## Fetch failures");
  lines.push("");
  if (loaded.failures.length === 0) lines.push("None.");
  else {
    lines.push("| Publisher | URL | Error |");
    lines.push("| --- | --- | --- |");
    for (const failure of loaded.failures) {
      lines.push(
        `| ${cell(failure.publisher)} | ${cell(failure.url)} | ${cell(failure.message)} |`,
      );
    }
  }
  lines.push("");
  lines.push("## Summary");
  lines.push("");
  lines.push("| Publisher | Covered | Uncovered | Version gaps |");
  lines.push("| --- | --- | --- | --- |");
  for (const publisher of loaded.publishers) {
    lines.push(
      `| ${cell(publisher.name)} | ${publisher.covered.length} | ${publisher.uncovered.length} | ${publisher.gaps.length} |`,
    );
  }
  lines.push("");
  for (const publisher of loaded.publishers) {
    lines.push(`## ${publisher.name}`);
    lines.push("");
    if (publisher.note) {
      lines.push(publisher.note);
      lines.push("");
    }
    if (publisher.covered.length === 0 && publisher.uncovered.length === 0) {
      lines.push("The fetched index had no matching specification links.");
      lines.push("");
    }
    lines.push("### Covered");
    lines.push("");
    lines.push(candidateTable(publisher.covered, true));
    lines.push("### Missing version lines");
    lines.push("");
    if (publisher.gaps.length === 0) lines.push("None.");
    else {
      lines.push("| Skill | Gap |");
      lines.push("| --- | --- |");
      for (const gap of publisher.gaps) {
        lines.push(`| ${cell(gap.skill)} | ${cell(gap.detail)} |`);
      }
    }
    lines.push("");
    lines.push("### Uncovered candidates");
    lines.push("");
    lines.push(candidateTable(publisher.uncovered, false));
  }
  return `${lines.join("\n").replace(/\n{3,}/g, "\n\n")}\n`;
}

function candidateTable(rows, withSkills) {
  if (rows.length === 0) return "None.\n";
  const head = withSkills
    ? "| Id | Title | Status | Date | Detail | Skills | URL |"
    : "| Id | Title | Status | Date | Detail | URL |";
  const rule = withSkills
    ? "| --- | --- | --- | --- | --- | --- | --- |"
    : "| --- | --- | --- | --- | --- | --- |";
  const body = rows.map((row) => {
    const shared = `| ${cell(row.id)} | ${cell(row.title)} | ${cell(row.status)} | ${cell(row.date)} | ${cell(row.detail)} |`;
    if (!withSkills) return `${shared} ${cell(row.url)} |`;
    return `${shared} ${cell((row.skills ?? []).join(", "))} | ${cell(row.url)} |`;
  });
  return [head, rule, ...body, ""].join("\n");
}

function cell(value) {
  const text = String(value ?? "")
    .replace(/\|/g, "\\|")
    .replace(/\s+/g, " ")
    .trim();
  return text || "—";
}
