import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { INoteDeleteDialog } from "@/types/note_type";
import { useNoteDeleteDialog } from "./notedelete.hook";

const NoteDeleteDialog = ({
  open,
  setOpen,
  noteid,
  title,
}: INoteDeleteDialog) => {
  const { deleteHandler } = useNoteDeleteDialog(open, setOpen);
  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!open) {
          setOpen(false);
        }
      }}
    >
      <DialogContent className="sm:max-w-sm grid gap-12">
        <DialogHeader className="mt-4">
          <DialogTitle>
            Note <span className="text-red-600">{title}</span> wil be deleted.
            Are you sure?
          </DialogTitle>
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
