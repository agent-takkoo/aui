import { rm } from "node:fs/promises";
import { execFileSync } from "node:child_process";

await rm(new URL("../dist/", import.meta.url), {
  recursive: true,
  force: true,
});
execFileSync("tsc", ["-p", "tsconfig.build.json"], { stdio: "inherit" });
await import("./copy-assets.mjs");
await import("./generate-llms.mjs");
