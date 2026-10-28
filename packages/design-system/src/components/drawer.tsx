import type { ReactNode } from "react";
import { DialogFrame } from "./dialog.js";
import type { DialogProps } from "./dialog.js";
export type DrawerProps = Omit<DialogProps, "size"> & {
  side?: "responsive" | "left" | "right";
  /** 제목 아래에 고정되는 영역. 검색창·필터처럼 본문이 스크롤돼도 남아야 하는 것을 둔다. */
  header?: ReactNode;
  /** 열리는 높이. auto는 내용만큼, half·tall·full은 처음부터 그 높이로 연다. 아래에서 열릴 때만 뜻이 있다. */
  size?: "auto" | "half" | "tall" | "full";
};
export function Drawer({
  side = "responsive",
  header,
  size = "auto",
  ...props
}: DrawerProps) {
  return (
    <DialogFrame
      {...props}
      header={header}
      drawerSize={size}
      presentation={side === "responsive" ? "drawer" : `drawer-${side}`}
    />
  );
}
