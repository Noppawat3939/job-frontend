import type { CreateResumeSchema } from "@/schemas";
import { create } from "zustand";

type ThemeTemplate = Record<
  "background" | "title" | "subtitle" | "paragraph",
  string
>;

type ResumeStore = {
  data: CreateResumeSchema;
  setData: (value: CreateResumeSchema) => void;
  theme: ThemeTemplate;
  setTheme: (theme: ThemeTemplate) => void;
  resetTheme: () => void;
};

const initialData: CreateResumeSchema = {
  firstName: "",
  lastName: "",
  about: "",
  education: [{ institute: "", startDate: null, endDate: null, projects: "" }],
  work: [
    {
      position: "",
      currently: false,
      company: "",
      startDate: null,
      endDate: null,
      responsible: "",
    },
  ],
  email: "",
  address: "",
  phone_number: "",
  socials: [{ social: null, url: "" }],
};

const initialTheme: ThemeTemplate = {
  background: "",
  paragraph: "",
  title: "",
  subtitle: "",
};

export const useResumeStore = create<ResumeStore>((set, get) => ({
  data: initialData,
  setData: (newData) => set({ data: newData }),
  theme: initialTheme,
  setTheme: (newTheme) =>
    set(() => ({ theme: { ...get().theme, ...newTheme } })),
  resetTheme: () => set({ theme: initialTheme }),
}));
