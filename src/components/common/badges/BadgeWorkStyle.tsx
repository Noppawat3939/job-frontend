import { Badge } from "@/components";
import { cn, mappingWorkStyle, mappingWorkingStyleClass } from "@/lib";
import type { WorkingStyle } from "@/types";

type BadgeWorkStyleProps = {
  value: WorkingStyle;
};

export default function BadgeWorkStyle({ value }: BadgeWorkStyleProps) {
  return (
    <Badge className={cn(mappingWorkingStyleClass[value], "w-fit")}>
      {mappingWorkStyle[value]}
    </Badge>
  );
}
