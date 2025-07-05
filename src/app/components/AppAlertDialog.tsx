import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/ui/components/alert-dialog";
import * as React from "react";

const AppAlertDialog = ({
  open,
  setOpen,
  title,
  children,
  content,
  continueText = "Continue",
  cancelText = "Cancel",
  cancelAction = () => console.log("alert canceled"),
  continueAction = () => console.log("alert continued"),
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  title: string;
  children: React.ReactNode;
  content: string;
  continueText?: string;
  cancelText?: string;
  cancelAction?: () => void;
  continueAction?: () => void;
}) => {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{content}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={cancelAction}>
            {cancelText}
          </AlertDialogCancel>
          <AlertDialogAction onClick={continueAction}>
            {continueText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AppAlertDialog;
