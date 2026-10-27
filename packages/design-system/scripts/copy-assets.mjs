import { cp, mkdir } from "node:fs/promises";

await mkdir(new URL("../dist/", import.meta.url), { recursive: true });
await cp(
  new URL("../src/styles.css", import.meta.url),
  new URL("../dist/styles.css", import.meta.url),
);
await cp(
  new URL("../eslint/", import.meta.url),
  new URL("../dist/eslint/", import.meta.url),
  { recursive: true },
);
