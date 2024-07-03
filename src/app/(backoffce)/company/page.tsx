"use client";

import {
  BadgeJobApprove,
  Button,
  DataTable,
  FormInput,
  JobDetailCard,
  LayoutWithSidebar,
  NoContentSection as NoContent,
  Show,
} from "@/components";
import { DATE_FORMAT, QUERY_KEY } from "@/constants";
import {
  formatDate,
  formatPrice,
  generateMenusSidebar,
  isEmptyArray,
  isNull,
  mappingJobApprove,
  mappingJobType,
  mappingWorkStyle,
} from "@/lib";
import { companyService } from "@/services";
import type { Job, Nullable } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { BriefcaseBusiness, Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useRef, useState } from "react";

export default function CompanyPage() {
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);

  const [jobDetails, setJobDetails] = useState<Nullable<Job>>(null);

  const { data: jobs, isLoading } = useQuery({
    queryKey: [QUERY_KEY.GET_JOBS_BY_COMPANY],
    queryFn: companyService.fetchCompanyJobs,
    select: ({ data }) => data || [],
  });

  const mappedCompanyJobs = jobs?.map((job) => ({
    key: String(job.id),
    position: job.position,
    jobType: mappingJobType[job.jobType],
    style: mappingWorkStyle[job.style],
    salary: formatPrice(job.salary),
    createdAt: formatDate(job.createdAt, DATE_FORMAT),
    status: mappingJobApprove(job.active),
  }));

  const handleSelectJob = (jobId: number) => {
    const found = jobs?.find((job) => job.id === jobId) || null;

    setJobDetails((prev) => (prev && prev.id === found?.id ? null : found));
    ref.current?.lastElementChild?.scrollIntoView({ behavior: "smooth" });
  };

  const { companyMenus: menu } = useMemo(
    () => generateMenusSidebar(pathname),
    [pathname]
  );

  return (
    <LayoutWithSidebar menu={menu}>
      <div className="overflow-y-auto max-h-[90vh]">
        <div className="z-10 flex justify-between py-3 px-4 sticky top-0 bg-white">
          <FormInput disabled placeholder="Search keyword" />
          <Button variant={"purple-shadow"} size="sm" asChild>
            <Link href={"/company/new"} referrerPolicy="no-referrer">
              <Plus className="w-3 h-3 mr-2" />
              {"Create new job"}
            </Link>
          </Button>
        </div>
        <section className="flex" ref={ref}>
          <Show
            when={isEmptyArray(mappedCompanyJobs)}
            otherwise={
              <div aria-label="jobs-list" className="flex-1 px-4">
                <DataTable
                  loading={isLoading}
                  name="companyJobs"
                  data={mappedCompanyJobs ?? []}
                  onRow={(data) => handleSelectJob(Number(data?.key))}
                  columns={[
                    {
                      key: "position",
                      dataIndex: "position",
                      title: "Position",
                    },
                    {
                      key: "job_type",
                      dataIndex: "jobType",
                      title: "Job type",
                    },
                    { key: "style", dataIndex: "style", title: "Work style" },
                    { key: "salary", dataIndex: "salary", title: "Salary" },
                    {
                      key: "createdAt",
                      dataIndex: "createdAt",
                      title: "Created at",
                    },
                    {
                      key: "status",
                      dataIndex: "status",
                      title: "Status",
                      render: (status) => (
                        <BadgeJobApprove status={status} text={status} />
                      ),
                    },
                  ]}
                />
              </div>
            }
          >
            <NoContent
              className="h-[calc(100dvh-160px)]"
              title="No job data"
              icon={BriefcaseBusiness}
            />
          </Show>
        </section>
        <Show when={!isNull(jobDetails)}>
          <JobDetailCard hideApply hideFavorite {...jobDetails} />
        </Show>
      </div>
    </LayoutWithSidebar>
  );
}
