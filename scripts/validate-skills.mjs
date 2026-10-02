#!/usr/bin/env node
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SKILLS_DIR = join(ROOT, "skills");
const ROOT_README = join(ROOT, "README.md");
const SKILL_NAME = /^scaledock-[a-z0-9]+(-[a-z0-9]+)*$/;
const TEMPLATE_NAME = "scaledock-my-skill";
const MAX_DESCRIPTION_LENGTH = 1024;
const MARKDOWN_LINK = /\[[^\]]*\]\(([^)\s]+)\)/g;

function stripQuotes(value) {
  const match = value.match(/^(["'])(.*)\1$/);
  return match ? match[2] : value;
}

// Handles flat `key: value` pairs, `>` / `|` block scalars, and one level of
// nested `key:` maps (for `metadata`); deeper YAML is not supported.
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
    } else if (value === "") {
      const nested = {};
      while (i + 1 < lines.length && /^\s+\S/.test(lines[i + 1])) {
        const child = lines[++i].trim().match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
        if (child) nested[child[1]] = stripQuotes(child[2].trim());
      }
      fields[key] = nested;
    } else {
      fields[key] = stripQuotes(value);
    }
  }
  return fields;
}

function brokenRelativeLinks(file) {
  if (!existsSync(file)) return [];
  const broken = [];
  for (const [, target] of readFileSync(file, "utf8").matchAll(MARKDOWN_LINK)) {
    if (/^([a-z]+:|#)/i.test(target)) continue;
    const path = target.split("#")[0];
    if (!existsSync(join(dirname(file), path))) broken.push(target);
  }
  return broken;
}

function validateSkill(folder, rootReadme) {
  const errors = [];
  const skillDir = join(SKILLS_DIR, folder);
  const skillFile = join(skillDir, "SKILL.md");

  if (!existsSync(skillFile)) {
    return ["missing SKILL.md"];
  }

  const fields = parseFrontmatter(readFileSync(skillFile, "utf8"));
  if (!fields) {
    return ["SKILL.md has no frontmatter block (expected --- ... --- at the top)"];
  }

  const { name, description, metadata } = fields;
  if (typeof name !== "string" || !name) {
    errors.push("frontmatter is missing `name`");
  } else {
    if (!SKILL_NAME.test(name)) {
      errors.push(`name "${name}" must be kebab-case and start with "scaledock-"`);
    }
    if (name !== folder) errors.push(`name "${name}" does not match folder "${folder}"`);
    if (name === TEMPLATE_NAME) {
      errors.push(`name "${name}" is the template placeholder; rename the skill`);
    }
    if (!rootReadme.includes(`\`${name}\``)) {
      errors.push(`README.md skills table does not list \`${name}\``);
    }
  }

  if (typeof description !== "string" || !description) {
    errors.push("frontmatter is missing `description`");
  } else if (description.length > MAX_DESCRIPTION_LENGTH) {
    errors.push(
      `description is ${description.length} characters (max ${MAX_DESCRIPTION_LENGTH})`,
    );
  }

  const metadataFile = join(skillDir, "metadata.json");
  if (existsSync(metadataFile)) {
    let json;
    try {
      json = JSON.parse(readFileSync(metadataFile, "utf8"));
    } catch (error) {
      errors.push(`metadata.json is not valid JSON: ${error.message}`);
    }
    const frontmatterVersion =
      typeof metadata === "object" ? metadata.version : undefined;
    if (json && json.version !== frontmatterVersion) {
      errors.push(
        `metadata.json version "${json.version}" does not match SKILL.md metadata.version "${frontmatterVersion}"`,
      );
    }
  }

  for (const file of ["SKILL.md", "README.md"]) {
    for (const target of brokenRelativeLinks(join(skillDir, file))) {
      errors.push(`${file} links to missing file "${target}"`);
    }
  }

  return errors;
}

const rootReadme = existsSync(ROOT_README) ? readFileSync(ROOT_README, "utf8") : "";

const folders = existsSync(SKILLS_DIR)
  ? readdirSync(SKILLS_DIR, { withFileTypes: true })
      .filter((entry) => entry.isDirectory() && !entry.name.startsWith("."))
      .map((entry) => entry.name)
      .sort()
  : [];

let failed = 0;
for (const folder of folders) {
  const errors = validateSkill(folder, rootReadme);
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
