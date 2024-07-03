"use client";

import {
  Alert,
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
    router.push("/my-resume");
  };

  return (
    <Fragment>
      <section className="min-h-[calc(100vh-80px)] h-full">
        <Lazyload>
          <div className="flex overflow-y-auto">
            <ResumeForm onSubmit={createResume} />
            <div className="bg-card-foreground/90 flex justify-center items-center fixed w-[50%] right-0 h-[calc(100vh-80px)]">
              <ResumePreview />
            </div>
          </div>
        </Lazyload>
      </section>
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
