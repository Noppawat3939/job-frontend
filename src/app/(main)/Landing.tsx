import {
  Banner,
  BrandCompaniesSection as Brand,
  ListCategorySection as Categories,
  ListIndustrySection as Industries,
} from "@/components";
import { QUERY_KEY } from "@/constants";
import { publicService } from "@/services";
import type {
  GetIndustriesResponse,
  GetJobCategoriesResponse,
} from "@/services/public";
import { useQueries } from "@tanstack/react-query";
import dynamic from "next/dynamic";

const SubscribeSection = dynamic(
  () => import("@/components/common/section/SubscribeByEmailSection")
);

import { useRouter } from "next/navigation";

export default function Landing() {
  const router = useRouter();

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

  const industryData = queryIndustries.data;
  const categoryData = queryCategory.data;

  const goToJobs = (param?: string) => router.push(`/jobs${param}`);

  return (
    <section className="bg-grid">
      <Banner
        onClick={(keyword) => goToJobs(keyword ? `?keyword=${keyword}` : "")}
      />
      <Brand />
      <Industries
        data={industryData}
        onClick={(industry) => goToJobs(`?industry=${industry}`)}
        loading={loading}
      />
      <Categories
        data={categoryData}
        onClick={(category) => goToJobs(`?category=${category}`)}
        loading={loading}
      />
      <SubscribeSection />
    </section>
  );
}
