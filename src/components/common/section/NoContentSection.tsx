import type { Nullable } from "@/types";
import { cn } from "@/lib";
import { LucideIcon, Package } from "lucide-react";
import type { DetailedHTMLProps, HTMLAttributes } from "react";

type NoContentSectionProps = {
  icon?: Nullable<LucideIcon>;
  text?: string;
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export default function NoContentSection({
  icon: Icon,
  title,
  className,
  ...rest
}: NoContentSectionProps) {
  const displayIcon = Icon ? (
    <Icon className="text-gray-500 w-[60px] h-[60px]" />
  ) : (
    <Package className="text-gray-500 w-[60px] h-[60px]" />
  );

  return (
    <div
      className={cn(
        "bg-white justify-center w-full items-center flex h-[calc(100vh-80px)]",
        className
      )}
      {...rest}
    >
      <div className="flex flex-col items-center space-y-1">
        {displayIcon}
        <p className="text-gray-400 text-lg">{title || "Data not found"}</p>
      </div>
    </div>
  );
}
