import { useToast } from "@/components";
import { isUndifined } from "@/lib";
import { authService } from "@/services";
import type { ServiceErrorResponse } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { redirect } from "next/navigation";
import { useTransition } from "react";

export default function useHandleSignup() {
  const { toast } = useToast();

  const [, startTransition] = useTransition();

  const handleSignuped = (message?: string | null) => {
    toast({ title: message || "Success", duration: 2000 });

    startTransition(() => redirect("/login"));
  };

  const handleSignupFailed = (message?: string | null) => {
    toast({
      title: message || "Error",
      variant: "destructive",
      duration: 2000,
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
  });

  const signupWithCompany = useMutation({
    mutationFn: authService.signupWithCompany,
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
