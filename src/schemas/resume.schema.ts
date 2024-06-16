import { z } from "zod";
import {
  aboutMeSchema,
  firstNameSchema,
  lastNameSchema,
  resumeEducationSchema,
  resumeWorkExpirenceSchema,
} from "./schemas";

export const createResumeSchema = z.object({
  firstName: firstNameSchema.common,
  lastName: lastNameSchema.common,
  about: aboutMeSchema.common,
  education: z.array(resumeEducationSchema.common),
  work: z.array(resumeWorkExpirenceSchema.common),
});

export type CreateResumeSchema = z.infer<typeof createResumeSchema>;
