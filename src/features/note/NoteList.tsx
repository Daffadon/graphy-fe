import NoteCard from "@/components/pages/note/NoteCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useNoteList } from "./notelist.hook";

const NoteList = () => {
  const { data, isLoading } = useNoteList();
  if (isLoading) {
    return (
      <div className="grid grid-cols-4 gap-2 place-items-center [grid-auto-rows:200px]">
        {Array.from({ length: 10 }).map((_, idx) => (
          <Skeleton key={idx} className="h-full w-full rounded-xl" />
        ))}
      </div>
    );
  }
  return (
    <>
      {data?.notes && data?.notes.length !== 0 ? (
        <div className="grid grid-cols-4 gap-2 place-items-center [grid-auto-rows:200px]">
          {data?.notes.map((i, id) => {
            return (
              <NoteCard
                key={id}
                noteid={i.id}
                title={i.title}
                description={i.description}
              />
            );
          })}
        </div>
      ) : (
        <div className="h-[85vh] flex justify-center items-center">
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 cursor-default">
            create notes to start
          </h2>
        </div>
      )}
    </>
  );
};

export default NoteList;
