import { type MouseEventHandler, type ReactNode } from "react";
import { Badge, Button, Card, Label } from "@/components";
import {
  cn,
  formatPrice,
  mappingJobExp,
  mappingJobType,
  mappingUrgetJob,
  mappingWorkStyle,
  mappingWorkingStyleClass,
} from "@/lib";
import type { Job } from "@/types";
import { X } from "lucide-react";

type JobDetailCardProps = Partial<Job> & {
  onClose: MouseEventHandler<HTMLButtonElement>;
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
}: JobDetailCardProps) {
  const mappedDetails: { key: string; label: string; value: ReactNode }[] = [
    {
      key: "cateegory",
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
        <p className="text-sm text-slate-700">{formatPrice(salary ?? [])}</p>
      ),
    },
    {
      key: "style",
      label: "Work style",
      value: (
        <Badge
          className={cn(
            "w-[80px] justify-center flex capitalize",
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
        <p className="text-sm text-slate-700">
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
            "capitalize text-sm",
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
          {jobDescriptions?.map((desc, i) => (
            <li className="list-disc text-sm text-slate-700" key={`jd_${i}`}>
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
            <li className="list-disc text-sm text-slate-700" key={`qual_${i}`}>
              {qual}
            </li>
          ))}
        </ul>
      ),
    },
  ];

  return (
    <Card.Card className="flex-1 border-0 h-fit">
      <Card.CardHeader>
        <Card.CardTitle
          aria-label="title"
          className="flex justify-between items-baseline text-slate-800 font-medium"
        >
          {"Job Details"}
          <Button
            onClick={onClose}
            aria-label="close-job-details"
            size="icon"
            variant="outline"
            className="w-6 h-6"
          >
            <X className="w-4 h-4" />
          </Button>
        </Card.CardTitle>
      </Card.CardHeader>
      <Card.CardContent>
        <Card.CardTitle
          aria-label="postion"
          className="mb-4 text-lg font-medium"
        >
          {position}
        </Card.CardTitle>
        {mappedDetails.map((detail) => (
          <div
            aria-label={`detail_${detail.key}`}
            key={detail.key}
            className="flex justify-between items-baseline mb-2 gap-2"
          >
            <Label className="text-sm text-foreground w-[100px]">
              {detail.label}
            </Label>
            <span className="max-w-[350px] w-full">{detail.value}</span>
          </div>
        ))}
      </Card.CardContent>
    </Card.Card>
  );
}
