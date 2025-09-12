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
import { useNoteQuery } from "@/graphql/client-generated";
import Cookies from "js-cookie";
import { type Dispatch } from "react";
import { toast } from "sonner";

interface INoteDetailDialog {
  open: boolean;
  setOpen: Dispatch<React.SetStateAction<boolean>>;
  updateHandler: () => void;
  noteid: string;
}
const NoteDetailDialog = ({
  open,
  setOpen,
  updateHandler,
  noteid,
}: INoteDetailDialog) => {
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
