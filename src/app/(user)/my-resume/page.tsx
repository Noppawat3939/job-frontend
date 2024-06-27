"use client";

import { Button, ContentLayout } from "@/components";
import { QUERY_KEY } from "@/constants";
import { docsService } from "@/services";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Fragment } from "react";

export default function MyResumePage() {
  const { data } = useQuery({
    queryKey: [QUERY_KEY.GET_USER_RESUMES],
    queryFn: docsService.getUserResume,
    select: ({ data }) => data,
  });

  return (
    <ContentLayout>
      <header className="h-[200px] flex justify-center items-center">
        <h1 className="text-5xl text-slate-800 font-semibold">
          {"Your resume design"}
        </h1>
      </header>
      <div className="max-w-[960px] mx-auto grid grid-cols-3">
        {data?.at(0) ? (
          data.map((item) => (
            <div className="w-[260px]" key={`resume_${item.id}`}>
              <Link href={`/my-resume/${item.id}`}>
                <picture className="cursor-pointer">
                  <img
                    src={item.template?.image}
                    loading="lazy"
                    className="transition-all duration-150 opacity-80 rounded-sm hover:shadow hover:opacity-100"
                  />
                </picture>
              </Link>
              <div className="flex justify-between items-baseline mt-4">
                <div className="flex text-sm space-x-1">
                  <label htmlFor="position" className="font-medium">
                    {"Position:"}
                  </label>
                  <p aria-label="title">{item.templateTitle}</p>
                </div>
                <Button
                  size="sm"
                  aria-label="public-resume"
                  variant={item.active ? "outline" : "purple-shadow"}
                >
                  {item.active ? "Private" : "Public"}
                </Button>
              </div>
            </div>
          ))
        ) : (
          <Fragment>
            <Link href="/resume-template/list">
              <div className="border text-slate-700 flex flex-col items-center justify-center transition-all duration-150 rounded w-[240px] h-[300px] cursor-pointer hover:shadow">
                <Plus className="w-6 h-6" />
                <p className="font-medium">Create your template</p>
              </div>
            </Link>
          </Fragment>
        )}
      </div>
    </ContentLayout>
  );
}
