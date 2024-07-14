import type {
  ServiceResponse,
  SubscriptionStatus,
  Subscriptions,
} from "@/types";
import { URL } from "@/constants";
import { service } from "..";
import { getTokenWithHeaders } from "@/lib";

const { SUBSCRIPTION } = URL;

type SubscriptionResponse = ServiceResponse<{
  data: Subscriptions[];
  total: number;
}>;

export const getSubscribeList = async (params?: {
  status?: SubscriptionStatus;
}) => {
  const { data } = await service.get<SubscriptionResponse>(
    SUBSCRIPTION.GET_ALL,
    { ...getTokenWithHeaders(), params }
  );
  return data;
};
