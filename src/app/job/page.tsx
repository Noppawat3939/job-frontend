"use client";

import {
  FormInput,
  Input,
  JobPreview,
  JobPreviewLoader,
  Label,
  SelectItem,
} from "@/components";
import { useFetchJobsUser } from "@/hooks";
import { formatNumber } from "@/lib";
import Link from "next/link";
import { useId, useState } from "react";

const fakeJobsLoader = Array.from({ length: 8 }).fill("");

const SALARY_OPTIONS = {
  from: [0, 10000, 20000, 40000, 80000, 100000],
  to: [0, 10000, 20000, 40000, 80000, 100000, 200000],
};

const initial = {
  filter: {
    search: "",
    industry: "",
    salary: { from: 0, to: 0 },
  },
};

export default function FindJobs() {
  const _id = useId();

  const [filterParamas, setFilterParams] = useState(initial.filter);

  const {
    jobsQuery,
    state: { jobs, industries },
  } = useFetchJobsUser();

  const salaryOptions = {
    from: SALARY_OPTIONS.from.map((num) => ({
      label: formatNumber(num),
      value: String(num),
    })),
    to: [
      ...SALARY_OPTIONS.to.map((num) => ({
        label: formatNumber(num),
        value: String(num),
      })),
      {
        label: `above ${formatNumber(
          SALARY_OPTIONS?.to?.[SALARY_OPTIONS.to.length - 1] || 0
        )}`,
        value: String(SALARY_OPTIONS?.to?.[-1] + 1),
      },
    ],
  };

  return (
    <section className="flex h-[calc(100vh-80px)]" role="jobs-container">
      <div className="h-full py-4 px-3 flex-[0.25] max-lg:flex-[0.3] rounded-lg shadow-md bg-sky-100">
        <div className="flex flex-col gap-[16px]">
          <FormInput
            label="Search"
            placeholder="Search position, keyword or company name..."
          />

          <SelectItem
            items={industries.map((industry) => ({
              label: industry.name,
              value: industry.name,
            }))}
            label="Search by industry"
            className="border-2 mt-[-8px]"
          />

          <div className="flex space-y-1 flex-col">
            <div className="flex items-baseline justify-between">
              <Label>{"Search by salary"}</Label>
              <span className="cursor-pointer text-red-500 font-medium">
                {"reset"}
              </span>
            </div>
            <div className="flex gap-2 items-center">
              <SelectItem
                key="filter-salary-from"
                items={salaryOptions.from}
                placeholder="from"
                value={String(filterParamas.salary.from)}
              />
              {"-"}
              <SelectItem
                key="filter-salary-to"
                items={salaryOptions.to}
                placeholder="to"
                value={String(filterParamas.salary.to)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex-[0.75] flex-col flex space-y-2 px-4 max-lg:flex-[0.7] overflow-y-scroll">
        {jobsQuery.isFetching &&
          fakeJobsLoader.map((loader) => (
            <JobPreviewLoader key={`loader_${_id}_${loader}`} />
          ))}
        {jobsQuery.isFetched &&
          jobs?.map((job) => (
            <Link
              key={_id}
              href={`/job/${job.id}`}
              referrerPolicy="no-referrer"
              target="_blank"
            >
              <JobPreview {...job} />
            </Link>
          ))}
      </div>
    </section>
  );
}
