"use client";

import { cva } from "class-variance-authority";
import type { ReactElement, ReactNode } from "react";
import { domProps } from "../internal/props.js";
import type { DesignProps } from "../internal/props.js";
import { useLinkComponent } from "../theme/provider.js";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "destructive";
export type ButtonSize = "sm" | "md" | "lg";
type ButtonDesign = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
};
export type ButtonProps = DesignProps<"button"> &
  ButtonDesign & {
    children: ReactNode;
    loading?: boolean;
    leadingIcon?: ReactElement;
    trailingIcon?: ReactElement;
  };

const recipe = cva("ds-button", {
  variants: {
    variant: {
      primary: "ds-button-primary",
      secondary: "ds-button-secondary",
      ghost: "ds-button-ghost",
      destructive: "ds-button-destructive",
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
  leadingIcon,
  trailingIcon,
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
      {loading ? (
        <span className="ds-spinner" aria-hidden="true" />
      ) : (
        leadingIcon
      )}
      {children}
      {trailingIcon}
    </button>
  );
}

export type IconButtonProps = Omit<
  ButtonProps,
  "children" | "fullWidth" | "size" | "leadingIcon" | "trailingIcon"
> & { icon: ReactElement; label: string; size?: "md" | "lg" };

export function IconButton({
  icon,
  label,
  size = "md",
  variant = "ghost",
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
      data-variant={variant}
      className={`${recipe({ variant, size })} ds-icon-button`}
    >
      {loading ? <span className="ds-spinner" aria-hidden="true" /> : icon}
    </button>
  );
}

export type ButtonLinkProps = DesignProps<"a"> &
  ButtonDesign & {
    href: string;
    children: ReactNode;
    leadingIcon?: ReactElement;
    trailingIcon?: ReactElement;
  };

export function ButtonLink({
  variant = "primary",
  size = "md",
  fullWidth,
  leadingIcon,
  trailingIcon,
  children,
  ...props
}: ButtonLinkProps) {
  const Link = useLinkComponent() ?? "a";
  return (
    <Link
      {...domProps(props)}
      data-slot="button-link"
      className={recipe({ variant, size, fullWidth })}
    >
      {leadingIcon}
      {children}
      {trailingIcon}
    </Link>
  );
}
