import type { CreateResumeSchema } from "@/schemas";
import { create } from "zustand";

type ResumeStore = {
  data: CreateResumeSchema;
  setData: (value: CreateResumeSchema) => void;
};

const initialData = {
  firstName: "",
  lastName: "",
  about: "",
  education: [{ institute: "", startDate: null, endDate: null, projects: "" }],
  work: [{ position: "", startDate: null, endDate: null, responsible: "" }],
  email: "",
  address: "",
  phone_number: "",
  socials: [{ social: null, url: "" }],
};

export const useResumeStore = create<ResumeStore>((set) => ({
  data: initialData,
  setData: (newData) => set({ data: newData }),
}));
