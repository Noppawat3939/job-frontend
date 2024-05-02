"use client";

import { CreateJobForm, Dialog, Label, useToast } from "@/components";
import { formatPrice, mappingJobExp } from "@/lib";
import { CreateNewJobSchema } from "@/schemas";
import { jobService } from "@/services";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

export default function CreateNewJobPage() {
  const { toast } = useToast();

  const { mutate, isSuccess, isPending } = useMutation({
    mutationFn: jobService.createJob,
    onSuccess: () => {
      toast({
        title: "Job created is successfully",
        description: "Pleasse wait admin approve",
      });
    },
    onError: () => {
      toast({
        title: "Can't create job",
        description: "Please try again letter",
      });
    },
  });

  const [previewData, setPreviewData] = useState<{
    open: boolean;
    data?: CreateNewJobSchema;
  }>({ open: false, data: undefined });

  const data = [
    { key: "position", label: "Position", value: previewData.data?.position },
    { key: "style", label: "Work style", value: previewData.data?.style },
    {
      key: "salary",
      label: "Job salary",
      value: previewData.data?.salary
        ? formatPrice(previewData.data.salary as number[])
        : null,
    },
    {
      key: "category",
      label: "Job category",
      value: previewData.data?.category,
    },
    {
      key: "location",
      label: "Job location",
      value: previewData.data?.location,
    },
    {
      key: "type",
      label: "Job type",
      value: previewData.data?.jobType,
    },
    {
      key: "experience",
      label: "Job experience",
      value:
        mappingJobExp[
          previewData.data?.experienceLevel as keyof typeof mappingJobExp
        ],
    },
    {
      key: "descriptions",
      label: "Job descriptions",
      value: (
        <ul className="flex flex-col gap-2">
          {previewData.data?.jobDescriptions?.map((desc, i) => (
            <li key={`desc_${i}`} className="list-disc">
              {desc}
            </li>
          ))}
        </ul>
      ),
    },
    {
      key: "qualifications",
      label: "Job qualifications",
      value: (
        <ul className="flex flex-col gap-2">
          {previewData.data?.qualifications?.map((qual, i) => (
            <li key={`qual_${i}`} className="list-disc">
              {qual}
            </li>
          ))}
        </ul>
      ),
    },
    {
      key: "transports",
      label: "Job transports",
      value: (
        <ul className="flex flex-col gap-2">
          {previewData.data?.transports?.map((trans, i) => (
            <li key={`trans_${i}`} className="list-disc">
              {trans}
            </li>
          ))}
        </ul>
      ),
    },
    {
      key: "benefits",
      label: "Job benefits",
      value: (
        <ul className="flex flex-col gap-2">
          {previewData.data?.benefits?.map((bef, i) => (
            <li key={`bef_${i}`}>{bef}</li>
          ))}
        </ul>
      ),
    },
    {
      key: "contracts",
      label: "Job contracts",
      value: (
        <ul className="flex flex-col gap-2">
          {previewData.data?.contracts?.map((cont, i) => (
            <li key={`cont_${i}`} className="list-disc">
              {cont}
            </li>
          ))}
        </ul>
      ),
    },
  ];

  const handlePreviewData = (data: CreateNewJobSchema) => mutate(data);

  return (
    <div className="h-full p-4">
      <div className="">
        <h1 className="text-3xl">{"Create a new job"}</h1>
        <div className="mt-3 px-3 h-[calc(100vh-160px)] overflow-y-scroll">
          <CreateJobForm
            onSubmit={handlePreviewData}
            loading={isPending}
            resetWhen={isSuccess}
          />
        </div>
      </div>
      <Dialog.Dialog
        open={previewData.open}
        onOpenChange={(open) => setPreviewData({ data: undefined, open })}
      >
        <Dialog.DialogContent>
          <Dialog.DialogHeader>
            <Dialog.DialogTitle>{"Preview create"}</Dialog.DialogTitle>
          </Dialog.DialogHeader>
          <div className="overflow-y-scroll max-h-[700px] h-full">
            {data.map((item) => (
              <div
                key={item.key}
                className="grid grid-cols-2 space-y-2 items-baseline"
              >
                <Label htmlFor={item.label}>{item.label}</Label>
                <span>{item.value}</span>
              </div>
            ))}
          </div>
        </Dialog.DialogContent>
      </Dialog.Dialog>
    </div>
  );
}
