import { execFileSync } from "node:child_process";
import { env } from "node:process";

if (!env["CI"] && !env["VERCEL"]) {
  execFileSync("pnpm", ["exec", "lefthook", "install"], { stdio: "inherit" });
}
