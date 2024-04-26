"use client";

import {
  Button,
  FormInput,
  JobPreview,
  JobPreviewLoader,
  JobsSearch,
  Label,
  SelectItem,
} from "@/components";
import { JOB_TYPE, WORK_STYLES } from "@/constants";
import { useFetchJobsUser } from "@/hooks";
import { formatNumber } from "@/lib";
import { LayoutGrid, List } from "lucide-react";
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
    state: { jobs, industries, provinces },
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

  const displayFilterOptions = {
    industries: industries.map((industry) => ({
      label: industry.name?.toLowerCase(),
      value: industry.name,
    })),
    salary: salaryOptions,
    jobType: Object.values(JOB_TYPE).map((value) => ({ label: value, value })),
    workStyle: WORK_STYLES.map((style) => ({
      label: style.replaceAll("_", " "),
      value: style,
    })),
    provinces: provinces.map((province) => ({
      label: province.name.th,
      value: province.code,
    })),
  };

  const handleSearch = (
    values?: Record<
      | Exclude<keyof typeof displayFilterOptions, "salary">
      | "salaryTo"
      | "salaryFrom",
      string
    >
  ) => {
    console.log(values);
  };

  return (
    <section className="flex h-[calc(100vh-80px)]" role="jobs-container">
      <div className="h-full py-4 px-3 flex-[0.25] max-lg:flex-[0.3] rounded-lg shadow-sm bg-gradient-to-t from-sky-100 to-sky-200">
        <JobsSearch {...displayFilterOptions} onSearch={handleSearch} />
      </div>
      <div className="flex-[0.75] flex-col flex space-y-5 px-4 max-lg:flex-[0.7] overflow-y-scroll">
        <div className="flex items-stretch">
          <Button
            size="sm"
            variant="outline"
            className="flex font-normal text-slate-400 items-center hover:bg-slate-100"
            role="search-btn"
          >
            {"Search position, company or keyword"}
            <kbd className="bg-slate-100 ml-2 text-xs flex gap-1 items-center py-1 px-2  rounded-sm text-slate-400">
              <span className="text-sm">⌘</span>K
            </kbd>
          </Button>
          <div
            role="job-layout"
            className="flex text-sm rounded-md items-center ml-auto w-fit"
          >
            <p className="mr-1 text-slate-600">{"View"}</p>
            <Button variant="ghost" size="icon">
              <List className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <LayoutGrid className="w-5 h-5" />
            </Button>
          </div>
        </div>
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
