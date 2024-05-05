import { ApplicationStatus, Button, Card, Label, Show } from "@/components";
import { cn, eq, formatDate } from "@/lib";
import { OmittedJob, OmmitedAppliedJob } from "@/types";
import { HTMLAttributes } from "react";

type MyJobCardProps = {
  job: OmittedJob<"applicationStatus">;
} & OmmitedAppliedJob<"jobId" | "userId"> &
  Pick<HTMLAttributes<HTMLDivElement>, "onClick"> & {
    onCancel?: (id: number) => void;
  };

export default function MyJobCard(props: MyJobCardProps) {
  const {
    job,
    applicationDate,
    applicationStatus,
    cancelledDate,
    onClick,
    onCancel,
  } = props;

  return (
    <Card.Card className="min-h-[20px] border-0" onClick={onClick}>
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

          <p
            className={cn(
              "text-xs ml-auto font-normal",
              cancelledDate ? "text-red-500" : "text-slate-700"
            )}
          >{`${cancelledDate ? "Cancelled" : "Applied"} at: ${formatDate(
            cancelledDate || applicationDate,
            "DD MMM YYYY"
          )}`}</p>
        </Card.CardTitle>
      </Card.CardHeader>
      <Card.CardContent className="py-2 px-3">
        <div className="flex justify-between items-center">
          <ApplicationStatus status={applicationStatus} />
          <div className="flex">
            <Show when={eq(applicationStatus, "applied")}>
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
                {"Cancel apply"}
              </Button>
            </Show>
          </div>
        </div>
      </Card.CardContent>
    </Card.Card>
  );
}
