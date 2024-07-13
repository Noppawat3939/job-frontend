import { URL } from "@/constants";
import serivce from "../api";
import { getTokenWithHeaders } from "@/lib";
import type { PaymentTransaction, ServiceResponse } from "@/types";
import { CreateTransactionSchema } from "@/schemas";

const { PAYMENT } = URL;

type CreateQRSourceResponse = ServiceResponse<{
  data: {
    qrcode: string;
    expired_in: string;
    refNo: string;
  };
}>;

type CreateTransactionResponse = ServiceResponse<{ data: PaymentTransaction }>;

export const createQRSource = async (body: {
  code_key: string;
  period: string;
}) => {
  const { data } = await serivce.post<CreateQRSourceResponse>(
    PAYMENT.CREATE_QR_SOURCE,
    body,
    getTokenWithHeaders()
  );

  return data;
};

export const createTransaction = async (body: CreateTransactionSchema) => {
  const { data } = await serivce.post<CreateTransactionResponse>(
    PAYMENT.CREATE_TRANSACTION,
    body,
    getTokenWithHeaders()
  );
  return data;
};

export const getTransactions = async (params?: { status?: string }) => {
  const { data } = await serivce.get(PAYMENT.GET_TRANSACTIONS, {
    ...getTokenWithHeaders(),
    params,
  });

  return data;
};
