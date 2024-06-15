"use client";

import { Lazyload } from "@/components";
import MyResumeList from "./MyResumeList";
import { useQueries } from "@tanstack/react-query";
import { docsService, publicService } from "@/services";
import { GetTestimonailsResponse } from "@/services/public";
import { QUERY_KEY } from "@/constants";
import { GetResumeTemplatesResponse } from "@/services/document";

export default function MyResumeListPage() {
  const [{ data: tesimonails }, { data: templates }] = useQueries({
    queries: [
      {
        queryKey: [QUERY_KEY.GET_TESTIMONIALS],
        queryFn: publicService.getTestimonails,
        select: (res: GetTestimonailsResponse) => res.data,
      },
      {
        queryKey: [QUERY_KEY.GET_RESUME_TEMPLATES],
        queryFn: docsService.getResumeTemplates,
        select: (res: GetResumeTemplatesResponse) => res.data,
      },
    ],
  });

  return (
    <Lazyload>
      <MyResumeList
        testimonials={tesimonails || []}
        templates={templates || []}
      />
    </Lazyload>
  );
}
