import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";

const buttonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 transition-all duration-200",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input transition-all duration-200 bg-background hover:bg-accent hover:text-accent-foreground",
        ["destructive-outline"]:
          "border border-red-500 text-red-500 transition-all duration-200 bg-background hover:bg-red-500 hover:text-white",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        primary:
          "transition-all duration-200 bg-gradient-to-r from-purple-600 via-purple-500 to-pink-400 text-white hover:from-pink-500 hover:via-purple-500 hover:to-sky-400",
        ["purple-shadow"]:
          "bg-purple-600 text-white transition-all duration-200 shadow-md shadow-violet-300 hover:bg-purple-700 hover:text-slate-50",
        ["sky-shadow"]:
          "bg-sky-600 text-white transition-all duration-200 shadow-md shadow-sky-300 hover:bg-sky-700 hover:shadow-xl hover:shadow-sky-200",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading,
      disabled = false,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={loading || disabled}
        {...props}
      >
        {loading ? (
          <React.Fragment>
            <Loader className="w-4 h-4 mr-2 animate-spin" />
            <React.Fragment>{children}</React.Fragment>
          </React.Fragment>
        ) : (
          children
        )}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
