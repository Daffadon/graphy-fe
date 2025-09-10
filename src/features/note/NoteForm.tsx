import NoteDialog from "@/components/pages/note/NoteDialog";

const NoteForm = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <NoteDialog withTrigger={true} triggerLabel="+" />
    </div>
  );
};
export default NoteForm;
