"use client";

import { Lazyload } from "@/components";
import Landing from "./Landing";
import { useQueries } from "@tanstack/react-query";
import { QUERY_KEY } from "@/constants";
import { publicService } from "@/services";
import {
  GetIndustriesResponse,
  GetJobCategoriesResponse,
} from "@/services/public";

export default function MainPage() {
  const [queryIndustries, queryCategory] = useQueries({
    queries: [
      {
        queryKey: [QUERY_KEY.GET_INDUSTRIES],
        queryFn: publicService.getPublicIndustries,
        select: ({ data }: GetIndustriesResponse) =>
          data.map((ids) => ids.name),
      },
      {
        queryKey: [QUERY_KEY.GET_JOB_CATEGORIES],
        queryFn: publicService.getJobCategories,
        select: ({ data }: GetJobCategoriesResponse) =>
          data.map((cat) => cat.category_name),
      },
    ],
  });

  const loading = [queryCategory.isLoading, queryIndustries.isLoading].some(
    Boolean
  );

  return (
    <Lazyload>
      <Landing
        categoryData={queryCategory.data}
        industryData={queryIndustries.data}
        loading={loading}
      />
    </Lazyload>
  );
}
