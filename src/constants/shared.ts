export const ROLE = ["user", "admin", "super_admin", "employer"] as const;

export const WORK_STYLES = [
  "hybrid",
  "work_from_home",
  "remote",
  "on_site",
] as const;

export const USER_STATUS = {
  APPROVE: "approved",
  REJECT: "rejected",
  UN_APPROVE: "un-approve",
} as const;

export const JOB_STATUS = {
  APPROVE: "approve",
  REJECT: "reject",
  UN_APPROVE: "un-approve",
} as const;

export const DATE_FORMAT = "DD MMM YY";

export const JOB_TYPE = [
  "full_time",
  "past_time",
  "contract",
  "internship",
] as const;

export const JOB_EXP_LEVEL = [
  "entry",
  "middle",
  "senior",
  "no_required",
] as const;

export const CREATE_JOB_FIELDS = [
  "position",
  "style",
  "jobType",
  "experienceLevel",
  "category",
  "salaryMin",
  "salaryMax",
  "location",
  "jobDescriptions",
  "qualifications",
  "benefits",
  "contracts",
  "transports",
] as const;
