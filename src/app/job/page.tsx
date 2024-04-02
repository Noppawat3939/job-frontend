"use client";

import { JobPreview } from "@/components";
import { publicService } from "@/services";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useId } from "react";

export default function FindJobs() {
  const _id = useId();

  const { data: jobs } = useQuery({
    queryKey: ["jobs"],
    queryFn: publicService.getPublicJobs,
    select: ({ data }) => data,
  });

  return (
    <section className="flex h-[calc(100vh-80px)]" role="jobs-container">
      <div className="border-2 h-full border-red-500 flex-[0.2] max-lg:flex-[0.3] ">
        {"Advances fitler"}
      </div>
      <div className="border-2 flex-[0.8] flex-col flex space-y-2 px-4 max-lg:flex-[0.7] overflow-y-scroll">
        {jobs?.map((job) => (
          <Link
            key={_id}
            href={`/job/${job.id}`}
            referrerPolicy="no-referrer"
            target="_blank"
          >
            <JobPreview {...job} />
          </Link>
        ))}
      </div>
    </section>
  );
}
