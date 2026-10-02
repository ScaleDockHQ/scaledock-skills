#!/usr/bin/env node
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SKILLS_DIR = join(ROOT, "skills");
const KEBAB_CASE = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const MAX_DESCRIPTION_LENGTH = 1024;

function stripQuotes(value) {
  const match = value.match(/^(["'])(.*)\1$/);
  return match ? match[2] : value;
}

// Handles flat `key: value` pairs plus `>` / `|` block scalars; nested YAML is not supported.
function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---(\r?\n|$)/);
  if (!match) return null;

  const fields = {};
  const lines = match[1].split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    const pair = lines[i].match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!pair) continue;
    const [, key, rawValue] = pair;
    const value = rawValue.trim();

    if (/^[>|][-+]?$/.test(value)) {
      const block = [];
      while (i + 1 < lines.length && /^(\s|$)/.test(lines[i + 1])) {
        block.push(lines[++i].trim());
      }
      fields[key] = block
        .filter(Boolean)
        .join(value.startsWith(">") ? " " : "\n");
    } else {
      fields[key] = stripQuotes(value);
    }
  }
  return fields;
}

function validateSkill(folder) {
  const errors = [];
  const skillFile = join(SKILLS_DIR, folder, "SKILL.md");

  if (!existsSync(skillFile)) {
    return ["missing SKILL.md"];
  }

  const fields = parseFrontmatter(readFileSync(skillFile, "utf8"));
  if (!fields) {
    return ["SKILL.md has no frontmatter block (expected --- ... --- at the top)"];
  }

  const { name, description } = fields;
  if (!name) {
    errors.push("frontmatter is missing `name`");
  } else {
    if (!KEBAB_CASE.test(name)) errors.push(`name "${name}" is not kebab-case`);
    if (name !== folder) errors.push(`name "${name}" does not match folder "${folder}"`);
  }

  if (!description) {
    errors.push("frontmatter is missing `description`");
  } else if (description.length > MAX_DESCRIPTION_LENGTH) {
    errors.push(
      `description is ${description.length} characters (max ${MAX_DESCRIPTION_LENGTH})`,
    );
  }

  return errors;
}

const folders = existsSync(SKILLS_DIR)
  ? readdirSync(SKILLS_DIR, { withFileTypes: true })
      .filter((entry) => entry.isDirectory() && !entry.name.startsWith("."))
      .map((entry) => entry.name)
      .sort()
  : [];

let failed = 0;
for (const folder of folders) {
  const errors = validateSkill(folder);
  const label = relative(ROOT, join(SKILLS_DIR, folder));
  if (errors.length === 0) {
    console.log(`ok    ${label}`);
  } else {
    failed++;
    console.error(`FAIL  ${label}`);
    for (const error of errors) console.error(`      - ${error}`);
  }
}

if (folders.length === 0) {
  console.log("No skills found in skills/.");
}

if (failed > 0) {
  console.error(`\n${failed} of ${folders.length} skill(s) failed validation.`);
  process.exit(1);
}

console.log(`\nValidated ${folders.length} skill(s).`);
