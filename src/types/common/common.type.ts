import { ROLE } from "@/constants";
import type { Dayjs } from "dayjs";
import { JwtPayload } from "jwt-decode";

export type ServiceResponse<D extends unknown> = {
  success: boolean;
  message: string | null;
} & D;

export type Role = (typeof ROLE)[number];

export type RolesParams = "jobseeker" | "employer";

export type TDate = string | number | Date | Dayjs | null;

export type DecodedToken = Pick<JwtPayload, "exp" | "iat"> & {
  email: string;
  role: Role;
  id: number;
};
