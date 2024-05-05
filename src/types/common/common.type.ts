import { ROLE } from "@/constants";
import { type AxiosResponse, HttpStatusCode } from "axios";
import type { Dayjs } from "dayjs";
import { JwtPayload } from "jwt-decode";

const statusCode = Object.values(HttpStatusCode);

export type ServiceResponse<D extends unknown> = {
  success: boolean;
  message: string | null;
} & D;

export type ServiceErrorResponse = AxiosResponse<{
  error: string;
  message: string;
  statusCode: (typeof statusCode)[number];
}>;

export type Role = (typeof ROLE)[number];

export type RolesParams = "jobseeker" | "employer";

export type TDate = string | number | Date | Dayjs | null;

export type DecodedToken = Pick<JwtPayload, "exp" | "iat"> & {
  email: string;
  role: Role;
  id: number;
};

export type Province = {
  id: number;
  name: Record<"th" | "en", string>;
  code: string;
};
