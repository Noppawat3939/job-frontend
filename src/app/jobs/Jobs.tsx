import {
  BadgeWorkStyle,
  Card,
  ContentLayout,
  JobDetailCard,
  Show,
  Spinner,
} from "@/components";
import { diffTime, eq, formatPrice } from "@/lib";
import { publicService } from "@/services";
import { Job, Nullable, PublicJobs } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { Bookmark, ChevronLeft } from "lucide-react";
import { useState } from "react";

type JobsProps = {
  jobs?: PublicJobs[];
};

export default function Jobs({ jobs }: JobsProps) {
  const [selectJob, setSelectJob] = useState<Nullable<Job>>(null);

  const { mutate: getJobById, isPending } = useMutation({
    mutationFn: publicService.getPublicJob,
    onSuccess: ({ data }) => setSelectJob(data),
  });

  return (
    <ContentLayout>
      <div className="flex space-x-4">
        <div className="flex flex-[.4] max-h-[calc(100dvh-100px)] overflow-y-auto">
          <div className="flex flex-col gap-y-3 w-full">
            {jobs?.map((job) => {
              const jobPostedDay = diffTime(job.createdAt, undefined, "day");

              return (
                <Card.Card
                  className="cursor-pointer"
                  onClick={() =>
                    ((selectJob && selectJob.id !== job.id) || !selectJob) &&
                    getJobById(job.id)
                  }
                  key={job.id}
                >
                  <Card.CardHeader className="flex-row gap-2 items-center">
                    <picture>
                      <img
                        loading="lazy"
                        alt="profile"
                        className="w-[60px] h-[60px] rounded-full object-cover"
                        src={job.company.userProfile}
                      />
                    </picture>

                    <div className="flex flex-col relative w-full">
                      <Card.CardTitle className="text-xl font-medium">
                        {job.position}
                      </Card.CardTitle>
                      <Card.CardDescription>
                        {job.company.companyName}
                      </Card.CardDescription>
                    </div>
                  </Card.CardHeader>
                  <Card.CardContent>
                    <ul className="flex-col flex gap-y-2">
                      <p aria-label="location">{job.location}</p>
                      <p aria-label="salary">{formatPrice(job.salary)}</p>
                      <BadgeWorkStyle value={job.style} />
                    </ul>
                  </Card.CardContent>
                  <Card.CardFooter>
                    <p aria-label="posted-at" className="text-sm text-gray-600">
                      {eq(jobPostedDay, 0)
                        ? "today"
                        : `${jobPostedDay} days ago`}
                    </p>
                  </Card.CardFooter>
                </Card.Card>
              );
            })}
          </div>
        </div>
        <div className="flex flex-[.6]">
          <Show when={isPending}>
            <div className="flex w-full items-center justify-center">
              <Spinner label={""} />
            </div>
          </Show>
          {!isPending && !selectJob && (
            <div className="p-[50px] bg-violet-50 w-full rounded-xl">
              <div className="flex flex-col space-y-[30px]">
                <ChevronLeft className="w-8 h-8" />
                <h1 className="text-slate-700 text-5xl font-semibold">
                  {"Select job"}
                </h1>
                <div className="bg-violet-500 w-[120px] h-2 rounded-md"></div>
                <p className="text-gray-600 text-lg">{"Show details here"}</p>
              </div>
            </div>
          )}

          {!isPending && selectJob && <JobDetailCard {...selectJob} />}
        </div>
      </div>
    </ContentLayout>
  );
}
