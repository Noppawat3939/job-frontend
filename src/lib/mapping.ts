import type {
  ApplicationStatus,
  Job,
  JobExperienceLevel,
  JobStatus,
  JobType,
  Role,
  WorkingStyle,
} from "@/types";
import { HTMLAttributes } from "react";
import { diffTime, formatDate, formatPrice, isNull, isUndifined } from ".";
import { DATE_FORMAT, JOB_STATUS } from "@/constants";
import {
  type LucideIcon,
  Banknote,
  BriefcaseBusiness,
  CalendarPlus,
  Clock,
  MapPin,
  BarChart4,
} from "lucide-react";

export const mappingWorkStyle = {
  on_site: "onsite",
  work_from_home: "work from home",
  hybrid: "hybrid",
  remote: "remote",
} as Record<WorkingStyle, string>;

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
  location: "location",
  position: "job position",
  style: "work style",
  jobType: "job type",
  experienceLevel: "job experience",
  category: "job category",
  jobDescriptions: "job descriptions",
  qualifications: "job qualifications",
  benefits: "job benefits",
  contracts: "contracts",
  transports: "transports",
  salaryMin: "salary min",
  salaryMax: "salary max",
};

export const mappingRolePath = {
  admin: "admin",
  super_admin: "admin",
  employer: "employer",
} as Record<Role, Role>;

export const mappingJobApproveLabel = {
  approve: "approved",
  reject: "rejected",
  "un-approve": "un approve",
};

export const mappingWorkingStyleClass = {
  work_from_home: "bg-green-100 text-green-600 hover:bg-green-200",
  on_site: "bg-sky-100 text-sky-600 hover:bg-sky-200",
  remote: "bg-purple-100 text-purple-600 hover:bg-purple-200",
  hybrid: "bg-orange-100 text-orange-600 hover:bg-orange-200",
} as Record<string, HTMLAttributes<HTMLElement>["className"]>;

export const mappingApproveStyleClass = {
  approve: "bg-green-100 text-green-600 hover:bg-green-200",
  reject: "bg-red-100 text-red-600 hover:bg-red-200",
  "un-approve": "bg-purple-100 text-purple-600 hover:bg-purple-200",
} as Record<JobStatus, HTMLAttributes<HTMLElement>["className"]>;

export const mappingRoleUserStyleClass = {
  super_admin: "bg-pink-200 text-pink-500 hover:bg-pink-200",
  admin: "bg-yellow-200 text-orange-500 hover:bg-yellow-300",
  employer: "bg-red-100 text-red-500 hover:bg-red-100",
  user: "bg-sky-100 text-sky-600 hover:bg-sky-100",
} as Record<Role, HTMLAttributes<HTMLElement>["className"]>;

export const mappingApplicationStatusClass = {
  applied: "text-teal-500 bg-teal-50 hover:bg-teal-50",
  reviewing: "text-orange-500 bg-orange-50 hover:bg-orange-50",
  interviewing: "text-orange-400 bg-orange-50 hover:bg-orange-50",
  offering: "text-lime-600 bg-lime-50 hover:bg-lime-50",
  offered: "text-sky-500 bg-sky-50 hover:bg-sky-50",
  rejected: "text-red-500 bg-red-50 hover:bg-red-50",
  cancelled: "text-gray-500",
} as Record<ApplicationStatus, HTMLAttributes<HTMLElement>["className"]>;

export const mappingJobType = {
  full_time: "Fulltime",
  past_time: "Pasttime",
  contract: "Contract",
  internship: "Internship",
} as Record<JobType, string>;

export const mappingJobExp = {
  senior: "Senior",
  middle: "Middle",
  entry: "Entry",
  no_required: "",
} as Record<JobExperienceLevel, string>;

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

export const mappingHightlightJob = (job?: Job) => {
  const postedDay = diffTime(job?.createdAt, undefined, "day");

  const hightlight = [
    { key: "location", value: String(job?.location), icon: MapPin },
    {
      key: "salary",
      value: job?.salary ? formatPrice(job?.salary) : "",
      icon: Banknote,
    },
    {
      key: "style",
      value: mappingWorkStyle[job?.style as keyof typeof mappingWorkStyle],
      icon: BriefcaseBusiness,
    },
    {
      key: "experienceLevel",
      value:
        mappingJobExp[job?.experienceLevel as keyof typeof mappingJobExp] ||
        "no required experience",
      icon: BarChart4,
    },
    {
      key: "jobType",
      value: mappingJobType[job?.jobType as keyof typeof mappingJobType],
      icon: Clock,
    },
    {
      key: "createdAt",
      value: `${formatDate(job?.createdAt, DATE_FORMAT)} (${
        postedDay === 0 ? "today" : `${postedDay} days ago`
      })`,
      icon: CalendarPlus,
    },
  ] satisfies Array<{ key: keyof Job; value: string; icon: LucideIcon }>;

  return hightlight;
};
