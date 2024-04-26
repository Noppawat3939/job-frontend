import { WORK_STYLES, JOB_TYPE } from "@/constants";

const jobType = Object.values(JOB_TYPE);

export type WorkingStyle = (typeof WORK_STYLES)[number];

export type Job = {
  id: number;
  position: string;
  company: string;
  createdAt: string;
  active?: boolean;
  updatedAt?: string;
  urgent?: boolean;
  fulltime?: boolean;
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
};

export type JobStatus = "approve" | "reject" | "un-approve";

export type JobType = keyof typeof jobType;
