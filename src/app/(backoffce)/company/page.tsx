"use client";

import {
  Badge,
  Button,
  DataTable,
  FormInput,
  JobDetailCard,
  Show,
} from "@/components";
import { DATE_FORMAT } from "@/constants";
import {
  cn,
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
import { Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function CompanyPage() {
  const [jobDetails, setJobDetails] = useState<Job | undefined>();

  const { data: jobs, isLoading } = useQuery({
    queryKey: ["company-jobs"],
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
    <div className="overflow-y-auto max-h-[90vh]">
      <div className="flex justify-between p-2">
        <FormInput disabled placeholder="Search keyword" />
        <Button size="sm" asChild>
          <Link href={"/company/posts/new"} referrerPolicy="no-referrer">
            <Plus className="w-3 h-3 mr-2" />
            {"Create new job"}
          </Link>
        </Button>
      </div>
      <section className="flex">
        <div aria-label="jobs-list" className="flex-1">
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
        <Show when={!isUndifined(jobDetails?.position)}>
          <div
            aria-label="job-details"
            className="flex bg-slate-50 overflow-y-auto py-2 px-4 flex-[0.6] h-[calc(100vh-120px)]"
          >
            <JobDetailCard
              {...jobDetails}
              onClose={() => setJobDetails(undefined)}
            />
          </div>
        </Show>
      </section>
    </div>
  );
}
