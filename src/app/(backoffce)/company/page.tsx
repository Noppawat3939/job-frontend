"use client";

import {
  Badge,
  BadgeJobApprove,
  Button,
  DataTable,
  FormInput,
  LayoutWithSidebar,
  Show,
} from "@/components";
import { DATE_FORMAT, QUERY_KEY } from "@/constants";
import {
  cn,
  eq,
  formatDate,
  formatPrice,
  isUndifined,
  mappingApproveStyleClass,
  mappingJobApprove,
  mappingJobType,
  mappingWorkStyle,
} from "@/lib";
import { companyService } from "@/services";
import type { Job } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { BriefcaseBusiness, FileText, Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function CompanyPage() {
  const pathname = usePathname();

  const [jobDetails, setJobDetails] = useState<Job | undefined>();

  const { data: jobs, isLoading } = useQuery({
    queryKey: [QUERY_KEY.GET_JOBS_BY_COMPANY],
    queryFn: companyService.fetchCompanyJobs,
    select: ({ data }) => data || [],
  });

  const mappedCompanyJobs = jobs?.map((job) => ({
    key: String(job.id),
    postion: job.position,
    jobType: mappingJobType[job.jobType],
    style: mappingWorkStyle[job.style],
    salary: formatPrice(job.salary),
    createdAt: formatDate(job.createdAt, DATE_FORMAT),
    status: mappingJobApprove(job.active),
  }));

  const handleSelectJob = (jobId: number) => {
    const found = jobs?.find((job) => job.id === jobId);
    setJobDetails(found);
  };

  return (
    <LayoutWithSidebar
      menu={[
        {
          items: [
            {
              label: "Jobs",
              value: "jobs",
              path: "/company",
              active: eq(pathname, "/company"),
              leftIcon: BriefcaseBusiness,
            },
            {
              label: "Job applied",
              value: "jop applied",
              path: "/company/applied",
              leftIcon: FileText,
              active: eq(pathname, "/company/applied"),
            },
          ],
        },
      ]}
    >
      <div className="overflow-y-auto max-h-[90vh]">
        <div className="flex justify-between p-2">
          <FormInput disabled placeholder="Search keyword" />
          <Button variant={"purple-shadow"} size="sm" asChild>
            <Link href={"/company/new"} referrerPolicy="no-referrer">
              <Plus className="w-3 h-3 mr-2" />
              {"Create new job"}
            </Link>
          </Button>
        </div>
        <section className="flex">
          <div aria-label="jobs-list" className="flex-1 px-4">
            <DataTable
              loading={isLoading}
              name="companyJobs"
              data={mappedCompanyJobs ?? []}
              onRow={(data) => handleSelectJob(Number(data?.key))}
              columns={[
                { key: "position", dataIndex: "position", title: "Position" },
                { key: "job_type", dataIndex: "jobType", title: "Job type" },
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
        </section>
      </div>
    </LayoutWithSidebar>
  );
}
