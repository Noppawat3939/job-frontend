export type ServiceResponse<D extends unknown> = {
  success: boolean;
  message: string | null;
} & D;
