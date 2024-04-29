import { URL } from "@/constants";
import serivce from "../api";
import { getTokenWithHeaders } from "@/lib";
import { Job, ServiceResponse } from "@/types";

const { COMPANY } = URL;

type GetCompanyJobsResponse = ServiceResponse<{ data: Job[]; total: number }>;

export const fetchCompanyJobs = async () => {
  const { data } = await serivce.get<GetCompanyJobsResponse>(
    COMPANY.GET_JOBS,
    getTokenWithHeaders()
  );
  return data;
};
