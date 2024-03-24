import { Select } from "@/components";

type SelectItemProps = {
  items: { label: string; value: string }[];
  placeholder?: string;
  className?: string;
};

export default function SelectItem({
  items,
  placeholder,
  className,
}: SelectItemProps) {
  return (
    <Select.Select>
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
