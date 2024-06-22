"use client";

import {
  ContentLayout,
  Lazyload,
  ResumeForm,
  ResumePreview,
} from "@/components";

export default function ResumeTempletePage() {
  return (
    <Lazyload>
      <ContentLayout className="bg-slate-200 rounded-md px-6 pt-4 pb-[3rem] h-full">
        <div className="flex space-x-10">
          <div className="flex-1">
            <ResumeForm />
          </div>
          <div className="flex-1">
            <ResumePreview />
          </div>
        </div>
      </ContentLayout>
    </Lazyload>
  );
}
