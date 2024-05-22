"use client";

import {
  JobPreviewLoader,
  MyJobCard,
  NoContentSection,
  Show,
} from "@/components";
import { QUERY_KEY } from "@/constants";
import { useChangeTitleWindow } from "@/hooks";
import { cn, eq } from "@/lib";
import { jobService } from "@/services";
import { Job } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Heart, History } from "lucide-react";
import { useState } from "react";

type MyJobsPageProps = { searchParams: { tab: "favorite" | "apply" } };

const mockLoader = Array.from({ length: 5 }).fill("");

export default function MyJobsPage({ searchParams }: MyJobsPageProps) {
  useChangeTitleWindow(`My jobs - ${searchParams.tab} | jobify.com`);

  const {
    data: jobsApplied,
    isLoading,
    isFetched,
    isRefetching,
    refetch: refetchAppliedJobs,
  } = useQuery({
    queryKey: [QUERY_KEY.GET_JOBS_APPLIED],
    queryFn: jobService.getJobsApplied,
    select: (res) => res.data,
    enabled: eq(searchParams.tab, "apply"),
  });

  const { mutate: cancelApplied } = useMutation({
    mutationFn: jobService.cancelAppliedJob,
    onSuccess: () => refetchAppliedJobs(),
  });

  const [viewJob, setViewJob] = useState<{ open: boolean; data: Job | null }>({
    data: null,
    open: false,
  });

  const noContent = eq(searchParams.tab, "apply")
    ? eq(jobsApplied?.length, 0)
    : true;
  const hasLoading = [isLoading, isRefetching].some(Boolean);

  if (noContent)
    return (
      <NoContentSection
        title={
          eq(searchParams.tab, "apply")
            ? "Apply job not found"
            : "Favorite job not found"
        }
        icon={eq(searchParams.tab, "favorite") ? Heart : History}
      />
    );

  return (
    <div className="p-3">
      {hasLoading &&
        mockLoader.map((_, i) => <JobPreviewLoader key={`loader_${i}`} />)}
      <div className="flex">
        {isFetched && (
          <div
            className={cn(
              "flex flex-col gap-2 max-h-[calc(100vh-80px)] overflow-y-scroll",
              viewJob.open ? "flex-[.5]" : "flex-1"
            )}
          >
            {jobsApplied?.map((job) => (
              <MyJobCard
                key={`my_job_${job.id}`}
                {...job}
                onClick={() => setViewJob({ open: true, data: job.job })}
                onCancel={(jobId) => cancelApplied(String(jobId))}
              />
            ))}
          </div>
        )}
        <Show when={viewJob.open}>
          <div className="flex-[.5] ml-2 max-h-[calc(100vh-200px)] overflow-y-scroll">
            {/* <JobDetailCard
              {...viewJob.data}
              onClose={() => setViewJob({ data: null, open: false })}
            /> */}
          </div>
        </Show>
      </div>
    </div>
  );
}
