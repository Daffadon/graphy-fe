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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogTrigger } from "@radix-ui/react-dialog";
import type { Dispatch } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface INoteDialog {
  withTrigger: boolean;
  triggerLabel?: string;
  title?: string;
  description?: string;
  content?: string;
  noteid?: string;
  open?: boolean;
  setOpen?: Dispatch<React.SetStateAction<boolean>>;
}

const NoteDialog = ({
  withTrigger,
  triggerLabel,
  title,
  description,
  content,
  noteid,
  open,
  setOpen,
}: INoteDialog) => {
  const formSchema = z.object({
    title: z.string().min(1, { message: "Title is required" }),
    description: z.string().min(1, { message: "Description is required" }),
    content: z.string().min(1, { message: "Content is required" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: title ?? "",
      description: description ?? "",
      content: content ?? "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (noteid) {
      // update
      return;
    }
    // create new
    console.log(values);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!open) {
          if (setOpen) {
            setOpen(false);
          }
          form.reset();
        }
      }}
    >
      {withTrigger ? (
        <DialogTrigger asChild>
          <Button className="cursor-pointer">{triggerLabel}</Button>
        </DialogTrigger>
      ) : (
        ""
      )}
      <DialogContent className="sm:max-w-xl">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-2">
            <DialogHeader>
              <DialogTitle>Note</DialogTitle>
              <DialogDescription>
                Make your own note and save it for yourself. simple and easy.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name={"title"}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={"description"}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Description"
                          {...field}
                          className="resize-none min-h-18 max-h-18 no-scrollbar"
                        />
                      </FormControl>
                      <FormMessage />{" "}
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={"description"}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Content</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Content"
                          {...field}
                          className="resize-none min-h-52 max-h-52 no-scrollbar"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline" className="cursor-pointer">
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit" className="cursor-pointer">
                  Save Note
                </Button>
              </DialogFooter>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default NoteDialog;
