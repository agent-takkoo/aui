import type { ReactNode } from "react";
import { Heading, Stack, Text } from "@heogeon0/aui";

export function ExampleGrid({ children }: { children: ReactNode }) {
  return <div className="docs-examples">{children}</div>;
}

export function Example({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section className="docs-example" aria-label={title}>
      <Stack gap="md">
        <Stack gap="xs">
          <Heading level={3} size="heading">
            {title}
          </Heading>
          {description ? (
            <Text size="sub" tone="muted">
              {description}
            </Text>
          ) : null}
        </Stack>
        {children}
      </Stack>
    </section>
  );
}
