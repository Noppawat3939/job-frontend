"use client";

import { Lazyload } from "@/components";
import Jobs from "./Jobs";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "@/constants";
import { jobService } from "@/services";

export default function JobsPage() {
  const { data: jobs, isLoading } = useQuery({
    queryKey: [QUERY_KEY.GET_JOBS],
    queryFn: jobService.fetchJobs,
    select: ({ data }) => data,
  });

  return (
    <Lazyload>
      <Jobs jobs={jobs} loading={isLoading} />
    </Lazyload>
  );
}
