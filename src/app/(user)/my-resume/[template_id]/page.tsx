"use client";

import { ContentLayout, Lazyload, ResumeForm } from "@/components";

export default function ResumeTempletePage() {
  return (
    <Lazyload>
      <ContentLayout className="pb-[3rem] h-full">
        <ResumeForm />
      </ContentLayout>
    </Lazyload>
  );
}
