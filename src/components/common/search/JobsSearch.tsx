import { Button, Label } from "@/components";
import { SelectItem, Show } from "..";
import { useCallback, useState } from "react";

type Items = { label: string; value: string }[];

type JobsSearchProps = {
  industries?: Items;
  salary?: { from: Items; to: Items };
  jobType?: Items;
  workStyle?: Items;
  provinces?: Items;
  onSearch?: (arg?: Record<string, string>) => void;
};

type SearchValues = {
  industry: string;
  jobType: string;
  workStyle: string;
  salaryFrom: string;
  salaryTo: string;
  province: string;
};

const FILTER_KEY = {
  INDUSTRY: "industry-filter-options",
  JOB_TYPE: "job-type-filter-options",
  WORK_STYLE: "work-style-filter-options",
  SALARY: "salary-filter-options",
  PROVINCE: "province-filter-options",
} as const;

const initial = {
  industry: "",
  salaryFrom: "",
  salaryTo: "",
  province: "",
  workStyle: "",
  jobType: "",
};

export default function JobsSearch({
  industries,
  salary,
  jobType,
  workStyle,
  provinces,
  onSearch,
}: JobsSearchProps) {
  const [searchValues, setSearchValues] =
    useState<Partial<SearchValues>>(initial);

  const onSelected = useCallback(
    (key: keyof SearchValues, value: string) =>
      setSearchValues((prev) => ({ ...prev, [key]: value })),
    []
  );

  const reset = useCallback(() => setSearchValues(initial), []);

  return (
    <div role="jobs-search" className="flex flex-col gap-[16px]">
      <span
        onClick={reset}
        className="text-end text-xs cursor-pointer hover:opacity-70 text-sky-800"
      >
        {"Clear All"}
      </span>

      <Show
        key={FILTER_KEY.INDUSTRY}
        when={Array.isArray(industries) && industries?.length > 0}
      >
        <SelectItem
          items={industries!}
          label="Industry"
          value={searchValues.industry}
          onChange={(value) => onSelected("industry", value)}
          className="border-2 mt-[-8px]"
        />
      </Show>

      <Show
        key={FILTER_KEY.SALARY}
        when={
          salary?.from &&
          salary.to &&
          salary?.from.length > 0 &&
          salary?.to.length > 0
        }
      >
        <div className="flex space-y-1 flex-col">
          <div
            datatype="salary"
            className="flex items-baseline justify-between"
          >
            <Label>{"Search by salary"}</Label>
            <span
              onClick={() => {
                onSelected("salaryFrom", "");
                onSelected("salaryTo", "");
              }}
              role="reset-salary"
              className="cursor-pointer text-gray-500 text-xs"
            >
              {"reset"}
            </span>
          </div>

          <div className="flex gap-2 items-center">
            <SelectItem
              key="filter-salary-from"
              items={salary?.from ?? []}
              placeholder="from"
              value={searchValues.salaryFrom}
              onChange={(value) => onSelected("salaryFrom", value)}
            />
            {"-"}
            <SelectItem
              key="filter-salary-to"
              items={salary?.to ?? []}
              placeholder="to"
              value={searchValues.salaryTo}
              onChange={(value) => onSelected("salaryTo", value)}
            />
          </div>
        </div>
      </Show>

      <Show key={FILTER_KEY.JOB_TYPE} when={jobType && jobType?.length > 0}>
        <SelectItem
          label="Job type"
          items={jobType ?? []}
          value={searchValues.jobType}
          onChange={(value) => onSelected("jobType", value)}
        />
      </Show>

      <Show
        key={FILTER_KEY.WORK_STYLE}
        when={workStyle && workStyle?.length > 0}
      >
        <SelectItem
          label="Work style"
          items={workStyle ?? []}
          value={searchValues.workStyle}
          onChange={(value) => onSelected("workStyle", value)}
        />
      </Show>

      <Show key={FILTER_KEY.PROVINCE} when={provinces && provinces?.length > 0}>
        <SelectItem
          label="Province"
          items={provinces ?? []}
          value={searchValues.province}
          onChange={(value) => onSelected("province", value)}
        />
      </Show>

      <div className="flex justify-evenly">
        <Button
          onClick={() => onSearch?.(searchValues)}
          className="w-full max-w-[140px]"
          size="sm"
        >
          {"Search"}
        </Button>
        <Button
          onClick={reset}
          className="w-full max-w-[140px]"
          size="sm"
          variant="outline"
        >
          {"Cancel"}
        </Button>
      </div>
    </div>
  );
}
