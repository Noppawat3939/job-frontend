import { BadgeWorkStyle, Card, ContentLayout } from "@/components";
import { diffTime, eq, formatPrice, mappingWorkStyle } from "@/lib";
import { PublicJobs } from "@/types";
import { Bookmark } from "lucide-react";

type JobsProps = {
  jobs?: PublicJobs[];
};

export default function Jobs({ jobs }: JobsProps) {
  return (
    <ContentLayout>
      <div className="flex">
        <div className="flex flex-[.4] max-h-[calc(100dvh-100px)] overflow-y-auto">
          <div className="flex flex-col gap-y-3 w-full">
            {jobs?.map((job) => {
              const jobPostedDay = diffTime(job.createdAt, undefined, "day");

              return (
                <Card.Card key={job.id}>
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
                      <Bookmark className="text-gray-400 cursor-pointer w-5 h-5 absolute top-[50%] translate-y-[-50%] right-0" />
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
        <div className="flex flex-[.6]"></div>
      </div>
    </ContentLayout>
  );
}
