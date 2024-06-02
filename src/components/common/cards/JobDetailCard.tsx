import { type MouseEventHandler, type ReactNode } from "react";
import { Badge, Button, Card, Label, Show, Skeleton } from "@/components";
import {
  cn,
  eq,
  formatPrice,
  isEmptyArray,
  isUndifined,
  mappingJobExp,
  mappingJobType,
  mappingUrgetJob,
  mappingWorkStyle,
  mappingWorkingStyleClass,
} from "@/lib";
import type { Job } from "@/types";
import { Bookmark, BookmarkCheck, ChevronRight, X } from "lucide-react";

type JobDetailCardProps = Partial<Job> & {
  onClose?: MouseEventHandler<HTMLButtonElement>;
  onApply?: (jobId: number) => void;
  onFavorite?: (jobId: number) => void;
  hideApply?: boolean;
  hideFavorite?: boolean;
  loading?: boolean;
};

export default function JobDetailCard({
  position,
  category,
  onClose,
  salary,
  style,
  experienceLevel,
  jobType,
  jobDescriptions,
  qualifications,
  urgent,
  company,
  onApply,
  id,
  applicationStatus,
  onFavorite,
  favoritedJob,
  hideApply = false,
  hideFavorite = false,
  loading = false,
}: JobDetailCardProps) {
  const mappedDetails: { key: string; label: string; value: ReactNode }[] = [
    {
      key: "category",
      label: "Category",
      value: (
        <Badge className="bg-orange-100 text-orange-600 hover:bg-orange-100 capitalize">
          {category}
        </Badge>
      ),
    },
    {
      key: "salary",
      label: "Salary",
      value: (
        <p className="text-md text-slate-700">{formatPrice(salary ?? [])}</p>
      ),
    },
    {
      key: "style",
      label: "Work style",
      value: (
        <Badge
          className={cn(
            "w-fit justify-center flex capitalize",
            mappingWorkingStyleClass[String(style)]
          )}
        >
          {mappingWorkStyle[style as keyof typeof mappingWorkStyle]}
        </Badge>
      ),
    },
    {
      key: "experiences",
      label: "Experience",
      value: (
        <p className="capitalize">
          {mappingJobExp[experienceLevel as keyof typeof mappingJobExp] ||
            "no required"}
        </p>
      ),
    },
    {
      key: "type",
      label: "Job type",
      value: (
        <p className="text-md text-slate-700">
          {mappingJobType[jobType as keyof typeof mappingJobType]}
        </p>
      ),
    },
    {
      key: "urgent",
      label: "Job urgent",
      value: (
        <p
          className={cn(
            "capitalize text-md",
            urgent ? "text-red-500" : "text-slate-700"
          )}
        >
          {mappingUrgetJob(urgent) || "no urgent"}
        </p>
      ),
    },
    {
      key: "descriptions",
      label: "Job descriptions",
      value: (
        <ul>
          {isEmptyArray(jobDescriptions)
            ? "-"
            : jobDescriptions?.map((desc, i) => (
                <li
                  className="list-disc text-md text-slate-700"
                  key={`jd_${i}`}
                >
                  {desc}
                </li>
              ))}
        </ul>
      ),
    },
    {
      key: "qualifications",
      label: "Job qualifications",
      value: (
        <ul>
          {qualifications?.map((qual, i) => (
            <li className="list-disc text-md text-slate-700" key={`qual_${i}`}>
              {qual}
            </li>
          ))}
        </ul>
      ),
    },
  ];

  const applied = eq(applicationStatus, "applied");

  return (
    <Card.Card className="flex-1 border-0">
      <Card.CardHeader>
        <Card.CardTitle
          aria-label="position"
          className="flex justify-between text-3xl text-slate-700 items-baseline"
        >
          <span className="flex flex-col">
            {position}
            <h3
              className="text-[15px] font-normal text-pink-600 capitalize"
              aria-label="company-name"
            >
              {company}
            </h3>
          </span>
          <div className="flex space-x-4">
            <Show when={!hideFavorite}>
              <Button
                variant="link"
                size="icon"
                role="favorite"
                onClick={() => !hideFavorite && id && onFavorite?.(id)}
              >
                {favoritedJob ? (
                  <BookmarkCheck className="w-4 h-4 text-pink-600" />
                ) : (
                  <Bookmark className="w-4 h-4" />
                )}
              </Button>
            </Show>
            <Show when={!hideApply}>
              <Button
                size="sm"
                variant="purple-shadow"
                onClick={() =>
                  applied ? null : id && !hideApply && onApply?.(id)
                }
                role="apply"
                disabled={applied}
              >
                {applied ? "Applied" : "Apply"}
                <ChevronRight strokeWidth={3} className="w-4 h-4 ml-2" />
              </Button>
            </Show>
          </div>

          <Show when={!isUndifined(onClose)}>
            <Button
              onClick={onClose}
              aria-label="close-job-details"
              size="icon"
              variant="outline"
              className="w-6 h-6"
            >
              <X className="w-4 h-4" />
            </Button>
          </Show>
        </Card.CardTitle>
      </Card.CardHeader>
      <Card.CardContent>
        {mappedDetails.map((detail) => (
          <div
            aria-label={`detail_${detail.key}`}
            key={detail.key}
            className="flex justify-between items-baseline mb-2 gap-2"
          >
            <Label className="text-foreground text-md max-w-[200px] w-full">
              {detail.label}
            </Label>
            {loading ? (
              <Skeleton className="w-full max-w-[500px] h-[20px]" />
            ) : (
              <span className="max-w-[500px] w-full">{detail.value}</span>
            )}
          </div>
        ))}
      </Card.CardContent>
    </Card.Card>
  );
}
