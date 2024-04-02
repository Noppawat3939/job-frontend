"use client";

import { Banner, InputSearch } from "@/components";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function MainPage() {
  const router = useRouter();
  const [searchKeyword, setSearchKeyword] = useState("");

  const goToFindJobs = () =>
    router.push(`/job${searchKeyword ? `?search=${searchKeyword}` : ""}`);

  return (
    <div>
      <Banner />
      <div className="max-w-xl mx-auto flex items-center hover:shadow-md transition-all duration-300 space-x-4 border-2 rounded-xl p-2">
        <InputSearch
          value={searchKeyword}
          onChange={({ target: { value } }) => setSearchKeyword(value)}
          onSearch={goToFindJobs}
        />
      </div>
    </div>
  );
}
