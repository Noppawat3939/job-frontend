import Image, { type StaticImageData } from "next/image";

import Google from "@/assets/company/Google-logo.png";
import Facebook from "@/assets/company/Facebook-logo.png";
import Tiktok from "@/assets/company/Tiktok-logo.png";
import PTT from "@/assets/company/PTT-logo.png";
import Line from "@/assets/company/Line-logo.png";
import Microsoft from "@/assets/company/Microsoft-logo.png";
import Samsung from "@/assets/company/Samsung-logo.png";
import Netflix from "@/assets/company/Netflix-logo.png";
import Tesla from "@/assets/company/Tesla-logo.png";
import Uniliver from "@/assets/company/Unilever-logo.png";
import Apple from "@/assets/company/Apple-logo.png";
import Uniqlo from "@/assets/company/Uniqlo-logo.png";

import { cn } from "@/lib";

const LOGO = [
  { key: "google", image: Google },
  { key: "facebook", image: Facebook },
  {
    key: "tiktok",
    image: Tiktok,
  },
  { key: "ptt", image: PTT },
  { key: "line", image: Line },
  { key: "tesla", image: Tesla },
  { key: "apple", image: Apple },
  { key: "microsoft", image: Microsoft },
  { key: "netflix", image: Netflix },
  { key: "samsung", image: Samsung },
  { key: "unqlo", image: Uniqlo },
  { key: "uniliver", image: Uniliver },
] as { key: string; image: StaticImageData }[];

export default function BrandCompaniesSection() {
  return (
    <div className="animate-slidein500 flex bg-gradient-to-b from-gray-50/20 via-slate-100/80 to-gray-100/40 py-8 px-[8%] justify-center items-center flex-wrap gap-[30px]">
      {LOGO.map((item) => (
        <div key={item.key}>
          {
            <Image
              src={item.image}
              className={cn(
                "rounded-md grayscale opacity-60 transition-all duration-300 hover:grayscale-0 hover:opacity-100 hover:-translate-y-1",
                `${item.key === "tiktok" && "bg-black"}`
              )}
              alt={item.key}
              width={120}
              height={80}
              loading="lazy"
            />
          }
        </div>
      ))}
    </div>
  );
}
