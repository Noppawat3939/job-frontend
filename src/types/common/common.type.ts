import { ROLE } from "@/constants";
import type { Dayjs } from "dayjs";

export type ServiceResponse<D extends unknown> = {
  success: boolean;
  message: string | null;
} & D;

export type Role = (typeof ROLE)[number];

export type RolesParams = "jobseeker" | "employer";

export type TDate = string | number | Date | Dayjs | null;
