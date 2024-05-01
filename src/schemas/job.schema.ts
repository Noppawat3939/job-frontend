import { z } from "zod";
import {
  benefitJobSchema,
  categoryJobSchema,
  contractJobSchema,
  descriptionJobSchema,
  experienceLevelSchema,
  jobTypeSchema,
  locationJobSchema,
  positionJobSchema,
  qualificationJobSchema,
  salaryJobSchema,
  transportJobSchema,
  workStyleJobSchema,
} from "./schemas";

export const createNewJobSchema = z.object({
  position: positionJobSchema.create,
  style: workStyleJobSchema.create,
  location: locationJobSchema.create,
  salary: salaryJobSchema.create,
  jobDescriptions: descriptionJobSchema.create,
  qualifications: qualificationJobSchema.create,
  benefits: benefitJobSchema.create,
  contracts: contractJobSchema.create,
  transports: transportJobSchema.create,
  jobType: jobTypeSchema.create,
  experienceLevel: experienceLevelSchema.create,
  category: categoryJobSchema.create,
});

export type CreateNewJobSchema = z.infer<typeof createNewJobSchema>;
