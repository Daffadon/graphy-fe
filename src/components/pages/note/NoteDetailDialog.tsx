import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Dispatch } from "react";

interface INoteDetailDialog {
  open: boolean;
  setOpen: Dispatch<React.SetStateAction<boolean>>;
  updateHandler: () => void;
  title: string;
  description: string;
  content: string;
}
const NoteDetailDialog = ({
  open,
  setOpen,
  updateHandler,
  title,
  description,
  content,
}: INoteDetailDialog) => {
  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!open) {
          if (setOpen) {
            setOpen(false);
          }
        }
      }}
    >
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <p className="text-md">{content}</p>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" className="cursor-pointer">
                Cancel
              </Button>
            </DialogClose>
            <Button onClick={updateHandler} className="cursor-pointer">
              Update
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NoteDetailDialog;
