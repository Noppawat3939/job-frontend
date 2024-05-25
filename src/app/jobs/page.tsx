"use client";

import { Lazyload, Spinner } from "@/components";
import Jobs from "./Jobs";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "@/constants";
import { publicService } from "@/services";

export default function JobsPage() {
  const { data: jobs, isFetching } = useQuery({
    queryKey: [QUERY_KEY.GET_JOBS],
    queryFn: publicService.getPublicJobs,
    select: ({ data }) => data,
  });

  return (
    <Lazyload>
      {isFetching && <Spinner />}
      <Jobs jobs={jobs} />
    </Lazyload>
  );
}
