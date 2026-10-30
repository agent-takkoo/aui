import { RuleTester } from "eslint";
import { describe, it } from "node:test";
import plugin from "../packages/design-system/eslint/index.mjs";

const tester = new RuleTester({
  languageOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    parserOptions: { ecmaFeatures: { jsx: true } },
  },
});
RuleTester.describe = describe;
RuleTester.it = it;
tester.run("no-style-overrides", plugin.rules["no-style-overrides"], {
  valid: [
    'import { ListItem } from "@heogeon0/aui"; const view = <ListItem title="설정" size="sm" />;',
    'import { Button } from "@heogeon0/aui"; const view = <Button variant="primary" size="sm">저장</Button>;',
    'const view = <div className="documentation" />;',
    'import { Button } from "another-package"; const view = <Button className="legacy" />;',
  ],
  invalid: [
    {
      code: 'import { ListItem } from "@heogeon0/aui"; const view = <ListItem title="설정" style={{ padding: 3 }} />;',
      errors: [{ messageId: "override" }],
    },
    {
      code: 'import { Button } from "@heogeon0/aui"; const view = <Button className="red" />;',
      errors: [{ messageId: "override" }],
    },
    {
      code: 'import { Input as NameInput } from "@heogeon0/aui"; const view = <NameInput style={{ padding: 3 }} />;',
      errors: [{ messageId: "override" }],
    },
    {
      code: 'import * as UI from "@heogeon0/aui"; const view = <UI.Button color="red" />;',
      errors: [{ messageId: "override" }],
    },
  ],
});
tester.run("no-primitive-imports", plugin.rules["no-primitive-imports"], {
  valid: [
    'import { Dialog } from "@heogeon0/aui";',
    'import { defineTheme } from "@heogeon0/aui/theme";',
  ],
  invalid: [
    {
      code: 'import * as Dialog from "@radix-ui/react-dialog";',
      errors: [{ messageId: "primitive" }],
    },
    {
      code: 'import { Button } from "@heogeon0/aui/dist/components/button.js";',
      errors: [{ messageId: "primitive" }],
    },
  ],
});
tester.run("no-raw-styling", plugin.rules["no-raw-styling"], {
  valid: [
    'const view = <div data-testid="root" />;',
    'import { Stack } from "@heogeon0/aui"; const view = <Stack gap="md"><p>본문</p></Stack>;',
    {
      code: 'const view = <main className="app-root" />;',
      options: [{ allowClassNames: ["app-root"] }],
    },
  ],
  invalid: [
    {
      code: 'const view = <div style={{ display: "grid" }} />;',
      errors: [{ messageId: "raw" }],
    },
    {
      code: 'const view = <div className="flex gap-4" />;',
      errors: [{ messageId: "raw" }],
    },
    {
      code: "const view = <section className={styles.panel} />;",
      errors: [{ messageId: "raw" }],
    },
  ],
});
tester.run("no-foreign-ui", plugin.rules["no-foreign-ui"], {
  valid: [
    'import { Button } from "@heogeon0/aui";',
    'import { Rocket } from "lucide-react";',
    'import { useState } from "react";',
  ],
  invalid: [
    {
      code: 'import { Button } from "@mui/material";',
      errors: [{ messageId: "foreign" }],
    },
    {
      code: 'import { Theme } from "@radix-ui/themes";',
      errors: [{ messageId: "foreign" }],
    },
    {
      code: 'import styled from "styled-components";',
      errors: [{ messageId: "foreign" }],
    },
  ],
});
tester.run("no-stylesheet-imports", plugin.rules["no-stylesheet-imports"], {
  valid: [
    'import "@heogeon0/aui/styles.css";',
    'import { Button } from "@heogeon0/aui";',
  ],
  invalid: [
    { code: 'import "./page.css";', errors: [{ messageId: "stylesheet" }] },
    {
      code: 'import styles from "./page.module.scss";',
      errors: [{ messageId: "stylesheet" }],
    },
  ],
});
