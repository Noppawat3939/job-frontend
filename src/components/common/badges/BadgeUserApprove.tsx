import { Badge } from "@/components";
import { cn } from "@/lib";
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
  const mappingBadgeClass = {
    approved: "text-teal-500 border-teal-300",
    "un-approve": "text-gray-600",
    rejected: "border-red-400 text-red-500 border-red-300",
  } as Record<UserStatus, ClassValue>;

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
        mappingBadgeClass[status]
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
