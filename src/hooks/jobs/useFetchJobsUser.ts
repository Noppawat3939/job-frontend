import { QUERY_KEY } from "@/constants";
import { publicService } from "@/services";
import { GetIndustriesResponse } from "@/services/public";
import { useQueries } from "@tanstack/react-query";

export default function useFetchJobsUser() {
  const [jobsQuery, industriesQuery] = useQueries({
    queries: [
      {
        queryKey: [QUERY_KEY.GET_JOBS],
        queryFn: publicService.getPublicJobs,
      },
      {
        queryKey: [QUERY_KEY.GET_INDUSTRIES],
        queryFn: publicService.getPublicIndustries,
      },
    ],
  });

  const mapped = {
    jobs: jobsQuery.data?.data || [],
    industries: industriesQuery.data?.data || [],
  };

  return { state: mapped, jobsQuery, industriesQuery };
}
