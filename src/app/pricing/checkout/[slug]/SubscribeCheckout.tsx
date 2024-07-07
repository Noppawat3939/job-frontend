import { Button, ContentLayout, Label, Show, Spinner } from "@/components";
import { QUERY_KEY } from "@/constants";
import { paymentService, publicService } from "@/services";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Check, QrCode } from "lucide-react";
import { Fragment, useState } from "react";
import QrPaymentLogo from "@/assets/payment/qr-logo.jpg";
import Image from "next/image";
import type { Nullable } from "@/types";
import dayjs from "dayjs";
import { diffTime } from "@/lib";

type DecodeParams = Nullable<{
  code_key: string;
  period: "per_year" | "per_month";
}>;

type SubscribeCheckoutProps = { slug: string };

export default function SubscribeCheckout({ slug }: SubscribeCheckoutProps) {
  const decodedSlug: DecodeParams = decodeURIComponent(slug)
    ? JSON.parse(decodeURIComponent(slug))
    : null;

  const { data: subscribeData } = useQuery({
    queryKey: [QUERY_KEY.SUBSCRIBE_DETAIL, slug],
    queryFn: () => publicService.getSubscribeDetail({ plan: "A" }),
    select: (res) => res.data[0],
  });

  const [sourceQR, setSourceQR] = useState<{ qrcode: string; expired: string }>(
    { qrcode: "", expired: "" }
  );

  const { mutate: createSource, isPending } = useMutation({
    mutationFn: paymentService.createQRSource,
    onSuccess: ({ data }) => {
      setSourceQR({ qrcode: data.qrcode, expired: data.expired_in });
    },
  });

  const period = decodedSlug?.period ?? "per_month";

  return (
    <ContentLayout className="max-w-[1000px] border-4 border-red-500">
      <div className="flex flex-col">
        <div className="flex items-baseline space-x-2">
          <h1>Select subscribe</h1>
          <p>{`Plan ${subscribeData?.plan}`}</p>
        </div>
        <div className="flex flex-col space-y-2 w-[500px] border">
          <div className="flex items-baseline">
            <Label className="flex-1 font-semibold">{`Subscribe Plan`}</Label>
            <p className="flex-1">{subscribeData?.title}</p>
          </div>
          <Label className="flex-1 font-semibold">Key Features</Label>
          <ul>
            {subscribeData?.features.map((feat, i) => (
              <li key={`feat_${i}`} className="flex items-center gap-1">
                <Check className="w-4 h-4 text-green-600" />
                {feat}
              </li>
            ))}
          </ul>
          <div className="flex items-baseline">
            <Label className="flex-1 font-semibold">Subscribe Period</Label>
            <p className="flex-1">{decodedSlug?.period.replace("_", " ")}</p>
          </div>
          <div className="flex items-baseline">
            <Label className="flex-1 font-semibold">Total Price</Label>
            <p className="flex-1">{subscribeData?.price[period]}</p>
          </div>
        </div>
      </div>
      <h1>Select payment mothod</h1>
      <Button
        variant="outline"
        onClick={() => {
          const price =
            subscribeData?.price[
              `${decodedSlug?.period}` as keyof typeof subscribeData.price
            ];
          if (decodedSlug?.code_key && decodedSlug.period && price) {
            createSource({
              code_key: decodedSlug?.code_key,
              period: decodedSlug.period,
            });
          }
        }}
      >
        <QrCode />
      </Button>
      {isPending ? (
        <Spinner label="Generating QR" />
      ) : (
        <Show when={!!sourceQR.qrcode}>
          <Fragment>
            <div className="flex flex-col items-center w-[240px] h-auto">
              <Image src={QrPaymentLogo} objectFit="contain" alt="qr-logo" />
              <div className="w-full">
                <span dangerouslySetInnerHTML={{ __html: sourceQR.qrcode }} />
              </div>
            </div>
            <p className="text-sm text-slate-500">{`QR expired in ${dayjs(
              sourceQR.expired
            ).format("HH:mm")} (10 min)`}</p>
          </Fragment>
        </Show>
      )}
    </ContentLayout>
  );
}
