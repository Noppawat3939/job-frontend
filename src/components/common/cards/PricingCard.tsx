import type { SubscribeDetail } from "@/types";
import { Button, Card, Show } from "@/components";
import { Check } from "lucide-react";
import { formatNumber } from "@/lib";

type PricingCardProps = SubscribeDetail & { isViewAnnual: boolean };

export default function PricingCard({
  title,
  sub_title,
  features,
  price,
  isViewAnnual,
}: PricingCardProps) {
  return (
    <Card.Card className="w-full">
      <Card.CardHeader>
        <Card.CardTitle className="text-xl">{title}</Card.CardTitle>
        <Card.CardDescription className="break-words">
          {sub_title}
        </Card.CardDescription>
      </Card.CardHeader>
      <Card.CardContent className="flex flex-col items-center">
        <Card.CardTitle className="text-5xl font-medium mt-4 mb-10 flex items-baseline">
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
        </Card.CardTitle>
        <Button className="text-lg" role="subscribe" size="lg">
          {"Subscribe"}
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
