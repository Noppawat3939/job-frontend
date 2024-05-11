import { type InputProps } from "@/components/ui/input";
import { Input, Label, Show } from "@/components";
import { cn, isUndifined, noSpace } from "@/lib";

export type FormInputProps = { label?: string } & InputProps;

export default function FormInput({
  type,
  label,
  placeholder,
  value,
  onChange,
  className,
  name,
  ...rest
}: FormInputProps) {
  return (
    <div {...rest} className={cn("space-y-1", className)}>
      <Show when={!isUndifined(label)}>
        <Label
          htmlFor={noSpace(String(label)?.toLowerCase())}
          className="capitalize"
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
        />
      </span>
    </div>
  );
}
