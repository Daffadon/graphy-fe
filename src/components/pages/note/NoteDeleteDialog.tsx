import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDeleteNoteMutation } from "@/graphql/client-generated";
import { useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import type { Dispatch } from "react";
import { toast } from "sonner";

interface INoteDeleteDialog {
  open: boolean;
  setOpen: Dispatch<React.SetStateAction<boolean>>;
  noteid: string;
  title: string;
}
const NoteDeleteDialog = ({
  open,
  setOpen,
  noteid,
  title,
}: INoteDeleteDialog) => {
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
  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!open) {
          if (setOpen) {
            setOpen(false);
          }
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
