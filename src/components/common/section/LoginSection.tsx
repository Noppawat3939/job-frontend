import { useCallback, useState } from "react";
import { type SigninUserSchema, signinUserSchema } from "@/schemas";
import { Button, Card, FormInput, Show } from "@/components";
import Image from "next/image";
import { useHandleForm, useToggle } from "@/hooks";
import googleLogo from "@/assets/shared/goolgle-logo.png";
import { cn } from "@/lib";

type LoginSectionProps = {
  onSigninWithGoogle?: () => void;
  onSigninWithEmail?: (arg: SigninUserSchema) => void;
  onSigninWithCompany?: (arg: SigninUserSchema) => void;
  pending?: boolean;
  hideSignInWithCompany?: boolean;
  withDialog?: boolean;
};

const initial = { email: "", password: "" };

export default function LoginSection({
  onSigninWithGoogle,
  onSigninWithEmail,
  onSigninWithCompany,
  pending = false,
  hideSignInWithCompany = false,
  withDialog = false,
}: LoginSectionProps) {
  const [signinValues, setSigninValues] = useState<SigninUserSchema>(initial);
  const {
    state: { active: withCompany },
    handle: { toggle: onToggleToCompany },
  } = useToggle();

  const { error, action, isPending } = useHandleForm<SigninUserSchema>(
    signinUserSchema,
    signinValues,
    (data) =>
      withCompany ? onSigninWithCompany?.(data) : onSigninWithEmail?.(data)
  );

  const onChange = useCallback(
    (field: keyof typeof signinValues, value: string) =>
      setSigninValues((prev) => ({ ...prev, [field]: value })),
    []
  );

  return (
    <Card.Card
      className={cn(
        "border-none shadow-none min-w-[400px]",
        withDialog ? "px-0" : "px-6"
      )}
    >
      <Card.CardHeader className="px-0">
        <h1
          aria-label="signin-title"
          className="text-3xl text-slate-800 text-center font-medium"
        >
          {"Welcome back"}
        </h1>
      </Card.CardHeader>
      <Card.CardContent>
        <div className="flex flex-col gap-2">
          <Show when={!withCompany}>
            <Button
              variant="outline"
              aria-label="signin-with-google"
              className="w-full font-normal text-gray-600"
              onClick={onSigninWithGoogle}
              disabled={pending}
            >
              <Image
                src={googleLogo}
                alt="google-logo"
                className="w-4 h-4 object-cover mr-2"
              />
              {"continue with Google"}
            </Button>

            <div className="flex w-full justify-between items-center">
              <hr className="flex-[.47]" />
              <p className=" text-gray-400 uppercase text-xs">{"or"}</p>
              <hr className="flex-[.47]" />
            </div>
          </Show>
          <form
            about="signin-with-email"
            action={action}
            className="flex flex-col gap-2"
          >
            <FormInput
              name="email"
              label="Email"
              key="email"
              value={signinValues.email}
              onChange={({ target: { value } }) => onChange("email", value)}
              placeholder={"Enter your email"}
              error={error?.email}
              disabled={pending}
            />
            <FormInput
              name="password"
              label="Password"
              key="password"
              placeholder={"Enter your password"}
              type="password"
              disabled={pending}
              value={signinValues.password}
              onChange={({ target: { value } }) => onChange("password", value)}
              error={error?.password}
            />
            <Card.CardFooter className="mt-3 px-0 pb-0 flex flex-col gap-3">
              <Button
                loading={pending || isPending}
                type="submit"
                role="user-login"
                className="w-full"
                variant="primary"
                size="sm"
              >
                {"Log in"}
              </Button>
              <Show when={!hideSignInWithCompany}>
                <Button
                  className="text-[12px] font-normal text-purple-600 opacity-80 hover:opacity-100"
                  variant="link"
                  role="company-login"
                  type="button"
                  onClick={() => (pending ? undefined : onToggleToCompany())}
                >
                  {`or login with ${withCompany ? "Job seekeer" : "Company"}`}
                </Button>
              </Show>
            </Card.CardFooter>
          </form>
        </div>
      </Card.CardContent>
    </Card.Card>
  );
}
