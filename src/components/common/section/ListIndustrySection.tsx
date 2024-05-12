import { Button, Show, Skeleton } from "@/components";
import { cn } from "@/lib";

type ListIndustrySectionProps = {
  data?: string[];
  onClick?: (value: string) => void;
  loading?: boolean;
};

const genLoader = Array.from({ length: 45 }).fill("");

export default function ListIndustrySection({
  data,
  onClick,
  loading = false,
}: ListIndustrySectionProps) {
  return (
    <div className="flex-col flex items-center gap-5 py-[60px]">
      <h1 className="font-semibold text-3xl text-slate-800">
        {`"What industry are you looking for work in?"`}
      </h1>
      <div className="flex mx-auto gap-3 max-w-[1200px] justify-center bg-white flex-wrap">
        <Show when={loading}>
          {genLoader.map((_, i) => (
            <Skeleton
              key={`loader_${i}`}
              className={cn(
                "h-[30px]",
                `${
                  i % 2 === 0
                    ? "w-[120px]"
                    : i % 5 == 0
                    ? "w-[180px]"
                    : "w-[160px]"
                }`
              )}
            />
          ))}
        </Show>

        <Show when={!loading}>
          {data?.map((industry) => (
            <Button
              className="rounded-2xl"
              variant="outline"
              role={industry}
              key={industry}
              onClick={() => onClick?.(industry)}
            >
              {industry}
            </Button>
          ))}
        </Show>
      </div>
    </div>
  );
}
