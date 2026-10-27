import type { ComponentPropsWithRef, ElementType } from "react";

type LockedProps = "className" | "style" | "color" | "dangerouslySetInnerHTML";

export type DesignProps<T extends ElementType> = Omit<
  ComponentPropsWithRef<T>,
  LockedProps
> & {
  className?: never;
  style?: never;
  color?: never;
  dangerouslySetInnerHTML?: never;
};

export function domProps<T extends object>(props: T): Omit<T, LockedProps> {
  const clean = { ...props } as Record<string, unknown>;
  for (const key of ["className", "style", "color", "dangerouslySetInnerHTML"])
    delete clean[key];
  return clean as Omit<T, LockedProps>;
}
