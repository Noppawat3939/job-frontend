import type { DecodedToken } from "@/types";
import { useTransition } from "react";
import { isUndifined, reloadPage } from "@/lib";
import { authService } from "@/services";
import { useMutation } from "@tanstack/react-query";
import { setCookie } from "cookies-next";
import { jwtDecode } from "jwt-decode";

export default function useHandleSignin() {
  const [, startTransition] = useTransition();

  const signinWithGoogle = useMutation({
    mutationFn: authService.getUrlSigninWithSocial,
    onSuccess: ({ data: url }) => {
      !isUndifined(window) && window.open(url, "_self");
    },
  });

  const signin = useMutation({
    mutationFn: authService.signin,
    onSuccess: ({ data: token }) => handleLoginned(token),
  });

  const siginWithCompany = useMutation({
    mutationFn: authService.signinWithCompany,
    onSuccess: ({ data: token }) => handleLoginned(token),
  });

  const handleLoginned = (token: string) => {
    const { exp } = jwtDecode(token) as DecodedToken;
    const expires = new Date(Number(exp) * 1000);

    setCookie("token", token, { expires });
    startTransition(reloadPage);
  };

  const isPending = [
    signin.isPending,
    siginWithCompany.isPending,
    signinWithGoogle.isPending,
  ].some(Boolean);

  const errorMutations = [
    { error: signin.isError, type: "userSignin" },
    { error: siginWithCompany.isError, type: "companySignin" },
    { error: signinWithGoogle.isError, type: "googleSignin" },
  ];

  const isError = errorMutations.some((e) => e.error);

  const error = isError
    ? errorMutations.filter(({ error }) => error).map(({ type }) => type)
    : null;

  return {
    userSingin: signin.mutate,
    companySignin: siginWithCompany.mutate,
    googleSignin: signinWithGoogle.mutate,
    isPending,
    isError,
    error,
  };
}
