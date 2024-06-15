"use client";

import { Lazyload } from "@/components";
import MyResumeList from "./MyResumeList";
import { useQueries } from "@tanstack/react-query";
import { publicService } from "@/services";
import { GetTestimonailsResponse } from "@/services/public";

export default function MyResumeListPage() {
  const [queryTesimonails] = useQueries({
    queries: [
      {
        queryKey: ["testimonials"],
        queryFn: publicService.getTestimonails,
        select: (res: GetTestimonailsResponse) => res.data,
      },
    ],
  });

  return (
    <Lazyload>
      <MyResumeList testimonials={queryTesimonails.data || []} />
    </Lazyload>
  );
}
