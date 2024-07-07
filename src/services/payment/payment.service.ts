import { URL } from "@/constants";
import serivce from "../api";
import { getTokenWithHeaders } from "@/lib";
import { ServiceResponse } from "@/types";

const { PAYMENT } = URL;

type CreateQRSourceResponse = ServiceResponse<{
  data: {
    qrcode: string;
    expired_in: string;
  };
}>;

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
