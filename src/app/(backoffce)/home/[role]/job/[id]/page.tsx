"use client";

import type { JobStatus, RolePageParam } from "@/types";
import { jobService } from "@/services";
import { useQuery } from "@tanstack/react-query";
import {
  Alert,
  Badge,
  Button,
  ContentLayout,
  JobDetailSectionProps,
  JobHightlightSection,
  Spinner,
} from "@/components";
import {
  Fragment,
  useCallback,
  useId,
  useMemo,
  useState,
  useTransition,
} from "react";
import { DATE_FORMAT, JOB_STATUS, QUERY_KEY } from "@/constants";
import {
  cn,
  diffTime,
  eq,
  formatDate,
  formatPrice,
  isNull,
  isUndifined,
  mappingApproveStyleClass,
  mappingJobApprove,
  mappingJobDetail,
  mappingWorkStyle,
} from "@/lib";
import {
  Banknote,
  BriefcaseBusiness,
  CalendarPlus,
  ChevronLeft,
  Clock,
  MapPin,
} from "lucide-react";
import { type ButtonProps } from "@/components/ui/button";
import Link from "next/link";

type AdminJobPageProps = {
  params: { id: string; role: RolePageParam };
};

const initial = {
  alertProps: {
    open: false,
    title: "",
    description: "",
    onOk: () => null,
    okButtonProps: {},
    okText: "",
  },
};

export default function AdminJobPage({ params }: AdminJobPageProps) {
  const { id } = params;
  const _id = useId();

  const {
    data: job,
    isFetching,
    isFetched,
  } = useQuery({
    queryKey: [QUERY_KEY.GET_JOB, id],
    queryFn: () => jobService.fetchJob(+id),
    select: ({ data }) => data,
  });

  const [, startTransition] = useTransition();

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
    }
    if (eq(status, JOB_STATUS.REJECT)) {
      alertState.title = "Are your sure to reject job?";
      alertState.okText = "Confirm";
    }
    if (eq(status, JOB_STATUS.UN_APPROVE)) {
      alertState.title = "Are your sure to un approve job?";
      alertState.okText = "Confirm";
    }

    setAlertApproveJob((prev) => ({ ...prev, ...alertState, open: true }));
  };

  const jobHightlightSections = [
    {
      key: "location",
      value: job?.location,
      icon: <MapPin className="w-4 h-4" />,
    },
    {
      key: "salary",
      value: job?.salary ? formatPrice(job?.salary) : "",
      icon: <Banknote className="w-4 h-4" />,
    },
    {
      key: "workingStyle",
      value: mappingWorkStyle[job?.style as keyof typeof mappingWorkStyle],
      icon: <BriefcaseBusiness className="w-4 h-4" />,
    },
    {
      key: "fulltime",
      value: job?.fulltime ? "Full time" : "Past time",
      icon: <Clock className="w-4 h-4" />,
    },
    {
      key: "created",
      value: `${formatDate(job?.createdAt, DATE_FORMAT)} (${diffTime(
        job?.createdAt,
        undefined,
        "day"
      )} days ago)`,
      icon: <CalendarPlus className="w-4 h-4" />,
    },
  ];

  const mappedJobDetail = mappingJobDetail(job);

  const displayApproveJobBtn = useMemo(() => {
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
      { status: JOB_STATUS.UN_APPROVE, variant: "outline" },
    ];
  }, [job?.active]) as Array<{
    status: JobStatus;
    variant: ButtonProps["variant"];
  }>;

  return (
    <div>
      {isFetched && (
        <div className="flex items-end justify-between space-x-2 py-2 px-4 shadow-sm">
          <Button asChild size="icon" className="h-fit my-auto" variant="link">
            <Link
              href={"/home/admin?tab=jobs"}
              shallow
              referrerPolicy="no-referrer"
            >
              <ChevronLeft className="w-5 h-5" />
            </Link>
          </Button>
          <div className="flex space-x-2">
            {displayApproveJobBtn.map((btn) => (
              <Button
                variant={btn.variant}
                size="sm"
                key={`approve_btn_${_id}`}
                onClick={() => onOpenAlert(btn.status)}
                className="capitalize w-[100px] text-sm"
              >
                {btn.status.replace("-", " ")}
              </Button>
            ))}
          </div>
        </div>
      )}
      {isFetching ? (
        <center className="mt-[30px]">
          <Spinner />
        </center>
      ) : (
        <ContentLayout className="max-md:flex-1 max-md:px-2 p-[20px] overflow-y-auto h-[calc(100vh-137px)]">
          <div className="flex w-fit items-center space-x-2">
            <h2 className="text-3xl font-medium max-md:text-2xl">
              {job?.position}
            </h2>
            <Badge
              className={cn(
                "h-fit capitalize",
                mappingApproveStyleClass[mappingJobApprove(job?.active)]
              )}
            >
              {mappingJobApprove(job?.active)}
            </Badge>
          </div>
          <h3 className="text-sky-500 opacity-70 text-lg font-medium max-md:text-[15px]">
            {job?.company}
          </h3>
          <br />
          <div className="flex flex-col space-y-1 mb-3">
            {jobHightlightSections.map((hightlight) => (
              <JobHightlightSection
                {...hightlight}
                key={_id}
                textClass="text-[16px] max-md:text-[14px]"
              />
            ))}
          </div>

          <div className="flex flex-col space-y-10 max-w-2xl">
            {mappedJobDetail.map((section) => (
              <JobDetailSectionProps
                key={section.key}
                title={section.title}
                items={section.items}
              />
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
