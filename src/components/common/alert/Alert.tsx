import { ReactNode, type MouseEventHandler } from "react";
import { Button } from "@/components";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AlertCircleIcon, X } from "lucide-react";

type AlertProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  onOk?: MouseEventHandler<HTMLButtonElement>;
  onCancel?: MouseEventHandler<HTMLButtonElement>;
  okText?: string;
  cancelText?: string;
  hideCancel?: boolean;
  leftIcon?: ReactNode;
  closeable?: boolean;
};

export default function Alert({
  open,
  description,
  onOpenChange,
  title,
  onOk,
  okText,
  cancelText,
  onCancel,
  hideCancel,
  leftIcon,
  closeable = true,
}: AlertProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        {closeable && (
          <X
            onClick={() => onOpenChange(!open)}
            className="w-4 h-4 absolute top-3 right-3 cursor-pointer hover:opacity-60"
          />
        )}
        <AlertDialogHeader>
          {title && (
            <AlertDialogTitle className="font-medium flex items-center">
              {leftIcon && leftIcon}
              {title}
            </AlertDialogTitle>
          )}
          {description && (
            <AlertDialogDescription>{description}</AlertDialogDescription>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          {!hideCancel && (
            <Button variant="secondary" onClick={(e) => onCancel?.(e)}>
              {cancelText || "Cancel"}
            </Button>
          )}
          <Button onClick={(e) => onOk?.(e) || onOpenChange?.(!open)}>
            {okText || "OK"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
