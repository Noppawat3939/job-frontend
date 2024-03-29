import { ROLE } from "@/constants";

export type ServiceResponse<D extends unknown> = {
  success: boolean;
  message: string | null;
} & D;

export type Role = (typeof ROLE)[number];
