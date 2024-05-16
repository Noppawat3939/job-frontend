import type { Role } from "..";

export type User = {
  id: number;
  email: string;
  firstName?: string;
  lastName?: string;
  companyProfile?: string;
  userProfile?: string;
  companyName?: string;
  industry?: string;
  companyHistory?: string;
  role: Role;
  active?: boolean;
  createdAt: string;
  updatedAt: string;
};

export type UserStatus = "approved" | "rejected" | "un-approve";
