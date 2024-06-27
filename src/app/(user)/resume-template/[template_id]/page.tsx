"use client";

import {
  Alert,
  ContentLayout,
  Lazyload,
  ResumeForm,
  ResumePreview,
  useToast,
} from "@/components";
import { useChangeTitleWindow, useToggle } from "@/hooks";
import { docsService } from "@/services";
import type { ServiceErrorResponse } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { Fragment } from "react";

export default function ResumeTempletePage() {
  useChangeTitleWindow("Create template | Jobify.co");

  const router = useRouter();

  const { toast } = useToast();
  const {
    handle: { setToggle: setAlert },
    state: { active: openAlert },
  } = useToggle();

  const { mutate: createResume } = useMutation({
    mutationFn: docsService.createResume,
    onError: (e) => {
      const err = e as AxiosError;
      const error = err.response as ServiceErrorResponse;
      toast({
        title: error.data.message,
        variant: "destructive",
        duration: 1500,
      });
    },
    onSuccess: () => setAlert(true),
  });

  const goToMyResume = () => {
    setAlert(false);
    router.push("/resume-template/list"); //TODO: change to my-resume
  };

  return (
    <Fragment>
      <ContentLayout className="bg-slate-200 rounded-md px-6 pt-4 pb-[3rem]">
        <div className="flex space-x-10">
          <div className="flex-[.5] overscroll-y-auto">
            <Lazyload>
              <ResumeForm onSubmit={createResume} />
            </Lazyload>
          </div>
          <div className="max-w-[600px] w-full border-4 border-red-500 fixed h-full max-h-[800px] right-[100px] top-[100px]">
            <ResumePreview />
          </div>
        </div>
      </ContentLayout>
      <Alert
        open={openAlert}
        onOpenChange={setAlert}
        closeable={false}
        title="Created Resume is successfully"
        okText="View template"
        onOk={goToMyResume}
        onCancel={goToMyResume}
        okButtonProps={{ variant: "primary" }}
      />
    </Fragment>
  );
}
