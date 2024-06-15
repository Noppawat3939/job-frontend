import { URL } from "@/constants";
import { service } from "..";
import { getTokenWithHeaders } from "@/lib";
import { ResumeTemplate, ServiceResponse } from "@/types";

const { DOCUMENT } = URL;

export type GetResumeTemplatesResponse = ServiceResponse<{
  data: ResumeTemplate[];
  total: number;
}>;

export const getResumeTemplates = async () => {
  const { data } = await service.get<GetResumeTemplatesResponse>(
    DOCUMENT.GET_RESUME_TEMPLATES,
    getTokenWithHeaders()
  );

  return data;
};
