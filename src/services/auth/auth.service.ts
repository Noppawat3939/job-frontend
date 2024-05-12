import type {
  ForgotPasswordCompanySchema,
  ForgotPasswordUserSchema,
  SigninCompanySchema,
  SigninUserSchema,
  SignupCompanySchema,
  SignupUserSchema,
} from "@/schemas";
import serivce from "../api";
import { URL } from "@/constants";
import { ServiceResponse } from "@/types";
import { isUndifined } from "@/lib";

const { AUTH } = URL;

type SignupResponse = ServiceResponse;
type SigninResponse = ServiceResponse<{ data: string }>;
type GetSigninSocialUrlResponse = ServiceResponse<{ data: string }>;

export const signupWithAdmin = async (body: SignupUserSchema) => {
  const { data } = await serivce.post(AUTH.SIGNUP_ADMIN, body);
  return data;
};

export const signupWithUser = async (body: SignupUserSchema) => {
  const { data } = await serivce.post<SignupResponse>(AUTH.SIGNUP_USER, body);
  return data;
};

export const signupWithCompany = async (body: SignupCompanySchema) => {
  const { data } = await serivce.post<SignupResponse>(
    AUTH.SIGNUP_COMPANY,
    body
  );
  return data;
};

export const signin = async (body: SigninUserSchema) => {
  const { data } = await serivce.post<SigninResponse>(AUTH.SIGNIN, body);
  return data;
};

export const signinWithCompany = async (body: SigninCompanySchema) => {
  const { data } = await serivce.post<SigninResponse>(
    AUTH.SIGNIN_COMPANY,
    body
  );
  return data;
};

export const forgotPassword = async (body: ForgotPasswordUserSchema) => {
  const { data } = await serivce.patch(AUTH.FORGOT_PASSWORD, body);
  return data;
};

export const forgotPasswordWithCompany = async (
  body: ForgotPasswordCompanySchema
) => {
  const { data } = await serivce.patch(AUTH.FORGOT_PASSWORD_COMPANY, body);
  return data;
};

export const getUrlSigninWithSocial = async (apiKey: string) => {
  const { data } = await serivce.get<GetSigninSocialUrlResponse>(
    AUTH.GET_URL_SIGNIN_SOCIAL,
    {
      headers: {
        ["api-key"]: apiKey,
        ...(!isUndifined(window) && { ["callback-url"]: window.location.href }),
      },
    }
  );
  return data;
};
