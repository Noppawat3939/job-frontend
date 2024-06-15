"use client";

import { ContentLayout, Lazyload, ResumeForm } from "@/components";

export default function ResumeTempletePage() {
  return (
    <Lazyload>
      <ContentLayout>
        <ResumeForm />
      </ContentLayout>
    </Lazyload>
  );
}
