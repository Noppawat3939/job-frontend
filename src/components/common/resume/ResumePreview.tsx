import { Card, Show, Skeleton } from "@/components";
import { RESUME_SOCICALS } from "@/constants";
import { cn, formatDate, isNull } from "@/lib";
import { useResumeStore } from "@/store";
import { ClassValue } from "clsx";
import { Facebook, Github, Linkedin, Youtube } from "lucide-react";
import { Fragment, ReactNode } from "react";

const FORMAT_DATE = "MMM YYYY";
const regexUrl = /(https?:\/\/[^\s]+)/g;

export default function ResumePreview() {
  const { data, theme } = useResumeStore();

  const Title = ({
    text,
    className,
  }: {
    text?: string;
    className?: ClassValue;
  }) => {
    return (
      <span>
        {text ? (
          <p
            className={cn("text-lg text-slate-500", className)}
            style={{ color: theme.title ? theme.title : undefined }}
          >
            {text}
          </p>
        ) : (
          <Skeleton className="w-full h-[18px]" />
        )}
      </span>
    );
  };

  const SubTitle = ({
    text,
    className,
  }: {
    text?: string;
    className?: ClassValue;
  }) => {
    return (
      <span>
        {text ? (
          <p
            className={cn("text-lg text-slate-400", className)}
            style={{ color: theme.subtitle ? theme.subtitle : undefined }}
          >
            {text}
          </p>
        ) : (
          <Skeleton className="w-full h-[14px]" />
        )}
      </span>
    );
  };

  const Paragraph = ({
    text,
    className,
  }: {
    text?: string;
    className?: ClassValue;
  }) => {
    return (
      <span>
        {text ? (
          <p
            className={cn("text-[10px] text-foreground", className)}
            style={{ color: theme.paragraph ? theme.paragraph : undefined }}
          >
            {text}
          </p>
        ) : (
          <Skeleton className="w-full h-[10px]" />
        )}
      </span>
    );
  };

  const renderSocialIcon = {
    linkedIn: <Linkedin className="w-3 h-3" />,
    facebook: <Facebook className="w-3 h-3" />,
    youtube: <Youtube className="w-3 h-3" />,
    github: <Github className="w-3 h-3" />,
  } as Record<(typeof RESUME_SOCICALS)[number], ReactNode>;

  return (
    <Card.Card className="bg-white h-full w-full p-[20px]">
      <Card.CardHeader
        style={{ background: theme.background }}
        className={cn(
          "px-[30px] pt-[30px] rounded-md",
          theme.background ? "" : "bg-slate-200"
        )}
      >
        <div className="flex justify-between items-start">
          <Card.CardTitle>
            <Title
              className="font-normal text-2xl text-slate-500"
              text={`${data.firstName} ${data.lastName}`}
            />
          </Card.CardTitle>
          <Card.CardDescription aria-label="address">
            {data.email && <Paragraph text={`Email: ${data.email}`} />}
            {data.phone_number && (
              <Paragraph text={`Phone: ${data.phone_number}`} />
            )}
            {data.address && <Paragraph text={`Address: ${data.address}`} />}
            {data.socials?.[0]?.url &&
              data.socials.map((social) => (
                <a
                  key={social.social}
                  rel="noreferrer"
                  target="_blank"
                  href={social.url}
                >
                  {social.social && renderSocialIcon[social.social]}
                </a>
              ))}
          </Card.CardDescription>
        </div>
      </Card.CardHeader>
      <Card.CardContent className="w-full flex flex-col gap-[16px] py-[10px] px-0 h-full">
        <section aria-label="profile">
          <Title text={"About me"} className="text-lg font-medium" />
          <Paragraph text={data.about} className="text-sm" />
        </section>

        <section aria-label="works">
          <Title className="text-xl font-medium" text={"Career Experience"} />
          {data.work?.map((item, i) => (
            <div className="my-1" key={`work_${item.company}_${i}`}>
              <header
                aria-label="work-header"
                className="flex justify-between items-baseline"
              >
                <SubTitle
                  className="text-sm"
                  text={`${data.work?.[i]?.position} at ${data.work?.[i]?.company}`}
                />

                <Show
                  when={
                    !isNull(data.work?.[i]?.startDate) ||
                    !isNull(data.work?.[i]?.endDate) ||
                    !data.work?.[i].currently
                  }
                >
                  <SubTitle
                    className="text-sm"
                    text={`${formatDate(
                      data.work?.[i]?.startDate,
                      FORMAT_DATE
                    )} - ${
                      data.work?.[i].currently
                        ? "Currently"
                        : formatDate(data.work?.[i]?.endDate, FORMAT_DATE)
                    }`}
                  />
                </Show>
              </header>
              <div className="flex flex-col space-y-1">
                {item.responsible?.split(",").map((task, i) => (
                  <li
                    className="text-xs flex"
                    key={`tark_${item.position}_${i}`}
                  >
                    <Paragraph text={task} />
                  </li>
                ))}
              </div>
            </div>
          ))}
        </section>

        <section aria-label="educations">
          <Title text={"Education"} className="text-xl font-medium" />
          {data.education.map((item, i) => (
            <div key={`education_${i}`}>
              <div className="flex flex-col">
                <header
                  className="flex justify-between items-baseline"
                  aria-label="education-header"
                >
                  <SubTitle className="text-sm" text={item.major} />

                  <Show when={!isNull(item.startDate) && !isNull(item.endDate)}>
                    <SubTitle
                      className="text-sm"
                      text={`${formatDate(
                        item.startDate,
                        FORMAT_DATE
                      )} - ${formatDate(item.endDate, FORMAT_DATE)}`}
                    />
                  </Show>
                </header>
                <SubTitle className="text-sm" text={item.institute} />

                <div className="flex flex-col space-y-1">
                  {item.projects?.split(",").map((project, i) => (
                    <li className="text-xs flex" key={`education_project_${i}`}>
                      {regexUrl.test(project) ? (
                        <Fragment>
                          {project.split(regexUrl).map((text) => (
                            <span
                              onClick={() =>
                                regexUrl.test(text) &&
                                window.open(text, "_blank")
                              }
                              className={
                                regexUrl.test(text)
                                  ? "underline cursor-pointer"
                                  : "text-inherit"
                              }
                            >
                              <Paragraph text={text} />
                            </span>
                          ))}
                        </Fragment>
                      ) : (
                        <Paragraph text={project} />
                      )}
                    </li>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </section>
      </Card.CardContent>
    </Card.Card>
  );
}
