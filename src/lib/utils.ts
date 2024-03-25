import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

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
