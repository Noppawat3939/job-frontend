import { useToast } from "@/components";
import { isUndifined } from "@/lib";
import { authService } from "@/services";
import type { ServiceErrorResponse } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { redirect } from "next/navigation";
import { useTransition } from "react";

type UseHandleSignupParams = {
  onSignupWithAdmin: {
    success?: () => void;
  };
};

export default function useHandleSignup(params?: UseHandleSignupParams) {
  const { toast } = useToast();

  const [, startTransition] = useTransition();

  const handleSignuped = (message?: string | null) => {
    toast({ title: message || "Success", duration: 1500 });

    startTransition(() => redirect("/login"));
  };

  const handleSignupFailed = (message?: string | null) => {
    toast({
      title: message || "Error",
      variant: "destructive",
      duration: 1500,
    });
  };

  const signupWithUser = useMutation({
    mutationFn: authService.signupWithUser,
    onSuccess: ({ message }) => handleSignuped(message),
    onError: (e) => {
      const error = e as AxiosError;
      const {
        data: { message },
      } = error.response as ServiceErrorResponse;

      handleSignupFailed(message);
    },
  });

  const signupWithAdmin = useMutation({
    mutationFn: authService.signupWithAdmin,
    onSuccess: () => params?.onSignupWithAdmin?.success?.(),
  });

  const signupWithCompany = useMutation({
    mutationFn: authService.signupWithCompany,
    onSuccess: ({ message }) => handleSignuped(message),
  });

  const signinWithGoogle = useMutation({
    mutationFn: authService.getUrlSigninWithSocial,
    onSuccess: ({ data: url }) =>
      !isUndifined(window) && window.open(url, "_blank"),
  });

  const isPending = [
    signupWithUser.isPending,
    signupWithCompany.isPending,
    signupWithAdmin.isPending,
    signinWithGoogle.isPending,
  ].some(Boolean);

  return {
    userSignup: signupWithUser.mutate,
    companySignup: signupWithCompany.mutate,
    adminSignup: signupWithAdmin.mutate,
    googleSignup: signinWithGoogle.mutate,
    isPending,
  };
}
