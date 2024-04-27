import { Button, Dialog, FormInput } from "@/components";

export default function DialogInputSearch() {
  return (
    <Dialog.Dialog>
      <Dialog.DialogTrigger>
        <div className="flex">
          <Button
            size="sm"
            variant="outline"
            className="flex font-normal text-slate-400 items-center hover:bg-slate-100"
            role="search-btn"
          >
            {"Search position, company or keyword"}
            <kbd
              aria-label="kbd"
              className="bg-slate-100 ml-2 text-xs flex gap-1 items-center py-1 px-2  rounded-sm text-slate-400"
            >
              <span className="text-sm">⌘</span>K
            </kbd>
          </Button>
        </div>
      </Dialog.DialogTrigger>
      <Dialog.DialogContent>
        <Dialog.DialogHeader>
          <Dialog.DialogTitle className="mb-3">
            {"What your find job?"}
          </Dialog.DialogTitle>
          <div className="flex gap-2">
            <FormInput
              className="w-full"
              placeholder="Position, company or keyword"
            />
            <Button>{"Search"}</Button>
          </div>
        </Dialog.DialogHeader>
      </Dialog.DialogContent>
    </Dialog.Dialog>
  );
}
