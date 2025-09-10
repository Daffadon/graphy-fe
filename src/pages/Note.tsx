import NoteForm from "@/features/note/NoteForm";
import NoteList from "@/features/note/NoteList";

const Note = () => {
  return (
    <div className="h-screen">
      <div className="sticky top-0 bg-white z-10 h-[8vh] border-b border-black">
        <NoteForm />
      </div>
      <div className="px-4 py-4">
        <NoteList />
      </div>
    </div>
  );
};

export default Note;
