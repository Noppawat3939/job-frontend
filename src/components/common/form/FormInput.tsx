import { type InputProps } from "@/components/ui/input";
import { Button, Input, Label, Show } from "@/components";
import { useToggle } from "@/hooks";
import { cn, noSpace } from "@/lib";
import { Eye, EyeOff } from "lucide-react";

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
  const { state, handle } = useToggle();

  const passwordType = type === "password";

  return (
    <div {...rest} className={cn("space-y-1", className)}>
      <Show when={label !== undefined}>
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
          type={passwordType ? (state.active ? "text" : "password") : type}
          value={value}
          disabled={rest.disabled}
        />
        <Show when={passwordType}>
          <Button
            type="button"
            size="icon"
            variant="outline"
            className="ml-2"
            onClick={handle.toggle}
          >
            {state.active ? (
              <Eye className="w-5 h-5" />
            ) : (
              <EyeOff className="w-5 h-5" />
            )}
          </Button>
        </Show>
      </span>
    </div>
  );
}
