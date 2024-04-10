import { type MouseEventHandler } from "react";
import type { Job } from "@/types";
import { Badge, Card } from "@/components";
import { formatDate, formatPrice, mappingWorkStyle } from "@/lib";
import { Banknote, MapPin } from "lucide-react";
import { DATE_FORMAT } from "@/constants";

type JobPreviewProps = Omit<
  Job,
  | "companyProfile"
  | "contracts"
  | "transports"
  | "jobDescriptions"
  | "benefits"
  | "qualifications"
> & { onClick?: MouseEventHandler<HTMLDivElement> };

export default function JobPreview({
  position,
  company,
  style,
  salary,
  location,
  createdAt,
  urgent,
  onClick,
}: JobPreviewProps) {
  return (
    <Card.Card
      onClick={onClick}
      className="cursor-pointer transition-all duration-200 hover:bg-slate-50 border-0"
    >
      <Card.CardHeader>
        <span className="flex items-center justify-between">
          <Card.CardTitle aria-label="position" className="flex items-center">
            {position}
            {urgent && (
              <span className="text-red-500 ml-1 text-xs">{"urgent"}</span>
            )}
          </Card.CardTitle>
          <sub aria-label="create-date">
            {formatDate(createdAt, DATE_FORMAT)}
          </sub>
        </span>
        <Card.CardDescription
          aria-label="company-name"
          className="text-slate-400"
        >
          {company}
        </Card.CardDescription>
      </Card.CardHeader>
      <Card.CardContent>
        <div className="flex flex-col">
          <span className="flex space-x-1 items-center mb-2">
            <MapPin className="w-4 h-4 text-gray-500" />
            <p aria-label="location" className="text-sm text-gray-400 ">
              {location}
            </p>
          </span>
          <div className="flex space-x-2">
            <Badge
              variant="outline"
              aria-label="salary"
              className=" border-yellow-400 bg-orange-50 text-yellow-500 "
            >
              <Banknote className="w-4 h-4 mr-1" />
              {salary ? `${formatPrice(salary)}` : ""}
            </Badge>
            <Badge
              variant="outline"
              className="border bg-slate-50 hover:bg-slate-50 border-sky-300 text-sky-400"
            >
              {mappingWorkStyle[style]}
            </Badge>
          </div>
        </div>
      </Card.CardContent>
    </Card.Card>
  );
}
