import { SigninCompanySchema, SigninUserSchema } from "@/schemas";
import { create } from "zustand";

type SigninDialogStore = {
  open: boolean;
  values: SigninUserSchema & SigninCompanySchema;
  setOpen: () => void;
  setClose: () => void;
  onOpenChange: (open: boolean) => void;
  setValues: (value: SigninUserSchema & SigninCompanySchema) => void;
  reset: () => void;
};

const initial = {
  values: { email: "", password: "", companyName: "" },
};

export const signinDialogStore = create<SigninDialogStore>((set, get) => ({
  open: false,
  values: initial.values,
  setOpen: () => set({ open: true }),
  setClose: () => set({ open: false }),
  onOpenChange: (open) => set({ open }),
  setValues: (values) => set({ values }),
  reset: () => set({ values: initial.values, open: false }),
}));
