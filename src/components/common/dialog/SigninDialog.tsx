import { Button, Dialog, FormInput } from "@/components";
import { useHandleForm } from "@/hooks";
import { reloadPage } from "@/lib";
import { SigninUserSchema, signinUserSchema } from "@/schemas";
import { authService } from "@/services";
import { useSigninDialog } from "@/store";
import { DecodedToken } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { setCookie } from "cookies-next";
import { jwtDecode } from "jwt-decode";
import { Fragment, useCallback, useTransition } from "react";

export default function SigninDialog() {
  const signinUserMutation = useMutation({
    mutationFn: authService.signin,
    onSuccess: ({ data: token }) => onSigninSuccess(token),
  });

  const { values, setValues, open, reset } = useSigninDialog();

  const {
    error,
    isPending: isSubmitting,
    action,
  } = useHandleForm<SigninUserSchema>(
    signinUserSchema,
    {
      email: values.email,
      password: values.password,
    },
    (data) => handleSubmit(data)
  );

  const [pending, startTransition] = useTransition();

  const onSigninSuccess = (token: string) => {
    const { exp } = jwtDecode(token) as DecodedToken;
    const expires = new Date(Number(exp) * 1000);

    setCookie("token", token, { expires });
    startTransition(reloadPage);
  };

  const onChange = useCallback(
    (key: keyof typeof values, value: string) =>
      setValues({ ...values, [key]: value }),
    [setValues, values]
  );

  const handleSubmit = (values: SigninUserSchema) =>
    signinUserMutation.mutate(values);

  return (
    <Dialog.Dialog open={open} onOpenChange={reset}>
      <Dialog.DialogContent aria-label="signin-dialog">
        <form action={action}>
          <Dialog.DialogHeader>
            <Dialog.DialogTitle className="text-4xl">
              {"Sign in"}
            </Dialog.DialogTitle>
            <Dialog.DialogDescription>
              {"Signin to coninue apply job"}
            </Dialog.DialogDescription>
          </Dialog.DialogHeader>

          <div className="space-y-2">
            <Fragment>
              <FormInput
                name="email"
                key="email"
                label="Email"
                placeholder="Please enter email"
                value={values.email}
                onChange={({ target: { value } }) => onChange("email", value)}
              />
              {error?.email && (
                <sup className="text-red-500">{error.email}</sup>
              )}
            </Fragment>
            <Fragment>
              <FormInput
                name="password"
                key="password"
                label="Password"
                placeholder="Please enter password"
                type="password"
                value={values.password}
                onChange={({ target: { value } }) =>
                  onChange("password", value)
                }
              />
              {error?.password && (
                <sup className="text-red-500">{error.password}</sup>
              )}
            </Fragment>
          </div>

          <Dialog.DialogFooter className="flex-1 mt-3">
            <div className="flex space-x-2 justify-center w-full">
              <Button
                disabled={pending}
                onClick={reset}
                className="w-[100px]"
                size="sm"
                aria-label="cancel-form"
                type="reset"
                variant="outline"
              >
                {"Cancel"}
              </Button>
              <Button
                loading={isSubmitting}
                className="w-[100px]"
                aria-label="submit-form"
                type="submit"
                size="sm"
              >
                {"Sign in"}
              </Button>
            </div>
          </Dialog.DialogFooter>
        </form>
      </Dialog.DialogContent>
    </Dialog.Dialog>
  );
}
