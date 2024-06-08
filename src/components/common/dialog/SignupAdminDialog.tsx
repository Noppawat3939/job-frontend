import { Dialog, SignupSeciton } from "@/components";
import { useHandleSignup } from "@/hooks";

type SignupAdminDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  callbackSuccess?: () => void;
};

export default function SignupAdminDialog({
  open,
  onOpenChange,
  callbackSuccess,
}: SignupAdminDialogProps) {
  const { adminSignup, isPending } = useHandleSignup({
    onSignupWithAdmin: { success: callbackSuccess },
  });

  return (
    <Dialog.Dialog open={open} onOpenChange={onOpenChange}>
      <Dialog.DialogContent aria-label="signin-dialog">
        <SignupSeciton
          withDialog
          withAdmin
          pending={isPending}
          hideSignWithGoogle
          onSignupWithUser={adminSignup}
        />
      </Dialog.DialogContent>
    </Dialog.Dialog>
  );
}
