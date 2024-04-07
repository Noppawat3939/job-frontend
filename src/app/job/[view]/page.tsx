"use client";

import {
  Button,
  ContentLayout,
  JobDetailSectionProps,
  JobHightlightSection,
} from "@/components";
import { useChangeTitleWindow, useToggle } from "@/hooks";
import { diffTime, eq, formatPrice, mappingWorkStyle } from "@/lib";
import { publicService } from "@/services";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import {
  Banknote,
  Bookmark,
  BookmarkCheck,
  BriefcaseBusiness,
  Clock,
  MapPin,
} from "lucide-react";
import { useEffect, useId } from "react";

type ViewJobPageProps = {
  params: { view: string };
};

type MarkDataLocalstorage = {
  mark_job_id: string;
  timestamp: string;
};

const LOCALSTORAGE_KEY = "mark_job";

export default function ViewJobPage({ params }: ViewJobPageProps) {
  const _id = useId();

  const { data: job, isLoading } = useQuery({
    queryKey: ["job", params.view],
    queryFn: () => publicService.getPublicJob(params.view),
    select: ({ data }) => data,
  });

  const {
    handle: { setToggle: setMarked },
    state: { active: marked },
  } = useToggle();

  useEffect(() => {
    const prevMark = window.localStorage.getItem(LOCALSTORAGE_KEY);

    if (typeof window !== "undefined") {
      if (prevMark) {
        const hasMarked = (JSON.parse(prevMark) as MarkDataLocalstorage[]).find(
          (data) => eq(data.mark_job_id, params.view)
        );

        setMarked(Boolean(hasMarked?.mark_job_id));
      }
    }
  }, [params.view, setMarked]);

  useChangeTitleWindow(job && `${job.position} | Jobify`);

  const jobHightlightSections = [
    {
      key: "location",
      value: job?.location,
      icon: <MapPin className="w-4 h-4" />,
    },
    {
      key: "salary",
      value: job?.salary ? formatPrice(job?.salary) : "",
      icon: <Banknote className="w-4 h-4" />,
    },
    {
      key: "workingStyle",
      value: mappingWorkStyle[job?.style as keyof typeof mappingWorkStyle],
      icon: <BriefcaseBusiness className="w-4 h-4" />,
    },
    {
      key: "fulltime",
      value: job?.fulltime ? "Full time" : "Past time",
      icon: <Clock className="w-4 h-4" />,
    },
    {
      key: "posted",
      value: `${diffTime(job?.createdAt, undefined, "day")} days ago`,
    },
  ];

  const jobDetailSections = [
    {
      key: "responsibilities",
      title: "Responsibilities",
      items: job?.jobDescriptions,
    },
    {
      key: "qualifications",
      title: "Qualifications",
      items: job?.qualifications,
    },
    {
      key: "benefits",
      title: "Benefits",
      items: job?.benefits,
    },
    {
      key: "transports",
      title: "Transports",
      items: job?.transports,
    },
    {
      key: "contracts",
      title: "Contracts",
      items: job?.contracts,
    },
  ];

  const handleMarkWithoutLogin = () => {
    const markData = {
      mark_job_id: params.view,
      timestamp: dayjs().toISOString(),
    };

    if (typeof window !== "undefined") {
      let data = [];

      const prevMark = window.localStorage.getItem(LOCALSTORAGE_KEY);

      if (prevMark) {
        const parsed = JSON.parse(prevMark) as MarkDataLocalstorage[];
        const duplicate = parsed.find(
          (data) => data.mark_job_id === params.view
        );

        if (duplicate?.mark_job_id) {
          data = parsed.filter((data) => data.mark_job_id !== params.view);
          setMarked(false);
        } else {
          data = [...parsed, markData];
          setMarked(true);
        }
      } else {
        data = [markData];
      }

      window.localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(data));
    }
  };

  return (
    <section
      role="job-container"
      className="flex space-x-2 px-[3%] max-md:px-[2%]"
    >
      <div className="flex-[0.2] bg-sky-100 border border-sky-400 max-md:hidden">
        {"suggest other jobs"}
      </div>
      <ContentLayout className="flex-[0.8] max-md:flex-1 max-md:px-2 overflow-y-auto p-[20px]">
        <div className="flex justify-between">
          <h2 className="text-4xl font-medium max-md:text-3xl">
            {job?.position}
          </h2>
          <Button
            onClick={handleMarkWithoutLogin}
            size="icon"
            role="mark-job-btn"
            variant="secondary"
          >
            {marked ? (
              <BookmarkCheck className="h-5 w-5 " />
            ) : (
              <Bookmark className="h-5 w-5 " />
            )}
          </Button>
        </div>
        <h3 className="text-sky-500 opacity-70 text-lg max-md:text-[15px]">
          {job?.company}
        </h3>
        <br />
        <div className="flex flex-col space-y-1 mb-3">
          {jobHightlightSections.map((hightlight) => (
            <JobHightlightSection
              {...hightlight}
              key={_id}
              loading={isLoading}
            />
          ))}
        </div>

        <div className="flex flex-col space-y-10 max-w-2xl">
          {jobDetailSections.map((section) => (
            <JobDetailSectionProps
              key={section.key}
              title={section.title}
              items={section.items}
            />
          ))}
        </div>
      </ContentLayout>
    </section>
  );
}
