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
    'import { Button } from "@ai-system/design-system"; const view = <Button variant="primary" size="sm">저장</Button>;',
    'const view = <div className="documentation" />;',
    'import { Button } from "another-package"; const view = <Button className="legacy" />;',
  ],
  invalid: [
    {
      code: 'import { Button } from "@ai-system/design-system"; const view = <Button className="red" />;',
      errors: [{ messageId: "override" }],
    },
    {
      code: 'import { Input as NameInput } from "@ai-system/design-system"; const view = <NameInput style={{ padding: 3 }} />;',
      errors: [{ messageId: "override" }],
    },
    {
      code: 'import * as UI from "@ai-system/design-system"; const view = <UI.Button color="red" />;',
      errors: [{ messageId: "override" }],
    },
  ],
});
tester.run("no-primitive-imports", plugin.rules["no-primitive-imports"], {
  valid: [
    'import { Dialog } from "@ai-system/design-system";',
    'import { defineTheme } from "@ai-system/design-system/theme";',
  ],
  invalid: [
    {
      code: 'import * as Dialog from "@radix-ui/react-dialog";',
      errors: [{ messageId: "primitive" }],
    },
    {
      code: 'import { Button } from "@ai-system/design-system/dist/components/button.js";',
      errors: [{ messageId: "primitive" }],
    },
  ],
});
