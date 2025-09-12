import NoteDialog from "@/components/pages/note/NoteDialog";
import { Button } from "@/components/ui/button";
import { useNoteForm } from "./noteform.hook";

const NoteForm = () => {
  const { openDialog, setOpenDialog } = useNoteForm();
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
