"use client";

import { type DataTableProps, DataTable, Badge } from "@/components";
import type { UserStatus } from "@/types/user";
import { QUERY_KEY } from "@/constants";
import { userService } from "@/services/user";
import { useQueries } from "@tanstack/react-query";

export default function AdminPage() {
  const columns = [
    {
      key: "id",
      title: "User Id",
      dataIndex: "id",
      width: "12%",
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
      width: "12%",
      render: (value: string) => {
        const status = value as UserStatus;
        return (
          <Badge
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
        );
      },
    },
  ];

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

  const isFetchingUsers = data.at(0)?.isFetching;

  return (
    <div className="border h-full max-w-7xl mx-auto">
      <DataTable
        loading={isFetchingUsers}
        name="accounts"
        data={(users || []) as DataTableProps["data"]}
        columns={columns}
      />
    </div>
  );
}
