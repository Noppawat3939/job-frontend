import {
  JOB_EXP_LEVEL,
  JOB_TYPE,
  RESUME_SOCICALS,
  WORK_STYLES,
} from "@/constants";
import { z } from "zod";

const PASSWORD = { MIN: 8, MAX: 20 };
const COMMON_FIELDS = { MIN: 2 };
const SALARY_RANGE_BAHT = { START_MIN: 0, START_MAX: 1 };

const requiredMessage = (field: string) => `${field} is required`;
const minLenMessage = (field: string, min?: number) =>
  `${field} must be at least ${min || COMMON_FIELDS.MIN} charactors`;
const invalidValueMessage = (field: string) => `${field} is invalid`;

export const emailSchema = {
  create: z.string().email({ message: "Email is invalid format" }),
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

export const fullNameSchema = {
  create: z
    .string({ required_error: requiredMessage("Fullname") })
    .min(COMMON_FIELDS.MIN, { message: minLenMessage("Fullname") }),
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

export const positionJobSchema = {
  create: z
    .string({ required_error: requiredMessage("Position") })
    .min(COMMON_FIELDS.MIN, { message: minLenMessage("Position") }),
};

export const workStyleJobSchema = {
  create: z.enum(WORK_STYLES, {
    errorMap: () => ({ message: invalidValueMessage("Work style") }),
  }),
};

export const locationJobSchema = {
  create: z
    .string({ required_error: requiredMessage("Location") })
    .min(COMMON_FIELDS.MIN, { message: minLenMessage("Industry") }),
};

export const categoryJobSchema = {
  create: z
    .string({ required_error: requiredMessage("Category job") })
    .min(COMMON_FIELDS.MIN, { message: minLenMessage("Category job") }),
};

export const salaryJobSchema = {
  create: z
    .tuple([
      z
        .number()
        .min(SALARY_RANGE_BAHT.START_MIN, {
          message: `Salary should be mininum min range ${SALARY_RANGE_BAHT.START_MIN} baht`,
        })
        .optional(),
      z
        .number()
        .min(SALARY_RANGE_BAHT.START_MAX, {
          message: `Salary should be minimum max range ${SALARY_RANGE_BAHT.START_MAX} baht`,
        })
        .optional(),
    ])
    .refine((values) => values[1]! > values?.[0]!, {
      message:
        "Salary max value range should more than or requal min value range",
    })
    .or(z.tuple([z.number().default(SALARY_RANGE_BAHT.START_MIN)]))
    .or(z.number().default(SALARY_RANGE_BAHT.START_MIN)),
};

export const descriptionJobSchema = {
  common: z.string().array().optional(),
  create: z.string().array().optional(),
};

export const qualificationJobSchema = {
  common: z.string().array().optional(),
  create: z.string().array().optional(),
};

export const benefitJobSchema = {
  common: z.string().array().optional(),
  create: z.string().array().optional(),
};
export const contractJobSchema = {
  common: z.string().array().optional(),
  create: z.string().array().optional(),
};
export const transportJobSchema = {
  common: z.string().array().optional(),
  create: z.string().array().optional(),
};

export const jobTypeSchema = {
  create: z.enum(JOB_TYPE, {
    errorMap: () => ({ message: invalidValueMessage("Job type") }),
  }),
  update: z
    .enum(JOB_TYPE, {
      errorMap: () => ({ message: invalidValueMessage("Job type") }),
    })
    .optional(),
};

export const experienceLevelSchema = {
  create: z.enum(
    JOB_EXP_LEVEL,

    {
      errorMap: () => ({ message: invalidValueMessage("Job experience") }),
    }
  ),
  update: z
    .enum(JOB_EXP_LEVEL, {
      errorMap: () => ({ message: invalidValueMessage("Job experience") }),
    })
    .optional(),
};

export const verifyCodeSchema = {
  common: z.string().optional(),
};

export const oobCodeSchema = {
  common: z.string().optional(),
};

export const aboutMeSchema = {
  common: z.string().optional(),
};

export const resumeEducationSchema = {
  common: z.object({
    institute: z.string().optional(),
    major: z.string().optional(),
    startDate: z.string().optional().nullable(),
    endDate: z.string().optional().nullable(),
    projects: z.string().optional(),
  }),
};

export const resumeWorkExpirenceSchema = {
  common: z.object({
    position: z.string().optional(),
    company: z.string().optional(),
    startDate: z.string().optional().nullable(),
    endDate: z.string().optional().nullable(),
    currently: z.boolean().optional().default(false),
    responsible: z.string().optional(),
  }),
};

export const resumeSocialSchema = {
  common: z.object({
    social: z.enum(RESUME_SOCICALS).nullable(),
    url: z.string().optional(),
  }),
};

export const addressSchema = {
  common: z.string().optional(),
};

export const phoneNumberSchema = {
  common: z.string().optional(),
};

export const refNumberSchema = {
  create: z.string({ required_error: "Ref no. is required" }),
};

export const paymentSlipImageSchema = {
  create: z.string().optional(),
};
