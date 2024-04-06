import { WorkingStyle } from "@/types";

export const mappingWorkStyle = {
  on_site: "onsite",
  work_from_home: "work from home",
  hybrid: "hybrid",
  remote: "remote",
} as Record<WorkingStyle, string>;

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
