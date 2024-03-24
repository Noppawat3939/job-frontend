"use client";

import { Table } from "@/components";
import { toPx } from "@/lib";
import { type ReactNode } from "react";

export type DataTableProps = {
  data: (Record<string, ReactNode> & { key: string })[];
  columns: {
    key: string;
    title: string;
    dataIndex: string;
    width?: number;
  }[];
};

export default function DataTable({
  data: dataSources,
  columns,
}: Readonly<DataTableProps>) {
  return (
    <Table.Table>
      <Table.TableHeader>
        <Table.TableRow>
          {columns.map((column) => (
            <Table.TableHead key={column.key}>{column.title}</Table.TableHead>
          ))}
        </Table.TableRow>
      </Table.TableHeader>
      <Table.TableBody>
        {dataSources.map((data, idx) => {
          const { key, ...rest } = data;

          return (
            <Table.TableRow key={key}>
              {Object.keys(rest).map((cell, cellIdx) => {
                const dataSource = dataSources.at(idx);
                const column = columns.at(cellIdx);

                return (
                  <Table.TableCell
                    key={cell}
                    style={{ width: toPx(column?.width) }}
                  >
                    {dataSource?.[cell as keyof typeof dataSource]}
                  </Table.TableCell>
                );
              })}
            </Table.TableRow>
          );
        })}
      </Table.TableBody>
      <Table.TableCaption>All data 2 total</Table.TableCaption>
    </Table.Table>
  );
}
