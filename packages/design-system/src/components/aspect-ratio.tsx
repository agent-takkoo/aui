import * as Primitive from "@radix-ui/react-aspect-ratio";
import type { DesignProps } from "../internal/props.js";
import { domProps } from "../internal/props.js";
export type AspectRatioProps = DesignProps<"div"> & {
  ratio?: "16:9" | "4:3" | "1:1" | undefined;
};
const ratios = { "16:9": 16 / 9, "4:3": 4 / 3, "1:1": 1 };
export function AspectRatio({ ratio = "16:9", ...props }: AspectRatioProps) {
  return (
    <Primitive.Root
      {...domProps(props)}
      ratio={ratios[ratio]}
      className="ds-aspect-ratio"
      data-slot="aspect-ratio"
    />
  );
}
