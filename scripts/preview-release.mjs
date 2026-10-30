import { execFileSync } from "node:child_process";
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

const root = fileURLToPath(new URL("../", import.meta.url));
const manifest = JSON.parse(
  await readFile(join(root, "packages/design-system/package.json"), "utf8"),
);
const filename = `${manifest.name.replace(/^@/, "").replace("/", "-")}-${manifest.version}.tgz`;
// npm에 등록하지 않고, 검증한 tarball의 배포 정보만 확인한다.
const output = execFileSync(
  "npm",
  [
    "publish",
    join(root, "artifacts", filename),
    "--dry-run",
    "--ignore-scripts",
    "--access",
    "public",
    "--registry",
    "https://registry.npmjs.org",
    "--json",
  ],
  { cwd: root, encoding: "utf8", stdio: ["ignore", "pipe", "inherit"] },
);
const report = JSON.parse(output);
await writeFile(
  join(root, "artifacts", "npm-publish-preview.json"),
  JSON.stringify(report, null, 2) + "\n",
);
console.log(
  `${manifest.name}@${manifest.version}: npm publish --dry-run을 통과했어요. 실제로 배포하지 않았어요.`,
);
console.log(`배포 파일: artifacts/${filename}`);
