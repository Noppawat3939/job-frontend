import { type ClassValue, clsx } from "clsx";
import { redirect } from "next/navigation";
import { twMerge } from "tailwind-merge";
import dayjs, { OpUnitType, QUnitType } from "dayjs";
import { TDate } from "@/types";

require("dayjs/locale/th");

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const toPx = (value?: number) => {
  return `${value || 0}px`;
};

export const isNumber = (value: unknown) => {
  return typeof value === "number";
};

export const eq = <T>(value: T, target: T) => {
  return value === target;
};

export const noSpace = (value: string, searchValue?: string | RegExp) =>
  value.replaceAll(searchValue ?? " ", "");

export const goToHome = () => redirect("/");

export const formatPrice = (value: number[]) => {
  if (value.length > 2) return;

  if (value.length === 2) {
    const first = Intl.NumberFormat("th").format(Number(value.at(0)));
    const last = Intl.NumberFormat("th").format(Number(value.at(1)));

    return `${first} - ${last} THB`;
  } else {
    `${Intl.NumberFormat("th").format(Number(value))} THB`;
  }
};

export const formatDate = (date?: string | Date | number, format?: string) =>
  dayjs(date).locale("th").format(format);

export const isUndifined = <T>(value: T) => eq(value, undefined);
export const isNull = <T>(value: T) => eq(value, null);

export const diffTime = (
  targetTime: TDate | undefined,
  curTime?: TDate,
  qo?: QUnitType | OpUnitType
) => dayjs(curTime).diff(dayjs(targetTime), qo);
