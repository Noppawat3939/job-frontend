import type { AppliedJob, Job, ServiceResponse } from "@/types";
import { service } from "..";
import { URL } from "@/constants";
import { getTokenWithHeaders } from "@/lib";
import { CreateNewJobSchema } from "@/schemas";

const { JOB } = URL;

type JobsResponse = ServiceResponse<{ data: Job[]; total: number }>;
type JobResponse = ServiceResponse<{ data: Job }>;
type JobApproveResponse = ServiceResponse<undefined>;
type JobCreatedResponse = ServiceResponse<{ data: Job }>;
type AppliedJobResponse = ServiceResponse<{ data: AppliedJob }>;

export const fetchJobs = async () => {
  const { data } = await service.get<JobsResponse>(
    JOB.GET_JOBS,
    getTokenWithHeaders()
  );
  return data;
};

export const fetchJob = async (id: number) => {
  const { data } = await service.get<JobResponse>(
    JOB.GET_JOB.replace(":id", String(id)),
    getTokenWithHeaders()
  );
  return data;
};

export const createJob = async (body: CreateNewJobSchema) => {
  const { data } = await service.post<JobCreatedResponse>(
    JOB.CREATE,
    body,
    getTokenWithHeaders()
  );
  return data;
};

export const approveJob = async (id: string) => {
  const { data } = await service.post<JobApproveResponse>(
    JOB.APPROVE.replace(":id", id),
    undefined,
    getTokenWithHeaders()
  );
  return data;
};

export const unApproveJob = async (id: string) => {
  const { data } = await service.post<JobApproveResponse>(
    JOB.UN_APPROVE.replace(":id", id),
    undefined,
    getTokenWithHeaders()
  );
  return data;
};

export const rejectJob = async (id: string) => {
  const { data } = await service.post<JobApproveResponse>(
    JOB.REJECT.replace(":id", id),
    undefined,
    getTokenWithHeaders()
  );
  return data;
};

export const applyJob = async (id: string) => {
  const { data } = await service.post<AppliedJobResponse>(
    JOB.APPLY.replace(":id", id),
    undefined,
    getTokenWithHeaders()
  );
  return data;
};
