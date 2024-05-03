import { Button, Dialog, FormInput } from "@/components";
import { useSigninDialog } from "@/store";
import { useState } from "react";

export default function SigninDialog() {
  const { values, onOpenChange, open, reset } = useSigninDialog();
  const [signinWithRole, setSigninWithRole] = useState<"user" | "company">(
    "user"
  );

  const handleClose = () => {
    setSigninWithRole("user");
    reset();
  };

  return (
    <Dialog.Dialog open={open} onOpenChange={handleClose}>
      <Dialog.DialogContent aria-label="signin-dialog">
        <Dialog.DialogHeader>
          <Dialog.DialogTitle className="text-4xl">
            {"Sign in"}
          </Dialog.DialogTitle>
          <Dialog.DialogDescription>
            {"Signin to coninue apply job"}
          </Dialog.DialogDescription>
        </Dialog.DialogHeader>
        <div className="space-y-2">
          {signinWithRole === "company" && (
            <FormInput
              name="company"
              key="company"
              label="Company name"
              placeholder="Please enter company name"
            />
          )}
          <FormInput
            name="email"
            key="email"
            label="Email"
            placeholder="Please enter email"
          />
          <FormInput
            name="password"
            key="password"
            label="Password"
            placeholder="Please enter password"
            type="password"
          />
        </div>
        <span
          onClick={() =>
            setSigninWithRole((prevRole) =>
              prevRole === "company" ? "user" : "company"
            )
          }
          className="text-[12px] text-slate-700 text-end cursor-pointer hover:opacity-60"
        >
          {`Are you want to signin with ${
            signinWithRole === "company" ? "user" : "company"
          }?`}
        </span>
        <Dialog.DialogFooter className="flex-1 mt-3">
          <div className="flex space-x-2 justify-center w-full">
            <Button
              onClick={handleClose}
              className="w-[100px]"
              size="sm"
              variant="outline"
            >
              {"Cancel"}
            </Button>
            <Button className="w-[100px]" size="sm">
              {"Sign in"}
            </Button>
          </div>
        </Dialog.DialogFooter>
      </Dialog.DialogContent>
    </Dialog.Dialog>
  );
}
