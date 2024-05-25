"use client";

import { Spinner, Table } from "@/components";
import { isNumber, toPx } from "@/lib";

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
  onRow?: (data?: TData[number]) => void;
};

export default function DataTable({
  name,
  data: dataSources = [],
  columns,
  loading,
  onRow,
}: Readonly<DataTableProps>) {
  return (
    <Table.Table role={name}>
      <Table.TableHeader>
        <Table.TableRow className="bg-slate-100 hover:bg-slate-100">
          {columns.map((column) => (
            <Table.TableHead key={column.key} className="text-slate-700">
              {column.title}
            </Table.TableHead>
          ))}
        </Table.TableRow>
      </Table.TableHeader>
      {loading ? (
        <Table.TableCaption>
          <Spinner />
        </Table.TableCaption>
      ) : (
        <Table.TableBody>
          {dataSources?.map((data, idx) => {
            const { key, ...rest } = data;

            return (
              <Table.TableRow
                key={key}
                onClick={() => onRow?.(data)}
                className="border-gray-50 border-b-2"
              >
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
    </Table.Table>
  );
}
