import { Badge } from "@/components";
import { BadgeProps } from "@/components/ui/badge";
import { cn, mappingApproveStyleClass } from "@/lib";
import { JobStatus } from "@/types";
import { ClassValue } from "clsx";

type BadgeJobApproveProps = {
  status: string;
  text: string;
  className?: BadgeProps["className"];
};

export default function BadgeJobApprove({
  status,
  text,
  className,
}: BadgeJobApproveProps) {
  const mappingDotClass = {
    approve: "bg-teal-400",
    "un-approve": "bg-gray-300",
    reject: "bg-red-400",
  } as Record<JobStatus, ClassValue>;

  return (
    <Badge
      aria-label={`job_approve_status_${status}`}
      variant={"outline"}
      className={cn(
        "w-[100px] flex justify-center items-center gap-2",
        className,
        mappingApproveStyleClass[
          status as keyof typeof mappingApproveStyleClass
        ]
      )}
    >
      <span
        role="dot-status"
        className={cn(
          "w-2 h-2 rounded-full",
          mappingDotClass[status as JobStatus]
        )}
      />
      {text}
    </Badge>
  );
}
