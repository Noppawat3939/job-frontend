import { LoginSection } from "@/components";
import { useHandleSignin } from "@/hooks";
import Link from "next/link";

export default function Login() {
  const GOOGLE_KEY = process.env.googleApiKey!;

  const { isPending, ...handle } = useHandleSignin();

  return (
    <section
      about="login"
      className="flex h-[calc(100vh-80px)] bg-grid flex-col justify-center items-center"
    >
      <div className="flex my-auto">
        <LoginSection
          onSigninWithGoogle={() => handle.googleSignin(GOOGLE_KEY)}
          onSigninWithEmail={handle.userSingin}
          onSigninWithCompany={handle.companySignin}
          pending={isPending}
        />
      </div>
      <RedirectExternalLink />
    </section>
  );
}

function RedirectExternalLink() {
  return (
    <div
      aria-label="redirect-external-link-with-google"
      className="fixed flex space-x-1 bottom-6 text-xs text-slate-500"
    >
      <p>{" This site is protected by reCAPTCHA and the Google "}</p>
      <Link
        href="https://policies.google.com/privacy"
        referrerPolicy="origin"
        target="_blank"
        aria-label="google-privacy-policy"
        className="underline"
      >
        {"Privacy policy"}
      </Link>
      <p>{"and"}</p>
      <Link
        href="https://policies.google.com/terms"
        referrerPolicy="origin"
        target="_blank"
        aria-label="google-terms"
        className="underline"
      >
        {"Terms of Service"}
      </Link>
      <p>{"apply."}</p>
    </div>
  );
}
