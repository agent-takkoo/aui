import type { ElementType } from "react";
import type { DesignProps } from "../internal/props.js";
import { domProps } from "../internal/props.js";
type VisualAttribute =
  | "width"
  | "height"
  | "bgColor"
  | "border"
  | "cellPadding"
  | "cellSpacing"
  | "align"
  | "valign"
  | "vAlign"
  | "char"
  | "charOff"
  | "frame"
  | "rules";
type TableElementProps<T extends ElementType> = Omit<
  DesignProps<T>,
  VisualAttribute
>;
function tableProps<T extends object>(props: T): Omit<T, VisualAttribute> {
  const clean = domProps(props) as Record<string, unknown>;
  for (const key of [
    "width",
    "height",
    "bgColor",
    "border",
    "cellPadding",
    "cellSpacing",
    "align",
    "valign",
    "vAlign",
    "char",
    "charOff",
    "frame",
    "rules",
  ])
    delete clean[key];
  return clean as Omit<T, VisualAttribute>;
}
export type TableProps = TableElementProps<"table"> & { caption: string };
export function Table({ caption, children, ...props }: TableProps) {
  return (
    <div
      className="ds-table-scroll"
      role="region"
      aria-label={caption}
      tabIndex={0}
    >
      <table {...tableProps(props)} className="ds-table" data-slot="table">
        <caption>{caption}</caption>
        {children}
      </table>
    </div>
  );
}
export function TableHeader(props: TableElementProps<"thead">) {
  return <thead {...tableProps(props)} />;
}
export function TableBody(props: TableElementProps<"tbody">) {
  return <tbody {...tableProps(props)} />;
}
export function TableFooter(props: TableElementProps<"tfoot">) {
  return <tfoot {...tableProps(props)} />;
}
export function TableRow(props: TableElementProps<"tr">) {
  return <tr {...tableProps(props)} />;
}
export function TableHead({
  scope = "col",
  ...props
}: TableElementProps<"th">) {
  return <th {...tableProps(props)} scope={scope} />;
}
export function TableCell(props: TableElementProps<"td">) {
  return <td {...tableProps(props)} />;
}
