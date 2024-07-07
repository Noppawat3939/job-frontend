"use client";

import { Lazyload } from "@/components";
import SubscribeCheckout from "./SubscribeCheckout";

type PageProps = {
  params: { slug: string };
};

export default function PricingCheckoutPage({ params }: PageProps) {
  return (
    <Lazyload>
      <SubscribeCheckout slug={params.slug} />
    </Lazyload>
  );
}
