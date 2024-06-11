import { z } from "zod";
import {
  companyNameSchema,
  confirmPasswordSchema,
  emailSchema,
  firstNameSchema,
  fullNameSchema,
  industryCompanySchema,
  lastNameSchema,
  newPasswordSchema,
  oobCodeSchema,
  passwordSchema,
  verifyCodeSchema,
} from "./schemas";
import { eq } from "@/lib";

export const signinUserSchema = z.object({
  email: emailSchema.common,
  password: passwordSchema.common,
});

export const signinCompanySchema = signinUserSchema;

export const signupUserSchema = z
  .object({
    fullName: fullNameSchema.create,
    email: emailSchema.create,
    password: passwordSchema.create,
    confirmPassword: confirmPasswordSchema.create,
    oobCode: oobCodeSchema.common,
    verifyCode: verifyCodeSchema.common,
  })
  .refine((field) => eq(field.password, field.confirmPassword), {
    message: "Password and confirm password not match",
    path: ["confirmPassword"],
  });

export const signupCompanySchema = z
  .object({
    email: emailSchema.create,
    password: passwordSchema.create,
    companyName: companyNameSchema.create,
    industry: industryCompanySchema.create,
    confirmPassword: confirmPasswordSchema.create,
  })
  .refine((field) => eq(field.password, field.confirmPassword), {
    message: "Password and confirm password not match",
    path: ["confirmPassword"],
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
