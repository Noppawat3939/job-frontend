import { SigninCompanySchema, SigninUserSchema } from "@/schemas";
import { create } from "zustand";

type SigninDialog = {
  open: boolean;
  values: SigninUserSchema & SigninCompanySchema;
  setOpen: () => void;
  setClose: () => void;
  setValues: (value: SigninUserSchema & SigninCompanySchema) => void;
  reset: () => void;
};

const initial = {
  values: { email: "", password: "", companyName: "" },
};

export const useSigninDialog = create<SigninDialog>((set, get) => ({
  open: false,
  values: initial.values,
  setOpen: () => set({ open: true }),
  setClose: () => set({ open: false }),
  setValues: (values) => set({ values }),
  reset: () => set({ values: initial.values, open: false }),
}));
