"use client";

import { type DataTableProps, DataTable, Badge, Alert } from "@/components";
import type { User, UserStatus } from "@/types/user";
import { QUERY_KEY } from "@/constants";
import { userService } from "@/services/user";
import { useQueries } from "@tanstack/react-query";
import { useState } from "react";

type RowData = Pick<
  User,
  "id" | "email" | "firstName" | "lastName" | "role"
> & {
  key: string;
  approve: UserStatus;
};

const initial = {
  alertProps: {
    open: false,
    title: "",
    description: "",
    onOk: () => null,
    okText: "",
    cancelText: "",
  },
};

export default function AdminPage() {
  const [alertApproveUser, setAlertApproveUser] = useState(initial.alertProps);

  const handleOpenAlertApprove = (data: RowData) => {
    let alertState = {} as typeof alertApproveUser;

    if (data.approve === "approved") {
      alertState.title = "Are you want to reject or un approve?";
      alertState.cancelText = "Reject";
      alertState.okText = "Un approve";
    }
    if (data.approve === "rejected") {
      alertState.title = "Are you want to approve or un approve?";
      alertState.cancelText = "Approve";
      alertState.okText = "Un approve";
    }
    if (data.approve === "un-approve") {
      alertState.title = "Are you want to approve or un reject?";
      alertState.cancelText = "Approve";
      alertState.okText = "Reject";
    }

    setAlertApproveUser({
      ...alertApproveUser,
      ...alertState,
      open: true,
      description: data.email,
      onOk: () => null,
    });
  };

  const data = useQueries({
    queries: [
      {
        queryKey: [QUERY_KEY.GET_USERS],
        queryFn: userService.fetchUsers,
      },
    ],
  });

  const users = data.at(0)?.data?.data.map((user, userIdx) => ({
    key: String(userIdx + 1),
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
    approve: user.active
      ? "approved"
      : user.active === null
      ? "un-approve"
      : "rejected",
  }));

  const columns = [
    {
      key: "id",
      title: "User Id",
      dataIndex: "id",
      width: "10%",
    },
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
                status === "approved"
                  ? `bg-teal-500 text-white hover:bg-teal-600`
                  : undefined
              }
              variant={
                status === "rejected"
                  ? "destructive"
                  : status === "approved"
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

  const loading = data.at(0)?.isFetching;

  return (
    <div className="border h-full max-w-7xl mx-auto">
      <DataTable
        loading={loading}
        name="accounts"
        data={users as DataTableProps["data"]}
        columns={columns}
      />
      <Alert
        onOpenChange={() => setAlertApproveUser(initial.alertProps)}
        {...alertApproveUser}
      />
    </div>
  );
}
