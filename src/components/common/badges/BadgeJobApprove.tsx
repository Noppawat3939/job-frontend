import { Badge } from "@/components";
import { BadgeProps } from "@/components/ui/badge";
import { cn, mappingApproveStyleClass } from "@/lib";

type BadgeJobApproveProps = {
  status: string;
  text: string;
  className?: BadgeProps["className"];
  variant?: BadgeProps["variant"];
};

export default function BadgeJobApprove({
  status,
  text,
  variant,
  className,
}: BadgeJobApproveProps) {
  return (
    <Badge
      aria-label={`job_approve_status_${status}`}
      variant={variant}
      className={cn(
        "w-[90px] flex justify-center",
        className,
        mappingApproveStyleClass[
          status as keyof typeof mappingApproveStyleClass
        ]
      )}
    >
      {text}
    </Badge>
  );
}
