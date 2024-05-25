import { useState } from "react";
import { Button, Input, Label, Radio } from "@/components";

type BannerProps = {
  onClick?: (value: string) => void;
};

export default function Banner({ onClick }: BannerProps) {
  const [search, setSearch] = useState("");

  return (
    <section
      role="banner"
      className="flex flex-col justify-center items-center min-h-[700px] max-md:min-h-[350px] max-md:px-1 max-sm:min-h-[300px]"
    >
      <div className="flex font-semibold flex-col w-fit items-center">
        <h1 className="animate-slidein300 text-[6rem] font-semibold max-sm:text-[2.5rem] bg-gradient-to-b from-slate-900 via-slate-800 to-slate-500 inline-block text-transparent bg-clip-text capitalize">
          {"find your"}
          <span className="bg-gradient-to-r from-purple-600 via-purple-500 to-pink-400 inline-block text-transparent bg-clip-text ml-4">
            {"job"}
          </span>
        </h1>
        <h1 className="animate-slidein300 text-[4rem] mt-[-25px] bg-gradient-to-r from-slate-900 via-slate-800 to-slate-300/10 inline-block text-transparent bg-clip-text">
          {"Easy and Fast."}
        </h1>
        <p
          aria-label="banner-description"
          className="animate-slidein500 text-xl font-medium text-slate-800"
        >
          {"A platform where you can get your desired job without any hassle."}
        </p>
      </div>
      <div className="flex mt-[60px] justify-between space-x-8">
        <h2 className="text-xl text-slate-700">{"Looking for?"}</h2>
        <Radio.RadioGroup
          defaultValue="job"
          className="flex space-x-1"
          onValueChange={(e) => {
            console.log(e);
          }}
        >
          <div className="flex items-center space-x-2">
            <Radio.RadioGroupItem
              value="job"
              className="w-[20px] h-[20px] text-slate-800"
              suppressContentEditableWarning={false}
            />
            <Label htmlFor="job" className="text-lg font-normal">
              {"Job"}
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Radio.RadioGroupItem
              value="hire"
              className="w-[20px] h-[20px] text-slate-800"
              suppressContentEditableWarning={false}
            />
            <Label htmlFor="hire" className="text-lg font-normal">
              {"Hire"}
            </Label>
          </div>
        </Radio.RadioGroup>
      </div>
      <div className="flex min-w-[500px] mt-4 gap-2">
        <Input
          className="flex-1 text-md bg-transparent placeholder:font-[300] placeholder:text-gray-400"
          placeholder="keyword"
          value={search}
          onKeyDown={(e) => {
            if (e.code === "Enter") {
              onClick?.(search);
            }
          }}
          onChange={({ target: { value } }) => setSearch(value)}
        />
        <Button
          variant="primary"
          onClick={() => onClick?.(search)}
          className="w-[120px] text-[18px] flex items-center gap-1 shadow-lg hover:shadow-none"
        >
          {"Search"}
        </Button>
      </div>
    </section>
  );
}
