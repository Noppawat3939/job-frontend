import { type SelectProps } from "@radix-ui/react-select";
import { Label, Select, Show } from "@/components";
import { Fragment } from "react";
import { noSpace } from "@/lib";

type SelectItemProps = {
  items: { label: string; value: string }[];
  placeholder?: string;
  className?: string;
  onChange?: SelectProps["onValueChange"];
  label?: string;
} & Omit<SelectProps, "onValueChange">;

export default function SelectItem({
  items,
  placeholder,
  className,
  onChange,
  label,
  ...rest
}: SelectItemProps) {
  return (
    <Fragment>
      <Show when={label !== undefined}>
        <Label
          htmlFor={noSpace(String(label)?.toLowerCase())}
          className="capitalize"
        >
          {label}
        </Label>
      </Show>
      <Select.Select onValueChange={onChange} {...rest}>
        <Select.SelectTrigger className={className}>
          <Select.SelectValue placeholder={placeholder} />
        </Select.SelectTrigger>
        <Select.SelectContent>
          {items.map((item) => (
            <Select.SelectItem value={item.value} key={item.value}>
              {item.label}
            </Select.SelectItem>
          ))}
        </Select.SelectContent>
      </Select.Select>
    </Fragment>
  );
}
