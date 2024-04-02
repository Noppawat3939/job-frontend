import { type AxiosRequestConfig } from "axios";
import { URL } from "@/constants";
import serivce from "../api";
import { Job, ServiceResponse } from "@/types";

const { PUBLIC } = URL;

type OmittedJob = Omit<
  Job,
  | "companyProfile"
  | "contracts"
  | "transports"
  | "jobDescriptions"
  | "benefits"
  | "qualifications"
>;

type PbJobsResponse = ServiceResponse<{
  data: OmittedJob[];
  total: number;
}>;

type PbJobResponse = ServiceResponse<{ data: Job }>;

const apikeyHeaders: AxiosRequestConfig<unknown> = {
  headers: { ["api-key"]: String(process.env.NEXT_PUBLIC_API_KEY) },
};

export const getProvinces = async () => {
  const { data } = await serivce.get(PUBLIC.GET_PROVINCES);
  return data;
};

export const getPublicIndustries = async () => {
  const { data } = await serivce.get(PUBLIC.GET_INDUSTRUES, apikeyHeaders);
  return data;
};

export const getPublicJobs = async () => {
  const { data } = await serivce.get<PbJobsResponse>(
    PUBLIC.GET_JOBS,
    apikeyHeaders
  );
  return data;
};

export const getPublicJob = async (id: string | number) => {
  const { data } = await serivce.get<PbJobResponse>(
    PUBLIC.GET_JOB.replace(":id", String(id)),
    apikeyHeaders
  );
  return data;
};
