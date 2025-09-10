import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Dispatch } from "react";

interface INoteDeleteDialog {
  open: boolean;
  setOpen: Dispatch<React.SetStateAction<boolean>>;
  noteid: string;
  title: string;
}
const NoteDeleteDialog = ({
  open,
  setOpen,
  noteid,
  title,
}: INoteDeleteDialog) => {
  const deleteHandler = (noteid: string) => {
    console.log("deleted note", noteid);
  };
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
      <DialogContent className="sm:max-w-sm grid gap-12">
        <DialogHeader className="mt-4">
          <DialogTitle>Note {title} wil be deleted. Are you sure?</DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" className="cursor-pointer">
              Cancel
            </Button>
          </DialogClose>
          <Button
            variant={"destructive"}
            onClick={() => {
              deleteHandler(noteid);
            }}
            className="cursor-pointer"
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NoteDeleteDialog;
