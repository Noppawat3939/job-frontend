"use client";

import { Lazyload } from "@/components";
import SubscribeCheckout from "./SubscribeCheckout";

type PageProps = {
  params: { slug: string };
};

export default function PricingCheckoutPage({ params }: PageProps) {
  const decoded = decodeURIComponent(params.slug);

  return (
    <Lazyload>
      <main className="bg-grid w-full h-full">
        <SubscribeCheckout slug={decoded} />
      </main>
    </Lazyload>
  );
}
