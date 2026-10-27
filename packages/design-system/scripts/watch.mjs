import { watch } from "node:fs";
import { spawn } from "node:child_process";

const compiler = spawn(
  "tsc",
  ["-p", "tsconfig.build.json", "--watch", "--preserveWatchOutput"],
  { stdio: "inherit", shell: false },
);
const copy = () =>
  spawn(process.execPath, ["scripts/copy-assets.mjs"], { stdio: "inherit" });
const watcher = watch("src/styles.css", copy);
const lintWatcher = watch("eslint", copy);
function stop() {
  watcher.close();
  lintWatcher.close();
  compiler.kill();
}
process.on("SIGINT", stop);
process.on("SIGTERM", stop);
