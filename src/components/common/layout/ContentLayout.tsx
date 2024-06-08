import { cn } from "@/lib";
import { HTMLAttributes, type PropsWithChildren } from "react";

export default function ContentLayout({
  children,
  ...rest
}: Readonly<PropsWithChildren & HTMLAttributes<HTMLDivElement>>) {
  return (
    <div
      {...rest}
      suppressHydrationWarning
      className={cn(
        "min-h-[calc(100vh-80px)] mx-auto max-w-[95%] max-2xl:max-w-[92%] max-lg:max-w-[90%] max-sm:max-w-[95%]",
        rest.className
      )}
    >
      {children}
    </div>
  );
}
