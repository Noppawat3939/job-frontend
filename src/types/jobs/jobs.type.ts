import { WORK_STYLES, JOB_TYPE, JOB_EXP_LEVEL } from "@/constants";

export type WorkingStyle = (typeof WORK_STYLES)[number];
export type JobType = (typeof JOB_TYPE)[number];
export type JobExperienceLevel = (typeof JOB_EXP_LEVEL)[number];

export type Job = {
  id: number;
  position: string;
  company: string;
  createdAt: string;
  active?: boolean;
  updatedAt?: string;
  urgent?: boolean;
  jobType: JobType;
  location: string;
  salary: number[];
  style: WorkingStyle;
  companyProfile?: string;
  jobDescriptions?: string[];
  qualifications?: string[];
  benefits?: string[];
  transports?: string[];
  contracts?: string[];
  industry?: string;
  experienceLevel: JobExperienceLevel;
};

export type JobStatus = "approve" | "reject" | "un-approve";

export type JobCategory = {
  id: number;
  category_key: string;
  category_name: string;
};
