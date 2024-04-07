import { type MouseEventHandler } from "react";
import { Button } from "@/components";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

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
}: AlertProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          {title && (
            <AlertDialogTitle className="font-medium">{title}</AlertDialogTitle>
          )}
          {description && (
            <AlertDialogDescription>{description}</AlertDialogDescription>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          {!hideCancel && (
            <Button
              variant="secondary"
              onClick={(e) => onCancel?.(e) || onOpenChange?.(!open)}
            >
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
