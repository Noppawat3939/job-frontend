import { type SelectProps } from "@radix-ui/react-select";
import { Label, Select, Show } from "@/components";
import { cn, isUndifined, noSpace } from "@/lib";

export type SelectItemProps = {
  items: { label: string; value: string }[];
  placeholder?: string;
  className?: string;
  onChange?: SelectProps["onValueChange"];
  label?: string;
  verticel?: boolean;
} & Omit<SelectProps, "onValueChange">;

export default function SelectItem({
  items,
  placeholder,
  className,
  onChange,
  label,
  verticel,
  ...rest
}: SelectItemProps) {
  return (
    <div
      className={cn(
        "flex flex-1",
        verticel ? "flex-col space-y-1" : "flex-row"
      )}
    >
      <Show when={!isUndifined(label)}>
        <Label
          htmlFor={noSpace(String(label)?.toLowerCase())}
          className="capitalize text-gray-700 text-xs font-normal"
        >
          {label}
        </Label>
      </Show>
      <Select.Select onValueChange={onChange} {...rest}>
        <Select.SelectTrigger className={className}>
          <Select.SelectValue placeholder={placeholder} />
        </Select.SelectTrigger>
        <Select.SelectContent>
          {items.map((item, idx) => (
            <Select.SelectItem
              value={item.value}
              key={`key_${item.value}_${idx}`}
            >
              {item.label}
            </Select.SelectItem>
          ))}
        </Select.SelectContent>
      </Select.Select>
    </div>
  );
}
