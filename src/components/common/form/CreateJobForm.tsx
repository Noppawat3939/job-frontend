import { CreateNewJobSchema, createNewJobSchema } from "@/schemas";
import { MultiInputForm, SelectItem } from ".";
import { Button, Input, Label } from "@/components";
import {
  CREATE_JOB_FIELDS,
  JOB_EXP_LEVEL,
  JOB_TYPE,
  QUERY_KEY,
  WORK_STYLES,
} from "@/constants";
import { useQuery } from "@tanstack/react-query";
import { publicService } from "@/services";
import { formatNumber, mappingFormFields, numOnly } from "@/lib";
import { useCallback, useEffect, useState, useTransition } from "react";
import { useHandleForm } from "@/hooks";

type CreatedField = keyof typeof initial;
type ExcludedArrayFields = Exclude<
  CreatedField,
  | "jobDescriptions"
  | "qualifications"
  | "benefits"
  | "contracts"
  | "transports"
  | "salaryMin"
  | "salaryMax"
>;

type CreateJobFormProps = {
  onSubmit: (data: CreateNewJobSchema) => void;
  loading?: boolean;
  resetWhen?: boolean;
  onCancel: () => void;
};

const initial = {
  position: "",
  style: "",
  jobType: "",
  experienceLevel: "",
  category: "",
  salaryMin: 0,
  salaryMax: 0,
  location: "",
  jobDescriptions: "",
  qualifications: "",
  benefits: "",
  contracts: "",
  transports: "",
};

const separate = "•";
const SELECT_COMPONENT = ["category", "style", "jobType", "experienceLevel"];
const MULTIPLE_INPUT_COMPONENT = [
  "jobDescriptions",
  "qualifications",
  "benefits",
  "contracts",
  "transports",
];
const SALARY_COMPONENT = ["salaryMin", "salaryMax"];

export default function CreateJobForm({
  onSubmit,
  loading,
  resetWhen,
  onCancel,
}: CreateJobFormProps) {
  const { data: categories } = useQuery({
    queryKey: [QUERY_KEY.GET_JOB_CATEGORIES],
    queryFn: publicService.getJobCategories,
    select: ({ data }) =>
      data.sort((a, b) => a.category_name.localeCompare(b.category_name)),
  });

  const [isPending, startTransition] = useTransition();

  const [createValues, setCreateValues] = useState(initial);

  useEffect(() => {
    if (resetWhen) {
      setCreateValues(initial);
    }
  }, [resetWhen]);

  const onValueChange = useCallback(
    (key: CreatedField, value: string | number) => {
      setCreateValues((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const mappedValues = {
    position: createValues.position,
    location: createValues.location,
    style: createValues.style,
    jobType: createValues.jobType,
    experienceLevel: createValues.experienceLevel,
    category: createValues.category,
    jobDescriptions: createValues.jobDescriptions.split(separate),
    qualifications: createValues.qualifications.split(separate),
    benefits: createValues.benefits.split(separate),
    contracts: createValues.contracts.split(separate),
    transports: createValues.transports.split(separate),
    salary: [createValues.salaryMin, createValues.salaryMax],
  } as CreateNewJobSchema;

  const {
    error,
    action,
    isPending: pending,
  } = useHandleForm<CreateNewJobSchema>(
    createNewJobSchema,
    mappedValues,
    (data) => onSubmit(data)
  );

  const mappingSelectOptions = {
    category: categories?.map((category) => ({
      label: category.category_name,
      value: category.category_key,
    })),
    jobType: JOB_TYPE.map((type) => ({ label: type, value: type })),
    experienceLevel: JOB_EXP_LEVEL.map((exp) => ({ label: exp, value: exp })),
    style: WORK_STYLES.map((style) => ({ label: style, value: style })),
  };

  return (
    <form action={action} aria-label="create-job-form">
      <div className="grid grid-cols-2 gap-2 ">
        {CREATE_JOB_FIELDS.map((field) => {
          if (SELECT_COMPONENT.includes(field)) {
            return (
              <div key={field}>
                <Label htmlFor={field} className="capitalize">
                  {mappingFormFields[field]}
                </Label>
                <SelectItem
                  onChange={(value) =>
                    onValueChange(field as CreatedField, value)
                  }
                  value={createValues[field as ExcludedArrayFields]}
                  items={
                    mappingSelectOptions[
                      field as keyof typeof mappingSelectOptions
                    ] ?? []
                  }
                />
                {error?.[field as keyof typeof error] && (
                  <sup className="text-red-500">
                    {error[field as keyof typeof error]}
                  </sup>
                )}
              </div>
            );
          }

          if (MULTIPLE_INPUT_COMPONENT.includes(field)) {
            return (
              <div key={field}>
                <Label className="capitalize" htmlFor={field}>
                  {mappingFormFields[field]}
                </Label>
                <MultiInputForm
                  name={field}
                  separate={separate}
                  label={mappingFormFields[field]}
                  values={String(createValues[field])}
                  onAddValue={(values) => {
                    let data: string;

                    const {
                      url: { url, text },
                      list,
                    } = values[field];

                    const aTag = `<a target='_blank' href='${url}' >${
                      text || "click"
                    }</a>`;

                    const addedOrder = list.map((l, i) => `${i + 1}. ${l}`);

                    data = url
                      ? [...addedOrder, aTag].join(separate)
                      : addedOrder.join(separate);

                    onValueChange(field as CreatedField, data);
                  }}
                />
              </div>
            );
          }

          if (SALARY_COMPONENT.includes(field)) {
            return (
              <div key={field}>
                <Label className="capitalize" htmlFor={field}>
                  {mappingFormFields[field]}
                </Label>
                <div className="flex">
                  <Input
                    name={field}
                    value={formatNumber(createValues[field as CreatedField])}
                    onChange={({ target: { name, value } }) =>
                      onValueChange(name as CreatedField, +numOnly(value))
                    }
                  />
                </div>
              </div>
            );
          }

          return (
            <div key={field}>
              <Label className="capitalize" htmlFor={field}>
                {mappingFormFields[field]}
              </Label>
              <Input
                name={field}
                value={createValues[field as CreatedField]}
                aria-label={field}
                onChange={({ target: { name, value } }) =>
                  onValueChange(name as CreatedField, value)
                }
              />
              {error?.[field as keyof typeof error] && (
                <sup className="text-red-500">
                  {error[field as keyof typeof error]}
                </sup>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-6 p-4 flex justify-center space-x-3">
        <Button
          type="reset"
          variant="outline"
          className="w-[150px]"
          onClick={() => startTransition(onCancel)}
          loading={isPending}
        >
          {"Cancel"}
        </Button>
        <Button
          loading={pending || loading}
          className="bg-sky-400 hover:bg-sky-500 w-[150px]"
          type="submit"
          variant="sky-shadow"
        >
          {"Create"}
        </Button>
      </div>
    </form>
  );
}
