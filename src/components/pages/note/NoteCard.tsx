import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import NoteDialog from "./NoteDialog";
import NoteDetailDialog from "./NoteDetailDialog";
import NoteDeleteDialog from "./NoteDeleteDialog";

interface INoteCard {
  noteid: string;
  title: string;
  description: string;
  content: string;
}

const NoteCard = ({ noteid, title, description, content }: INoteCard) => {
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
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
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
          <p>Card Content</p>
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
          content={content}
          description={description}
          title={title}
        />
      ) : (
        ""
      )}
      {onUpdate ? (
        <NoteDialog
          withTrigger={false}
          open={onUpdate}
          setOpen={setOnUpdate}
          title={title}
          description={description}
          content={content}
          noteid={noteid}
        />
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
