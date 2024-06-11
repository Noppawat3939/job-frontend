import { type InputProps } from "@/components/ui/input";
import { Input, Label, Show } from "@/components";
import { cn, isUndifined, noSpace } from "@/lib";

export type FormInputProps = {
  label?: string;
  error?: string | string[];
} & InputProps;

export default function FormInput({
  type,
  label,
  placeholder,
  value,
  onChange,
  className,
  name,
  error,
  ...rest
}: FormInputProps) {
  return (
    <div {...rest} className={cn("space-y-1", className)}>
      <Show when={!isUndifined(label)}>
        <Label
          htmlFor={noSpace(String(label)?.toLowerCase())}
          className={"capitalize text-gray-700 text-xs font-normal"}
        >
          {label}
        </Label>
      </Show>
      <span className="flex items-center">
        <Input
          onChange={onChange}
          placeholder={placeholder}
          value={value}
          type={type}
          disabled={rest.disabled}
          className={cn(
            "placeholder:font-normal placeholder:opacity-70 focus-visible:ring-transparent",
            error && "border-red-400"
          )}
        />
      </span>
      {error && (
        <sup aria-label={`error-message-${name}`} className="text-red-500">
          {error}
        </sup>
      )}
    </div>
  );
}
