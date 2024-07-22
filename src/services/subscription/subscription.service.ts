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

type UpdateSubscriptionStatusResponse = ServiceResponse;

export const getSubscribeList = async (params?: {
  status?: SubscriptionStatus[];
}) => {
  const { data } = await service.get<SubscriptionResponse>(
    SUBSCRIPTION.GET_ALL,
    { ...getTokenWithHeaders(), params }
  );
  return data;
};

export const confrimVerifySubscription = async (body: {
  id: string;
  refNumber: string;
}) => {
  const { data } = await service.post<UpdateSubscriptionStatusResponse>(
    SUBSCRIPTION.UPDATE_COMPLETE,
    body,
    getTokenWithHeaders()
  );
  return data;
};

export const confirmRejectSubscription = async (body: {
  refNumber: string;
}) => {
  const { data } = await service.post<UpdateSubscriptionStatusResponse>(
    SUBSCRIPTION.UPDATE_REJECT,
    body,
    getTokenWithHeaders()
  );
  return data;
};
