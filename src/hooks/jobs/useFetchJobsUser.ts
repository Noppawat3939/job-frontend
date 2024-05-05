import { QUERY_KEY } from "@/constants";
import { jobService, publicService } from "@/services";
import { useQueries } from "@tanstack/react-query";

export default function useFetchJobsUser() {
  const [jobsQuery, industriesQuery, provincesQuery, categoriesQuery] =
    useQueries({
      queries: [
        {
          queryKey: [QUERY_KEY.GET_JOBS],
          queryFn: publicService.getPublicJobs,
        },
        {
          queryKey: [QUERY_KEY.GET_INDUSTRIES],
          queryFn: publicService.getPublicIndustries,
        },
        {
          queryKey: [QUERY_KEY.GET_PROVINCES],
          queryFn: publicService.getProvinces,
        },
        {
          queryKey: [QUERY_KEY.GET_JOB_CATEGORIES],
          queryFn: publicService.getJobCategories,
        },
      ],
    });

  const mapped = {
    jobs: jobsQuery.data?.data || [],
    industries: industriesQuery.data?.data || [],
    provinces: provincesQuery.data?.data || [],
    categories: categoriesQuery.data?.data || [],
  };

  return {
    state: mapped,
    jobsQuery,
    industriesQuery,
    provincesQuery,
    categoriesQuery,
  };
}
