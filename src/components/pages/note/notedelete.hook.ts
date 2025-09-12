import { useDeleteNoteMutation } from "@/graphql/client-generated";
import { useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import type { Dispatch } from "react";
import { toast } from "sonner";

export const useNoteDeleteDialog = (
  open: boolean,
  setOpen: Dispatch<React.SetStateAction<boolean>>
) => {
  const token = Cookies.get("ACCESS_TOKEN");
  const queryClient = useQueryClient();
  const m = useDeleteNoteMutation(
    {
      endpoint: import.meta.env.VITE_GRAPHQL_ENDPOINT,
      fetchParams: {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    },
    {
      onError: (error: Error) => {
        toast.error("Delete Failed", {
          description: error.message,
        });
      },
    }
  );
  const deleteHandler = (noteid: string) => {
    m.mutate(
      { input: { id: noteid } },
      {
        onSuccess: () => {
          toast.success("Note deleted successfully");
          if (open) {
            setOpen(false);
          }
          queryClient.invalidateQueries({ queryKey: ["Notes"] });
        },
      }
    );
  };
  return {deleteHandler}
};
