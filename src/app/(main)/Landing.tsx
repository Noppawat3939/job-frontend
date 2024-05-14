import {
  Banner,
  BrandCompaniesSection,
  ListCategorySection,
  ListIndustrySection,
  SubscribeByEmailSection as SubscribeSection,
} from "@/components";
import { useRouter } from "next/navigation";

type LandingProps = {
  industryData?: string[];
  categoryData?: string[];
  loading?: boolean;
};

export default function Landing({
  industryData,
  categoryData,
  loading,
}: LandingProps) {
  const router = useRouter();

  const goToJobs = (param?: string) => router.push(`/jobs${param}`);

  return (
    <section className="bg-grid">
      <Banner onClick={(keyword) => goToJobs(`?keyword=${keyword}`)} />
      <BrandCompaniesSection />
      <ListIndustrySection
        data={industryData}
        onClick={(industry) => goToJobs(`?industry=${industry}`)}
        loading={loading}
      />
      <ListCategorySection
        data={categoryData}
        onClick={(category) => goToJobs(`?category=${category}`)}
        loading={loading}
      />
      <SubscribeSection />
    </section>
  );
}
