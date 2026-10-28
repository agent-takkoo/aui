"use client";
import * as Primitive from "@radix-ui/react-progress";
export type ProgressProps = {
  label: string;
  value?: number | null | undefined;
  max?: number | undefined;
};
export function Progress({ label, value = null, max = 100 }: ProgressProps) {
  const limit = Number.isFinite(max) && max > 0 ? max : 100;
  const current =
    value === null || !Number.isFinite(value)
      ? null
      : Math.min(limit, Math.max(0, value));
  return (
    <Primitive.Root
      className="ds-progress"
      data-slot="progress"
      value={current}
      max={limit}
      aria-label={label}
    >
      <Primitive.Indicator
        className="ds-progress-indicator"
        style={{
          transform:
            current === null
              ? undefined
              : `translateX(-${100 - (current / limit) * 100}%)`,
        }}
      />
    </Primitive.Root>
  );
}
