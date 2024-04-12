import type { ServiceResponse } from "@/types";
import type { User } from "@/types/user";
import { service } from "..";
import { URL } from "@/constants";
import { getTokenWithHeaders } from "@/lib";

const { USER } = URL;

type MeResponse = ServiceResponse<{ data: User }>;
type UsersResponse = ServiceResponse<{ data: User[]; total: number }>;
type UserApproveResponse = ServiceResponse<undefined>;

export const fetchUser = async (token?: string) => {
  const { data } = await service.get<MeResponse>(
    USER.GET_ME,
    token
      ? { headers: { Authorization: `Bearer ${token}` } }
      : getTokenWithHeaders()
  );

  return data;
};

export const fetchUsers = async () => {
  const { data } = await service.get<UsersResponse>(
    USER.GET_USERS,
    getTokenWithHeaders()
  );
  return data;
};

export const approveUser = async (id: number) => {
  const { data } = await service.post<UserApproveResponse>(
    USER.APPROVE.replace(":id", String(id)),
    undefined,
    getTokenWithHeaders()
  );
  return data;
};

export const rejectUser = async (id: number) => {
  const { data } = await service.post<UserApproveResponse>(
    USER.REJECT.replace(":id", String(id)),
    undefined,
    getTokenWithHeaders()
  );
  return data;
};

export const unApproveUser = async (id: number) => {
  const { data } = await service.post<UserApproveResponse>(
    USER.UN_APPROVE.replace(":id", String(id)),
    undefined,
    getTokenWithHeaders()
  );
  return data;
};
