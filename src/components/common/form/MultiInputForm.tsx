import { Button, Input, Textarea } from "@/components";
import { Plus } from "lucide-react";
import { useState } from "react";

type MultiInputFormProps = {
  value: string[];
  onChange: (value: string) => void;
};

export default function MultiInputForm({
  value,
  onChange: onAddValue,
}: MultiInputFormProps) {
  const [inputValue, setInputValue] = useState("");

  return (
    <div>
      <div className="flex justify-between space-x-1 items-center">
        <Input
          value={inputValue}
          onChange={(evt) => setInputValue(evt.target.value)}
        />
        <Button
          onClick={(e) => {
            e.preventDefault();

            onAddValue(inputValue);
            setInputValue("");
          }}
          type="button"
          size="icon"
          variant="ghost"
          className="w-6 h-6"
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      {value && value.map((val, i) => <span key={`val_${i}`}>{val}</span>)}
    </div>
  );
}
