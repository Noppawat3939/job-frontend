import { RESUME_SOCICALS } from "@/constants";
import { Nullable } from "..";

export interface ResumeTemplate {
  id: number;
  image: string;
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

interface Social {
  social: Nullable<keyof typeof RESUME_SOCICALS>;
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
