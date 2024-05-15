import { Button, FormInput, Show, useToast } from "@/components";
import { isUndifined, scrollToTop } from "@/lib";
import { getCookie, setCookie } from "cookies-next";
import { MailCheck } from "lucide-react";
import { Fragment, useState, useTransition } from "react";

export default function SubscribeByEmailSection() {
  const { toast } = useToast();

  const [pending, startTransition] = useTransition();

  const [email, setEmail] = useState("");

  const onSubscrbition = () => {
    toast({
      type: "foreground",
      duration: 2000,
      title: "Thank you",
      description: `You’ll be notified when we have something new.`,
    });

    startTransition(() => {
      setCookie("subscription", JSON.stringify({ email }));
      setEmail("");
      scrollToTop();
    });
  };

  return (
    <section className="py-[60px] bg-slate-50 mb-[20px]">
      <div className="flex flex-col items-center">
        <Show
          when={!isUndifined(getCookie("subscription"))}
          otherwise={
            <Fragment>
              <p className="text-slate-700 text-sm">
                {
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, rem!"
                }
              </p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();

                  onSubscrbition();
                }}
              >
                <div className="flex items-end gap-2 my-2 w-fit h-full">
                  <FormInput
                    type="email"
                    required
                    label={"Subscribe our newsletter"}
                    placeholder={"Email address"}
                    value={email}
                    onChange={({ target: { value } }) => setEmail(value)}
                  />
                  <Button
                    loading={pending}
                    variant="outline"
                    type="submit"
                    disabled={!email}
                  >
                    {"Subscribe"}
                  </Button>
                </div>
              </form>
            </Fragment>
          }
        >
          <div className="flex gap-1 flex-col items-center">
            <p className="text-xl font-bold bg-gradient-to-r from-purple-600 via-purple-500 to-pink-400 inline-block text-transparent bg-clip-text">
              {"Thankyou for subscribe"}
            </p>
            <MailCheck className="w-4 h-4 text-slate-600" />
          </div>
        </Show>
      </div>
    </section>
  );
}
