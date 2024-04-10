import { WORK_STYLES } from "@/constants";

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
