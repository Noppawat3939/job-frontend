"use client";

import {
  Button,
  DialogInputSearch,
  JobPreview,
  JobPreviewLoader,
} from "@/components";
import { useFetchJobsUser } from "@/hooks";
import { formatNumber } from "@/lib";
import { userStore } from "@/store";
import { LayoutGrid, List } from "lucide-react";
import Link from "next/link";

const fakeJobsLoader = Array.from({ length: 8 }).fill("");

const SALARY_OPTIONS = {
  from: [0, 10000, 20000, 40000, 80000, 100000],
  to: [0, 10000, 20000, 40000, 80000, 100000, 200000],
};

export default function FindJobs() {
  const {
    jobsQuery,
    state: { jobs },
  } = useFetchJobsUser();

  const { user } = userStore((s) => ({ user: s.user }));

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

  // const displayFilterOptions = {
  //   industries: industries.map((industry) => ({
  //     label: industry.name?.toLowerCase(),
  //     value: industry.name,
  //   })),
  //   salary: salaryOptions,
  //   jobType: Object.values(JOB_TYPE).map((value) => ({ label: value, value })),
  //   workStyle: WORK_STYLES.map((style) => ({
  //     label: pretty(style),
  //     value: style,
  //   })),
  //   provinces: provinces.map((province) => ({
  //     label: province.name.th,
  //     value: province.code,
  //   })),
  //   categories: categories.map((category) => ({
  //     label: category.category_name,
  //     value: category.category_key,
  //   })),
  //   experiences: Object.values(JOB_EXP_LEVEL).map((exp) => ({
  //     label: exp,
  //     value: exp,
  //   })),
  // };

  return (
    <section className="flex h-[calc(100vh-80px)]" role="jobs-container">
      {/* <div className="h-full py-4 px-3 flex-[0.25] max-lg:flex-[0.3] rounded-lg shadow-sm bg-gradient-to-t from-sky-100 to-sky-200">
        <JobsSearch {...displayFilterOptions} onSearch={handleSearch} />
      </div> */}
      <div className="flex-1 flex-col flex space-y-5 px-4 overflow-y-scroll">
        {jobsQuery.isFetched && (
          <div className="flex items-center">
            <div aria-label="search-box">
              <DialogInputSearch />
            </div>

            <div
              aria-label="job-layout"
              className="flex text-sm items-center ml-auto w-fit"
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
        )}

        {jobsQuery.isFetching &&
          fakeJobsLoader.map((loader, i) => (
            <JobPreviewLoader key={`loader_${i}_${loader}`} />
          ))}
        {jobsQuery.isFetched &&
          jobs?.map((job, i) => (
            <Link
              key={`job_${job}_${i}`}
              href={`/job/${job.id}`}
              referrerPolicy="no-referrer"
              target={user?.email ? undefined : "_blank"}
            >
              <JobPreview {...job} />
            </Link>
          ))}
      </div>
    </section>
  );
}
