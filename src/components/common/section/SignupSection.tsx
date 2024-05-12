import { Fragment, useCallback, useState } from "react";
import {
  signupCompanySchema,
  type SignupCompanySchema,
  signupUserSchema,
  type SignupUserSchema,
} from "@/schemas";
import { Button, Card, FormInput, FormSelectItem } from "@/components";
import Image from "next/image";
import { useHandleForm, useToggle } from "@/hooks";
import googleLogo from "@/assets/shared/goolgle-logo.png";
import { useQuery } from "@tanstack/react-query";
import { publicService } from "@/services";
import { QUERY_KEY } from "@/constants";
import { cn } from "@/lib";

type SignupSectionProps = {
  onSignupWithGoogle?: () => void;
  onSignupWithUser?: (
    arg: Omit<SignupUserSchema, "fullName"> & {
      firstName: string;
      lastName: string;
    }
  ) => void;
  onSignupWithCompany?: (arg: SignupCompanySchema) => void;
  pending?: boolean;
  errors?: Record<string, string>;
};

const initial = {
  userFields: { fullName: "", email: "", password: "", confirmPassword: "" },
  companyFields: {
    companyName: "",
    email: "",
    password: "",
    confirmPassword: "",
    industry: "",
  },
};

export default function SignupSection({
  onSignupWithGoogle,
  onSignupWithUser,
  onSignupWithCompany,
  pending = false,
}: SignupSectionProps) {
  const { data: industries } = useQuery({
    queryFn: publicService.getPublicIndustries,
    queryKey: [QUERY_KEY.GET_INDUSTRIES],
    select: ({ data }) =>
      data.map((data) => ({ label: data.name, value: data.name })),
  });

  const [signupUserValues, setSignupUserValues] = useState<SignupUserSchema>(
    initial.userFields
  );

  const [signupCompanyValues, setSignupCompanyValues] =
    useState<SignupCompanySchema>(initial.companyFields);

  const {
    state: { active: withCompany },
    handle: { toggle: onToggleToCompany },
  } = useToggle();

  const userForm = useHandleForm<SignupUserSchema>(
    signupUserSchema,
    signupUserValues,
    (data) =>
      onSignupWithUser?.({
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
        firstName: data.fullName.split(" ").at(0) ?? "",
        lastName: data.fullName.split(" ").at(1) ?? "",
      })
  );

  const companyForm = useHandleForm<SignupCompanySchema>(
    signupCompanySchema,
    signupCompanyValues,
    (data) => onSignupWithCompany?.(data)
  );

  const onSignupWithUserChange = useCallback(
    (field: keyof typeof signupUserValues, value: string) =>
      setSignupUserValues((prev) => ({ ...prev, [field]: value })),
    []
  );

  const onSignupWithCompanyChange = useCallback(
    (field: keyof typeof signupCompanyValues, value: string) =>
      setSignupCompanyValues((prev) => ({ ...prev, [field]: value })),
    []
  );

  const renderFormWithUser = () => {
    return (
      <Fragment>
        <FormInput
          label="Full Name"
          key="fullName"
          name="fullName"
          placeholder="John Doe"
          value={signupUserValues.fullName}
          onChange={({ target: { value } }) =>
            onSignupWithUserChange("fullName", value)
          }
          error={userForm.error?.fullName}
        />
      </Fragment>
    );
  };

  const renderFormWithCompany = () => {
    return (
      <Fragment>
        <FormInput
          label="Company Name"
          key="companyName"
          name="companyName"
          value={signupCompanyValues.companyName}
          placeholder={"Jobify.co"}
          onChange={({ target: { value } }) =>
            onSignupWithCompanyChange("companyName", value)
          }
          error={companyForm.error?.companyName}
        />
        <FormSelectItem
          label="Company Industry"
          key="industry"
          name="industry"
          items={industries ?? []}
          value={signupCompanyValues.industry}
          onChange={(value) => onSignupWithCompanyChange("industry", value)}
          error={companyForm.error?.industry}
        />
      </Fragment>
    );
  };

  const checkError = () => {
    if (withCompany) {
      return companyForm.error
        ? Object.keys(companyForm.error as object).length > 0
        : false;
    }
    return userForm.error
      ? Object.keys(userForm.error as object).length > 0
      : false;
  };

  return (
    <Card.Card className="border-none shadow-md px-6 min-w-[400px]">
      <Card.CardHeader className="px-0">
        <h1
          aria-label="signin-title"
          className="text-3xl text-slate-800 text-center font-medium"
        >
          {"Seconds to sign up"}
        </h1>
      </Card.CardHeader>
      <Card.CardContent>
        <div className="flex flex-col gap-2">
          <Button
            variant="outline"
            aria-label="signin-with-google"
            className="w-full font-normal text-gray-600"
            onClick={withCompany ? undefined : onSignupWithGoogle}
            disabled={withCompany}
          >
            <Image
              src={googleLogo}
              alt="google-logo"
              className="w-4 h-4 object-cover mr-2"
            />
            {withCompany
              ? "signup with Google is coming soon."
              : "continue with Google"}
          </Button>

          <div className="flex w-full justify-between items-center">
            <hr className="flex-[.47]" />
            <p className=" text-gray-400 uppercase text-xs">{"or"}</p>
            <hr className="flex-[.47]" />
          </div>

          <form
            about="signin-with-email"
            action={withCompany ? companyForm.action : userForm.action}
            className={cn("flex flex-col", checkError() ? "gap-1" : "gap-2")}
          >
            {withCompany ? renderFormWithCompany() : renderFormWithUser()}
            <FormInput
              name="email"
              label="Email"
              key="email"
              value={
                withCompany ? signupCompanyValues.email : signupUserValues.email
              }
              onChange={({ target: { value } }) =>
                withCompany
                  ? onSignupWithCompanyChange("email", value)
                  : onSignupWithUserChange("email", value)
              }
              placeholder={"Enter your email"}
              error={
                withCompany ? companyForm.error?.email : userForm.error?.email
              }
              disabled={pending}
            />
            <FormInput
              name="password"
              label="Password"
              key="password"
              placeholder={"Enter your password"}
              type="password"
              disabled={pending}
              value={
                withCompany
                  ? signupCompanyValues.password
                  : signupUserValues.password
              }
              onChange={({ target: { value } }) =>
                withCompany
                  ? onSignupWithCompanyChange("password", value)
                  : onSignupWithUserChange("password", value)
              }
              error={
                withCompany
                  ? companyForm.error?.password
                  : userForm.error?.password
              }
            />
            <FormInput
              name="confirmPassword"
              label="Confirm Password"
              key="confirmPassword"
              placeholder={"Enter confirm password"}
              type="password"
              disabled={pending}
              value={
                withCompany
                  ? signupCompanyValues.confirmPassword
                  : signupUserValues.confirmPassword
              }
              onChange={({ target: { value } }) =>
                withCompany
                  ? onSignupWithCompanyChange("confirmPassword", value)
                  : onSignupWithUserChange("confirmPassword", value)
              }
              error={
                withCompany
                  ? companyForm.error?.confirmPassword
                  : userForm.error?.confirmPassword
              }
            />
            <Card.CardFooter className="mt-3 px-0 pb-0 flex flex-col gap-3">
              <Button
                loading={pending}
                type="submit"
                role="user-login"
                className="w-full"
                variant="primary"
                size="sm"
              >
                {"Start jobify now"}
              </Button>
              <Button
                className="text-[12px] font-normal text-purple-600 opacity-80 hover:opacity-100"
                variant="link"
                role="company-login"
                type="button"
                onClick={() => (pending ? undefined : onToggleToCompany())}
              >
                {`or signup with ${withCompany ? "Job seekeer" : "Company"}`}
              </Button>
            </Card.CardFooter>
          </form>
        </div>
      </Card.CardContent>
    </Card.Card>
  );
}
