"use client";

import { Show, Table } from "@/components";
import { isNumber, toPx } from "@/lib";
import { Fragment } from "react";

type TData = (Record<string, any> & { key: string })[];

export type DataTableProps = {
  name: string;
  data: TData;
  loading?: boolean;
  columns: {
    key: string;
    title: string;
    dataIndex: string;
    width?: number | string;
    render?: <V extends string, R, I extends number>(
      value: V,
      record: R,
      index: I
    ) => JSX.Element;
  }[];
};

export default function DataTable({
  name,
  data: dataSources,
  columns,
  loading,
}: Readonly<DataTableProps>) {
  return (
    <Table.Table role={name}>
      <Table.TableHeader>
        <Table.TableRow className="bg-slate-100">
          {columns.map((column) => (
            <Table.TableHead key={column.key} className="text-slate-700">
              {column.title}
            </Table.TableHead>
          ))}
        </Table.TableRow>
      </Table.TableHeader>
      {loading ? (
        <Table.TableCaption>{"Loading"}</Table.TableCaption>
      ) : (
        <Table.TableBody>
          {dataSources?.map((data, idx) => {
            const { key, ...rest } = data;

            return (
              <Table.TableRow key={key}>
                {Object.keys(rest).map((cell, cellIdx) => {
                  const dataSource = dataSources.at(idx);
                  const column = columns.at(cellIdx);

                  const cellData =
                    dataSource?.[cell as keyof typeof dataSource];

                  return (
                    <Table.TableCell
                      key={cell}
                      style={{
                        width: isNumber(column?.width)
                          ? toPx(column?.width as unknown as number)
                          : column?.width,
                      }}
                    >
                      {column?.render?.(cellData, dataSource, cellIdx) ||
                        cellData}
                    </Table.TableCell>
                  );
                })}
              </Table.TableRow>
            );
          })}
        </Table.TableBody>
      )}

      <Show when={!loading}>
        <Table.TableCaption>{`All data ${dataSources.length} total`}</Table.TableCaption>
      </Show>
    </Table.Table>
  );
}
