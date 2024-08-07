import { ROLE } from "@/constants";
import { type AxiosResponse, HttpStatusCode } from "axios";
import type { Dayjs } from "dayjs";
import { JwtPayload } from "jwt-decode";

const statusCode = Object.values(HttpStatusCode);

export type Nullable<T = unknown> = T | null;

export type ServiceResponse<D = unknown> = {
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

export type Testimonial = {
  id: number;
  fullName: string;
  profile: string;
  message: string;
};

export type SubscribeDetail = {
  id: number;
  plan: string;
  code_key: string;
  title: string;
  sub_title: string;
  price: {
    per_month: number;
    per_year: number;
    discount: {
      percent_per_year: number;
      discount_end_date: Nullable<string>;
    };
  };
  features: string[];
};
