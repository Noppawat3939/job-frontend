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

export const JOB_TYPE = {
  FULL_TIME: "full_time",
  PAST_TIME: "past_time",
  CONTRACT: "contract",
  INTERN: "internship",
} as const;
