import { Alert, Otp, SignupSeciton } from "@/components";
import { useHandleSignup, useToggle } from "@/hooks";
import { SignupUserSchema } from "@/schemas";
import { CheckedState } from "@radix-ui/react-checkbox";
import { startTransition, useState } from "react";

type SignupData = Omit<SignupUserSchema, "fullName"> & {
  firstName: string;
  lastName: string;
} & { autoApprove?: CheckedState };

const OTP_LENGTH = 6;

const initial = {
  firstName: "",
  lastName: "",
  oobCode: "",
  verifyCode: "",
  password: "",
  confirmPassword: "",
  email: "",
};

export default function Signup() {
  const GOOGLE_KEY = process.env.googleApiKey!;
  const { isPending, ...handle } = useHandleSignup();

  const [signupData, setSignupData] = useState<SignupData>(initial);
  const [isSendingEmail, setIsSendingEmail] = useState(false);

  const {
    state: { active: openVerifyCode },
    handle: { setToggle: setOpenVeriyCode },
  } = useToggle();

  const handleVerifyEmail = (email: string) => {
    handle.verifyEmail({ email }).then(({ data }) => {
      if (data.oob_code) {
        setSignupData((prev) => ({ ...prev, oobCode: data.oob_code }));
      }

      setOpenVeriyCode(true);
      setIsSendingEmail(true);
    });
  };

  return (
    <section
      about="signup"
      className="flex h-[calc(100vh-80px)] bg-grid flex-col justify-center items-center"
    >
      <SignupSeciton
        onSignupWithGoogle={() => handle.googleSignup(GOOGLE_KEY)}
        onSignupWithUser={(data) => {
          handleVerifyEmail(data.email);
          setSignupData(data);
        }}
        onSignupWithCompany={handle.companySignup}
        pending={isPending || isSendingEmail}
      />
      <Alert
        open={openVerifyCode}
        onOpenChange={setOpenVeriyCode}
        closeable={false}
        onOk={() => {
          setOpenVeriyCode(false);
          setIsSendingEmail(false);
          startTransition(() => handle.userSignup(signupData));
        }}
        okText={"Signup"}
        onCancel={() => setOpenVeriyCode(false)}
        okButtonProps={{
          variant: "primary",
          disabled: Boolean(
            !signupData.verifyCode?.trim() ||
              (signupData.verifyCode && signupData.verifyCode?.length < 6)
          ),
        }}
      >
        <div className="flex flex-col items-center">
          <h2 className="font-medium text-lg text-slate-900">
            {"Please verify your email"}
          </h2>
          <p className="text-slate-700 mb-4">{`We just send veriy code an email to ${signupData.email}`}</p>
          <Otp.InputOTP
            maxLength={OTP_LENGTH}
            onChange={(verifyCode) =>
              setSignupData((prev) => ({ ...prev, verifyCode }))
            }
          >
            <Otp.InputOTPGroup>
              {Array.from({ length: OTP_LENGTH })
                .fill("")
                .map((_, i) => (
                  <Otp.InputOTPSlot index={i} key={`otp_${i}`} />
                ))}
            </Otp.InputOTPGroup>
          </Otp.InputOTP>
        </div>
      </Alert>
    </section>
  );
}
