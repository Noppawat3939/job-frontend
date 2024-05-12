import { SelectItem } from "@/components";
import { SelectItemProps } from "./SelectItem";
import { Fragment } from "react";
import { cn } from "@/lib";

type FormSelectItemProps = SelectItemProps & {
  error?: string | string[];
};

export default function FormSelectItem({
  error,
  ...rest
}: FormSelectItemProps) {
  return (
    <Fragment>
      <SelectItem
        {...rest}
        className={cn(
          "placeholder:font-normal placeholder:opacity-70",
          error && "border-red-400"
        )}
      />
      {error && (
        <sup
          aria-label={`error-message-${rest.name}`}
          className="text-red-500 mt-2"
        >
          {error}
        </sup>
      )}
    </Fragment>
  );
}
