import { type ClassValue, clsx } from "clsx";
import { redirect } from "next/navigation";
import { twMerge } from "tailwind-merge";
import dayjs, { OpUnitType, QUnitType } from "dayjs";
import { TDate } from "@/types";
import { getCookie } from "cookies-next";

require("dayjs/locale/th");

const TH = "th";

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

export const goToHomeByAdmin = () => redirect("/home/admin");

export const formatNumber = (value: number | string) =>
  Intl.NumberFormat(TH).format(Number(value));

export const formatPrice = (value: number[], fallback?: string) => {
  if (value.length === 1) return `${formatNumber(Number(value))} THB`;

  if (value.length === 2) {
    const [min, max] = value;
    const formattedMin = formatNumber(Number(min));
    const formattedMax = formatNumber(Number(max));

    return `${formattedMin} - ${formattedMax} THB`;
  }

  return fallback ?? "";
};

export const formatDate = (date?: string | Date | number, format?: string) =>
  dayjs(date).locale(TH).format(format);

export const isUndifined = <T>(value: T) => eq(value, undefined);
export const isNull = <T>(value: T) => eq(value, null);

export const diffTime = (
  targetTime: TDate | undefined,
  curTime?: TDate,
  qo?: QUnitType | OpUnitType
) => dayjs(curTime).diff(dayjs(targetTime), qo);

export const getTokenWithHeaders = () =>
  getCookie("token")
    ? {
        headers: { Authorization: `Bearer ${getCookie("token")}` },
      }
    : undefined;
