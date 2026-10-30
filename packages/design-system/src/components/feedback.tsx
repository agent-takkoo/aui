import type { ReactNode } from "react";
import { Button } from "./button.js";

export type EmptyStateProps = {
  title: string;
  description?: string;
  action?: ReactNode;
};
export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="ds-empty-state" data-slot="empty-state">
      <p className="ds-state-title">{title}</p>
      {description ? (
        <p className="ds-state-description">{description}</p>
      ) : null}
      {action ? <div className="ds-state-action">{action}</div> : null}
    </div>
  );
}

export type ErrorStateProps = {
  title: string;
  description?: string;
  onRetry?: () => void;
  retryLabel?: string;
};
export function ErrorState({
  title,
  description,
  onRetry,
  retryLabel = "다시 시도",
}: ErrorStateProps) {
  return (
    <div className="ds-error-state" data-slot="error-state" role="alert">
      <p className="ds-state-title">{title}</p>
      {description ? (
        <p className="ds-state-description">{description}</p>
      ) : null}
      {onRetry ? (
        <div className="ds-state-action">
          <Button variant="secondary" size="sm" onClick={() => onRetry()}>
            {retryLabel}
          </Button>
        </div>
      ) : null}
    </div>
  );
}

export function LoadingState({
  label = "불러오는 중이에요…",
}: {
  label?: string;
}) {
  return (
    <div className="ds-loading-state" data-slot="loading-state" role="status">
      {label}
    </div>
  );
}

export function Skeleton({
  variant = "line",
}: {
  variant?: "line" | "title" | "avatar" | "card";
}) {
  return (
    <div
      className={`ds-skeleton ds-skeleton-${variant}`}
      data-slot="skeleton"
      aria-hidden="true"
    />
  );
}
