import type { ReactNode } from "react";
import { DialogFrame } from "./dialog.js";
import type { DialogProps } from "./dialog.js";
export type DrawerProps = Omit<DialogProps, "size"> & {
  side?: "responsive" | "left" | "right";
  /** 제목 아래에 고정할 검색창·필터 영역. */
  header?: ReactNode;
  /** 하단 Drawer의 높이. 옆에서 열릴 때는 화면 높이를 채운다. */
  size?: "auto" | "half" | "tall" | "full" | undefined;
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
