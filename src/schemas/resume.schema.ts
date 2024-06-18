import { z } from "zod";
import {
  aboutMeSchema,
  addressSchema,
  emailSchema,
  firstNameSchema,
  lastNameSchema,
  phoneNumberSchema,
  resumeEducationSchema,
  resumeSocialSchema,
  resumeWorkExpirenceSchema,
} from "./schemas";

export const createResumeSchema = z.object({
  firstName: firstNameSchema.common,
  lastName: lastNameSchema.common,
  about: aboutMeSchema.common,
  education: z.array(resumeEducationSchema.common),
  work: z.array(resumeWorkExpirenceSchema.common),
  email: emailSchema.common,
  phone_number: phoneNumberSchema.common,
  address: addressSchema.common,
  socials: z.array(resumeSocialSchema.common),
});

export type CreateResumeSchema = z.infer<typeof createResumeSchema>;
