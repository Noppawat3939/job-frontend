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

type GetJobsResponse = ServiceResponse<{
  data: OmittedJob[];
  total: number;
}>;

type GetJobResponse = ServiceResponse<{ data: Job }>;
type GetIndustriesResponse = ServiceResponse<{
  data: { id: number; name: string }[];
  total: number;
}>;

const apikeyHeaders: AxiosRequestConfig<unknown> = {
  headers: { ["api-key"]: String(process.env.NEXT_PUBLIC_API_KEY) },
};

export const getProvinces = async () => {
  const { data } = await serivce.get(PUBLIC.GET_PROVINCES);
  return data;
};

export const getPublicIndustries = async () => {
  const { data } = await serivce.get<GetIndustriesResponse>(
    PUBLIC.GET_INDUSTRUES,
    apikeyHeaders
  );
  return data;
};

export const getPublicJobs = async () => {
  const { data } = await serivce.get<GetJobsResponse>(
    PUBLIC.GET_JOBS,
    apikeyHeaders
  );
  return data;
};

export const getPublicJob = async (id: string | number) => {
  const { data } = await serivce.get<GetJobResponse>(
    PUBLIC.GET_JOB.replace(":id", String(id)),
    apikeyHeaders
  );
  return data;
};
