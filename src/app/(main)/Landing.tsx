import {
  Banner,
  BrandCompaniesSection,
  ListCategorySection,
  ListIndustrySection,
} from "@/components";

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
  return (
    <section className="bg-grid">
      <Banner />
      <BrandCompaniesSection />
      <ListIndustrySection data={industryData} loading={loading} />
      <ListCategorySection data={categoryData} loading={loading} />
    </section>
  );
}
