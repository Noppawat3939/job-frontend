import { SignupSeciton } from "@/components";
import { useHandleSignup } from "@/hooks";

export default function Signup() {
  const GOOGLE_KEY = process.env.googleApiKey!;
  const { isPending, ...handle } = useHandleSignup();

  return (
    <section
      about="signup"
      className="flex h-[calc(100vh-80px)] bg-grid flex-col justify-center items-center"
    >
      <SignupSeciton
        onSignupWithGoogle={() => handle.googleSignup(GOOGLE_KEY)}
        onSignupWithUser={handle.userSignup}
        onSignupWithCompany={handle.companySignup}
        pending={isPending}
      />
    </section>
  );
}
