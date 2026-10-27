import { DialogFrame } from "./dialog.js";
import type { DialogProps } from "./dialog.js";
export type DrawerProps = Omit<DialogProps, "size"> & {
  side?: "responsive" | "left" | "right";
};
export function Drawer({ side = "responsive", ...props }: DrawerProps) {
  return (
    <DialogFrame
      {...props}
      presentation={side === "responsive" ? "drawer" : `drawer-${side}`}
    />
  );
}
