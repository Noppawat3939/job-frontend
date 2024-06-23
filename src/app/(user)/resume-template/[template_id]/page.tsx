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
    <Lazyload>
      <ContentLayout className="bg-slate-200 rounded-md px-6 pt-4 pb-[3rem] h-full">
        <div className="flex space-x-10">
          <div className="flex-1">
            <ResumeForm onSubmit={createResume} />
          </div>
          <div className="flex-1">
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
    </Lazyload>
  );
}
