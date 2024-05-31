import { LayoutWithSidebar } from "@/components";
import { QUERY_KEY } from "@/constants";
import { generateMenusSidebar, isUndifined } from "@/lib";
import { companyService } from "@/services";
import { useQuery } from "@tanstack/react-query";
import { useParams, usePathname } from "next/navigation";
import { useMemo } from "react";

export default function ViewApplyJob() {
  const pathname = usePathname();
  const params = useParams() as { apply_id: string };

  const { companyMenus: menu } = useMemo(
    () => generateMenusSidebar(pathname),
    [pathname]
  );

  useQuery({
    queryKey: [QUERY_KEY.GET_JOB_APPLIED],
    queryFn: () => companyService.fetchJobAppliedById(Number(params.apply_id)),
    enabled: !isUndifined(params.apply_id),
    select: ({ data }) => data,
  });

  return <LayoutWithSidebar menu={menu}>ViewApplyJob</LayoutWithSidebar>;
}
