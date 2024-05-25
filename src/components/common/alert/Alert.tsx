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
import { X } from "lucide-react";
import { type ButtonProps } from "@/components/ui/button";

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
  okButtonProps?: ButtonProps;
  cancelButtonProps?: ButtonProps;
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
  okButtonProps,
  cancelButtonProps,
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
            <Button
              {...cancelButtonProps}
              variant={cancelButtonProps?.variant || "secondary"}
              onClick={(e) => onCancel?.(e)}
              role="cancel"
            >
              {cancelText || "Cancel"}
            </Button>
          )}
          <Button
            onClick={(e) => onOk?.(e) || onOpenChange?.(!open)}
            role="confrim"
            {...okButtonProps}
          >
            {okText || "OK"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
