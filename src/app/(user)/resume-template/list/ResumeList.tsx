import { Alert, Avatar, Button, Card, Input } from "@/components";
import {
  Nullable,
  ResumeCookieData,
  ResumeTemplate,
  Testimonial,
} from "@/types";
import Marquee from "react-fast-marquee";
import DefaultProfile from "@/assets/profile-user.svg";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getCookie, setCookie } from "cookies-next";
import { useRouter } from "next/navigation";

type ResumeListProps = {
  testimonials: Testimonial[];
  templates: ResumeTemplate[];
};

export default function ResumeList({
  testimonials,
  templates,
}: ResumeListProps) {
  const router = useRouter();

  const [resumeData, setResumeData] =
    useState<Nullable<ResumeCookieData>>(null);
  const [templateTitle, setTemplateTitle] = useState("");
  const [alertCreateTemplate, setAlertCreateTemplate] = useState<{
    open: boolean;
    templateId: Nullable<number>;
  }>({
    open: false,
    templateId: null,
  });

  useEffect(() => {
    const resume = getCookie("resume");

    if (resume) {
      setResumeData(JSON.parse(resume));
    }
  }, []);

  return (
    <main className="h-auto flex flex-col gap-4 pb-[6rem]">
      <Header title={"Find design resume in seconds."} />
      <div>
        <Marquee
          pauseOnHover
          className="gap-6 flex"
          autoFill
          gradient
          speed={50}
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
                className="rounded-2xl mx-6 border"
              />
            </picture>
          ))}
        </Marquee>
      </div>
      {resumeData && (
        <section className="max-w-5xl pb-[5%] w-full mx-auto">
          <div className="flex h-[140px] items-center">
            <h1 className="text-start text-xl font-semibold">
              {"Continue your design"}
            </h1>
          </div>
          <Card.Card className="w-[240px] h-[300px]">
            <Card.CardContent className="overflow-hidden w-full p-0 relative flex items-center justify-center h-full">
              <picture className="w-full h-full">
                <img
                  src={templates.find((tem) => tem.id === 1)?.image}
                  alt="ex_templarte"
                  loading="lazy"
                  className="object-contain w-full h-full opacity-65"
                />
              </picture>
              <Button asChild className=" absolute top-[50%]">
                <Link href={`/resume-template/1`}>{"Continue"}</Link>
              </Button>
            </Card.CardContent>
          </Card.Card>
        </section>
      )}
      <Header title={"From inspiration to creation."} />
      <section className="max-w-6xl mx-auto">
        <div className="flex justify-between space-x-[20px]">
          {[1, 2, 3].map((num) => (
            <div key={num} className="flex flex-col items-center gap-1">
              <div className="w-[320px] rounded-2xl h-[320px] bg-slate-100" />
              <h3 className="text-slate-700 mt-4 text-center font-medium text-xl">
                {"How to someing"}
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
        onOpenChange={(open) =>
          setAlertCreateTemplate({ open, templateId: null })
        }
        open={alertCreateTemplate.open}
        okText="Create resume"
        onCancel={() => {
          setTemplateTitle("");
          setAlertCreateTemplate({ open: false, templateId: null });
        }}
        onOk={() => {
          setCookie("resume", JSON.stringify([{ title: templateTitle }]));

          router.push(`/resume-template/${alertCreateTemplate.templateId}`);
        }}
        okButtonProps={{ variant: "primary", disabled: !templateTitle.trim() }}
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
