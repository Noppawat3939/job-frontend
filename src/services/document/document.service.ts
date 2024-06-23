import { URL } from "@/constants";
import { service } from "..";
import { getTokenWithHeaders } from "@/lib";
import type {
  CreateResume,
  Nullable,
  ResumeTemplate,
  ServiceResponse,
  UserResume,
} from "@/types";

const { DOCUMENT } = URL;

export type GetResumeTemplatesResponse = ServiceResponse<{
  data: ResumeTemplate[];
  total: number;
}>;
export type CreateResumeResponse = ServiceResponse<{
  data: CreateResume & {
    active: Nullable<boolean>;
    userId: number;
    createdAt: string;
    updatedAt: string;
  };
}>;
type GetUserResumes = ServiceResponse<{ data: UserResume[]; total: number }>;
type GetUserResume = ServiceResponse<{ data: UserResume }>;

export const getResumeTemplates = async () => {
  const { data } = await service.get<GetResumeTemplatesResponse>(
    DOCUMENT.GET_RESUME_TEMPLATES,
    getTokenWithHeaders()
  );

  return data;
};

export const createResume = async (body: CreateResume) => {
  const { data } = await service.post<CreateResumeResponse>(
    DOCUMENT.CREATE_RESUME,
    body,
    getTokenWithHeaders()
  );
  return data;
};

export const getUserResume = async () => {
  const { data } = await service.get<GetUserResumes>(
    DOCUMENT.GET_USER_RESUME,
    getTokenWithHeaders()
  );
  return data;
};

export const getUserResumeById = async (id: number) => {
  const { data } = await service.get<GetUserResume>(
    DOCUMENT.GET_USER_RESUME_BY_ID.replace(":id", String(id)),
    getTokenWithHeaders()
  );
  return data;
};
