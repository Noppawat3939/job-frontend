import type { Nullable, ResumeTemplate, Testimonial } from "@/types";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Alert, Avatar, Button, Card, Input, toast } from "@/components";
import Marquee from "react-fast-marquee";
import DefaultProfile from "@/assets/profile-user.svg";
import Image from "next/image";
import HowToCreateStep1 from "@/assets/shared/create-template-step1.svg";
import HowToCreateStep2 from "@/assets/shared/create-template-step2.svg";
import HowToCreateStep3 from "@/assets/shared/create-template-step3.svg";
import { useMutation } from "@tanstack/react-query";
import { docsService } from "@/services";
import { toast as toastSonner } from "sonner";
import Link from "next/link";

type ResumeListProps = {
  testimonials: Testimonial[];
  templates: ResumeTemplate[];
};

export default function ResumeList({
  testimonials,
  templates,
}: ResumeListProps) {
  const router = useRouter();

  const [templateTitle, setTemplateTitle] = useState("");
  const [alertCreateTemplate, setAlertCreateTemplate] = useState<{
    open: boolean;
    templateId: Nullable<number>;
  }>({
    open: false,
    templateId: null,
  });

  const howToCreate = useMemo(
    () => [
      { key: "step_1", image: HowToCreateStep1, title: "Select your template" },
      { key: "step_2", image: HowToCreateStep2, title: "Fill in detail" },
      {
        key: "step_3",
        image: HowToCreateStep3,
        title: "Submit and enjoy to new oppotunity",
      },
    ],
    []
  );

  const { mutate: createResume, isPending } = useMutation({
    mutationFn: docsService.createResume,
    onSuccess: (res) => {
      setAlertCreateTemplate({ open: false, templateId: null });

      const resumeId = res.data.id;

      router.push(`/resume-template/${resumeId}`);
    },
    onError: () => {
      toast({
        title: `Can't not create resume`,
        content: "account has limited",
        duration: 2000,
        action: {
          label: "Pricing",
          onClick: () => window.open("/pricing", "_blank"),
        },
      });
    },
  });

  return (
    <main className="h-auto flex flex-col gap-4 pb-[6rem]">
      <Header title={"Find design resume in seconds."} />
      <div>
        <Marquee
          className="gap-6 flex"
          play={!alertCreateTemplate.open}
          autoFill
          gradient
          speed={25}
        >
          {templates.map((item) => (
            <picture
              onClick={() =>
                setAlertCreateTemplate({ open: true, templateId: item.id })
              }
              className="transition-all duration-150 hover:opacity-60"
            >
              <img
                src={item.image}
                alt="ex_templarte"
                loading="lazy"
                className="rounded-2xl mx-6 border max-w-[200px] h-[280px]"
              />
            </picture>
          ))}
        </Marquee>
      </div>
      <Header title={"From inspiration to creation."} />
      <section className="max-w-6xl mx-auto">
        <div className="flex justify-between space-x-[20px]">
          {howToCreate.map((item) => (
            <div key={item.key} className="flex flex-col items-center gap-1">
              <Image
                src={item.image}
                alt="step-create"
                className="w-[320px] max-h-[160px]"
              />
              <h3 className="text-slate-700 mt-4 text-center font-medium text-xl">
                {item.title}
              </h3>
              <p className="text-gray-400 max-w-[280px] font-normal text-center">
                {` Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Laborum, vero?`}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="flex max-w-5xl mx-auto flex-col justify-center items-center">
        <Header title={"What our users are saying."} />
        <br />
        <div className="grid grid-cols-3 gap-6 ">
          {testimonials.map((item) => (
            <Card.Card
              key={`testimonial_${item.id}`}
              className="rounded-2xl bg-transparent"
            >
              <Card.CardHeader>
                <div className="flex gap-4 items-center">
                  <Avatar.Avatar>
                    <Avatar.AvatarImage
                      loading="lazy"
                      className="object-cover"
                      src={item.profile}
                    />
                    <Avatar.AvatarFallback>
                      <Image
                        src={DefaultProfile}
                        alt="def-profile"
                        className="w-[40px] h-[40px] rounded-full object-cover"
                      />
                    </Avatar.AvatarFallback>
                  </Avatar.Avatar>
                  <h3 className="font-medium">{item.fullName}</h3>
                </div>
              </Card.CardHeader>
              <Card.CardContent>
                <p className="text-slate-700 text-[14px]">{item.message}</p>
              </Card.CardContent>
            </Card.Card>
          ))}
        </div>
      </section>

      <Alert
        title="What your resume title?"
        onOpenChange={(open) => {
          if (templateTitle) {
            setTemplateTitle("");
          }

          setAlertCreateTemplate({ open, templateId: null });
        }}
        open={alertCreateTemplate.open}
        okText="Create resume"
        onCancel={() => {
          setTemplateTitle("");
          setAlertCreateTemplate({ open: false, templateId: null });
        }}
        onOk={() =>
          createResume({
            templateTitle: templateTitle,
            templateId: Number(alertCreateTemplate.templateId),
          })
        }
        okButtonProps={{
          variant: "primary",
          disabled: !templateTitle.trim(),
          loading: isPending,
        }}
      >
        <Input
          onChange={({ target: { value } }) => setTemplateTitle(value)}
          value={templateTitle}
        />
      </Alert>
    </main>
  );
}

function Header({ title }: { title: string }) {
  return (
    <div className="h-[360px] flex justify-center w-full items-center">
      <h1 className="text-5xl w-full text-center font-semibold text-slate-800">
        {title}
      </h1>
    </div>
  );
}
