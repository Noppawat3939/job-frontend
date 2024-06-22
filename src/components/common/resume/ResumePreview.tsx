import { Card, Show } from "@/components";
import { formatDate, isNull } from "@/lib";
import { useResumeStore } from "@/store";
import { Fragment } from "react";

const FORMAT_DATE = "MMM YYYY";

export default function ResumePreview() {
  const { data } = useResumeStore();

  const regexUrl = /(https?:\/\/[^\s]+)/g;

  return (
    <Card.Card className="bg-white h-full w-full p-[20px]">
      <Card.CardHeader className="px-[30px] pt-[30px] rounded-md bg-slate-300">
        <div className="flex justify-between items-start">
          <Card.CardTitle className="font-normal text-2xl">{`${data.firstName} ${data.lastName}`}</Card.CardTitle>
          <Card.CardDescription aria-label="address">
            {data.email && (
              <p className="text-[10px]">{`Email: ${data.email}`}</p>
            )}
            {data.phone_number && (
              <p className="text-[10px]">{`Phone: ${data.phone_number}`}</p>
            )}
            {data.address && (
              <p className="text-[10px]">{`Address: ${data.address}`}</p>
            )}
          </Card.CardDescription>
        </div>
      </Card.CardHeader>
      <Card.CardContent className="w-full flex flex-col gap-[16px] py-[10px] px-0 h-full">
        <section aria-label="profile">
          <h2 className="text-lg font-medium">{"About me"}</h2>
          <p className="text-sm">{data.about}</p>
        </section>

        <section aria-label="works">
          <h2 className="text-xl font-medium">{"Career Experience"}</h2>
          {data.work?.map((item, i) => (
            <div className="my-1" key={`work_${item.company}_${i}`}>
              <header
                aria-label="work-header"
                className="flex justify-between items-baseline"
              >
                <p className="text-sm">{`${data.work?.[i]?.position} at ${data.work?.[i]?.company}`}</p>

                <p className="text-sm">{`${formatDate(
                  data.work?.[i]?.startDate,
                  FORMAT_DATE
                )} - ${
                  data.work?.[i].currently
                    ? "Currently"
                    : formatDate(data.work?.[i]?.endDate, FORMAT_DATE)
                }`}</p>
              </header>
              <div className="flex flex-col space-y-1">
                {item.responsible?.split(",").map((task, i) => (
                  <li className="text-xs" key={`tark_${item.position}_${i}`}>
                    {task ||
                      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam, quidem?"}
                  </li>
                ))}
              </div>
            </div>
          ))}
        </section>

        <section aria-label="educations">
          <h2 className="text-xl font-medium">{"Education"}</h2>
          {data.education.map((item, i) => (
            <div key={`education_${i}`}>
              <div className="flex flex-col">
                <header
                  className="flex justify-between items-baseline"
                  aria-label="education-header"
                >
                  <p aria-label="major_or_minor" className="text-sm">
                    {item.major}
                  </p>

                  <Show when={!isNull(item.startDate) && !isNull(item.endDate)}>
                    <p aria-label="timeline" className="text-sm">{`${formatDate(
                      item.startDate,
                      FORMAT_DATE
                    )} - ${formatDate(item.endDate, FORMAT_DATE)}`}</p>
                  </Show>
                </header>
                <p aria-label="institute" className="text-sm">
                  {item.institute}
                </p>
                <div className="flex flex-col space-y-1">
                  {item.projects?.split(",").map((project, i) => (
                    <li className="text-xs" key={`education_project_${i}`}>
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
                                  ? "text-sky-500 underline cursor-pointer"
                                  : "text-inherit"
                              }
                            >
                              {text}
                            </span>
                          ))}
                        </Fragment>
                      ) : (
                        project
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
