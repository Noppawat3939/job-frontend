import {
  Alert,
  BadgeWorkStyle,
  Card,
  ContentLayout,
  JobDetailCard,
  JobPreviewLoader,
  Lazyload,
  Show,
  Spinner,
  useToast,
} from "@/components";
import { QUERY_KEY } from "@/constants";
import { useToggle } from "@/hooks";
import { diffTime, eq, formatPrice } from "@/lib";
import { jobService, publicService } from "@/services";
import { useSigninDialog, userStore } from "@/store";
import { Job, JobWithCompany, Nullable, ServiceErrorResponse } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { BriefcaseBusiness } from "lucide-react";
import { useRouter } from "next/navigation";
import { Fragment, useState, useTransition } from "react";

type JobsProps = {
  jobs?: JobWithCompany[];
  loading: boolean;
};

export default function Jobs({ jobs, loading }: JobsProps) {
  const router = useRouter();

  const { user } = userStore();
  const { setOpen } = useSigninDialog();
  const { toast } = useToast();

  const [, startTransition] = useTransition();

  const {
    state: { active: openJobAppliedModal },
    handle: { setToggle: setOpenJobAppliedModal },
  } = useToggle();

  const [selectJob, setSelectJob] = useState<Nullable<Job>>(null);

  const { mutate: getJobById, isPending } = useMutation({
    mutationFn: user ? jobService.fetchJob : publicService.getPublicJob,
    onSuccess: ({ data }) => setSelectJob(data),
    mutationKey: [user ? QUERY_KEY.GET_JOB : QUERY_KEY.GET_PUBLIC_JOB],
  });

  const { mutate: applyJob } = useMutation({
    mutationFn: jobService.applyJob,
    onSuccess: ({ message }) => {
      if (message) {
        selectJob && getJobById(selectJob.id);

        setOpenJobAppliedModal(true);
      }
    },
    onError: (e) => {
      const error = e as AxiosError;
      const {
        data: { message },
      } = error.response as ServiceErrorResponse;
      toast({ title: message, duration: 1500, variant: "destructive" });
    },
  });

  const { mutate: favoriteJob } = useMutation({
    mutationFn: jobService.favoriteJob,
    onSuccess: (res) => {
      if (res.message) {
        toast({ title: res.message, variant: "success" });
        selectJob && getJobById(selectJob.id);
      }
    },
  });

  const handleApply = (jobId: number) => {
    if (user) {
      applyJob(String(jobId));
      return;
    }

    setOpen();
  };

  const handleFavorite = (jobId: number) => {
    if (user) {
      favoriteJob(String(jobId));

      return;
    }

    setOpen();
  };

  const goToJobApplied = () => {
    router.push("/my-jobs?tab=apply");
    startTransition(router.refresh);
  };

  return (
    <Fragment>
      <ContentLayout>
        <div className="flex space-x-4 max-h-[calc(100dvh-100px)] h-full">
          <div className="flex flex-[.4] overflow-y-auto">
            <div className="flex flex-col gap-y-3 w-full">
              {loading
                ? Array.from({ length: 5 })
                    .fill("")
                    .map((_, i) => <JobPreviewLoader key={`loader_${i}`} />)
                : jobs?.map((job) => {
                    const jobPostedDay = diffTime(
                      job.createdAt,
                      undefined,
                      "day"
                    );

                    return (
                      <Card.Card
                        className="cursor-pointer"
                        onClick={() =>
                          ((selectJob && selectJob.id !== job.id) ||
                            !selectJob) &&
                          getJobById(job.id)
                        }
                        key={job.id}
                      >
                        <Card.CardHeader className="flex-row gap-2 items-center">
                          <picture>
                            <img
                              loading="lazy"
                              alt="profile"
                              className="w-[48px] h-[48px] rounded-full object-cover"
                              src={job.company.userProfile}
                            />
                          </picture>

                          <div className="flex flex-col relative w-full">
                            <Card.CardTitle className="text-xl font-medium">
                              {job.position}
                            </Card.CardTitle>
                            <Card.CardDescription>
                              {job.company.companyName}
                            </Card.CardDescription>
                          </div>
                        </Card.CardHeader>
                        <Card.CardContent>
                          <ul className="flex-col flex gap-y-2">
                            <p aria-label="location">{job.location}</p>
                            <p aria-label="salary">{formatPrice(job.salary)}</p>
                            <BadgeWorkStyle value={job.style} />
                          </ul>
                        </Card.CardContent>
                        <Card.CardFooter>
                          <p
                            aria-label="posted-at"
                            className="text-sm text-gray-600"
                          >
                            {eq(jobPostedDay, 0)
                              ? "today"
                              : `${jobPostedDay} days ago`}
                          </p>
                        </Card.CardFooter>
                      </Card.Card>
                    );
                  })}
            </div>
          </div>
          <div className="flex flex-[.6]">
            {!isPending && !selectJob && (
              <div className="p-[50px] bg-gradient-to-b from-indigo-50 via-purple-100 to-pink-50 w-full items-center justify-center flex flex-col rounded-xl">
                <div className="flex flex-col mx-auto w-fit">
                  <center className="bg-white/30 w-fit mx-auto p-4 rounded-full">
                    <BriefcaseBusiness className="w-[36px] h-[36px] text-purple-500" />
                  </center>
                  <h1 className="text-slate-700 mt-4 text-5xl font-semibold">
                    {"Select job"}
                  </h1>
                  <div
                    aria-label="line"
                    className="bg-purple-500 mt-[24px] mb-2 w-[120px] h-2 rounded-md"
                  />
                  <p className="text-purple-300 text-md">
                    {"Show details here"}
                  </p>
                </div>
              </div>
            )}
            <Show when={isPending}>
              <div className="flex w-full items-center justify-center">
                <Spinner label={""} />
              </div>
            </Show>

            {!isPending && selectJob && (
              <JobDetailCard
                {...selectJob}
                onApply={handleApply}
                onFavorite={handleFavorite}
              />
            )}
          </div>
        </div>
      </ContentLayout>
      <Alert
        open={openJobAppliedModal}
        closeable={false}
        cancelText="Close"
        title={"Job applied is successfully"}
        description={"please wait company review your application"}
        okText={"View applied job"}
        onOpenChange={setOpenJobAppliedModal}
        onOk={goToJobApplied}
        onCancel={() => setOpenJobAppliedModal(false)}
      />
    </Fragment>
  );
}
