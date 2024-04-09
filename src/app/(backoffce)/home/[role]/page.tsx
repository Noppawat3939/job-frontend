"use client";

import { type DataTableProps, DataTable, Badge, Alert } from "@/components";
import type { User, UserStatus } from "@/types/user";
import { QUERY_KEY, USER_STATUS } from "@/constants";
import { userService } from "@/services/user";
import { useQueries } from "@tanstack/react-query";
import { useCallback, useState, useTransition } from "react";
import { getCookie } from "cookies-next";
import { eq, isNull, isUndifined } from "@/lib";
import { userStore } from "@/store";
import { useApproveUserHandler } from "@/hooks";

type RowData = Pick<
  User,
  "id" | "email" | "firstName" | "lastName" | "role"
> & {
  key: string;
  approve: UserStatus;
};

type AdminPageProps = {
  searchParams: { tab: "jobs" | "accounts" };
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

const QUERY_INDEX = {
  FETCH_USERS: 0,
} as const;

export default function AdminPage({ searchParams }: AdminPageProps) {
  const { user } = userStore();

  const [alertApproveUser, setAlertApproveUser] = useState(initial.alertProps);

  const [pending, startTransition] = useTransition();

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
    data[QUERY_INDEX.FETCH_USERS].refetch();
    startTransition(() =>
      setAlertApproveUser((prev) => ({ ...prev, open: false }))
    );
  };

  const { handle } = useApproveUserHandler(handleApproveCompleted, alertError);

  const data = useQueries({
    queries: [
      {
        queryKey: [QUERY_KEY.GET_USERS, getCookie("token")],
        queryFn: userService.fetchUsers,
        enabled: !isUndifined(user) && eq(searchParams.tab, "accounts"),
      },
    ],
  });

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

  const users = data.at(QUERY_INDEX.FETCH_USERS)?.data?.data.map((user) => ({
    key: String(user.id),
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
    approve: user.active
      ? "approved"
      : isNull(user.active)
      ? "un-approve"
      : "rejected",
  }));

  const columns = [
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
          <div className="flex space-x-1">
            <Badge
              onClick={() => handleOpenAlertApprove(data)}
              className={
                eq(status, "approved")
                  ? `bg-teal-500 text-white hover:bg-teal-600`
                  : undefined
              }
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

  const loading = data.at(QUERY_INDEX.FETCH_USERS)?.isFetching;

  return (
    <div className="border h-full max-w-7xl mx-auto">
      <DataTable
        loading={loading || pending}
        name="accounts"
        data={
          eq(searchParams.tab, "accounts")
            ? (users as DataTableProps["data"])
            : []
        }
        columns={columns}
      />
      <Alert
        onOpenChange={() => setAlertApproveUser(initial.alertProps)}
        {...alertApproveUser}
      />
    </div>
  );
}
