import type { ServiceResponse } from "@/types";
import type { User } from "@/types/user";
import { service } from "..";
import { getCookie } from "cookies-next";
import { URL } from "@/constants";

const { USER } = URL;

type MeResponse = ServiceResponse<{ data: User }>;

const headersWithToken = {
  ...(getCookie("token") && {
    headers: { Authorization: `Bearer ${getCookie("token")}` },
  }),
};

export const fetchUser = async () => {
  return await service.get<MeResponse>(USER.GET_ME, headersWithToken);
};
