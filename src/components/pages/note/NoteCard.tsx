import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useState } from "react";
import NoteDialog from "./NoteDialog";
import NoteDetailDialog from "./NoteDetailDialog";
import NoteDeleteDialog from "./NoteDeleteDialog";

interface INoteCard {
  noteid: string;
  title: string;
  description: string;
}

const NoteCard = ({ noteid, title, description }: INoteCard) => {
  const [onUpdate, setOnUpdate] = useState<boolean>(false);
  const [onDetail, setOnDetail] = useState<boolean>(false);
  const [onDelete, setOnDelete] = useState<boolean>(false);

  const updateFromDetail = () => {
    setOnDetail(false);
    setOnUpdate(true);
  };
  return (
    <>
      <Card className="w-full h-full">
        <CardHeader>
          <p className="font-bold text-2xl truncate max-w-xs text-black">
            {title}
          </p>
          <CardAction className="flex gap-2">
            <Button
              className="cursor-pointer"
              onClick={() => {
                setOnUpdate(true);
              }}
            >
              Update
            </Button>
            <Button
              onClick={() => {
                setOnDetail(true);
              }}
              className="cursor-pointer"
              variant={"outline"}
            >
              Detail
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <p>{description}</p>
        </CardContent>
        <CardFooter className="flex justify-end">
          <CardAction>
            <Button
              onClick={() => {
                setOnDelete(true);
              }}
              className="cursor-pointer"
              variant={"destructive"}
            >
              Delete
            </Button>
          </CardAction>
        </CardFooter>
      </Card>
      {onDetail ? (
        <NoteDetailDialog
          open={onDetail}
          setOpen={setOnDetail}
          updateHandler={updateFromDetail}
          noteid={noteid}
        />
      ) : (
        ""
      )}
      {onUpdate ? (
        <NoteDialog open={onUpdate} setOpen={setOnUpdate} noteid={noteid} />
      ) : (
        ""
      )}
      {onDelete ? (
        <NoteDeleteDialog
          open={onDelete}
          setOpen={setOnDelete}
          noteid={noteid}
          title={title}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default NoteCard;
