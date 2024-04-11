"use client";

import type { JobStatus, RolePageParam } from "@/types";
import { jobService } from "@/services";
import { useQuery } from "@tanstack/react-query";
import { Alert, Button } from "@/components";
import { useCallback, useState, useTransition } from "react";
import { JOB_STATUS } from "@/constants";
import { eq } from "@/lib";

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

  const { data: job } = useQuery({
    queryKey: ["job"],
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

    alertState.description = `position: ${job?.position}`;

    if (eq(status, JOB_STATUS.APPROVE)) {
      alertState.title = "Are your sure to approve job?";
      alertState.okText = "Approve";
    }
    if (eq(status, JOB_STATUS.REJECT)) {
      alertState.title = "Are your sure to reject job?";
      alertState.okButtonProps = { variant: "destructive" };
      alertState.okText = "Reject";
    }
    if (eq(status, JOB_STATUS.UN_APPROVE)) {
      alertState.title = "Are your sure to un approve job?";
    }

    setAlertApproveJob((prev) => ({ ...prev, ...alertState, open: true }));
  };

  return (
    <div>
      <section className="flex justify-end space-x-2 border py-2 px-4">
        <Button
          variant="outline"
          onClick={() => onOpenAlert(JOB_STATUS.APPROVE)}
        >
          {"Approve"}
        </Button>
        <Button
          variant="destructive"
          onClick={() => onOpenAlert(JOB_STATUS.REJECT)}
        >
          {"Reject"}
        </Button>
      </section>

      <Alert
        onOpenChange={onClosedAlert}
        onCancel={onClosedAlert}
        {...alertApproveJob}
      />
    </div>
  );
}
