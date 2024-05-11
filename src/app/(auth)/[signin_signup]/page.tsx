"use client";

import type { DecodedToken, RolesParams } from "@/types";
import JobSeekerImage from "@/assets/signin_signup_jobseeker.jpg";
import EmployerImage from "@/assets/signin-signup_employer.jpg";
import Image from "next/image";
import { eq, isUndifined, mappingFormFields } from "@/lib";
import { Alert, Button, Form, FormInput, SelectItem } from "@/components";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  SigninCompanySchema,
  SigninUserSchema,
  SignupCompanySchema,
  SignupUserSchema,
  signinCompanySchema,
  signinUserSchema,
  signupCompanySchema,
  signupUserSchema,
} from "@/schemas";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { authService, publicService } from "@/services";
import { setCookie } from "cookies-next";
import { jwtDecode } from "jwt-decode";
import { AxiosError } from "axios";
import { userService } from "@/services";
import { userStore } from "@/store";
import { QUERY_KEY } from "@/constants";
import GoogleLogo from "@/assets/shared/goolgle-logo.png";

type SignInSignUpPageProps = {
  params: { signin_signup: string };
  searchParams: { selected: RolesParams };
};

type SigninWithSignupSchemas = SigninUserSchema &
  SigninCompanySchema &
  SignupUserSchema &
  SignupCompanySchema;

const SIGNIN_USER = { email: "", password: "" };
const SIGNIN_COMPANY = { companyName: "", ...SIGNIN_USER };
const SIGNUP_USER = {
  firstName: "",
  lastName: "",
  ...SIGNIN_USER,
  confirmPassword: "",
};
const SIGNUP_COMPANY = {
  companyName: "",
  industry: "",
  ...SIGNIN_USER,
  confirmPassword: "",
};

const initial = {
  alertProps: {
    open: false,
    title: "",
    description: "",
  },
};

