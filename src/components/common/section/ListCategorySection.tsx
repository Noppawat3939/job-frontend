import { Button, Show, Skeleton } from "@/components";
import { cn } from "@/lib";

type ListCategorySectionProps = {
  data?: string[];
  onClick?: (value: string) => void;
  loading?: boolean;
};

const genLoader = Array.from({ length: 30 }).fill("");

export default function ListCategorySection({
  data,
  onClick,
  loading = false,
}: ListCategorySectionProps) {
  return (
    <div className="flex-col flex items-center gap-5 py-[60px]">
      <h1 className="font-semibold text-3xl text-slate-800">
        {`"What category are you looking for work in?"`}
      </h1>
      <div className="flex mx-auto gap-3 max-w-[1200px] justify-center bg-white flex-wrap">
        <Show when={loading}>
          {genLoader.map((_, i) => (
            <Skeleton
              key={`loader_${i}`}
              className={cn(
                "h-[30px]",
                `${
                  i % 3 === 0
                    ? "w-[180px]"
                    : i % 5 == 0
                    ? "w-[200px]"
                    : "w-[120px]"
                }`
              )}
            />
          ))}
        </Show>

        <Show when={!loading}>
          {data?.map((category) => (
            <Button
              className="rounded-2xl"
              variant="outline"
              role={category}
              key={category}
              onClick={() => onClick?.(category)}
            >
              {category}
            </Button>
          ))}
        </Show>
      </div>
    </div>
  );
}
