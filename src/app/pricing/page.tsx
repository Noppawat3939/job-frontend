"use client";

import {
  Accordion as Acd,
  ContentLayout,
  Label,
  PricingCard,
  Switch,
} from "@/components";
import { QUERY_KEY } from "@/constants";
import { useChangeTitleWindow } from "@/hooks";
import { publicService } from "@/services";
import { useSigninDialog, userStore } from "@/store";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PricingPage() {
  const router = useRouter();

  useChangeTitleWindow("Simple pricing for everyone | Jobify.co");

  const { user } = userStore((s) => ({ user: s.user }));
  const { onOpenDialog } = useSigninDialog((s) => ({
    onOpenDialog: s.setOpen,
  }));

  const { data } = useQuery({
    queryKey: [QUERY_KEY.SUBSCRIBE_DETAIL],
    queryFn: () => publicService.getSubscribeDetail(),
    select: ({ data }) => data || [],
    staleTime: 0,
  });

  const [viewAnnual, setViewAnnual] = useState(false);

  const faqs = [
    {
      question: "What is jobify?",
      answer:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, ab.",
    },
    {
      question: "What is jobify?",
      answer:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa minima illo officia eligendi deserunt fuga atque possimus animi, provident magnam!",
    },
  ];

  return (
    <main className="bg-white h-auto">
      <ContentLayout>
        <section className="flex flex-col items-center justify-center h-[450px] gap-4">
          <span className="flex flex-col items-center">
            <p className="animate-slidein300 text-slate-700 font-medium text-lg">
              Pricing
            </p>
            <h1 className="animate-slidein300 font-sans text-6xl font-semibold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-500/80 inline-block text-transparent bg-clip-text">
              {"Simple pricing for everyone."}
            </h1>
          </span>
          <p className="animate-slidein500 max-w-5xl text-center text-xl text-slate-800 font-normal">
            Choose an affordable plan that&apos;s packed with the best features
            for engaging your audience, creating customer loyalty, and driving
            sales.
          </p>
        </section>
        <div className="flex flex-col items-center gap-5">
          <div className="flex items-center space-x-2">
            <Switch
              id="annual"
              onCheckedChange={setViewAnnual}
              checked={viewAnnual}
            />

            <Label htmlFor="annual">Annual</Label>
          </div>
          <section className="flex justify-evenly gap-6 max-w-[1000px] mx-auto">
            {data
              ?.sort((a, b) => b.id - a.id)
              .map((item) => (
                <PricingCard
                  key={item.code_key}
                  {...item}
                  isViewAnnual={viewAnnual}
                  onSubscribe={(data) => {
                    if (!user) {
                      onOpenDialog();

                      return;
                    }

                    const slugParams = {
                      ...data,
                      period: viewAnnual ? "per_year" : "per_month",
                    };

                    router.push(
                      `/pricing/checkout/${encodeURI(
                        JSON.stringify(slugParams)
                      )}`
                    );
                  }}
                />
              ))}
          </section>
        </div>
        <section className="py-[5%] max-w-[1000px] mx-auto">
          <h1 className="animate-slidein300 text-4xl font-semibold text-slate-700">
            {"Frequently asked questions"}
          </h1>
          {faqs.map((faq, i) => (
            <Acd.Accordion type="single" collapsible key={`faq_${i}`}>
              <Acd.AccordionItem value="item-1">
                <Acd.AccordionTrigger className="text-xl text-slate-700">
                  {faq.question}
                </Acd.AccordionTrigger>
                <Acd.AccordionContent>{faq.answer}</Acd.AccordionContent>
              </Acd.AccordionItem>
            </Acd.Accordion>
          ))}
        </section>
      </ContentLayout>
    </main>
  );
}
