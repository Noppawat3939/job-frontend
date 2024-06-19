import { Button, Card } from "@/components";
import { Check } from "lucide-react";

export default function PricingCard() {
  return (
    <Card.Card>
      <Card.CardHeader>
        <Card.CardTitle className="text-3xl">{"Free"}</Card.CardTitle>
        <Card.CardDescription>{"For casual browsers"}</Card.CardDescription>
      </Card.CardHeader>
      <Card.CardContent className="flex flex-col items-center">
        <Card.CardTitle className="text-5xl font-medium mt-4 mb-10">
          {"Free"}
        </Card.CardTitle>
        <Button size="lg" className="text-lg">
          {"Get started"}
        </Button>
        <ul className="flex flex-col items-start justify-start my-4">
          <li className="flex items-center gap-1 text-slate-600 text-[14px]">
            <Check className="w-4 h-4 text-slate-900" />
            Lorem ipsum dolor sit amet consectetur
          </li>
        </ul>
      </Card.CardContent>
    </Card.Card>
  );
}
