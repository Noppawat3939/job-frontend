"use client";

import { ContentLayout, JobSection } from "@/components";
import { publicService } from "@/services";
import { useQuery } from "@tanstack/react-query";
import { MapPin } from "lucide-react";
import { useEffect, useId } from "react";

type ViewJobPageProps = {
  params: { view: string };
};

export default function ViewJobPage({ params }: ViewJobPageProps) {
  const _id = useId();

  const { data: job } = useQuery({
    queryKey: ["job", params.view],
    queryFn: () => publicService.getPublicJob(params.view),
    select: ({ data }) => data,
  });

  useEffect(() => {
    if (job?.position) {
      document.title = `${job.position} | Jobify`;
    }
  }, [job?.position]);

  const jobSections = [
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

  return (
    <section role="job-container">
      <ContentLayout>
        <h2 className="text-4xl font-medium">{job?.position}</h2>
        <h3>{job?.company}</h3>
        <br />
        <span className="flex items-center space-x-2">
          <MapPin className="w-4 h-4" />
          <h3>{job?.location}</h3>
        </span>

        <div className="flex flex-col space-y-10">
          {jobSections.map((section) => (
            <JobSection
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
