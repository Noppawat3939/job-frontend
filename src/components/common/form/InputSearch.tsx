import {
  type ChangeEventHandler,
  type MouseEventHandler,
  Fragment,
} from "react";
import { Button, Input } from "@/components";

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
        loading={loading}
        disabled={disabled}
        onClick={onSearch}
        className="text-lg rounded-lg"
      >
        {"Search"}
      </Button>
    </Fragment>
  );
}
