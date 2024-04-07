import type { AllHTMLAttributes, HTMLAttributes } from "react";
import { cn } from "@/lib";
import { Loader } from "lucide-react";

type SpinnerProps = {
  label?: string;
  iconProps?: AllHTMLAttributes<Element>;
  textProps?: HTMLAttributes<HTMLParagraphElement>;
};

export default function Spinner({ label, textProps, iconProps }: SpinnerProps) {
  return (
    <div>
      <Loader
        className={cn("animate-spin text-sky-500", iconProps?.className)}
        {...iconProps}
      />
      <p
        className={cn("text-slate-400 mt-1", textProps?.className)}
        {...textProps}
      >
        {label ?? "Loading..."}
      </p>
    </div>
  );
}
