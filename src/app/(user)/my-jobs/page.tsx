"use client";

import {
  JobPreviewLoader,
  LayoutWithSidebar,
  NoContentSection,
  Show,
  useToast,
} from "@/components";
import { QUERY_KEY } from "@/constants";
import { useChangeTitleWindow } from "@/hooks";
import { eq } from "@/lib";
import { jobService } from "@/services";
import { useMutation, useQueries } from "@tanstack/react-query";
import { Heart, History } from "lucide-react";
import MyJobs from "./MyJobs";
import { useSearchParams } from "next/navigation";
import { JobsAppliedResponse, JobsFavoritedResponse } from "@/services/job";

const fakeLoader = Array.from({ length: 5 }).fill("");

export default function MyJobsPage() {
  const searchParam = useSearchParams();

  const tabParam = searchParam.get("tab") as "favorite" | "apply" | undefined;

  const { toast } = useToast();

  useChangeTitleWindow(`My jobs - ${tabParam} | jobify.com`);

  const [
    {
      data: jobsFavorited,
      refetch: refetchFavorited,
      isLoading: loadingFavorited,
      isRefetching: refetchingFavorited,
    },
    {
      data: jobsApplied,
      refetch: refetchApplied,
      isLoading: loadingApplied,
      isRefetching: refetchingApplied,
    },
  ] = useQueries({
    queries: [
      {
        queryKey: [QUERY_KEY.GET_JOBS_FAVORITED, tabParam],
        queryFn: jobService.getFavoritedJobs,
        select: (res: JobsFavoritedResponse) => res.data,
      },
      {
        queryKey: [QUERY_KEY.GET_JOBS_APPLIED, tabParam],
        queryFn: jobService.getJobsApplied,
        select: (res: JobsAppliedResponse) => res.data,
      },
    ],
  });

  const { mutate: cancelApplied } = useMutation({
    mutationFn: jobService.cancelAppliedJob,
    onSuccess: () => refetchApplied(),
    onError: () => {
      toast({
        title: "Somting went wrong",
        variant: "destructive",
        duration: 1500,
      });

      refetchApplied();
    },
  });

  const { mutate: favoriteJob } = useMutation({
    mutationFn: jobService.favoriteJob,
    onSuccess: () => refetchFavorited(),
  });

  const noContent = eq(tabParam, "favorite")
    ? eq(jobsFavorited?.length, 0)
    : eq(jobsApplied?.length, 0);

  const hasLoading = [
    loadingApplied,
    loadingFavorited,
    refetchingApplied,
    refetchingFavorited,
  ].some(Boolean);

  return (
    <LayoutWithSidebar
      scrollAreaClass="h-full flex flex-col"
      menu={[
        {
          items: [
            {
              label: "Job Apply history",
              value: "job-apply-history",
              path: "/my-jobs?tab=apply",
              leftIcon: History,
              active: eq(tabParam, "apply"),
            },
            {
              label: "Job Favorite",
              value: "job-favorite",
              path: "/my-jobs?tab=favorite",
              leftIcon: Heart,
              active: eq(tabParam, "favorite"),
            },
          ],
        },
      ]}
    >
      <section className="bg-transparent px-[24px]">
        <Show
          when={hasLoading}
          otherwise={
            noContent ? (
              <NoContentSection
                title={
                  eq(tabParam, "apply")
                    ? "Apply job not found"
                    : "Favorite job not found"
                }
                icon={eq(tabParam, "favorite") ? Heart : History}
              />
            ) : (
              <MyJobs
                tab={tabParam}
                jobsFavorited={jobsFavorited}
                jobsApplied={jobsApplied}
                onCancelApplied={cancelApplied}
                onCancelFavorited={favoriteJob}
              />
            )
          }
        >
          <div className="flex flex-col space-y-3">
            {fakeLoader.map((_, i) => (
              <JobPreviewLoader key={`loader_${i}`} />
            ))}
          </div>
        </Show>
      </section>
    </LayoutWithSidebar>
  );
}
