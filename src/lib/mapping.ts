import type { Job, JobStatus, Role, WorkingStyle } from "@/types";
import { HTMLAttributes } from "react";
import { isNull, isUndifined } from ".";
import { JOB_STATUS } from "@/constants";

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

export const mappingApproveStyleClass = {
  approve: "bg-green-100 text-green-600 hover:bg-green-200",
  reject: "bg-red-100 text-red-600 hover:bg-red-200",
  "un-approve": "bg-purple-100 text-purple-600 hover:bg-purple-200",
} as Record<JobStatus, HTMLAttributes<HTMLElement>["className"]>;

export const mappingJobDetail = (job?: Job, excludeFields?: (keyof Job)[]) => {
  const details = [
    {
      key: "jobDescriptions",
      title: "Responsibilities",
      items: job?.jobDescriptions || [],
    },
    {
      key: "qualifications",
      title: "Qualifications",
      items: job?.qualifications || [],
    },
    {
      key: "benefits",
      title: "Benefits",
      items: job?.benefits || [],
    },
    {
      key: "transports",
      title: "Transports",
      items: job?.transports || [],
    },
    {
      key: "contracts",
      title: "Contracts",
      items: job?.contracts || [],
    },
  ] satisfies Array<{ key: keyof Job; title: string; items: string[] }>;

  if (excludeFields && excludeFields?.length >= 1) {
    const filtered = details.filter(
      (detail) => !excludeFields?.includes(detail.key as keyof Job)
    );

    return filtered;
  }

  return details;
};

export const mappingJobApprove = (approve?: boolean | null) => {
  if (isNull(approve) || isUndifined(approve)) return JOB_STATUS.UN_APPROVE;
  if (approve) return JOB_STATUS.APPROVE;
  return JOB_STATUS.REJECT;
};
