import { Role, WorkingStyle } from "@/types";
import { HTMLAttributes } from "react";

export const mappingWorkStyle = {
  on_site: "onsite",
  work_from_home: "work from home",
  hybrid: "hybrid",
  remote: "remote",
} as Record<WorkingStyle, string>;

export const mappingFulltime = (isFulltime?: boolean) =>
  isFulltime ? "full-time" : "pass-time";

export const mappingUrgetJob = (isUrgent?: boolean, fallback?: string) =>
  isUrgent ? "urgent" : fallback || "";

export const mappingFormFields = {
  firstName: "firstname",
  lastName: "lastname",
  email: "email",
  password: "password",
  newPassword: "new password",
  confirmPassword: "confirm password",
  companyName: "company name",
  industry: "industry",
  salary: "salary",
};

export const mappingRolePath = {
  admin: "admin",
  super_admin: "admin",
  employer: "employer",
} as Record<Role, Role>;

export const mappingWorkingStyleClass = {
  work_from_home: "bg-green-100 text-green-600 hover:bg-green-200",
  onsite: "bg-sky-100 text-sky-600 hover:bg-sky-200",
  remote: "bg-purple-100 text-purple-600 hover:bg-purple-200",
  hybrid: "bg-orange-100 text-orange-600 hover:bg-orange-200",
} as Record<string, HTMLAttributes<HTMLElement>["className"]>;
