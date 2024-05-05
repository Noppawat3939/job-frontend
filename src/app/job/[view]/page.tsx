"use client";

import { useEffect, useMemo, useTransition } from "react";
import {
  Button,
  ContentLayout,
  JobDetailSectionProps,
  JobHightlightSection,
  useToast,
} from "@/components";
import { useChangeTitleWindow, useToggle } from "@/hooks";
import {
  eq,
  isUndifined,
  mappingHightlightJob,
  mappingJobDetail,
  reloadPage,
} from "@/lib";
import { jobService, publicService } from "@/services";
import { useMutation, useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { Heart } from "lucide-react";
import { QUERY_KEY } from "@/constants";
import cover from "@/assets/cover/job_cover.jpg";
import Image from "next/image";
import { useSigninDialog, userStore } from "@/store";
import type { Job, ServiceErrorResponse } from "@/types";
import { type AxiosError } from "axios";

type ViewJobPageProps = {
  params: { view: string };
};

type MarkDataLocalstorage = {
  mark_job_id: string;
  timestamp: string;
};

const LOCALSTORAGE_KEY = "mark_job";

export default function ViewJobPage({ params }: ViewJobPageProps) {
  const { user } = userStore();
  const { toast } = useToast();

  const [isPending, startTransition] = useTransition();

  const isLoggined = eq(user?.role, "user");

  const { data: logginedData, isLoading: loaddingLogginedJob } = useQuery({
    queryKey: [QUERY_KEY.GET_JOB, params.view, isLoggined],
    queryFn: () => jobService.fetchJob(Number(params.view)),
    select: ({ data }) => data,
    enabled: isLoggined,
  });

  const { data: unLogginData, isLoading: loadingUnLogginJob } = useQuery({
    queryKey: [QUERY_KEY.GET_PUBLIC_JOB, params.view, isLoggined],
    queryFn: () => publicService.getPublicJob(params.view),
    select: ({ data }) => data,
    enabled: !isUndifined(user) ? !isLoggined : false,
  });

  const job = useMemo(
    () => (isLoggined ? logginedData : unLogginData) as Job,
    [isLoggined, logginedData, unLogginData]
  );

  const isLoading = [loadingUnLogginJob, loaddingLogginedJob, isPending].some(
    Boolean
  );

  const { mutate: applyJob } = useMutation({
    mutationFn: jobService.applyJob,
    onError: (e) => {
      const error = e as AxiosError;
      const {
        data: { message: title },
      } = error.response as ServiceErrorResponse;

      toast({ title });
    },
    onSuccess: ({ message }) => {
      toast({ title: message || "Applied job" });
      startTransition(reloadPage);
    },
  });

  const {
    handle: { setToggle: setMarked },
    state: { active: marked },
  } = useToggle();

  const { openSigninDialog } = useSigninDialog((s) => ({
    openSigninDialog: s.setOpen,
  }));

  useChangeTitleWindow(job && `${job.position} - ${job.company} | Jobify.com`);

  useEffect(() => {
    const prevMark = window.localStorage.getItem(LOCALSTORAGE_KEY);

    if (!isUndifined(window)) {
      if (prevMark) {
        const hasMarked = (JSON.parse(prevMark) as MarkDataLocalstorage[]).find(
          (data) => eq(data.mark_job_id, params.view)
        );

        setMarked(Boolean(hasMarked?.mark_job_id));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const memorizedHighlightsJob = useMemo(
    () =>
      mappingHightlightJob(job).map((data) => ({
        ...data,
        icon: <data.icon className="w-4 h-4" />,
      })),
    [job]
  );

  const memorizedDetailsJob = useMemo(() => mappingJobDetail(job), [job]);
  const isApplied = !isUndifined(job?.applicationStatus);

  const handleMarkWithoutLogin = () => {
    const markData = {
      mark_job_id: params.view,
      timestamp: dayjs().toISOString(),
    };

    if (typeof window !== "undefined") {
      let data = [];

      const prevMark = window.localStorage.getItem(LOCALSTORAGE_KEY);

      if (prevMark) {
        const parsed = JSON.parse(prevMark) as MarkDataLocalstorage[];
        const duplicate = parsed.find(
          (data) => data.mark_job_id === params.view
        );

        if (duplicate?.mark_job_id) {
          data = parsed.filter((data) => data.mark_job_id !== params.view);
          setMarked(false);
        } else {
          data = [...parsed, markData];
          setMarked(true);
        }
      } else {
        data = [markData];
      }

      window.localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(data));
    }
  };

  return (
    <section
      role="job-container"
      className="flex space-x-2 px-[3%] max-md:px-[2%]"
    >
      {/* <div className="flex-[0.2] bg-sky-100 border border-sky-400 max-md:hidden">
        {"suggest other jobs"}
      </div> */}
      <ContentLayout className="flex-1 max-md:flex-1 max-md:px-2 overflow-y-auto pb-[20px]">
        <Image
          className="max-h-[250px] max-md:max-h-[200px] object-cover w-full bg-right"
          src={cover}
          alt="job-cover"
        />
        <div className="py-3 flex justify-between sticky top-0 bg-white z-10">
          <h2 className="text-4xl font-medium max-md:text-3xl">
            {job?.position}
          </h2>
          <div className="flex space-x-2">
            <Button
              onClick={() =>
                isLoggined ? applyJob(String(job?.id)) : openSigninDialog()
              }
              size="sm"
              loading={isLoading}
              className="w-[100px] bg-sky-400 hover:bg-sky-500"
            >
              {isApplied ? "Applied" : "Apply"}
            </Button>
            <Button
              onClick={handleMarkWithoutLogin}
              size="icon"
              role="mark-job-btn"
              variant="link"
            >
              {marked ? (
                <Heart className="h-5 w-5 text-sky-500" />
              ) : (
                <Heart className="h-5 w-5 " />
              )}
            </Button>
          </div>
        </div>
        <h3 className="text-sky-500 opacity-70 text-lg max-md:text-[15px] z-0">
          {job?.company}
        </h3>
        <section className="px-3">
          <div className="flex flex-col space-y-1 mb-3">
            {memorizedHighlightsJob.map((hightlight, i) => (
              <JobHightlightSection
                {...hightlight}
                key={`hl_${hightlight.key}_${i}`}
                loading={isLoading}
              />
            ))}
          </div>

          <div className="flex flex-col space-y-10 max-w-2xl">
            {memorizedDetailsJob.map((section) => (
              <JobDetailSectionProps
                key={section.key}
                title={section.title}
                items={section.items}
              />
            ))}
          </div>
        </section>
      </ContentLayout>
    </section>
  );
}
