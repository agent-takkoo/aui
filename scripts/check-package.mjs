import { execFileSync } from "node:child_process";
import {
  mkdtemp,
  mkdir,
  readFile,
  readdir,
  rm,
  writeFile,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import assert from "node:assert/strict";

const root = fileURLToPath(new URL("../", import.meta.url));
const artifacts = join(root, "artifacts");
await mkdir(artifacts, { recursive: true });
execFileSync(
  "pnpm",
  [
    "--filter",
    "@ai-system/design-system",
    "pack",
    "--pack-destination",
    artifacts,
  ],
  { cwd: root, stdio: "pipe" },
);
const manifest = JSON.parse(
  await readFile(join(root, "packages/design-system/package.json"), "utf8"),
);
const tarball = join(
  artifacts,
  `ai-system-design-system-${manifest.version}.tgz`,
);
const temp = await mkdtemp(join(tmpdir(), "ai-system-package-"));
try {
  await writeFile(
    join(temp, "package.json"),
    JSON.stringify({
      private: true,
      type: "module",
      dependencies: {
        "@ai-system/design-system": `file:${tarball}`,
        react: "19.3.1",
        "react-dom": "19.3.1",
      },
    }),
  );
  execFileSync(
    "npm",
    [
      "install",
      "--ignore-scripts",
      "--no-audit",
      "--no-fund",
      "--package-lock=false",
    ],
    { cwd: temp, stdio: "pipe", timeout: 120_000 },
  );
  await writeFile(
    join(temp, "smoke.mjs"),
    `
    import assert from 'node:assert/strict';
    import { createElement } from 'react';
    import { renderToString } from 'react-dom/server';
    import { Button, Field, Input, ThemeProvider } from '@ai-system/design-system';
    import { defaultTheme } from '@ai-system/design-system/theme';
    import plugin from '@ai-system/design-system/eslint';
    import { existsSync } from 'node:fs';
    import { fileURLToPath } from 'node:url';
    assert.ok(existsSync(fileURLToPath(import.meta.resolve('@ai-system/design-system/styles.css'))));
    assert.ok(existsSync(new URL('node_modules/@ai-system/design-system/dist/index.d.ts', import.meta.url)));
    assert.ok(plugin.configs.recommended);
    const html = renderToString(createElement(ThemeProvider, { theme: defaultTheme },
      createElement(Field, { label: '이름' }, createElement(Input, { name: 'name' })),
      createElement(Button, { type: 'submit' }, '저장')));
    assert.match(html, /data-ds-theme="default"/);
    assert.match(html, /저장/);
    assert.match(html, /aria-describedby|for=/);
    console.log('배포 파일의 ESM·타입·CSS·theme·ESLint·서버 렌더링을 확인했어요.');
  `,
  );
  const result = execFileSync(process.execPath, ["smoke.mjs"], {
    cwd: temp,
    encoding: "utf8",
  });
  assert.ok(
    (await readdir(artifacts)).includes(
      `ai-system-design-system-${manifest.version}.tgz`,
    ),
  );
  console.log(result.trim());
  console.log(`패키지: ${tarball}`);
} finally {
  await rm(temp, { recursive: true, force: true });
}
