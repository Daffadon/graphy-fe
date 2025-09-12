import NoteCard from "@/components/pages/note/NoteCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useNotesQuery } from "@/graphql/client-generated";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const NoteList = () => {
  const navigate = useNavigate();
  const token = Cookies.get("ACCESS_TOKEN");
  const { data, isLoading, isFetching, error } = useNotesQuery(
    {
      endpoint: import.meta.env.VITE_GRAPHQL_ENDPOINT,
      fetchParams: {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    },
    {},
    { retry: 0, staleTime: 60000 }
  );

  if (isFetching) {
    toast.loading("wait a moment", { id: "get-notelist" });
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-4 gap-2 place-items-center [grid-auto-rows:200px]">
        {Array.from({ length: 10 }).map((_, idx) => (
          <Skeleton key={idx} className="h-full w-full rounded-xl" />
        ))}
      </div>
    );
  }
  if (data) {
    toast.dismiss("get-notelist");
  }
  if (error) {
    const typedError = error as Error & { response?: { status?: number } };
    if (
      typeof typedError.message === "string" &&
      (typedError.message === "Invalid token" ||
        typedError?.response?.status === 403)
    ) {
      Cookies.remove("ACCESS_TOKEN");
      toast.error("Session Ended!", {
        description: "Login to Working With Your Notes",
      });
      navigate("/login");
    }
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
