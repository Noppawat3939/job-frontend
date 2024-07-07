import { Button, ContentLayout, Label, PaymentStep, Show } from "@/components";
import { QUERY_KEY } from "@/constants";
import { paymentService, publicService } from "@/services";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Check, Upload } from "lucide-react";
import { Fragment, ReactNode, useRef, useState } from "react";
import QrPaymentLogo from "@/assets/payment/qr-logo.jpg";
import Image from "next/image";
import type { Nullable } from "@/types";
import dayjs from "dayjs";
import { cn } from "@/lib";
import Link from "next/link";

type DecodeParams = Nullable<{
  code_key: string;
  period: "per_year" | "per_month";
  plan: string;
}>;

type Detail = {
  key: string;
  label: string;
  children: ReactNode;
  hide?: boolean;
};

type SubscribeCheckoutProps = { slug: string };

export default function SubscribeCheckout({ slug }: SubscribeCheckoutProps) {
  const decodedSlug: DecodeParams = slug ? JSON.parse(slug) : null;

  const inputRef = useRef<HTMLInputElement>(null);

  const { data: subscribeData } = useQuery({
    queryKey: [QUERY_KEY.SUBSCRIBE_DETAIL, slug],
    queryFn: () =>
      publicService.getSubscribeDetail({ plan: decodedSlug?.plan }),
    select: (res) => res.data[0],
    staleTime: 0,
  });

  const [sourceQR, setSourceQR] = useState<{
    qrcode: string;
    expired: string;
    creating: boolean;
  }>({ qrcode: "", expired: "", creating: false });
  const [step, setStep] = useState(1);

  const { mutate: createSource, isPending } = useMutation({
    mutationFn: paymentService.createQRSource,
    onSuccess: ({ data }) => {
      setSourceQR({
        qrcode: data.qrcode,
        expired: data.expired_in,
        creating: false,
      });
    },
  });

  const period = decodedSlug?.period ?? "per_month";

  const renderDetails = [
    {
      key: "features",
      label: "Key features",
      children: (
        <ul>
          {subscribeData?.features.map((feat, i) => (
            <li
              key={`feat_${i}`}
              className="flex items-center gap-1 text-slate-700"
            >
              <Check className="w-4 h-4 text-green-600" />
              {feat}
            </li>
          ))}
        </ul>
      ),
    },
    {
      key: "period",
      label: "Subscribe Period",
      children: decodedSlug?.period.replace("_", " "),
      hide: subscribeData?.plan === "C",
    },
    {
      key: "discount",
      label: "Price discount",
      children: `${subscribeData?.price.discount.percent_per_year}%`,
      hide: [
        subscribeData?.price.per_month,
        subscribeData?.price.per_year,
      ].includes(0),
    },
    {
      key: "total",
      label: "Total price",
      children: [
        subscribeData?.price.per_month,
        subscribeData?.price.per_year,
      ].includes(0)
        ? "Free"
        : `${subscribeData?.price[period].toFixed(2)} baht`,
    },
  ].filter((item) => !item.hide) as Detail[];

  const colors = {
    A: "#ec4899",
    B: "#0ea5e9",
    C: "#14b8a6",
  };

  return (
    <ContentLayout className="max-w-[1100px] max-xl:max-w-[700px] overflow-hidden">
      <div className="flex flex-col">
        <header className="flex items-baseline space-x-2">
          <h1 className="text-3xl font-semibold text-slate-800">{`Select subscribe (Plan ${subscribeData?.plan})`}</h1>
        </header>
        <section className="flex justify-center space-x-[30px] py-[3%] items-center h-full">
          <div
            className={cn(
              "flex flex-col space-y-2 w-[500px] bg-white border rounded-lg p-4",
              subscribeData?.plan === "A"
                ? "border-pink-100"
                : subscribeData?.plan === "B"
                ? "border-sky-100"
                : "border-teal-100"
            )}
          >
            <Show when={step !== 3}>
              <div className="flex items-baseline">
                <Label className="flex-1 font-semibold text-xl">{`Subscribe Plan`}</Label>
                <p
                  className={cn(
                    "flex-1 text-2xl font-bold",
                    subscribeData?.plan === "A"
                      ? "text-pink-500"
                      : subscribeData?.plan === "B"
                      ? "text-sky-500"
                      : "text-teal-500"
                  )}
                >
                  {subscribeData?.title}
                </p>
              </div>
            </Show>

            <Show
              when={step === 3}
              otherwise={
                <Fragment>
                  {renderDetails.map((detail) => (
                    <div
                      key={detail.key}
                      className={cn(
                        "flex",
                        detail.key === "features"
                          ? "flex-col"
                          : "items-baseline"
                      )}
                    >
                      <Label className="flex-1 font-semibold">
                        {detail.label}
                      </Label>
                      <div className="flex-1">{detail.children}</div>
                    </div>
                  ))}
                  <br />
                  <small className="text-slate-400 flex gap-1">
                    <span className="text-red-500">*</span> Please recheck
                    subscribe infomation before select payment method
                  </small>
                </Fragment>
              }
            >
              <div className="flex flex-col space-y-1">
                <h1
                  className={cn(
                    "text-4xl font-bold",
                    subscribeData?.plan === "A"
                      ? "text-pink-500"
                      : subscribeData?.plan === "B"
                      ? "text-sky-500"
                      : "text-teal-500"
                  )}
                >
                  Thank you
                </h1>
                <p className="text-xl text-slate-800 mb-4">
                  for your interest and subscribe. Your order has been sent.
                </p>
                <p className="text-slate-700 text-sm">
                  After the system has verified the proof of payment. We will
                  notify you via email.
                </p>
                <br />
                <Button asChild variant="outline" className="w-[200px] mx-auto">
                  <Link href="/" rel="noreferer">
                    Back
                  </Link>
                </Button>
              </div>
            </Show>
          </div>
          <PaymentStep
            width={500}
            height={500}
            loading={isPending || sourceQR.creating}
            step={step}
            qrcode={sourceQR.qrcode}
            color={colors[subscribeData?.plan as keyof typeof colors]}
          />
        </section>
      </div>
      <section className="flex flex-col items-center gap-2">
        <Show when={step === 1}>
          <Fragment>
            <h1>Select payment mothod</h1>
            <Button
              variant="outline"
              onClick={() => {
                setStep((prev) => prev + 1);
                setSourceQR((prev) => ({ ...prev, creating: true }));

                const price =
                  subscribeData?.price[
                    `${decodedSlug?.period}` as keyof typeof subscribeData.price
                  ];
                if (decodedSlug?.code_key && decodedSlug.period && price) {
                  setTimeout(() => {
                    createSource({
                      code_key: decodedSlug?.code_key,
                      period: decodedSlug.period,
                    });
                  }, 1000);
                }
              }}
            >
              <Image
                src={QrPaymentLogo}
                alt="thai-qr-logo"
                className="w-auto h-[30px] object-contain"
              />
            </Button>
          </Fragment>
        </Show>

        <Show when={step === 2 && !sourceQR.creating}>
          <div className="flex flex-col space-y-4 items-center">
            <p className="text-xl text-slate-700">{`Please paid and upload slip in ${dayjs(
              sourceQR.expired
            ).format("HH:mm")}`}</p>
            <Button
              variant="primary"
              className="w-[200px]"
              onClick={() => inputRef.current?.click()}
            >
              <Upload className="w-4 h-4 mr-1" />
              Upload slip
            </Button>
          </div>
        </Show>
      </section>
      <input
        ref={inputRef}
        onChange={(e) => {
          const file = e.target.files?.[0];

          if (!file) return null;

          const formData = new FormData();
          formData.append("image", file);
          //TODO: upload to DB
        }}
        className="hidden"
        type="file"
        accept="image/*"
      />
    </ContentLayout>
  );
}
