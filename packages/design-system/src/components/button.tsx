"use client";

import { cva } from "class-variance-authority";
import type { ReactElement, ReactNode } from "react";
import { domProps } from "../internal/props.js";
import type { DesignProps } from "../internal/props.js";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "soft"
  | "outline"
  | "ghost"
  | "destructive"
  | "quiet";
export type ButtonSize = "sm" | "md" | "lg";
type ButtonDesign = {
  variant?: ButtonVariant | undefined;
  size?: ButtonSize | undefined;
  fullWidth?: boolean | undefined;
};
export type ButtonProps = DesignProps<"button"> &
  ButtonDesign & { children: ReactNode; loading?: boolean };

const recipe = cva("ds-button", {
  variants: {
    variant: {
      primary: "ds-button-primary",
      secondary: "ds-button-secondary",
      soft: "ds-button-soft",
      outline: "ds-button-outline",
      ghost: "ds-button-ghost",
      destructive: "ds-button-destructive",
      quiet: "ds-button-quiet",
    },
    size: { sm: "ds-button-sm", md: "ds-button-md", lg: "ds-button-lg" },
    fullWidth: { true: "ds-full-width" },
  },
  defaultVariants: { variant: "primary", size: "md" },
});

export function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth,
  loading = false,
  disabled,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      {...domProps(props)}
      type={type}
      className={recipe({ variant, size, fullWidth })}
      data-slot="button"
      data-variant={variant}
      data-size={size}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
    >
      {loading ? <span className="ds-spinner" aria-hidden="true" /> : null}
      {children}
    </button>
  );
}

export type IconButtonProps = Omit<
  ButtonProps,
  "children" | "fullWidth" | "size"
> & { icon: ReactElement; label: string; size?: "md" | "lg" };

export function IconButton({
  icon,
  label,
  size = "md",
  variant = "quiet",
  loading = false,
  disabled,
  type = "button",
  ...props
}: IconButtonProps) {
  return (
    <button
      {...domProps(props)}
      type={type}
      aria-label={label}
      aria-busy={loading || undefined}
      disabled={disabled || loading}
      data-slot="icon-button"
      className={`${recipe({ variant, size })} ds-icon-button`}
    >
      {loading ? <span className="ds-spinner" aria-hidden="true" /> : icon}
    </button>
  );
}

export type ButtonLinkProps = DesignProps<"a"> &
  ButtonDesign & { href: string; children: ReactNode };

export function ButtonLink({
  variant = "primary",
  size = "md",
  fullWidth,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <a
      {...domProps(props)}
      data-slot="button-link"
      className={recipe({ variant, size, fullWidth })}
    >
      {children}
    </a>
  );
}
