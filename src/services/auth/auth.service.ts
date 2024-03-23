import { URL } from "@/constants";
import serivce from "../api";

const { AUTH } = URL;

export const signupWithAdmin = async () =>
  await serivce.post(AUTH.SIGNUP_ADMIN);

export const signupWithUser = async () => await serivce.post(AUTH.SIGNUP_USER);

export const signupWithCompany = async () =>
  await serivce.post(AUTH.SIGNUP_COMPANY);

export const signin = async () => await serivce.post(AUTH.SIGNIN);

export const signinWithCompany = async () =>
  await serivce.post(AUTH.SIGNIN_COMPANY);

export const forgotPassword = async () =>
  await serivce.patch(AUTH.FORGOT_PASSWORD);

export const forgotPasswordWithCompany = async () =>
  await serivce.patch(AUTH.FORGOT_PASSWORD_COMPANY);
