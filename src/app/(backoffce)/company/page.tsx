"use client";

import { Badge, DataTable, FormInput } from "@/components";
import { DATE_FORMAT } from "@/constants";
import {
  cn,
  formatDate,
  formatPrice,
  mappingApproveStyleClass,
  mappingJobApprove,
  mappingJobType,
  mappingWorkStyle,
} from "@/lib";
import { companyService } from "@/services";
import { useQuery } from "@tanstack/react-query";

export default function CompanyPage() {
  const { data: jobs, isLoading } = useQuery({
    queryKey: ["company-jobs"],
    queryFn: companyService.fetchCompanyJobs,
  });

  const mappedCompanyJobs = jobs?.data.map((job) => ({
    key: String(job.id),
    postion: job.position,
    jobType: mappingJobType[job.jobType],
    style: mappingWorkStyle[job.style],
    salary: formatPrice(job.salary),
    createdAt: formatDate(job.createdAt, DATE_FORMAT),
    status: mappingJobApprove(job.active),
  }));

  return (
    <div className="overflow-y-auto max-h-[90vh]">
      <div className="flex">
        <FormInput disabled placeholder="Search keyword" />
      </div>
      <DataTable
        loading={isLoading}
        name="companyJobs"
        data={mappedCompanyJobs ?? []}
        columns={[
          { key: "position", dataIndex: "position", title: "Position" },
          { key: "job_type", dataIndex: "jobType", title: "Job type" },
          { key: "style", dataIndex: "style", title: "Work style" },
          { key: "salary", dataIndex: "salary", title: "Salary" },
          { key: "createdAt", dataIndex: "createdAt", title: "Created at" },
          {
            key: "status",
            dataIndex: "status",
            title: "Status",
            render: (status) => (
              <Badge
                className={cn(
                  "w-[130px] flex justify-center uppercase",
                  mappingApproveStyleClass[status]
                )}
              >
                {status}
              </Badge>
            ),
          },
        ]}
      />
    </div>
  );
}
