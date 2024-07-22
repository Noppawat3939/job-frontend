import { Badge } from "@/components";
import { cn, mappingApprovtyleClass } from "@/lib";
import type { UserStatus } from "@/types/user";
import { type ClassValue } from "clsx";

type BadgeUserApproveProps = {
  onClick?: <A>(arg?: A) => void;
  status: UserStatus;
};

export default function BadgeUserApprove({
  onClick,
  status,
}: BadgeUserApproveProps) {
  const mappingDotClass = {
    approved: "bg-teal-400",
    "un-approve": "bg-gray-300",
    rejected: "bg-red-400",
  } as Record<UserStatus, ClassValue>;

  return (
    <Badge
      onClick={onClick}
      variant="outline"
      className={cn(
        "flex min-w-[100px] items-center justify-center gap-2 hover:bg-white cursor-pointer",
        mappingApprovtyleClass[status]
      )}
    >
      <span
        role="dot-status"
        className={cn("w-2 h-2 rounded-full", mappingDotClass[status])}
      />
      {status}
    </Badge>
  );
}
