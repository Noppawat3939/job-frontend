"use client";

import { Accordion as Acd, ContentLayout, PricingCard } from "@/components";

export default function PricingPage() {
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
          <h1 className="animate-slidein300 text-6xl font-semibold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-500/80 inline-block text-transparent bg-clip-text">
            {"Get unlimited access."}
          </h1>
          <p className=" animate-slidein500 text-xl font-medium">
            {"Find the perfect plan"}
          </p>
        </section>
        <section className="flex justify-evenly gap-6 max-w-[1000px] mx-auto">
          <PricingCard />
          <PricingCard />
          <PricingCard />
        </section>
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
