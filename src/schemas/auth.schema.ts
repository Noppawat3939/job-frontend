import { z } from "zod";
import {
  companyNameSchema,
  emailSchema,
  firstNameSchema,
  industryCompanySchema,
  lastNameSchema,
  newPasswordSchema,
  passwordSchema,
} from "./schemas";

export const signinUserSchema = z.object({
  email: emailSchema.common,
  password: passwordSchema.common,
});

export const signinCompanySchema = signinUserSchema.merge(
  z.object({
    companyName: companyNameSchema.common,
  })
);

export const signupUserSchema = z.object({
  email: emailSchema.create,
  password: passwordSchema.create,
  firstName: firstNameSchema.create,
  lastName: lastNameSchema.create,
});

export const signupCompanySchema = z.object({
  email: emailSchema.create,
  password: passwordSchema.create,
  companyName: companyNameSchema.create,
  industry: industryCompanySchema.create,
});

export const forgotPasswordUserSchema = z.object({
  newPassword: newPasswordSchema.create,
  email: emailSchema.common,
});

export const forgotPasswordCompanySchema = forgotPasswordUserSchema.merge(
  z.object({ companyName: companyNameSchema.common })
);

export type SigninUserSchema = z.infer<typeof signinUserSchema>;
export type SigninCompanySchema = z.infer<typeof signinCompanySchema>;
export type SignupUserSchema = z.infer<typeof signupUserSchema>;
export type SignupCompanySchema = z.infer<typeof signupCompanySchema>;
export type ForgotPasswordUserSchema = z.infer<typeof forgotPasswordUserSchema>;
export type ForgotPasswordCompanySchema = z.infer<
  typeof forgotPasswordCompanySchema
>;
