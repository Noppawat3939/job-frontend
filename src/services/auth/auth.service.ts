import { URL } from "@/constants";
import serivce from "../api";

const { AUTH } = URL;

export const signupWithAdmin = async () => {
  const { data } = await serivce.post(AUTH.SIGNUP_ADMIN);
  return data;
};

export const signupWithUser = async () => {
  const { data } = await serivce.post(AUTH.SIGNUP_USER);
  return data;
};

export const signupWithCompany = async () => {
  const { data } = await serivce.post(AUTH.SIGNUP_COMPANY);
  return data;
};

export const signin = async () => {
  const { data } = await serivce.post(AUTH.SIGNIN);
  return data;
};

export const signinWithCompany = async () => {
  const { data } = await serivce.post(AUTH.SIGNIN_COMPANY);
  return data;
};

export const forgotPassword = async () => {
  const { data } = await serivce.patch(AUTH.FORGOT_PASSWORD);
  return data;
};

export const forgotPasswordWithCompany = async () => {
  const { data } = await serivce.patch(AUTH.FORGOT_PASSWORD_COMPANY);
  return data;
};
