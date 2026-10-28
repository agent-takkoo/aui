"use client";

import type { ReactNode } from "react";
import { Button } from "./button.js";
export type BreadcrumbItem = { label: string; href?: string };
export type BreadcrumbProps = {
  items: readonly BreadcrumbItem[];
  label?: string;
};
export function Breadcrumb({ items, label = "현재 위치" }: BreadcrumbProps) {
  return (
    <nav aria-label={label} data-slot="breadcrumb">
      <ol className="ds-breadcrumb">
        {items.map((item, index) => (
          <li key={`${index}-${item.label}`}>
            {index > 0 ? (
              <span aria-hidden="true" className="ds-breadcrumb-separator">
                /
              </span>
            ) : null}
            {index === items.length - 1 ? (
              <span aria-current="page">{item.label}</span>
            ) : item.href ? (
              <a href={item.href}>{item.label}</a>
            ) : (
              <span>{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
export type PaginationProps = {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  label?: string;
  disabled?: boolean;
};
export function Pagination({
  page,
  pageCount,
  onPageChange,
  label = "페이지 선택",
  disabled = false,
}: PaginationProps) {
  const total = Number.isFinite(pageCount)
    ? Math.max(1, Math.floor(pageCount))
    : 1;
  const current = Number.isFinite(page)
    ? Math.min(total, Math.max(1, Math.floor(page)))
    : 1;
  const pages = [...new Set([1, current - 1, current, current + 1, total])]
    .filter((value) => value >= 1 && value <= total)
    .sort((a, b) => a - b);
  const entries: ReactNode[] = [];
  pages.forEach((value, index) => {
    if (index && value - pages[index - 1] > 1)
      entries.push(
        <li key={`gap-${value}`} className="ds-pagination-gap">
          <span aria-label="생략된 페이지">…</span>
        </li>,
      );
    entries.push(
      <li key={value}>
        <Button
          disabled={disabled}
          variant={value === current ? "primary" : "ghost"}
          aria-label={`${value}페이지`}
          aria-current={value === current ? "page" : undefined}
          onClick={() => {
            if (value !== current) onPageChange(value);
          }}
        >
          {value}
        </Button>
      </li>,
    );
  });
  return (
    <nav aria-label={label} data-slot="pagination">
      <ul className="ds-pagination">
        <li>
          <Button
            variant="secondary"
            aria-label="이전 페이지"
            disabled={disabled || current === 1}
            onClick={() => onPageChange(current - 1)}
          >
            이전
          </Button>
        </li>
        {entries}
        <li>
          <Button
            variant="secondary"
            aria-label="다음 페이지"
            disabled={disabled || current === total}
            onClick={() => onPageChange(current + 1)}
          >
            다음
          </Button>
        </li>
      </ul>
    </nav>
  );
}
