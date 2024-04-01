import { type ClassValue, clsx } from "clsx";
import { redirect } from "next/navigation";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";

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

export const priceUnit = (value: string | number, afterAddon?: string) =>
  `${value} THB ${afterAddon ?? ""}`;

export const formatDate = (date?: string | Date | number, format?: string) =>
  dayjs(date).locale("th").format(format);