export default function SignInSignUpPage({
  searchParams,
  params,
}: SignInSignUpPageProps) {
  const { signin_signup } = params;
  const { selected } = searchParams;
  const router = useRouter();

  const isSignin = eq(signin_signup, "signin");
  const isJobSeeker = eq(selected, "jobseeker");

  const { data: industries } = useQuery({
    queryFn: publicService.getPublicIndustries,
    queryKey: [QUERY_KEY.GET_INDUSTRIES],
    select: ({ data }) =>
      data.map((data) => ({ label: data.name, value: data.name })),
  });

  const { mutate: getUrlSigninWithSocial } = useMutation({
    mutationFn: authService.getUrlSigninWithSocial,
    onSuccess: ({ data: url }) =>
      !isUndifined(window) && window.open(url, "default"),
  });

  const { setUser } = userStore((store) => ({ setUser: store.setUser }));

  const mappingSigninWithSignup = () => {
    const signinUser = isSignin && isJobSeeker;
    const signinCompany = isSignin && !isJobSeeker;
    const signupUser = !isSignin && isJobSeeker;

    if (signinUser)
      return {
        model: SIGNIN_USER,
        schema: signinUserSchema,
        service: authService.signin,
      };
    if (signinCompany)
      return {
        model: SIGNIN_COMPANY,
        schema: signinCompanySchema,
        service: authService.signinWithCompany,
      };
    if (signupUser)
      return {
        model: SIGNUP_USER,
        schema: signupUserSchema,
        service: authService.signupWithUser,
      };

    return {
      model: SIGNUP_COMPANY,
      schema: signupCompanySchema,
      service: authService.signupWithCompany,
    };
  };

  const [alertSigninWithSignup, setAlertSigninWithSignup] = useState(
    initial.alertProps
  );

  const mapping = mappingSigninWithSignup();

  const form = useForm<SigninWithSignupSchemas>({
    resolver: zodResolver(mapping.schema),
    defaultValues: mapping.model,
    reValidateMode: "onSubmit",
  });

  const resetForm = () => {
    if (form.formState.errors) {
      form.clearErrors();
    }
    form.reset();
  };

  const { mutate, isPending } = useMutation({
    //@ts-ignore
    mutationFn: mapping.service,
    onSuccess: (res) => {
      if (isSignin) {
        handleSigninSuccess(res.data);
      } else {
        handleSignupSuccess(res.success);
      }
    },
    onError: (e) => {
      const err = e as AxiosError;
      const errMessage = (err.response?.data as { message: string }).message;

      setAlertSigninWithSignup({
        open: true,
        title: "Can not signup",
        description: errMessage,
      });
    },
  });

  const userSigninMutation = useMutation({
    mutationFn: authService.signin,
    onSuccess: (res) => handleSigninSuccess(res.data),
  });

  const handleSigninSuccess = async (token: string) => {
    const { exp, role } = jwtDecode(token) as DecodedToken;
    const expires = new Date(Number(exp) * 1000);

    setCookie("token", token, { expires });

    try {
      const { data } = await userService.fetchUser(token);

      if (data) {
        setUser(data);

        const mappingPathWithRole = {
          super_admin: "/admin?tab=accounts",
          admin: "/admin?tab=jobs",
          user: "/job",
          employer: "/company",
        };

        router.push(mappingPathWithRole[role]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignupSuccess = (success: boolean) => {
    if (isJobSeeker && success) {
      const email = form.watch("email");
      const password = form.watch("password");
      userSigninMutation.mutate({ email, password });
    }

    resetForm();
  };

  useEffect(() => {
    resetForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected, params.signin_signup]);

  const handleChangeTab = useCallback(
    (pathname: string) => {
      const url = `${location.origin}/${pathname}${location.search}`;

      router.push(url);
    },
    [router]
  );

  const onSubmit = (values: SigninWithSignupSchemas) => mutate(values);

  return (
    <section className="max-md:px-4">
      <div className="flex w-fit h-fit mx-auto max-md:flex-col">
        <Image
          className="object-contain mb-auto w-[600px] max-md:w-[480px] max-sm:w-[360px]"
          src={isJobSeeker ? JobSeekerImage : EmployerImage}
          alt="signin-signup"
        />
        <section className="w-[500px] flex flex-col space-y-6 border rounded-md shadow-sm p-3 max-md:w-[95%] max-sm:w-full">
          <div className="flex space-x-2 justify-evenly">
            <Button
              size="sm"
              onClick={() => handleChangeTab("signin")}
              className="w-full"
              variant={
                eq(params.signin_signup, "signin") ? "secondary" : "ghost"
              }
            >
              {"Signin"}
            </Button>
            <Button
              size="sm"
              onClick={() => handleChangeTab("signup")}
              className="w-full"
              variant={
                eq(params.signin_signup, "signup") ? "secondary" : "ghost"
              }
            >
              {"Signup"}
            </Button>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex-col flex">
                <div className="flex flex-col space-y-2">
                  {Object.keys(mapping.model).map((field) => {
                    return (
                      <FormField
                        key={field}
                        control={form.control}
                        name={field as keyof typeof mapping.model}
                        render={(formProps) => {
                          const mappedField =
                            mappingFormFields[
                              field as keyof typeof mappingFormFields
                            ];

                          return (
                            <FormItem>
                              <FormControl>
                                {eq(field, "industry") ? (
                                  <SelectItem
                                    label={mappedField}
                                    items={industries ?? []}
                                    placeholder={`Please enter ${mappedField}`}
                                    {...formProps.field}
                                  />
                                ) : (
                                  <FormInput
                                    type={
                                      ["password", "confirmPassword"].includes(
                                        field
                                      )
                                        ? "password"
                                        : "text"
                                    }
                                    label={mappedField}
                                    placeholder={`Please enter ${mappedField}`}
                                    {...formProps.field}
                                  />
                                )}
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          );
                        }}
                      />
                    );
                  })}
                </div>

                <Button
                  loading={isPending || userSigninMutation.isPending}
                  type="submit"
                  className="w-[60%] mt-[50px] mx-auto"
                >
                  {isPending && isSignin
                    ? "Sign in..."
                    : !isPending && isSignin
                    ? "Sign in"
                    : isPending && !isSignin
                    ? "Sign up..."
                    : "Sign up"}
                </Button>
              </div>
            </form>
          </Form>
          <Button
            variant="outline"
            className="flex gap-2"
            onClick={() =>
              getUrlSigninWithSocial(String(process.env.googleApiKey))
            }
          >
            <Image
              src={GoogleLogo}
              alt="google-logo"
              className="w-4 h-4 object-contain"
            />
            {"continue with Google"}
          </Button>
        </section>
      </div>

      <Alert
        open={alertSigninWithSignup.open}
        title={alertSigninWithSignup.title}
        description={alertSigninWithSignup.description}
        hideCancel
        onOpenChange={() => setAlertSigninWithSignup(initial.alertProps)}
      />
    </section>
  );
}
