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
import type { INoteDetailDialog } from "@/types/note_type";
import { useNoteDetail } from "./notedetail.hook";

const NoteDetailDialog = ({
  open,
  setOpen,
  updateHandler,
  noteid,
}: INoteDetailDialog) => {
  const { data } = useNoteDetail(noteid);
  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!open) {
          setOpen(false);
        }
      }}
    >
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>{data?.note?.title}</DialogTitle>
          <DialogDescription>{data?.note?.description}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <p className="text-md">{data?.note?.text}</p>
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
