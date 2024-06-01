import {
  WORK_STYLES,
  JOB_TYPE,
  JOB_EXP_LEVEL,
  APPLICATION_STATUS,
} from "@/constants";
import { User } from "../user";

export type WorkingStyle = (typeof WORK_STYLES)[number];
export type JobType = (typeof JOB_TYPE)[number];
export type JobExperienceLevel = (typeof JOB_EXP_LEVEL)[number];
export type ApplicationStatus = (typeof APPLICATION_STATUS)[number];

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
  category: string;
  applicationStatus?: ApplicationStatus;
  favoritedJob?: boolean;
};

export type JobStatus = "approve" | "reject" | "un-approve";

export type JobWithCompany = Job & {
  company: Partial<
    Pick<
      User,
      | "id"
      | "userProfile"
      | "companyName"
      | "companyHistory"
      | "industry"
      | "companyProfile"
    >
  >;
};

export type JobCategory = {
  id: number;
  category_key: string;
  category_name: string;
};

export type AppliedJob = {
  id: number;
  jobId: number;
  userId: number;
  applicationDate: string | Date;
  applicationStatus: ApplicationStatus;
  cancelledDate?: string | Date;
  rejectedDate?: string | Date;
};

export type OmittedJob<K extends keyof Job> = Omit<Job, K>;
export type OmmitedAppliedJob<K extends keyof AppliedJob> = Omit<AppliedJob, K>;

export type FavoriteJob = {
  favoriteDate: string;
  id: number;
  jobId: number;
  userId: number;
};

export type CompanyJobsApplied = Pick<
  AppliedJob,
  "id" | "applicationDate" | "applicationStatus"
> & {
  job: Pick<
    Job,
    | "id"
    | "position"
    | "category"
    | "salary"
    | "style"
    | "experienceLevel"
    | "location"
    | "jobDescriptions"
    | "jobType"
    | "qualifications"
    | "urgent"
  >;
} & {
  user: Pick<User, "id" | "email" | "firstName" | "lastName" | "userProfile">;
};
