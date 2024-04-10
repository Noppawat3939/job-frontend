import { URL } from "@/constants";
import { service } from "..";
import { getTokenWithHeaders } from "@/lib";
import { Job, ServiceResponse } from "@/types";

const { JOB } = URL;

type JobsResponse = ServiceResponse<{ data: Job[]; total: number }>;

export const fetchJobs = async () => {
  const { data } = await service.get<JobsResponse>(
    JOB.GET_JOBS,
    getTokenWithHeaders()
  );
  return data;
};

export const fetchJob = async (id: number) => {
  const { data } = await service.get(JOB.GET_JOB.replace(":id", String(id)));
  return data;
};

export const createJob = async () => {
  const { data } = await service.post(JOB.CREATE);
  return data;
};
