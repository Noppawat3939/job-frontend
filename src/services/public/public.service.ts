import { URL } from "@/constants";
import serivce from "../api";
import type {
  Job,
  JobCategory,
  Province,
  ServiceResponse,
  SubscribeDetail,
  Testimonial,
} from "@/types";
import { apikeyHeaders } from "@/lib";

const { PUBLIC } = URL;

type GetJobResponse = ServiceResponse<{ data: Job }>;
export type GetJobCategoriesResponse = ServiceResponse<{
  data: JobCategory[];
  total: number;
}>;

export type GetIndustriesResponse = ServiceResponse<{
  data: { id: number; name: string }[];
  total: number;
}>;

export type GetProvinceResponse = ServiceResponse<{
  total: number;
  data: Province[];
}>;

export type GetTestimonailsResponse = ServiceResponse<{
  total: number;
  data: Testimonial[];
}>;

type GetSubscribeResponse = ServiceResponse<{ data: SubscribeDetail[] }>;

export const getProvinces = async () => {
  const { data } = await serivce.get<GetProvinceResponse>(
    PUBLIC.GET_PROVINCES,
    apikeyHeaders
  );
  return data;
};

export const getPublicIndustries = async () => {
  const { data } = await serivce.get<GetIndustriesResponse>(
    PUBLIC.GET_INDUSTRUES,
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

export const getJobCategories = async () => {
  const { data } = await serivce.get<GetJobCategoriesResponse>(
    PUBLIC.GET_JOB_CATEGORIES,
    apikeyHeaders
  );
  return data;
};

export const getTestimonails = async () => {
  const { data } = await serivce.get<GetTestimonailsResponse>(
    PUBLIC.GET_TESTIMONIALS,
    apikeyHeaders
  );
  return data;
};

export const getSubscribeDetail = async (params?: { plan?: string }) => {
  const { data } = await serivce.get<GetSubscribeResponse>(
    PUBLIC.GET_SUBSCRIBE_DATA,
    { ...apikeyHeaders, params }
  );
  return data;
};
