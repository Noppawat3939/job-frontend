import type { ApplicationStatus } from "@/types";
import { Badge } from "@/components";
import { cn, mappingApplicationStatusClass as _class } from "@/lib";

type ApplicationStatusProps = {
  status: ApplicationStatus;
};

export default function BadgeApplicationStatus({
  status,
}: ApplicationStatusProps) {
  return (
    <Badge
      variant="secondary"
      className={cn("font-medium capitalize h-[24px]", _class[status])}
    >
      <kbd aria-label="dot-status" className="text-3xl mr-1 leading-none">
        {"•"}
      </kbd>
      {status}
    </Badge>
  );
}
