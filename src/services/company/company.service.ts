import { URL } from "@/constants";
import serivce from "../api";
import { getTokenWithHeaders } from "@/lib";
import type { CompanyJobsApplied, Job, ServiceResponse } from "@/types";

const { COMPANY } = URL;

type GetCompanyJobsResponse = ServiceResponse<{ data: Job[]; total: number }>;
type GetCompanyJobsAppliedResponse = ServiceResponse<{
  data: CompanyJobsApplied[];
  total: number;
}>;
type GetCompanyJobAppliedByIdResponse = ServiceResponse<{
  data: CompanyJobsApplied;
}>;

export const fetchCompanyJobs = async () => {
  const { data } = await serivce.get<GetCompanyJobsResponse>(
    COMPANY.GET_JOBS,
    getTokenWithHeaders()
  );

  return data;
};

export const fetchJobsApplied = async () => {
  const { data } = await serivce.get<GetCompanyJobsAppliedResponse>(
    COMPANY.GET_JOBS_APPIED,
    getTokenWithHeaders()
  );

  return data;
};

export const fetchJobAppliedById = async (id: number) => {
  const { data } = await serivce.get<GetCompanyJobAppliedByIdResponse>(
    COMPANY.GET_JOB_APPIED.replace(":id", String(id)),
    getTokenWithHeaders()
  );
  return data;
};
