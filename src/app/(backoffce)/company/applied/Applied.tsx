import {
  BadgeApplicationStatus,
  DataTable,
  LayoutWithSidebar,
} from "@/components";
import { DATE_FORMAT, QUERY_KEY } from "@/constants";
import { formatDate, generateMenusSidebar } from "@/lib";
import { companyService } from "@/services";
import { ApplicationStatus as Status } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";

export default function Applied() {
  const pathname = usePathname();
  const router = useRouter();

  const { companyMenus: menu } = useMemo(
    () => generateMenusSidebar(pathname),
    [pathname]
  );

  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEY.GET_JOBS_APPLIED],
    queryFn: companyService.fetchJobsApplied,
    select: ({ data }) => data,
  });

  return (
    <LayoutWithSidebar menu={menu}>
      <section>
        <div>
          <DataTable
            name="jobs-applied"
            loading={isLoading}
            onRow={(row) => {
              router.push(`/company/applied/${row?.key}`);
            }}
            data={
              data?.map((item) => ({
                key: String(item.id),
                email: item.user.email,
                name: `${item.user.firstName || ""} ${
                  item.user.lastName || ""
                }`,
                position: item.job.position,
                jobExperience: item.job.experienceLevel,
                appliedAt: formatDate(item.applicationDate, DATE_FORMAT),
                status: item.applicationStatus,
              })) || []
            }
            columns={[
              {
                key: "email",
                dataIndex: "email",
                title: "Email",
                width: "20%",
              },
              {
                key: "name",
                dataIndex: "name",
                title: "Full Name",
                width: "20%",
              },
              {
                key: "position",
                dataIndex: "position",
                title: "Positon",
              },
              {
                key: "jobExperience",
                dataIndex: "jobExperience",
                title: "Experience",
              },
              { key: "appliedAt", dataIndex: "appliedAt", title: "Applied at" },
              {
                key: "status",
                dataIndex: "status",
                title: "Status",
                render: (status) => (
                  <BadgeApplicationStatus status={status as Status} />
                ),
              },
            ]}
          />
        </div>
      </section>
    </LayoutWithSidebar>
  );
}
