import { Dialog, LoginSection } from "@/components";
import { useHandleSignin } from "@/hooks";
import { useSigninDialog } from "@/store";

export default function SigninDialog() {
  const { open, reset } = useSigninDialog();

  const GOOGLE_KEY = process.env.googleApiKey!;

  const { isPending, ...handle } = useHandleSignin();

  return (
    <Dialog.Dialog open={open} onOpenChange={reset}>
      <Dialog.DialogContent aria-label="signin-dialog">
        <LoginSection
          onSigninWithGoogle={() => handle.googleSignin(GOOGLE_KEY)}
          onSigninWithEmail={handle.userSingin}
          onSigninWithCompany={handle.companySignin}
          pending={isPending}
          hideSignInWithCompany
          withDialog
        />
      </Dialog.DialogContent>
    </Dialog.Dialog>
  );
}
