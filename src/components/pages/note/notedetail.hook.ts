import { useNoteQuery } from "@/graphql/client-generated";
import Cookies from "js-cookie";
import { toast } from "sonner";

export const useNoteDetail = (noteid: string) => {
  const token = Cookies.get("ACCESS_TOKEN");
  const { data, isFetching } = useNoteQuery(
    {
      endpoint: import.meta.env.VITE_GRAPHQL_ENDPOINT,
      fetchParams: {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    },
    { id: noteid },
    {
      staleTime: 1000 * 60 * 5,
      queryKey: ["Note", noteid],
    }
  );
  if (isFetching) {
    toast.loading("wait a moment", { id: "loading-toast" });
  }

  if (data) {
    toast.dismiss("loading-toast");
  }

  return {data}
};
