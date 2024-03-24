import { type DataTableProps, DataTable } from "@/components";

const mock = {
  key: "1",
  name: "Mike",
  age: 12,
  address: "10 Downing Street",
  test: "Test 0",
};

export default function AdminPage() {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 200,
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      width: 300,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      width: 300,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "test",
      width: 150,
    },
  ];

  return (
    <div className="border h-full max-w-7xl mx-auto">
      <DataTable
        data={Array.from({ length: 15 }).fill(mock) as DataTableProps["data"]}
        columns={columns}
      />
    </div>
  );
}
