import NoteDialog from "@/components/pages/note/NoteDialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const NoteForm = () => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  return (
    <div className="flex justify-center items-center h-full">
      <Button
        className="cursor-pointer"
        onClick={() => {
          setOpenDialog(true);
        }}
      >
        +
      </Button>
      <NoteDialog open={openDialog} setOpen={setOpenDialog} />
    </div>
  );
};
export default NoteForm;
