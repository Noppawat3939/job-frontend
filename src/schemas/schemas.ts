import { z } from "zod";

const PASSWORD = { MIN: 8, MAX: 20 };
const COMMON_FIELDS = { MIN: 2 };

const requiredMessage = (field: string) => `${field} is required`;
const minLenMessage = (field: string, min?: number) =>
  `${field} must be at least ${min || COMMON_FIELDS.MIN} charactors`;

export const emailSchema = {
  create: z
    .string()
    .email({ message: "Email is invalid format" })
    .min(1, { message: requiredMessage("Email") }),
  common: z.string().min(1, { message: requiredMessage("Email") }),
};

export const passwordSchema = {
  create: z
    .string({ required_error: requiredMessage("Password") })
    .min(PASSWORD.MIN, {
      message: minLenMessage("Password", PASSWORD.MIN),
    })
    .max(PASSWORD.MAX, {
      message: `Password must be maximun ${PASSWORD.MAX} charactors`,
    }),
  common: z
    .string({ required_error: requiredMessage("Password") })
    .min(1, { message: requiredMessage("Password") }),
};

export const confirmPasswordSchema = {
  create: z
    .string({ required_error: requiredMessage("Confirm password") })
    .min(1, { message: requiredMessage("Confirm password") }),
};

export const newPasswordSchema = {
  create: z
    .string({ required_error: requiredMessage("New password") })
    .min(PASSWORD.MIN, {
      message: minLenMessage("New password", PASSWORD.MIN),
    })
    .max(PASSWORD.MAX, {
      message: `New password must be maximun ${PASSWORD.MAX} charactors`,
    }),
};

export const firstNameSchema = {
  create: z
    .string({ required_error: requiredMessage("Firstname") })
    .min(COMMON_FIELDS.MIN, { message: minLenMessage("Firstname") }),
  common: z.string(),
};

export const lastNameSchema = {
  create: z
    .string({ required_error: requiredMessage("Lastname") })
    .min(COMMON_FIELDS.MIN, { message: minLenMessage("Lastname") }),
  common: z.string(),
};

export const companyNameSchema = {
  create: z
    .string({ required_error: requiredMessage("Company name") })
    .min(COMMON_FIELDS.MIN, {
      message: minLenMessage("Company"),
    }),
  common: z
    .string({ required_error: requiredMessage("Company name") })
    .min(1, { message: requiredMessage("Company name") }),
};

export const industryCompanySchema = {
  create: z
    .string({ required_error: requiredMessage("Industry") })
    .min(COMMON_FIELDS.MIN, { message: minLenMessage("Industry") }),
  common: z.string({ required_error: requiredMessage("Industry") }),
};
