import { type SelectProps } from "@radix-ui/react-select";
import { Select } from "@/components";

type SelectItemProps = {
  items: { label: string; value: string }[];
  placeholder?: string;
  className?: string;
  onChange?: SelectProps["onValueChange"];
};

export default function SelectItem({
  items,
  placeholder,
  className,
  onChange,
}: SelectItemProps) {
  return (
    <Select.Select onValueChange={onChange}>
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
  );
}
