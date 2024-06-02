import { BadgeApplicationStatus, Button, Card, Show } from "@/components";
import { cn, eq, formatDate, isUndifined } from "@/lib";
import { AppliedJob, Job } from "@/types";
import { HTMLAttributes } from "react";

type MyJobCardProps =
  | {
      job: Job;
      type: "favorite" | "apply";
      favoritedDate?: string;
      applicationDate?: string | Date;
      cancelledDate?: string | Date;
      applicationStatus?: AppliedJob["applicationStatus"];
    } & Pick<HTMLAttributes<HTMLDivElement>, "onClick"> & {
        onCancel?: (id: number) => void;
      };

export default function MyJobCard({
  type,
  job,
  applicationDate,
  applicationStatus,
  cancelledDate,
  onCancel,
  onClick,
  favoritedDate,
}: MyJobCardProps) {
  const isApply = eq(type, "apply");
  const isFavorite = eq(type, "favorite");

  return (
    <Card.Card
      className={cn(
        "min-h-[24px] border-y-0 border-r-0 transition-all border-slate-100 duration-200 border-l-[5px] p-2",
        isFavorite ? "hover:border-pink-400" : "hover:border-sky-400"
      )}
      onClick={onClick}
    >
      <Card.CardHeader className="p-3">
        <Card.CardTitle
          aria-label="job-position"
          className="text-lg text-slate-700 flex w-full"
        >
          <div className="flex flex-col">
            {job.position}
            <Card.CardDescription className="font-medium" aria-label="company">
              {job.company}
            </Card.CardDescription>
          </div>
          <Show when={isApply}>
            <p
              className={cn(
                "text-xs ml-auto font-normal",
                cancelledDate ? "text-red-500" : "text-slate-700"
              )}
            >{`${cancelledDate ? "Cancelled" : "Applied"} at: ${formatDate(
              cancelledDate || applicationDate,
              "DD MMM YYYY"
            )}`}</p>
          </Show>

          <Show when={isFavorite}>
            <p className="text-xs ml-auto font-normal text-slate-700">{`Favorited at: ${formatDate(
              favoritedDate,
              "DD MMM YYYY"
            )}`}</p>
          </Show>
        </Card.CardTitle>
      </Card.CardHeader>
      <Card.CardContent className="py-2 px-3">
        <div
          className={cn(
            "flex items-center",
            applicationStatus ? "justify-between" : "justify-end"
          )}
        >
          {isApply && !isUndifined(applicationStatus) && (
            <BadgeApplicationStatus status={applicationStatus!} />
          )}
          <div className="flex">
            {isApply && applicationStatus === "applied" && (
              <Button
                size="sm"
                role="cancel"
                onClick={(e) => {
                  e.stopPropagation();

                  onCancel?.(job.id);
                }}
                className="text-slate-700"
                variant="outline"
              >
                {"Cancel applied"}
              </Button>
            )}

            {isFavorite && (
              <Button
                size="sm"
                role="un-favorite"
                onClick={(e) => {
                  e.stopPropagation();

                  onCancel?.(job.id);
                }}
                className="text-slate-700"
                variant="outline"
              >
                {"Un favorited"}
              </Button>
            )}
          </div>
        </div>
      </Card.CardContent>
    </Card.Card>
  );
}
