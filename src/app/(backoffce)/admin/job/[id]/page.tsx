"use client";

import type { JobStatus, RolePageParam } from "@/types";
import { jobService } from "@/services";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  JobDetailSection,
  Alert,
  BadgeJobApprove,
  Button,
  ContentLayout,
  JobHightlightSection,
  Show,
  Spinner,
} from "@/components";
import { useCallback, useMemo, useState, useTransition } from "react";
import { JOB_STATUS, QUERY_KEY } from "@/constants";
import {
  eq,
  isNull,
  isUndifined,
  mappingHightlightJob,
  mappingJobApprove,
  mappingJobApproveLabel,
  mappingJobDetail,
} from "@/lib";
import { ChevronLeft } from "lucide-react";
import { type ButtonProps } from "@/components/ui/button";
import Link from "next/link";
import { useApproveJobHandler } from "@/hooks";
import { userStore } from "@/store";

type ApproveAction = {
  status: JobStatus;
  variant: ButtonProps["variant"];
  hide?: boolean;
};

type AdminJobPageProps = {
  params: { id: string; role: RolePageParam };
};

const initial = {
  alertProps: {
    open: false,
    title: "",
    description: "",
    onOk: () => {},
    okButtonProps: {},
    okText: "",
  },
};

export default function AdminJobPage({ params }: AdminJobPageProps) {
  const { id } = params;

  const queryClient = useQueryClient();

  const {
    data: job,
    isFetching,
    isFetched,
    refetch,
  } = useQuery({
    queryKey: [QUERY_KEY.GET_JOB, id],
    queryFn: () => jobService.fetchJob(+id),
    select: ({ data }) => data,
  });

  const { user } = userStore();

  const isSuperAdmin = eq(user?.role, "super_admin");
  const isAdmin = eq(user?.role, "admin");

  const alertError = useCallback(
    () =>
      setAlertApproveJob((prev) => ({
        ...prev,
        title: "Can not approve job",
        description: "Please try again",
        onOk: () => setAlertApproveJob(initial.alertProps),
      })),
    []
  );

  const { handle } = useApproveJobHandler(() => {
    refetch();
    queryClient.invalidateQueries({ queryKey: [QUERY_KEY.GET_JOBS] });
  }, alertError);

  const [pending, startTransition] = useTransition();

  const [alertApproveJob, setAlertApproveJob] = useState(initial.alertProps);

  const onClosedAlert = useCallback(
    () => startTransition(() => setAlertApproveJob(initial.alertProps)),
    []
  );

  const onOpenAlert = (status: JobStatus) => {
    let alertState = {} as typeof alertApproveJob;

    alertState.description = `Position: ${job?.position}`;

    if (eq(status, JOB_STATUS.APPROVE)) {
      alertState.title = "Are your sure to approve job?";
      alertState.okText = "Confirm";
      alertState.onOk = () => handle.approve(id);
    }
    if (eq(status, JOB_STATUS.REJECT)) {
      alertState.title = "Are your sure to reject job?";
      alertState.okText = "Confirm";
      alertState.onOk = () => handle.reject(id);
    }
    if (eq(status, JOB_STATUS.UN_APPROVE)) {
      alertState.title = "Are your sure to un approve job?";
      alertState.okText = "Confirm";
      alertState.onOk = () => handle.unApprove(id);
    }

    setAlertApproveJob((prevProps) => ({
      ...prevProps,
      ...alertState,
      open: true,
    }));
  };

  const memorizedHighlightsJob = useMemo(
    () =>
      mappingHightlightJob(job).map((data) => ({
        ...data,
        icon: <data.icon className="w-4 h-4" />,
      })),
    [job]
  );

  const memorizedDetailsJob = useMemo(() => mappingJobDetail(job), [job]);

  const displayApproveJobBtn: ApproveAction[] = useMemo(() => {
    if (isNull(job?.active) || isUndifined(job?.active))
      return [
        { status: JOB_STATUS.APPROVE, variant: "default" },
        { status: JOB_STATUS.REJECT, variant: "outline" },
      ];
    if (job?.active)
      return [
        { status: JOB_STATUS.REJECT, variant: "destructive" },
        { status: JOB_STATUS.UN_APPROVE, variant: "outline" },
      ];
    return [
      { status: JOB_STATUS.APPROVE, variant: "default" },
      { status: JOB_STATUS.UN_APPROVE, variant: "outline", hide: isAdmin },
    ];
  }, [job?.active, isAdmin]);

  return (
    <div>
      {isFetched && (
        <div className="flex items-end justify-between space-x-2 py-2 px-4 shadow-sm">
          <Button
            asChild
            size="sm"
            className="my-auto hover:no-underline text-slate-700"
            variant="link"
          >
            <Link href={"/admin?tab=jobs"} shallow referrerPolicy="no-referrer">
              <ChevronLeft className="w-5 h-5 mr-2" />
              {"Back"}
            </Link>
          </Button>

          <div className={"flex space-x-2"}>
            <Show when={isAdmin ? !job?.active : isSuperAdmin}>
              {displayApproveJobBtn
                .filter((btn) => !btn.hide)
                .map((btn, i) => (
                  <Button
                    variant={btn.variant}
                    size="sm"
                    key={`approve_btn_${i}`}
                    onClick={() => onOpenAlert(btn.status)}
                    className="capitalize w-[100px] text-sm"
                  >
                    {btn?.status?.replace("-", " ")}
                  </Button>
                ))}
            </Show>
          </div>
        </div>
      )}
      {isFetching || pending ? (
        <center className="mt-[30px]">
          <Spinner />
        </center>
      ) : (
        <ContentLayout className="max-md:flex-1 max-md:px-2 p-[20px] overflow-y-auto h-[calc(100vh-137px)]">
          <div className="flex w-fit items-center space-x-2">
            <h2 className="text-3xl font-medium max-md:text-2xl">
              {job?.position}
            </h2>
            <BadgeJobApprove
              className="h-fit w-fit capitalize"
              status={mappingJobApprove(job?.active)}
              text={mappingJobApproveLabel[mappingJobApprove(job?.active)]}
            />
          </div>
          <h3 className="text-pink-500 opacity-70 text-lg font-medium max-md:text-[15px]">
            {job?.company?.companyName}
          </h3>
          <br />
          <div className="flex flex-col space-y-1 mb-3">
            {memorizedHighlightsJob.map((hightlight, i) => (
              <JobHightlightSection
                {...hightlight}
                key={`hight_light_${i}`}
                textClass="text-[16px] max-md:text-[14px]"
              />
            ))}
          </div>

          <div className="flex flex-col space-y-10 max-w-2xl">
            {memorizedDetailsJob.map(({ key, ...rest }) => (
              <JobDetailSection key={key} {...rest} />
            ))}
          </div>
        </ContentLayout>
      )}

      <Alert
        onOpenChange={onClosedAlert}
        onCancel={onClosedAlert}
        {...alertApproveJob}
      />
    </div>
  );
}
