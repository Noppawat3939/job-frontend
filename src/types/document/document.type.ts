import { RESUME_SOCICALS } from "@/constants";
import { Nullable } from "..";

export interface ResumeTemplate {
  id: number;
  image: string;
  backgroundColor?: string;
  titleColor?: string;
  subTitileColor?: string;
  paragraphColor?: string;
}

interface Education {
  institute: string;
  startDate: string;
  endDate: string;
  projects: string;
  major: string;
}

interface Work {
  position: string;
  startDate: string;
  endDate: string;
  responsible: string;
}

export type ResumeSocial = keyof typeof RESUME_SOCICALS;

interface Social {
  social: Nullable<ResumeSocial>;
  url: string;
}
interface Contact {
  email: string;
  phone_number: string;
  address: string;
  socials: Social[];
}

export type ResumeCookieData = {
  subscriptionId: number;
  templateId: number;
  background: {
    firstName: string;
    lastName: string;
    about: string;
    education: Education[];
  };
  work: Work[];
  contact: Contact;
};

export type CreateResume = {
  position: string;
  templateId: number;
  templateData: string;
  backgroundColorTemplate?: string;
  titleColorTemplate?: string;
  subTitileColorTemplate?: string;
  paragraphColorTemplate?: string;
};

export type UserResume = CreateResume & {
  active: Nullable<boolean>;
  id: number;
  userId: number;
  createdAt: string;
  updatedAt: string;
  template?: ResumeTemplate;
};
