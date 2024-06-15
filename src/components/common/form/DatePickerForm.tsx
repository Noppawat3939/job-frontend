import { Button, Calendar, Label, Popover, Show } from "@/components";
import { cn, formatDate, isUndifined } from "@/lib";
import { ClassValue } from "clsx";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";

type DatePickerFormProps = {
  label?: string;
  className?: ClassValue;
  format?: string;
  placeholder?: string;
  onChange?: (date?: Date) => void;
};

export default function DatePickerForm({
  label,
  className,
  format,
  placeholder,
  onChange,
}: DatePickerFormProps) {
  const [date, setDate] = useState<Date | undefined>();

  return (
    <div className={cn("flex flex-col space-y-1", className)}>
      <Show when={!isUndifined(label)}>
        <Label className="text-gray-700 text-xs font-normal">{label}</Label>
      </Show>

      <Popover.Popover>
        <Popover.PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn("justify-start text-left font-normal", className)}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? (
              formatDate(date, format || "DD/MM/YYYY")
            ) : (
              <span className="text-muted-foreground">{placeholder || ""}</span>
            )}
          </Button>
        </Popover.PopoverTrigger>
        <Popover.PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
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
