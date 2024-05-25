import { JobDetailCard, MyJobCard, Show } from "@/components";
import { eq, isNull } from "@/lib";
import type {
  AppliedJob,
  FavoriteJob,
  Job,
  Nullable,
  OmittedJob,
} from "@/types";
import { Fragment, useEffect, useRef, useState } from "react";

type MyJobsProps = {
  jobsApplied?: (Omit<AppliedJob, "userId" | "jobId"> & {
    job: OmittedJob<"applicationStatus">;
  })[];
  jobsFavorited?: (FavoriteJob & { job: Job })[];
  onCancelApplied: (jobId: string) => void;
  onCancelFavorited: (jobId: string) => void;
  tab?: "favorite" | "apply";
};

export default function MyJobs({
  tab,
  onCancelApplied,
  onCancelFavorited,
  jobsFavorited,
  jobsApplied,
}: MyJobsProps) {
  const isFavorite = eq(tab, "favorite");
  const isApply = eq(tab, "apply");

  const ref = useRef<HTMLDivElement>(null);

  const [previewJob, setPreviewJob] = useState<Nullable<Job>>(null);

  useEffect(() => {
    if (tab) {
      setPreviewJob(null);
    }
  }, [tab]);

  return (
    <div className="flex flex-col gap-3" ref={ref}>
      <div>
        <h1 className="text-3xl font-medium text-slate-700">{`Your ${
          isFavorite ? "favorited" : "applied"
        } jobs - (${
          isFavorite ? jobsFavorited?.length : jobsApplied?.length
        }  jobs)`}</h1>
      </div>

      <Show when={isFavorite}>
        {jobsFavorited?.map((job) => (
          <MyJobCard
            key={`my_job_${job.id}_${tab}`}
            type="favorite"
            job={job.job}
            favoritedDate={job.favoriteDate}
            onCancel={(jobId) => onCancelFavorited(String(jobId))}
            onClick={() => {
              ref.current?.lastElementChild?.scrollIntoView({
                behavior: "smooth",
              });
              setPreviewJob(job.job);
            }}
          />
        ))}
      </Show>
      <Show when={isApply}>
        {jobsApplied?.map((job) => (
          <MyJobCard
            key={`my_job_${job.id}_${tab}`}
            type="apply"
            job={job.job}
            applicationDate={job.applicationDate}
            applicationStatus={job.applicationStatus}
            cancelledDate={job.cancelledDate}
            onCancel={(jobId) => onCancelApplied(String(jobId))}
            onClick={() => {
              ref.current?.lastElementChild?.scrollIntoView({
                behavior: "smooth",
              });
              setPreviewJob(job.job);
            }}
          />
        ))}
      </Show>

      <Show when={!isNull(previewJob)}>
        <Fragment>
          <br />
          <JobDetailCard hideApply hideFavorite {...previewJob} />
        </Fragment>
      </Show>
    </div>
  );
}
