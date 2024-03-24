import {
  type ChangeEventHandler,
  type MouseEventHandler,
  Fragment,
} from "react";
import { Button, Input, Show } from "@/components";
import { Loader, Search } from "lucide-react";

type InputSearchProps = {
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onSearch?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  loading?: boolean;
};

export default function InputSearch({
  disabled,
  value,
  onChange,
  onSearch,
  loading,
}: InputSearchProps) {
  return (
    <Fragment>
      <Input
        disabled={disabled}
        value={value}
        onChange={onChange}
        aria-label="search-input"
        placeholder="Enter your keyword"
        className="text-lg bg-transparent outline-none border-none ring-offset-transparent focus-visible:ring-transparent placeholder:text-foreground-50"
      />
      <Button
        role="search-btn"
        disabled={loading || disabled}
        onClick={onSearch}
        className="text-lg rounded-lg"
      >
        <Show when={loading} otherwise={<Search className="w-4 h-4 mr-2" />}>
          <Loader className="animate-spin mr-2 w-4 h-4" />
        </Show>
        {"Search"}
      </Button>
    </Fragment>
  );
}
