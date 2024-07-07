import type { SubscribeDetail } from "@/types";
import { Button, Card, Show } from "@/components";
import { Check } from "lucide-react";
import { cn, formatNumber } from "@/lib";
import { useTransition } from "react";

type PricingCardProps = SubscribeDetail & {
  isViewAnnual: boolean;
  onSubscribe?: ({
    code_key,
    plan,
  }: {
    code_key: string;
    plan: string;
  }) => void;
};

export default function PricingCard({
  title,
  sub_title,
  features,
  price,
  isViewAnnual,
  onSubscribe,
  plan,
  code_key,
}: PricingCardProps) {
  const [pending, startTransition] = useTransition();

  return (
    <Card.Card className="w-full">
      <Card.CardHeader>
        <Card.CardTitle
          className={cn(
            "text-xl font-bold flex w-full items-center justify-between",
            plan === "A"
              ? "text-pink-500"
              : plan === "B"
              ? "text-sky-500"
              : "text-teal-500"
          )}
        >
          {title}
          <Show when={price.discount.percent_per_year > 0 && isViewAnnual}>
            <small className="text-xs font-medium text-white bg-red-500 shadow py-1 px-2 rounded-xl decoration-current">{`${price.discount.percent_per_year}% OFF`}</small>
          </Show>
        </Card.CardTitle>
        <Card.CardDescription className="break-words">
          {sub_title}
        </Card.CardDescription>
      </Card.CardHeader>
      <Card.CardContent className="flex flex-col items-center">
        <Card.CardTitle
          className={cn(
            "text-6xl font-medium mt-4 mb-10 flex items-baseline",
            plan === "A"
              ? "text-pink-500"
              : plan === "B"
              ? "text-sky-500"
              : "text-teal-500"
          )}
        >
          {price.per_month === 0
            ? "Free"
            : `฿${formatNumber(
                isViewAnnual ? price.per_year : price.per_month
              )}`}
          <Show when={price.per_month !== 0}>
            <span className="text-sm font-normal">
              {isViewAnnual ? "/ year" : "/ month"}
            </span>
          </Show>
          <br />
        </Card.CardTitle>

        <Button
          className={cn(
            "text-lg font-semibold",
            plan === "C"
              ? "bg-teal-500 hover:bg-teal-600"
              : plan === "B"
              ? "bg-sky-500 hover:bg-sky-600"
              : "bg-pink-500 hover:bg-pink-600"
          )}
          role="subscribe"
          size="lg"
          loading={pending}
          onClick={() =>
            startTransition(() => onSubscribe?.({ code_key, plan }))
          }
        >
          {plan === "C" ? "Free forever" : "Subscribe"}
        </Button>
        <ul className="flex flex-col items-start justify-start my-4">
          {features.map((feat, idx) => (
            <li
              key={`feat_${idx}`}
              className="flex items-center whitespace-nowrap gap-1 text-slate-600 text-[14px]"
            >
              <Check className="w-4 h-4 text-green-500" />
              {feat}
            </li>
          ))}
        </ul>
      </Card.CardContent>
    </Card.Card>
  );
}
