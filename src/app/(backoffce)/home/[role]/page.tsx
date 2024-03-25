"use client";

import { type DataTableProps, DataTable, Badge } from "@/components";

const mock = {
  key: "1",
  id: 1,
  email: "super_admin@gmail.com",
  firstName: "Super",
  lastName: "Admin",
  role: "super_admin",
  approve: "approved",
};

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
      render: (value: string) => (
        <Badge variant={value === "rejected" ? "destructive" : "secondary"}>
          {value}
        </Badge>
      ),
    },
  ];

  return (
    <div className="border h-full max-w-7xl mx-auto">
      <DataTable
        name="accounts"
        data={Array.from({ length: 3 }).fill(mock) as DataTableProps["data"]}
        columns={columns}
      />
    </div>
  );
}
