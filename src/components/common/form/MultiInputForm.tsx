import { useCallback, useState, useTransition } from "react";
import { Link2, Trash } from "lucide-react";
import Link from "next/link";
import { Button, Input, Label, Popover, Show, Textarea } from "@/components";
import { cn } from "@/lib";

type MultiInputFormProps = {
  label?: string;
  name: string;
  onAddValue: (
    data: Record<string, { list: string[]; url: { url: string; text: string } }>
  ) => void;
  values: string;
  separate?: string;
};

const initial = {
  inputValue: "",
  listValues: [],
  addLink: { open: false, url: "", text: "" },
};

const patternAtag = /<a.+?>(.*?)<\/a>/g;

export default function MultiInputForm({
  name,
  label,
  onAddValue,
  values,
  separate,
}: MultiInputFormProps) {
  const [pending, startTransition] = useTransition();

  const [inputValue, setInputValue] = useState(initial.inputValue);
  const [listValues, setListValues] = useState<{ id: string; value: string }[]>(
    initial.listValues
  );
  const [addLink, setAddLink] = useState(initial.addLink);

  const onDeleteList = useCallback(
    (deleteId: string) =>
      setListValues((prev) => prev.filter(({ id }) => id !== deleteId)),
    []
  );

  const onToggleAddLink = useCallback(
    () => setAddLink((prev) => ({ ...prev, open: !addLink.open })),
    [addLink.open]
  );

  const onAddLinkChange = useCallback(
    (key: keyof typeof addLink, value: string) =>
      setAddLink((prev) => ({ ...prev, [key]: value })),
    []
  );

  const reset = useCallback(() => {
    setListValues(initial.listValues);
    setAddLink(initial.addLink);
    setInputValue(initial.inputValue);
  }, []);

  const handleMergeValues = () => {
    const data = {
      [name]: {
        list: listValues.map((list) => list.value),
        url: { url: addLink.url, text: addLink.text },
      },
    };
    onAddValue?.(data);
    startTransition(reset);
  };

  const splitted = values.split(separate || ",");

  const filteredList = splitted.filter((value) => !value.startsWith("<a"));

  const foundUrl = splitted.find((value) => value.startsWith("<a"));

  const replacedURL = foundUrl?.replace(patternAtag, "link: $1");
  const joinedValues = (
    foundUrl ? [...filteredList, replacedURL] : filteredList
  ).join("\n");

  return (
    <div className="flex">
      <Popover.Popover>
        <Popover.PopoverTrigger className="flex-1">
          <Textarea
            readOnly
            className={cn(
              "text-[12px]",
              values ? "min-h-[80px]" : "h-[60px] resize-none"
            )}
            value={joinedValues}
          />
        </Popover.PopoverTrigger>
        <Popover.PopoverContent className="min-w-[500px]">
          <header className="flex justify-between items-center mb-2">
            {label && <Label>{label}</Label>}
            <Button
              onClick={handleMergeValues}
              variant="secondary"
              role="add-values-btn"
              size="sm"
              className="text-xs py-1"
            >
              Save
            </Button>
          </header>
          <Input
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
            name={name}
            disabled={pending}
            placeholder="Please enter for add value"
            onKeyUp={(e) => {
              e.preventDefault();

              if (e.code === "Enter") {
                setListValues((prev) =>
                  prev.length > 0
                    ? [
                        ...prev,
                        {
                          id: `${name}_${listValues.length}`,
                          value: inputValue,
                        },
                      ]
                    : [{ id: `${name}_0`, value: inputValue }]
                );

                startTransition(() => {
                  setInputValue("");
                });
              }
            }}
          />
          <div className="flex my-2 space-x-2 items-center">
            <Button
              size="icon"
              variant="ghost"
              aria-label="add-link-btn"
              onClick={onToggleAddLink}
              className="w-7 h-7 text-slate-700"
            >
              <Link2 className="w-4 h-4" />
            </Button>
            <Show when={!!addLink.url}>
              <Link
                href={addLink.url}
                target="_blank"
                referrerPolicy="no-referrer"
                aria-label="url-rediredct"
                className="text-sm text-sky-500 hover:text-sky-600"
              >
                {`redirect: ${addLink.text || "url"}`}
              </Link>
            </Show>
          </div>

          <Show when={addLink.open}>
            <div className=" space-y-2">
              <Input
                className="h-[24px] text-xs"
                placeholder="URL for redirect"
                name="url"
                value={addLink.url}
                onChange={({ target: { name, value } }) =>
                  onAddLinkChange(name as keyof typeof addLink, value)
                }
              />
              <Input
                placeholder="Text display"
                name="text"
                value={addLink.text}
                onChange={({ target: { name, value } }) =>
                  onAddLinkChange(name as keyof typeof addLink, value)
                }
                className="h-[24px] text-xs"
              />
            </div>
          </Show>
          <Show when={listValues.length > 0}>
            <ul className="mt-2">
              {listValues.map((val, i) => (
                <li
                  key={`multi_list_${val.value}_${i}`}
                  className="text-[12px] text-slate-700 flex justify-between items-baseline"
                >
                  {`${i + 1}. ${val.value}`}
                  <span
                    className="cursor-pointer"
                    onClick={() => onDeleteList(val.id)}
                  >
                    <Trash className="w-3 h-3 text-red-500" />
                  </span>
                </li>
              ))}
            </ul>
          </Show>
        </Popover.PopoverContent>
      </Popover.Popover>
    </div>
  );
}
