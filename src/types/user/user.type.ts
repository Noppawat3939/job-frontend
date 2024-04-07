import type { Role } from "..";

export type User = {
  id: number;
  email: string;
  firstName?: string;
  lastName?: string;
  role: Role;
  createdAt: string;
  updatedAt: string;
};
