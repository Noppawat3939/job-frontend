import { type ClassValue, clsx } from "clsx";
import { redirect } from "next/navigation";
import { twMerge } from "tailwind-merge";
import dayjs, { OpUnitType, QUnitType } from "dayjs";
import { TDate } from "@/types";
import { getCookie } from "cookies-next";
import { AxiosRequestConfig } from "axios";

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

    if (min === 0 && max > 0) {
      return `${formattedMax} THB`;
    }

    return `${formattedMin} - ${formattedMax} THB`;
  }

  return fallback ?? "";
};

export const formatDate = (date?: string | Date | number, format?: string) =>
  date ? dayjs(date).locale(TH).format(format) : "";

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

export const apikeyHeaders: AxiosRequestConfig<unknown> = {
  headers: { ["api-key"]: String(process.env.NEXT_PUBLIC_API_KEY) },
};

export const pretty = (text: string) => text.replaceAll("_", " ");

export const unPretty = (text: string) => text.replaceAll(" ", "_");

export const numOnly = (value: string) => value.replaceAll(/[^0-9]/g, "");

export const convertFromEntries = <T extends object>(obj: T) =>
  Object.fromEntries(Object.entries(obj));

export const scrollToTop = () =>
  document.scrollingElement?.scrollTo({ top: 0, behavior: "smooth" });

export const isEmptyArray = (arr?: unknown[]) =>
  arr && (eq(arr.length, 0) || !arr?.[0]);
