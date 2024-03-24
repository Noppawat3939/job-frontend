import { Banner, InputSearch } from "@/components";

export default function MainPage() {
  return (
    <div>
      <Banner />
      <div className="max-w-xl mx-auto flex items-center hover:shadow-md transition-all duration-300 space-x-4 border-2 rounded-xl p-2">
        <InputSearch />
      </div>
    </div>
  );
}
