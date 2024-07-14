import { SUBSCRIBE_STATUS } from "@/constants";
import type { PaymentTransaction as TTransaction } from "..";
import type { User } from "../user";

type TUser = Pick<User, "firstName" | "lastName" | "email">;
type TSubscription = Omit<Subscription, "userId">;

const subscribeStatus = Object.values(SUBSCRIBE_STATUS);

export type Subscriptions = {
  user: TUser;
  transaction: TTransaction;
  subscription: TSubscription;
};

export type Subscription = {
  id: number;
  createdAt: string;
  updatedAt: string;
  status: SubscriptionStatus;
  type: string;
  userId: number;
};

export type SubscriptionStatus = (typeof subscribeStatus)[number];
