export const ROLE = ["user", "admin", "super_admin", "employer"] as const;

export const WORK_STYLES = [
  "hybrid",
  "work_from_home",
  "remote",
  "on_site",
] as const;

export const USER_STATUS = {
  APPROVE: "approve",
  REJECT: "reject",
  UN_APPROVE: "un-approve",
} as const;

export const JOB_STATUS = {
  APPROVE: "approve",
  REJECT: "reject",
  UN_APPROVE: "un-approve",
} as const;

export const DATE_FORMAT = "DD MMM YY";
