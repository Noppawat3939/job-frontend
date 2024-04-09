import type { ServiceResponse } from "@/types";
import type { User } from "@/types/user";
import { service } from "..";
import { getCookie } from "cookies-next";
import { URL } from "@/constants";

const { USER } = URL;

type MeResponse = ServiceResponse<{ data: User }>;
type UsersResponse = ServiceResponse<{ data: User[]; total: number }>;

const headersWithToken = {
  ...(getCookie("token") && {
    headers: { Authorization: `Bearer ${getCookie("token")}` },
  }),
};

export const fetchUser = async (token?: string) => {
  const { data } = await service.get<MeResponse>(
    USER.GET_ME,
    token ? { headers: { Authorization: `Bearer ${token}` } } : headersWithToken
  );

  return data;
};

export const fetchUsers = async () => {
  const { data } = await service.get<UsersResponse>(
    USER.GET_USERS,
    headersWithToken
  );
  return data;
};

export const approveUser = async (id: number) => {
  const { data } = await service.patch(
    USER.APPROVE.replace(":id", String(id)),
    undefined,
    headersWithToken
  );
  return data;
};

export const rejectUser = async (id: number) => {
  const { data } = await service.patch(
    USER.REJECT.replace(":id", String(id)),
    undefined,
    headersWithToken
  );
  return data;
};

export const unApproveUser = async (id: number) => {
  const { data } = await service.patch(
    USER.UN_APPROVE.replace(":id", String(id)),
    undefined,
    headersWithToken
  );
  return data;
};
