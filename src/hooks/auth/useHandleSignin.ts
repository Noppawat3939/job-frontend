import { ServiceErrorResponse } from "./../../types/common/common.type";
import type { DecodedToken, Role } from "@/types";
import { useTransition } from "react";
import { isUndifined } from "@/lib";
import { authService } from "@/services";
import { useMutation } from "@tanstack/react-query";
import { setCookie } from "cookies-next";
import { jwtDecode } from "jwt-decode";
import { AxiosError } from "axios";
import { useToast } from "@/components";
import { useRouter } from "next/navigation";

export default function useHandleSignin() {
  const [, startTransition] = useTransition();
  const { toast } = useToast();

  const router = useRouter();

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
    onError: (e) => {
      const err = e as AxiosError;
      const errorResp = err.response as ServiceErrorResponse;

      handleLoginFailed(errorResp);
    },
  });

  const handleLoginned = (token: string) => {
    const { exp, role } = jwtDecode(token) as DecodedToken;
    const expires = new Date(Number(exp) * 1000);

    setCookie("token", token, { expires });

    if (role === "employer") {
      router.push("/company");
      startTransition(router.refresh);
    }

    const roleRedirectPath = {
      employer: "/company",
      super_admin: "/admin?tab=accounts",
      admin: "/admin?tab=accounts",
      user: "/",
    } as Record<Role, string>;

    redirectAfterLoginned(roleRedirectPath[role]);
  };

  const redirectAfterLoginned = (path: string) => {
    router.push(path);
    startTransition(router.refresh);
  };

  const handleLoginFailed = (error: ServiceErrorResponse) => {
    toast({
      title: error.data.message,
      duration: 1500,
      variant: "destructive",
    });
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
