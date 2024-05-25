import { scrollToTop } from "@/lib";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  const shouldHide = pathname && !["/", "/jobs", "/signup"].includes(pathname);

  if (shouldHide) return null;

  return (
    <footer className="p-6 border-t-4 border-gray-100 bg-gradient-to-b from-white via-gray-50 to-purple-100/30 ">
      <div className="flex justify-center">
        <p
          onClick={scrollToTop}
          className="text-slate-400 text-sm cursor-pointer"
        >{`© ${new Date().getFullYear()} Jobify`}</p>
      </div>
    </footer>
  );
}
