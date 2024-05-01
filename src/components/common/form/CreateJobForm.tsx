import { CreateNewJobSchema, createNewJobSchema } from "@/schemas";
import { useFormState, useFormStatus } from "react-dom";
import { MultiInputForm, SelectItem } from ".";
import { Button, Input, Label, Textarea } from "@/components";
import { JOB_EXP_LEVEL, JOB_TYPE, QUERY_KEY, WORK_STYLES } from "@/constants";
import { useQuery } from "@tanstack/react-query";
import { publicService } from "@/services";
import { mappingFormFields, numOnly } from "@/lib";
import { useCallback, useState } from "react";

const CREATE_JOB_FIELDS = [
  "position",
  "style",
  "jobType",
  "experienceLevel",
  "category",
  "salaryMin",
  "salaryMax",
  "location",
  "jobDescriptions",
  "qualifications",
  "benefits",
  "contracts",
  "transports",
] as const;

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

type CreateJobFormProps = { onSubmit: (data: CreateNewJobSchema) => void };

export default function CreateJobForm({ onSubmit }: CreateJobFormProps) {
  const { data: categories } = useQuery({
    queryKey: [QUERY_KEY.GET_JOB_CATEGORIES],
    queryFn: publicService.getJobCategories,
    select: ({ data }) =>
      data.sort((a, b) => a.category_name.localeCompare(b.category_name)),
  });

  const [createValues, setCreateValues] = useState(initial);

  const onValueChange = useCallback(
    (key: CreatedField, value: string | number) => {
      setCreateValues((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const [error, action] = useFormState(() => {
    const mappedValues = {
      position: createValues.position,
      location: createValues.location,
      style: createValues.style,
      jobType: createValues.jobType,
      experienceLevel: createValues.experienceLevel,
      category: createValues.category,
      jobDescriptions: createValues.jobDescriptions,
      qualifications: createValues.qualifications,
      benefits: createValues.benefits,
      contracts: createValues.contracts.split(","),
      transports: createValues.transports.split(","),
      salary: [createValues.salaryMin, createValues.salaryMax],
    };

    const res = createNewJobSchema.safeParse(
      Object.fromEntries(Object.entries(createValues))
    );

    if (!res.success) {
      return res.error.formErrors.fieldErrors;
    }

    return onSubmit(res.data);
  }, {});

  const { pending } = useFormStatus();

  const mappingSelectOptions = {
    category: categories?.map((category) => ({
      label: category.category_name,
      value: category.category_key,
    })),
    jobType: JOB_TYPE.map((type) => ({ label: type, value: type })),
    experienceLevel: JOB_EXP_LEVEL.map((exp) => ({ label: exp, value: exp })),
    style: WORK_STYLES.map((style) => ({ label: style, value: style })),
  };

  console.log(createValues);

  return (
    <form action={action} aria-label="create-job-form">
      <div className="grid grid-cols-2 gap-2 ">
        {CREATE_JOB_FIELDS.map((field) => {
          if (
            ["category", "style", "jobType", "experienceLevel"].includes(field)
          ) {
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

          if (
            [
              "jobDescriptions",
              "qualifications",
              "benefits",
              "contracts",
              "transports",
            ].includes(field)
          ) {
            return (
              <div key={field}>
                <Label className="capitalize" htmlFor={field}>
                  {mappingFormFields[field]}
                </Label>
                {/* <MultiInputForm
                  value={createValues[field] as string[]}
                  onChange={(value) => onValueChange(field, value)}
                /> */}
                <Textarea
                  aria-label={field}
                  name={field}
                  value={createValues[field as CreatedField]}
                  onChange={({ target: { value, name } }) =>
                    onValueChange(name as CreatedField, value)
                  }
                  className="h-[80px] resize-none"
                  onKeyUp={(e) => {
                    e.preventDefault();

                    if (e.code === "Enter") {
                      const _value = `${createValues[field as CreatedField]}-`;

                      onValueChange(field as CreatedField, _value);
                    }
                  }}
                />
              </div>
            );
          }

          if (["salaryMin", "salaryMax"].includes(field)) {
            return (
              <div key="salary">
                <Label className="capitalize" htmlFor={field}>
                  {mappingFormFields[field]}
                </Label>
                <div className="flex">
                  <Input
                    name={field}
                    value={createValues[field as CreatedField]}
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
        <Button type="reset" variant="outline" className="w-[150px]">
          {"Cancel"}
        </Button>
        <Button
          loading={pending}
          className="bg-sky-400 hover:bg-sky-500 w-[150px]"
          type="submit"
        >
          {"Create"}
        </Button>
      </div>
    </form>
  );
}
