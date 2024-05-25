import { Badge } from "@/components";
import { BadgeProps } from "@/components/ui/badge";
import { cn, mappingRoleUserStyleClass, pretty, unPretty } from "@/lib";

type BadgeRoleUserProps = {
  role: string;
  className?: BadgeProps["className"];
  variant?: BadgeProps["variant"];
};

export default function BadgeRoleUser({
  role,
  className,
  variant,
}: BadgeRoleUserProps) {
  return (
    <Badge
      className={cn(
        "w-[100px] flex justify-center",
        mappingRoleUserStyleClass[
          unPretty(role) as keyof typeof mappingRoleUserStyleClass
        ],
        className
      )}
      variant={variant}
    >
      {role}
    </Badge>
  );
}
