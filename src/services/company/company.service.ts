import { URL } from "@/constants";
import serivce from "../api";
import { getTokenWithHeaders } from "@/lib";
import type {
  ApplicationStatus,
  AppliedJob,
  CompanyJobsApplied,
  Job,
  ServiceResponse,
} from "@/types";

const { COMPANY } = URL;

type GetCompanyJobsResponse = ServiceResponse<{ data: Job[]; total: number }>;
type GetCompanyJobsAppliedResponse = ServiceResponse<{
  data: CompanyJobsApplied[];
  total: number;
}>;
type GetCompanyJobAppliedByIdResponse = ServiceResponse<{
  data: CompanyJobsApplied;
}>;
type UpdateApplicationStatusResponse = ServiceResponse<{ data: AppliedJob }>;

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

export const updateApplicationStatus = async ({
  id,
  status,
}: {
  id: string | number;
  status: ApplicationStatus;
}) => {
  const { data } = await serivce.post<UpdateApplicationStatusResponse>(
    COMPANY.UPDATE_APPLICATION_STATUS.replace(":id", String(id)),
    { status },
    getTokenWithHeaders()
  );
  return data;
};
