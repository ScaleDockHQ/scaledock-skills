import type { UserConfig } from "@commitlint/types";

const BOT_HEADER = /^(chore: version packages|chore\(deps(?:-dev)?\):|Merge )/u;

const config = {
  extends: ["@commitlint/config-conventional"],
  ignores: [(message) => BOT_HEADER.test(message.split("\n", 1)[0] ?? "")],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "fix",
        "docs",
        "chore",
        "ci",
        "refactor",
        "test",
        "perf",
        "style",
        "build",
        "revert",
      ],
    ],
    "subject-case": [2, "never", ["pascal-case", "start-case", "upper-case"]],
    "header-max-length": [2, "always", 72],
  },
} satisfies UserConfig;

export default config;
