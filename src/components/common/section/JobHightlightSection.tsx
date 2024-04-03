import { Show, Skeleton } from "@/components";
import { ReactNode } from "react";

type JobHightlightSectionProps = {
  hide?: boolean;
  value: ReactNode;
  icon?: ReactNode;
  loading?: boolean;
};

export default function JobHightlightSection({
  icon,
  hide,
  value,
  loading,
}: JobHightlightSectionProps) {
  if (hide) return null;

  return (
    <div className="flex items-center space-x-2">
      {icon && icon}
      <Show
        when={!loading}
        otherwise={<Skeleton className="h-[18px] w-[250px] my-2 rounded-sm" />}
      >
        <h2 className="text-lg text-slate-600 max-md:text-[16px] ">{value}</h2>
      </Show>
    </div>
  );
}
