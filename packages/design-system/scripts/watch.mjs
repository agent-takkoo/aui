import { statSync, watch } from "node:fs";
import { spawn } from "node:child_process";
import { join } from "node:path";

const compiler = spawn(
  "tsc",
  ["-p", "tsconfig.build.json", "--watch", "--preserveWatchOutput"],
  { stdio: "inherit", shell: false },
);
let copying = false;
let queued = false;
let stopped = false;
function copy() {
  if (stopped) return;
  if (copying) {
    queued = true;
    return;
  }
  copying = true;
  const child = spawn(process.execPath, ["scripts/copy-assets.mjs"], {
    stdio: "inherit",
  });
  child.on("exit", () => {
    copying = false;
    if (queued) {
      queued = false;
      copy();
    }
  });
}
// macOS의 접근 시간 이벤트로 문서 생성·복사가 자신을 다시 실행하지 않게 한다.
const revisions = new Map();
function changed(path) {
  let revision;
  try {
    const stat = statSync(path);
    revision = `${stat.mtimeMs}:${stat.size}`;
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
    revision = "removed";
  }
  if (revisions.get(path) === revision) return false;
  revisions.set(path, revision);
  return true;
}
const watcher = watch("src/styles.css", () => {
  if (changed("src/styles.css")) copy();
});
const lintWatcher = watch("eslint", (_event, file) => {
  if (changed(file ? join("eslint", String(file)) : "eslint")) copy();
});
let docsTimer;
let docsProcess;
let docsQueued = false;
function generateDocs() {
  if (stopped) return;
  if (docsProcess) {
    docsQueued = true;
    return;
  }
  docsProcess = spawn(process.execPath, ["scripts/generate-llms.mjs"], {
    stdio: "inherit",
  });
  docsProcess.on("exit", () => {
    docsProcess = undefined;
    if (docsQueued) {
      docsQueued = false;
      scheduleDocs();
    }
  });
}
function scheduleDocs() {
  clearTimeout(docsTimer);
  docsTimer = setTimeout(generateDocs, 250);
}
const sourceWatcher = watch("src", { recursive: true }, (_event, file) => {
  if (
    (file?.endsWith(".ts") || file?.endsWith(".tsx")) &&
    changed(join("src", String(file)))
  )
    scheduleDocs();
});
const docsWatcher = watch("docs", { recursive: true }, (_event, file) => {
  if (changed(file ? join("docs", String(file)) : "docs")) scheduleDocs();
});
const manifestWatcher = watch("package.json", () => {
  if (changed("package.json")) scheduleDocs();
});
function stop() {
  stopped = true;
  watcher.close();
  lintWatcher.close();
  sourceWatcher.close();
  docsWatcher.close();
  manifestWatcher.close();
  clearTimeout(docsTimer);
  docsProcess?.kill();
  compiler.kill();
}
process.on("SIGINT", stop);
process.on("SIGTERM", stop);
