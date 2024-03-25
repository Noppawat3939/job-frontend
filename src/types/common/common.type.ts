export type ServiceResponse<D extends unknown> = {
  success: boolean;
  message: string | null;
} & D;

export type Role = "user" | "admin" | "super_admin" | "employer";
