"use client";

import { type DataTableProps, DataTable, Badge, Alert } from "@/components";
import type { User, UserStatus } from "@/types/user";
import { USER_STATUS } from "@/constants";
import { useCallback, useState, useTransition } from "react";
import { cn, eq, mappingWorkingStyleClass } from "@/lib";
import { useApproveUserHandler, useFetchHomeAdmin } from "@/hooks";
import { useRouter } from "next/navigation";

type PickedUser = Pick<
  User,
  "id" | "email" | "firstName" | "lastName" | "role"
>;

type RowData = PickedUser & { key: string; approve: UserStatus };

type AdminPageProps = {
  searchParams: { tab: "jobs" | "accounts" };
  params: { role: "admin" };
};

const initial = {
  alertProps: {
    open: false,
    title: "",
    description: "",
    onOk: () => {},
    onCancel: () => {},
    okText: "",
    cancelText: "",
  },
};

export default function AdminPage({ searchParams, params }: AdminPageProps) {
  const router = useRouter();

  const {
    userQuery,
    jobQuery,
    state: { users, jobs },
  } = useFetchHomeAdmin(searchParams.tab);

  const [alertApproveUser, setAlertApproveUser] = useState(initial.alertProps);

  const [pending, startTransition] = useTransition();

  const selectedAccountsTab = eq(searchParams.tab, "accounts");

  const alertError = useCallback(
    () =>
      setAlertApproveUser({
        ...alertApproveUser,
        title: "Can not approve user",
        description: "Please try again",
        onOk: () => setAlertApproveUser((prev) => ({ ...prev, open: false })),
      }),
    [alertApproveUser]
  );

  const handleApproveCompleted = () => {
    userQuery.refetch();
    startTransition(() =>
      setAlertApproveUser((prev) => ({ ...prev, open: false }))
    );
  };

  const { handle } = useApproveUserHandler(handleApproveCompleted, alertError);

  const handleOpenAlertApprove = (data: RowData) => {
    const alertState = {} as typeof alertApproveUser;

    const id = +data.key;

    if (eq(data.approve, USER_STATUS.APPROVE)) {
      alertState.title = "Are you want to reject or un approve?";
      alertState.cancelText = "Reject";
      alertState.okText = "Un approve";
      alertState.onCancel = () => handle.reject(id);
      alertState.onOk = () => handle.unApprove(id);
    }
    if (eq(data.approve, USER_STATUS.REJECT)) {
      alertState.title = "Are you want to approve or un approve?";
      alertState.okText = "Approve";
      alertState.cancelText = "Un approve";
      alertState.onOk = () => handle.approve(id);
      alertState.onCancel = () => handle.unApprove(id);
    }
    if (eq(data.approve, USER_STATUS.UN_APPROVE)) {
      alertState.title = "Are you want to approve or reject?";
      alertState.okText = "Approve";
      alertState.cancelText = "Reject";
      alertState.onOk = () => handle.approve(id);
      alertState.onCancel = () => handle.reject(id);
    }

    setAlertApproveUser({
      ...alertApproveUser,
      ...alertState,
      open: true,
      description: data.email,
    });
  };

  const accountColumns = [
    {
      key: "email",
      title: "Email",
      dataIndex: "email",
      width: "20%",
    },
    {
      key: "firstName",
      title: "Firstname",
      dataIndex: "firstName",
      width: "15%",
    },
    {
      key: "lastName",
      title: "Lastname",
      dataIndex: "lastName",
      width: "15%",
    },
    {
      key: "role",
      title: "Role",
      dataIndex: "role",
      width: "16%",
    },
    {
      key: "approve",
      title: "Approve",
      dataIndex: "approve",
      width: "14%",
      render: (value: string, data: any) => {
        const status = value as UserStatus;

        return (
          <div className="flex">
            <Badge
              datatype="approve-user"
              onClick={() => handleOpenAlertApprove(data)}
              className={cn(
                "cursor-pointer w-[90px] flex justify-center",
                eq(status, "approved")
                  ? `bg-teal-500 text-white hover:bg-teal-600`
                  : undefined
              )}
              variant={
                eq(status, "rejected")
                  ? "destructive"
                  : eq(status, USER_STATUS.APPROVE)
                  ? "secondary"
                  : "outline"
              }
            >
              {status}
            </Badge>
          </div>
        );
      },
    },
  ];

  const jobColumns = [
    { key: "company", title: "Company", dataIndex: "company", width: "17%" },
    { key: "position", title: "Position", dataIndex: "position", width: "20%" },

    {
      key: "fulltime",
      title: "Job type",
      dataIndex: "fulltime",
      width: "12%",
    },
    {
      key: "urgent",
      title: "Urgent",
      dataIndex: "urgent",
      width: "10%",
    },
    {
      key: "salary",
      title: "Salary (THB)",
      dataIndex: "salary",
      width: "15%",
    },
    {
      key: "style",
      title: "Work style",
      dataIndex: "style",
      width: "14%",
      render: (style: string, rowData: any) => {
        const data = rowData;

        return (
          <Badge
            className={cn(
              "w-[130px] flex justify-center uppercase",
              mappingWorkingStyleClass[String(data.style).replaceAll(" ", "_")]
            )}
          >
            {style}
          </Badge>
        );
      },
    },
    {
      key: "createdAt",
      title: "Created At",
      dataIndex: "createdAt",
      width: "12%",
    },
  ];

  const renderTableProps = () => {
    if (selectedAccountsTab)
      return { columns: accountColumns, data: users as DataTableProps["data"] };

    return { columns: jobColumns, data: jobs as DataTableProps["data"] };
  };

  const loading = [userQuery.isFetching, jobQuery.isFetching].some(Boolean);

  return (
    <div className="border h-full max-w-7xl mx-auto">
      <DataTable
        loading={loading || pending}
        name="accounts"
        data={renderTableProps().data}
        columns={renderTableProps().columns}
        onRow={(cb) =>
          selectedAccountsTab
            ? undefined
            : router.push(`/home/${params.role}/job/${cb?.key}`)
        }
      />
      <Alert
        onOpenChange={() => setAlertApproveUser(initial.alertProps)}
        {...alertApproveUser}
      />
    </div>
  );
}
