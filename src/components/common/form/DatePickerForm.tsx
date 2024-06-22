import { Button, Calendar, Label, Popover, Show } from "@/components";
import { CalendarProps } from "@/components/ui/calendar";
import { cn, formatDate, isUndifined } from "@/lib";
import { ClassValue } from "clsx";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";

type DatePickerFormProps = {
  label?: string;
  className?: ClassValue;
  format?: string;
  placeholder?: string;
  onChange?: (date?: Date) => void;
  name?: string;
  value?: Date;
  disabled?: boolean;
};

const FORMAT = "DD/MM/YYYY";

export default function DatePickerForm({
  label,
  className,
  format,
  placeholder,
  onChange,
  name,
  value,
  disabled = false,
}: DatePickerFormProps) {
  const [date, setDate] = useState<Date | undefined>(value);

  return (
    <div className={cn("flex flex-col space-y-1", className)}>
      <Show when={!isUndifined(label)}>
        <Label className="text-gray-700 text-xs font-normal">{label}</Label>
      </Show>

      <Popover.Popover>
        <Popover.PopoverTrigger asChild name={name} disabled={disabled}>
          <Button
            variant={"outline"}
            disabled={disabled}
            className={cn("justify-start text-left font-normal", className)}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {value || date ? (
              formatDate(value || date, format || FORMAT)
            ) : (
              <span className="text-muted-foreground">{placeholder || ""}</span>
            )}
          </Button>
        </Popover.PopoverTrigger>
        <Popover.PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            disabled={disabled}
            onSelect={(selected) => {
              setDate(selected);
              onChange?.(selected);
            }}
            initialFocus
          />
        </Popover.PopoverContent>
      </Popover.Popover>
    </div>
  );
}
