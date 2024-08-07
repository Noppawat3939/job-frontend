import type {
  ApplicationStatus,
  Job,
  JobExperienceLevel,
  JobStatus,
  JobType,
  PaymentTransaction,
  Role,
  SubscriptionStatus,
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
import { ClassValue } from "clsx";
import type { UserStatus } from "@/types/user";

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

export const mappingJobApproveLabel = {
  approve: "approved",
  reject: "rejected",
  "un-approve": "un approve",
};

export const mappingWorkingStyleClass = {
  work_from_home: "bg-green-100 text-green-600 hover:bg-green-200",
  on_site: "bg-sky-200 text-sky-600 hover:bg-sky-300",
  remote: "bg-purple-100 text-purple-600 hover:bg-purple-200",
  hybrid: "bg-orange-100 text-orange-600 hover:bg-orange-200",
} as Record<string, HTMLAttributes<HTMLElement>["className"]>;

export const mappingApprovtyleClass = {
  approved: "text-teal-500 border-teal-300",
  approve: "text-teal-500 border-teal-300",
  "un-approve": "text-gray-600",
  rejected: "border-red-400 text-red-500 border-red-300",
  reject: "border-red-400 text-red-500 border-red-300",
} as Record<UserStatus | JobStatus, ClassValue>;

export const mappingRoleUserStyleClass = {
  super_admin: "bg-indigo-100 text-indigo-500 hover:bg-indigo-100",
  admin: "bg-violet-100 text-violet-500 hover:bg-violet-100",
  employer: "bg-pink-100 text-pink-500 hover:bg-pink-100",
  user: "bg-sky-100 text-sky-500 hover:bg-sky-100",
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

export const mappingSubscribeStatusClass = {
  pending: "text-orange-300 border-orange-300",
  subscribed: "text-teal-500 border-teal-400",
  unsubscribe: "text-gray-400/80",
} as Record<SubscriptionStatus, string>;

export const mappingTransactionStatusClass = {
  pending: "text-orange-300 border-orange-300",
  completed: "text-teal-500 border-teal-400",
  cancelled: "text-red-500 border-red-400",
} as Record<PaymentTransaction["status"], string>;

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

export const redirectWithRole = {
  employer: "/company",
  super_admin: "/admin?tab=accounts",
  admin: "/admin?tab=jobs",
} as Record<Role, string>;
