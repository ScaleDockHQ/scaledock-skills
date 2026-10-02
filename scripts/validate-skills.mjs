#!/usr/bin/env node
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SKILLS_DIR = join(ROOT, "skills");
const ROOT_README = join(ROOT, "README.md");
const KEBAB_NAME = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const PREFIX = "scaledock-";
const TEMPLATE_NAMES = new Set(["scaledock-my-skill", "my-spec"]);
const MAX_DESCRIPTION_LENGTH = 1024;
const MARKDOWN_LINK = /\[[^\]]*\]\(([^)\s]+)\)/g;
const SOURCE_FIELDS = ["title", "url", "status", "revision", "checked"];
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
// Spec skills stay neutral; only the author field and the install source may name us.
const ALLOWED_MENTIONS = [
  /^\s*author:\s*ScaleDockHQ\s*$/gm,
  /ScaleDockHQ\/scaledock-skills/g,
];
const FORBIDDEN_MENTION = /permdock|scaledock/i;

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

function markdownFiles(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return markdownFiles(path);
    return entry.name.endsWith(".md") ? [path] : [];
  });
}

function sourcesSection(content) {
  const match = content.match(/^## Sources\s*$([\s\S]*?)(?=^## |(?![\s\S]))/m);
  return match ? match[1] : null;
}

function validateSources(skillDir, skillContent, json) {
  const errors = [];
  if (json.kind !== "standard") {
    errors.push('metadata.json `kind` must be "standard" for a spec skill');
  }
  if (!Array.isArray(json.sources) || json.sources.length === 0) {
    errors.push("metadata.json needs a non-empty `sources` array");
    return errors;
  }
  const section = sourcesSection(skillContent);
  if (section === null) errors.push("SKILL.md has no `## Sources` section");
  json.sources.forEach((source, index) => {
    const missing = SOURCE_FIELDS.filter(
      (field) => typeof source?.[field] !== "string" || !source[field],
    );
    if (missing.length > 0) {
      errors.push(`sources[${index}] is missing ${missing.join(", ")}`);
      return;
    }
    if (!/^https?:\/\//.test(source.url)) {
      errors.push(`sources[${index}] url "${source.url}" is not http(s)`);
    }
    if (!ISO_DATE.test(source.checked)) {
      errors.push(
        `sources[${index}] checked "${source.checked}" is not YYYY-MM-DD`,
      );
    }
    if (section !== null && !section.includes(source.url)) {
      errors.push(`SKILL.md ## Sources does not list ${source.url}`);
    }
  });

  for (const file of [
    join(skillDir, "SKILL.md"),
    ...markdownFiles(join(skillDir, "references")),
  ]) {
    let text = readFileSync(file, "utf8");
    for (const allowed of ALLOWED_MENTIONS) text = text.replace(allowed, "");
    if (FORBIDDEN_MENTION.test(text)) {
      errors.push(
        `${relative(skillDir, file)} mentions ScaleDock or PermDock; spec skills stay neutral`,
      );
    }
  }
  return errors;
}

function validateSkill(folder, rootReadme) {
  const errors = [];
  const skillDir = join(SKILLS_DIR, folder);
  const skillFile = join(skillDir, "SKILL.md");

  if (!existsSync(skillFile)) {
    return ["missing SKILL.md"];
  }

  const skillContent = readFileSync(skillFile, "utf8");
  const fields = parseFrontmatter(skillContent);
  if (!fields) {
    return [
      "SKILL.md has no frontmatter block (expected --- ... --- at the top)",
    ];
  }

  const { name, description, metadata } = fields;
  const isStandard =
    typeof metadata === "object" && metadata.kind === "standard";
  if (typeof name !== "string" || !name) {
    errors.push("frontmatter is missing `name`");
  } else {
    if (!KEBAB_NAME.test(name)) {
      errors.push(`name "${name}" must be kebab-case`);
    } else if (isStandard && name.startsWith(PREFIX)) {
      errors.push(
        `name "${name}" is a spec skill; name it after the spec without "${PREFIX}"`,
      );
    } else if (!isStandard && !name.startsWith(PREFIX)) {
      errors.push(
        `name "${name}" must start with "${PREFIX}", or set metadata.kind: standard for a spec skill`,
      );
    }
    if (name !== folder)
      errors.push(`name "${name}" does not match folder "${folder}"`);
    if (TEMPLATE_NAMES.has(name)) {
      errors.push(
        `name "${name}" is the template placeholder; rename the skill`,
      );
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
    if (json && isStandard) {
      errors.push(...validateSources(skillDir, skillContent, json));
    } else if (json && json.kind === "standard") {
      errors.push(
        'metadata.json has kind "standard" but SKILL.md metadata.kind does not',
      );
    }
  } else if (isStandard) {
    errors.push("spec skills need a metadata.json with `sources`");
  }

  for (const file of ["SKILL.md", "README.md"]) {
    for (const target of brokenRelativeLinks(join(skillDir, file))) {
      errors.push(`${file} links to missing file "${target}"`);
    }
  }

  return errors;
}

const rootReadme = existsSync(ROOT_README)
  ? readFileSync(ROOT_README, "utf8")
  : "";

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
